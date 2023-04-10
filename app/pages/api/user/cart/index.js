import prisma from "../../../../lib/prisma";
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
  const {method} = req;

  const session = await getSession({req});
  const {user: {id: userId}} = session;

  switch(method) {
    case 'GET':

      if (!session) {
        return res.status(401).json({message: 'You must be logged in'})
      }

      const userCart = await prisma.user.findUnique({
        where: {
          id: userId
        },
        select: {
          cart: {
            select: {
              id: true,
              title: true,
              description: true,
              price: true,
              rating: true,
              brand: true,
              images: true,
              category: {
                select: {
                  name: true,
                },
              },
            },
          }
        }
      })

      res.status(200).json(userCart)

      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end('Method ${method} Not Allowed')
  }
}