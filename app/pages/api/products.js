import clientPromise from '../../utils/db'

export const getAllProducts = async () => {
  const client = await clientPromise;
  const db = client.db("test")
  const collection = db.collection('products')

  try {
    const data = await collection
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    return { error: error.message }
  }
}

export default async (req, res) => {
  const data = await getAllProducts();
  res.status(200).json(data);
}