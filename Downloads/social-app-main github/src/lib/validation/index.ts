import * as z from "zod";

export const SignupValidation = z.object({
  name: z.string().min(2, { message: "Très court" }),
  username: z.string().min(2, { message: "Très court" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit avoir au moin 8 charactères" }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit avoir au moin 8 charactères" }),
});
export const PostValidation = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
});

export const ProfileValidation = z.object({
  file: z.array(z.any()), // ou une validation plus spécifique pour les fichiers
  name: z.string().min(1, "Please enter your name"),
  username: z.string().min(1, "Please enter your username"),
  email: z.string().email("Please enter a valid email"),
  bio: z.string().optional(), // ou toute autre règle de validation dont vous avez besoin
});
