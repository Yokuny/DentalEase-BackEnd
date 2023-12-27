import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";

import { Session } from "../database";
import { AuthReq, JWTPayload } from "../models";

const unauthorizedResponse = (res: Response) => res.status(401).send({ message: "Não autorizado" });

export const validToken = async (req: AuthReq, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return unauthorizedResponse(res);

  const token = authHeader.split(" ")[1];
  if (!token) return unauthorizedResponse(res);

  try {
    const { user, clinic } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    const session = await Session.findOne({ user, token });
    if (!session) return unauthorizedResponse(res);

    req.clinicUser = { user, clinic: clinic || session?.clinic?.toString() };

    return next();
  } catch (err) {
    return unauthorizedResponse(res);
  }
};
