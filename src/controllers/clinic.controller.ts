import { Response, NextFunction } from "express";
import * as service from "../services/clinic.service";
import { AuthReq } from "../models";

export const postClinic = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    await service.postClinic(req.clinicUser, req.body);

    return res.status(201).json({ message: "Clínica cadastrda com sucesso" });
  } catch (err) {
    next(err);
  }
};

export const getClinic = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const response = await service.getClinic(req.clinicUser);

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getDoctors = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const response = await service.getDoctors(req.clinicUser);

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
