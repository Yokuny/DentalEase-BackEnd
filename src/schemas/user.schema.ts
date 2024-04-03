import { z } from "zod";
import { lengthMessage, mailMessage, passRegexMessage } from "../helpers/zodMessage.helper";
import { titleRegex, emailRegExp, passwordRegExp } from "../helpers/regex.helper";

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
    .regex(passwordRegExp, passRegexMessage()),
});

export const signupSchema = z.object({
  name: z.string().min(5, lengthMessage(5, 26)).max(26, lengthMessage(5, 26)).regex(titleRegex),
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
    .regex(passwordRegExp, passRegexMessage()),
});

export type SignIn = z.infer<typeof signinSchema>;
export type SignUp = z.infer<typeof signupSchema>;