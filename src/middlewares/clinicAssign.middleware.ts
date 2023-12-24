import { NextFunction, Response } from "express";
import { AuthReq } from "../models";

export const clinicAssignmentCheck = async (req: AuthReq, res: Response, next: NextFunction) => {
  if (!req.clinicUser.clinic) {
    return res.status(424).send({ message: "Usuário precisa estar vinculado a uma clínica" });
  }

  return next();
};
