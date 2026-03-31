import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../server/actions";
import { WeatherData } from "../types/weatherTypes";
import { LocationSaved, Location } from "../types/locationTypes";
import { WEATHER_CONFIG } from "../lib/constants";

export const useWeatherForSavedLocation = (loc: LocationSaved) => {
  const { data, isLoading, isSuccess, isFetching } = useQuery<WeatherData>({
    queryKey: ["weather", JSON.stringify(loc)],
    queryFn: () => getWeather(loc.city, loc.country),
    enabled: loc.city !== "",
    staleTime: WEATHER_CONFIG.STALE_TIME,
    refetchInterval: WEATHER_CONFIG.REFRESH_INTERVAL,
  });
  return { data, isLoading, isSuccess, isFetching };
};

export const useWeatherForCurrentLocation = (loc: Location) => {
  const { data, isLoading, isSuccess, isFetching, refetch } =
    useQuery<WeatherData>({
      queryKey: ["currentWeather", loc?.city, loc?.country_code],
      queryFn: () => getWeather(loc.city, loc.country_code),
      staleTime: WEATHER_CONFIG.STALE_TIME,
      refetchInterval: WEATHER_CONFIG.REFRESH_INTERVAL,
    });

  return { data, isLoading, isSuccess, isFetching, refetch };
};
