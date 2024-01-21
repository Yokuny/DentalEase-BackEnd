import { Response, NextFunction } from "express";
import * as service from "../services/service.service";
import { AuthReq } from "../models";

export const postService = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const response = await service.postService(req.clinicUser, req.body);

    return res.status(201).json({ message: response });
  } catch (err) {
    next(err);
  }
};

export const getService = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const response = await service.getServiceRegister(req.clinicUser, req.query);

    return res.status(200).json(response ? response : []);
  } catch (err) {
    next(err);
  }
};
