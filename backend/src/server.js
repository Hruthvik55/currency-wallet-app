import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";

dotenv.config();

const app = express();

// ======================================
// CORS CONFIG
// ======================================
const allowedOrigins = [
  "http://localhost:5173",
  "https://currency-wallet-app.vercel.app",
  "https://currency-wallet-frontend.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an origin, e.g. Postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ======================================
// MIDDLEWARE
// ======================================
app.use(express.json());

// ======================================
// ROUTES
// ======================================
app.use("/api/users", userRoutes);
app.use("/api/wallet", walletRoutes);

// ======================================
// ROOT ROUTE
// ======================================
app.get("/", (req, res) => {
  res.send("Currency Wallet API is running...");
});

// ======================================
// DATABASE CONNECTION
// ======================================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// ======================================
// START SERVER
// ======================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});