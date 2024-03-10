import * as respository from "../repositories/patient.repository";
import { stringToData } from "../helpers/convert.helper";
import { patientNotFound, patientAlreadyRegistered } from "../helpers/statusMessage.helper";
import { CustomError, ClinicUser } from "../models";
import type {
  NewPatient,
  ClinicPatient,
  NewAnamnesis,
  DbAnamnesis,
  NewIntraoral,
  DbIntraoral,
  Query,
} from "../models";

export const getPatient = async (id: string) => {
  const patient = await respository.getPatient(id);
  if (!patient) throw new CustomError("Paciente não encontrado", 404);

  return patient;
};

export const getPatientByEmail = async (email: string, clinic: string, required?: boolean) => {
  const patient = await respository.getPatientByEmail(email, clinic);
  if (!patient && required) patientNotFound({ record: "email", searched: email, err: 404 });

  return patient;
};

export const getPatientByCpf = async (cpf: string, clinic: string, required?: boolean) => {
  const patient = await respository.getPatientByCpf(cpf, clinic);
  if (!patient && required) patientNotFound({ record: "cpf", searched: cpf, err: 404 });

  return patient;
};

export const getPatientByRg = async (rg: string, clinic: string, required?: boolean) => {
  const patient = await respository.getPatientByRg(rg, clinic);
  if (!patient && required) patientNotFound({ record: "rg", searched: rg, err: 404 });

  return patient;
};

export const getPatientByPhone = async (phone: string, clinic: string, required?: boolean) => {
  const patient = await respository.getPatientByPhone(phone, clinic);
  if (!patient && required) patientNotFound({ record: "phone", searched: phone, err: 404 });

  return patient;
};

export const getAllPatients = async (clinic: string) => {
  const patients = await respository.getAllPatients(clinic);
  if (!patients) throw new CustomError("Nenhum paciente encontrado", 404);

  return patients;
};

export const updatePatient = async (data: ClinicPatient) => {
  const register = await respository.updatePatient(data);

  if (register.upsertedCount === 1) return "Paciente cadastrado com sucesso";
  else if (register.modifiedCount === 1) return "Paciente cadastrado com sucesso";
  else throw new CustomError("Cadastro de paciente não registrado", 502);
};

export const getPatientRegister = async (user: ClinicUser, body: Query) => {
  if (body.email) return await getPatientByEmail(body.email, user.clinic, true);
  if (body.cpf) return await getPatientByCpf(body.cpf, user.clinic, true);
  if (body.rg) return await getPatientByRg(body.rg, user.clinic, true);
  if (body.phone) return await getPatientByPhone(body.phone, user.clinic, true);
  if (body.id) return await getPatient(body.id);

  return await getAllPatients(user.clinic);
};

export const getPartialPatientRegister = async (user: ClinicUser) => {
  const patients = await respository.getPartialPatientRegister(user.clinic);
  if (!patients) throw new CustomError("Nenhum paciente encontrado", 404);

  const partialPatients = patients.map((patient) => {
    const { id, name, phone, email, sex, anamnese, intraoral } = patient;
    const anamneseCheck = anamnese.mainComplaint ? true : false;
    const intraoralCheck = intraoral.hygiene ? true : false;

    return { id, name, phone, email, sex, anamnese: anamneseCheck, intraoral: intraoralCheck };
  });

  return partialPatients;
};

export const postPatientData = async (user: ClinicUser, data: NewPatient) => {
  const patientByEmail = await getPatientByEmail(data.email, user.clinic);
  if (patientByEmail) patientAlreadyRegistered({ record: "email", searched: data.email, err: 403 });

  const patientByCpf = await getPatientByCpf(data.cpf, user.clinic);
  if (patientByCpf) patientAlreadyRegistered({ record: "cpf", searched: data.cpf, err: 403 });

  const patientByRg = await getPatientByRg(data.rg, user.clinic);
  if (patientByRg) patientAlreadyRegistered({ record: "rg", searched: data.rg, err: 403 });

  const patientByPhone = await getPatientByPhone(data.phone, user.clinic);
  if (patientByPhone) patientAlreadyRegistered({ record: "phone", searched: data.phone, err: 403 });

  const newPatient = {
    ...data,
    Clinic: user.clinic,
    birthdate: String(stringToData(data.birthdate)),
    anamnese: {} as NewAnamnesis,
    intraoral: {} as NewIntraoral,
  };

  return await updatePatient(newPatient);
};

export const putPatientData = async (user: ClinicUser, id: string, data: ClinicPatient) => {
  const patient = await getPatient(id);
  if (patient.Clinic.toString() !== user.clinic)
    throw new CustomError("Paciente não pertence a clínica", 403);

  const byEmail = await getPatientByEmail(data.email, user.clinic);
  if (byEmail && byEmail.id !== patient.id)
    patientAlreadyRegistered({ record: "email", searched: data.email, err: 403 });

  const byCpf = await getPatientByCpf(data.cpf, user.clinic);
  if (byCpf && byCpf.id !== patient.id)
    patientAlreadyRegistered({ record: "cpf", searched: data.cpf, err: 403 });

  const byRg = await getPatientByRg(data.rg, user.clinic);
  if (byRg && byRg.id !== patient.id) patientAlreadyRegistered({ record: "rg", searched: data.rg, err: 403 });

  const byPhone = await getPatientByPhone(data.phone, user.clinic);
  if (byPhone && byPhone.id !== patient.id)
    patientAlreadyRegistered({ record: "phone", searched: data.phone, err: 403 });

  const newPatient: ClinicPatient = {
    ...data,
    birthdate: String(stringToData(data.birthdate)),
  };

  return await updatePatient(newPatient);
};

const updatePatientAnamnesis = async (patient: string, data: NewAnamnesis) => {
  const register = await respository.updatePatientAnamnesis(patient, data);
  if (register.modifiedCount === 1) return "Anamnese cadastrada com sucesso";
  else throw new CustomError("Erro ao cadastrar anamnese", 502);
};

export const postPatientAnamnesis = async (user: ClinicUser, data: DbAnamnesis) => {
  const patient = await getPatient(data.Patient);
  if (patient.Clinic !== user.clinic) throw new CustomError("Paciente não pertence a clínica", 403);

  delete data.Patient;
  return await updatePatientAnamnesis(patient.id, data);
};

const updatePatientIntraoral = async (patient: string, data: NewIntraoral) => {
  const register = await respository.updatePatientIntraoral(patient, data);
  if (register.modifiedCount === 1) return "Exame intraoral cadastrado com sucesso";
  else throw new CustomError("Erro ao cadastrar exame intraoral", 502);
};

export const postPatientIntraoral = async (user: ClinicUser, data: DbIntraoral) => {
  const patient = await getPatient(data.Patient);
  if (patient.Clinic !== user.clinic) throw new CustomError("Paciente não pertence a clínica", 403);

  delete data.Patient;
  return await updatePatientIntraoral(patient.id, data);
};
