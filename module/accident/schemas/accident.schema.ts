import * as z from "zod";

export const accidentSchema = z.object({
  id: z.uuid(),
  trip_id: z.uuid({
    message: "Trip is required",
  }),
  user_id: z.uuid(),
  location: z.string(),
  description: z.string().max(100, "Description is too long").optional(),
  photo_url: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export type Accident = z.infer<typeof accidentSchema>;

export const accidentCreateSchema = z.object({
  location: z.string(),
  description: z.string().max(100, "Description is too long").optional(),
});

export type AccidentCreate = z.infer<typeof accidentCreateSchema>;

export const accidentEditSchema = z.object({
  photo_url: z.string().nullable().optional(),
});

export type AccidentEdit = z.infer<typeof accidentEditSchema>;
