import prisma from '../../../../lib/prisma'
import mongoose from "mongoose";

export default async function handler(req, res) {
  const {method} = req
  const productId = req.query.id;
  const categoryName = req.query.category_name;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({error: 'Invalid ID'});
    return;
  }
  switch (method) {
    case 'GET':
      const get_category = await prisma.Category.findUnique({
        where: {
          name: categoryName
        }
      })
      if (!get_category) {
        return res.status(404).json({error: 'Page Not Found'});
      }
      const get_product_by_id = await prisma.Category.findUnique({
        where: {
          id: get_category.id
        },
        include: {
          products: {
            where: {
              id: productId
            },
          },
        },
      })
      if (get_product_by_id) {
        res.status(200).json(get_product_by_id.products[0]);
      } else {
        res.status(404).json({error: 'Product Not Found'});
      }
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

