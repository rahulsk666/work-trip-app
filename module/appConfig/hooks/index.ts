// module/appConfig/hooks.ts
import { useQuery } from "@tanstack/react-query";
import { getAppConfig } from "../api/apiConfig.api";
import { appConfigKeys } from "../constants/appConfig.keys";

export const useAppConfigQuery = () => {
  return useQuery({
    queryKey: appConfigKeys.all,
    queryFn: getAppConfig,
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
};
