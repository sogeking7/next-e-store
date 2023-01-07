const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: String,
  description: String,
  rating: Number,
  price: Number,
  category: String,
  brand: String,
  thumbnail: String,
  images: {
    type: [String],
    required: true,
    default: ['https://img.freepik.com/free-vector/glitch-error-404-page_23-2148105404.jpg?w=2000']
  },
})

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
