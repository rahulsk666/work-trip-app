import * as z from "zod";

export const receiptSchema = z.object({
  id: z.uuid(),
  trip_id: z.uuid({
    message: "errors.trip_required",
  }),
  user_id: z.uuid(),
  amount: z.coerce.number(),
  description: z.string().max(100, "errors.max_description_length").optional(),
  image_url: z.string().nullable().optional(),
  status: z.enum(["PENDING", "VERIFIED", "REJECTED"]),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export type Receipt = z.infer<typeof receiptSchema>;

export const receiptCreateSchema = z.object({
  amount: z.coerce.number().min(1, "errors.amount_required"),
  description: z.string().nullable().optional(),
  status: z
    .enum(["PENDING", "VERIFIED", "REJECTED"])
    .default("PENDING")
    .optional(),
  image_url: z.string().nullable().optional(),
});

export type ReceiptCreate = z.infer<typeof receiptCreateSchema>;

export const receiptEditSchema = z.object({
  image_url: z.string().nullable().optional(),
});

export type ReceiptEdit = z.infer<typeof receiptEditSchema>;
