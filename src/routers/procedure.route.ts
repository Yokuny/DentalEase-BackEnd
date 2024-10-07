import { Router } from "express";
import * as controller from "../controllers/procedure.controller";
import { procedureSchema } from "../schemas/procedure.schema";
import { validBody, validToken, clinicAssignmentCheck } from "../middlewares";

const consoleLogMiddleware = (req: any, _res: any, next: any) => {
  console.log(req.body);
  console.log("Procedure route PUT request received");
  console.log("Procedure route PUT request received");
  console.log("Procedure route PUT request received");
  next();
};

const procedureRoute = Router();
procedureRoute.use(validToken);
procedureRoute.use(clinicAssignmentCheck);

procedureRoute.get("/", controller.getProcedure);
procedureRoute.put("/", consoleLogMiddleware, validBody(procedureSchema), controller.updateProcedure);

export { procedureRoute };
