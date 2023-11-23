import { Patient } from "../database";
import type { NewPatient } from "../models";

export const getPatientByEmail = (email: string) => {
  return Patient.findOne({ email });
};

export const getPatientByCpf = (cpf: string) => {
  return Patient.findOne({ cpf });
};

export const getPatientByName = (name: string) => {
  return Patient.findOne({ name });
};

export const postPatientData = (data: NewPatient) => {
  return Patient.create(data);
};

