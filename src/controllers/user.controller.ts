import { Request, Response } from "express";
import * as service from "../services/user.service";
import { CustomError } from "../models";

const sendErrorResponse = (err: CustomError | Error, res: Response) => {
  if (err instanceof CustomError) {
    res.status(err.status).send({ message: err.message });
  } else {
    const errMessage = err?.message || JSON.stringify(err, null, 2);
    res.status(500).send({ message: errMessage });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    await service.signup(req.body);

    return res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (err) {
    sendErrorResponse(err, res);
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const token = await service.signin(req.body);

    return res.status(200).json(token);
  } catch (err) {
    sendErrorResponse(err, res);
  }
};
