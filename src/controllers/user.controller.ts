import { Request, Response, NextFunction } from "express";
import * as service from "../services/user.service";
import { cookieOptions } from "../config/cookie.config";
import { respObj } from "../helpers/responsePattern.helper";
import type { ServiceRes } from "../helpers/responsePattern.helper";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resp = (await service.signup(req.body)) as ServiceRes;

    return res.status(201).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resp = (await service.signin(req.body)) as ServiceRes;

    res.cookie("auth", (resp.data as { token: string }).token, cookieOptions);

    return res.status(200).json(respObj(resp));
  } catch (err) {
    next(err);
  }
};
