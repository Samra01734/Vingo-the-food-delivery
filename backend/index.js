import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";

dotenv.config();

const app = express();

connectDb();

app.listen(process.env.PORT || 8000, () => {
  console.log("Server Started");
});
console.log("Mongo URL =", process.env.MONGODB_URL);