import prisma from "../../../../lib/prisma";
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
  const {method} = req;
  const session = await getSession({req});
  const {category_name: categoryName, sort} = req.query;

  const from = req.query.from ? req.query.from : "0";
  const to = req.query.to ? req.query.to : "1000000";
  const rating = req.query.rating ? parseFloat(req.query.rating) : undefined;

  switch (method) {
    case 'GET':
      let allSortedProducts = null;

      const category = await prisma.Category.findUnique({
        where: {
          name: categoryName
        }
      })

      if (!category) {
        return res.status(404).json({message: `${categoryName} category do not exist.`});
      }

      switch (sort) {
        case 'name':
          allSortedProducts = await prisma.Category.findFirst({
            where: {
              id: category.id,
              products: {
                some: {
                  price: {
                    gte: +from,
                    lte: +to
                  },
                  rating: {
                    gte: rating,
                  },
                },
              },
            },
            include: {
              products: {
                where: {
                  price: {
                    gte: +from,
                    lte: +to
                  },
                  rating: {
                    gte: rating,
                  },
                },
                orderBy: {
                  title: 'asc',
                },
              },
            },
          })
          break;
        case 'asc':
          allSortedProducts = await prisma.Category.findFirst({
            where: {
              id: category.id,
              products: {
                some: {
                  price: {
                    gte: +from,
                    lte: +to
                  },
                  rating: {
                    gte: rating,
                  },
                },
              },
            },
            include: {
              products: {
                where: {
                  price: {
                    gte: +from,
                    lte: +to
                  },
                  rating: {
                    gte: rating,
                  },
                },
                orderBy: {
                  price: 'asc',
                },
              },
            },
          })
          break;
        case 'desc':
          allSortedProducts = await prisma.Category.findFirst({
            where: {
              id: category.id,
              products: {
                some: {
                  price: {
                    gte: +from,
                    lte: +to
                  },
                  rating: {
                    gte: rating,
                  },
                },
              },
            },
            include: {
              products: {
                where: {
                  price: {
                    gte: +from,
                    lte: +to
                  },
                  rating: {
                    gte: rating,
                  },
                },
                orderBy: {
                  price: 'desc',
                },
              },
            },
          })
          break;
        default:
          allSortedProducts = await prisma.Category.findFirst({
            where: {
              id: category.id,
              products: {
                some: {
                  price: {
                    gte: +from,
                    lte: +to
                  },
                  rating: {
                    gte: rating,
                  },
                },
              },
            },
            include: {
              products: {
                where: {
                  price: {
                    gte: +from,
                    lte: +to
                  },
                  rating: {
                    gte: rating,
                  },
                },
                orderBy: {
                  rating: 'desc',
                },
              },
            },
          })
          break;
      }
      if (allSortedProducts) {
        return res.status(200).json(allSortedProducts)
      } else {
        return res.status(404).json({message: 'Products Not Found'});
      }
    case 'POST':
      const data = [
        {
          title: 'Roronoa Zoro',
          description: 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
          price: 540,
          rating: 3,
          category: 'tablets',
          brand: 'Qazaq Republic',
          images: [
            'https://rare-gallery.com/mocahbig/1355563-Roronoa-Zoro-Green-HairRoronoa-Zoro.png'
          ]
        },
      ]
      data.map(async (product) => {
        const {title, description, price, rating, brand, images, category} = product
        await prisma.Product.create({
          data: {
            title, description, price, rating, brand, images,
            category: {
              connectOrCreate: {
                where: {
                  name: category
                },
                create: {
                  name: category
                },
              },
            },
          },
        })
      })
      return res.status(200).json("created")
    case 'PUT':
      res.status(200).json({method, name: "PUT request"});
      break
    case 'DELETE':
      res.status(200).json({method, name: "DELETE request"});
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end('Method ${method} Not Allowed')
  }
}
