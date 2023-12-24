import { Router } from "express";
import * as controller from "../controllers/clinic.controller";
import { clinicSchema, idSchema } from "../schemas";
import { validBody, validParams, validQuery, validToken } from "../middlewares";

const clinicRoute = Router();
clinicRoute.use(validToken);

clinicRoute.post("/create", validBody(clinicSchema), controller.postClinic);

export { clinicRoute };
