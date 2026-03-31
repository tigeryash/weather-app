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
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const useSearchStore = create<SearchStoreType>((set) => ({
  search: "",
  searchResults: [],
  isInputFocused: false,
  chosen: null,
  setSearch: (search) => set({ search }),
  setSearchResults: (searchResults) => set({ searchResults }),
  setIsInputFocused: (isInputFocused) => set({ isInputFocused }),
  setChosen: (chosen) => set({ chosen }),
  handleInputChange: async (e: React.ChangeEvent<HTMLInputElement>) => {
    const sessionToken = crypto.randomUUID();
    try {
      const response = await fetch(
        `${API_BASE_URLS.MAPBOX}?q=${e.target.value}&language=en&poi_category=airport&types=city&session_token=${sessionToken}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`
      );
      const data = await response.json();
      if (!data.suggestions) {
        set({ searchResults: [] });
        return;
      }
      console.log(data)
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
}));
//{suggestion_id}?session_token={sessionToken}&access_token={your_token}