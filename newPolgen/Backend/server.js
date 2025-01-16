import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./models/index.js"; // Correct Sequelize instance import
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js"; // Import product routes
import excelRoutes from "./routes/excelRoutes.js";
import specificmailRoutes from "./routes/specificmailRoutes.js"; // Import mail routes

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);

// Test Database Connection and Sync Models
(async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected successfully");

    // Sync database
    await sequelize.sync({ force: false }); // Use `force: true` only during development to recreate tables
    console.log("Database synchronized successfully");
  } catch (err) {
    console.error("Database connection or sync error:", err);
  }
})();

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/products", productRoutes); // Product routes
app.use("/api/excel", excelRoutes);
app.use("/api/mail", specificmailRoutes); // Mail routes

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running at running on the server vps in port ${PORT}`);
});
