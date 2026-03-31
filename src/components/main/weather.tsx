"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "motion/react";
import { useWeather } from "@/hooks/useWeatherQueries";
import type { WeatherData } from "@/types/weatherTypes";
import type { Location, LocationSaved } from "@/types/locationTypes";
import { useLocationStore } from "@/stores/location-store";
import WeatherLoading from "@/components/main/weather-loading";
import WeatherHeader from "@/components/shared/weather-header";
import WeatherDetailGrid from "@/components/shared/weather-detail-grid";

const hasWeather = (
  data: WeatherData | undefined,
): data is Extract<WeatherData, { cod: 200 }> => !!data && "weather" in data;

const SWIPE_THRESHOLD = 70;
const SWIPE_MAX_VERTICAL_DELTA = 48;
const MENU_TRIGGER_SELECTOR = '[data-menu-trigger="true"]';
const MENU_GUARD_SIZE = 96;

const getLocationKey = (loc: Location | LocationSaved | null): string => {
  if (!loc) return "none";
  if ("timestamp" in loc) return loc.timestamp;
  return loc.id;
};

const Weather = () => {
  const displayedLocation = useLocationStore(
    (state) => state.displayedLocation,
  ) as Location | LocationSaved | null;
  const pendingLocation = useLocationStore((state) => state.pendingLocation) as
    | Location
    | LocationSaved
    | null;
  const currentLocation = useLocationStore(
    (state) => state.currentLocation,
  ) as Location | null;
  const { data, isFetching } = useWeather(displayedLocation);
  const navigateToNext = useLocationStore((state) => state.navigateToNext);
  const navigateToPrev = useLocationStore((state) => state.navigateToPrev);
  const commitDisplayedLocation = useLocationStore(
    (state) => state.commitDisplayedLocation,
  );

  const weatherData = hasWeather(data) ? data : null;
  const controls = useAnimationControls();
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const transitionInFlightRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSlideDirection, setMobileSlideDirection] = useState<1 | -1>(1);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    controls.set({ opacity: 1, scale: 1, x: 0 });
  }, [controls]);

  useEffect(() => {
    const displayedKey = getLocationKey(displayedLocation);
    const pendingKey = getLocationKey(pendingLocation);

    if (isMobile && pendingLocation && displayedKey !== pendingKey) {
      commitDisplayedLocation();
      controls.set({ opacity: 1, scale: 1, x: mobileSlideDirection * 44 });
      void controls.start({
        opacity: 1,
        scale: 1,
        x: 0,
        transition: { duration: 0.18, ease: "easeOut" },
      });
      return;
    }

    if (
      !pendingLocation ||
      !displayedLocation ||
      displayedKey === pendingKey ||
      transitionInFlightRef.current
    ) {
      return;
    }

    let cancelled = false;

    const runTransition = async () => {
      transitionInFlightRef.current = true;

      await controls.start({
        opacity: 0,
        scale: 0.96,
        transition: { duration: 0.18, ease: "easeInOut" },
      });

      if (cancelled) return;

      commitDisplayedLocation();
      controls.set({ opacity: 0, scale: 0.96, x: 0 });

      requestAnimationFrame(() => {
        void controls.start({
          opacity: 1,
          scale: 1,
          x: 0,
          transition: { duration: 0.2, ease: "easeOut" },
        });
        transitionInFlightRef.current = false;
      });
    };

    void runTransition();

    return () => {
      cancelled = true;
    };
  }, [
    commitDisplayedLocation,
    controls,
    displayedLocation,
    isMobile,
    mobileSlideDirection,
    pendingLocation,
  ]);

  const isMyLocation =
    displayedLocation !== null &&
    "city" in displayedLocation &&
    "timestamp" in displayedLocation &&
    displayedLocation.timestamp === currentLocation?.timestamp;

  return (
    <motion.div
      onTouchStart={(event) => {
        if (!isMobile || transitionInFlightRef.current) return;

        const target = event.target;
        if (
          target instanceof HTMLElement &&
          target.closest(MENU_TRIGGER_SELECTOR)
        ) {
          touchStartRef.current = null;
          return;
        }

        const touch = event.touches[0];
        if (
          touch.clientX <= MENU_GUARD_SIZE &&
          touch.clientY <= MENU_GUARD_SIZE
        ) {
          touchStartRef.current = null;
          return;
        }
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={(event) => {
        if (
          !isMobile ||
          transitionInFlightRef.current ||
          !touchStartRef.current
        ) {
          return;
        }

        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - touchStartRef.current.x;
        const deltaY = touch.clientY - touchStartRef.current.y;
        touchStartRef.current = null;

        if (
          Math.abs(deltaX) < SWIPE_THRESHOLD ||
          Math.abs(deltaY) > SWIPE_MAX_VERTICAL_DELTA
        ) {
          return;
        }

        if (deltaX < 0) {
          setMobileSlideDirection(1);
          navigateToNext();
        } else {
          setMobileSlideDirection(-1);
          navigateToPrev();
        }
      }}
      style={{ touchAction: isMobile ? "pan-y" : "auto" }}
      className="h-screen w-full md:mx-auto md:w-3/4"
    >
      <motion.main
        animate={controls}
        className="flex h-full w-full flex-col items-center overflow-y-auto text-white scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-neutral-900/90"
      >
        {isFetching && !weatherData ? (
          <WeatherLoading />
        ) : weatherData &&
          displayedLocation !== null &&
          "city" in displayedLocation ? (
          <>
            <div className="pt-12 pb-8 md:pt-16 md:pb-18 lg:pb-20">
              <WeatherHeader
                cityName={displayedLocation.city}
                temp={Math.round(weatherData.main.temp)}
                description={weatherData.weather[0]?.description || ""}
                tempMax={Math.round(weatherData.main.temp_max)}
                tempMin={Math.round(weatherData.main.temp_min)}
                isMyLocation={isMyLocation}
                variant="full"
              />
            </div>
            <WeatherDetailGrid
              data={weatherData}
              className="grid w-full grid-cols-2 gap-2 p-4 md:gap-6 md:p-8 lg:p-12 xl:grid-cols-4 xl:p-8"
            />
          </>
        ) : (
          <div className="flex w-full flex-col items-center justify-center">
            <p className="text-2xl">Unable to load weather data</p>
          </div>
        )}
      </motion.main>
    </motion.div>
  );
};

export default Weather;
