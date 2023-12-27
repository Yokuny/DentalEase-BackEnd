import { z } from "zod";

enum status {
  pending,
  paid,
  canceled,
}

export const serviceSchema = z.object({
  Patient: z.string(),
  Doctor: z.string(),
  workToBeDone: z.string(),
  price: z.number(),
  status: z.nativeEnum(status).default(status.pending),
});
