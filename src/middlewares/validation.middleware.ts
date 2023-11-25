import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import httpStatus from "http-status";

const validate = (schema: ObjectSchema, type: "body" | "params" | "query") => {
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

export const validBody = (schema: ObjectSchema) => {
  return validate(schema, "body");
};

export const validParams = (schema: ObjectSchema) => {
  return validate(schema, "params");
};

export const validQuery = (schema: ObjectSchema) => {
  return validate(schema, "query");
};
