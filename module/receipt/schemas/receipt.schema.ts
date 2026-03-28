import * as z from "zod";

export const receiptSchema = z.object({
  id: z.uuid(),
  trip_id: z.uuid({
    message: "Trip is required",
  }),
  user_id: z.uuid(),
  amount: z.coerce.number(),
  description: z.string().max(100, "Description is too long").optional(),
  image_url: z.string().nullable().optional(),
});

export type Receipt = z.infer<typeof receiptSchema>;

export const receiptCreateSchema = z.object({
  amount: z.coerce.number().min(1, "Amount is required"),
  description: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
});

export type ReceiptCreate = z.infer<typeof receiptCreateSchema>;

export const receiptEditSchema = z.object({
  image_url: z.string().nullable().optional(),
});

export type ReceiptEdit = z.infer<typeof receiptEditSchema>;
