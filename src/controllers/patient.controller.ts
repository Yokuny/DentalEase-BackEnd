import { Response, NextFunction } from "express";
import * as service from "../services/patient.service";
import { AuthReq } from "../models";

export const getPatient = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const response = await service.getPatientRegister(req.clinicUser, req.query);

    return res.status(200).json(response ? response : []);
  } catch (err) {
    next(err);
  }
};

export const postPatient = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    if (req.query.id) {
      const response = await service.putPatientData(req.clinicUser, String(req.query.id), req.body);
      return res.status(200).json({ message: response });
    }

    const response = await service.postPatientData(req.clinicUser, req.body);

    return res.status(201).json({ message: response });
  } catch (err) {
    next(err);
  }
};

export const postPatientAnamnesis = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const response = await service.postPatientAnamnesis(req.body);

    return res.status(201).json({ message: response });
  } catch (err) {
    next(err);
  }
};

export const potPatientIntraoral = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const response = await service.postPatientIntraoral(req.body);

    return res.status(201).json({ message: response });
  } catch (err) {
    next(err);
  }
};
