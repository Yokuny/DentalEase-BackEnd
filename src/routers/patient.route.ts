import { Router } from "express";
import * as controller from "../controllers/patient.controller";
import {
  requestRegisterSchema,
  patientSchema,
  anamnesisSchema,
  intraoralSchema,
  idSchemaOptional,
} from "../schemas";
import { validBody, validQuery, validToken } from "../middlewares";

const patientRoute = Router();

patientRoute.get("/", validToken, validQuery(requestRegisterSchema), controller.getPatient);
patientRoute.post(
  "/personaldata",
  validToken,
  validBody(patientSchema),
  validQuery(idSchemaOptional),
  controller.postPatient
);
patientRoute.post("/anamnesis", validToken, validBody(anamnesisSchema), controller.postPatientAnamnesis);
patientRoute.post("/intra-oral", validToken, validBody(intraoralSchema), controller.potPatientIntraoral);

export { patientRoute };
