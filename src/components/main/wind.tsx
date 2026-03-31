import { useState } from "react";
import { FaWind } from "react-icons/fa";
import SectionContainer from "@/components/main/section-container";
import SectionHeader from "@/components/main/section-header";
import { motion } from "motion/react";
import { WIND_SPEED_UNITS, WIND_CONVERSIONS } from "@/lib/constants";

const Wind = ({ deg, speed }: { deg: number; speed: number }) => {
  const [currentUnit, setCurrentUnit] = useState(0);

  const units = WIND_SPEED_UNITS;
  const unit = units[currentUnit];

  const convertedSpeed = WIND_CONVERSIONS[unit](speed);

  const getDirection = (deg: number) => {
    const directions = [
      "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
      "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
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
              <span className="md:text-base text-xs uppercase">
                {unit}
              </span>
              <span className="md:text-base text-xs capitalize">wind</span>
            </p>
          </div>

          <div className="flex py-2 md:py-4">
            <p className="text-3xl md:text-5xl font-light mr-2">XX</p>

            <p className="flex flex-col justify-center">
              <span className="md:text-base text-xs uppercase">
                {unit}
              </span>
              <span className="md:text-base text-xs capitalize">gusts</span>
            </p>
          </div>
        </div>
        <div className="relative w-1/3 h-24 md:h-32 md:ml-6 text-center flex items-center justify-center">
          <motion.div
            className="absolute w-full h-full rounded-full border-2 border-white/60"
            style={{ rotate: deg }}
            animate={{ rotate: deg }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
          >
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full"
              whileHover={{ scale: 1.2 }}
            />
          </motion.div>
          <div className="absolute w-full h-full rounded-full border border-white/30" />
          <div className="absolute w-full h-full rounded-full border border-white/20 rotate-45" />
          <div className="absolute flex items-center justify-center p-2 rounded-full w-12 h-12 md:w-16 md:h-16 text-center text-base md:text-xl bg-white/10 backdrop-blur-sm">
            {getDirection(deg)}
          </div>
          {["N", "E", "S", "W"].map((direction, index) => (
            <div
              key={direction}
              className="absolute text-xs md:text-sm font-semibold"
              style={{
                transform: `rotate(${
                  index * 90
                }deg) translateY(-40px) rotate(-${index * 90}deg)`,
              }}
            >
              {direction}
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};
export default Wind;
