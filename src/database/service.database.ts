import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  Clinic: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic", required: true },
  Patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  Doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  Odontogram: { type: mongoose.Schema.Types.ObjectId, ref: "Odontogram" },
  workToBeDone: { type: String, maxlength: 250, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: "pending", enum: ["pending", "paid", "canceled"], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Odontogram = mongoose.model("Service", serviceSchema);
