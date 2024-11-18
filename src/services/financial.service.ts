import * as respository from "../repositories/financial.repository";
import { getPatient } from "./patient.service";
import { getClinicDoctor } from "./clinic.service";
import { getOdontogram } from "./odontogram.service";
import { returnMessage, returnData } from "../helpers/responsePattern.helper";
import type { ServiceRes } from "../helpers/responsePattern.helper";
import { CustomError, QueryId } from "../models";
import type { ClinicUser, NewFinancial } from "../models";

export const getFinancial = async (id: string, required?: boolean) => {
  const financial = await respository.getFinancialById(id);
  if (!financial && required) throw new CustomError("Registro financeiro não encontrado", 404);

  return financial;
};

const getFinancialByPatient = async (patient: string, required?: boolean) => {
  const financial = await respository.getFinancialByPatient(patient);
  if (!financial && required) throw new CustomError("Registro financeiro não encontrado", 404);

  return financial;
};

const getFinancialByDoctor = async (doctor: string, required?: boolean) => {
  const financial = await respository.getFinancialByDoctor(doctor);
  if (!financial && required) throw new CustomError("Registro financeiro não encontrado", 404);

  return financial;
};

export const getAllFinancial = async (clinic: string) => {
  const financial = await respository.getAllFinancial(clinic);
  if (!financial) throw new CustomError("Nenhum registro financeiro encontrado", 404);

  return financial;
};

export const getFinancialRegister = async (user: ClinicUser, query: QueryId): Promise<ServiceRes> => {
  if (query.id) return returnData(await getFinancial(query.id, true));
  if (query.Financial) return returnData(await getFinancial(query.Financial, true));
  if (query.Patient) return returnData(await getFinancialByPatient(query.Patient, true));
  if (query.Doctor) return returnData(await getFinancialByDoctor(query.Doctor, true));

  const financial = await getAllFinancial(user.clinic);

  if (!financial || financial.length === 0) return returnMessage("Nenhum registro financeiro encontrado");
  return returnData(financial);
};

export const getPartialFinancialRegister = async (user: ClinicUser): Promise<ServiceRes> => {
  const financial = await respository.getPartialFinancialRegister(user.clinic);
  if (!financial) throw new CustomError("Nenhum registro financeiro encontrado", 404);

  const financialStatus: { [key: string]: string } = {
    pending: "Pendente",
    paid: "Pago",
    canceled: "Cancelado",
  };

  const partialFinancials = financial.map((financial) => ({
    _id: financial._id,
    procedures: financial.procedures,
    price: financial.price,
    patient: financial.patient.name,
    patient_id: financial.patient._id,
    doctor: financial.doctor.name,
    doctor_id: financial.doctor._id,
    odontogram_id: financial.Odontogram,
    status: financialStatus[financial.status] || financial.status,
  }));

  if (!partialFinancials || partialFinancials.length === 0)
    return returnMessage("Nenhum registro financeiro encontrado");
  return returnData(partialFinancials);
};

export const postFinancial = async (user: ClinicUser, data: NewFinancial): Promise<ServiceRes> => {
  await getPatient(data.Patient);
  await getClinicDoctor(user.clinic, data.Doctor);

  if (data.Odontogram) {
    const odontogram = await getOdontogram(data.Odontogram);
    if (odontogram.Patient.toString() !== data.Patient.toString())
      throw new CustomError("Odontograma não pertence ao paciente", 406);
    if (odontogram.Doctor.toString() !== data.Doctor.toString())
      throw new CustomError("Odontograma não pertence ao dentista", 406);
    if (odontogram.finished === true) throw new CustomError("Odontograma já finalizado", 409);

    if (!data.procedures) data.procedures = odontogram.procedures;
  }

  if (!data.procedures) throw new CustomError("Procedimentos não informados", 406);
  if (data.price < 1) throw new CustomError("Preço inválido", 406);

  const newFinancial = {
    ...data,
    Clinic: user.clinic,
  };

  const response = await respository.postFinancial(newFinancial);
  if (response) return returnMessage("Registro financeiro criado com sucesso");

  throw new CustomError("Erro ao criar registro financeiro", 502);
};

export const deleteFinancial = async (user: ClinicUser, id: string): Promise<ServiceRes> => {
  const financial = await getFinancial(id, true);
  if (financial.Clinic.toString() !== user.clinic)
    throw new CustomError("Registro financeiro não pertence à clínica", 406);

  const response = await respository.deleteFinancial(financial._id);

  if (response.deletedCount > 0) return returnMessage("Registro financeiro deletado com sucesso");
  throw new CustomError("Erro ao deletar registro financeiro", 502);
};
