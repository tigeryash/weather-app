import { Location, LocationError, LocationSaved } from "@/types/locationTypes";
import { create } from "zustand";
import {
  GEOLOCATION_ERROR_MESSAGE,
  API_BASE_URLS,
} from "@/lib/constants";

type LocationStoreType = {
  currentLocation: Location | null;
  setCurrentLocation: (location: Location | null) => void;
  locations: LocationSaved[];
  getSavedLocations: () => void;
  setSavedLocations: (locations: LocationSaved[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  displayedLocation: Location | LocationSaved | null;
  setDisplayedLocation: (location: Location | LocationSaved | null) => void;
  error: LocationError | null;
  onError: () => void;
  getLocation: () => void;
  deleteLocation: (location: LocationSaved) => void;
};

export const useLocationStore = create<LocationStoreType>((set, get) => ({
  locations: [],
  loading: true,
  displayedLocation: null,
  currentLocation: null,
  error: null,
  setDisplayedLocation: (displayedLocation) => set({ displayedLocation }),
  setLoading: (loading) => set({ loading }),
  setCurrentLocation: (currentLocation) => set({ currentLocation }),
  deleteLocation: (location) => {
    const locations = get().locations.filter((loc) => loc.id !== location.id);
    set({ locations });
    get().setSavedLocations(locations);
  },
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
      error: { loaded: true, code: 0, message: GEOLOCATION_ERROR_MESSAGE },
    });
    set({ loading: false });
  },
  getLocation: () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `${API_BASE_URLS.OPENCAGE}?q=${latitude}+${longitude}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`
          );
          const data = await res.json();
          if (!data.results || data.results.length === 0) {
            set({
              error: {
                loaded: true,
                code: 0,
                message: "No location results found",
              },
            });
            set({ loading: false });
            return;
          }
          const { components } = data.results[0];
          const temp = {
            loaded: true,
            coordinates: { lat: `${latitude}`, lng: `${longitude}` },
            city:
              components.city ||
              components.town ||
              components.village ||
              "Unknown",
            country_code: components["ISO_3166-1_alpha-2"],
            timestamp: data.timestamp.created_http,
          };
          set({ currentLocation: temp });
          set({ displayedLocation: temp });
          set({ loading: false });
        } catch {
          set({
            error: {
              loaded: true,
              code: 0,
              message: "Failed to fetch location data",
            },
          });
          set({ loading: false });
        }
      },
      () => {
        set({
          error: {
            loaded: true,
            code: 0,
            message: GEOLOCATION_ERROR_MESSAGE,
          },
        });
        set({ loading: false });
      }
    );
  },
}));
