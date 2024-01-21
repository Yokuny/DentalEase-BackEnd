import { z } from "zod";

const lengthMessage = (min: number, max: number) => ({
  message: `O campo deve ter ${min} a ${max} caracteres`,
});

const mailMessage = () => ({
  message: `O campo deve ser um email válido`,
});

export const odontogramSchema = z
  .object({
    Patient: z.string().min(5, lengthMessage(5, 50)).max(50, lengthMessage(5, 50)),
    Doctor: z.string().min(5, lengthMessage(5, 50)).max(50, lengthMessage(5, 50)),
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

  
