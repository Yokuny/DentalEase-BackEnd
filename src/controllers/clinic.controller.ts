import { Response, NextFunction } from "express";
import * as service from "../services/clinic.service";
import { respObj } from "../helpers/responsePattern.helper";
import type { AuthReq } from "../models/interfaces.type";

export const postClinic = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.postClinic(req.clinicUser, req.body);

    return res.status(201).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const getClinic = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.getClinic(req.clinicUser);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const getDoctors = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.getDoctors(req.clinicUser);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};
