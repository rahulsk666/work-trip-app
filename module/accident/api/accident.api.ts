import { supabase } from "@/integrations/supabase/supabase";
import { z } from "zod";
import {
  Accident,
  AccidentCreate,
  AccidentEdit,
  accidentSchema,
} from "../schemas/accident.schema";

export const accidentApi = {
  async getAll(userId: string, tripId: string): Promise<Accident[]> {
    const { data, error } = await supabase
      .from("accident_reports")
      .select("*")
      .eq("user_id", userId)
      .eq("trip_id", tripId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return z.array(accidentSchema).parse(data ?? []);
  },
  async create(data: AccidentCreate): Promise<Accident> {
    const { data: accidentData, error } = await supabase
      .from("accident_reports")
      .insert(data)
      .select()
      .single();

    if (error) console.log(error);
    return accidentSchema.parse(accidentData);
  },
  async edit(id: string, data: AccidentEdit): Promise<Accident> {
    const { data: accidentData, error } = await supabase
      .from("accident_reports")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return accidentSchema.parse(accidentData);
  },
};
