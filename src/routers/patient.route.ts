import { Router } from "express";
import * as controller from "../controllers/patient.controller";
import { querySchema, patientSchema, anamnesisSchema, intraoralSchema, idSchema } from "../schemas";
import { validBody, validQuery, validParams, validToken, clinicAssignmentCheck } from "../middlewares";

const patientRoute = Router();
patientRoute.use(validToken);
patientRoute.use(clinicAssignmentCheck);

patientRoute.get("/", validQuery(querySchema), controller.getPatient);
patientRoute.get("/partial", controller.getPartialPatientRegister);
patientRoute.post("/", validBody(patientSchema), controller.postPatient);
patientRoute.post("/anamnesis", validBody(anamnesisSchema), controller.postPatientAnamnesis);
patientRoute.post("/intra-oral", validBody(intraoralSchema), controller.potPatientIntraoral);
patientRoute.put("/:id", validBody(patientSchema), validParams(idSchema), controller.putPatient);
patientRoute.delete("/:id", validParams(idSchema), controller.deletePatient);

export { patientRoute };
