import { z } from "zod";
import { passwordRegExp, numClean } from "../helpers";
import { lengthMessage, mailMessage, passRegexMessage } from "../helpers/zodMessage.helper";

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
    cnpj: z.string().trim().min(14, lengthMessage(14, 18)).max(18, lengthMessage(14, 18)).transform(numClean),
  })
  .required();

export type NewClinic = z.infer<typeof clinicSchema>;