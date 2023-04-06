import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const {method} = req;
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
        return res.status(404).json({error: 'Page Not Found'});
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
                include: {
                  category: {
                    select: {
                      name: true
                    }
                  }
                },
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
                include: {
                  category: {
                    select: {
                      name: true
                    }
                  }
                },
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
                include: {
                  category: {
                    select: {
                      name: true
                    }
                  }
                },
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
                include: {
                  category: {
                    select: {
                      name: true
                    }
                  }
                },
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

      if (!allSortedProducts) {
        res.status(404).json({error: 'Products Not Found'});
      } else {
        res.status(200).json(allSortedProducts.products)
      }
      break
    case 'POST':
      const data = [
        {
          title: 'Monkey D Luffy',
          description: 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
          price: 134,
          rating: 3,
          category: 'tablets',
          brand: 'Qazaq Republic',
          images: [
            'https://www.slashfilm.com/img/gallery/one-piece-film-red-showcases-luffys-new-transformation-for-the-first-time/intro-1667316814.jpg'
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
