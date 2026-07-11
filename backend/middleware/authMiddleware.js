const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here";

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

exports.requireAdmin = (req, res, next) => {
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const userEmail = req.user?.email?.toLowerCase();

  if (req.user?.role === "admin" || (adminEmail && userEmail === adminEmail)) {
    return next();
  }

  return res.status(403).json({ error: "Admin access required" });
};
