import * as respository from "../repositories/odontogram.repository";
import {
  getPatient,
  getPatientByCpf,
  getPatientByEmail,
  getPatientByPhone,
  getPatientByRg,
} from "./patient.service";
import { getClinicDoctor } from "./clinic.service";
import { CustomError } from "../models";
import type { NewOdontogram, ClinicOdontogram, ClinicUser, Query } from "../models";

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

export const getOdontogramRegister = async (user: ClinicUser, query: Query) => {
  if (query.id) return await getOdontogram(query.id);

  if (query.cpf) {
    const patient = await getPatientByCpf(query.cpf, user.clinic, true);
    return await getPatientOdontograms(patient.id);
  }
  if (query.email) {
    const patient = await getPatientByEmail(query.email, user.clinic, true);
    return await getPatientOdontograms(patient.id);
  }
  if (query.phone) {
    const patient = await getPatientByPhone(query.phone, user.clinic, true);
    return await getPatientOdontograms(patient.id);
  }
  if (query.rg) {
    const patient = await getPatientByRg(query.rg, user.clinic, true);
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
  if (register) return "Odontograma cadastrado com sucesso";

  throw new CustomError("Erro ao cadastrar odontograma", 502);
};

export const updateOdontogram = async (user: ClinicUser, id: string, data: ClinicOdontogram) => {
  const odontogram = await getOdontogram(id);
  if (odontogram.Clinic !== user.clinic) throw new CustomError("Odontograma não pertence a clínica", 406);

  await getPatient(data.Patient);
  await getClinicDoctor(user.clinic, data.Doctor);

  delete data.Patient;
  delete data.Doctor;

  const register = await respository.updateOdontogram(id, data);
  if (register.modifiedCount > 0) return "Odontograma atualizado com sucesso";
  else throw new CustomError("Odontograma não atualizado", 406);
};

export const patchOdontogram = async (user: ClinicUser, id: string) => {
  const odontogram = await getOdontogram(id);
  if (odontogram.Clinic !== user.clinic) throw new CustomError("Odontograma não pertence a clínica", 406);

  const newOdontogram: ClinicOdontogram = {
    ...odontogram,
    finished: !odontogram.finished,
  };

  return await updateOdontogram(user, id, newOdontogram);
};

export const deleteOdontogram = async (user: ClinicUser, id: string) => {
  const odontogram = await getOdontogram(id);
  if (odontogram.Clinic !== user.clinic) throw new CustomError("Odontograma não pertence a clínica", 406);

  const register = await respository.deleteOdontogram(id);

  if (register.deletedCount === 1) return "Odontograma deletado com sucesso";
  else throw new CustomError("Odontograma não deletado", 406);
};
