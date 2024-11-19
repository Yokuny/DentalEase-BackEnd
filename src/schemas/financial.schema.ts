import { z } from "zod";
import { objectIdMessage, validObjectID } from "../helpers";

export const financialSchema = z.object({
  Patient: z.string().refine(validObjectID, objectIdMessage()),
  Doctor: z.string().refine(validObjectID, objectIdMessage()),
  Odontogram: z.string().refine(validObjectID, objectIdMessage()).optional(),
  procedures: z.array(
    z.object({
      procedure: z.string(),
      price: z.number().positive(),
      status: z.enum(["pending", "paid", "canceled"]),
    })
  ),
  price: z.number().positive().optional(),
  status: z.enum(["pending", "partial", "paid", "canceled"]).default("pending"),
});

export type NewFinancial = z.infer<typeof financialSchema>;
