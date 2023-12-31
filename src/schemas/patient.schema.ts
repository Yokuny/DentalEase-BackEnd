import { z } from "zod";
import { birthRegExp } from "../helpers/regex.helper";

const lengthMessage = (min: number, max: number) => ({
  message: `O campo deve ter ${min ? `${min} a ${max} caracteres.` : `no máximo ${max} caracteres`}`,
});

const mailMessage = () => ({
  message: `O campo deve ser um email válido`,
});

enum Sex {
  M,
  F,
}

enum hygiene {
  normal,
  regular,
  deficiente,
}

enum halitosis {
  ausente,
  moderada,
  forte,
}

enum tartar {
  ausente,
  pouco,
  muito,
}

enum gums {
  normal,
  gengivite,
  periodontite,
}

enum mucosa {
  normal,
  alterada,
}

export const getPatientSchema = z.object({
  id: z.string().trim().optional(),
  email: z
    .string()
    .trim()
    .email(mailMessage())
    .min(5, lengthMessage(5, 50))
    .max(50, lengthMessage(5, 50))
    .optional(),
  cpf: z.string().trim().min(11, lengthMessage(11, 11)).max(11, lengthMessage(11, 11)).optional(),
  rg: z.string().trim().min(7, lengthMessage(7, 7)).max(7, lengthMessage(7, 7)).optional(),
  phone: z.string().trim().min(11, lengthMessage(11, 11)).max(11, lengthMessage(11, 11)).optional(),
});

export const patientSchema = z.object({
  name: z.string().trim().min(5, lengthMessage(5, 30)).max(30, lengthMessage(5, 30)),
  cpf: z.string().trim().min(11, lengthMessage(11, 11)).max(11, lengthMessage(11, 11)),
  rg: z.string().trim().min(7, lengthMessage(7, 7)).max(7, lengthMessage(7, 7)),
  birthdate: z.string().trim().regex(birthRegExp),
  sex: z.nativeEnum(Sex),
  phone: z.string().trim().min(11, lengthMessage(11, 11)).max(11, lengthMessage(11, 11)),
  email: z.string().trim().email(mailMessage()).min(5, lengthMessage(5, 50)).max(50, lengthMessage(5, 50)),
  cep: z.string().trim().min(8, lengthMessage(8, 8)).max(8, lengthMessage(8, 8)),
  address: z.string().trim().min(5, lengthMessage(5, 50)).max(50, lengthMessage(5, 50)),
});

export const anamnesisSchema = z.object({
  Patient: z.string(),
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
  Patient: z.string().trim(),
  hygiene: z.nativeEnum(hygiene),
  halitosis: z.nativeEnum(halitosis),
  tartar: z.nativeEnum(tartar),
  gums: z.nativeEnum(gums),
  mucosa: z.nativeEnum(mucosa),
  tongue: z.string().trim().max(120, lengthMessage(0, 120)),
  palate: z.string().trim().max(120, lengthMessage(0, 120)),
  oralFloor: z.string().trim().max(120, lengthMessage(0, 120)),
  lips: z.string().trim().max(120, lengthMessage(0, 120)),
  otherObservations: z.string().trim().max(250, lengthMessage(0, 250)),
});
