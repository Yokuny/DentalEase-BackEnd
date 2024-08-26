import { ObjectId } from "mongodb";
import * as respository from "../repositories/patient.repository";
import { stringToData } from "../helpers/convert.helper";
import { patientNotFound, patientAlreadyRegistered } from "../helpers/statusMsgPattern.helper";
import { returnMessage, returnData, returnDataMessage } from "../helpers/responsePattern.helper";
import type { ServiceRes } from "../helpers/responsePattern.helper";
import { CustomError } from "../models";
import type {
  NewPatient,
  ClinicPatient,
  NewAnamnesis,
  DbAnamnesis,
  UpdateAnamnesis,
  NewIntraoral,
  DbIntraoral,
  UpdateIntraoral,
  Query,
  ClinicUser,
} from "../models";

export const getPatient = async (id: string) => {
  const patient = await respository.getPatient(id);
  if (!patient) throw new CustomError("Paciente não encontrado", 404);

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

export const getPatientByEmail = async (email: string, clinic: string, required?: boolean) => {
  const patient = await respository.getPatientByEmail(email, clinic);
  if (!patient && required) patientNotFound({ record: "email", searched: email, err: 404 });

  return patient;
};

export const getAllPatients = async (clinic: string) => {
  const patients = await respository.getAllPatients(clinic);
  if (!patients) throw new CustomError("Nenhum paciente encontrado", 404);

  return patients;
};

export const getPatientRegister = async (user: ClinicUser, body: Query): Promise<ServiceRes> => {
  if (body.email) return returnData(await getPatientByEmail(body.email, user.clinic, true));
  if (body.cpf) return returnData(await getPatientByCpf(body.cpf, user.clinic, true));
  if (body.rg) return returnData(await getPatientByRg(body.rg, user.clinic, true));
  if (body.phone) return returnData(await getPatientByPhone(body.phone, user.clinic, true));
  if (body.id) return returnData(await getPatient(body.id));

  const allPatients = await getAllPatients(user.clinic);

  if (!allPatients || allPatients.length === 0) return returnMessage("Nenhum paciente encontrado");
  return returnData(allPatients);
};

export const getPartialPatientRegister = async (user: ClinicUser): Promise<ServiceRes> => {
  const patients = await respository.getPartialPatientRegister(user.clinic);
  if (!patients) throw new CustomError("Nenhum paciente encontrado", 404);

  const partialPatients = patients.map((patient) => {
    const { _id, name, phone, email, sex, anamnese, intraoral } = patient;

    const anamneseCheck = anamnese?.mainComplaint || anamnese?.mainComplaint === "" ? true : false;
    const intraoralCheck = intraoral?.hygiene ? true : false;

    return { _id, name, phone, email, sex, anamnese: anamneseCheck, intraoral: intraoralCheck };
  });

  if (partialPatients.length === 0) return returnMessage("Nenhum paciente encontrado");
  return returnData(partialPatients);
};

export const updatePatient = async (clinic: string, data: ClinicPatient) => {
  const register = await respository.updatePatient(data, clinic);

  if (register.upsertedId) {
    const patient_id = { _id: register.upsertedId.toString() };
    return returnDataMessage(patient_id, "Paciente cadastrado com sucesso");
  } else if (register.modifiedCount === 1) return returnMessage("Paciente atualizado com sucesso");
  else throw new CustomError("Cadastro de paciente não registrado", 502);
};

export const postPatientData = async (user: ClinicUser, data: NewPatient): Promise<ServiceRes> => {
  const patientByCpf = await getPatientByCpf(data.cpf, user.clinic);
  if (patientByCpf) patientAlreadyRegistered({ record: "cpf", searched: data.cpf, err: 403 });

  const patientByRg = await getPatientByRg(data.rg, user.clinic);
  if (patientByRg) patientAlreadyRegistered({ record: "rg", searched: data.rg, err: 403 });

  const patientByPhone = await getPatientByPhone(data.phone, user.clinic);
  if (patientByPhone) patientAlreadyRegistered({ record: "phone", searched: data.phone, err: 403 });

  const patientByEmail = await getPatientByEmail(data.email, user.clinic);
  if (patientByEmail) patientAlreadyRegistered({ record: "email", searched: data.email, err: 403 });

  const newPatient = {
    ...data,
    Clinic: user.clinic,
    birthdate: String(stringToData(data.birthdate)),
    anamnese: {} as NewAnamnesis,
    intraoral: {} as NewIntraoral,
  };

  return await updatePatient(user.clinic, newPatient);
};

export const putPatientData = async (user: ClinicUser, id: string, data: ClinicPatient): Promise<ServiceRes> => {
  const patient = await getPatient(id);
  if (patient.Clinic.toString() !== user.clinic) throw new CustomError("Paciente não pertence a clínica", 403);

  const byCpf = await getPatientByCpf(data.cpf, user.clinic);
  if (byCpf && byCpf._id.toString() !== patient._id.toString())
    patientAlreadyRegistered({ record: "cpf", searched: data.cpf, err: 403 });
  if (!byCpf) throw new CustomError("Não é possível alterar o CPF do paciente", 403);

  const byRg = await getPatientByRg(data.rg, user.clinic);
  if (byRg && byRg._id.toString() !== patient._id.toString())
    patientAlreadyRegistered({ record: "rg", searched: data.rg, err: 403 });

  const byPhone = await getPatientByPhone(data.phone, user.clinic);
  if (byPhone && byPhone._id.toString() !== patient._id.toString())
    patientAlreadyRegistered({ record: "phone", searched: data.phone, err: 403 });

  const byEmail = await getPatientByEmail(data.email, user.clinic);
  if (byEmail && byEmail._id.toString() !== patient._id.toString())
    patientAlreadyRegistered({ record: "email", searched: data.email, err: 403 });

  const newPatient: ClinicPatient = {
    ...data,
    cpf: patient.cpf,
    birthdate: String(stringToData(data.birthdate)),
  };

  return await updatePatient(user.clinic, newPatient);
};

const updatePatientAnamnesis = async (patient: ObjectId, data: NewAnamnesis) => {
  const newAnamnesis: UpdateAnamnesis = {
    ...data,
    lastUpdate: new Date(),
  };

  const register = await respository.updatePatientAnamnesis(patient, newAnamnesis);
  if (register.modifiedCount === 1) return returnMessage("Anamnese cadastrada com sucesso");
  else throw new CustomError("Erro ao cadastrar anamnese", 502);
};

export const postPatientAnamnesis = async (user: ClinicUser, data: DbAnamnesis): Promise<ServiceRes> => {
  const patient = await getPatient(data.Patient);
  if (patient.Clinic.toString() !== user.clinic) throw new CustomError("Paciente não pertence a clínica", 403);

  delete data.Patient;
  return await updatePatientAnamnesis(patient._id, data);
};

const updatePatientIntraoral = async (patient: ObjectId, data: NewIntraoral) => {
  const newIntraoral: UpdateIntraoral = {
    ...data,
    lastUpdate: new Date(),
  };

  const register = await respository.updatePatientIntraoral(patient, newIntraoral);
  if (register.modifiedCount === 1) return returnMessage("Exame intraoral cadastrado com sucesso");
  else throw new CustomError("Erro ao cadastrar exame intraoral", 502);
};

export const postPatientIntraoral = async (user: ClinicUser, data: DbIntraoral): Promise<ServiceRes> => {
  const patient = await getPatient(data.Patient);
  if (patient.Clinic.toString() !== user.clinic) throw new CustomError("Paciente não pertence a clínica", 403);

  delete data.Patient;
  return await updatePatientIntraoral(patient._id, data);
};

export const deletePatient = async (user: ClinicUser, id: string): Promise<ServiceRes> => {
  const patient = await getPatient(id);
  if (patient.Clinic.toString() !== user.clinic) throw new CustomError("Paciente não pertence a clínica", 403);

  // to-do: checar se há odontogramas associados ao paciente nem agendamentos

  const register = await respository.deletePatient(patient._id);

  if (register.deletedCount === 1) return returnMessage("Paciente excluído com sucesso");
  else throw new CustomError("Erro ao excluir paciente", 502);
};