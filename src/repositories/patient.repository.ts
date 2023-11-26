import { Patient } from "../database";
import type { NewPatient, DbPatient, Anamnesis } from "../models";

export const getPatientByEmail = (email: string, clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ email, clinic }, { clinic: 0, __v: 0 });
};

export const getPatientByCpf = (cpf: string, clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ cpf, clinic }, { clinic: 0, __v: 0 });
};

export const getPatientByRg = (rg: string, clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ rg, clinic }, { clinic: 0, __v: 0 });
};

export const getPatientByPhone = (phone: string, clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ phone, clinic }, { clinic: 0, __v: 0 });
};

export const getPatientByName = (name: string, clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ name, clinic }, { clinic: 0, __v: 0 });
};

export const getPatient = (id: string, clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ _id: id, clinic }, { clinic: 0, __v: 0 });
};

export const postPatientData = (data: NewPatient) => {
  return Patient.updateOne({ cpf: data.cpf }, data, { upsert: true });
};

export const updatePatientAnamnesis = (id: string, data: Anamnesis) => {
  return Patient.updateOne({ _id: id }, { anamnese: data });
};

