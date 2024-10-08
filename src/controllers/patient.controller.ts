import { Response, NextFunction } from "express";
import * as service from "../services/patient.service";
import { respObj } from "../helpers/responsePattern.helper";
import type { AuthReq } from "../models/interfaces.type";

export const getPatient = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.getPatientRegister(req.clinicUser, req.query);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const getPartialPatientRegister = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.getPartialPatientRegister(req.clinicUser);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const postPatient = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.postPatientData(req.clinicUser, req.body);

    return res.status(201).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const putPatient = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.putPatientData(req.clinicUser, req.params.id, req.body);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const postPatientAnamnesis = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.postPatientAnamnesis(req.clinicUser, req.body);

    return res.status(201).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const potPatientIntraoral = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.postPatientIntraoral(req.clinicUser, req.body);

    return res.status(201).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const putPatientImage = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.putPatientImage(req.clinicUser, req.params.id, req.body.image);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const deletePatient = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.deletePatient(req.clinicUser, req.params.id);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};