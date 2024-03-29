import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { method } = req;

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'You must be logged in' })
  }

  const userId = session.user.id;

  switch (method) {
    case 'GET':
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        },
        include: {
          wishlist: true,
          cart: {
            include: {
              cartItems: true
            }
          },
          orders: true,
        }
      })
      return res.status(200).json(user)
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end('Method ${method} Not Allowed')
  }
}