export * from "./error.type";
import { Request } from "express";

export type UserAcess = { email: string; password: string };
export type NewUser = UserAcess & { username: string };

export type JWTPayload = { userId: number };
export type AuthenticatedRequest = Request & JWTPayload;

export type UserWithoutPassword = {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
export type User = UserWithoutPassword & { password: string };

export type Patient = {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  rg: string;
  dataNascimento: Date;
  sexo: string;
  telefone: string;
  cep: string;
  logradouro: string;
  createdAt: Date;
  updatedAt: Date;
};
