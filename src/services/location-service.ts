import type { Location, LocationSaved } from "@/types/locationTypes";
import { GEOLOCATION_ERROR_MESSAGE, API_BASE_URLS } from "@/lib/constants";

export function loadSavedLocations(): LocationSaved[] {
  const savedLocations = localStorage.getItem("locations");
  if (savedLocations) {
    try {
      return JSON.parse(savedLocations);
    } catch {
      return [];
    }
  }
  return [];
}

export function saveLocations(locations: LocationSaved[]): void {
  localStorage.setItem("locations", JSON.stringify(locations));
}

export function fetchCurrentLocation(): Promise<Location> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `${API_BASE_URLS.OPENCAGE}?q=${latitude}+${longitude}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`,
          );
          const data = await res.json();
          if (!data.results || data.results.length === 0) {
            reject({
              loaded: true,
              code: 0,
              message: "No location results found",
            });
            return;
          }
          const { components } = data.results[0];
          resolve({
            loaded: true,
            coordinates: { lat: `${latitude}`, lng: `${longitude}` },
            city:
              components.city ||
              components.town ||
              components.village ||
              "Unknown",
            country_code: components["ISO_3166-1_alpha-2"],
            timestamp: data.timestamp.created_http,
          });
        } catch {
          reject({
            loaded: true,
            code: 0,
            message: "Failed to fetch location data",
          });
        }
      },
      () => {
        reject({
          loaded: true,
          code: 0,
          message: GEOLOCATION_ERROR_MESSAGE,
        });
      },
    );
  });
}
