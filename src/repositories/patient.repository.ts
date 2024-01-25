import { Patient } from "../database";
import type { ClinicPatient, DbPatient, NewAnamnesis, NewIntraoral } from "../models";

const projection = { Clinic: 0, __v: 0 };

export const getAllPatients = (Clinic: string): Promise<DbPatient[]> => {
  return Patient.find({ Clinic }, projection);
};

export const getPatientByEmail = (email: string, Clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ email, Clinic }, projection);
};

export const getPatientByCpf = (cpf: string, Clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ cpf, Clinic }, projection);
};

export const getPatientByRg = (rg: string, Clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ rg, Clinic }, projection);
};

export const getPatientByPhone = (phone: string, Clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ phone, Clinic }, projection);
};

export const getPatientByName = (name: string, Clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ name, Clinic }, projection);
};

export const getPatient = (id: string): Promise<DbPatient | null> => {
  return Patient.findById(id, { __v: 0 }).lean();
};

export const updatePatient = (data: ClinicPatient) => {
  return Patient.updateOne({ cpf: data.cpf }, data, { upsert: true });
};

export const updatePatientAnamnesis = (id: string, data: NewAnamnesis) => {
  return Patient.updateOne({ _id: id }, { anamnese: data });
};

export const updatePatientIntraoral = (id: string, data: NewIntraoral) => {
  return Patient.updateOne({ _id: id }, { intraoral: data });
};