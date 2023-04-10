import prisma from '../../../../lib/prisma'
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
  const {method} = req
  const {id: productId, category_name: categoryName} = req.query;

  const session = await getSession({req});

  switch (method) {
    case 'GET':
      const category = await prisma.Category.findUnique({
        where: {
          name: categoryName
        }
      })
      if (!category) {
        return res.status(404).json("Page Not Found");
      }
      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id
        },
        include: {
          wishlist: true
        }
      })
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
              wishlist: true,
              category: {
                select: {
                  name: true
                }
              }
            }
          },
        },
      });
      if (get_product_by_id) {
        const product = get_product_by_id.products[0];

        product.inWishlist = !!product.wishlistIDs.includes(user.wishlist.id);
        return res.status(200).json(get_product_by_id.products[0]);
      } else {
        return res.status(404).json({error: 'Product Not Found'});
      }
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


