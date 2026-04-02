import { supabase } from "@/integrations/supabase/supabase";
import * as Application from "expo-application";

export const getDeviceId = (): string => {
  const androidId = Application.getAndroidId();
  if (!androidId) throw new Error("Could not get Android device ID");
  return androidId;
};

export const verifyAndRegisterDevice = async (
  userId: string,
): Promise<boolean> => {
  try {
    const currentDeviceId = getDeviceId();

    const { data: user, error } = await supabase
      .from("users")
      .select("device_id")
      .eq("id", userId)
      .single();

    if (error) throw error;

    // ✅ First login — register device and allow
    if (!user?.device_id) {
      const { error: updateError } = await supabase
        .from("users")
        .update({ device_id: currentDeviceId })
        .eq("id", userId);

      if (updateError) throw updateError;

      console.log("Device registered:", currentDeviceId);
      return true;
    }

    // ✅ Verify current device matches registered device
    const isMatch = user.device_id === currentDeviceId;
    console.log(
      isMatch ? "Device verified ✅" : "Device mismatch ❌",
      "\nRegistered:",
      user.device_id,
      "\nCurrent:",
      currentDeviceId,
    );
    return isMatch;
  } catch (err) {
    console.error("Device verification failed:", err);
    throw err;
  }
};

// ✅ Reset device — admin/support use when user gets a new phone
export const resetDeviceRegistration = async (
  userId: string,
): Promise<void> => {
  const { error } = await supabase
    .from("users")
    .update({ device_id: null })
    .eq("id", userId);

  if (error) throw error;
};
