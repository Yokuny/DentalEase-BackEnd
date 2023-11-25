import { Router } from "express";
import * as controller from "../controllers/patient.controller";
import { patientDataSchema, requestRegisterSchema } from "../schemas";
import { validBody, validQuery, validToken } from "../middlewares";

const patientRoute = Router();

patientRoute.get("", validToken, validQuery(requestRegisterSchema), controller.getPatientRegister);
patientRoute.post("/personaldata", validToken, validBody(patientDataSchema), controller.postPatientData);

export { patientRoute };
