import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../server/actions";
import type { WeatherData } from "../types/weatherTypes";
import type { LocationSaved, Location } from "../types/locationTypes";
import { WEATHER_CONFIG } from "../lib/constants";

export const useWeatherForSavedLocation = (loc: LocationSaved) => {
  const { data, isLoading, isSuccess, isFetching } = useQuery<WeatherData>({
    queryKey: ["weather", JSON.stringify(loc)],
    queryFn: () => {
      if (loc.lat && loc.lng) {
        return getWeather(loc.lat, loc.lng);
      }
      return Promise.resolve({
        cod: 0,
        message: "Missing coordinates",
      } as WeatherData);
    },
    enabled: !!loc.lat && !!loc.lng,
    staleTime: WEATHER_CONFIG.STALE_TIME,
    refetchInterval: WEATHER_CONFIG.REFRESH_INTERVAL,
  });
  return { data, isLoading, isSuccess, isFetching };
};

export const useWeatherForCurrentLocation = (loc: Location) => {
  const { data, isLoading, isSuccess, isFetching, refetch } =
    useQuery<WeatherData>({
      queryKey: [
        "currentWeather",
        loc?.coordinates?.lat,
        loc?.coordinates?.lng,
      ],
      queryFn: () => getWeather(loc.coordinates.lat, loc.coordinates.lng),
      enabled: !!loc?.coordinates?.lat && !!loc?.coordinates?.lng,
      staleTime: WEATHER_CONFIG.STALE_TIME,
      refetchInterval: WEATHER_CONFIG.REFRESH_INTERVAL,
    });

  return { data, isLoading, isSuccess, isFetching, refetch };
};

export const useWeather = (loc: Location | LocationSaved | null) => {
  const lat =
    loc && "coordinates" in loc
      ? loc.coordinates.lat
      : (loc as LocationSaved | null)?.lat;
  const lon =
    loc && "coordinates" in loc
      ? loc.coordinates.lng
      : (loc as LocationSaved | null)?.lng;

  const { data, isLoading, isSuccess, isFetching, refetch } =
    useQuery<WeatherData>({
      queryKey: ["weather", lat, lon],
      queryFn: () => {
        if (lat == null || lon == null) {
          return Promise.reject(new Error("Missing coordinates"));
        }

        return getWeather(lat, lon);
      },
      enabled: lat != null && lon != null,
      staleTime: WEATHER_CONFIG.STALE_TIME,
      refetchInterval: WEATHER_CONFIG.REFRESH_INTERVAL,
    });

  return { data, isLoading, isSuccess, isFetching, refetch };
};
