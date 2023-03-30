import React from "react";
import { prisma } from "../../../lib/prisma";


export default async function handler(req, res) {
  const {method} = req;
  const productId = req.query.id;

  switch(method) {
    case 'GET':
      const session = await getServerAuthSession({ req, res });

      // if (!session) {
      //   res.status(401).json({ message: "You must be logged in." });
      //   return;
      // }

      return res.json({session})
    case 'POST':
      return res.status(200).json("Post")
      break
    case 'PUT':


      // const session = await prisma.Session.findUnique({where: {sessionToken: token}})
      //
      // const user = await prisma.user.findUnique({
      //   where: { id: userId },
      // });
      //
      // const wishlistIDs = user.wishlistIDs || [];
      //
      // if (!wishlistIDs.includes(productId)) {
      //   wishlistIDs.push(productId);
      // }
      //
      // const updatedUser = await prisma.user.update({
      //   where: { id: userId },
      //   data: { wishlistIDs },
      // });

      res.status(200).json('OK');
      break
    case 'DELETE':
      res.status(200).json({ method, name: "DELETE request"});
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end('Method ${method} Not Allowed')
  }
}