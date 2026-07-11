const express = require("express");
const { protect, requireAdmin } = require("../middleware/authMiddleware");
const { createOrder, getAllOrders, getOrdersByEmail } = require("../controllers/orderController");

const router = express.Router();

// Protected routes
router.post("/", protect, createOrder);
router.get("/", protect, requireAdmin, getAllOrders);
router.get("/:email", protect, getOrdersByEmail);

module.exports = router;
