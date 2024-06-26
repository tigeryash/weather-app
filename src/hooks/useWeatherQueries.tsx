import { useQuery } from "@tanstack/react-query";
import { getWeather, getWeatherForCurrentLocation } from "../server/actions";
import { WeatherData, WeatherDataError } from "../types/weatherTypes";
import { locationSaved, location } from "../types/locationTypes";

export const useWeatherForSavedLocation = (location: locationSaved) => {
  const { data, isLoading, isSuccess, isFetching } = useQuery<
    WeatherData | WeatherDataError
  >({
    queryKey: ["weather", JSON.stringify(location)],
    queryFn: () => getWeather(location.city, location.country),
    enabled: location.city !== "",
    staleTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 60 * 10,
  });
  return { data, isLoading, isSuccess, isFetching };
};

export const useWeatherForCurrentLocation = (location: location) => {
  const { data, isLoading, isSuccess, isFetching, refetch } = useQuery<
    WeatherData | WeatherDataError
  >({
    queryKey: [JSON.stringify(location.timestamp)],
    queryFn: () =>
      getWeatherForCurrentLocation(location.city, location.country_code),
    enabled: location.loaded,
    staleTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 60 * 10,
  });

  return { data, isLoading, isSuccess, isFetching, refetch };
};
