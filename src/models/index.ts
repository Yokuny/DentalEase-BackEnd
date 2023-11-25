export * from "./error.type";
import { Request } from "express";
import { ObjectId } from "mongoose";

export type JWTPayload = { userId: number };
export type AuthReq = Request & JWTPayload;

export type UserAcess = { email: string; password: string };
export type NewUser = UserAcess & { username: string };
export type UserWithoutPassword = {
  id: ObjectId;
  username: string;
  email: string;
  createdAt: Date;
};
export type DbUser = UserWithoutPassword & { password: string };

export type NewPatient = {
  nome: string;
  email: string;
  cpf: string;
  rg: string;
  birthdate: Date;
  sex: string;
  phone: string;
  cep: string;
  address: string;
};

export type DbPatient = NewPatient & { id: ObjectId; createdAt: Date };

export type RequestRegister = {
  email?: string;
  cpf?: string;
  rg?: string;
  phone?: string;
};
