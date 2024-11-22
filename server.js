const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Import products routes
const productRoutes = require("./routes/products");

// Use the routes
app.use("/products", productRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/products`);
});
