import prisma from '../../../../lib/prisma'
import { getSession } from "next-auth/react";
const ObjectId = require('mongoose').Types.ObjectId;

export default async function handler(req, res) {
  const { method } = req
  const { id: productId, category_name: categoryName } = req.query;

  if (!ObjectId.isValid(productId)) {
    return res.status(400).json({ error: `${productId} is not a valid MongodbID` })
  }

  const session = await getSession({ req });

  switch (method) {
    case 'GET':
      let category = await prisma.Category.findUnique({
        where: {
          name: categoryName
        }
      })
      if (!category) {
        return res.status(400).json({ error: `Category ${categoryName} does not exist.` });
      }
      const categoryId = category.id;
      const userId = session ? session.user.id : null;
      const user = userId ? await prisma.user.findUnique({
        where: {
          id: userId
        },
        include: {
          wishlist: true,
          cart: true
        }
      }) : null
      const userWishlistId = user && user.wishlist ? user.wishlist.id : null;
      const userCartId = user && user.cart ? user.cart.id : null;
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
              cartItems: {
                where: {
                  productID: productId
                }
              },
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
        productByCategory.inWishlist = productByCategory.wishlistIDs ? !!productByCategory.wishlistIDs.includes(userWishlistId) : false
        productByCategory.inCart = productByCategory.cartID ? !!productByCategory.cartID.includes(userId) : false;
        return res.status(200).json(productByCategory);
      } else {
        return res.status(400).json({ error: `Product with id ${productId} not found` })
      }
    case 'POST':
      res.status(200).json({ method, name: "POST request" });
      break;
    case 'PUT':
      res.status(200).json({ method, name: "PUT request" });
      break;
    case 'DELETE':
      res.status(200).json({ method, name: "DELETE request" });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end('Method ${method} Not Allowed')
  }
}


