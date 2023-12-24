import Joi from "joi";

export const clinicSchema = Joi.object({
  name: Joi.string().min(5).max(26).required(),
  email: Joi.string().min(5).max(50).required(),
  code: Joi.string().min(6).max(25).required(),
  cnpj: Joi.string().min(11).max(14).required(),
});
