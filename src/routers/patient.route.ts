import { Router } from "express";
import * as controller from "../controllers/patient.controller";
import { querySchema, patientSchema, anamnesisSchema, intraoralSchema, idSchemaOptional } from "../schemas";
import { validBody, validQuery, validToken, clinicAssignmentCheck } from "../middlewares";

const patientRoute = Router();
patientRoute.use(validToken);
patientRoute.use(clinicAssignmentCheck);

patientRoute.get("/", validQuery(querySchema), controller.getPatient);
patientRoute.post(
  "/personaldata",
  validBody(patientSchema),
  validQuery(idSchemaOptional),
  controller.postPatient
);
patientRoute.post("/anamnesis", validBody(anamnesisSchema), controller.postPatientAnamnesis);
patientRoute.post("/intra-oral", validBody(intraoralSchema), controller.potPatientIntraoral);

export { patientRoute };
