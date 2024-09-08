import { Response, NextFunction } from "express";
import * as service from "../services/financial.service";
import { respObj } from "../helpers/responsePattern.helper";
import type { AuthReq } from "../models/interfaces.type";

export const getFinancial = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.getFinancialRegister(req.clinicUser, req.query);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const getPartialFinancialRegister = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.getPartialFinancialRegister(req.clinicUser);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const postFinancial = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.postFinancial(req.clinicUser, req.body);

    return res.status(201).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const deleteFinancial = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.deleteFinancial(req.clinicUser, req.params.id);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};
