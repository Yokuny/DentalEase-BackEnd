import * as respository from "../repositories/odontogram.repository";
import {
  getPatient,
  getPatientByCpf,
  getPatientByEmail,
  getPatientByPhone,
  getPatientByRg,
} from "../services/patient.service";
import { getClinicDoctor } from "../services/clinic.service";
import { CustomError } from "../models";
import type { NewOdontogram, ClinicOdontogram, RequestRegister, ClinicUser } from "../models";

export const getOdontogram = async (id: string) => {
  const odontogram = await respository.getOdontogram(id);
  if (!odontogram) throw new CustomError("Odontograma não encontrado", 404);

  return odontogram;
};

const getPatientOdontograms = async (Patient: string) => {
  const odontograms = await respository.getPatientOdontograms(Patient);
  if (!odontograms) throw new CustomError("Nenhum odontograma encontrado", 404);

  return odontograms;
};

export const getNoFinishedOdontograms = async (clinic: string) => {
  const odontograms = await respository.getNoFinishedOdontograms(clinic);
  if (!odontograms) throw new CustomError("Nenhum odontograma encontrado", 404);

  return odontograms;
};

export const getOdontogramRegister = async (user: ClinicUser, query: RequestRegister) => {
  if (query.id) return await getOdontogram(query.id);

  if (query.cpf) {
    const patient = await getPatientByCpf(query.cpf, user.clinic);
    return await getPatientOdontograms(patient.id);
  }

  if (query.email) {
    const patient = await getPatientByEmail(query.email, user.clinic);
    return await getPatientOdontograms(patient.id);
  }

  if (query.phone) {
    const patient = await getPatientByPhone(query.phone, user.clinic);
    return await getPatientOdontograms(patient.id);
  }

  if (query.rg) {
    const patient = await getPatientByRg(query.rg, user.clinic);
    return await getPatientOdontograms(patient.id);
  }

  return await getNoFinishedOdontograms(user.clinic);
};

export const postOdontogram = async (user: ClinicUser, data: NewOdontogram) => {
  await getPatient(data.Patient);
  await getClinicDoctor(user.clinic, data.Doctor);

  const newOdontogram: ClinicOdontogram = {
    ...data,
    Clinic: user.clinic,
  };

  const register = await respository.postOdontogram(newOdontogram);
  console.log(register);
  console.log("-> postOdontogram");
  if (register) return "Odontograma cadastrado com sucesso";

  throw new CustomError("Erro ao cadastrar odontograma", 502);
};

export const updateOdontogram = async (id: string, data: ClinicOdontogram) => {
  await getOdontogram(id);
  const doctor = await getClinicDoctor(data.Clinic, data.Doctor);
  if (doctor.id?.toString() !== data.Doctor?.toString())
    throw new CustomError("Não é permitido alteração de médico", 403);

  const register = await respository.updateOdontogram(id, data);
  if (register.modifiedCount > 0) return "Odontograma cadastrado com sucesso";
  else throw new CustomError("Odontograma não atualizado", 406);
};

export const patchOdontogram = async (id: string) => {
  const odontogram = await getOdontogram(id);

  const newOdontogram: ClinicOdontogram = {
    Patient: odontogram.Patient,
    Doctor: odontogram.Doctor,
    Clinic: odontogram.Clinic,
    workToBeDone: odontogram.workToBeDone,
    teeth: odontogram.teeth,
    finished: !odontogram.finished,
  };

  return await updateOdontogram(id, newOdontogram);
};

export const deleteOdontogram = async (id: string) => {
  const register = await respository.deleteOdontogram(id);

  if (register.deletedCount === 1) return "Odontograma deletado com sucesso";
  else throw new CustomError("Odontograma não deletado", 406);
};
