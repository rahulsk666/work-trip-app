import * as z from "zod";

export const workSchema = z.object({
  id: z.uuid(),
  trip_id: z.uuid({
    message: "Trip ID is required",
  }),
  user_id: z.uuid().nullable().optional(),
  start_time: z.string({
    message: "Start time is required",
  }),
  end_time: z.string().nullable().optional(),
  location: z.string().nullable().optional(), // POINT(lng lat)
  notes: z.string().nullable().optional(),
});

export type Work = z.infer<typeof workSchema>;

export const workCreateSchema = z.object({
  trip_id: z.uuid(),
  start_time: z.string(),
  location: z.string(),
  notes: z.string().max(500, "Notes too long").optional(),
});

export type WorkCreate = z.infer<typeof workCreateSchema>;

export const workEndSchema = z.object({
  end_time: z.string(),
  location: z.string().optional(),
  notes: z.string().optional(),
});

export type WorkEnd = z.infer<typeof workEndSchema>;
