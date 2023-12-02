import { Odontogram } from "../database";
import type { DbOdontogram, NewOdontogram, ClinicOdontogram } from "../models";

export const getOdontogram = async (id: string, clinic: string): Promise<DbOdontogram | null> => {
  return Odontogram.findOne({ _id: id, Clinic: clinic }, { __v: 0 });
};

export const postOdontogram = async (data: NewOdontogram) => {
  return Odontogram.create(data);
};

export const updateOdontogram = async (id: string, data: ClinicOdontogram) => {
  return Odontogram.updateOne({ _id: id }, data);
};

export const deleteOdontogram = async (data: DbOdontogram) => {
  return Odontogram.deleteOne({ _id: data.id });
};
