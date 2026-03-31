import { LocationSaved, SearchType } from "@/types/locationTypes";
import { create } from "zustand";
import { API_BASE_URLS } from "@/lib/constants";

type SearchStoreType = {
  search: string;
  setSearch: (search: string) => void;
  setSearchResults: (searchResults: LocationSaved[]) => void;
  searchResults: LocationSaved[];
  isInputFocused: boolean;
  setIsInputFocused: (isInputFocused: boolean) => void;
  chosen: LocationSaved | null;
  setChosen: (chosen: LocationSaved | null) => void;
  sessionToken: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  retrieveLocation: (mapboxId: string) => Promise<{ lat: string; lng: string } | null>;
  selectResult: (result: LocationSaved) => Promise<LocationSaved | null>;
};

export const useSearchStore = create<SearchStoreType>((set, get) => ({
  search: "",
  searchResults: [],
  isInputFocused: false,
  chosen: null,
  sessionToken: crypto.randomUUID(),
  setSearch: (search) => set({ search }),
  setSearchResults: (searchResults) => set({ searchResults }),
  setIsInputFocused: (isInputFocused) => {
    set({ isInputFocused });
    if (!isInputFocused) {
      set({ search: "", searchResults: [], sessionToken: crypto.randomUUID() });
    }
  },
  setChosen: (chosen) => set({ chosen }),
  handleInputChange: async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { sessionToken } = get();
    try {
      const response = await fetch(
        `${API_BASE_URLS.MAPBOX}?q=${e.target.value}&language=en&poi_category=airport&types=city&session_token=${sessionToken}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`
      );
      const data = await response.json();
      if (!data.suggestions) {
        set({ searchResults: [] });
        return;
      }
      const results = data.suggestions.map((result: SearchType) => ({
        id: result.mapbox_id,
        city: result.name,
        country: result.context.country.name,
        region: result.context.region?.name,
      }));
      set({ searchResults: results });
    } catch {
      set({ searchResults: [] });
    }
  },
  retrieveLocation: async (mapboxId: string): Promise<{ lat: string; lng: string } | null> => {
    const { sessionToken } = get();
    try {
      const response = await fetch(
        `${API_BASE_URLS.MAPBOX_RETRIEVE}/${mapboxId}?session_token=${sessionToken}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`
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
  },
  selectResult: async (result: LocationSaved) => {
    const coords = await get().retrieveLocation(result.id);
    if (!coords) return null;
    const locationWithCoords: LocationSaved = {
      ...result,
      lat: coords.lat,
      lng: coords.lng,
    };
    set({ chosen: locationWithCoords });
    return locationWithCoords;
  },
}));
