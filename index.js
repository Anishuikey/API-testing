const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Starting products data
let products = [
  { id: 1, name: "Laptop", price: 40000, stock: 10 },
  { id: 2, name: "tablet", price: 30000, stock: 20 },
  { id: 3, name: "smartphone", price: 20000, stock: 30 }
];

// GET: Fetch all products
app.get("/products", (req, res) => {
  res.json(products);  // Responds with all products
});

// GET: Fetch product by ID
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === productId);
  if (product) {
    console.log(product)
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// POST: Add a new product
// POST: Add a new product
app.post("/products", (req, res) => {
  const newProduct = req.body;

  // Generate the new product ID
  newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;

  // Create a new object with 'id' at the top
  const productWithIdAtTop = { id: newProduct.id, ...newProduct };

  // Add the product to the products array
  products.push(productWithIdAtTop);

  // Respond with the new product and ensure 'id' is at the top
  res.status(201).json(productWithIdAtTop);
});


// PUT: Replace a product by ID
app.put("/products/:id", (req, res) => {
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
app.patch("/products/:id", (req, res) => {
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
app.delete("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);  // Get the product ID from the URL
  const productIndex = products.findIndex((p) => p.id === productId);  // Find the product's index

  if (productIndex !== -1) {
    const deletedProduct = products[productIndex];  // Store the product that will be deleted
    products.splice(productIndex, 1);  // Delete the product from the array
    res.status(200).json({
      message: "Product deleted successfully",  // Success message
      deletedProduct  // Return the deleted product's details
    });
  } else {
    res.status(404).json({ error: "Product not found" });  // Return error if the product is not found
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/products/:id`);
});
