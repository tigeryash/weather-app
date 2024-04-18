import React from "react";
import { FiSunset } from "react-icons/fi";
import { FiSunrise } from "react-icons/fi";
import SectionContainer from "./section-container";
import SectionHeader from "./section-header";

const Sunrise = ({
  rise,
  set,
  timezone,
}: {
  rise: number;
  set: number;
  timezone: string;
}) => {
  const sunriseLocal = new Date(
    (rise + parseInt(timezone)) * 1000
  ).toISOString();
  const sunsetLocal = new Date((set + parseInt(timezone)) * 1000).toISOString();
  const sunriseLocal1 = new Date((rise + parseInt(timezone)) * 1000);
  const currentTime = new Date();

  const isDay = currentTime >= sunriseLocal1 && currentTime <= sunriseLocal1;

  return (
    <SectionContainer>
      <SectionHeader title={!isDay ? "Sunrise" : "Sunset"}>
        {!isDay ? (
          <FiSunrise className="icon" />
        ) : (
          <FiSunset className="icon" />
        )}
      </SectionHeader>

      <div className="h-20 md:h-32">
        <p className="text-2xl sm:3xl md:text-5xl font-light">
          {isDay
            ? new Date(sunsetLocal)
                .toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "UTC",
                })
                .replace(" AM", "AM")
                .replace(" PM", "PM")
            : new Date(sunriseLocal)
                .toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "UTC",
                })
                .replace(" AM", "AM")
                .replace(" PM", "PM")}
        </p>
      </div>

      <p className="min-h-[1em] text-xs md:text-base lg:text-lg">
        {!isDay
          ? `Sunset: ${new Date(sunsetLocal)
              .toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "UTC",
              })
              .replace(" AM", "AM")
              .replace(" PM", "PM")}`
          : `Sunrise: ${new Date(sunriseLocal)
              .toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "UTC",
              })
              .replace(" AM", "AM")
              .replace(" PM", "PM")}`}
      </p>
    </SectionContainer>
  );
};

export default Sunrise;
