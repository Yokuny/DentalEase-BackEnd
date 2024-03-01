import { NextFunction, Request, Response } from "express";
import { Schema } from "zod";
import { CustomError } from "../models";

const extractErrorMessage = (err: any) => {
  const { path, received, message, expected } = err;

  return `O campo '${path}' recebeu '${received}'.
  Erro:'${message}'.${expected ? ` Esperado: '${expected}'` : ""}`;
};

const validate = (schema: Schema, type: "body" | "params" | "query") => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req[type]);

      next();
    } catch (error) {
      if (error.errors) {
        const errArray = error.errors;
        for (const err of errArray) {
          const errMessage = extractErrorMessage(err);

          next(new CustomError(errMessage, 400));
        }
      } else {
        next(new CustomError(error.message, 400));
      }
    }
  };
};

export const validBody = (schema: Schema) => {
  return validate(schema, "body");
};

export const validParams = (schema: Schema) => {
  return validate(schema, "params");
};

export const validQuery = (schema: Schema) => {
  return validate(schema, "query");
};
