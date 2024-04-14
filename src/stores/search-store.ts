import { locationSaved, searchType } from "@/types/locationTypes";
import { create } from "zustand";
import axios from "axios";

type SearchStoreType = {
  search: string;
  setSearch: (search: string) => void;
  setSearchResults: (searchResults: searchType[]) => void;
  searchResults: searchType[];
  isInputFocused: boolean;
  setIsInputFocused: (isInputFocused: boolean) => void;
  chosen: locationSaved | null;
  setChosen: (chosen: locationSaved | null) => void;
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
    const response = await axios.get(
      `https://api.mapbox.com/search/searchbox/v1/suggest?q=${e.target.value}&language=en&poi_category=airport&types=city&session_token=0c2cd92b-8d08-4eb1-88c4-29de688008d6&access_token=pk.eyJ1IjoidGlnZXJ5YXNoIiwiYSI6ImNscHVvYmI5cDBsdWQyanJwZzhuYXNzeDgifQ.rUfOeYvhCPX6wVv4CjgouQ`
    );
    const results = response.data.suggestions.map((result: searchType) => {
      return {
        name: result.name,
        place_formatted: result.place_formatted,
        mapbox_id: result.mapbox_id,
      };
    });
    set({ searchResults: results });
  },
}));
