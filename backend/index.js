require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs"); // Used to compare passwords

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

//ENV check
if (!uri) {
    console.error("MONGO_URI is missing in .env");
    process.exit(1);
}

// DB connect
mongoose
    .connect(uri)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => {
        console.error("DB connection error:", err);
        process.exit(1);
    });

// Middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // Added 3001 for dashboard
    credentials: true,
}));

app.use(express.json());

// Request Logger
app.use((req, res, next) => {
    console.log(`>>> ${req.method} ${req.url} - body:`, req.body);
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
        console.error("SIGNUP ERROR DETAILS:", err);
        res.status(500).json({ message: `Signup Error: ${err.message}` });
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

        res.status(200).json({
            message: "Login successful",
            success: true,
            user: {
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                createdAt: user.createdAt
            }
        });
    } catch (err) {
        console.error("LOGIN ERROR:", err);
        res.status(500).json({ message: "Internal server error during login" });
    }
});


// DATA SEEDING

app.get("/addHoldings", async (req, res) => {
    try {
        const tempHoldings = [
            { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
            { name: "HDFCBANK", qty: 2, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
            { name: "HINDALCO", qty: 1, avg: 233.9, price: 241.75, net: "+3.36%", day: "+0.08%" },
            { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: true },
            { name: "ITC", qty: 5, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.75%" },
            { name: "KPITTECH", qty: 5, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%" },
            { name: "M&M", qty: 2, avg: 809.9, price: 779.8, net: "-3.72%", day: "-0.01%", isLoss: true },
            { name: "RELIANCE", qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%" },
            { name: "SBIN", qty: 4, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%", isLoss: true },
            { name: "TATASTEEL", qty: 5, avg: 1202.0, price: 1186.5, net: "-1.29%", day: "+0.55%" },
            { name: "WIPRO", qty: 10, avg: 303.45, price: 317.7, net: "+4.69%", day: "-1.58%", isLoss: true },
        ];

        await HoldingsModel.insertMany(tempHoldings);
        res.send("Holdings added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving holdings");
    }
});

app.get("/addPositions", async (req, res) => {
    try {
        const tempPositions = [
            { product: "CNC", name: "EVEREADY", qty: 2, avg: 312.35, price: 308.8, net: "-1.14%", day: "-1.24%", isLoss: true },
            { product: "CNC", name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3082.65, net: "-1.35%", day: "-1.60%", isLoss: true },
        ];

        await PositionsModel.insertMany(tempPositions);
        res.send("Positions added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving positions");
    }
});

// DATA FETCHING 

app.get("/allHoldings", async (req, res) => {
    try {
        const data = await HoldingsModel.find({});
        res.json(data);
    } catch (err) {
        res.status(500).send("Error fetching holdings");
    }
});

app.get("/allPositions", async (req, res) => {
    try {
        const data = await PositionsModel.find({});
        res.json(data);
    } catch (err) {
        res.status(500).send("Error fetching positions");
    }
});


// ORDERS

app.post("/newOrder", async (req, res) => {
    try {
        const { name, qty, price, mode } = req.body;

        const newOrder = new OrdersModel({ name, qty, price, mode });
        await newOrder.save();

        let existingHolding = await HoldingsModel.findOne({ name });

        if (mode === "BUY") {
            if (existingHolding) {
                existingHolding.qty += Number(qty);
                existingHolding.price = price;
                await existingHolding.save();
            } else {
                await HoldingsModel.create({
                    name,
                    qty,
                    avg: price,
                    price,
                    net: "0.00%",
                    day: "0.00%",
                });
            }
        }

        if (mode === "SELL" && existingHolding) {
            existingHolding.qty -= Number(qty);

            if (existingHolding.qty <= 0) {
                await HoldingsModel.deleteOne({ name });
            } else {
                await existingHolding.save();
            }
        }

        res.send("Order processed");
    } catch (err) {
        console.error(err);
        res.status(500).send("Order error");
    }
});


// SERVER

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
