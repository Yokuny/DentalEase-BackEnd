import Joi from "joi";

export const patientDataSchema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
  email: Joi.string().email().min(5).max(50).required(),
  cpf: Joi.string().min(11).max(11).required(),
  rg: Joi.string().min(7).max(7).required(),
  birthdate: Joi.date().required(),
  sex: Joi.string().valid("M", "F").required(),
  phone: Joi.string().min(11).max(11).required(),
  cep: Joi.string().min(8).max(8).required(),
  address: Joi.string().min(5).max(50),
});

export const requestRegisterSchema = Joi.object({
  email: Joi.string().email().min(5).max(50),
  cpf: Joi.string().min(11).max(11),
  rg: Joi.string().min(7).max(7),
  phone: Joi.string().min(11).max(11),
});
