require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

// Services
const { getStockData } = require("./model/stockService");

// Models
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const User = require("./model/UserModel");

const app = express();

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URI;

// ENV check
if (!uri) {
    console.error("MONGO_URI is missing in .env");
    process.exit(1);
}

// DB connect (improved)
// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log("MongoDB connected successfully"))
//     .catch((err) => {
//         console.error("DB connection error:", err);
//         process.exit(1);
//     });

mongoose.connect(uri)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => {
        console.error("DB connection error:", err);
        process.exit(1);
    });


// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://zerodha-clone-stock-2.onrender.com'],
  credentials: true
}));
app.use(express.json());

// Root route (IMPORTANT for Render)
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// Request Logger
app.use((req, res, next) => {
    console.log(`>>> ${req.method} ${req.url}`);
    next();
});

// STOCK ROUTES
app.get("/stock/:symbol", async (req, res) => {
    try {
        const data = await getStockData(req.params.symbol);
        res.json(data);
    } catch (err) {
        console.error("STOCK FETCH ERROR:", err);
        res.status(500).json({ error: "Failed to fetch stock data" });
    }
});

// HOLDINGS ROUTES
app.get("/allHoldings", async (req, res) => {
    try {
        const holdings = await HoldingsModel.find({});
        res.json(holdings);
    } catch (err) {
        console.error("HOLDINGS ERROR:", err);
        res.status(500).json({ error: "Failed to fetch holdings" });
    }
});

// AUTH ROUTES
app.post("/signup", async (req, res) => {
    try {
        const { email, username, password, fullName } = req.body;

        if (!email || !username || !password || !fullName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const existingUserByName = await User.findOne({ username });
        if (existingUserByName) {
            return res.status(400).json({ message: "Username already taken" });
        }

        const user = new User({ email, username, password, fullName });
        await user.save();

        res.status(201).json({ message: "User registered successfully", success: true });
    } catch (err) {
        console.error("SIGNUP ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Secure: remove password from response
        const safeUser = user.toObject();
        delete safeUser.password;

        res.status(200).json({
            message: "Login successful",
            success: true,
            user: safeUser
        });
    } catch (err) {
        console.error("LOGIN ERROR:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ORDERS ROUTES
app.post("/newOrder", async (req, res) => {
    try {
        const order = new OrdersModel(req.body);
        await order.save();
        res.status(201).json({ message: "Order created successfully", order });
    } catch (err) {
        console.error("NEW ORDER ERROR:", err);
        res.status(500).json({ message: "Failed to create order" });
    }
});

// SERVER
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
