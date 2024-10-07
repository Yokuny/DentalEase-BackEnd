import { Response, NextFunction } from "express";
import * as service from "../services/procedure.service";
import { respObj } from "../helpers/responsePattern.helper";
import type { AuthReq } from "../models/interfaces.type";

export const getProcedure = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.getProcedure(req.clinicUser);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const updateProcedure = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.updateProcedure(req.clinicUser, req.body);

    return res.status(201).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};
