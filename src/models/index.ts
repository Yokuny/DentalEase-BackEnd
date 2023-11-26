export * from "./error.type";
import { Request } from "express";

export type JWTPayload = { clinic: string };
export type AuthReq = Request & JWTPayload;

export type UserAcess = { email: string; password: string };
export type NewUser = UserAcess & { username: string };
export type UserWithoutPassword = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: Date;
};
export type DbUser = UserWithoutPassword & { password: string };

export type NewPatient = {
  clinic: string;
  nome: string;
  email: string;
  cpf: string;
  rg: string;
  birthdate: Date;
  sex: string;
  phone: string;
  cep: string;
  address: string;
};
export type DbPatient = NewPatient & { id: string; createdAt: Date };
export type RequestRegister = { email?: string; cpf?: string; rg?: string; phone?: string };

type DbPatientId = { patientId: string };
type Illnesses = {
  diabetes: boolean;
  tuberculosis: boolean;
  heartProblems: boolean;
  arthritis: boolean;
  asthma: boolean;
  highBloodPressure: boolean;
  kidneyProblems: boolean;
  liverProblems: boolean;
  otherIllnesses?: string;
};
export type Anamnesis = {
  mainComplaint: string;
  gumsBleedEasily: boolean;
  sensitiveTeeth: boolean;
  allergicToMedication: boolean;
  medicationAllergy?: string;
  bitesPenOrPencil: boolean;
  nailsBiting: boolean;
  otherHarmfulHabits?: string;
  pregnant: boolean;
  pregnancyMonth?: number;
  breastfeeding: boolean;
  underMedicalTreatment: boolean;
  medicalTreatmentDetails?: string;
  takingMedication: boolean;
  medicationDetails?: string;
  infectiousDisease?: string;
  smoker: boolean;
  alcoholConsumer: boolean;
  illnesses: Illnesses;
  importantHealthInformation?: string;
};
export type DbAnamnesis = Anamnesis & DbPatientId;

export type Intraoral = {
  hygiene: string;
  halitosis: string;
  tartar: string;
  gums: string;
  mucosa: string;
  tongue?: string;
  palate?: string;
  oralFloor?: string;
  lips?: string;
  otherObservations?: string;
};
export type DbIntraoral = Intraoral & DbPatientId;

