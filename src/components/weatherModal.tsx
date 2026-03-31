"use client";
import { useState, useEffect } from "react";
import { LocationSaved } from "@/types/locationTypes";
import { useWeatherForSavedLocation } from "@/hooks/useWeatherQueries";
import { WeatherData } from "@/types/weatherTypes";
import { AnimatePresence, motion } from "motion/react";
import { useLocationStore } from "@/stores/location-store";
import { useSearchStore } from "@/stores/search-store";
import WeatherHeader from "@/components/shared/weather-header";
import WeatherDetailGrid from "@/components/shared/weather-detail-grid";

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  chosen: LocationSaved | null;
  cancelModal: () => void;
};

const WeatherModal = ({
  chosen,
  isOpen,
  closeModal,
  cancelModal,
}: ModalProps) => {
  const setDisplayedLocation = useLocationStore(
    (state) => state.setDisplayedLocation
  );
  const locations = useLocationStore((state) => state.locations);
  const setSavedLocations = useLocationStore(
    (state) => state.setSavedLocations
  );
  const setIsInputFocused = useSearchStore((state) => state.setIsInputFocused);
  const { data, isFetching, isSuccess } = useWeatherForSavedLocation(
    chosen as LocationSaved
  );

  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(
    undefined
  );

  useEffect(() => {
    if (isSuccess && data && "weather" in data) {
      setWeatherData(data);
    }
  }, [data, isSuccess]);

  const addData = () => {
    const locationsTemp = [...locations, chosen as LocationSaved];
    setSavedLocations(locationsTemp);
    closeModal();
    setIsInputFocused(false);
    setDisplayedLocation(chosen);
  };

  if (!isOpen) return null;

  if (isFetching) return <div>Loading...</div>;

  if (!weatherData || !("weather" in weatherData)) {
    return <div>Weather data is undefined</div>;
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={(e) => {
        e.stopPropagation();
        cancelModal();
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.section
            className="flex flex-col justify-start text-white w-2/4 overflow-y-auto bg-black rounded-2xl p-4 box-border"
            style={{ maxHeight: "80vh" }}
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            transition={{ ease: "easeInOut", duration: 0.4 }}
          >
            <div className="flex justify-between">
              <button className="text-white text-lg" onClick={cancelModal}>
                Cancel
              </button>
              {!locations.some(
                (loc) =>
                  loc.city === chosen?.city &&
                  loc.country === chosen?.country
              ) && (
                <button className="text-white text-lg" onClick={addData}>
                  Add
                </button>
              )}
            </div>
            <div>
              {chosen !== null && "city" in chosen ? (
                <WeatherHeader
                  cityName={chosen.city}
                  temp={Math.round(weatherData.main.temp)}
                  description={weatherData.weather[0]?.description || ""}
                  tempMax={Math.round(weatherData.main.temp_max)}
                  tempMin={Math.round(weatherData.main.temp_min)}
                  variant="modal"
                />
              ) : (
                <p className="text-black text-lg font-semibold">
                  MyLocation
                </p>
              )}
            </div>

            <WeatherDetailGrid
              data={weatherData}
              className="grid grid-cols-2 gap-2 md:gap-6 w-full px-20"
            />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeatherModal;
