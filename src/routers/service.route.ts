import { Router } from "express";
import * as controller from "../controllers/service.controller";
import { serviceSchema, queryByIdSchema } from "../schemas";
import { validBody, validQuery, validToken, clinicAssignmentCheck } from "../middlewares";

const serviceRoute = Router();
serviceRoute.use(validToken);
serviceRoute.use(clinicAssignmentCheck);

serviceRoute.get("/", validQuery(queryByIdSchema), controller.getService);
serviceRoute.post("/create", validBody(serviceSchema), controller.postService);

export { serviceRoute };
