import { Router } from "express";
import * as controller from "../controllers/service.controller";
import { serviceSchema, queryByIdSchema, idSchema } from "../schemas";
import { validBody, validQuery, validToken, clinicAssignmentCheck, validParams } from "../middlewares";

const serviceRoute = Router();
serviceRoute.use(validToken);
serviceRoute.use(clinicAssignmentCheck);

serviceRoute.get("/", validQuery(queryByIdSchema), controller.getService);
serviceRoute.get("/partial", controller.getPartialServiceRegister);
serviceRoute.post("/create", validBody(serviceSchema), controller.postService);
serviceRoute.delete("/:id", validParams(idSchema), controller.deleteService);

export { serviceRoute };
