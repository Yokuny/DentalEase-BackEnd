import { z } from "zod";

export const scheduleSchema = z.object({
  Patient: z.string(),
  Doctor: z.string(),
  Service: z.string(),
  initianDate: z.string().datetime(),
  finalDate: z.string().datetime().optional(),
});

export type NewSchedule = z.infer<typeof scheduleSchema>;
