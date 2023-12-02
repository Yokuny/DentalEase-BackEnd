import { Patient } from "../database";
import type { ClinicPatient, DbPatient, Anamnesis, Intraoral } from "../models";

export const getAllPatients = (Clinic: string): Promise<DbPatient[]> => {
  return Patient.find({ Clinic }, { Clinic: 0, __v: 0 });
};

export const getPatientByEmail = (email: string, Clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ email, Clinic }, { Clinic: 0, __v: 0 });
};

export const getPatientByCpf = (cpf: string, Clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ cpf, Clinic }, { Clinic: 0, __v: 0 });
};

export const getPatientByRg = (rg: string, Clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ rg, Clinic }, { Clinic: 0, __v: 0 });
};

export const getPatientByPhone = (phone: string, Clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ phone, Clinic }, { Clinic: 0, __v: 0 });
};

export const getPatientByName = (name: string, Clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ name, Clinic }, { Clinic: 0, __v: 0 });
};

export const getPatient = (id: string, Clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ _id: id, Clinic }, { Clinic: 0, __v: 0 });
};

export const updatePatient = (data: ClinicPatient) => {
  return Patient.updateOne({ cpf: data.cpf }, data, { upsert: true });
};

export const updatePatientAnamnesis = (id: string, data: Anamnesis) => {
  return Patient.updateOne({ _id: id }, { anamnese: data });
};

export const updatePatientIntraoral = (id: string, data: Intraoral) => {
  return Patient.updateOne({ _id: id }, { intraoral: data });
};