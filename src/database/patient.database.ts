import mongoose from "mongoose";

const anamnesisSchema = new mongoose.Schema({
  mainComplaint: { type: String },

  gumsBleedEasily: { type: Boolean },
  sensitiveTeeth: { type: Boolean },

  allergicToMedication: { type: Boolean },
  medicationAllergy: { type: String },

  bitesPenOrPencil: { type: Boolean },
  nailsBiting: { type: Boolean },
  otherHarmfulHabits: { type: String },

  pregnant: { type: Boolean },
  pregnancyMonth: { type: Number },
  breastfeeding: { type: Boolean },

  underMedicalTreatment: { type: Boolean },
  medicalTreatmentDetails: { type: String },

  takingMedication: { type: Boolean },
  medicationDetails: { type: String },

  infectiousDisease: { type: String },

  smoker: { type: Boolean },
  alcoholConsumer: { type: Boolean },

  illnesses: {
    diabetes: { type: Boolean, default: false },
    tuberculosis: { type: Boolean, default: false },
    heartProblems: { type: Boolean, default: false },
    arthritis: { type: Boolean, default: false },
    asthma: { type: Boolean, default: false },
    highBloodPressure: { type: Boolean, default: false },
    kidneyProblems: { type: Boolean, default: false },
    liverProblems: { type: Boolean, default: false },
    otherIllnesses: { type: String, default: "" },
  },

  importantHealthInformation: { type: String },
});

const patientSchema = new mongoose.Schema({
  name: { type: String, minlength: 5, maxlength: 30, required: true },
  email: { type: String, minlength: 5, maxlength: 50, required: true },
  cpf: { type: String, minlength: 11, maxlength: 11, required: true },
  rg: { type: String, minlength: 7, maxlength: 7, required: true },
  birthdate: { type: Date, required: true },
  sex: { type: String, enum: ["M", "F"], required: true },
  phone: { type: String, minlength: 11, maxlength: 11, required: true },
  cep: { type: String, minlength: 8, maxlength: 8, required: true },
  address: { type: String, minlength: 5, maxlength: 50 },

  anamnese: anamnesisSchema,
  clinic: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Patient = mongoose.model("Patient", patientSchema);
