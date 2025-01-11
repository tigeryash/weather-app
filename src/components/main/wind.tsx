import { useState } from "react";
import { FaWind } from "react-icons/fa";
import { MdArrowDropUp } from "react-icons/md";
import SectionContainer from "./section-container";
import SectionHeader from "./section-header";
import { motion } from "framer-motion";

const Wind = ({ deg, speed }: { deg: number; speed: number }) => {
  //   const units = ["m/s", "km/h", "mph", "knots", "bft"];
  //   const [currentUnit, setCurrentUnit] = useState(0);

  //   const convertSpeed = (speed: number) => {
  //     switch (units[currentUnit]) {
  //       case "km/h":
  //         return speed * 3.6;
  //       case "mph":
  //         return speed * 2.237;
  //       case "knots":
  //         return speed * 1.944;
  //       case "bft":
  //         if (speed < 0.5) return 0;
  //         if (speed < 1.5) return 1;
  //         if (speed < 3.3) return 2;
  //         if (speed < 5.5) return 3;
  //         if (speed < 7.9) return 4;
  //         if (speed < 10.7) return 5;
  //         if (speed < 13.8) return 6;
  //         if (speed < 17.1) return 7;
  //         if (speed < 20.7) return 8;
  //         if (speed < 24.4) return 9;
  //         if (speed < 28.4) return 10;
  //         if (speed < 32.6) return 11;
  //         return 12;
  //       default:
  //         return speed;
  //     }
  //   };

  //   function getDirection(deg: number) {
  //     const directions = [
  //       "N",
  //       "NNE",
  //       "NE",
  //       "ENE",
  //       "E",
  //       "ESE",
  //       "SE",
  //       "SSE",
  //       "S",
  //       "SSW",
  //       "SW",
  //       "WSW",
  //       "W",
  //       "WNW",
  //       "NW",
  //       "NNW",
  //       "N",
  //     ];
  //     const index = Math.round(deg / 22.5) % 16;
  //     return directions[index];
  //   }

  //   const handleClick = () => {
  //     setCurrentUnit((currentUnit + 1) % units.length);
  //   };

  //   return (
  //     <SectionContainer handleClick={handleClick}>
  //       <SectionHeader title="Wind">
  //         <FaWind className="icon" />
  //       </SectionHeader>

  //       <div className="flex justify-between mb-2 md:mb-7">
  //         <div className="h-20 md:h-32 w-[57%]">
  //           <div className="flex border-b py-2 md:py-4 border-white/60">
  //             <p className="text-4xl md:text-5xl mr-2 ">
  //               {convertSpeed(speed) < 10
  //                 ? `\u00A0${Math.round(convertSpeed(speed))}`
  //                 : Math.round(convertSpeed(speed))}
  //             </p>

  //             <p className="flex flex-col justify-center">
  //               <span className="md:text-base text-xs uppercase">
  //                 {units[currentUnit]}
  //               </span>
  //               <span className="md:text-base text-xs capitalize">wind</span>
  //             </p>
  //           </div>

  //           <div className="flex py-2 md:py-4">
  //             <p className="text-3xl md:text-5xl font-light mr-2 ">XX</p>

  //             <p className="flex flex-col justify-center">
  //               <span className="md:text-base text-xs uppercase">
  //                 {units[currentUnit]}
  //               </span>
  //               <span className="md:text-base text-xs capitalize">gusts</span>
  //             </p>
  //           </div>
  //         </div>
  //         <div className="relative w-1/3 h-24 md:h-32 md:ml-6 text-center flex items-center justify-center ">
  //           {/*<TbArrowUpCircle
  //             className='w-40 h-40 text-white'
  //             style={{transform: `rotate(${deg}deg)`}}
  //           />*/}
  //           <div
  //             className="absolute flex items-center justify-center p-4 rounded-full  w-12 h-12 md:w-16 md:h-16 text-center text-base md:text-xl"
  //             style={{
  //               backdropFilter: "blur(10px)",
  //               backgroundColor: "rgba(173, 216, 230)",
  //             }}
  //           >
  //             {getDirection(deg)}
  //           </div>
  //           <div style={{ transform: `rotate(${(deg + 180) % 360}deg)` }}>
  //             <MdArrowDropUp
  //               className="absolute bottom-4 -left-5 md:-left-8 w-10 h-10 md:w-16 md:h-16 text-white"
  //               style={{ transformOrigin: "center" }}
  //             />
  //           </div>
  //           <div className="absolute -top-2 text-sizes">N</div>
  //           <div className="absolute -right-2 text-sizes">E</div>
  //           <div className="absolute -bottom-2 text-sizes">S</div>
  //           <div className="absolute -left-2 text-sizes">W</div>
  //         </div>
  //       </div>
  //     </SectionContainer>
  //   );
  // };
  const units = ["m/s", "km/h", "mph", "knots", "bft"];
  const [currentUnit, setCurrentUnit] = useState(0);

  const convertSpeed = (speed: number) => {
    switch (units[currentUnit]) {
      case "km/h":
        return speed * 3.6;
      case "mph":
        return speed * 2.237;
      case "knots":
        return speed * 1.944;
      case "bft":
        if (speed < 0.5) return 0;
        if (speed < 1.5) return 1;
        if (speed < 3.3) return 2;
        if (speed < 5.5) return 3;
        if (speed < 7.9) return 4;
        if (speed < 10.7) return 5;
        if (speed < 13.8) return 6;
        if (speed < 17.1) return 7;
        if (speed < 20.7) return 8;
        if (speed < 24.4) return 9;
        if (speed < 28.4) return 10;
        if (speed < 32.6) return 11;
        return 12;
      default:
        return speed;
    }
  };

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
              {convertSpeed(speed) < 10
                ? `\u00A0${Math.round(convertSpeed(speed))}`
                : Math.round(convertSpeed(speed))}
            </p>

            <p className="flex flex-col justify-center">
              <span className="md:text-base text-xs uppercase">
                {units[currentUnit]}
              </span>
              <span className="md:text-base text-xs capitalize">wind</span>
            </p>
          </div>

          <div className="flex py-2 md:py-4">
            <p className="text-3xl md:text-5xl font-light mr-2">XX</p>

            <p className="flex flex-col justify-center">
              <span className="md:text-base text-xs uppercase">
                {units[currentUnit]}
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
