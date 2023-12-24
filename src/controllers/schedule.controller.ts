import { Response } from "express";
import httpStatus from "http-status";
import * as service from "../services/schedule.service";
import { CustomError, AuthReq } from "../models";

const sendErrorResponse = (err: CustomError | Error, res: Response) => {
  if (err instanceof CustomError) {
    res.status(err.status).send({ message: err.message });
  } else {
    const errMessage = err?.message || JSON.stringify(err, null, 2);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: errMessage });
  }
};

export const getSchedule = async (req: AuthReq, res: Response) => {
  try {
    const response = await service.getSchedule(req.clinicUser, req.query);

    return res.status(httpStatus.OK).json(response);
  } catch (err) {
    sendErrorResponse(err, res);
  }
};

export const postSchedule = async (req: AuthReq, res: Response) => {
  try {
    const response = await service.postSchedule(req.clinicUser, req.body);

    return res.status(httpStatus.CREATED).json({ message: response });
  } catch (err) {
    sendErrorResponse(err, res);
  }
};

export const putSchedule = async (req: AuthReq, res: Response) => {
  try {
    const response = await service.updateSchedule(req.params.id, req.body);

    return res.status(httpStatus.OK).json({ message: response });
  } catch (err) {
    sendErrorResponse(err, res);
  }
};

// export const patchSchedule = async (req: AuthReq, res: Response) => {
//   try {
//     const response = await service.patchSchedule(req.clinic, req.params.id);

//     return res.status(httpStatus.OK).json({ message: response });
//   } catch (err) {
//     sendErrorResponse(err, res);
//   }
// };

export const deleteSchedule = async (req: AuthReq, res: Response) => {
  try {
    const response = await service.deleteSchedule(req.params.id);

    return res.status(httpStatus.OK).json({ message: response });
  } catch (err) {
    sendErrorResponse(err, res);
  }
};
