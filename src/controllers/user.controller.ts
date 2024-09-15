import { Request, Response, NextFunction } from "express";
import * as service from "../services/user.service";
import { cookieOptions } from "../config/cookie.config";
import { respObj } from "../helpers/responsePattern.helper";
import type { AuthReq } from "../models/interfaces.type";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resp = await service.signup(req.body);

    return res.status(201).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resp = await service.signin(req.body);

    res.cookie("auth", (resp.data as { token: string }).token, cookieOptions);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const getPartialUserRegister = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.getPartialUserRegister(req.clinicUser);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.updateUser(req.clinicUser, req.body);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const resp = await service.changePassword(req.clinicUser, req.body);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};
