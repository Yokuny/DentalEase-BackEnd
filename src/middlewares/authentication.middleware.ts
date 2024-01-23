import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";

import { Session } from "../database";
import { CustomError } from "../models";
import type { AuthReq, ClinicUser } from "../models";

export const validToken = async (req: AuthReq, _res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) throw new CustomError("Token não encontrado", 401);

  const token = authHeader.split(" ")[1];
  if (!token) throw new CustomError("Token não encontrado", 401);

  try {
    const { user, clinic } = jwt.verify(token, process.env.JWT_SECRET) as ClinicUser;
    if (!user) throw new CustomError("Token inválido", 401);

    const session = await Session.findOne({ user, token });
    if (!session) throw new CustomError("Token inválido", 401);

    req.clinicUser = { user, clinic: clinic || session?.clinic?.toString() };

    return next();
  } catch (err) {
    next(err);
  }
};
