import Joi from "joi";

export const signupSchema = Joi.object({
  username: Joi.string()
    .min(5)
    .max(26)
    .regex(/^[a-zA-Z0-9\sÀ-ú]{6,}\s*$/)
    .required(),
  email: Joi.string()
    .email()
    .min(5)
    .max(50)
    .regex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)
    .required(),
  password: Joi.string()
    .min(5)
    .max(50)
    .required()
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/)
    .required(),
});

export const signinSchema = Joi.object({
  email: Joi.string()
    .min(5)
    .max(26)
    .regex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)
    .email()
    .required(),
  password: Joi.string()
    .min(5)
    .max(50)
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/)
    .required(),
});