import { supabase } from "@/integrations/supabase/supabase";
import * as Device from "expo-device";

export const getDeviceId = (): string => {
  return `${Device.modelName ?? "unknown"}-${Device.osVersion ?? "unknown"}-${Device.osBuildId ?? "unknown"}`;
};

export const verifyAndRegisterDevice = async (
  userId: string,
): Promise<boolean> => {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("device_id")
      .eq("id", userId)
      .single();

    if (error) throw error;

    const currentDeviceId = getDeviceId();

    // ✅ First login — no device registered yet, save and allow
    if (!user?.device_id) {
      const { error: updateError } = await supabase
        .from("users")
        .update({ device_id: currentDeviceId })
        .eq("id", userId);

      if (updateError) throw updateError;

      return true;
    }

    // ✅ Verify current device matches registered device
    return user.device_id === currentDeviceId;
  } catch (err) {
    console.error("Device verification failed:", err);
    throw err;
  }
};

// ✅ Use this if you want to reset a user's device (e.g. admin action)
export const resetDeviceRegistration = async (
  userId: string,
): Promise<void> => {
  const { error } = await supabase
    .from("users")
    .update({ device_id: null })
    .eq("id", userId);

  if (error) throw error;
};
