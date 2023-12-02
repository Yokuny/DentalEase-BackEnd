import * as respository from "../repositories/patient.repository";
import { stringToData } from "../helpers/convert_data.helper";
import { CustomError } from "../models";
import type {
  NewPatient,
  ClinicPatient,
  RequestRegister,
  DbAnamnesis,
  Anamnesis,
  DbIntraoral,
  Intraoral,
} from "../models";

export const getPatient = async (id: string, clinic: string) => {
  const patient = await respository.getPatient(id, clinic);
  if (!patient) throw new CustomError("Paciente não encontrado", 404);

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

export const getAllPatients = async (clinic: string) => {
  const patients = await respository.getAllPatients(clinic);
  if (!patients) throw new CustomError("Nenhum paciente encontrado", 404);

  return patients;
};

export const getPatientRegister = async (clinic: string, body: RequestRegister) => {
  if (body.email) return await getPatientByEmail(body.email, clinic, true);
  if (body.cpf) return await getPatientByCpf(body.cpf, clinic, true);
  if (body.rg) return await getPatientByRg(body.rg, clinic, true);
  if (body.phone) return await getPatientByPhone(body.phone, clinic, true);

  return await getAllPatients(clinic);
};

export const updatePatient = async (data: ClinicPatient, id?: string) => {
  const register = await respository.updatePatient(data);
  console.log(register);
  if (register.upsertedCount === 1) return "Paciente cadastrado com sucesso";
  else if (register.modifiedCount === 1) return "Paciente atualizado com sucesso";
  else throw new CustomError("Cadastro de paciente não registrado", 502);
};

export const putPatientData = async (clinic: string, id: string, data: ClinicPatient) => {
  const patient = await getPatient(id, clinic);

  const patientByEmail = await getPatientByEmail(data.email, clinic);
  if (patientByEmail && patientByEmail.id !== patient.id) throw new CustomError("Email já cadastrado", 403);

  const patientByCpf = await getPatientByCpf(data.cpf, clinic);
  if (patientByCpf && patientByCpf.id !== patient.id) throw new CustomError("CPF já cadastrado", 403);

  const patientByRg = await getPatientByRg(data.rg, clinic);
  if (patientByRg && patientByRg.id !== patient.id) throw new CustomError("RG já cadastrado", 403);

  const patientByPhone = await getPatientByPhone(data.phone, clinic);
  if (patientByPhone && patientByPhone.id !== patient.id)
    throw new CustomError("Telefone já cadastrado", 403);

  const newPatient: ClinicPatient = {
    ...data,
    birthdate: stringToData(data.birthdate),
  };

  return await updatePatient(newPatient);
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
    Clinic: clinic,
    birthdate: stringToData(data.birthdate),
    anamnese: {} as Anamnesis,
    intraoral: {} as Intraoral,
  };

  return await updatePatient(newPatient);
};

const updatePatientAnamnesis = async (patient: string, data: Anamnesis) => {
  const register = await respository.updatePatientAnamnesis(patient, data);
  if (register.modifiedCount === 1) return "Anamnese cadastrada com sucesso";
  else throw new CustomError("Erro ao cadastrar anamnese", 502);
};

export const postPatientAnamnesis = async (clinic: string, data: DbAnamnesis) => {
  const patient = await getPatient(data.Patient, clinic);

  delete data.Patient;
  return await updatePatientAnamnesis(patient.id, data);
};

const updatePatientIntraoral = async (patient: string, data: Intraoral) => {
  const register = await respository.updatePatientIntraoral(patient, data);
  if (register.modifiedCount === 1) return "Exame intraoral cadastrado com sucesso";
  else throw new CustomError("Erro ao cadastrar exame intraoral", 502);
};

export const postPatientIntraoral = async (clinic: string, data: DbIntraoral) => {
  const patient = await getPatient(data.Patient, clinic);

  delete data.Patient;
  return await updatePatientIntraoral(patient.id, data);
};
