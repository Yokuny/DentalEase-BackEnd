import { z } from "zod";

const lengthMessage = (min: number, max: number) => ({
  message: `O campo deve ter ${min ? `${min} a ${max} caracteres.` : `no máximo ${max} caracteres`}`,
});

const mailMessage = () => ({
  message: `O campo deve ser um email válido`,
});

export const querySchema = z.object({
  id: z.string().trim().optional(),
  email: z
    .string()
    .trim()
    .email(mailMessage())
    .min(5, lengthMessage(5, 50))
    .max(50, lengthMessage(5, 50))
    .optional(),
  cpf: z.string().trim().min(11, lengthMessage(11, 11)).max(11, lengthMessage(11, 11)).optional(),
  rg: z.string().trim().min(7, lengthMessage(7, 7)).max(7, lengthMessage(7, 7)).optional(),
  phone: z.string().trim().min(11, lengthMessage(11, 11)).max(11, lengthMessage(11, 11)).optional(),
});

export type Query = z.infer<typeof querySchema>;
