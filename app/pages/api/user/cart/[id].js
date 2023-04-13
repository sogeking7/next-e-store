import prisma from "../../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { method } = req;
  const { id: productId } = req.query;

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'You must be logged in' })
  }
  let user = null, cart = null, updatedCart = null;

  const userId = session.user.id;

  switch (method) {
    case 'POST':
      user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          cart: true,
        },
      })

      if (!user) {
        return res.status(400).json({ message: `User with ID ${userId} not found\`` })
      }

      cart = user.cart
      if (!cart) {
        cart = await prisma.cart.create({
          data: {
            user: { connect: { id: userId } },
          },
        });
      }

      const cartItem = await prisma.cartItem.create({
        data: {
          quantity: 1,
          product: {
            connect: {
              id: productId
            }
          },
          cart: {
            connect: {
              userId: userId
            }
          }
        },
      });
      const cartItemId = cartItem.id;
      cart = await prisma.cart.upsert({
        where: { userId: userId },
        update: {},
        create: {
          userId: userId,
          cartItems: {
            connect: {
              id: cartItemId
            }
          }
        },
      });
      return res.status(200).json(cart);
    case 'DELETE':
      user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          cart: true,
        },
      })

      if (!user) {
        return res.status(400).json({ message: `User with ID ${userId} not found\`` })
      }

      const cartId = user.cart.id;

      await prisma.cartItem.deleteMany({
        where: {
          productID: productId,
          cartID: cartId,
        },
      })
      return res.status(200).json({ message: 'Product removed from cart' })
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end('Method ${method} Not Allowed')
  }
}