import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  token: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  clinic: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic", required: false },
  createdAt: { type: Date, default: Date.now },
});

export const Session = mongoose.model("Session", sessionSchema);
