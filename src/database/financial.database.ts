import mongoose from "mongoose";

const procedureSchema = new mongoose.Schema({
  procedure: { type: String, maxlength: 250, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: "pending", enum: ["pending", "paid", "canceled"], required: true },
});

const financialSchema = new mongoose.Schema({
  Clinic: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic", required: true },
  Patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  Doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  Odontogram: { type: mongoose.Schema.Types.ObjectId, ref: "Odontogram" },
  procedures: { type: [procedureSchema], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Financial = mongoose.model("Financial", financialSchema);
