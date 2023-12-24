import { Router } from "express";
import * as controller from "../controllers/schedule.controller";
import { scheduleSchema, idSchema, idSchemaOptional } from "../schemas";
import { validBody, validParams, validQuery, validToken, clinicAssignmentCheck } from "../middlewares";

const scheduleRoute = Router();
scheduleRoute.use(validToken);
scheduleRoute.use(clinicAssignmentCheck);

scheduleRoute.post("/create", validBody(scheduleSchema), controller.postSchedule);
scheduleRoute.get("/", validQuery(idSchemaOptional), controller.getSchedule);
scheduleRoute.put("/:id", validBody(scheduleSchema), validParams(idSchema), controller.putSchedule);
// scheduleRoute.patch("/:id/status",  validParams(idSchema), controller.patchSchedule);
scheduleRoute.delete("/:id", validParams(idSchema), controller.deleteSchedule);

export { scheduleRoute };
