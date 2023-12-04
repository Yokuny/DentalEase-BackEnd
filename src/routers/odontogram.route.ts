import { Router } from "express";
import * as controller from "../controllers/odontogram.controller";
import { odontogramSchema, requestOdontogramSchema, idSchema, idSchemaOptional } from "../schemas";
import { validBody, validParams, validQuery, validToken } from "../middlewares";

const odontogramRoute = Router();

odontogramRoute.post("/create", validToken, validBody(odontogramSchema), controller.postOdontogram);
odontogramRoute.get("/", validToken, validQuery(requestOdontogramSchema), controller.getOdontogram);
odontogramRoute.put(
  "/:id",
  validToken,
  validBody(odontogramSchema),
  validParams(idSchema),
  controller.putOdontogram
);
odontogramRoute.put("/:id/status", validToken, validParams(idSchema), controller.patchOdontogram);
odontogramRoute.delete("/:id", validToken, validParams(idSchema), controller.deleteOdontogram);

export { odontogramRoute };
