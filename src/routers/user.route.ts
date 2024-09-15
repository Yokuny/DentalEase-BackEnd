import { Router } from "express";
import * as controller from "../controllers/user.controller";
import { validBody, validToken } from "../middlewares";
import { signupSchema, signinSchema, userUpdateSchema, passwordUpdateSchema } from "../schemas/user.schema";

const userRoute = Router();

userRoute.post("/signup", validBody(signupSchema), controller.signup);
userRoute.post("/signin", validBody(signinSchema), controller.signin);

userRoute.use(validToken);
userRoute.get("/partial", controller.getPartialUserRegister);
userRoute.put("/update", validBody(userUpdateSchema), controller.updateUser);
userRoute.put("/change-password", validBody(passwordUpdateSchema), controller.changePassword);

export { userRoute };
