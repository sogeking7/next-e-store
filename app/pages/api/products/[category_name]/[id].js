import prisma from '../../../../lib/prisma'
import {getSession} from "next-auth/react";
const ObjectId = require('mongoose').Types.ObjectId;

export default async function handler(req, res) {
  const {method} = req
  const {id: productId, category_name: categoryName} = req.query;

  if (!ObjectId.isValid(productId)) {
    return res.status(400).json({error: `${productId} is not a valid MongodbID`})
  }

  const session = await getSession({req});

  switch (method) {
    case 'GET':
      let category = await prisma.Category.findUnique({
        where: {
          name: categoryName
        }
      })
      if (!category) {
        return res.status(400).json({error: `Category ${categoryName} does not exist.`});
      }
      const categoryId = category.id;
      const userId = session ? session.user.id : null;
      const userWishlist = userId ? await prisma.user.findUnique({
        where: {
          id: userId
        },
        include: {
          wishlist: true
        }
      }) : null
      const userWishlistId = userWishlist ? userWishlist.wishlistId : null;
      category = await prisma.Category.findUnique({
        where: {
          id: categoryId
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
      const productByCategory = category ? category.products[0] : null;
      if (productByCategory) {
        productByCategory.inWishlist = !!productByCategory.wishlistIDs.includes(userWishlistId);
        return res.status(200).json(productByCategory);
      } else {
        return res.status(404).json({error: `Product with id ${productId} not found`})
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


