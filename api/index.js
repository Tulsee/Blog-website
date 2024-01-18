import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import UserRoutes from "./routes/user.route.js";
import AuthRoutes from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.use("/api/user", UserRoutes);
app.use("/api/auth", AuthRoutes);

app.listen(3000, () => {
  console.log("server is running at port 3000");
});
