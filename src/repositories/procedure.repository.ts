import { Procedure } from "../database";
import type { ClinicProcedure } from "../models";

const projection = { Clinic: 0, __v: 0 };

export const getProcedure = async (Clinic: string) => {
  return Procedure.findOne({ Clinic }, projection);
};

export const updateProcedure = async (data: ClinicProcedure, Clinic: string) => {
  return Procedure.updateOne({ Clinic }, data, { upsert: true });
};
