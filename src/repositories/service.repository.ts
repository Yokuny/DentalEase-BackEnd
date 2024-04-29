import { ObjectId } from "mongodb";
import { Service } from "../database";
import type { ClinicService } from "../models";

const projection = { Clinic: 0, __v: 0 };

export const getServiceById = (id: string) => {
  return Service.findById({ _id: id }, { __v: 0 }).lean();
};

export const getServiceByPatient = (Patient: string) => {
  return Service.findOne({ Patient }, projection);
};

export const getServiceByDoctor = (Doctor: string) => {
  return Service.findOne({ Doctor }, projection);
};

export const getAllServices = (Clinic: string) => {
  return Service.find({ Clinic }, projection);
};

export const getPartialServiceRegister = (Clinic: string) => {
  return Service.aggregate([
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
        workToBeDone: 1,
      },
    },
  ]).exec();
};

export const postService = (data: ClinicService) => {
  return Service.create(data);
};

export const deleteService = (id: ObjectId) => {
  return Service.deleteOne({ _id: id });
};
