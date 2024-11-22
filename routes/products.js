const express = require("express");
const router = express.Router();

// Starting products data
let products = [
  { id: 1, name: "Laptop", price: 40000, stock: 10 },
  { id: 2, name: "tablet", price: 30000, stock: 20 },
  { id: 3, name: "smartphone", price: 20000, stock: 30 }
];

// GET: Fetch all products
router.get("/", (req, res) => {
  res.json(products);
});

// GET: Fetch product by ID
router.get("/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// POST: Add a new product
router.post("/", (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;
  const productWithIdAtTop = { id: newProduct.id, ...newProduct };
  products.push(productWithIdAtTop);
  res.status(201).json(productWithIdAtTop);
});

// PUT: Replace a product by ID
router.put("/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    products[productIndex] = { id: productId, ...req.body };
    res.json(products[productIndex]);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// PATCH: Update specific fields of a product by ID
router.patch("/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...req.body };
    res.json(products[productIndex]);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// DELETE: Remove a product by ID
router.delete("/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    const deletedProduct = products[productIndex];
    products.splice(productIndex, 1);
    res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct
    });
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

module.exports = router;
