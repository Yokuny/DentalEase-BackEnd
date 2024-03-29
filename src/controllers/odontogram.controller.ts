import { Response, NextFunction } from "express";
import * as service from "../services/odontogram.service";
import { AuthReq } from "../models";

export const getOdontogram = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const response = await service.getOdontogramRegister(req.clinicUser, req.query);

    return res.status(200).json(response ? response : []);
  } catch (err) {
    next(err);
  }
};

export const postOdontogram = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const response = await service.postOdontogram(req.clinicUser, req.body);

    return res.status(201).json({ message: response });
  } catch (err) {
    next(err);
  }
};

export const putOdontogram = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const response = await service.updateOdontogram(req.clinicUser, req.params.id, req.body);

    return res.status(200).json({ message: response });
  } catch (err) {
    next(err);
  }
};

export const patchOdontogram = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const response = await service.patchOdontogram(req.clinicUser, req.params.id);

    return res.status(200).json({ message: response });
  } catch (err) {
    next(err);
  }
};

export const deleteOdontogram = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const response = await service.deleteOdontogram(req.clinicUser, req.params.id);

    return res.status(200).json({ message: response });
  } catch (err) {
    next(err);
  }
};
