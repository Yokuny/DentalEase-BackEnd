import { Router } from "express";
import * as controller from "../controllers/patient.controller";
import { patientDataSchema } from "../schemas";
import { validateBody, validToken } from "../middlewares";

const patientRoute = Router();

patientRoute.post("/personaldata", validToken, validateBody(patientDataSchema), controller.postPatientData);

export { patientRoute };
