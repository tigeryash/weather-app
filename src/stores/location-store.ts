import { location, locationError, locationSaved } from "@/types/locationTypes";
import { create } from "zustand";
import axios from "axios";

type LocationStoreType = {
  currentLocation: location | null;
  setCurrentLocation: (location: location | null) => void;
  locations: locationSaved[];
  getSavedLocations: () => void;
  setSavedLocations: (locations: locationSaved[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  displayedLocation: location | locationSaved | null;
  setDisplayedLocation: (location: location | locationSaved | null) => void;
  isInputFocused: boolean;
  error: locationError | null;
  onError: () => void;
  getLocation: () => void;
};

export const useLocationStore = create<LocationStoreType>((set) => ({
  locations: [],
  loading: true,
  displayedLocation: null,
  isInputFocused: false,
  currentLocation: null,
  error: null,
  setDisplayedLocation: (displayedLocation) => set({ displayedLocation }),
  setLoading: (loading) => set({ loading }),
  setCurrentLocation: (currentLocation) => set({ currentLocation }),
  getSavedLocations: () => {
    const savedLocations = localStorage.getItem("locations");
    if (savedLocations) {
      set({ locations: JSON.parse(savedLocations) });
    }
  },
  setSavedLocations: (locations) => {
    localStorage.setItem("locations", JSON.stringify(locations));
    set({ locations });
  },
  onError: () => {
    set({
      error: { loaded: true, code: 0, message: "Geolocation not supported" },
    });
    set({ loading: false });
  },
  getLocation: () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        const res = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`
        );
        const { components } = res.data.results[0];
        const temp = {
          loaded: true,
          coordinates: { lat: `${latitude}`, lng: `${longitude}` },
          city: components.city || components.town || components.village,
          country_code: components["ISO_3166-1_alpha-2"],
          timestamp: res.data.timestamp.created_http,
        };
        console.log(temp);
        set({ currentLocation: temp });
        set({ displayedLocation: temp });
        set({ loading: false });
      },
      () => {
        set({
          error: {
            loaded: true,
            code: 0,
            message: "Geolocation not supported",
          },
        });
        set({ loading: false });
      }
    );
  },
}));
