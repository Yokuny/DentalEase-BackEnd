import { z } from "zod";
import { objectIdMessage, validObjectID } from "../helpers";

export const odontogramSchema = z
  .object({
    Patient: z.string().refine(validObjectID, objectIdMessage()),
    Doctor: z.string().refine(validObjectID, objectIdMessage()),
    procedures: z.array(
      z.object({
        procedure: z.string(),
        price: z.number().positive(),
        status: z.enum(["pending", "paid", "canceled"]),
      })
    ),
    finished: z.boolean().default(false),
    teeth: z.array(
      z.object({
        number: z.number().max(99),
        faces: z.object({
          facial: z.boolean().default(false),
          incisal: z.boolean().default(false),
          lingual: z.boolean().default(false),
          mesial: z.boolean().default(false),
          distal: z.boolean().default(false),
          occlusal: z.boolean().default(false),
          palatal: z.boolean().default(false),
        }),
      })
    ),
  })
  .required();

export type NewOdontogram = z.infer<typeof odontogramSchema>;

  
