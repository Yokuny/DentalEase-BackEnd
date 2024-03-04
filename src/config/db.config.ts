import mongoose from "mongoose";
import { env } from "./env.config";

export const dbConnect = async () => {
  const MONGO_URI = env.MONGODB_URI;

  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.error("<>ERR<>", error);
  }
};
