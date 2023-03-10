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
        {
          title: 'Fantastic Fresh Car',
          description: 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
          price: 948,
          rating: 3,
          category: 'smartphones',
          brand: 'Xiaomi',
          images: [
            'https://images.unsplash.com/photo-1677843019211-0c1ba7e1f377?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Electronic Steel Soap',
          description: 'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
          price: 947,
          rating: 3,
          category: 'smart-watches',
          brand: 'Sony',
          images: [
            'https://images.unsplash.com/photo-1673767645452-e1a0a19c63c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Gorgeous Granite Soap',
          description: 'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
          price: 778,
          rating: 3,
          category: 'tablet',
          brand: 'Lg',
          images: [
            'https://images.unsplash.com/photo-1674126221533-2d2a59ee75b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Handcrafted Fresh Keyboard',
          description: 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
          price: 527,
          rating: 5,
          category: 'headphones',
          brand: 'Sony',
          images: [
            'https://images.unsplash.com/photo-1677678170299-107b3d2fcc86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Sleek Metal Car',
          description: 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
          price: 393,
          rating: 5,
          category: 'laptops',
          brand: 'Netflix',
          images: [
            'https://images.unsplash.com/photo-1674293924775-12eb13d0c33e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Handmade Rubber Table',
          description: 'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
          price: 274,
          rating: 1,
          category: 'computers',
          brand: 'Sony',
          images: [
            'https://images.unsplash.com/photo-1674293924711-a3eaf0d99621?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Small Cotton Bike',
          description: 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
          price: 932,
          rating: 2,
          category: 'computers',
          brand: 'Qazaq Republic',
          images: [
            'https://images.unsplash.com/photo-1677802069593-22242be62903?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Unbranded Cotton Cheese',
          description: 'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
          price: 919,
          rating: 2,
          category: 'computers',
          brand: 'Qazaq Republic',
          images: [
            'https://images.unsplash.com/photo-1677717340538-aa195310528d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDl8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Gorgeous Cotton Ball',
          description: 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
          price: 227,
          rating: 1,
          category: 'fitness-bracelets',
          brand: 'Spotify',
          images: [
            'https://images.unsplash.com/photo-1674293924759-29763bc21e81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Handmade Plastic Chicken',
          description: 'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
          price: 897,
          rating: 5,
          category: 'smartphones',
          brand: 'Lg',
          images: [
            'https://images.unsplash.com/photo-1674293924748-331d96aa783c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDExfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Intelligent Rubber Car',
          description: 'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
          price: 134,
          rating: 1,
          category: 'electronic-books',
          brand: 'Netflix',
          images: [
            'https://images.unsplash.com/photo-1677590297057-60521d6ac6d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEyfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Licensed Fresh Towels',
          description: 'The Football Is Good For Training And Recreational Purposes',
          price: 367,
          rating: 4,
          category: 'headphones',
          brand: 'Lg',
          images: [
            'https://images.unsplash.com/photo-1677520108121-5a7dd932f170?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Fantastic Concrete Shirt',
          description: 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
          price: 582,
          rating: 4,
          category: 'computers',
          brand: 'Lg',
          images: [
            'https://images.unsplash.com/photo-1677415499531-78228f8bf81c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Tasty Concrete Keyboard',
          description: 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
          price: 677,
          rating: 4,
          category: 'headphones',
          brand: 'Xiaomi',
          images: [
            'https://images.unsplash.com/photo-1677404319651-5d122d5dfd24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE1fGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Intelligent Cotton Table',
          description: "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
          price: 231,
          rating: 5,
          category: 'electronic-books',
          brand: 'Sony',
          images: [
            'https://images.unsplash.com/photo-1677199657064-170659fcd62b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Luxurious Wooden Sausages',
          description: 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
          price: 279,
          rating: 4,
          category: 'electronic-books',
          brand: 'Sony',
          images: [
            'https://images.unsplash.com/photo-1677199656634-42f98551f1bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Small Plastic Bacon',
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
          title: 'Licensed Frozen Computer',
          description: 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
          price: 30,
          rating: 5,
          category: 'fitness-bracelets',
          brand: 'Apple',
          images: [
            'https://plus.unsplash.com/premium_photo-1677373563311-f78fd5241d5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Unbranded Granite Hat',
          description: 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
          price: 472,
          rating: 4,
          category: 'tablet',
          brand: 'Apple',
          images: [
            'https://plus.unsplash.com/premium_photo-1677234282671-ed835a226405?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIwfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Sleek Wooden Soap',
          description: 'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
          price: 826,
          rating: 4,
          category: 'electronic-books',
          brand: 'Spotify',
          images: [
            'https://images.unsplash.com/photo-1677941931332-3bcf18b0a1ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Small Wooden Pizza',
          description: 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
          price: 751,
          rating: 5,
          category: 'electronic-books',
          brand: 'Apple',
          images: [
            'https://images.unsplash.com/photo-1673767645452-e1a0a19c63c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Bespoke Metal Hat',
          description: 'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
          price: 204,
          rating: 3,
          category: 'fitness-bracelets',
          brand: 'Netflix',
          images: [
            'https://images.unsplash.com/photo-1677678170299-107b3d2fcc86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Oriental Cotton Chicken',
          description: 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
          price: 761,
          rating: 2,
          category: 'smartphones',
          brand: 'Netflix',
          images: [
            'https://images.unsplash.com/photo-1674293924711-a3eaf0d99621?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Licensed Wooden Chicken',
          description: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
          price: 807,
          rating: 4,
          category: 'tablet',
          brand: 'Netflix',
          images: [
            'https://images.unsplash.com/photo-1677717340538-aa195310528d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDl8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Unbranded Soft Towels',
          description: 'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
          price: 207,
          rating: 1,
          category: 'all',
          brand: 'Apple',
          images: [
            'https://images.unsplash.com/photo-1674293924748-331d96aa783c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDExfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Bespoke Granite Table',
          description: 'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
          price: 974,
          rating: 5,
          category: 'tablet',
          brand: 'Xiaomi',
          images: [
            'https://images.unsplash.com/photo-1677415499531-78228f8bf81c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Licensed Metal Chair',
          description: "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
          price: 479,
          rating: 1,
          category: 'headphones',
          brand: 'Netflix',
          images: [
            'https://images.unsplash.com/photo-1677199657064-170659fcd62b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Elegant Steel Shirt',
          description: "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
          price: 481,
          rating: 4,
          category: 'laptops',
          brand: 'Apple',
          images: [
            'https://images.unsplash.com/photo-1677199656634-42f98551f1bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Practical Metal Tuna',
          description: 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
          price: 158,
          rating: 5,
          category: 'computers',
          brand: 'Samsung',
          images: [
            'https://plus.unsplash.com/premium_photo-1677373563311-f78fd5241d5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Generic Bronze Salad',
          description: 'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
          price: 749,
          rating: 1,
          category: 'headphones',
          brand: 'Sony',
          images: [
            'https://images.unsplash.com/photo-1677843019211-0c1ba7e1f377?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Practical Wooden Cheese',
          description: 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
          price: 797,
          rating: 5,
          category: 'tablet',
          brand: 'Qazaq Republic',
          images: [
            'https://images.unsplash.com/photo-1674126221533-2d2a59ee75b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Sleek Steel Mouse',
          description: 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
          price: 983,
          rating: 2,
          category: 'headphones',
          brand: 'Qazaq Republic',
          images: [
            'https://images.unsplash.com/photo-1674293924775-12eb13d0c33e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Fantastic Metal Tuna',
          description: 'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
          price: 916,
          rating: 1,
          category: 'computers',
          brand: 'Lg',
          images: [
            'https://images.unsplash.com/photo-1677802069593-22242be62903?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Modern Concrete Towels',
          description: 'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
          price: 358,
          rating: 2,
          category: 'tablet',
          brand: 'Xiaomi',
          images: [
            'https://images.unsplash.com/photo-1674293924759-29763bc21e81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Oriental Fresh Towels',
          description: 'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
          price: 118,
          rating: 5,
          category: 'computers',
          brand: 'Netflix',
          images: [
            'https://images.unsplash.com/photo-1677590297057-60521d6ac6d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEyfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Unbranded Granite Fish',
          description: 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
          price: 489,
          rating: 5,
          category: 'computers',
          brand: 'Netflix',
          images: [
            'https://images.unsplash.com/photo-1677520108121-5a7dd932f170?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Refined Fresh Fish',
          description: 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
          price: 447,
          rating: 5,
          category: 'all',
          brand: 'Lg',
          images: [
            'https://images.unsplash.com/photo-1677404319651-5d122d5dfd24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE1fGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Licensed Fresh Fish',
          description: 'The Football Is Good For Training And Recreational Purposes',
          price: 896,
          rating: 2,
          category: 'laptops',
          brand: 'Samsung',
          images: [
            'https://plus.unsplash.com/premium_photo-1677373562811-beb477dca3ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Practical Rubber Chair',
          description: 'The Football Is Good For Training And Recreational Purposes',
          price: 265,
          rating: 2,
          category: 'smartphones',
          brand: 'Qazaq Republic',
          images: [
            'https://plus.unsplash.com/premium_photo-1677234282671-ed835a226405?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIwfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Incredible Steel Tuna',
          description: 'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
          price: 349,
          rating: 2,
          category: 'computers',
          brand: 'Sony',
          images: [
            'https://images.unsplash.com/photo-1677941931332-3bcf18b0a1ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Licensed Steel Bacon',
          description: 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
          price: 984,
          rating: 2,
          category: 'smartphones',
          brand: 'Netflix',
          images: [
            'https://images.unsplash.com/photo-1674126221533-2d2a59ee75b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Gorgeous Cotton Bacon',
          description: 'The Football Is Good For Training And Recreational Purposes',
          price: 936,
          rating: 4,
          category: 'computers',
          brand: 'Lg',
          images: [
            'https://images.unsplash.com/photo-1674293924711-a3eaf0d99621?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Tasty Soft Bike',
          description: 'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
          price: 513,
          rating: 2,
          category: 'tablet',
          brand: 'Lg',
          images: [
            'https://images.unsplash.com/photo-1674293924759-29763bc21e81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Unbranded Fresh Tuna',
          description: 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
          price: 451,
          rating: 1,
          category: 'tablet',
          brand: 'Apple',
          images: [
            'https://images.unsplash.com/photo-1677520108121-5a7dd932f170?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Electronic Frozen Car',
          description: 'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
          price: 904,
          rating: 1,
          category: 'electronic-books',
          brand: 'Qazaq Republic',
          images: [
            'https://images.unsplash.com/photo-1677199657064-170659fcd62b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Generic Fresh Salad',
          description: 'The Football Is Good For Training And Recreational Purposes',
          price: 385,
          rating: 4,
          category: 'smart-watches',
          brand: 'Qazaq Republic',
          images: [
            'https://plus.unsplash.com/premium_photo-1677373562811-beb477dca3ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Intelligent Steel Bike',
          description: 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
          price: 938,
          rating: 2,
          category: 'computers',
          brand: 'Spotify',
          images: [
            'https://images.unsplash.com/photo-1677843019211-0c1ba7e1f377?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Luxurious Steel Cheese',
          description: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
          price: 584,
          rating: 2,
          category: 'all',
          brand: 'Samsung',
          images: [
            'https://images.unsplash.com/photo-1677678170299-107b3d2fcc86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Incredible Steel Mouse',
          description: 'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
          price: 528,
          rating: 1,
          category: 'fitness-bracelets',
          brand: 'Lg',
          images: [
            'https://images.unsplash.com/photo-1677802069593-22242be62903?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Recycled Soft Towels',
          description: 'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
          price: 230,
          rating: 5,
          category: 'all',
          brand: 'Xiaomi',
          images: [
            'https://images.unsplash.com/photo-1674293924748-331d96aa783c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDExfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Awesome Soft Pizza',
          description: 'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
          price: 753,
          rating: 1,
          category: 'computers',
          brand: 'Qazaq Republic',
          images: [
            'https://images.unsplash.com/photo-1677404319651-5d122d5dfd24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE1fGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Practical Bronze Towels',
          description: 'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
          price: 4,
          rating: 2,
          category: 'all',
          brand: 'Sony',
          images: [
            'https://plus.unsplash.com/premium_photo-1677373563311-f78fd5241d5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Intelligent Fresh Pants',
          description: 'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
          price: 58,
          rating: 5,
          category: 'fitness-bracelets',
          brand: 'Sony',
          images: [
            'https://images.unsplash.com/photo-1673767645452-e1a0a19c63c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Gorgeous Granite Car',
          description: 'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
          price: 530,
          rating: 5,
          category: 'smart-watches',
          brand: 'Lg',
          images: [
            'https://images.unsplash.com/photo-1674293924775-12eb13d0c33e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Ergonomic Metal Chicken',
          description: 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
          price: 882,
          rating: 4,
          category: 'headphones',
          brand: 'Sony',
          images: [
            'https://images.unsplash.com/photo-1677717340538-aa195310528d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDl8aVVJc25WdGpCMFl8fGVufDB8fHx8&w=1000&q=80'
          ]
        },
        {
          title: 'Fantastic Soft Table',
          description: 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
          price: 8,
          rating: 2,
          category: 'headphones',
          brand: 'Qazaq Republic',
          images: [
            'https://images.unsplash.com/photo-1677590297057-60521d6ac6d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEyfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Electronic Rubber Computer',
          description: 'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
          price: 532,
          rating: 3,
          category: 'electronic-books',
          brand: 'Netflix',
          images: [
            'https://images.unsplash.com/photo-1677415499531-78228f8bf81c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Oriental Concrete Pizza',
          description: 'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
          price: 64,
          rating: 1,
          category: 'tablet',
          brand: 'Lg',
          images: [
            'https://images.unsplash.com/photo-1677199656634-42f98551f1bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
          ]
        },
        {
          title: 'Bespoke Plastic Cheese',
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