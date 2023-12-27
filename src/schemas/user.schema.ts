import { z } from "zod";
import { titleRegex, emailRegExp, passwordRegExp } from "../helpers/regex.helper";

const lengthMessage = (min: number, max: number) => ({
  message: `O campo deve ter ${min ? `${min} a ${max} caracteres.` : `no máximo ${max} caracteres`}`,
});

const mailMessage = () => ({
  message: `O campo deve ser um email válido`,
});

const passwordMessage = () => ({
  message: "Digite uma senha forte",
});

export const signinSchema = z.object({
  email: z
    .string()
    .trim()
    .email(mailMessage())
    .min(5, lengthMessage(5, 50))
    .max(50, lengthMessage(5, 50))
    .regex(emailRegExp),
  password: z
    .string()
    .trim()
    .min(5, lengthMessage(5, 50))
    .max(50, lengthMessage(5, 50))
    .regex(passwordRegExp, passwordMessage()),
});

export const signupSchema = z.object({
  username: z.string().min(5, lengthMessage(5, 26)).max(26, lengthMessage(5, 26)).regex(titleRegex),
  email: z
    .string()
    .trim()
    .email(mailMessage())
    .min(5, lengthMessage(5, 50))
    .max(50, lengthMessage(5, 50))
    .regex(emailRegExp),
  password: z
    .string()
    .trim()
    .min(5, lengthMessage(5, 50))
    .max(50, lengthMessage(5, 50))
    .regex(passwordRegExp, passwordMessage()),
});
