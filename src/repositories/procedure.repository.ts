import { Procedure } from "../database";
import type { ClinicProcedures } from "../models";

const projection = { Clinic: 0, _id: 0, __v: 0 };

export const getProcedure = async (Clinic: string) => {
  return Procedure.findOne({ Clinic }, projection);
};

export const updateProcedure = async (data: ClinicProcedures, Clinic: string) => {
  return Procedure.updateOne({ Clinic }, data, { upsert: true });
};
