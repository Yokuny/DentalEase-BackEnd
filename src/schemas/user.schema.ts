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

export const imageSchema = z.object({
  image: z.string().url(),
});

export const userUpdateSchema = z.object({
  name: z.string().min(5, lengthMessage(5, 26)).max(26, lengthMessage(5, 26)).regex(titleRegex),
  image: z.string().url(),
});

export const passwordUpdateSchema = z.object({
  oldPassword: z
    .string()
    .trim()
    .min(5, lengthMessage(5, 50))
    .max(50, lengthMessage(5, 50))
    .regex(passwordRegExp, passRegexMessage()),
  newPassword: z
    .string()
    .trim()
    .min(5, lengthMessage(5, 50))
    .max(50, lengthMessage(5, 50))
    .regex(passwordRegExp, passRegexMessage()),
});

export type SignIn = z.infer<typeof signinSchema>;
export type SignUp = z.infer<typeof signupSchema>;
export type Image = z.infer<typeof imageSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type PasswordUpdate = z.infer<typeof passwordUpdateSchema>;