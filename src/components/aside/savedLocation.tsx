"use client";
import type { LocationSaved } from "@/types/locationTypes";
import { useWeatherForSavedLocation } from "@/hooks/useWeatherQueries";
import { useLocationStore } from "@/stores/location-store";
import { motion } from "motion/react";
import { useSearchStore } from "@/stores/search-store";
import WeatherHeader from "@/components/shared/weather-header";

type LocationProps = {
  loc: LocationSaved;
  setDragOffset: (offset: number) => void;
  dragOffset: number;
};

const SavedLocation = ({ loc, setDragOffset, dragOffset }: LocationProps) => {
  const setIsInputFocused = useSearchStore((state) => state.setIsInputFocused);
  const displayedLocation = useLocationStore(
    (state) => state.displayedLocation,
  );
  const setDisplayedLocation = useLocationStore(
    (state) => state.setDisplayedLocation,
  );
  const weatherQuery = useWeatherForSavedLocation(loc as LocationSaved);

  if (weatherQuery.isLoading) return <div>Loading...</div>;

  if (!weatherQuery.isSuccess) return null;

  const weatherData = weatherQuery.data;
  if (!weatherData || !("weather" in weatherData)) return null;

  return (
    <motion.button
      drag="x"
      dragMomentum={false}
      dragConstraints={{ left: 0, right: 0 }}
      onDrag={(_event, info) => {
        setDragOffset(info.offset.x);
      }}
      dragElastic={{
        right: 0,
        left: 0.5,
      }}
      onDragEnd={() => {
        if (dragOffset < 0) {
          setDragOffset(-100);
        } else {
          setDragOffset(0);
        }
      }}
      className={`flex flex-col bg-black p-4 rounded-3xl text-white mt-4 w-[448px] box-border
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
    >
      <WeatherHeader
        cityName={loc.city}
        temp={Math.round(weatherData.main.temp)}
        description={weatherData.weather[0]?.description || ""}
        tempMax={Math.round(weatherData.main.temp_max)}
        tempMin={Math.round(weatherData.main.temp_min)}
        variant="compact"
      />
    </motion.button>
  );
};

export default SavedLocation;
