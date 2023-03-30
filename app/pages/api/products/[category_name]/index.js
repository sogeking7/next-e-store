import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const {method} = req;
  const categoryName = req.query.category_name;

  let from = "0", to="1000000", rating;

  if (req.query.from) from = req.query.from;
  if (req.query.to) to = req.query.to;
  if (req.query.rating) rating = parseFloat(req.query.rating);

  switch(method) {
    case 'GET':
      let get_all_sorted_products = null;
      const get_category = await prisma.Category.findUnique({
        where: {
          name: categoryName
        }
      })
      if (!get_category) {
        return res.status(404).json({error: 'Page Not Found'});
      }
      if (req.query.sort === 'name') {
        get_all_sorted_products = await prisma.Category.findFirst({
          where: {
            id: get_category.id,
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
      } else if (req.query.sort === 'asc') {
        get_all_sorted_products = await prisma.Category.findFirst({
          where: {
            id: get_category.id,
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
      } else if (req.query.sort === 'desc') {
        get_all_sorted_products = await prisma.Category.findFirst({
          where: {
            id: get_category.id,
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
      } else {
        get_all_sorted_products = await prisma.Category.findFirst({
          where: {
            id: get_category.id,
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
      }
      if (!get_all_sorted_products) {
        res.status(404).json({error: 'Products Not Found'});
      } else {
        res.status(200).json(get_all_sorted_products.products)
      }
      break
    case 'POST':
      const data = [
        {
          title: 'Sleek Soft Bacon',
          description: 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
          price: 862,
          rating: 5,
          category: 'smart-watches',
          brand: 'Qazaq Republic',
          images: [
            'https://images.unsplash.com/photo-1677941931332-3bcf18b0a1ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
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