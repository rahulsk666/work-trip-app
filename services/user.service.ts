// src/services/user.service.ts
import { supabase } from "@/integrations/supabase/supabase";
import { UpdateUserProfile, UserProfile } from "@/types/user.types";

export const userService = {
  // get current logged in user profile
  getProfile: async (): Promise<UserProfile> => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) throw new Error("No active session");

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("auth_user_id", session.user.id)
      .single();

    if (error) throw error;
    return data;
  },

  // update user profile
  updateProfile: async (updates: UpdateUserProfile): Promise<UserProfile> => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) throw new Error("No active session");

    const { data, error } = await supabase
      .from("users") // ← was "profiles", make sure this matches your table name
      .update(updates)
      .eq("auth_user_id", session.user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // upload avatar image
  uploadAvatar: async (uri: string): Promise<string> => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) throw new Error("No active session");

    const fileName = `${session.user.id}/avatar.jpg`;
    const response = await fetch(uri);
    const blob = await response.blob();

    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, blob, { upsert: true });

    if (error) throw error;

    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

    return data.publicUrl;
  },
};
