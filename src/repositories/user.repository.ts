import { User } from "../database";
import type { SignUp, DbUser } from "../models";

const projection = { __v: 0 };

export const signup = (data: SignUp) => {
  return User.create(data);
};

export const getUserById = (id: string): Promise<DbUser> => {
  return User.findById(id, projection);
};

export const getUserByEmail = (email: string): Promise<DbUser> => {
  return User.findOne({ email }, projection);
};

export const updateUserWithClinic = (user: string, clinic: string, session: any) => {
  return User.updateOne({ _id: user }, { clinic }, { session });
};
