import { supabase } from "@/integrations/supabase/supabase";
import { z } from "zod";
import {
  Receipt,
  ReceiptCreate,
  ReceiptEdit,
  receiptSchema,
} from "../schemas/receipt.schema";

export const RECEIPT_PAGE_SIZE = 10;

export const receiptApi = {
  async getAll(userId: string, tripId: string): Promise<Receipt[]> {
    const { data, error } = await supabase
      .from("receipts")
      .select("*")
      .eq("user_id", userId)
      .eq("trip_id", tripId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return z.array(receiptSchema).parse(data ?? []);
  },
  async getByLimit(
    userId: string,
    tripId: string,
    limit: number,
  ): Promise<Receipt[]> {
    const { data, error } = await supabase
      .from("receipts")
      .select("*")
      .eq("user_id", userId)
      .eq("trip_id", tripId)
      .limit(limit)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return z.array(receiptSchema).parse(data ?? []);
  },
  async getByPagination(
    userId: string,
    tripId: string,
    pageParam = 0,
    pageSize = RECEIPT_PAGE_SIZE,
  ): Promise<{
    data: Receipt[];
    nextPage: number | undefined;
  }> {
    const from = pageParam * pageSize;
    const to = from + pageSize - 1;
    const { data, error } = await supabase
      .from("receipts")
      .select("*")
      .eq("user_id", userId)
      .eq("trip_id", tripId)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw new Error(error.message);

    return {
      data: z.array(receiptSchema).parse(data ?? []),
      nextPage:
        data && data.length === RECEIPT_PAGE_SIZE ? pageParam + 1 : undefined,
    };
  },
  async getById(id: string): Promise<Receipt> {
    const { data, error } = await supabase
      .from("receipts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return receiptSchema.parse(data);
  },
  async getLatestWork(userId: string, tripId: string): Promise<Receipt | null> {
    const { data, error } = await supabase
      .from("receipts")
      .select("*")
      .eq("user_id", userId)
      .eq("trip_id", tripId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data ? receiptSchema.parse(data) : null;
  },
  async create(data: ReceiptCreate): Promise<Receipt> {
    const { data: receiptData, error } = await supabase
      .from("receipts")
      .insert(data)
      .select()
      .single();

    if (error) console.log(error);
    return receiptSchema.parse(receiptData);
  },
  async edit(id: string, data: ReceiptEdit): Promise<Receipt> {
    const { data: receipData, error } = await supabase
      .from("receipts")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return receiptSchema.parse(receipData);
  },
};
