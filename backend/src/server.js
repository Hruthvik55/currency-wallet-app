// // backend/src/server.js
// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// import userRoutes from "./routes/userRoutes.js";       // signup/login
// import walletRoutes from "./routes/walletRoutes.js";   // wallet endpoints

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/users", userRoutes);     // <- IMPORTANT: use "/api/users"
// app.use("/api/wallet", walletRoutes);

// // Root route
// app.get("/", (req, res) => {
//   res.send("Currency Wallet API is running...");
// });

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("✅ MongoDB connected successfully");
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//   });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// import userRoutes from "./routes/userRoutes.js";
// import walletRoutes from "./routes/walletRoutes.js";

// dotenv.config();

// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173", // local frontend
//     ],
//     credentials: true,
//   })
// );

// app.use(express.json());

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/wallet", walletRoutes);

// // Root route
// app.get("/", (req, res) => {
//   res.send("Currency Wallet API is running...");
// });

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB connected successfully");
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//   });

// // Start Server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";

dotenv.config();

const app = express();

// ======================================
// CORS CONFIG (FINAL FIX)
// ======================================
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "https://currency-wallet-app.vercel.app", // ACTUAL deployed frontend
  "https://currency-wallet-a64afrf0f-hruthvik-rs-projects.vercel.app" // optional (old link)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

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