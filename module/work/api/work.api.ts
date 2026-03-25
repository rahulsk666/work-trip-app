import { supabase } from "@/integrations/supabase/supabase";
import { z } from "zod";
import { Work, WorkCreate, WorkEnd, workSchema } from "../schemas/work.schema";

export const WORK_PAGE_SIZE = 10;

export const workApi = {
  async getAll(
    userId: string,
    tripId: string,
    pageParam = 0,
    pageSize = WORK_PAGE_SIZE,
  ): Promise<{
    data: Work[];
    nextPage: number | undefined;
  }> {
    const from = pageParam * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
      .from("work_Sessions")
      .select("*")
      .eq("user_id", userId)
      .eq("trip_id", tripId)
      .order("created_date", { ascending: false })
      .range(from, to);

    if (error) throw new Error(error.message);

    return {
      data: z.array(workSchema).parse(data ?? []),
      nextPage:
        data && data.length === WORK_PAGE_SIZE ? pageParam + 1 : undefined,
    };
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
