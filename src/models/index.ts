export * from "./error.type";
import { Request } from "express";

export type ClinicUser = { clinic: string; user: string };
export type JWTPayload = ClinicUser;
export type AuthReq = Request & { clinicUser: JWTPayload };
//Common
type Clinic = { Clinic: string };
type Patient = { Patient: string };
//User
export type UserAcess = { email: string; password: string };
export type NewUser = UserAcess & { username: string };
export type UserWithoutPassword = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  clinic: string;
  createdAt: Date;
};
export type DbUser = UserWithoutPassword & { password: string };
//Patient
export type RequestRegister = { id?: string; email?: string; cpf?: string; rg?: string; phone?: string };
export type NewPatient = {
  name: string;
  email: string;
  cpf: string;
  rg: string;
  birthdate: Date;
  sex: string;
  phone: string;
  cep: string;
  address: string;
};
export type ClinicPatient = NewPatient &
  Clinic & {
    anamnese: Anamnesis;
    intraoral: Intraoral;
  };
export type DbPatient = ClinicPatient & { id: string; createdAt: Date };
//Patient Anamnesis
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
export type DbAnamnesis = Anamnesis & Patient;
//Patient Intraoral
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
export type DbIntraoral = Intraoral & Patient;
//Odontogram
export type NewOdontogram = {
  Patient: string;
  workToBeDone: string;
  finished: boolean;
  teeth: {
    number: number;
    faces: {
      facial: Boolean;
      incisal: Boolean;
      lingual: Boolean;
      mesial: Boolean;
      distal: Boolean;
      occlusal: Boolean;
      palatal: Boolean;
    };
  }[];
};
export type ClinicOdontogram = NewOdontogram & Clinic;
export type DbOdontogram = ClinicOdontogram & { id: string; createdAt: Date };
//Clinic
export type NewClinic = { name: string; email: string; code: string; cnpj?: string };
type ClinicUsers = { user: string; role: string };
export type ClinicWithUser = NewClinic & { users: ClinicUsers[] };
export type DbClinic = NewClinic & { id: string; users: ClinicUsers[]; createdAt: Date };