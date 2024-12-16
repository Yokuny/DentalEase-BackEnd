import * as respository from "../repositories/financial.repository";
import { getPatient } from "./patient.service";
import { getClinicDoctor } from "./clinic.service";
import { getOdontogram } from "./odontogram.service";
import { returnMessage, returnData } from "../helpers/responsePattern.helper";
import type { ServiceRes } from "../helpers/responsePattern.helper";
import { CustomError, QueryId } from "../models";
import type { ClinicUser, NewFinancial, FinancialState, procedureData } from "../models";

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
    partial: "Parcial",
    paid: "Pago",
    refund: "Reembolsado",
    canceled: "Cancelado",
  };

  const partialFinancials = financial.map((financial) => ({
    _id: financial._id,
    patient: financial.patient.name,
    patient_id: financial.patient._id,
    doctor: financial.doctor.name,
    doctor_id: financial.doctor._id,
    price: financial.price,
    status: financialStatus[financial.status] || financial.status,
    date: financial.createdAt,
  }));

  if (!partialFinancials || partialFinancials.length === 0)
    return returnMessage("Nenhum registro financeiro encontrado");
  return returnData(partialFinancials);
};

export const getDetailedFinancialRegister = async (user: ClinicUser, id: string): Promise<ServiceRes> => {
  const financial = await respository.getDetailedFinancialRegister(id);
  if (!financial) throw new CustomError("Registro financeiro não encontrado", 404);
  if (financial.Clinic.toString() !== user.clinic)
    throw new CustomError("Registro financeiro não pertence à clínica", 406);

  return returnData(financial);
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

    data.procedures = odontogram.procedures; // percorrer array procedures do odontograma
  }

  if (!data.procedures) throw new CustomError("Procedimentos não informados", 406);

  const price = data.procedures.reduce((acc, p) => acc + p.price, 0);
  if (price < 1) throw new CustomError("Preço inválido", 406);

  const newFinancial = {
    ...data,
    Clinic: user.clinic,
    status: getFinancialStatus(data.procedures),
    price: price,
  };

  const response = await respository.postFinancial(newFinancial);
  if (response) return returnMessage("Registro financeiro criado com sucesso");

  throw new CustomError("Erro ao criar registro financeiro", 502);
};

export const updateFinancialStatus = async (
  user: ClinicUser,
  id: string,
  status: FinancialState
): Promise<ServiceRes> => {
  const financial = await getFinancial(id, true);
  if (financial.Clinic.toString() !== user.clinic)
    throw new CustomError("Registro financeiro não pertence à clínica", 406);

  const response = await respository.updateFinancialStatus(id, status.status);
  if (response.modifiedCount > 0) return returnMessage("Status do registro financeiro atualizado com sucesso");

  throw new CustomError("Erro ao atualizar status do registro financeiro", 502);
};

export const deleteFinancial = async (user: ClinicUser, id: string): Promise<ServiceRes> => {
  const financial = await getFinancial(id, true);
  if (financial.Clinic.toString() !== user.clinic)
    throw new CustomError("Registro financeiro não pertence à clínica", 406);

  const response = await respository.deleteFinancial(financial._id);

  if (response.deletedCount > 0) return returnMessage("Registro financeiro deletado com sucesso");
  throw new CustomError("Erro ao deletar registro financeiro", 502);
};

const getFinancialStatus = (procedures: procedureData[]): "pending" | "paid" | "partial" => {
  if (!procedures) return "pending";
  const paymentStatus = procedures.filter((p) => p.status === "paid").length;
  if (paymentStatus === procedures.length) return "paid";
  return paymentStatus === 0 ? "pending" : "partial";
};