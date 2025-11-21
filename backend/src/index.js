import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDb } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, io, server } from "./lib/socket.js";

dotenv.config();

// const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

connectDb()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`✅ Server berjalan di port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Gagal konek ke MongoDB:", err);
  });
