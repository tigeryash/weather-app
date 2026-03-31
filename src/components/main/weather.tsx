"use client";
import React, { useEffect, useState } from "react";
import { WeatherData } from "@/types/weatherTypes";
import { useWeatherForCurrentLocation } from "@/hooks/useWeatherQueries";
import { Location, LocationSaved } from "@/types/locationTypes";
import { useLocationStore } from "@/stores/location-store";
import WeatherLoading from "@/components/main/weather-loading";
import { motion, useAnimation } from "motion/react";
import WeatherHeader from "@/components/shared/weather-header";
import WeatherDetailGrid from "@/components/shared/weather-detail-grid";

const Weather = () => {
  const displayedLocation = useLocationStore(
    (state) => state.displayedLocation
  ) as Location | LocationSaved | null;
  const currentLocation = useLocationStore(
    (state) => state.currentLocation
  ) as Location | null;
  const { data, isFetching, isSuccess } = useWeatherForCurrentLocation(
    displayedLocation as Location
  );
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(
    undefined
  );

  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start({ opacity: 0, scale: 0.95 });
      await controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.1 },
      });
    };
    sequence();
  }, [displayedLocation, controls]);

  useEffect(() => {
    if (isSuccess && data && "weather" in data) {
      setWeatherData(data);
    }
  }, [data, isSuccess, displayedLocation]);

  if (isFetching) return <WeatherLoading />;

  if (!weatherData) return <div>Weather data is undefined</div>;

  if (!("weather" in weatherData)) {
    return (
      <main className="flex flex-col items-center justify-center w-full text-white md:w-3/4">
        <p className="text-2xl">Unable to load weather data</p>
      </main>
    );
  }

  const isMyLocation =
    displayedLocation !== null &&
    "city" in displayedLocation &&
    "timestamp" in displayedLocation &&
    displayedLocation.timestamp === currentLocation?.timestamp;

  return (
    <motion.main
      animate={controls}
      className="flex flex-col overflow-y-auto items-center w-full text-white md:w-3/4 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-neutral-900/90 h-screen"
    >
      <div className="pt-12 md:pt-16 pb-8 md:pb-18 lg:pb-20">
        {displayedLocation !== null && "city" in displayedLocation && (
          <WeatherHeader
            cityName={displayedLocation.city}
            temp={Math.round(weatherData.main.temp)}
            description={weatherData.weather[0]?.description || ""}
            tempMax={Math.round(weatherData.main.temp_max)}
            tempMin={Math.round(weatherData.main.temp_min)}
            isMyLocation={isMyLocation}
            variant="full"
          />
        )}
      </div>
      <WeatherDetailGrid
        data={weatherData}
        className="grid xl:grid-cols-4 grid-cols-2 gap-2 md:gap-6 w-full p-4 md:p-8 lg:p-12 xl:p-8"
      />
    </motion.main>
  );
};

export default Weather;
