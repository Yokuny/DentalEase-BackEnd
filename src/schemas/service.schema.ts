import { z } from "zod";

export const serviceSchema = z.object({
  Patient: z.string(),
  Doctor: z.string(),
  Odontogram: z.string().optional(),
  workToBeDone: z.string().trim().optional(),
  price: z.number().min(0),
  status: z.enum(["pending", "paid", "canceled"]).default("pending"),
});

export type NewService = z.infer<typeof serviceSchema>;