import type { LocationSaved } from "@/types/locationTypes";
import { create } from "zustand";
import {
  fetchSuggestions,
  retrieveCoordinates,
} from "@/services/search-service";

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
  debounceTimer: number | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  retrieveLocation: (
    mapboxId: string,
  ) => Promise<{ lat: string; lng: string } | null>;
  selectResult: (result: LocationSaved) => Promise<LocationSaved | null>;
};

export const useSearchStore = create<SearchStoreType>((set, get) => ({
  search: "",
  searchResults: [],
  isInputFocused: false,
  chosen: null,
  sessionToken: crypto.randomUUID(),
  debounceTimer: null,
  setSearch: (search) => set({ search }),
  setSearchResults: (searchResults) => set({ searchResults }),
  setIsInputFocused: (isInputFocused) => {
    const { debounceTimer } = get();
    if (debounceTimer !== null) clearTimeout(debounceTimer);
    set({ isInputFocused });
    if (!isInputFocused) {
      set({
        search: "",
        searchResults: [],
        sessionToken: crypto.randomUUID(),
        debounceTimer: null,
      });
    }
  },
  setChosen: (chosen) => set({ chosen }),
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {
    const { debounceTimer, sessionToken } = get();
    if (debounceTimer !== null) clearTimeout(debounceTimer);
    const query = e.target.value;
    set({ search: query });
    const timer = setTimeout(async () => {
      const results = await fetchSuggestions(query, sessionToken);
      set({ searchResults: results });
    }, 300);
    set({ debounceTimer: timer as unknown as number });
  },
  retrieveLocation: async (
    mapboxId: string,
  ): Promise<{ lat: string; lng: string } | null> => {
    const { sessionToken } = get();
    return retrieveCoordinates(mapboxId, sessionToken);
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
