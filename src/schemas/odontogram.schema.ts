import Joi from "joi";

export const odontogramSchema = Joi.object({
  Patient: Joi.string().required(),
  workToBeDone: Joi.string().max(250).required(),
  finished: Joi.boolean().default(false),
  teeth: Joi.array()
    .min(1)
    .items(
      Joi.object({
        number: Joi.number().max(99).required(),
        faces: Joi.object({
          facial: Joi.boolean().default(false),
          incisal: Joi.boolean().default(false),
          lingual: Joi.boolean().default(false),
          mesial: Joi.boolean().default(false),
          distal: Joi.boolean().default(false),
          occlusal: Joi.boolean().default(false),
          palatal: Joi.boolean().default(false),
        })
          .min(1)
          .required(),
      })
    )
    .required(),
});