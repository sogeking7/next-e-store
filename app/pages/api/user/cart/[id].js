import React from "react";
import prisma from "../../../../lib/prisma";
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
  const {method} = req;
  const {id: productId} = req.query;

  const session = await getSession({req});
  const {user} = session;
  const userId = user.id;

  switch(method) {
    case 'POST':
      let userCartIDs =  await prisma.user.findUnique({
        where: {
          id: userId
        },
        select: {
          cartIDs: true
        }
      });

      const updatedUserCartIDs = userCartIDs.cartIDs;
      updatedUserCartIDs.push(productId)

      const updatedUser = await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          cartIDs: updatedUserCartIDs
        },
      });

      return res.status(200).json(updatedUser);
    // return res.status(200).json('Item added to wishlist');
    case 'DELETE':
      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          cart: {
            disconnect: {
              id: productId
            }
          }
        },
        include: {
          cart: true
        }
      });
      return res.status(200).json('Item removed from cart');
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end('Method ${method} Not Allowed')
  }
}