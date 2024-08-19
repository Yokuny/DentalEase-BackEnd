import { Router } from "express";
import * as controller from "../controllers/schedule.controller";
import { scheduleSchema, idSchema, queryByIdSchema } from "../schemas";
import { validBody, validParams, validQuery, validToken, clinicAssignmentCheck } from "../middlewares";

const scheduleRoute = Router();
scheduleRoute.use(validToken);
scheduleRoute.use(clinicAssignmentCheck);

scheduleRoute.get("/", validQuery(queryByIdSchema), controller.getSchedule);
scheduleRoute.get("/partial", controller.getPartialScheduleRegister);
scheduleRoute.post("/create", validBody(scheduleSchema), controller.postSchedule);
scheduleRoute.put("/:id", validBody(scheduleSchema), validParams(idSchema), controller.putSchedule);
scheduleRoute.delete("/:id", validParams(idSchema), controller.deleteSchedule);

export { scheduleRoute };
