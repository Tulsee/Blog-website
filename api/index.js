import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import UserRoutes from "./routes/user.route.js";
import AuthRoutes from "./routes/auth.route.js";
import PostRoute from "./routes/post.route.js";
import CommentRoute from "./routes/comment.route.js";

import path from "path";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", UserRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/post", PostRoute);
app.use("/api/comment", CommentRoute);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("server is running at port 3000");
});
