import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const {method} = req

  switch(method) {
    case 'GET':

      const {from, to, category, rating} = req.query;

      console.log(req.query)
      const products = await prisma.products.findMany({

      });
      res.status(200).json(products)
      break
    case 'POST':
      // const {title, description, price, rating, category, brand, images} = req.body;
      // const new_product = await prisma.products.create({
      //   data: {
      //     title, description, price, rating, category, brand, images
      //   }
      // })
      // console.log(new_product)
      // res.status(200).json(new_product);
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