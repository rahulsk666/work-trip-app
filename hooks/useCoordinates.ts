import { parseWKBPoint } from "@/lib/location";
import { useEffect, useState } from "react";

export function useCoordinates(location?: string | null) {
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (!location) return;

    let latitude: number;
    let longitude: number;

    const match = location.match(/POINT\(([^ ]+) ([^ ]+)\)/);

    if (match) {
      longitude = parseFloat(match[1]);
      latitude = parseFloat(match[2]);

      setCoords({
        latitude,
        longitude,
      });

      return;
    }

    // ✅ Try WKB fallback
    const parsed = parseWKBPoint(location);

    if (parsed) {
      setCoords(parsed);
    }
  }, [location]);

  return coords;
}
