import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  Clinic: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic", required: true },
  Patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  Doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  Service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  initianDate: { type: Date, required: true },
  finalDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const Schedule = mongoose.model("Schedule", scheduleSchema);
