import mongoose from "mongoose";

const clinicSchema = new mongoose.Schema({
  name: { type: String, minlength: 5, maxlength: 26, required: true },
  email: { type: String, minlength: 5, maxlength: 50, required: true, unique: true },
  code: { type: String, minlength: 6, maxlength: 25, required: true, unique: true },
  cnpj: { type: String, minlength: 11, maxlength: 14, required: false, unique: true },
  users: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      role: { type: String, enum: ["admin", "doctor", "assistant"] },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const Clinic = mongoose.model("Clinic", clinicSchema);
