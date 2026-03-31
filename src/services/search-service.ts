import type { LocationSaved, SearchType } from "@/types/locationTypes";
import { API_BASE_URLS } from "@/lib/constants";

export async function fetchSuggestions(
  query: string,
  sessionToken: string,
): Promise<LocationSaved[]> {
  try {
    const response = await fetch(
      `${API_BASE_URLS.MAPBOX}?q=${query}&language=en&poi_category=airport&types=city&session_token=${sessionToken}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`,
    );
    const data = await response.json();
    if (!data.suggestions) return [];
    return data.suggestions.map((result: SearchType) => ({
      id: result.mapbox_id,
      city: result.name,
      country: result.context.country.name,
      region: result.context.region?.name,
    }));
  } catch {
    return [];
  }
}

export async function retrieveCoordinates(
  mapboxId: string,
  sessionToken: string,
): Promise<{ lat: string; lng: string } | null> {
  try {
    const response = await fetch(
      `${API_BASE_URLS.MAPBOX_RETRIEVE}/${mapboxId}?session_token=${sessionToken}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`,
    );
    const data = await response.json();
    if (!data.features || data.features.length === 0) return null;
    const feature = data.features[0];
    const [lng, lat] = feature.geometry.coordinates;
    return {
      lat: String(lat),
      lng: String(lng),
    };
  } catch {
    return null;
  }
}
