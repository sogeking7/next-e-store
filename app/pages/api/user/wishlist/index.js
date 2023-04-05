import prisma from "../../../../lib/prisma";
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
  const {method} = req;

  const session = await getSession({req});
  const {user} = session;
  const userId = user.id;

  switch(method) {
    case 'GET':
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        },
        include: {
          wishlist: true
        }
      })
      const userWishlist = user.wishlist
      res.status(200).json(userWishlist)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end('Method ${method} Not Allowed')
  }
}