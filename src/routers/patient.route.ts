import { Router } from "express";
import * as controller from "../controllers/patient.controller";
import { requestRegisterSchema, patientDataSchema, anamnesisSchema, intraoralSchema } from "../schemas";
import { validBody, validQuery, validToken } from "../middlewares";

const patientRoute = Router();

patientRoute.get("", validToken, validQuery(requestRegisterSchema), controller.getPatientRegister);
patientRoute.post("/personaldata", validToken, validBody(patientDataSchema), controller.postPatientData);
patientRoute.post("/anamnesis", validToken, validBody(anamnesisSchema), controller.postPatientAnamnesis);
patientRoute.post("/intra-oral", validToken, validBody(intraoralSchema), controller.potPatientIntraoral);

export { patientRoute };
