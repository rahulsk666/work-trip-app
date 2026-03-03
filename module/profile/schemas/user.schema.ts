import * as z from "zod";

export const userSchema = z.object({
  id: z.uuid(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email(),
  phone: z
    .string()
    // .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number.")
    .nullable()
    .optional(),
  company_id: z.uuid().nullable().optional(),
  avatar_url: z.url().nullable().optional(),
  role: z.string(),
  is_active: z.boolean(),
  auth_user_id: z.uuid().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

export const userEditSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  phone: z.string().nullable().optional(),
  avatar_url: z.string().optional(),
  is_active: z.boolean().optional(),
});

export type UserEdit = z.infer<typeof userEditSchema>;
