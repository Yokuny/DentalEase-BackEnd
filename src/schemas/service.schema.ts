import { z } from "zod";
import { objectIdMessage, validObjectID } from "../helpers";

export const serviceSchema = z.object({
  Patient: z.string().refine(validObjectID, objectIdMessage()),
  Doctor: z.string().refine(validObjectID, objectIdMessage()),
  Odontogram: z.string().refine(validObjectID, objectIdMessage()),
  workToBeDone: z.string().trim().optional(),
  price: z.number().min(0),
  status: z.enum(["pending", "paid", "canceled"]).default("pending"),
});

export type NewService = z.infer<typeof serviceSchema>;