import { ObjectId } from "mongodb";
import { Clinic } from "../database";
import { updateUserWithClinic } from "./user.repository";
import type { ClinicWithUser, PartialClinic } from "../models";

const projection = { __v: 0 };

export const getClinicById = async (id: string) => {
  return await Clinic.findById(id, projection);
};

export const getClinicByCNPJ = async (cnpj: string) => {
  return await Clinic.findOne({ cnpj }, projection);
};

export const getClinicByCode = async (code: string) => {
  return await Clinic.findOne({ code }, projection);
};

export const getClinicByEmail = async (email: string) => {
  return await Clinic.findOne({ email }, projection);
};

export const getClinicDoctor = async (clinic: string, doctor: string) => {
  return await Clinic.findOne({ $and: [{ "users.user": doctor }, { _id: clinic }] }, projection);
};

export const getPartialClinic = async (id: string): Promise<PartialClinic | null> => {
  const result = await Clinic.aggregate([
    { $match: { _id: new ObjectId(id) } },
    { $lookup: { from: "users", localField: "users.user", foreignField: "_id", as: "users_details" } },
    {
      $project: {
        name: 1,
        email: 1,
        code: 1,
        cnpj: 1,
        users: {
          $map: {
            input: "$users_details",
            as: "users_details",
            in: {
              name: "$$users_details.name",
              email: "$$users_details.email",
              role: {
                $arrayElemAt: [
                  {
                    $map: {
                      input: {
                        $filter: { input: "$users", as: "user", cond: { $eq: ["$$user.user", "$$users_details._id"] } },
                      },
                      as: "user",
                      in: "$$user.role",
                    },
                  },
                  0,
                ],
              },
            },
          },
        },
      },
    },
  ]).exec();

  return result.length > 0 ? (result[0] as PartialClinic) : null;
};

export const postClinic = async (data: ClinicWithUser, user: string) => {
  const session = await Clinic.startSession();

  try {
    await session.withTransaction(
      async () => {
        const clinic = await Clinic.create([data], { session });
        await updateUserWithClinic(user, clinic[0].id, session);
      },
      { readPreference: "primary" }
    );
  } finally {
    await session.endSession();
  }
};
