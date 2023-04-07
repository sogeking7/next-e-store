import prisma from '../../../../lib/prisma'
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
  const {method} = req
  const {id: productId, category_name: categoryName} = req.query;

  const session = await getSession({req});
  // const {user: {id: userId}} = session;

  switch (method) {
    case 'GET':
      const category = await prisma.Category.findUnique({
        where: {
          name: categoryName
        }
      })
      if (!category) {
        return res.status(404).json();
      }
      const get_product_by_id = await prisma.Category.findUnique({
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
      const productExistsInWishlist = session ? await prisma.user.findUnique({
        where: {id: session.user.id},
        select: {wishlist: {select: {id: true}}},
      }).then((user) => user.wishlist.some((p) => p.id === productId)) : false

      get_product_by_id.products[0].wishlist = productExistsInWishlist;

      if (get_product_by_id) {
        res.status(200).json(get_product_by_id.products[0]);
      }

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


