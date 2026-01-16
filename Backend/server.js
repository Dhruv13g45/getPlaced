import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import {createServer} from "node:http";
import {Server}  from "socket.io";

dotenv.config();
const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Atlas connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
  }
};

connectDB();

app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
