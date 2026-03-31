import { useState } from "react";
import { FaWind } from "react-icons/fa";
import SectionContainer from "@/components/main/section-container";
import SectionHeader from "@/components/main/section-header";
import { WIND_SPEED_UNITS, WIND_CONVERSIONS } from "@/lib/constants";
import WindCompass from "@/components/main/wind-compass";

const Wind = ({ deg, speed }: { deg: number; speed: number }) => {
  const [currentUnit, setCurrentUnit] = useState(0);

  const units = WIND_SPEED_UNITS;
  const unit = units[currentUnit];

  const convertedSpeed = WIND_CONVERSIONS[unit](speed);

  const getDirection = (deg: number) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return directions[Math.round(deg / 22.5) % 16];
  };

  const handleClick = () => {
    setCurrentUnit((currentUnit + 1) % units.length);
  };

  return (
    <SectionContainer handleClick={handleClick}>
      <SectionHeader title="Wind">
        <FaWind className="icon" />
      </SectionHeader>

      <div className="flex justify-between mb-2 md:mb-7">
        <div className="h-20 md:h-32 w-[57%]">
          <div className="flex border-b py-2 md:py-4 border-white/60">
            <p className="text-4xl md:text-5xl mr-2">
              {convertedSpeed < 10
                ? `\u00A0${Math.round(convertedSpeed)}`
                : Math.round(convertedSpeed)}
            </p>

            <p className="flex flex-col justify-center">
              <span className="md:text-base text-xs uppercase">{unit}</span>
              <span className="md:text-base text-xs capitalize">wind</span>
            </p>
          </div>

          <div className="flex py-2 md:py-4">
            <p className="text-3xl md:text-5xl font-light mr-2">XX</p>

            <p className="flex flex-col justify-center">
              <span className="md:text-base text-xs uppercase">{unit}</span>
              <span className="md:text-base text-xs capitalize">gusts</span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center md:ml-6">
          <WindCompass deg={deg} direction={getDirection(deg)} />
        </div>
      </div>
    </SectionContainer>
  );
};
export default Wind;
