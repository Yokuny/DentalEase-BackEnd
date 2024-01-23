import { NextFunction, Response } from "express";
import { CustomError } from "../models";
import type { AuthReq } from "../models";

export const clinicAssignmentCheck = async (req: AuthReq, _res: Response, next: NextFunction) => {
  try {
    if (!req.clinicUser.clinic) throw new CustomError("Usuário não está associado a uma clínica", 424);

    return next();
  } catch (err) {
    next(err);
  }
};
