const Order = require("../models/orderModel");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, orderType = "regular", customCake } = req.body;
    const userEmail = req.user?.email;

    if (!userEmail) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    if (orderType === "customCake") {
      if (!customCake?.cakeType || !customCake?.flavor || !customCake?.size) {
        return res.status(400).json({ message: "Please add cake type, flavor, and size" });
      }

      const newOrder = await Order.create({
        items: [],
        totalAmount: 0,
        userEmail,
        orderType,
        customCake,
        status: "Pending",
      });

      return res.json({ success: true, order: newOrder });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = items.map((item) => ({
      productId: item.productId || item._id || item.id,
      title: item.title || item.name || "Bakery item",
      price: Number(item.price) || 0,
      image: item.image,
      qty: Math.max(1, Number(item.qty) || 1),
    }));

    const calculatedTotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const newOrder = await Order.create({
      items: orderItems,
      totalAmount: Number(totalAmount) || calculatedTotal,
      userEmail,
      orderType,
      status: "Pending",
    });

    res.json({ success: true, order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ message: "Error creating order" });
  }
};

// GET ALL ORDERS FOR ADMIN
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error.message);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// GET ORDERS BY USER EMAIL
exports.getOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (req.user?.email !== email) {
      return res.status(403).json({ error: "Cannot access another user's orders" });
    }

    const orders = await Order.find({ userEmail: email }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: "Error fetching orders" });
  }
};
