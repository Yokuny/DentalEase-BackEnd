import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";

import { env } from "../config/env.config";
import { cookieOptions } from "../config/cookie.config";
import { CustomError } from "../models";
import { getUserById } from "../services/user.service";
import type { AuthReq, ClinicUser } from "../models";

export const validToken = async (req: AuthReq, res: Response, next: NextFunction) => {
  const authCookie = req.cookies.auth;
  const headerToken = req.header("Authorization");
  const authHeader = headerToken?.split(" ")[1];

  const token = authCookie || authHeader;

  try {
    if (!token) throw new CustomError("Token não encontrado", 401);

    const { user, clinic } = jwt.verify(token, env.JWT_SECRET) as ClinicUser;
    if (!user) throw new CustomError("Token inválido", 401);

    const userAndClinic = { user, clinic };

    if (!clinic) {
      const foundUser = await getUserById(user);
      userAndClinic.clinic = foundUser.clinic?.toString();
    }

    const newToken = jwt.sign(userAndClinic, env.JWT_SECRET, { expiresIn: "4d" });
    res.cookie("auth", newToken, cookieOptions);

    req.clinicUser = userAndClinic;

    return next();
  } catch (err) {
    next(err);
  }
};
