import Joi from "joi";

export const signupSchema = Joi.object({
  username: Joi.string().min(5).max(26).required(),
  email: Joi.string().email().min(5).max(50).required(),
  password: Joi.string()
    .min(5)
    .max(50)
    .required()
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/)
    .required(),
});

export const signinSchema = Joi.object({
  email: Joi.string().min(5).max(26).email().required(),
  password: Joi.string()
    .min(5)
    .max(50)
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/)
    .required(),
});
