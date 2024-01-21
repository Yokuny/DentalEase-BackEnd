import { Service } from "../database";
import type { ClinicService } from "../models";

export const getServiceById = (id: string) => {
  return Service.findById(id, { Clinic: 0, __v: 0 });
};

export const getServiceByPatient = (Patient: string) => {
  return Service.findOne({ Patient }, { Clinic: 0, __v: 0 });
};

export const getServiceByDoctor = (Doctor: string) => {
  return Service.findOne({ Doctor }, { Clinic: 0, __v: 0 });
};

export const getAllServices = (Clinic: string) => {
  return Service.find({ Clinic }, { Clinic: 0, __v: 0 });
};

export const postService = (data: ClinicService) => {
  return Service.create(data);
};
