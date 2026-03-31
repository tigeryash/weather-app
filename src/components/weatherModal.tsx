"use client";
import type { LocationSaved } from "@/types/locationTypes";
import { useWeatherForSavedLocation } from "@/hooks/useWeatherQueries";
import type { WeatherData } from "@/types/weatherTypes";
import { AnimatePresence, motion } from "motion/react";
import { useLocationStore } from "@/stores/location-store";
import { useSearchStore } from "@/stores/search-store";
import WeatherHeader from "@/components/shared/weather-header";
import WeatherDetailGrid from "@/components/shared/weather-detail-grid";

const hasWeather = (
  data: WeatherData | undefined,
): data is Extract<WeatherData, { cod: 200 }> => !!data && "weather" in data;

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
  const chosenLocation = chosen ?? { id: "", city: "", country: "" };
  const setDisplayedLocation = useLocationStore(
    (state) => state.setDisplayedLocation,
  );
  const locations = useLocationStore((state) => state.locations);
  const setSavedLocations = useLocationStore(
    (state) => state.setSavedLocations,
  );
  const setIsInputFocused = useSearchStore((state) => state.setIsInputFocused);
  const { data, isFetching } = useWeatherForSavedLocation(chosenLocation);

  const weatherData = hasWeather(data) ? data : null;

  const addData = () => {
    const locationsTemp = [...locations, chosenLocation];
    setSavedLocations(locationsTemp);
    closeModal();
    setIsInputFocused(false);
    setDisplayedLocation(chosenLocation);
  };

  if (!isOpen || !chosen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <button
        type="button"
        aria-label="Close weather modal"
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={cancelModal}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.section
            className="relative z-10 flex w-2/4 flex-col justify-start overflow-y-auto rounded-2xl bg-black p-4 text-white box-border"
            style={{ maxHeight: "80vh" }}
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            transition={{ ease: "easeInOut", duration: 0.4 }}
          >
            <div className="flex justify-between">
              <button
                type="button"
                className="text-white text-lg"
                onClick={cancelModal}
              >
                Cancel
              </button>
              {!locations.some((loc) => loc.id === chosen?.id) && (
                <button
                  type="button"
                  className="text-white text-lg"
                  onClick={addData}
                >
                  Add
                </button>
              )}
            </div>
            {isFetching && !weatherData ? (
              <p className="text-white text-center mt-8">Loading...</p>
            ) : !weatherData ? (
              <p className="text-white text-center mt-8">
                Unable to load weather data
              </p>
            ) : (
              <>
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
              </>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeatherModal;
