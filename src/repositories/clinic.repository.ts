import { Clinic } from "../database";
import { updateUserWithClinic, updateSession } from "./user.repository";
import type { ClinicWithUser } from "../models";

export const getClinicById = async (id: string) => {
  return await Clinic.findById(id, { __v: 0 });
};

export const getClinicByCNPJ = async (cnpj: string) => {
  return await Clinic.findOne({ cnpj });
};

export const getClinicByCode = async (code: string) => {
  return await Clinic.findOne({ code });
};

export const getClinicByEmail = async (email: string) => {
  return await Clinic.findOne({ email });
};

export const getClinicDoctor = async (clinic: string, doctor: string) => {
  return await Clinic.findOne({
    $and: [{ "users.user": doctor }, { _id: clinic }],
  });
};

export const postClinic = async (data: ClinicWithUser, user: string) => {
  const session = await Clinic.startSession();

  try {
    await session.withTransaction(
      async () => {
        const clinic = await Clinic.create([data], { session });
        await updateUserWithClinic(user, clinic[0].id, session);
        await updateSession(user, clinic[0].id, session);
      },
      { readPreference: "primary" }
    );
  } finally {
    await session.endSession();
  }
};
