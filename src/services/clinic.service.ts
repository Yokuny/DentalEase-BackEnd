import * as respository from "../repositories/clinic.repository";
import { CustomError } from "../models";
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

export const postClinic = async (user: ClinicUser, data: NewClinic) => {
  const clinic = user.clinic || "";
  if (clinic) throw new CustomError("Você já está cadastrado em uma clínica", 409);

  const clinicByCNPJ = await getClinicByCNPJ(data.cnpj);
  if (clinicByCNPJ) throw new CustomError("CNPJ já cadastrado", 409);

  const clinicByEmail = await getClinicByEmail(data.email);
  if (clinicByEmail) throw new CustomError("E-mail já cadastrado", 409);

  const clinicByCode = await getClinicByCode(data.code);
  if (clinicByCode) throw new CustomError("Código já cadastrado", 409);

  const NewClinic = { ...data, users: [{ user: user.user, role: "admin" }] };

  await respository.postClinic(NewClinic, user.user);
};
