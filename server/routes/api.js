const express = require("express");
const router = express.Router();

const Product = require("../models/product");

// get a list of products from the db
router.get("/products", (req, res, next) => {
  Product.find({}).then((products) => {
    res.send(products);
  });
  // res.send({ type: "GET" });
});
router.get("/products/:id", (req, res, next) => {
  const id = req.params.id;
  // Product.findById(id).then((products) => {
  //   res.send(products);
  // });
  // res.send({ type: "GET" });

  //GPT response
  Product.findById(id)
    .then((product) => {
      if (!product) {
        res.status(404).send({ message: "Product not found" });
      } else {
        res.send(product);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Invalid product ID" });
      } else {
        next(err);
      }
    });
});

// add a new product to the db
router.post("/products", (req, res, next) => {

  Product.create(req.body)
    .then((product) => {
      res.send(product);
    })
    .catch(next);
});

// update a product in the db
router.put("/products/:id", (req, res, next) => {
  Product.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Product.findOne({ _id: req.params.id }).then((product) => {
      res.send(product);
    });
    // res.send(product);
  });
});

// delete a product from the db
router.delete("/products/:id", (req, res, next) => {
  Product.findByIdAndRemove({ _id: req.params.id }).then((product) => {
    res.send(product);
  });
  // console.log(req.params.id);
  // res.send({ type: "DELETE" });
});

module.exports = router;
