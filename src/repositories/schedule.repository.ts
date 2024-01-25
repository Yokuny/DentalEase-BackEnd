import { Schedule } from "../database";
import type { NewSchedule, ClinicSchedule, DbSchedule } from "../models";

const projection = { Clinic: 0, __v: 0 };

export const getScheduleById = (id: string): Promise<DbSchedule | null> => {
  return Schedule.findById(id, { __v: 0 }).lean();
};

export const getScheduleByPatient = (Patient: string) => {
  return Schedule.findOne({ Patient }, projection);
};

export const getScheduleByOdontogram = (Odontogram: string) => {
  return Schedule.findOne({ Odontogram }, projection);
};

export const getAllSchedules = (Clinic: string) => {
  return Schedule.find({ Clinic }, projection);
};

export const postSchedule = (data: ClinicSchedule) => {
  return Schedule.create(data);
};

export const updateSchedule = (id: string, data: NewSchedule) => {
  return Schedule.updateOne({ _id: id }, data);
};

export const deleteSchedule = (id: string) => {
  return Schedule.deleteOne({ _id: id });
};
