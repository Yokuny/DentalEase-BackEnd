import { Odontogram } from "../database";
import type { DbOdontogram, NewOdontogram, ClinicOdontogram } from "../models";

export const getOdontogram = async (id: string): Promise<DbOdontogram | null> => {
  return Odontogram.findOne({ _id: id }, { Clinic: 0, __v: 0 }).lean();
};

export const getPatientOdontograms = async (Patient: string): Promise<DbOdontogram[]> => {
  return Odontogram.find({ Patient }, { Clinic: 0, __v: 0 });
};

export const getAllOdontograms = async (clinic: string): Promise<DbOdontogram[]> => {
  return Odontogram.find({ Clinic: clinic }, { Clinic: 0, __v: 0 });
};

export const getNoFinishedOdontograms = async (clinic: string): Promise<DbOdontogram[]> => {
  return Odontogram.find({ Clinic: clinic, finished: false }, { Clinic: 0, __v: 0 });
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
