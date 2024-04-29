import { ObjectId } from "mongodb";
import * as respository from "../repositories/odontogram.repository";
import { getPatient, getPatientByCpf, getPatientByEmail, getPatientByPhone, getPatientByRg } from "./patient.service";
import { getClinicDoctor } from "./clinic.service";
import { returnMessage, returnData, returnDataMessage } from "../helpers/responsePattern.helper";
import { CustomError } from "../models/error.type";
import type { ServiceRes } from "../helpers/responsePattern.helper";

import type { NewOdontogram, ClinicOdontogram, ClinicUser, Query } from "../models";

export const getOdontogram = async (id: string) => {
  const odontogram = await respository.getOdontogram(id);
  if (!odontogram) throw new CustomError("Odontograma não encontrado", 404);

  return odontogram;
};

const getPatientOdontograms = async (Patient: ObjectId) => {
  const odontograms = await respository.getPatientOdontograms(Patient);
  if (!odontograms) throw new CustomError("Nenhum odontograma encontrado", 404);

  return odontograms;
};

export const getNoFinishedOdontograms = async (clinic: string) => {
  const odontograms = await respository.getNoFinishedOdontograms(clinic);
  if (!odontograms) throw new CustomError("Nenhum odontograma encontrado", 404);

  return odontograms;
};

export const getOdontogramRegister = async (user: ClinicUser, query: Query): Promise<ServiceRes> => {
  if (query.id) return returnData(await getOdontogram(query.id));

  if (query.cpf) {
    const patient = await getPatientByCpf(query.cpf, user.clinic, true);
    return returnData(await getPatientOdontograms(patient._id));
  }
  if (query.email) {
    const patient = await getPatientByEmail(query.email, user.clinic, true);
    return returnData(await getPatientOdontograms(patient._id));
  }
  if (query.phone) {
    const patient = await getPatientByPhone(query.phone, user.clinic, true);
    return returnData(await getPatientOdontograms(patient._id));
  }
  if (query.rg) {
    const patient = await getPatientByRg(query.rg, user.clinic, true);
    return returnData(await getPatientOdontograms(patient._id));
  }

  const odontograms = await getNoFinishedOdontograms(user.clinic);

  if (!odontograms || odontograms.length === 0) return returnMessage("Nenhum odontograma encontrado");
  return returnData(odontograms);
};

export const getPartialOdontogramRegister = async (user: ClinicUser): Promise<ServiceRes> => {
  const odontograms = await respository.getPartialOdontogramRegister(user.clinic);
  if (!odontograms) throw new CustomError("Nenhum odontograma encontrado", 404);

  const partialOdontograms = odontograms.map((odontogram) => {
    return {
      ...odontogram,
      patient: odontogram.patient.name,
      patient_id: odontogram.patient._id,
      doctor: odontogram.doctor.name,
      doctor_id: odontogram.doctor._id,
    };
  });

  if (!partialOdontograms || partialOdontograms.length === 0) return returnMessage("Nenhum odontograma encontrado");
  return returnData(partialOdontograms);
};

export const postOdontogram = async (user: ClinicUser, data: NewOdontogram): Promise<ServiceRes> => {
  await getPatient(data.Patient);
  await getClinicDoctor(user.clinic, data.Doctor);

  const newOdontogram: ClinicOdontogram = {
    ...data,
    finished: false,
    Clinic: user.clinic,
  };

  const register = await respository.postOdontogram(newOdontogram);

  if (register._id) {
    const odontogram_id = { _id: register._id.toString() };
    return returnDataMessage(odontogram_id, "Odontograma cadastrado com sucesso");
  }

  throw new CustomError("Erro ao cadastrar odontograma", 502);
};

export const updateOdontogram = async (user: ClinicUser, id: string, data: ClinicOdontogram): Promise<ServiceRes> => {
  const odontogram = await getOdontogram(id);
  if (odontogram.Clinic.toString() !== user.clinic) throw new CustomError("Odontograma não pertence a clínica", 406);

  await getPatient(data.Patient);
  await getClinicDoctor(user.clinic, data.Doctor);

  delete data.Patient;
  delete data.Doctor;

  const register = await respository.updateOdontogram(id, data);

  if (register.modifiedCount > 0) return returnMessage("Odontograma atualizado com sucesso");
  else throw new CustomError("Odontograma não atualizado", 406);
};

export const patchOdontogram = async (user: ClinicUser, id: string): Promise<ServiceRes> => {
  const odontogram = await getOdontogram(id);
  if (odontogram.Clinic.toString() !== user.clinic) throw new CustomError("Odontograma não pertence a clínica", 406);

  const newOdontogram: ClinicOdontogram = {
    ...odontogram,
    finished: !odontogram.finished,
  };

  return await updateOdontogram(user, String(odontogram._id), newOdontogram);
};

export const deleteOdontogram = async (user: ClinicUser, id: string): Promise<ServiceRes> => {
  const odontogram = await getOdontogram(id);
  if (odontogram.Clinic.toString() !== user.clinic) throw new CustomError("Odontograma não pertence a clínica", 406);

  const register = await respository.deleteOdontogram(odontogram._id);

  if (register.deletedCount > 0) return returnMessage("Odontograma deletado com sucesso");
  else throw new CustomError("Odontograma não deletado", 406);
};
