import { Service } from "../database";
import type { ClinicService } from "../models";

const projection = { Clinic: 0, __v: 0 };

export const getServiceById = (id: string) => {
  return Service.findById(id, projection);
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

export const postService = (data: ClinicService) => {
  return Service.create(data);
};
