import { Router } from "express";
import * as controller from "../controllers/procedure.controller";
import { procedureSchema } from "../schemas/procedure.schema";
import { validBody, validToken, clinicAssignmentCheck } from "../middlewares";

const procedureRoute = Router();
procedureRoute.use(validToken);
procedureRoute.use(clinicAssignmentCheck);

procedureRoute.get("/", controller.getProcedure);
procedureRoute.put("/", validBody(procedureSchema), controller.updateProcedure);

export { procedureRoute };
