import type {
  Location,
  LocationError,
  LocationSaved,
} from "@/types/locationTypes";
import { create } from "zustand";
import {
  loadSavedLocations,
  saveLocations,
  fetchCurrentLocation,
} from "@/services/location-service";
import { GEOLOCATION_ERROR_MESSAGE } from "@/lib/constants";

type NavigableLocation = Location | LocationSaved;

const isSameLocation = (
  a: Location | LocationSaved | null,
  b: Location | LocationSaved | null,
) => {
  if (!a || !b) return false;
  if ("timestamp" in a && "timestamp" in b) return a.timestamp === b.timestamp;
  if ("id" in a && "id" in b) return a.id === b.id;
  return false;
};

type LocationStoreType = {
  currentLocation: Location | null;
  setCurrentLocation: (location: Location | null) => void;
  locations: LocationSaved[];
  getSavedLocations: () => void;
  setSavedLocations: (locations: LocationSaved[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  displayedLocation: Location | LocationSaved | null;
  pendingLocation: Location | LocationSaved | null;
  setDisplayedLocation: (location: Location | LocationSaved | null) => void;
  commitDisplayedLocation: () => void;
  error: LocationError | null;
  onError: () => void;
  getLocation: () => void;
  deleteLocation: (location: LocationSaved) => void;
  getNavigableLocations: () => NavigableLocation[];
  navigateToNext: () => void;
  navigateToPrev: () => void;
};

export const useLocationStore = create<LocationStoreType>((set, get) => ({
  locations: [],
  loading: true,
  displayedLocation: null,
  pendingLocation: null,
  currentLocation: null,
  error: null,
  setDisplayedLocation: (location) => {
    const { displayedLocation, pendingLocation } = get();

    if (
      isSameLocation(location, displayedLocation) ||
      isSameLocation(location, pendingLocation)
    ) {
      return;
    }

    set({ pendingLocation: location });
  },
  commitDisplayedLocation: () => {
    const pending = get().pendingLocation;
    if (pending) {
      set({ displayedLocation: pending, pendingLocation: null });
    }
  },
  setLoading: (loading) => set({ loading }),
  setCurrentLocation: (currentLocation) => set({ currentLocation }),
  deleteLocation: (location) => {
    const locations = get().locations.filter((loc) => loc.id !== location.id);
    set({ locations });
    get().setSavedLocations(locations);
  },
  getSavedLocations: () => {
    set({ locations: loadSavedLocations() });
  },
  setSavedLocations: (locations) => {
    saveLocations(locations);
    set({ locations });
  },
  onError: () => {
    set({
      error: { loaded: true, code: 0, message: GEOLOCATION_ERROR_MESSAGE },
    });
    set({ loading: false });
  },
  getLocation: () => {
    fetchCurrentLocation()
      .then((location) => {
        set({ currentLocation: location });
        set({ displayedLocation: location });
        set({ loading: false });
      })
      .catch((error: LocationError) => {
        set({ error });
        set({ loading: false });
      });
  },
  getNavigableLocations: () => {
    const { currentLocation, locations } = get();
    const result: NavigableLocation[] = [];
    if (currentLocation) result.push(currentLocation);
    result.push(...locations);
    return result;
  },
  navigateToNext: () => {
    const navList = get().getNavigableLocations();
    if (navList.length <= 1) return;
    const displayed = get().displayedLocation;
    const idx = displayed
      ? navList.findIndex((loc) => {
          if ("timestamp" in loc && "timestamp" in displayed)
            return loc.timestamp === displayed.timestamp;
          if ("id" in loc && "id" in displayed) return loc.id === displayed.id;
          return false;
        })
      : -1;
    if (idx >= navList.length - 1) return;
    const nextIdx = idx < 0 ? 0 : idx + 1;
    get().setDisplayedLocation(navList[nextIdx]);
  },
  navigateToPrev: () => {
    const navList = get().getNavigableLocations();
    if (navList.length <= 1) return;
    const displayed = get().displayedLocation;
    const idx = displayed
      ? navList.findIndex((loc) => {
          if ("timestamp" in loc && "timestamp" in displayed)
            return loc.timestamp === displayed.timestamp;
          if ("id" in loc && "id" in displayed) return loc.id === displayed.id;
          return false;
        })
      : -1;
    if (idx <= 0) return;
    const prevIdx = idx - 1;
    get().setDisplayedLocation(navList[prevIdx]);
  },
}));
