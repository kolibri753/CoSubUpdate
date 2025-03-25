import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/auth.route.js";
import subtitlesRoutes from "./routes/subtitles.route.js";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/subtitles", subtitlesRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
