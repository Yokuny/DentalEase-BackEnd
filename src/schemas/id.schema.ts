import { ObjectId } from "mongodb";
import { z } from "zod";

const objectIdMessage = () => ({
  message: `ID fornecido é inválido`,
});

export const idSchema = z.object({
  id: z.string().refine((value) => ObjectId.isValid(value), objectIdMessage()),
});

export const idSchemaOptional = z.object({
  id: z
    .string()
    .refine((value) => ObjectId.isValid(value), objectIdMessage())
    .optional(),
});
