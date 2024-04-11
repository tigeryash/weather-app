import { location, locationSaved } from "@/types/locationTypes";
import { create } from "zustand";

type LocationContextType = {
  currentLocation: location | null;
  locations: locationSaved[];
  loading: boolean;
  displayedLocation: location | locationSaved | null;
  isInputFocused: boolean;
};

export const useLocationStore = create<LocationContextType>((set) => ({
  locations: [],
  loading: false,
  displayedLocation: null,
  isInputFocused: false,
  currentLocation: null,
  getLocation: async () => {
    try {
      const position = await navigator.geolocation.getCurrentPosition((pos) => {
        set({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
      });
    } catch (error) {
      console.error("Error getting location:", error);
      // Handle location access error (optional)
    }
  },
}));
