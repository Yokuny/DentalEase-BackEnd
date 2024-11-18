import { ObjectId } from "mongodb";
import { Schedule } from "../database";
import type { NewSchedule, ClinicSchedule, DbSchedule, PartialSchedule } from "../models";

const projection = { Clinic: 0, __v: 0 };

export const getAllSchedules = (Clinic: string) => {
  return Schedule.find({ Clinic }, projection);
};

export const getPartialSchedulesRegister = (Clinic: string): Promise<PartialSchedule[] | null> => {
  return Schedule.aggregate([
    { $match: { Clinic: new ObjectId(Clinic) } },
    { $lookup: { from: "patients", localField: "Patient", foreignField: "_id", as: "patient" } },
    { $lookup: { from: "users", localField: "Doctor", foreignField: "_id", as: "doctor" } },
    { $lookup: { from: "Financials", localField: "Financial", foreignField: "_id", as: "Financial" } },
    { $unwind: "$patient" },
    { $unwind: "$doctor" },
    { $unwind: "$financial" },
    {
      $project: {
        _id: 1,
        startTime: 1,
        endTime: 1,
        patient: { name: 1 },
        doctor: { name: 1 },
        service: { procedures: 1 },
      },
    },
  ]).exec();
};

export const getScheduleById = (id: string): Promise<DbSchedule | null> => {
  return Schedule.findById(id, { __v: 0 }).lean();
};

export const getScheduleByPatient = (Patient: string) => {
  return Schedule.findOne({ Patient }, projection);
};

export const getScheduleByOdontogram = (Odontogram: string) => {
  return Schedule.findOne({ Odontogram }, projection);
};

export const postSchedule = (data: ClinicSchedule) => {
  return Schedule.create(data);
};

export const updateSchedule = (_id: ObjectId, data: NewSchedule) => {
  return Schedule.updateOne({ _id }, data);
};

export const deleteSchedule = (_id: ObjectId) => {
  return Schedule.deleteOne({ _id });
};
