"use client";
import React, { useEffect, useState } from "react";
import { WeatherData, WeatherDataError } from "../../types/weatherTypes";
import { useWeatherForCurrentLocation } from "@/hooks/useWeatherQueries";
import { location } from "@/types/locationTypes";
import Visibility from "./visibility";
import Humidity from "./humidity";
import Pressure from "./pressure";
import Sunrise from "./sunrise";
import Feels from "./feels";
import Wind from "./wind";
import { useLocationStore } from "@/stores/location-store";
import WeatherLoading from "./weather-loading";
import { motion, useAnimation } from "framer-motion";

const Weather = () => {
  const displayedLocation = useLocationStore(
    (state) => state.displayedLocation
  );
  const currentLocation = useLocationStore((state) => state.currentLocation);
  const { data, isFetching, isSuccess, refetch } = useWeatherForCurrentLocation(
    displayedLocation as location
  );
  const [weatherData, setWeatherData] = useState<
    WeatherData | WeatherDataError | undefined
  >(undefined);

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
    if (isSuccess) {
      setWeatherData(data as WeatherData);
    }
  }, [data, isSuccess, displayedLocation]);

  useEffect(() => {
    const timer = setInterval(() => {
      refetch();
    }, 1000 * 60 * 10);

    return () => clearTimeout(timer);
  }, [refetch]);

  if (isFetching) return <WeatherLoading />;

  if (weatherData === undefined) return <div>Weather data is undefined</div>;
  if (isSuccess && "weather" in weatherData) {
    return (
      <motion.main
        animate={controls}
        className="flex flex-col overflow-y-auto items-center w-full text-white md:w-3/4 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-neutral-900/90 "
        style={{ height: "100vh" }}
      >
        <>
          <div className="pt-12 md:pt-16 pb-8 md:pb-18 lg:pb-20">
            {displayedLocation !== null && "city" in displayedLocation ? (
              "timestamp" in displayedLocation &&
              displayedLocation.timestamp === currentLocation?.timestamp ? (
                <div className="text-center">
                  <p className="text-3xl md:text-4xl">My Location</p>
                  <p className="text-sm md:text-base uppercase font-semibold">
                    {displayedLocation?.city}
                  </p>
                  <h3 className="text-7xl md:text-8xl font-extralight ">
                    {Math.round(weatherData.main.temp)}&deg;
                  </h3>
                  <p className="text-lg md:text-2xl capitalize">
                    {weatherData.weather[0]?.description}
                  </p>
                  <p>
                    <span className="mr-4 text-lg md:text-2xl">
                      H:{Math.round(weatherData.main.temp_max)}&deg;
                    </span>
                    <span className="text-lg md:text-2xl">
                      L:{Math.round(weatherData.main.temp_min)}&deg;
                    </span>
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-3xl md:text-4xl">
                    {displayedLocation?.city}
                  </p>
                  <h3 className="text-7xl md:text-8xl font-extralight ">
                    {Math.round(weatherData.main.temp)}&deg;
                  </h3>
                  <p className="text-lg md:text-2xl capitalize">
                    {weatherData.weather[0]?.description}
                  </p>
                  <p>
                    <span className="mr-4 text-lg md:text-2xl">
                      H:{Math.round(weatherData.main.temp_max)}&deg;
                    </span>
                    <span className="text-lg md:text-2xl">
                      L:{Math.round(weatherData.main.temp_min)}&deg;
                    </span>
                  </p>
                </div>
              )
            ) : null}
          </div>
          <div className="grid xl:grid-cols-4 grid-cols-2 gap-2 md:gap-6 w-full p-4 md:p-8 lg:p-12 xl:p-8">
            <div className="col-span-2">
              <Wind deg={weatherData.wind.deg} speed={weatherData.wind.speed} />
            </div>

            <div className="col-span-1 ">
              <Feels feels={weatherData.main.feels_like} />
            </div>
            <div className="col-span-1">
              <Sunrise
                rise={weatherData.sys.sunrise}
                set={weatherData.sys.sunset}
                timezone={`${weatherData.timezone}`}
              />
            </div>
            <div className="col-span-1 ">
              <Pressure pressure={weatherData.main.pressure} />
            </div>
            <div className="col-span-1 ">
              <Humidity humid={weatherData.main.humidity} />
            </div>

            <div className="col-span-1">
              <Visibility visible={weatherData.visibility} />
            </div>
          </div>
        </>
      </motion.main>
    );
  }
};

export default Weather;
