import prisma from "../../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { method } = req;
  const session = await getSession({ req });
  const { category_name: categoryName, sort } = req.query;

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
        return res.status(404).json({ message: `${categoryName} category do not exist.` });
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
        return res.status(404).json({ message: 'Products Not Found' });
      }
    case 'POST':
      const data = [
        {
          title: 'Nami',
          description: 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
          price: 280,
          rating: 3,
          category: 'tablets',
          brand: 'Qazaq Republic',
          images: [
            'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c2a4fd09-561a-4019-b2c9-6461fa3db151/dem9sh5-8026d2b9-a2a8-43fd-8ff8-4e278aa54447.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MyYTRmZDA5LTU2MWEtNDAxOS1iMmM5LTY0NjFmYTNkYjE1MVwvZGVtOXNoNS04MDI2ZDJiOS1hMmE4LTQzZmQtOGZmOC00ZTI3OGFhNTQ0NDcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.xt-ST-XuO4RFdUXBIwsMpGUGMbveU1_4Wwiu1kN2dDI'
          ]
        },
      ]
      data.map(async (product) => {
        const { title, description, price, rating, brand, images, category } = product
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
