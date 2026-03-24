import { supabase } from "@/integrations/supabase/supabase";
import { z } from "zod";
import { Work, WorkCreate, WorkEnd, workSchema } from "../schemas/work.schema";

function getToday() {
  const today = new Date().toISOString().split("T")[0];
  const startOfDay = `${today}T00:00:00`;
  const endOfDay = `${today}T23:59:59`;

  return { startOfDay, endOfDay };
}

export const workApi = {
  async getAll(userId: string, tripId: string): Promise<Work[]> {
    const { startOfDay, endOfDay } = getToday();
    const { data, error } = await supabase
      .from("work_sessions")
      .select("*")
      .eq("user_id", userId)
      .eq("trip_id", tripId)
      .gte("created_at", startOfDay)
      .lte("created_at", endOfDay)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return z.array(workSchema).parse(data ?? []);
  },
  async getById(id: string, userId: string): Promise<Work> {
    const { data, error } = await supabase
      .from("work_sessions")
      .select("*")
      .eq("user_id", userId)
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return workSchema.parse(data);
  },
  async getLatest(userId: string, tripId: string): Promise<Work | null> {
    const { data, error } = await supabase
      .from("work_sessions")
      .select("*")
      .eq("user_id", userId)
      .eq("trip_id", tripId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data ? workSchema.parse(data) : null;
  },
  async create(data: WorkCreate): Promise<Work> {
    const { data: tripData, error } = await supabase
      .from("work_sessions")
      .insert(data)
      .select()
      .single();

    if (error) throw error;

    return workSchema.parse(tripData);
  },
  async edit(id: string, data: WorkEnd): Promise<Work> {
    const { data: tripData, error } = await supabase
      .from("work_sessions")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return workSchema.parse(tripData);
  },
};
