import { supabase } from "@/integrations/supabase/supabase";
import { z } from "zod";
import {
  Trip,
  TripCreate,
  TripEdit,
  tripSchema,
  UpdateLocation,
  VehiclePhoto,
} from "../schemas/trip.schema";

export const tripApi = {
  async getAll(userId: string): Promise<Trip[]> {
    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .eq("user_id", userId)
      .eq("trip_date", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return z.array(tripSchema).parse(data ?? []);
  },
  async getById(id: string, userId: string): Promise<Trip> {
    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .eq("user_id", userId)
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return tripSchema.parse(data);
  },
  async getToday(userId: string): Promise<Trip | null> {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .eq("user_id", userId)
      .eq("trip_date", today)
      .maybeSingle();

    if (error) throw error;
    return data ? tripSchema.parse(data) : null;
  },
  async getLatest(userId: string): Promise<Trip | null> {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .eq("user_id", userId)
      .eq("trip_date", today)
      .order("trip_date", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data ? tripSchema.parse(data) : null;
  },
  async create(data: TripCreate): Promise<Trip> {
    const { data: tripData, error } = await supabase
      .from("trips")
      .insert(data)
      .select()
      .single();

    if (error) throw error;

    return tripSchema.parse(tripData);
  },
  async edit(id: string, data: TripEdit): Promise<Trip> {
    const { data: tripData, error } = await supabase
      .from("trips")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return tripSchema.parse(tripData);
  },
  async insertVehiclePhotos(photos: VehiclePhoto[]): Promise<void> {
    const { error } = await supabase.from("vehicle_photos").insert(photos);

    if (error) throw error;
  },
  async updateLocation({
    tripId,
    latitude,
    longitude,
  }: UpdateLocation): Promise<void> {
    if (!tripId) return;

    const { error } = await supabase
      .from("trips")
      .update({
        current_location: `POINT(${longitude} ${latitude})`,
      })
      .eq("id", tripId);

    if (error) throw error;
  },
};
