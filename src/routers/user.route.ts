import { Router } from "express";
import * as controller from "../controllers/user.controller";
import { validBody } from "../middlewares/validation.middleware";
import { signupSchema, signinSchema } from "../schemas";

const userRoute = Router();

userRoute.post("/signup", validBody(signupSchema), controller.signup);
userRoute.post("/signin", validBody(signinSchema), controller.signin);

export { userRoute };
