import { z } from "zod";

export const procedureSchema = z.object({
  procedure: z.string().min(3),
});

export type NewProcedure = z.infer<typeof procedureSchema>;
