import { ObjectId } from "mongodb";
import { Patient } from "../database";
import type { ClinicPatient, DbPatient, UpdateAnamnesis, UpdateIntraoral } from "../models";

const projection = { Clinic: 0, __v: 0 };

export const getAllPatients = (Clinic: string): Promise<DbPatient[]> => {
  return Patient.find({ Clinic }, projection);
};

export const getPartialPatientRegister = (Clinic: string): Promise<DbPatient[]> => {
  return Patient.find({ Clinic }, { name: 1, image: 1, phone: 1, email: 1, sex: 1, anamnese: 1, intraoral: 1 }).lean();
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

export const updatePatient = (data: ClinicPatient, Clinic: string) => {
  return Patient.updateOne({ cpf: data.cpf, Clinic }, data, { upsert: true });
};

export const updatePatientAnamnesis = (_id: ObjectId, data: UpdateAnamnesis) => {
  return Patient.updateOne({ _id }, { anamnese: data });
};

export const updatePatientIntraoral = (_id: ObjectId, data: UpdateIntraoral) => {
  return Patient.updateOne({ _id }, { intraoral: data });
};

export const updatePatientImage = (_id: ObjectId, image: string) => {
  return Patient.updateOne({ _id }, { image });
};

export const deletePatient = (_id: ObjectId) => {
  return Patient.deleteOne({ _id });
};