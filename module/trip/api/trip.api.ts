import { supabase } from "@/integrations/supabase/supabase";
import { z } from "zod";
import { Trip, TripCreate, TripEdit, tripSchema } from "../schemas/trip.schema";

export const tripApi = {
  async getAll(): Promise<Trip[]> {
    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .eq("is_active", true);

    if (error) {
      throw new Error(error.message);
    }

    return z.array(tripSchema).parse(data ?? []);
  },
  async getById(id: string): Promise<Trip> {
    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return tripSchema.parse(data);
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
};
