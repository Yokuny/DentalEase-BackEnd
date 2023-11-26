import Joi from "joi";

export const patientDataSchema = Joi.object({
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

export const requestRegisterSchema = Joi.object({
  email: Joi.string().email().min(5).max(50),
  cpf: Joi.string().min(11).max(11),
  rg: Joi.string().min(7).max(7),
  phone: Joi.string().min(11).max(11),
});

export const anamnesisSchema = Joi.object({
  patientId: Joi.string().required(),
  mainComplaint: Joi.string().required(),

  gumsBleedEasily: Joi.boolean().required(),
  sensitiveTeeth: Joi.boolean().required(),

  allergicToMedication: Joi.boolean().required(),
  medicationAllergy: Joi.string().required(),

  bitesPenOrPencil: Joi.boolean().required(),
  nailsBiting: Joi.boolean().required(),
  otherHarmfulHabits: Joi.string().required(),

  pregnant: Joi.boolean().required(),
  pregnancyMonth: Joi.number().required(),
  breastfeeding: Joi.boolean().required(),

  underMedicalTreatment: Joi.boolean().required(),
  medicalTreatmentDetails: Joi.string().required(),

  takingMedication: Joi.boolean().required(),
  medicationDetails: Joi.string().required(),

  infectiousDisease: Joi.string().required(),

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
    otherIllnesses: Joi.string().default(""),
  }).required(),

  importantHealthInformation: Joi.string(),
});