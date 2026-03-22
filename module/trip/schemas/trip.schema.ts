import * as z from "zod";

export const tripSchema = z.object({
  id: z.uuid(),
  user_id: z.uuid().nullable().optional(),
  vehicle_id: z.string(),
  trip_date: z.string(),
  start_time: z.string(),
  end_time: z.string().nullable().optional(),
  start_km: z.number().min(1, "Odometer reading is required"),
  end_km: z.number().nullable().optional(),
  start_image: z.string().nullable().optional(),
  end_image: z.string().nullable().optional(),
  start_location: z.string(),
  end_location: z.string().nullable().optional(),
  current_location: z.string().nullable().optional(),
  created_at: z.string().optional(), // timestamptz
  updated_at: z.string().nullable().optional(),
  image_folder: z.string().nullable().optional(),
});

export type Trip = z.infer<typeof tripSchema>;

export const tripCreateSchema = z.object({
  vehicle_id: z.string().nonempty("Vehicle not assigned"),
  trip_date: z.string(),
  start_time: z.string(),
  start_km: z.coerce.number().min(1, "Odometer reading is required"),
  start_location: z.string(),
  image_folder: z.string().optional(),
});

export type TripCreate = z.infer<typeof tripCreateSchema>;

export const tripEditSchema = z.object({
  start_image: z.string().nullable().optional(),
  end_image: z.string().nullable().optional(),
  end_time: z.string().nullable().optional(),
  end_km: z.coerce.number().nullable().optional(),
  end_location: z.string().nullable().optional(),
  current_location: z.string().nullable().optional(),
  is_active: z.boolean().optional(),
});

export type TripEdit = z.infer<typeof tripEditSchema>;

export const vehiclePhotoSchema = z.object({
  trip_id: z.string(),
  photo_type: z.enum(["FRONT", "BACK", "LEFT", "RIGHT", "KM_METER"]),
  photo_url: z.string(),
});

export type VehiclePhoto = z.infer<typeof vehiclePhotoSchema>;

export const UpdateLocationSchema = z.object({
  tripId: z.string().nullable(),
  latitude: z.number(),
  longitude: z.number(),
});

export type UpdateLocation = z.infer<typeof UpdateLocationSchema>;
