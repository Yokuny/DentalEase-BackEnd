import { Router } from "express";
import * as controller from "../controllers/patient.controller";
import {
  getPatientSchema,
  patientSchema,
  anamnesisSchema,
  intraoralSchema,
  idSchemaOptional,
} from "../schemas";
import { validBody, validQuery, validToken } from "../middlewares";

const patientRoute = Router();
patientRoute.use(validToken);

patientRoute.get("/", validQuery(getPatientSchema), controller.getPatient);
patientRoute.post(
  "/personaldata",
  validBody(patientSchema),
  validQuery(idSchemaOptional),
  controller.postPatient
);
patientRoute.post("/anamnesis", validBody(anamnesisSchema), controller.postPatientAnamnesis);
patientRoute.post("/intra-oral", validBody(intraoralSchema), controller.potPatientIntraoral);

export { patientRoute };
