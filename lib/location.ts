import * as Location from "expo-location";

let permissionGranted = false;

export async function getAddressFromCoords(
  latitude: number,
  longitude: number,
): Promise<string | null> {
  try {
    // ✅ Request permission ONCE
    if (!permissionGranted) {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.warn("Location permission denied");
        return null;
      }

      permissionGranted = true;
    }

    // ✅ Reverse geocode
    const response = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (response.length > 0) {
      const item = response[0];

      return [item.name, item.city, item.region, item.postalCode]
        .filter(Boolean)
        .join(", ");
    }

    return null;
  } catch (error) {
    console.error("Reverse geocode failed:", error);
    return null;
  }
}

export function parseWKBPoint(
  wkb: string,
): { latitude: number; longitude: number } | null {
  try {
    // WKB is hex encoded - each byte is 2 hex chars
    // Structure: 1 byte order + 4 type + 4 SRID + 8 longitude + 8 latitude
    // Skip first 10 chars (byte order + type) + 8 chars (SRID flag)

    if (!wkb) {
      return null;
    }
    const isLittleEndian = wkb.substring(0, 2) === "01";

    // Skip: 1 byte order (2) + 4 type (8) + 4 SRID (8) = 18 chars
    const lngHex = wkb.substring(18, 34);
    const latHex = wkb.substring(34, 50);

    function hexToDouble(hex: string, littleEndian: boolean): number {
      const bytes = new Uint8Array(8);
      for (let i = 0; i < 8; i++) {
        bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
      }
      if (!littleEndian) bytes.reverse();
      const view = new DataView(bytes.buffer);
      return view.getFloat64(0, true);
    }

    const longitude = hexToDouble(lngHex, isLittleEndian);
    const latitude = hexToDouble(latHex, isLittleEndian);

    return { latitude, longitude };
  } catch {
    return null;
  }
}

export function decimalToDMS(value: number | string, type: "lat" | "lng") {
  if (!value) {
    return null;
  }
  if (typeof value === "string") {
    value = parseFloat(value);
  }
  const absolute = Math.abs(value);

  const degrees = Math.floor(absolute);

  const minutesFull = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesFull);

  const seconds = ((minutesFull - minutes) * 60).toFixed(2);

  let direction;

  if (type === "lat") {
    direction = value >= 0 ? "N" : "S";
  } else {
    direction = value >= 0 ? "E" : "W";
  }

  return `${degrees}°${minutes}'${seconds}"${direction}`;
}
