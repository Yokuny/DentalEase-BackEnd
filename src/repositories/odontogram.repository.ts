import { ObjectId } from "mongodb";
import { Odontogram } from "../database";
import type { DbOdontogram, ClinicOdontogram, PartialOdontogram } from "../models";

const projection = { Clinic: 0, __v: 0 };

export const getOdontogram = async (id: string): Promise<DbOdontogram | null> => {
  return Odontogram.findOne({ _id: id }, { __v: 0 }).lean();
};

export const getPatientOdontograms = async (Patient: ObjectId): Promise<DbOdontogram[]> => {
  return Odontogram.find({ Patient }, projection);
};

export const getPartialOdontogramRegister = async (Clinic: string): Promise<PartialOdontogram[] | null> => {
  return Odontogram.aggregate([
    { $match: { Clinic: new ObjectId(Clinic) } },
    { $lookup: { from: "patients", localField: "Patient", foreignField: "_id", as: "patient" } },
    { $lookup: { from: "users", localField: "Doctor", foreignField: "_id", as: "doctor" } },
    { $unwind: "$patient" },
    { $unwind: "$doctor" },
    {
      $project: {
        _id: 1,
        procedures: 1,
        finished: 1,
        patient: { _id: 1, name: 1 },
        doctor: { _id: 1, name: 1 },
      },
    },
  ]).exec();
};

export const getAllOdontograms = async (Clinic: string): Promise<DbOdontogram[]> => {
  return Odontogram.find({ Clinic }, projection);
};

export const getNoFinishedOdontograms = async (Clinic: string): Promise<DbOdontogram[]> => {
  return Odontogram.find({ Clinic, finished: false }, projection);
};

export const postOdontogram = async (data: ClinicOdontogram) => {
  return Odontogram.create(data);
};

export const updateOdontogram = async (id: string, data: ClinicOdontogram) => {
  return Odontogram.updateOne({ _id: id }, data);
};

export const deleteOdontogram = async (_id: ObjectId) => {
  return Odontogram.deleteOne({ _id });
};
