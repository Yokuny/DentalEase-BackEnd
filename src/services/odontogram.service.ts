import * as respository from "../repositories/odontogram.repository";
import { getPatient } from "../services/patient.service";
import { CustomError } from "../models";
import type { NewOdontogram, ClinicOdontogram } from "../models";

export const getOdontogram = async (id: string) => {
  const odontogram = await respository.getOdontogram(id);
  if (!odontogram) throw new CustomError("Odontograma não encontrado", 404);

  return odontogram;
};

export const postOdontogram = async (clinic: string, data: NewOdontogram) => {
  await getPatient(data.Patient);

  const newOdontogram: ClinicOdontogram = {
    ...data,
    Clinic: clinic,
  };

  const register = await respository.postOdontogram(newOdontogram);
  if (register) return "Odontograma cadastrado com sucesso";

  throw new CustomError("Erro ao cadastrar odontograma", 502);
};

export const updateOdontogram = async (id: string, data: ClinicOdontogram) => {
  await getOdontogram(id);

  const register = await respository.updateOdontogram(id, data);
  if (register.modifiedCount > 0) return "Odontograma cadastrado com sucesso";
  else throw new CustomError("Odontograma não atualizado", 406);
};

export const patchOdontogram = async (id: string) => {
  const odontogram = await getOdontogram(id);

  const newOdontogram: ClinicOdontogram = {
    Patient: odontogram.Patient,
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
