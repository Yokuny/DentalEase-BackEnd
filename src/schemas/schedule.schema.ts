import { z } from "zod";
import { objectIdMessage, validObjectID } from "../helpers";

export const scheduleSchema = z.object({
  Patient: z.string().refine(validObjectID, objectIdMessage()),
  Doctor: z.string().refine(validObjectID, objectIdMessage()),
  Service: z.string().refine(validObjectID, objectIdMessage()),
  startTime: z.string().datetime(),
  endTime: z.string().datetime().optional(),
});

export type NewSchedule = z.infer<typeof scheduleSchema>;
