import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";

import { Session } from "../database";
import { AuthReq, JWTPayload } from "../models";

function unauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send("Não autorizado");
}

export const validToken = async (req: AuthReq, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return unauthorizedResponse(res);

  const token = authHeader.split(" ")[1];
  if (!token) return unauthorizedResponse(res);

  try {
    const { clinic } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    const session = await Session.findOne({ clinic, token });
    if (!session) return unauthorizedResponse(res);

    req.clinic = clinic;

    return next();
  } catch (err) {
    return unauthorizedResponse(res);
  }
};
