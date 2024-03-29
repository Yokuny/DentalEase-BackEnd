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

export const getPartialPatientRegister = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const response = await service.getPartialPatientRegister(req.clinicUser);

    return res.status(200).json(response ? response : []);
  } catch (err) {
    next(err);
  }
};

export const postPatient = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const response = await service.postPatientData(req.clinicUser, req.body);

    if (typeof response === "string") return res.status(201).json({ message: response });
    if (response.id) return res.status(201).json({ id: response.id, message: response.message });
  } catch (err) {
    next(err);
  }
};

export const putPatient = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const response = await service.putPatientData(req.clinicUser, req.params.id, req.body);

    return res.status(200).json({ message: response });
  } catch (err) {
    next(err);
  }
};

export const postPatientAnamnesis = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const response = await service.postPatientAnamnesis(req.clinicUser, req.body);

    return res.status(201).json({ message: response });
  } catch (err) {
    next(err);
  }
};

export const potPatientIntraoral = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const response = await service.postPatientIntraoral(req.clinicUser, req.body);

    return res.status(201).json({ message: response });
  } catch (err) {
    next(err);
  }
};
