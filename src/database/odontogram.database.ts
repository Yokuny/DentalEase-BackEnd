import mongoose from "mongoose";

const odontogramSchema = new mongoose.Schema({
  Patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  Clinic: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic" },
  workToBeDone: { type: String, maxlength: 250, required: true },
  finished: { type: Boolean, default: false },
  teeth: [
    {
      number: { type: Number, maxlength: 3, required: true },
      faces: {
        facial: { type: Boolean, default: false },
        incisal: { type: Boolean, default: false },
        lingual: { type: Boolean, default: false },
        mesial: { type: Boolean, default: false },
        distal: { type: Boolean, default: false },
        occlusal: { type: Boolean, default: false },
        palatal: { type: Boolean, default: false },
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const Odontogram = mongoose.model("Odontogram", odontogramSchema);
