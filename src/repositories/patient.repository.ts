import { Patient } from "../database";
import type { NewPatient, DbPatient } from "../models";

export const getPatientByEmail = (email: string): Promise<DbPatient | null> => {
  return Patient.findOne({ email });
};

export const getPatientByCpf = (cpf: string): Promise<DbPatient | null> => {
  return Patient.findOne({ cpf });
};

export const getPatientByRg = (rg: string): Promise<DbPatient | null> => {
  return Patient.findOne({ rg });
};

export const getPatientByPhone = (phone: string): Promise<DbPatient | null> => {
  return Patient.findOne({ phone });
};

export const getPatientByName = (name: string): Promise<DbPatient | null> => {
  return Patient.findOne({ name });
};

export const postPatientData = (data: NewPatient) => {
  return Patient.updateOne({ cpf: data.cpf }, data, { upsert: true });
};

