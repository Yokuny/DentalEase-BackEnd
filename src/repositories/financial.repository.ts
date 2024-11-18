import { ObjectId } from "mongodb";
import { Financial } from "../database";
import type { ClinicFinancial, PartialFinancial } from "../models";

const projection = { Clinic: 0, __v: 0 };

export const getFinancialById = (id: string) => {
  return Financial.findById({ _id: id }, { __v: 0 }).lean();
};

export const getFinancialByPatient = (Patient: string) => {
  return Financial.findOne({ Patient }, projection);
};

export const getFinancialByDoctor = (Doctor: string) => {
  return Financial.findOne({ Doctor }, projection);
};

export const getAllFinancial = (Clinic: string) => {
  return Financial.find({ Clinic }, projection);
};

export const getPartialFinancialRegister = (Clinic: string): Promise<PartialFinancial[] | null> => {
  return Financial.aggregate([
    { $match: { Clinic: new ObjectId(Clinic) } },
    { $lookup: { from: "patients", localField: "Patient", foreignField: "_id", as: "patient" } },
    { $lookup: { from: "users", localField: "Doctor", foreignField: "_id", as: "doctor" } },
    { $unwind: "$patient" },
    { $unwind: "$doctor" },
    {
      $project: {
        _id: 1,
        patient: { _id: 1, name: 1 },
        doctor: { _id: 1, name: 1 },
        Odontogram: 1,
        status: 1,
        price: 1,
        procedures: 1,
      },
    },
  ]).exec();
};

export const postFinancial = async (data: ClinicFinancial) => {
  return Financial.create(data);
};

export const deleteFinancial = (id: ObjectId) => {
  return Financial.deleteOne({ _id: id });
};
