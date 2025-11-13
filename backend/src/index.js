import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDb } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authRoutes);

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server berjalan di port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Gagal konek ke MongoDB:", err);
  });
