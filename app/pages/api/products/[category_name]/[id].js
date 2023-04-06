import prisma from '../../../../lib/prisma'
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
  const {method} = req
  const {productId, categoryName} = req.query;

  const session = await getSession({req});

  switch (method) {
    case 'GET':

      const category = await prisma.Category.findUnique({
        where: {
          name: categoryName
        }
      })

      if (!category) return res.status(404).json();

      const allProducts = await prisma.Category.findUnique({
        where: {
          id: category.id
        },
        include: {
          products: {
            where: {
              id: productId
            },
            include: {
              category: {
                select: {
                  name: true
                }
              }
            }
          },
        },
      });
      const wishlist = session ? await prisma.user.findUnique({
          where: { id: session.user.id },
          select: { wishlist: { select: { id: true } } },
        }).then((user) => user.wishlist.some((p) => p.id === productId)) :0

      allProducts.products[0].wishlist = wishlist;

      if (allProducts) res.status(200).json(allProducts.products[0]);
      res.status(404).json({error: 'Product Not Found'});

      break;
    case 'POST':
      res.status(200).json({method, name: "POST request"});
      break;
    case 'PUT':
      res.status(200).json({method, name: "PUT request"});
      break;
    case 'DELETE':
      res.status(200).json({method, name: "DELETE request"});
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end('Method ${method} Not Allowed')
  }
}

