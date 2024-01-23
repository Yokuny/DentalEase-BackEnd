import { z } from "zod";
import { passwordRegExp } from "../helpers/regex.helper";

const lengthMessage = (min: number, max: number) => ({
  message: `O campo deve ter ${min} a ${max} caracteres`,
});

const mailMessage = () => ({
  message: `O campo deve ser um email válido`,
});

const passRegexMessage = () => ({
  message: `O campo deve ter ao menos uma letra e um número`,
});

const sanatize = (value: string) => value.replace(/[^0-9]/g, "");

export const clinicSchema = z
  .object({
    name: z.string().trim().min(5, lengthMessage(5, 50)).max(50, lengthMessage(5, 50)),
    email: z.string().trim().email(mailMessage()).min(5, lengthMessage(5, 50)).max(50, lengthMessage(5, 50)),
    code: z
      .string()
      .trim()
      .min(6, lengthMessage(6, 10))
      .max(10, lengthMessage(6, 10))
      .regex(passwordRegExp, passRegexMessage()),
    cnpj: z.string().trim().min(14, lengthMessage(14, 18)).max(18, lengthMessage(14, 18)).transform(sanatize),
  })
  .required();

export type NewClinic = z.infer<typeof clinicSchema>;