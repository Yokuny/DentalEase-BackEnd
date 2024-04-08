import { Request, Response, NextFunction } from "express";
import { badRespObj } from "../helpers/responsePattern.helper";
import { CustomError } from "../models";

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.status).send(badRespObj({ message: err.message }));
  } else {
    const errMessage = err?.message || JSON.stringify(err, null, 2);
    return res.status(500).send(badRespObj({ message: errMessage }));
  }
};
