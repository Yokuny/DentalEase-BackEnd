import { Router } from "express";
import * as controller from "../controllers/service.controller";
import { serviceSchema } from "../schemas";
import { validBody, validToken, clinicAssignmentCheck } from "../middlewares";

const serviceRoute = Router();
serviceRoute.use(validToken);
serviceRoute.use(clinicAssignmentCheck);

serviceRoute.post("/create", validBody(serviceSchema), controller.postService);

export { serviceRoute };
