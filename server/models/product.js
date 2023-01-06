const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create geolocation Schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
})

const ProductSchema = new Schema({
  title: String,
  price: Number,
  imageUrl: String,
})

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
