import { Response, NextFunction } from "express";
import * as service from "../services/schedule.service";
import { AuthReq } from "../models";

export const getSchedule = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const response = await service.getSchedule(req.clinicUser, req.query);

    return res.status(200).json(response ? response : []);
  } catch (err) {
    next(err);
  }
};

export const postSchedule = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const response = await service.postSchedule(req.clinicUser, req.body);

    return res.status(201).json({ message: response });
  } catch (err) {
    next(err);
  }
};

export const putSchedule = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const response = await service.updateSchedule(req.params.id, req.body);

    return res.status(200).json({ message: response });
  } catch (err) {
    next(err);
  }
};

// export const patchSchedule = async (req: AuthReq, res: Response, next: NextFunction) => {
//   try {
//     const response = await service.patchSchedule(req.clinic, req.params.id);

//     return res.status(200).json({ message: response });
//   } catch (err) {
//     next(err);
//   }
// };

export const deleteSchedule = async (req: AuthReq, res: Response, next: NextFunction) => {
  try {
    const response = await service.deleteSchedule(req.params.id);

    return res.status(200).json({ message: response });
  } catch (err) {
    next(err);
  }
};
