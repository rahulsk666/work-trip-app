import { useUpdateLocationMutation } from "@/module/trip/hooks";
import * as Location from "expo-location";
import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner-native";

export function useLocationTracking(tripId: string | null) {
  const { t } = useTranslation();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { mutateAsync: updateLocation } = useUpdateLocationMutation();

  const requestPermission = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      toast.error(t("errors.location_permission_denied"));
      return false;
    }
    return true;
  }, []);

  const fetchAndUpdateLocation = useCallback(async () => {
    if (!tripId) return;

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      await updateLocation({
        tripId,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (err) {
      console.error(t("errors.failed_to_fetch_location"), err);
    }
  }, [tripId, updateLocation]);

  useEffect(() => {
    if (!tripId) return;

    const init = async () => {
      const granted = await requestPermission();
      if (!granted) return;

      fetchAndUpdateLocation();
      intervalRef.current = setInterval(fetchAndUpdateLocation, 5 * 60 * 1000);
    };

    init();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [tripId, fetchAndUpdateLocation, requestPermission]);
}
