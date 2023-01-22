
const mongoose = require('mongoose')
import clientPromise from "../../../utils/db";

export const getProductById = async (id) => {
  const client = await clientPromise;
  const db = client.db("test")
  const collection = db.collection('products')

  try {
    const data = await collection
      .find({ _id: mongoose.Types.ObjectId(id) })
      .toArray()
    return data[0]
  } catch (error) {
    return { error: error.message }
  }
}

export default async (req, res) => {
  const id = req.query.id;
  const data = await getProductById(id);
  res.status(200).json(JSON.parse(JSON.stringify(data)))
}