import * as respository from "../repositories/service.repository";
import { getPatient } from "./patient.service";
import { getClinicDoctor } from "./clinic.service";
import { getOdontogram } from "./odontogram.service";
import { CustomError, QueryId } from "../models";
import type { ClinicUser, NewService } from "../models";

export const getService = async (id: string, required?: boolean) => {
  const service = await respository.getServiceById(id);
  if (!service && required) throw new CustomError("Serviço não encontrado", 404);

  return service;
};

const getServiceByPatient = async (patient: string, required?: boolean) => {
  const service = await respository.getServiceByPatient(patient);
  if (!service && required) throw new CustomError("Serviço não encontrado", 404);

  return service;
};

const getServiceByDoctor = async (doctor: string, required?: boolean) => {
  const service = await respository.getServiceByDoctor(doctor);
  if (!service && required) throw new CustomError("Serviço não encontrado", 404);

  return service;
};

export const getAllServices = async (clinic: string) => {
  const services = await respository.getAllServices(clinic);
  if (!services) throw new CustomError("Serviços não encontrados", 404);

  return services;
};

export const getServiceRegister = async (user: ClinicUser, query: QueryId) => {
  if (query.id) return await getService(query.id, true);
  if (query.Service) return await getService(query.Service, true);
  if (query.Patient) return await getServiceByPatient(query.Patient, true);
  if (query.Doctor) return await getServiceByDoctor(query.Doctor, true);

  const response = await getAllServices(user.clinic);
  if (response) return response;

  throw new CustomError("Erro ao buscar serviços", 502);
};

export const postService = async (user: ClinicUser, data: NewService) => {
  await getPatient(data.Patient);
  await getClinicDoctor(user.clinic, data.Doctor);

  if (data.Odontogram) {
    const odontogram = await getOdontogram(data.Odontogram);
    if (odontogram.Patient !== data.Patient)
      throw new CustomError("Odontograma não pertence ao paciente", 406);
    if (odontogram.Doctor !== data.Doctor) throw new CustomError("Odontograma não pertence ao dentista", 406);
    if (odontogram.finished === true) throw new CustomError("Odontograma já finalizado", 409);

    if (data.workToBeDone) odontogram.workToBeDone = data.workToBeDone;
  }

  if (!data.workToBeDone) throw new CustomError("Trabalho a ser feito não informado", 406);
  if (data.price < 1) throw new CustomError("Preço inválido", 406);

  const newService = {
    ...data,
    Clinic: user.clinic,
  };

  const response = await respository.postService(newService);
  if (response) return "Serviço criado com sucesso";

  throw new CustomError("Erro ao criar serviço", 502);
};
