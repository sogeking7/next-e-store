import prisma from '../../../lib/prisma/index'

export default async function handler(req, res) {
  const {method} = req
  const id = req.query.id;

  switch(method) {
    case 'GET':
      const product = await prisma.products.findUnique({where : {id : id}});
      console.log(id)
      res.status(200).json(product)
    case 'POST':
      res.status(200).json({ method, name: "POST request"});
    case 'PUT':
      res.status(200).json({ method, name: "PUT request"});
    case 'DELETE':
      res.status(200).json({ method, name: "DELETE request"});
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end('Method ${method} Not Allowed')
  }
}

