import { useState, useEffect } from "react";
import { locationSaved } from "@/types/locationTypes";
import Wind from "./main/wind";
import Feels from "./main/feels";
import Sunrise from "./main/sunrise";
import Pressure from "./main/pressure";
import Visibility from "./main/visibility";
import Humidity from "./main/humidity";
import { useWeatherForSavedLocation } from "@/hooks/useWeatherQueries";
import { WeatherData, WeatherDataError } from "@/types/weatherTypes";
import { AnimatePresence, motion } from "framer-motion";
import { useLocationStore } from "@/stores/location-store";

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  chosen: locationSaved | null;
};

const WeatherModal = ({ chosen, isOpen, closeModal }: ModalProps) => {
  const locations = useLocationStore((state) => state.locations);
  const setSavedLocations = useLocationStore(
    (state) => state.setSavedLocations
  );
  const setIsInputFocused = useLocationStore(
    (state) => state.setIsInputFocused
  );
  const { data, isFetching, isSuccess } = useWeatherForSavedLocation(
    chosen as locationSaved
  );
  const [weatherData, setWeatherData] = useState<
    WeatherData | WeatherDataError | undefined
  >(undefined);

  useEffect(() => {
    if (isSuccess) {
      setWeatherData(data as WeatherData);
    }
  }, [data, isSuccess]);

  const addData = () => {
    const locationstemp = [...locations, chosen as locationSaved];
    setSavedLocations(locationstemp);
    setIsInputFocused(false);
    closeModal();
  };

  if (!isOpen) {
    return null;
  }

  if (isFetching) return <div>Loading...</div>;

  if (weatherData === undefined) return <div>Weather data is undefined</div>;

  if (weatherData)
    return (
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
        onClick={(e) => {
          e.stopPropagation();
          closeModal();
        }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.section
              className="flex flex-col justify-start text-white w-2/4 overflow-y-auto bg-black
                            rounded-2xl p-4 box-border"
              style={{ maxHeight: "80vh" }}
              initial={{ y: "100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "100vh" }}
              transition={{ ease: "easeInOut", duration: 0.4 }}
            >
              <div className="flex justify-between">
                <button className="text-white text-lg" onClick={closeModal}>
                  Cancel
                </button>
                {!locations.some(
                  (location) =>
                    location.city === chosen?.city &&
                    location.country === chosen?.country
                ) && (
                  <button className="text-white text-lg" onClick={addData}>
                    Add
                  </button>
                )}
              </div>
              {isSuccess && "weather" in weatherData && (
                <>
                  <div>
                    {chosen !== null && "city" in chosen ? (
                      <div className="text-center">
                        <p className="text-4xl uppercase">{chosen?.city}</p>
                        <h3 className="text-5xl font-thin">
                          {Math.round(weatherData.main.temp)}&deg;
                        </h3>
                        <p className="text-2xl capitalize">
                          {weatherData.weather[0]?.description}
                        </p>
                        <p>
                          <span className="mr-4 text-2xl">
                            H:{Math.round(weatherData.main.temp_max)}&deg;
                          </span>
                          <span className="text-2xl">
                            L:{Math.round(weatherData.main.temp_min)}&deg;
                          </span>
                        </p>
                      </div>
                    ) : (
                      <p className="text-black text-lg font-semibold">
                        MyLocation
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-6 w-full px-20">
                    <Wind
                      deg={weatherData.wind.deg}
                      speed={weatherData.wind.speed}
                    />
                    <Feels feels={weatherData.main.feels_like} />
                    <Sunrise
                      rise={weatherData.sys.sunrise}
                      set={weatherData.sys.sunset}
                      timezone={`${weatherData.timezone}`}
                    />
                    <Pressure pressure={weatherData.main.pressure} />
                    <Humidity humid={weatherData.main.humidity} />
                    <Visibility visible={weatherData.visibility} />
                  </div>
                </>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    );
};

export default WeatherModal;
