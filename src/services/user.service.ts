import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as respository from "../repositories/user.repository";
import { CustomError, NewUser, UserAcess } from "../models";

const getUserByEmail = async (email: string) => {
  return await respository.getUserByEmail(email);
};

export const getUserById = async (id: string) => {
  const user = await respository.getUserById(id);
  if (!user) throw new CustomError("Usuário não encontrado", 404);

  return user;
};

export const signup = async (data: NewUser) => {
  const user = await getUserByEmail(data.email);
  if (user) throw new CustomError("Usuário já existe", 409);

  const cryptPassword = await bcrypt.hash(data.password, 10);
  const newUser = {
    ...data,
    password: cryptPassword,
  };

  return await respository.signup(newUser);
};

export const signin = async (data: UserAcess) => {
  const user = await getUserByEmail(data.email);
  if (!user) throw new CustomError("Usuário ou senha incorretos", 409);

  const isValidPassword = await bcrypt.compare(data.password, user.password);
  if (!isValidPassword) throw new CustomError("Usuário ou senha incorretos", 403);

  const token = jwt.sign({ user: user.id, clinic: user.clinic }, process.env.JWT_SECRET as string, {
    expiresIn: "5d",
  });

  await respository.sessionToken(user.id, user.clinic, token);

  const secureUser = {
    username: user.username,
    email: user.email,
    clinic: user.clinic?.toString(),
    avatar: user.avatar,
  };

  return { user: secureUser, token };
};
