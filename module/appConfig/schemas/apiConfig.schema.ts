// module/appConfig/types.ts
export type AppUpdateMode = "NONE" | "WARNING" | "FORCE";

export interface AppConfig {
  id: string;
  min_supported_version: string;
  latest_version: string;
  update_mode: AppUpdateMode;
  warning_message: string | null;
  force_message: string | null;
  apk_url: string | null;
  maintenance_mode: boolean;
  maintenance_message: string | null;
  is_active: boolean;
}
