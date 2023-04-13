import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'GET':
      const get_all_categories = await prisma.Category.findMany({})
      if (get_all_categories) {
        res.status(200).json(get_all_categories)
      } else {
        res.status(404).json({ error: 'Products Not Found' });
      }
      break
    case 'POST':
      res.status(200).json({ method, name: "POST request" })
      break
    case 'PUT':
      res.status(200).json({ method, name: "PUT request" });
      break
    case 'DELETE':
      res.status(200).json({ method, name: "DELETE request" });
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end('Method ${method} Not Allowed')
  }
}