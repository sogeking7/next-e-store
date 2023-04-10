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
    case 'GET':
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

      wishlist = user.wishlist[0] // assuming each user has only one wishlist
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
          wishlist: true
        },
      })

      if (!user) {
        return res.status(400).json({message: `User with ID ${userId} not found`})
      }

      wishlist = user.wishlist[0] // assuming each user has only one wishlist
      if (!wishlist) {
        return res.status(400).json({message: `Wishlist not found for user with ID ${userId}`})
      }

      const wishlistItemIndex = wishlist.itemIDs.findIndex(
        (item) => item === productId
      )

      if (wishlistItemIndex === -1) {
        return res.status(400).json({message: `Product not found in wishlist for user with ID ${userId}`})
      }

      updatedWishlist = wishlist.itemIDs.filter(
        (item) => item !== productId
      )

      const updatedUser = await prisma.wishlist.update({
        where: {
          id: wishlist.id,
        },
        data: {
          itemIDs: {
            set: updatedWishlist,
          },
        },
        include: {
          items: true,
        },
      })
      return res.status(200).json(updatedUser)
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end('Method ${method} Not Allowed')
  }
}