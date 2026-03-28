import { getAddressFromCoords } from "@/lib/location";
import { useEffect, useState } from "react";
import { useTripCoordinates } from "./useTripCoordinates";

export function useTripAddress(location?: string | null) {
  const coords = useTripCoordinates(location);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (!coords) return;

    getAddressFromCoords(coords.latitude, coords.longitude).then(setAddress);
  }, [coords]);

  return {
    coords,
    address,
  };
}
