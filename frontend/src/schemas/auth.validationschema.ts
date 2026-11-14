import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),

  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),

  email: z.string().trim().email("Please enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
      "Password must contain a letter, a number, and a special character",
    ),
});

export type SignInFormData = z.infer<typeof signinSchema>;
export type SignUpFormData = z.infer<typeof signupSchema>;
