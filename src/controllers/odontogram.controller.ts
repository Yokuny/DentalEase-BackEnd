import { Response, NextFunction } from "express";
import * as service from "../services/odontogram.service";
import { respObj } from "../helpers/responsePattern.helper";
import type { AuthReq } from "../models/interfaces.type";

export const getOdontogram = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.getOdontogramRegister(req.clinicUser, req.query);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const getPartialOdontogramRegister = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.getPartialOdontogramRegister(req.clinicUser);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const postOdontogram = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.postOdontogram(req.clinicUser, req.body);

    return res.status(201).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const putOdontogram = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.updateOdontogram(req.clinicUser, req.params.id, req.body);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const patchOdontogram = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.patchOdontogram(req.clinicUser, req.params.id);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const deleteOdontogram = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.deleteOdontogram(req.clinicUser, req.params.id);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};
