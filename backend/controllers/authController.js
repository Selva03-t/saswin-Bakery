const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here";

const isAdminEmail = (email) =>
  process.env.ADMIN_EMAIL &&
  email?.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase();

const createToken = (user) =>
  jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: "7d",
  });

const sendLoginResponse = (res, user) => {
  const token = createToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    user: {
      name: user.name,
      email: user.email,
      role: user.role || "user",
    },
  });
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please add all required fields" });
    }

    if (isAdminEmail(email)) {
      return res.status(400).json({ error: "Use admin login credentials" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPass,
      role: "user",
    });

    res.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration failed:", error.message);
    return res.status(500).json({ error: "Registration failed" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please add email and password" });
    }

    if (isAdminEmail(email)) {
      if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const hashedPass = await bcrypt.hash(password, 10);
      const adminUser = await User.findOneAndUpdate(
        { email },
        {
          name: "Admin",
          email,
          password: hashedPass,
          role: "admin",
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      return sendLoginResponse(res, adminUser);
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    return sendLoginResponse(res, user);
  } catch (error) {
    console.error("Login failed:", error.message);
    return res.status(500).json({ error: "Login failed" });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out" });
};
