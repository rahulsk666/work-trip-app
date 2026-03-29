import AppMapView from "@/components/AppMapView";
import * as Location from "expo-location";
import React, { useEffect } from "react";

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
      label={label ?? "Location"}
      markerTitle="Current Location"
      height={180}
    />
  );
};

export default TripCurrentLocation;
