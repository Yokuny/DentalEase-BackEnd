import Joi from "joi";

export const scheduleSchema = Joi.object({
  Patient: Joi.string().required(),
  Doctor: Joi.string().required(),
  Service: Joi.string().required(),
  initianDate: Joi.date().required(),
  finalDate: Joi.date(),
});