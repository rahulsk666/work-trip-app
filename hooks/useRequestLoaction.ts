import * as Location from "expo-location";
import { useCallback, useState } from "react";
import { toast } from "sonner-native";

// hooks/useRequestLocation.ts
export function useRequestLocation() {
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
        toast.error("Please enable location services");
        return;
      }
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        toast.error("Location permission required");
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
        err?.message?.includes("Current location is unavailable")
          ? "GPS unavailable. Please tap Refresh to try again."
          : "Unable to get location. Please check your device settings.",
      );
    }
  }, []);

  return { location, displayCurrentAddress, requestLocation };
}
