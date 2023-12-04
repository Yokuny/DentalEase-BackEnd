import Joi from "joi";

export const requestRegisterSchema = Joi.object({
  id: Joi.string(),
  email: Joi.string().email().min(5).max(50),
  cpf: Joi.string().min(11).max(11),
  rg: Joi.string().min(7).max(7),
  phone: Joi.string().min(11).max(11),
});

export const patientSchema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
  cpf: Joi.string().min(11).max(11).required(),
  rg: Joi.string().min(7).max(7).required(),
  birthdate: Joi.date().required(),
  sex: Joi.string().valid("M", "F").required(),
  phone: Joi.string().min(11).max(11).required(),
  email: Joi.string().email().min(5).max(50).required(),
  cep: Joi.string().min(8).max(8).required(),
  address: Joi.string().min(5).max(50),
});

export const anamnesisSchema = Joi.object({
  Patient: Joi.string().required(),
  mainComplaint: Joi.string().max(250).required(),
  gumsBleedEasily: Joi.boolean().required(),
  sensitiveTeeth: Joi.boolean().required(),
  allergicToMedication: Joi.boolean().required(),
  medicationAllergy: Joi.string().max(120).required(),
  bitesPenOrPencil: Joi.boolean().required(),
  nailsBiting: Joi.boolean().required(),
  otherHarmfulHabits: Joi.string().max(120).required(),
  pregnant: Joi.boolean().required(),
  pregnancyMonth: Joi.number().max(10).required(),
  breastfeeding: Joi.boolean().required(),
  underMedicalTreatment: Joi.boolean().required(),
  medicalTreatmentDetails: Joi.string().max(120).required(),
  takingMedication: Joi.boolean().required(),
  medicationDetails: Joi.string().max(120).required(),
  infectiousDisease: Joi.string().max(120).required(),
  smoker: Joi.boolean().required(),
  alcoholConsumer: Joi.boolean().required(),
  illnesses: Joi.object({
    diabetes: Joi.boolean().default(false),
    tuberculosis: Joi.boolean().default(false),
    heartProblems: Joi.boolean().default(false),
    arthritis: Joi.boolean().default(false),
    asthma: Joi.boolean().default(false),
    highBloodPressure: Joi.boolean().default(false),
    kidneyProblems: Joi.boolean().default(false),
    liverProblems: Joi.boolean().default(false),
    otherIllnesses: Joi.string().max(120).default(""),
  }).required(),
  importantHealthInformation: Joi.string().max(250).required(),
});

export const intraoralSchema = Joi.object({
  Patient: Joi.string().required(),
  hygiene: Joi.string().valid("normal", "regular", "deficiente").required(),
  halitosis: Joi.string().valid("ausente", "moderada", "forte").required(),
  tartar: Joi.string().valid("ausente", "pouco", "muito").required(),
  gums: Joi.string().valid("normal", "gengivite", "periodontite").required(),
  mucosa: Joi.string().valid("normal", "alterada").required(),
  tongue: Joi.string().max(120).required(),
  palate: Joi.string().max(120).required(),
  oralFloor: Joi.string().max(120).required(),
  lips: Joi.string().max(120).required(),
  otherObservations: Joi.string().max(250).required(),
});