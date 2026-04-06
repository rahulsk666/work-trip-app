// module/appConfig/api.ts

import { supabase } from "@/integrations/supabase/supabase";
import { AppConfig } from "../schemas/apiConfig.schema";

export const getAppConfig = async (): Promise<AppConfig> => {
  const { data, error } = await supabase
    .from("app_config")
    .select("*")
    .eq("is_active", true)
    .single();

  console.log(data);

  if (error) throw error;
  return data as AppConfig;
};
