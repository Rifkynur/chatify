import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`mongo db connected ${conn.connection.host}`);
  } catch (error) {
    console.log("gagal " + error);
  }
};
