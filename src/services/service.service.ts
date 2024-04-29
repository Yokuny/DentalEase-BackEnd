import * as respository from "../repositories/service.repository";
import { getPatient } from "./patient.service";
import { getClinicDoctor } from "./clinic.service";
import { getOdontogram } from "./odontogram.service";
import { returnMessage, returnData } from "../helpers/responsePattern.helper";
import type { ServiceRes } from "../helpers/responsePattern.helper";
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

export const getServiceRegister = async (user: ClinicUser, query: QueryId): Promise<ServiceRes> => {
  if (query.id) return returnData(await getService(query.id, true));
  if (query.Service) return returnData(await getService(query.Service, true));
  if (query.Patient) return returnData(await getServiceByPatient(query.Patient, true));
  if (query.Doctor) return returnData(await getServiceByDoctor(query.Doctor, true));

  const services = await getAllServices(user.clinic);

  if (!services || services.length === 0) return returnMessage("Nenhum serviço encontrado");
  return returnData(services);
};

export const getPartialServiceRegister = async (user: ClinicUser): Promise<ServiceRes> => {
  const services = await respository.getPartialServiceRegister(user.clinic);
  if (!services) throw new CustomError("Nenhum serviço encontrado", 404);

  const serviceStatus: { [key: string]: string } = {
    pending: "Pendente",
    paid: "Pago",
    canceled: "Cancelado",
  };

  const partialServices = services.map((service) => ({
    _id: service._id,
    workToBeDone: service.workToBeDone,
    price: service.price,
    patient: service.patient.name,
    patient_id: service.patient._id,
    doctor: service.doctor.name,
    doctor_id: service.doctor._id,
    odontogram_id: service.Odontogram,
    status: serviceStatus[service.status] || service.status,
  }));

  if (!partialServices || partialServices.length === 0) return returnMessage("Nenhum serviço encontrado");
  return returnData(partialServices);
};

export const postService = async (user: ClinicUser, data: NewService): Promise<ServiceRes> => {
  await getPatient(data.Patient);
  await getClinicDoctor(user.clinic, data.Doctor);

  if (data.Odontogram) {
    const odontogram = await getOdontogram(data.Odontogram);
    if (odontogram.Patient.toString() !== data.Patient.toString())
      throw new CustomError("Odontograma não pertence ao paciente", 406);
    if (odontogram.Doctor.toString() !== data.Doctor.toString())
      throw new CustomError("Odontograma não pertence ao dentista", 406);
    if (odontogram.finished === true) throw new CustomError("Odontograma já finalizado", 409);

    if (!data.workToBeDone) data.workToBeDone = odontogram.workToBeDone;
  }

  if (!data.workToBeDone) throw new CustomError("Trabalho a ser feito não informado", 406);
  if (data.price < 1) throw new CustomError("Preço inválido", 406);

  const newService = {
    ...data,
    Clinic: user.clinic,
  };

  const response = await respository.postService(newService);
  if (response) return returnMessage("Serviço criado com sucesso");

  throw new CustomError("Erro ao criar serviço", 502);
};

export const deleteService = async (user: ClinicUser, id: string): Promise<ServiceRes> => {
  const service = await getService(id, true);
  if (service.Clinic.toString() !== user.clinic) throw new CustomError("Serviço não pertence a clínica", 406);

  const response = await respository.deleteService(service._id);

  if (response.deletedCount > 0) return returnMessage("Serviço deletado com sucesso");
  throw new CustomError("Erro ao deletar serviço", 502);
};
