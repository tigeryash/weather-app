"use client";
import React, { useEffect } from "react";
import { Location } from "@/types/locationTypes";
import { useWeatherForCurrentLocation } from "@/hooks/useWeatherQueries";
import { WeatherData } from "@/types/weatherTypes";
import { useLocationStore } from "@/stores/location-store";
import { useSearchStore } from "@/stores/search-store";
import WeatherHeader from "@/components/shared/weather-header";

const CurrentLocation = () => {
  const setIsInputFocused = useSearchStore((state) => state.setIsInputFocused);
  const loc = useLocationStore((state) => state.currentLocation) as Location | null;
  const setDisplayedLocation = useLocationStore(
    (state) => state.setDisplayedLocation
  );
  const displayedLocation = useLocationStore(
    (state) => state.displayedLocation
  );

  const weatherQuery = useWeatherForCurrentLocation(loc as Location);

  useEffect(() => {
    if (weatherQuery.isSuccess && loc) {
      setDisplayedLocation(loc);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherQuery.isSuccess, loc]);

  if (weatherQuery.isLoading) return <div>Loading...</div>;

  if (!weatherQuery.isSuccess) return null;

  const weatherData = weatherQuery.data;
  if (!weatherData || !("weather" in weatherData)) return null;

  return (
    <button
      className={`flex flex-col bg-black p-4 rounded-3xl text-white w-full box-border
        ${
          displayedLocation === loc
            ? "focus:outline focus:outline-4 focus:outline-gray-500"
            : ""
        }`}
      style={{
        boxShadow: displayedLocation === loc ? "0 0 0 4px #a0aec0" : "",
      }}
      onClick={() => {
        setDisplayedLocation(loc);
        setIsInputFocused(false);
      }}
      autoFocus
    >
      <WeatherHeader
        cityName={loc?.city || ""}
        temp={Math.round(weatherData.main.temp)}
        description={weatherData.weather[0]?.description || ""}
        tempMax={Math.round(weatherData.main.temp_max)}
        tempMin={Math.round(weatherData.main.temp_min)}
        isMyLocation
        variant="compact"
      />
    </button>
  );
};

export default CurrentLocation;
