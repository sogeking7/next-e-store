import prisma from '../../../lib/prisma/index'
import mongoose from "mongoose";

export default async function handler(req, res) {
  const {method} = req
  const id = req.query.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({error: 'Invalid ID'});
    return;
  }
  switch (method) {
    case 'GET':
      const get_product_by_id = await prisma.Product.findUnique({where: {id: id}});
      if (get_product_by_id) {
        res.status(200).json(get_product_by_id);
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

