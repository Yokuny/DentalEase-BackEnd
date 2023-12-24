import { Router } from "express";
import * as controller from "../controllers/odontogram.controller";
import { odontogramSchema, getOdontogramSchema, idSchema } from "../schemas";
import { validBody, validParams, validQuery, validToken, clinicAssignmentCheck } from "../middlewares";

const odontogramRoute = Router();
odontogramRoute.use(validToken);
odontogramRoute.use(clinicAssignmentCheck);

odontogramRoute.post("/create", validBody(odontogramSchema), controller.postOdontogram);
odontogramRoute.get("/", validQuery(getOdontogramSchema), controller.getOdontogram);
odontogramRoute.put("/:id", validBody(odontogramSchema), validParams(idSchema), controller.putOdontogram);
odontogramRoute.put("/:id/status", validParams(idSchema), controller.patchOdontogram);
odontogramRoute.delete("/:id", validParams(idSchema), controller.deleteOdontogram);

export { odontogramRoute };
