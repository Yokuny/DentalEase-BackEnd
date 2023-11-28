import mongoose from "mongoose";

const anamnesisSchema = new mongoose.Schema({
  mainComplaint: { type: String, maxlength: 250 },
  gumsBleedEasily: { type: Boolean },
  sensitiveTeeth: { type: Boolean },
  allergicToMedication: { type: Boolean },
  medicationAllergy: { type: String, maxlength: 120 },
  bitesPenOrPencil: { type: Boolean },
  nailsBiting: { type: Boolean },
  otherHarmfulHabits: { type: String, maxlength: 120 },
  pregnant: { type: Boolean },
  pregnancyMonth: { type: Number, max: 10 },
  breastfeeding: { type: Boolean },
  underMedicalTreatment: { type: Boolean },
  medicalTreatmentDetails: { type: String, maxlength: 120 },
  takingMedication: { type: Boolean },
  medicationDetails: { type: String, maxlength: 120 },
  infectiousDisease: { type: String, maxlength: 120 },
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
    otherIllnesses: { type: String, maxlength: 120, default: "" },
  },
  importantHealthInformation: { type: String, maxlength: 250 },
});

const intraoralSchema = new mongoose.Schema({
  hygiene: { type: String, enum: ["normal", "regular", "deficiente"] },
  halitosis: { type: String, enum: ["ausente", "moderada", "forte"] },
  tartar: { type: String, enum: ["ausente", "pouco", "muito"] },
  gums: { type: String, enum: ["normal", "gengivite", "periodontite"] },
  mucosa: { type: String, enum: ["normal", "alterada"] },
  tongue: { type: String, maxlength: 120 },
  palate: { type: String, maxlength: 120 },
  oralFloor: { type: String, maxlength: 120 },
  lips: { type: String, maxlength: 120 },
  otherObservations: { type: String, maxlength: 250 },
});

const odontogramSchema = new mongoose.Schema({
  teeth: [
    {
      number: { type: Number, maxlength: 3, required: true },
      workToBeDone: { type: String, maxlength: 250, required: true },
      createdAt: { type: Date, default: Date.now },
      face: {
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
  intraoral: intraoralSchema,
  odontogram: odontogramSchema,
  clinic: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Patient = mongoose.model("Patient", patientSchema);
