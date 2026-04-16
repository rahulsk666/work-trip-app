import AppMapView from "@/components/AppMapView";
import * as Location from "expo-location";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface TripCurrentLocationProps {
  label?: string;
  location: Location.LocationObject | null;
  displayCurrentAddress: string | null;
  requestLocation: () => void;
}

const TripCurrentLocation = ({
  label,
  location,
  requestLocation,
  displayCurrentAddress,
}: TripCurrentLocationProps) => {
  const { t } = useTranslation();
  useEffect(() => {
    requestLocation();
  }, []);

  return (
    <AppMapView
      mode={{
        type: "live",
        location,
        requestLocation,
        displayCurrentAddress,
      }}
      label={label ?? t("common.location")}
      markerTitle={t("trip_form.current_location")}
      height={180}
    />
  );
};

export default TripCurrentLocation;
