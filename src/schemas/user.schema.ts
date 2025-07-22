import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"),
  email: z.email("Invalid email format").optional(),
  phone: z.string().min(10, "Phone must have at least 10 digits").optional(),
  username: z
    .string()
    .min(3, "Username must have at least 3 characters")
    .max(50, "Username must be less than 50 characters"),
  password: z
    .string()
    .min(6, "Password must have at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
  isActive: z.boolean().optional().default(true),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters")
    .optional(),
  email: z.email("Invalid email format").optional(),
  phone: z.string().min(10, "Phone must have at least 10 digits").optional(),
  username: z
    .string()
    .min(3, "Username must have at least 3 characters")
    .max(50, "Username must be less than 50 characters")
    .optional(),
  password: z
    .string()
    .min(6, "Password must have at least 6 characters")
    .max(100, "Password must be less than 100 characters")
    .optional(),
  isActive: z.boolean().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
