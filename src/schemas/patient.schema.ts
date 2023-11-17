import Joi from "joi";

export const patientDataSchema = Joi.object({
  nome: Joi.string().min(5).max(30).required(),
  email: Joi.string().min(5).max(50).required(),
  cpf: Joi.string().min(11).max(11).required(),
  rg: Joi.string().min(9).max(9).required(),
  dataNascimento: Joi.date().required(),
  sexo: Joi.string().valid("M", "F").required(),
  telefone: Joi.string().min(11).max(11).required(),
  cep: Joi.string().min(8).max(8).required(),
  logradouro: Joi.string().min(5).max(50),
});
