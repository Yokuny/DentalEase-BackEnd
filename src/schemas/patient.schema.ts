import { z } from "zod";
import { validObjectID, numClean, birthRegExp } from "../helpers";
import { lengthMessage, mailMessage, objectIdMessage } from "../helpers/zodMessage.helper";

export const patientSchema = z.object({
  name: z.string().trim().min(5, lengthMessage(5, 30)).max(30, lengthMessage(5, 30)),
  email: z.string().trim().email(mailMessage()).min(5, lengthMessage(5, 50)).max(50, lengthMessage(5, 50)),
  cpf: z.string().trim().min(11, lengthMessage(11, 11)).max(11, lengthMessage(11, 11)).transform(numClean),
  rg: z.string().trim().min(7, lengthMessage(7, 7)).max(7, lengthMessage(7, 7)).transform(numClean),
  birthdate: z.string().trim().regex(birthRegExp),
  sex: z.enum(["M", "F"]),
  phone: z.string().trim().min(11, lengthMessage(11, 11)).max(11, lengthMessage(11, 11)).transform(numClean),
  cep: z.string().trim().min(8, lengthMessage(8, 8)).max(8, lengthMessage(8, 8)).transform(numClean),
  address: z.string().trim().min(5, lengthMessage(5, 50)).max(50, lengthMessage(5, 50)),
});

export const anamnesisSchema = z.object({
  Patient: z.string().refine(validObjectID, objectIdMessage()),
  mainComplaint: z.string().trim().max(250, lengthMessage(0, 250)),
  gumsBleedEasily: z.boolean(),
  sensitiveTeeth: z.boolean(),
  allergicToMedication: z.boolean(),
  medicationAllergy: z.string().trim().max(120, lengthMessage(0, 120)),
  bitesPenOrPencil: z.boolean(),
  nailsBiting: z.boolean(),
  otherHarmfulHabits: z.string().trim().max(120, lengthMessage(0, 120)),
  pregnant: z.boolean(),
  pregnancyMonth: z.number().max(10),
  breastfeeding: z.boolean(),
  underMedicalTreatment: z.boolean(),
  medicalTreatmentDetails: z.string().trim().max(120, lengthMessage(0, 120)),
  takingMedication: z.boolean(),
  medicationDetails: z.string().trim().max(120, lengthMessage(0, 120)),
  infectiousDisease: z.string().trim().max(120, lengthMessage(0, 120)),
  smoker: z.boolean(),
  alcoholConsumer: z.boolean(),
  illnesses: z.object({
    diabetes: z.boolean().default(false),
    tuberculosis: z.boolean().default(false),
    heartProblems: z.boolean().default(false),
    arthritis: z.boolean().default(false),
    asthma: z.boolean().default(false),
    highBloodPressure: z.boolean().default(false),
    kidneyProblems: z.boolean().default(false),
    liverProblems: z.boolean().default(false),
    otherIllnesses: z.string().trim().max(120, lengthMessage(0, 120)).default(""),
  }),
  importantHealthInformation: z.string().trim().max(250, lengthMessage(0, 250)),
});

export const intraoralSchema = z.object({
  Patient: z.string().refine(validObjectID, objectIdMessage()),
  hygiene: z.enum(["normal", "regular", "deficiente"]),
  halitosis: z.enum(["ausente", "moderada", "forte"]),
  tartar: z.enum(["ausente", "pouco", "muito"]),
  gums: z.enum(["normal", "gengivite", "periodontite"]),
  mucosa: z.enum(["normal", "alterada"]),
  tongue: z.string().trim().max(120, lengthMessage(0, 120)),
  palate: z.string().trim().max(120, lengthMessage(0, 120)),
  oralFloor: z.string().trim().max(120, lengthMessage(0, 120)),
  lips: z.string().trim().max(120, lengthMessage(0, 120)),
  otherObservations: z.string().trim().max(250, lengthMessage(0, 250)),
});

export type NewPatient = z.infer<typeof patientSchema>;
export type NewAnamnesis = z.infer<typeof anamnesisSchema>;
export type NewIntraoral = z.infer<typeof intraoralSchema>;
