import { Response } from "express";
import * as service from "../services/patient.service";
import { CustomError, AuthReq } from "../models";

const sendErrorResponse = (err: CustomError | Error, res: Response) => {
  if (err instanceof CustomError) {
    res.status(err.status).send({ message: err.message });
  } else {
    const errMessage = err?.message || JSON.stringify(err, null, 2);
    res.status(500).send({ message: errMessage });
  }
};

export const getPatient = async (req: AuthReq, res: Response) => {
  try {
    const response = await service.getPatientRegister(req.clinicUser, req.query);

    return res.status(200).json(response ? response : []);
  } catch (err) {
    sendErrorResponse(err, res);
  }
};

export const postPatient = async (req: AuthReq, res: Response) => {
  try {
    if (req.query.id) {
      const response = await service.putPatientData(req.clinicUser, String(req.query.id), req.body);
      return res.status(200).json({ message: response });
    }

    const response = await service.postPatientData(req.clinicUser, req.body);

    return res.status(201).json({ message: response });
  } catch (err) {
    sendErrorResponse(err, res);
  }
};

export const postPatientAnamnesis = async (req: AuthReq, res: Response) => {
  try {
    const response = await service.postPatientAnamnesis(req.body);

    return res.status(201).json({ message: response });
  } catch (err) {
    sendErrorResponse(err, res);
  }
};

export const potPatientIntraoral = async (req: AuthReq, res: Response) => {
  try {
    const response = await service.postPatientIntraoral(req.body);

    return res.status(201).json({ message: response });
  } catch (err) {
    sendErrorResponse(err, res);
  }
};
