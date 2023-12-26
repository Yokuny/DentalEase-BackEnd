import Joi from "joi";

export const serviceSchema = Joi.object({
  Patient: Joi.string().required(),
  Doctor: Joi.string().required(),
  workToBeDone: Joi.string().required(),
  price: Joi.number().required(),
  status: Joi.string().allow("pending", "paid", "canceled").default("pending"),
});
