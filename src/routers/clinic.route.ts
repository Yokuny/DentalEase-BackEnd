import { Router } from "express";
import * as controller from "../controllers/clinic.controller";
import { clinicSchema, idSchema } from "../schemas";
import { validBody, validParams, validQuery, validToken, clinicAssignmentCheck } from "../middlewares";

const clinicRoute = Router();
clinicRoute.use(validToken);
clinicRoute.post("/create", validBody(clinicSchema), controller.postClinic);

clinicRoute.use(clinicAssignmentCheck);
clinicRoute.get("/", controller.getClinic);
clinicRoute.get("/doctors", controller.getDoctors);



export { clinicRoute };
