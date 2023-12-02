import Joi from "joi";
import { ObjectId } from "mongodb";

export const idSchema = Joi.object({
  id: Joi.string()
    .custom((value: string, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error("ID fornecido é inválido");
      }
      return value;
    })
    .required(),
});
