if (process.platform === "win32") {
  const dns = require("dns");
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGODB_URL;
const cors = require("cors");

// CORS configuration rules load first
app.use(
  cors({
    origin:[ "http://localhost:5173",
    process.env.CLIENT_URL, ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Body parser handles payload parsing next
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.send("Backend server is fully reachable!");
});
// Declare and mount routes last
const profileRouter = require("./routes/userProfileRouter");
app.use("/api/userProfile", profileRouter);


// Catch-all error handler — must be last, after all routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB", err);
  });
