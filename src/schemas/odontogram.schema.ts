import { z } from "zod";
import { lengthMessage, objectIdMessage, validObjectID } from "../helpers";

export const odontogramSchema = z
  .object({
    Patient: z.string().refine(validObjectID, objectIdMessage()),
    Doctor: z.string().refine(validObjectID, objectIdMessage()),
    workToBeDone: z.string().trim().max(250, lengthMessage(0, 250)),
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

  
