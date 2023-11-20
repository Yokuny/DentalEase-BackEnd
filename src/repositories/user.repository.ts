import { User } from "../database";
import { Session } from "../database";
import type { NewUser } from "../models";

export const signup = (data: NewUser) => {
  return User.create(data);
};

export const getUserByEmail = (email: string) => {
  return User.findOne({ email });
};

export const sessionToken = (userId: number, token: string) => {
  return Session.updateOne({ userId }, { token }, { upsert: true });
};
