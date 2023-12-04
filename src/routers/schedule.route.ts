import { Router } from "express";
import * as controller from "../controllers/schedule.controller";
import { scheduleSchema, idSchema, idSchemaOptional } from "../schemas";
import { validBody, validParams, validQuery, validToken } from "../middlewares";

const scheduleRoute = Router();

scheduleRoute.post("/create", validToken, validBody(scheduleSchema), controller.postSchedule);
scheduleRoute.get("/", validToken, validQuery(idSchemaOptional), controller.getSchedule);
scheduleRoute.put(
  "/:id",
  validToken,
  validBody(scheduleSchema),
  validParams(idSchema),
  controller.putSchedule
);
// scheduleRoute.put("/:id/status", validToken, validParams(idSchema), controller.patchSchedule);
scheduleRoute.delete("/:id", validToken, validParams(idSchema), controller.deleteSchedule);

export { scheduleRoute };
