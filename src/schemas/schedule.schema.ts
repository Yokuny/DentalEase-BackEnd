import Joi from "joi";

export const scheduleSchema = Joi.object({
  Patient: Joi.string().required(),
  Odontogram: Joi.string(),
  Doctor: Joi.string().required(),
  initianDate: Joi.date().required(),
  finalDate: Joi.date(),
});