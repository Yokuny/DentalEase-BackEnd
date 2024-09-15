import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as respository from "../repositories/user.repository";
import { env } from "../config/env.config";
import { returnMessage, returnData } from "../helpers/responsePattern.helper";
import type { ServiceRes } from "../helpers/responsePattern.helper";
import type { SignUp, SignIn, ClinicUser, PartialUser, UserUpdate, PasswordUpdate } from "../models";
import { CustomError } from "../models/error.type";

const getUserByEmail = async (email: string) => {
  return await respository.getUserByEmail(email);
};

export const getUserById = async (id: string) => {
  const user = await respository.getUserById(id);
  if (!user) throw new CustomError("Usuário não encontrado", 404);

  return user;
};

export const signup = async (data: SignUp): Promise<ServiceRes> => {
  const user = await getUserByEmail(data.email);
  if (user) throw new CustomError("Usuário já existe", 409);

  const cryptPassword = await bcrypt.hash(data.password, 10);
  const newUser = {
    ...data,
    password: cryptPassword,
  };

  await respository.signup(newUser);

  return returnMessage("Usuário criado com sucesso");
};

export const signin = async (data: SignIn): Promise<ServiceRes> => {
  const user = await getUserByEmail(data.email);
  if (!user) throw new CustomError("Usuário ou senha incorretos", 409);

  const isValidPassword = await bcrypt.compare(data.password, user.password);
  if (!isValidPassword) throw new CustomError("Usuário ou senha incorretos", 403);

  const token = jwt.sign({ user: user._id, clinic: user.clinic || "" }, env.JWT_SECRET, {
    expiresIn: "4d",
  });

  const secureUser = {
    name: user.name,
    email: user.email,
    clinic: user.clinic?.toString(),
    image: user.image,
  } as PartialUser;

  return returnData({ user: secureUser, token });
};

export const getPartialUserRegister = async (clinicUser: ClinicUser): Promise<ServiceRes> => {
  const user = await getUserById(clinicUser.user);

  return returnData({
    name: user.name,
    email: user.email,
    clinic: user.clinic?.toString(),
    image: user.image,
  } as PartialUser);
};

export const updateUser = async (clinicUser: ClinicUser, data: UserUpdate): Promise<ServiceRes> => {
  const user = await getUserById(clinicUser.user);

  const register = await respository.updateUser(user._id.toString(), data);

  if (register.modifiedCount === 1) return returnMessage("Usuário atualizado com sucesso");
  return returnMessage("Usuário não atualizado");
};

export const changePassword = async (clinicUser: ClinicUser, data: PasswordUpdate): Promise<ServiceRes> => {
  const user = await getUserById(clinicUser.user);

  const matchOldPassword = await bcrypt.compare(data.oldPassword, user.password);
  if (!matchOldPassword) throw new CustomError("Senha incorreta", 403);

  const isValidPassword = await bcrypt.compare(data.newPassword, user.password);
  if (isValidPassword) throw new CustomError("Nova senha não pode ser igual a anterior", 409);

  const cryptPassword = await bcrypt.hash(data.newPassword, 10);
  const register = await respository.changePassword(user._id.toString(), cryptPassword);

  if (register.modifiedCount === 1) return returnMessage("Senha alterada com sucesso");
  return returnMessage("Senha não alterada");
};
