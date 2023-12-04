import { Response } from "express";
import httpStatus from "http-status";
import * as service from "../services/odontogram.service";
import { CustomError, AuthReq } from "../models";

const sendErrorResponse = (err: CustomError | Error, res: Response) => {
  if (err instanceof CustomError) {
    res.status(err.status).send({ message: err.message });
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Erro desconhecido");
  }
};

export const getOdontogram = async (req: AuthReq, res: Response) => {
  try {
    const response = await service.getOdontogram(req.params.id);

    return res.status(httpStatus.OK).json(response);
  } catch (err) {
    sendErrorResponse(err, res);
  }
};

export const postOdontogram = async (req: AuthReq, res: Response) => {
  try {
    const response = await service.postOdontogram(req.clinic, req.body);

    return res.status(httpStatus.CREATED).json({ message: response });
  } catch (err) {
    sendErrorResponse(err, res);
  }
};

export const putOdontogram = async (req: AuthReq, res: Response) => {
  try {
    const response = await service.updateOdontogram(req.params.id, req.body);

    return res.status(httpStatus.OK).json({ message: response });
  } catch (err) {
    sendErrorResponse(err, res);
  }
};

export const patchOdontogram = async (req: AuthReq, res: Response) => {
  try {
    const response = await service.patchOdontogram(req.params.id);

    return res.status(httpStatus.OK).json({ message: response });
  } catch (err) {
    sendErrorResponse(err, res);
  }
};

export const deleteOdontogram = async (req: AuthReq, res: Response) => {
  try {
    const response = await service.deleteOdontogram(req.params.id);

    return res.status(httpStatus.OK).json({ message: response });
  } catch (err) {
    sendErrorResponse(err, res);
  }
};
