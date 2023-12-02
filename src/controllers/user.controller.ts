import { Request, Response } from "express";
import httpStatus from "http-status";
import * as service from "../services/user.service";
import { CustomError } from "../models";

const sendErrorResponse = (err: CustomError | Error, res: Response) => {
  if (err instanceof CustomError) {
    res.status(err.status).send({ message: err.message });
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Erro desconhecido");
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    await service.signup(req.body);

    return res.status(httpStatus.CREATED).json({ message: "Usuário criado com sucesso" });
  } catch (err) {
    sendErrorResponse(err, res);
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const token = await service.signin(req.body);

    return res.status(httpStatus.OK).json(token);
  } catch (err) {
    sendErrorResponse(err, res);
  }
};
