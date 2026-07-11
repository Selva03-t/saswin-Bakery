const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  getFeaturedProducts
} = require("../controllers/productController");

// PUBLIC ROUTES
router.get("/featured", getFeaturedProducts);
router.get("/", getProducts);
router.get("/:id", getProductById);

// ADMIN ROUTE (auth later)
router.post("/", createProduct);

module.exports = router;
