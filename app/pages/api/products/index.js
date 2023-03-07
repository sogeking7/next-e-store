import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const {method} = req;
  let from = "0", to="1000000", rating, category;

  if (req.query.from) from = req.query.from;
  if (req.query.to) to = req.query.to;
  if (req.query.category) category = req.query.category;
  if (req.query.rating) rating = parseFloat(req.query.rating);

  switch(method) {
    case 'GET':
      let get_all_sorted_products = null;
      if (req.query.order === 'alphabetically') {
        get_all_sorted_products = await prisma.Product.findMany({
          orderBy: {
            title: 'asc'
          },
          where: {
            price: {
              gte: +from,
              lte: +to
            },
            category: category,
            rating: {
              gte: rating,
            }
          }
        })
      } else if (req.query.order === 'low-to-high') {
        get_all_sorted_products = await prisma.Product.findMany({
          orderBy: {
            price: 'asc'
          },
          where: {
            price: {
              gte: +from,
              lte: +to
            },
            category: category,
            rating: {
              gte: rating,
            }
          }
        })
      } else if (req.query.order === 'high-to-low') {
        get_all_sorted_products = await prisma.Product.findMany({
          orderBy: {
            price: 'desc'
          },
          where: {
            price: {
              gte: +from,
              lte: +to
            },
            category: category,
            rating: {
              gte: rating,
            }
          }
        })
      } else {
        get_all_sorted_products = await prisma.Product.findMany({
          orderBy: {
            rating: 'desc'
          },
          where: {
            price: {
              gte: +from,
              lte: +to
            },
            category: category,
            rating: {
              gte: rating,
            }
          }
        })
      }
      console.log(req.query);
      res.status(200).json(get_all_sorted_products)
      break
    case 'POST':
      res.status(200).json({method, name: "POST request"});
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