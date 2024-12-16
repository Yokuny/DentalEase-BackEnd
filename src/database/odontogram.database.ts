import mongoose from "mongoose";

const financialStatus = ["pending", "partial", "paid", "refund", "canceled"];

const procedures = [
  {
    procudere: { type: String, maxlength: 250, required: true },
    price: { type: Number, required: true },
    status: { type: String, default: "pending", enum: financialStatus, required: true },
  },
];

const odontogramSchema = new mongoose.Schema({
  Clinic: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic", required: true },
  Patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  Doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  procedures: { type: [procedures], required: true },
  finished: { type: Boolean, default: false, required: true },
  teeth: [
    {
      number: { type: Number, maxlength: 3, required: true },
      // Procedures here
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
