import { Patient } from "../database";

export const getPatientByCpf = (cpf: string) => {
  return Patient.findOne({ cpf });
};
export const getPatientByName = (name: string) => {
  return Patient.findOne({ name });
};
