import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler.js";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import subtitlesRoutes from "./routes/subtitles.route.js";

import dotenv from "dotenv";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/subtitles", subtitlesRoutes);

if (process.env.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

app.use(errorHandler);

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
