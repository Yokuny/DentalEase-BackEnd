import { Response } from "express";
import httpStatus from "http-status";
import * as service from "../services/patient.service";
import { CustomError, AuthReq } from "../models";

export const getPatientRegister = async (req: AuthReq, res: Response) => {
  try {
    const response = await service.getPatientRegister(req.clinic, req.query);

    return res.status(httpStatus.OK).json(response ? response : []);
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.status).send({ message: err.message });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Erro desconhecido");
    }
  }
};

export const postPatientData = async (req: AuthReq, res: Response) => {
  try {
    const response = await service.postPatientData(req.clinic, req.body);

    return res.status(httpStatus.CREATED).json({ message: response });
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.status).send({ message: err.message });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Erro desconhecido");
    }
  }
};
