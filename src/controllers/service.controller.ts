import { Response, NextFunction } from "express";
import * as service from "../services/service.service";
import { respObj } from "../helpers/responsePattern.helper";
import type { AuthReq } from "../models/interfaces.type";

export const getService = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.getServiceRegister(req.clinicUser, req.query);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const getPartialServiceRegister = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.getPartialServiceRegister(req.clinicUser);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const postService = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.postService(req.clinicUser, req.body);

    return res.status(201).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const deleteService = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.deleteService(req.clinicUser, req.params.id);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};