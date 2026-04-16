import { APP_COLORS } from "@/lib/consts";
import * as Location from "expo-location";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Linking } from "react-native";
import { toast } from "sonner-native";

// hooks/useRequestLocation.ts
export function useRequestLocation() {
  const { t } = useTranslation();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  const [displayCurrentAddress, setDisplayCurrentAddress] = useState<
    string | null
  >(null);

  const requestLocation = useCallback(async () => {
    try {
      const enabled = await Location.hasServicesEnabledAsync();
      if (!enabled) {
        toast.error(t("errors.location_services_disabled"), {
          action: {
            label: "Open Settings",
            onClick: () => Linking.openSettings(),
          },
          actionButtonStyle: { backgroundColor: APP_COLORS.primary },
          actionButtonTextStyle: { color: APP_COLORS.textPrimary },
        });
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        toast.error(t("errors.location_permission_denied"), {
          action: {
            label: "Open Settings",
            onClick: () => Linking.openSettings(),
          },
          actionButtonStyle: { backgroundColor: APP_COLORS.primary },
          actionButtonTextStyle: { color: APP_COLORS.textPrimary },
        });
        return;
      }
      const accurate = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation(accurate);
      const { latitude, longitude } = accurate.coords;
      const response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      for (let item of response) {
        setDisplayCurrentAddress(
          `${item.name} ${item.city} ${item.postalCode}`,
        );
      }
    } catch (err: any) {
      if (location) return;
      toast.error(
        err?.message?.includes(t("errors.current_location_unavailable"))
          ? t("errors.current_location_unavailable")
          : t("errors.unable_to_get_location"),
      );
    }
  }, []);

  return { location, displayCurrentAddress, requestLocation };
}
