import * as respository from "../repositories/patient.repository";
import { stringToData } from "../helpers/convertData.helper";
import { CustomError } from "../models";
import type {
  NewPatient,
  RequestRegister,
  DbAnamnesis,
  Anamnesis,
  DbIntraoral,
  Intraoral,
  DbOdontogram,
  Odontogram,
} from "../models";

const getPatient = async (id: string, clinic: string) => {
  const patient = await respository.getPatient(id, clinic);
  if (!patient) throw new CustomError("Registro não encontrado", 404);

  return patient;
};

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
    throw new CustomError("Erro ao cadastrar paciente", 502);
  }
};

const updatePatientAnamnesis = async (patient: string, data: Anamnesis) => {
  const register = await respository.updatePatientAnamnesis(patient, data);

  try {
    if (register.modifiedCount === 1) return "Anamnese cadastrada com sucesso";
  } catch (err) {
    throw new CustomError("Erro ao cadastrar anamnese", 502);
  }
};

export const postPatientAnamnesis = async (clinic: string, data: DbAnamnesis) => {
  const patient = await getPatient(data.patientId, clinic);

  delete data.patientId;

  return await updatePatientAnamnesis(patient.id, data);
};

const updatePatientIntraoral = async (patient: string, data: Intraoral) => {
  const register = await respository.updatePatientIntraoral(patient, data);

  try {
    if (register.modifiedCount === 1) return "Exame intraoral cadastrado com sucesso";
  } catch (err) {
    throw new CustomError("Erro ao cadastrar exame intraoral", 502);
  }
};

export const postPatientIntraoral = async (clinic: string, data: DbIntraoral) => {
  const patient = await getPatient(data.patientId, clinic);

  delete data.patientId;

  return await updatePatientIntraoral(patient.id, data);
};

export const updatePatientOdontogram = async (patient: string, data: Odontogram) => {
  const register = await respository.updatePatientOdontogram(patient, data);

  try {
    if (register.modifiedCount === 1) return "Odontograma cadastrado com sucesso";
  } catch (err) {
    throw new CustomError("Erro ao cadastrar odontograma", 502);
  }
};

export const postPatientOdontogram = async (clinic: string, data: DbOdontogram) => {
  const patient = await getPatient(data.patientId, clinic);

  delete data.patientId;

  return await updatePatientOdontogram(patient.id, data);
};