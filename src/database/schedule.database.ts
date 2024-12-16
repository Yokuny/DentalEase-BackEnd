import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  Clinic: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic", required: true },
  Patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  Doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  Financial: { type: mongoose.Schema.Types.ObjectId, ref: "Financial", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const Schedule = mongoose.model("Schedule", scheduleSchema);
