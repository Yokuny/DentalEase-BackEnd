import { Odontogram } from "../database";
import type { DbOdontogram, NewOdontogram, ClinicOdontogram } from "../models";

const projection = { Clinic: 0, __v: 0 };

export const getOdontogram = async (id: string): Promise<DbOdontogram | null> => {
  return Odontogram.findOne({ _id: id }, projection);
};

export const getPatientOdontograms = async (Patient: string): Promise<DbOdontogram[]> => {
  return Odontogram.find({ Patient }, projection);
};

export const getAllOdontograms = async (clinic: string): Promise<DbOdontogram[]> => {
  return Odontogram.find({ Clinic: clinic }, projection);
};

export const getNoFinishedOdontograms = async (clinic: string): Promise<DbOdontogram[]> => {
  return Odontogram.find({ Clinic: clinic, finished: false }, projection);
};

export const postOdontogram = async (data: NewOdontogram) => {
  return Odontogram.create(data);
};

export const updateOdontogram = async (id: string, data: ClinicOdontogram) => {
  return Odontogram.updateOne({ _id: id }, data);
};

export const deleteOdontogram = async (id: string) => {
  return Odontogram.deleteOne({ _id: id });
};
