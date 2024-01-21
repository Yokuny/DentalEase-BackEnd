import { Schedule } from "../database";
import type { ClinicSchedule } from "../models";

export const getScheduleById = (id: string) => {
  return Schedule.findById(id, { Clinic: 0, __v: 0 });
};

export const getScheduleByPatient = (Patient: string) => {
  return Schedule.findOne({ Patient }, { Clinic: 0, __v: 0 });
};

export const getScheduleByOdontogram = (Odontogram: string) => {
  return Schedule.findOne({ Odontogram }, { Clinic: 0, __v: 0 });
};

export const getAllSchedules = (Clinic: string) => {
  return Schedule.find({ Clinic }, { Clinic: 0, __v: 0 });
};

export const postSchedule = (data: ClinicSchedule) => {
  return Schedule.create(data);
};

export const updateSchedule = (id: string, data: ClinicSchedule) => {
  return Schedule.updateOne({ _id: id }, data);
};

export const deleteSchedule = (id: string) => {
  return Schedule.deleteOne({ _id: id });
};
