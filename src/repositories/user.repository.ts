import { User } from "../database";
import { Session } from "../database";
import type { NewUser, DbUser } from "../models";

export const signup = (data: NewUser) => {
  return User.create(data);
};

export const getUserByEmail = (email: string): Promise<DbUser> => {
  return User.findOne({ email }, { __v: 0 });
};

export const updateUserWithClinic = (user: string, clinic: string, session: any) => {
  return User.updateOne({ _id: user }, { clinic }, { session });
};

export const updateSession = (user: string, clinic: string, session: any) => {
  return Session.updateOne({ user }, { clinic }, { session });
};

export const sessionToken = (user: string, clinic: string, token: string) => {
  return Session.updateOne({ user, clinic }, { token }, { upsert: true });
};
