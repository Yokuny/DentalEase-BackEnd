import { Router } from "express";
import * as controller from "../controllers/financial.controller";
import { financialSchema, financialStateSchema, queryByIdSchema, idSchema } from "../schemas";
import { validBody, validQuery, validToken, clinicAssignmentCheck, validParams } from "../middlewares";

const financialRoute = Router();
financialRoute.use(validToken);
financialRoute.use(clinicAssignmentCheck);

financialRoute.get("/", validQuery(queryByIdSchema), controller.getFinancial);
financialRoute.get("/partial", controller.getPartialFinancialRegister);
financialRoute.get("/:id", validParams(idSchema), controller.getFinancial);
financialRoute.post("/create", validBody(financialSchema), controller.postFinancial);
financialRoute.put(
  "/:id/status",
  validParams(idSchema),
  validBody(financialStateSchema),
  controller.updateFinancialStatus
);
financialRoute.delete("/:id", validParams(idSchema), controller.deleteFinancial);

export { financialRoute };
