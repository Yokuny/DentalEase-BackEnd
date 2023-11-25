import * as respository from "../repositories/patient.repository";
import { CustomError } from "../models";
import type { NewPatient, RequestRegister } from "../models";
import { stringToData } from "../helpers/convertData.helper";

const getPatientByEmail = async (required: boolean, email: string) => {
  const patient = await respository.getPatientByEmail(email);
  if (!patient && required) throw new CustomError("Paciente não encontrado", 404);

  return patient;
};

const getPatientByCpf = async (required: boolean, cpf: string) => {
  const patient = await respository.getPatientByCpf(cpf);
  if (!patient && required) throw new CustomError("Paciente não encontrado", 404);

  return patient;
};

const getPatientByRg = async (required: boolean, rg: string) => {
  const patient = await respository.getPatientByRg(rg);
  if (!patient && required) throw new CustomError("Paciente não encontrado", 404);

  return patient;
};

const getPatientByPhone = async (required: boolean, phone: string) => {
  const patient = await respository.getPatientByPhone(phone);
  if (!patient && required) throw new CustomError("Paciente não encontrado", 404);

  return patient;
};

export const getPatientRegister = async (body: RequestRegister) => {
  if (!body.email && !body.cpf && !body.rg && !body.phone)
    throw new CustomError("Pelo menos um dado deve ser informado", 403);

  if (body.email) return await getPatientByEmail(true, body.email);
  if (body.cpf) return await getPatientByCpf(true, body.cpf);
  if (body.rg) return await getPatientByRg(true, body.rg);
  if (body.phone) return await getPatientByPhone(true, body.phone);

  throw new CustomError("Dados inválidos", 400);
};

export const postPatientData = async (data: NewPatient) => {
  const patientByEmail = await getPatientByEmail(false, data.email);
  if (patientByEmail) throw new CustomError("Email já cadastrado", 403);

  const patientByCpf = await getPatientByCpf(false, data.cpf);
  if (patientByCpf) throw new CustomError("CPF já cadastrado", 403);

  const patientByRg = await getPatientByRg(false, data.rg);
  if (patientByRg) throw new CustomError("RG já cadastrado", 403);

  const patientByPhone = await getPatientByPhone(false, data.phone);
  if (patientByPhone) throw new CustomError("Telefone já cadastrado", 403);

  const newPatient = {
    ...data,
    birthdate: stringToData(data.birthdate),
  };

  return await respository.postPatientData(newPatient);
};
