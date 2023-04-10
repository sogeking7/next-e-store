import React from "react";
import prisma from "../../../../lib/prisma";
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
  const {method} = req;
  const {id: productId} = req.query;

  const session = await getSession({req});
  const {user: {id: userId}} = session;

  let user=null, updatedWishlist=null, wishlist=null

  switch(method) {
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
        return res.status(400).json({message: `User with ID ${userId} not found\``})
      }

      wishlist = user.wishlist // assuming each user has only one wishlist
      if (!wishlist) {
        wishlist = await prisma.wishlist.create({
          data: {
            user: { connect: { id: userId } },
          },
        });
        return res.status(400).json({message: `Wishlist not found for user with ID ${userId}`})
      }
      if (wishlist.itemIDs.includes(productId)) {
        return res.status(400).json({message: `Product with ID ${productId} is already in the wishlist`})
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
        return res.status(400).json({message: `User with ID ${userId} not found\``})
      }

      wishlist = user.wishlist // assuming each user has only one wishlist
      if (!wishlist) {
        wishlist = await prisma.wishlist.create({
          data: {
            user: { connect: { id: userId } },
          },
        });
        return res.status(400).json({message: `Wishlist not found for user with ID ${userId}`})
      }

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