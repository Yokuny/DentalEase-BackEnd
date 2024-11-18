import { z } from "zod";

export const procedureSchema = z.object({
  procedures: z.string().min(3),
});

export type NewProcedures = z.infer<typeof procedureSchema>;
