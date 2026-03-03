import { supabase } from "@/integrations/supabase/supabase";
import { User, UserEdit, userSchema } from "../schemas/user.schema";

export const userApi = {
  async get(): Promise<User> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("No active session");

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("auth_user_id", user.id)
      .single();

    if (error) throw error;
    return userSchema.parse(data);
  },

  async edit(id: string, data: UserEdit): Promise<User> {
    const { data: userData, error } = await supabase
      .from("users")
      .update(data)
      .eq("auth_user_id", id)
      .select()
      .single();

    if (error) throw error;
    return userSchema.parse(userData);
  },
};
