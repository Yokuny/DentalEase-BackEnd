import { Router } from "express";
import * as controller from "../controllers/user.controller";
import { validateBody } from "../middlewares/validation.middleware";
import { signupSchema, signinSchema } from "../schemas";

const userRoute = Router();

userRoute.post("/signup", validateBody(signupSchema), controller.signup);
userRoute.post("/signin", validateBody(signinSchema), controller.signin);

export { userRoute };
