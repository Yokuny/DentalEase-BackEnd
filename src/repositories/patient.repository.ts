import { Patient } from "../database";
import type { ClinicPatient, DbPatient, NewAnamnesis, NewIntraoral } from "../models";

export const getAllPatients = (Clinic: string): Promise<DbPatient[]> => {
  return Patient.find({ Clinic }, { Clinic: 0, __v: 0 }).lean();
};

export const getPatientByEmail = (email: string, Clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ email, Clinic }, { Clinic: 0, __v: 0 }).lean();
};

export const getPatientByCpf = (cpf: string, Clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ cpf, Clinic }, { Clinic: 0, __v: 0 }).lean();
};

export const getPatientByRg = (rg: string, Clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ rg, Clinic }, { Clinic: 0, __v: 0 }).lean();
};

export const getPatientByPhone = (phone: string, Clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ phone, Clinic }, { Clinic: 0, __v: 0 }).lean();
};

export const getPatientByName = (name: string, Clinic: string): Promise<DbPatient | null> => {
  return Patient.findOne({ name, Clinic }, { Clinic: 0, __v: 0 }).lean();
};

export const getPatient = (id: string): Promise<DbPatient | null> => {
  return Patient.findById(id, { Clinic: 0, __v: 0 }).lean();
};

export const updatePatient = (data: ClinicPatient) => {
  return Patient.updateOne({ cpf: data.cpf }, data, { upsert: true }).lean();
};

export const updatePatientAnamnesis = (id: string, data: NewAnamnesis) => {
  return Patient.updateOne({ _id: id }, { anamnese: data }).lean();
};

export const updatePatientIntraoral = (id: string, data: NewIntraoral) => {
  return Patient.updateOne({ _id: id }, { intraoral: data }).lean();
};