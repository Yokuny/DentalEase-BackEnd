import { User } from "../database";
import type { SignUp, DbUser, UserUpdate } from "../models";

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

export const updateUserWithClinic = (userID: string, clinic: string, session: any) => {
  return User.updateOne({ _id: userID }, { clinic }, { session });
};

export const updateUser = (userID: string, data: UserUpdate) => {
  return User.updateOne({ _id: userID }, { $set: data });
};

export const changePassword = (userID: string, password: string) => {
  return User.updateOne({ _id: userID }, { password });
};