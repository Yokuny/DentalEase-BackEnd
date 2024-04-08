import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as respository from "../repositories/user.repository";
import { env } from "../config/env.config";
import { returnMessage, returnData } from "../helpers/responsePattern.helper";
import type { ServiceRes } from "../helpers/responsePattern.helper";
import { CustomError, SignUp, SignIn } from "../models";

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
    avatar: user.avatar,
  };

  return returnData({ user: secureUser, token });
};
