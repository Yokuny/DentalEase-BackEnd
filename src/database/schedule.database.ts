import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  Patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  Clinic: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic", required: true },
  Doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  Odontogram: { type: mongoose.Schema.Types.ObjectId, ref: "Odontogram" },
  initianDate: { type: Date, required: true },
  finalDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const Schedule = mongoose.model("Schedule", scheduleSchema);
