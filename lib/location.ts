import * as Location from "expo-location";

export async function getAddressFromCoords(
  latitude: number,
  longitude: number,
): Promise<string | null> {
  try {
    const response = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (response.length > 0) {
      const item = response[0];
      return `${item.name} ${item.city} ${item.region} ${item.postalCode}`;
    }
    return null;
  } catch {
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
