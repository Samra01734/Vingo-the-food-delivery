import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors"


dotenv.config();

const app = express();
app.use(express.json())
app.use(cookieParser());
app.use("/api/auth",authRouter)
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
connectDb();

app.listen(process.env.PORT || 8000, () => {
  console.log("Server Started");
});
console.log("Mongo URL =", process.env.MONGODB_URL);