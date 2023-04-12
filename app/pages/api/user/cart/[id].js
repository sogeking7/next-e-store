import prisma from "../../../../lib/prisma";
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
  const {method} = req;
  const {id: productId} = req.query;

  const session = await getSession({req});
  
  if (!session) {
    return res.status(401).json({message: 'You must be logged in'})
  }
  let user = null, updatedCart = null, cart = null

  const userId = session.user.id;

  switch (method) {
    case 'GET':
      const cartItem = await prisma.cartItem.create({
        data: {
          quantity: 1,
          product: {
            connect: {
              id: productId
            }
          },
          carts: {
            connect: {
              userId: userId
            }
          }
        },
      });
      const cart = await prisma.cart.upsert({
        where: {userId: userId},
        update: {},
        create: {
          userId: userId,
          cartItems: {
            connect: {
              id: cartItem.id
            }
          }
        },
      });
      return res.status(200).json(cart);
    case 'DELETE':

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end('Method ${method} Not Allowed')
  }
}