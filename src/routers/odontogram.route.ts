import { Router } from "express";
import * as controller from "../controllers/odontogram.controller";
import { odontogramSchema, querySchema, idSchema } from "../schemas";
import { validBody, validParams, validQuery, validToken, clinicAssignmentCheck } from "../middlewares";

const odontogramRoute = Router();
odontogramRoute.use(validToken);
odontogramRoute.use(clinicAssignmentCheck);

odontogramRoute.get("/", validQuery(querySchema), controller.getOdontogram);
odontogramRoute.get("/partial", controller.getPartialOdontogramRegister);
odontogramRoute.post("/create", validBody(odontogramSchema), controller.postOdontogram);
odontogramRoute.put("/:id", validBody(odontogramSchema), validParams(idSchema), controller.putOdontogram);
odontogramRoute.put("/:id/status", validParams(idSchema), controller.patchOdontogram);
odontogramRoute.delete("/:id", validParams(idSchema), controller.deleteOdontogram);

export { odontogramRoute };
