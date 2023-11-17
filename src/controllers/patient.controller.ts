import { Request, Response } from "express";
import httpStatus from "http-status";
import * as service from "../services/patient.service";
import { CustomError } from "../models";

export const postPatientData = async (req: Request, res: Response) => {
  try {
    const response = await service.postPatientData(req.body);

    return res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.status).send({ message: err.message });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Erro desconhecido");
    }
  }
};
