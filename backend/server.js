
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect Database
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

const carRoutes = require("./routes/carRoutes"); 
app.use("/api/cars", carRoutes);

app.use("/api/bookings", require("./routes/bookingRoutes"));

app.use("/api/payments", require("./routes/paymentRoutes"));

// Serve React Frontend
// ---------------------
app.use(express.static(path.join(__dirname, "frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});


