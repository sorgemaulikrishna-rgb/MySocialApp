const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- MODELS ---
const Product = mongoose.model("Product", {
  sellerId: String,
  title: String,
  description: String,
  price: Number,
  image: String,
  stock: Number,
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", {
  buyerId: String,
  productId: String,
  quantity: Number,
  totalPrice: Number,
  status: { type: String, default: "pending" }, // pending, shipped, delivered
  createdAt: { type: Date, default: Date.now }
});

// --- ROUTES ---

// 1. CREATE PRODUCT (सेलर के लिए)
router.post("/shop/product/create", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ message: "Product listed in shop! 🛍️", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET ALL PRODUCTS (शॉपिंग फीड)
router.get("/shop/products", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json({ total: products.length, products });
});

// 3. PURCHASE PRODUCT (ऑर्डर प्लेस करना)
router.post("/shop/order", async (req, res) => {
  const { buyerId, productId, quantity } = req.body;
  
  try {
    const product = await Product.findById(productId);
    if (!product || product.stock < quantity) {
      return res.status(400).json({ message: "Out of stock or invalid product" });
    }

    // स्टॉक अपडेट करें
    product.stock -= quantity;
    await product.save();

    const order = new Order({
      buyerId, 
      productId, 
      quantity, 
      totalPrice: product.price * quantity
    });

    await order.save();
    res.json({ message: "Order placed successfully! 📦", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
