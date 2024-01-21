import { z } from "zod";

export const serviceSchema = z.object({
  Patient: z.string(),
  Doctor: z.string(),
  workToBeDone: z.string(),
  price: z.number(),
  status: z.enum(["pending", "paid", "canceled"]).default("pending"),
});

export type NewService = z.infer<typeof serviceSchema>;