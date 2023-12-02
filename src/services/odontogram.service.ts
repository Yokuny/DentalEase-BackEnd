import { getPatient } from "../services/patient.service";
import * as respository from "../repositories/odontogram.repository";
import { CustomError } from "../models";
import type { NewOdontogram, DbOdontogram, ClinicOdontogram } from "../models";

export const getOdontogram = async (clinic: string, id: string) => {
  const odontogram = await respository.getOdontogram(id, clinic);
  if (!odontogram) throw new CustomError("Odontograma não encontrado", 404);

  return odontogram;
};

export const postOdontogram = async (clinic: string, data: NewOdontogram) => {
  await getPatient(data.Patient, clinic);

  const newOdontogram: ClinicOdontogram = {
    ...data,
    Clinic: clinic,
  };

  const register = await respository.postOdontogram(newOdontogram);
  if (register) return "Odontograma cadastrado com sucesso";

  throw new CustomError("Erro ao cadastrar odontograma", 502);
};

export const updateOdontogram = async (clinic: string, id: string, data: ClinicOdontogram) => {
  await getOdontogram(clinic, id);

  const register = await respository.updateOdontogram(id, data);
  if (register.modifiedCount > 0) return "Odontograma cadastrado com sucesso";
  else throw new CustomError("Odontograma não atualizado", 406);
};

export const patchOdontogram = async (clinic: string, id: string) => {
  const odontogram = await getOdontogram(clinic, id);

  const newOdontogram: ClinicOdontogram = {
    Patient: odontogram.Patient,
    Clinic: odontogram.Clinic,
    workToBeDone: odontogram.workToBeDone,
    teeth: odontogram.teeth,
    finished: !odontogram.finished,
  };

  return await updateOdontogram(clinic, id, newOdontogram);
};

export const deleteOdontogram = async (clinic: string, id: string) => {
  const odontogram = await getOdontogram(clinic, id);
  const register = await respository.deleteOdontogram(odontogram);

  if (register.deletedCount === 1) return "Odontograma deletado com sucesso";
  else throw new CustomError("Odontograma não deletado", 406);
};
