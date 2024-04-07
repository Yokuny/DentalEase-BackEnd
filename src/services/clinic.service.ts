import * as respository from "../repositories/clinic.repository";
import { getUserById } from "./user.service";
import { numClean } from "../helpers/sanitize.helper";
import { clinicNotFound, clinicAlreadyRegistered } from "../helpers/statusMsgPattern.helper";
import { returnMessage, returnData, returnDataMessage } from "../helpers/responsePattern.helper";
import { CustomError } from "../models";
import type { ClinicUser, NewClinic } from "../models";

const getClinicById = async (id: string, required?: boolean) => {
  const clinic = await respository.getClinicById(id);
  if (!clinic && required) throw new CustomError("Clínica não encontrada", 404);

  return clinic;
};

const getClinicByCNPJ = async (cnpj: string, required?: boolean) => {
  const clinic = await respository.getClinicByCNPJ(cnpj);
  if (!clinic && required) clinicNotFound({ record: "cnpj", searched: cnpj, err: 404 });

  return clinic;
};

const getClinicByCode = async (code: string, required?: boolean) => {
  const clinic = await respository.getClinicByCode(code);
  if (!clinic && required) clinicNotFound({ record: "code", searched: code, err: 404 });

  return clinic;
};

const getClinicByEmail = async (email: string, required?: boolean) => {
  const clinic = await respository.getClinicByEmail(email);
  if (!clinic && required) clinicNotFound({ record: "email", searched: email, err: 404 });

  return clinic;
};

export const getClinic = async (user: ClinicUser) => {
  const clinic = await getClinicById(user.clinic, true);

  return returnData(clinic);
};

export const getDoctors = async (user: ClinicUser) => {
  const clinicData = await getClinicById(user.clinic, true);
  const doctorsId = clinicData.users.filter((user) => user.role !== "assistant");
  const doctors = await Promise.all(doctorsId.map((doctor) => getUserById(doctor.user.toString())));

  const secureDoctors = doctors.map((doctor) => ({
    _id: doctor._id,
    name: doctor.name,
    email: doctor.email,
    avatar: doctor.avatar,
  }));

  if (!secureDoctors) return returnMessage("Nenhum médico encontrado");
  return returnData(secureDoctors);
};

export const getClinicDoctor = async (clinic: string, doctor: string) => {
  const clinicDoctor = await respository.getClinicDoctor(clinic, doctor);
  if (!clinicDoctor) throw new CustomError("Médico não encontrado", 404);

  return returnData(clinicDoctor);
};

export const postClinic = async (user: ClinicUser, data: NewClinic) => {
  const clinic = user.clinic || "";
  if (clinic) throw new CustomError("Você já está cadastrado em uma clínica", 409);

  const clinicByCNPJ = await getClinicByCNPJ(data.cnpj);
  if (clinicByCNPJ) clinicAlreadyRegistered({ record: "cnpj", searched: data.cnpj, err: 409 });

  const clinicByEmail = await getClinicByEmail(data.email);
  if (clinicByEmail) clinicAlreadyRegistered({ record: "email", searched: data.email, err: 409 });

  const clinicByCode = await getClinicByCode(data.code);
  if (clinicByCode) clinicAlreadyRegistered({ record: "code", searched: data.code, err: 409 });

  data.cnpj = numClean(data.cnpj);
  const NewClinic = { ...data, users: [{ user: user.user, role: "admin" }] };

  await respository.postClinic(NewClinic, user.user);

  return returnMessage("Clínica cadastrada com sucesso");
};