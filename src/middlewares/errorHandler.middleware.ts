import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models";

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.status).send({ message: err.message });
  } else {
    const errMessage = err?.message || JSON.stringify(err, null, 2);
    return res.status(500).send({ message: errMessage });
  }
};
