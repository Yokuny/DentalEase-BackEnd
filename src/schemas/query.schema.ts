import { z } from "zod";
import { validObjectID } from "../helpers/validade.helper";
import { lengthMessage, mailMessage, objectIdMessage } from "../helpers/zodMessage.helper";

export const querySchema = z.object({
  id: z.string().refine(validObjectID, objectIdMessage()).optional(),
  email: z
    .string()
    .email(mailMessage())
    .min(5, lengthMessage(5, 50))
    .max(50, lengthMessage(5, 50))
    .optional(),
  cpf: z.string().min(11, lengthMessage(11, 11)).max(11, lengthMessage(11, 11)).optional(),
  rg: z.string().min(7, lengthMessage(7, 7)).max(7, lengthMessage(7, 7)).optional(),
  phone: z.string().min(11, lengthMessage(11, 11)).max(11, lengthMessage(11, 11)).optional(),
});

export const queryByIdSchema = z.object({
  id: z.string().refine(validObjectID, objectIdMessage()).optional(),
  Patient: z.string().refine(validObjectID, objectIdMessage()).optional(),
  Odontogram: z.string().refine(validObjectID, objectIdMessage()).optional(),
  Doctor: z.string().refine(validObjectID, objectIdMessage()).optional(),
  Clinic: z.string().refine(validObjectID, objectIdMessage()).optional(),
  Service: z.string().refine(validObjectID, objectIdMessage()).optional(),
});

export type Query = z.infer<typeof querySchema>;
export type QueryId = z.infer<typeof queryByIdSchema>;
