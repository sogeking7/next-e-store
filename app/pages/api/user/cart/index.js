import prisma from "../../../../lib/prisma";
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
  const {method} = req;

  const session = await getSession({req});

  if (!session) {
    return res.status(401).json({error: 'You must be logged in'})
  }

  const userId = session.user.id;

  switch (method) {
    case 'GET':
      const userCart = await prisma.user.findUnique({
        where: {
          id: userId
        },
        select: {
          cart: {
            include: {
              cartItems: {
                include: {
                  product: {
                    include: {
                      category: {
                        select: {
                          name: true
                        }
                      }
                    }
                  }
                }
              }
            }
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
