import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = 5000;

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
