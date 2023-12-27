import { z } from "zod";

export const scheduleZodSchema = z.object({
  Patient: z.string(),
  Doctor: z.string(),
  Service: z.string(),
  initianDate: z.date(),
  finalDate: z.date().optional(),
});
