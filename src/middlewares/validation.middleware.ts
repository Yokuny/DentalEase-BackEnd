import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import httpStatus from "http-status";

const validate = (schema: ObjectSchema, type: "body" | "params") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[type], {
      abortEarly: false,
    });

    if (!error) {
      next();
    } else {
      res.status(httpStatus.BAD_REQUEST).send(error.details.map((d) => d.message));
    }
  };
};

export const validateBody = (schema: ObjectSchema) => {
  return validate(schema, "body");
};

export const validateParams = (schema: ObjectSchema) => {
  return validate(schema, "params");
};
