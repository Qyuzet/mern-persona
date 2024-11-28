import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./router/user.route.js";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());
app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  await connectDB(); // Ensure DB connection is established before starting the server

  app.listen(PORT, () => {
    console.log("Server started at http://localhost:5000");
  });
};

startServer();
