import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const {method} = req;

  switch(method) {
    case 'GET':
      const get_wishlist = await prisma.Product.findMany({

      })
      res.status(200).json("Get")
      break
    case 'POST':
      return res.status(200).json("Post")
      break
    case 'PUT':
      res.status(200).json({ method, name: "PUT request"});
      break
    case 'DELETE':
      res.status(200).json({ method, name: "DELETE request"});
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end('Method ${method} Not Allowed')
  }
}