import prisma from "../../../lib/prisma";
// import data from './fake';

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
      const data = [
        {
          title: 'A',
          description: 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
          price: 438,
          rating: 5,
          category: 'headphones',
          brand: 'Xiaomi',
          images: [
            'https://plus.unsplash.com/premium_photo-1677373562811-beb477dca3ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'C',
          description: 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
          price: 23423,
          rating: 54,
          category: 'headphones',
          brand: 'Xiaomi',
          images: [
            'https://plus.unsplash.com/premium_photo-1677373562811-beb477dca3ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'B',
          description: 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
          price: 314,
          rating: 4,
          category: 'laptops',
          brand: 'Xiaomi',
          images: [
            'https://plus.unsplash.com/premium_photo-1677234282671-ed835a226405?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIwfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        }
      ]
      const {title, description, price, rating, brand, images, category} = data[0];
      const new_product = await prisma.Product.create({
        data: {
          title,
          description,
          price,
          rating,
          brand,
          images,
          categories: {
            connectOrCreate: {
                create: {
                  name: category
                },
                where: {
                  id: category
                },
            },
          },
        },
        include: {
          categories: true
        }
      }).then(res => console.log(res)).catch(err => console.error(err))
      return res.status(200).json(new_product)
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