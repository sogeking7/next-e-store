import prisma from "../../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { method } = req;
  const { id: productId } = req.query;

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'You must be logged in' })
  }

  const userId = session.user.id;

  let user = null, updatedWishlist = null, wishlist = null

  switch (method) {
    case 'POST':
      user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          wishlist: true,
        },
      })

      if (!user) {
        return res.status(400).json({ message: `User with ID ${userId} not found\`` })
      }

      wishlist = user.wishlist
      if (!wishlist) {
        wishlist = await prisma.wishlist.create({
          data: {
            user: { connect: { id: userId } },
          },
        });
      }
      updatedWishlist = await prisma.wishlist.update({
        where: {
          id: wishlist.id,
        },
        data: {
          items: {
            connect: {
              id: productId,
            },
          },
          itemIDs: {
            push: productId,
          },
        },
        include: {
          items: true,
        },
      })
      return res.status(200).json(updatedWishlist);
    case 'DELETE':
      user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          wishlist: true,
        },
      })
      if (!user) {
        return res.status(400).json({ message: `User with ID ${userId} not found\`` })
      }

      wishlist = user.wishlist

      updatedWishlist = await prisma.wishlist.update({
        where: {
          id: wishlist.id,
        },
        data: {
          items: {
            disconnect: {
              id: productId,
            },
          },
        },
        include: {
          items: true,
        },
      })
      return res.status(200).json(updatedWishlist);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end('Method ${method} Not Allowed')
  }
}