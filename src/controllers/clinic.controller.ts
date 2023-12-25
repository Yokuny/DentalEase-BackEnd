import { Response } from "express";
import httpStatus from "http-status";
import * as service from "../services/clinic.service";
import { CustomError, AuthReq } from "../models";

const sendErrorResponse = (err: CustomError | Error, res: Response) => {
  if (err instanceof CustomError) {
    res.status(err.status).send({ message: err.message });
  } else {
    const errMessage = err?.message || JSON.stringify(err, null, 2);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: errMessage });
  }
};

export const postClinic = async (req: AuthReq, res: Response) => {
  try {
    await service.postClinic(req.clinicUser, req.body);

    return res.status(httpStatus.CREATED).json({ message: "Clínica cadastrda com sucesso" });
  } catch (err) {
    sendErrorResponse(err, res);
  }
};

export const getClinic = async (req: AuthReq, res: Response) => {
  try {
    const response = await service.getClinic(req.clinicUser);

    return res.status(httpStatus.OK).json(response);
  } catch (err) {
    sendErrorResponse(err, res);
  }
};

export const getDoctors = async (req: AuthReq, res: Response) => {
  try {
    const response = await service.getDoctors(req.clinicUser);

    return res.status(httpStatus.OK).json(response);
  } catch (err) {
    sendErrorResponse(err, res);
  }
};