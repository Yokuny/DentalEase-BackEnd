import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";

import { CustomError } from "../models";
import { getUserById } from "../services/user.service";
import type { AuthReq, ClinicUser } from "../models";

export const validToken = async (req: AuthReq, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) throw new CustomError("Token não encontrado", 401);

  try {
    const { user, clinic } = jwt.verify(token, process.env.JWT_SECRET) as ClinicUser;
    if (!user) throw new CustomError("Token inválido", 401);

    const userAndClinic = { user, clinic };

    if (!clinic) {
      const foundUser = await getUserById(user);
      userAndClinic.clinic = foundUser.clinic?.toString();
    }

    const newToken = jwt.sign(userAndClinic, process.env.JWT_SECRET, { expiresIn: "4d" });
    res.cookie("token", newToken, { httpOnly: true, maxAge: 4 * 86400 });

    req.clinicUser = userAndClinic;

    return next();
  } catch (err) {
    next(err);
  }
};
