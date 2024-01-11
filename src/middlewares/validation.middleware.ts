import { NextFunction, Request, Response } from "express";
import { Schema } from "zod";

const validate = (schema: Schema, type: "body" | "params" | "query") => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[type]);
      next();
    } catch (error) {
      if (error.errors) {
        const errArray = error.errors;
        for (const err of errArray) {
          const { path, received, message, expected } = err;

          const paramMessage = type === "query" ? "Na query" : type === "params" ? "Nos params" : "No body";
          const errMessage = `${paramMessage}: '${path}' recebeu '${received}'. Erro:'${message}'.${
            expected ? ` Esperado: '${expected}'` : ""
          }`;

          return res.status(400).send({ message: errMessage });
        }
      } else {
        return res.status(400).send({ message: error.message });
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
