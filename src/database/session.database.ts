import mongoose from "mongoose";

export const sessionSchema = new mongoose.Schema({
  token: { type: String, required: true },
  clinic: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export const Session = mongoose.model("Session", sessionSchema);
