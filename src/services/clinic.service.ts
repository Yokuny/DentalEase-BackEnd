import * as respository from "../repositories/clinic.repository";
import { getUserById } from "./user.service";
import { CustomError } from "../models";
import { numClean } from "../helpers/sanitize.helper";
import type { ClinicUser, NewClinic } from "../models";

const getClinicById = async (id: string, required?: boolean) => {
  const clinic = await respository.getClinicById(id);
  if (!clinic && required) throw new CustomError("Clínica não encontrada", 404);

  return clinic;
};

const getClinicByCNPJ = async (cnpj: string, required?: boolean) => {
  const clinic = await respository.getClinicByCNPJ(cnpj);
  if (!clinic && required) throw new CustomError("Clínica não encontrada", 404);

  return clinic;
};

const getClinicByCode = async (code: string, required?: boolean) => {
  const clinic = await respository.getClinicByCode(code);
  if (!clinic && required) throw new CustomError("Clínica não encontrada", 404);

  return clinic;
};

const getClinicByEmail = async (email: string, required?: boolean) => {
  const clinic = await respository.getClinicByEmail(email);
  if (!clinic && required) throw new CustomError("Clínica não encontrada", 404);

  return clinic;
};

export const getClinic = async (user: ClinicUser) => await getClinicById(user.clinic, true);

export const getDoctors = async (user: ClinicUser) => {
  const clinicData = await getClinicById(user.clinic, true);
  const doctorsId = clinicData.users.filter((user) => user.role !== "assistant");
  const doctors = await Promise.all(doctorsId.map((doctor) => getUserById(doctor.user.toString())));

  const secureDoctors = doctors.map((doctor) => ({
    _id: doctor.id,
    username: doctor.username,
    email: doctor.email,
    avatar: doctor.avatar,
  }));

  return secureDoctors;
};

export const getClinicDoctor = async (clinic: string, doctor: string) => {
  const clinicDoctor = await respository.getClinicDoctor(clinic, doctor);
  if (!clinicDoctor) throw new CustomError("Médico não encontrado", 404);

  return clinicDoctor;
};

export const postClinic = async (user: ClinicUser, data: NewClinic) => {
  const clinic = user.clinic || "";
  if (clinic) throw new CustomError("Você já está cadastrado em uma clínica", 409);

  const clinicByCNPJ = await getClinicByCNPJ(data.cnpj);
  if (clinicByCNPJ) throw new CustomError("CNPJ já cadastrado", 409);

  const clinicByEmail = await getClinicByEmail(data.email);
  if (clinicByEmail) throw new CustomError("E-mail já cadastrado", 409);

  const clinicByCode = await getClinicByCode(data.code);
  if (clinicByCode) throw new CustomError("Código já cadastrado", 409);

  data.cnpj = numClean(data.cnpj);
  const NewClinic = { ...data, users: [{ user: user.user, role: "admin" }] };

  await respository.postClinic(NewClinic, user.user);
};