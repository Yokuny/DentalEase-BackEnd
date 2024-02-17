import mongoose from "mongoose";

export const dbConnect = async () => {
  const MONGO_URI = process.env.MONGODB_URI;

  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.error("<>ERR<>", error);
  }
};
