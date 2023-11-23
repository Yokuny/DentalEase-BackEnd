import * as respository from "../repositories/patient.repository";
import { CustomError, NewPatient } from "../models";

const getPatientByEmail = async (email: string) => {
  return await respository.getPatientByEmail(email);
};

export const postPatientData = async (data: NewPatient) => {
  const patient = await getPatientByEmail(data.email);
  if (patient) throw new CustomError("Paciente já existe", 409);

  //TRATAR DADOS

  return await respository.postPatientData(data);
};
