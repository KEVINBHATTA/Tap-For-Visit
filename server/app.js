import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";
import passport from "passport";

// 1. Load environment variables
dotenv.config();

// 2. Override DNS for Windows SRV Resolution
if (process.platform === "win32") {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

// 3. Register Passport Config (Import strategy AFTER dotenv.config())
import "./config/passport.js";

// 4. Import Routes
import authRoutes from "./routes/authRoutes.js";
import profileRouter from "./routes/userProfileRouter.js";

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGODB_URL || process.env.MONGO_URI;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.CLIENT_URL].filter(Boolean),
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRouter);

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;
  res.status(databaseConnected ? 200 : 503).json({
    status: databaseConnected ? "OK" : "NOT_READY",
    database: databaseConnected ? "connected" : "disconnected",
    timestamp: new Date(),
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Global Server Error:", err.stack || err.message);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const startServer = async () => {
  if (!DB_URL) {
    throw new Error("MongoDB connection URL is missing (set MONGODB_URL or MONGO_URI)");
  }

  await mongoose.connect(DB_URL);
  console.log("✅ Connected to MongoDB successfully");

  app.listen(PORT, () => {
    console.log(`🚀 Server is actively running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("❌ Server startup failed:", error.message);
  process.exitCode = 1;
});