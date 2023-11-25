import * as respository from "../repositories/patient.repository";
import { stringToData } from "../helpers/convertData.helper";
import { CustomError } from "../models";
import type { NewPatient, RequestRegister } from "../models";

const getPatientByEmail = async (email: string, clinic: string, required?: boolean) => {
  const patient = await respository.getPatientByEmail(email, clinic);
  if (!patient && required) throw new CustomError("Paciente não encontrado", 404);

  return patient;
};

const getPatientByCpf = async (cpf: string, clinic: string, required?: boolean) => {
  const patient = await respository.getPatientByCpf(cpf, clinic);
  if (!patient && required) throw new CustomError("Paciente não encontrado", 404);

  return patient;
};

const getPatientByRg = async (rg: string, clinic: string, required?: boolean) => {
  const patient = await respository.getPatientByRg(rg, clinic);
  if (!patient && required) throw new CustomError("Paciente não encontrado", 404);

  return patient;
};

const getPatientByPhone = async (phone: string, clinic: string, required?: boolean) => {
  const patient = await respository.getPatientByPhone(phone, clinic);
  if (!patient && required) throw new CustomError("Paciente não encontrado", 404);

  return patient;
};

export const getPatientRegister = async (clinic: string, body: RequestRegister) => {
  if (!body.email && !body.cpf && !body.rg && !body.phone)
    throw new CustomError("Pelo menos um dado deve ser informado", 403);

  if (body.email) return await getPatientByEmail(body.email, clinic, true);
  if (body.cpf) return await getPatientByCpf(body.cpf, clinic, true);
  if (body.rg) return await getPatientByRg(body.rg, clinic, true);
  if (body.phone) return await getPatientByPhone(body.phone, clinic, true);

  throw new CustomError("Dados inválidos", 400);
};

export const postPatientData = async (clinic: string, data: NewPatient) => {
  const patientByEmail = await getPatientByEmail(data.email, clinic);
  if (patientByEmail) throw new CustomError("Email já cadastrado", 403);

  const patientByCpf = await getPatientByCpf(data.cpf, clinic);
  if (patientByCpf) throw new CustomError("CPF já cadastrado", 403);

  const patientByRg = await getPatientByRg(data.rg, clinic);
  if (patientByRg) throw new CustomError("RG já cadastrado", 403);

  const patientByPhone = await getPatientByPhone(data.phone, clinic);
  if (patientByPhone) throw new CustomError("Telefone já cadastrado", 403);

  const newPatient = {
    ...data,
    clinic,
    birthdate: stringToData(data.birthdate),
  };

  try {
    const register = await respository.postPatientData(newPatient);
    if (register.upsertedCount === 1) return "Paciente cadastrado com sucesso";
  } catch (err) {
    throw new CustomError("Erro ao cadastrar paciente", 500);
  }
};
