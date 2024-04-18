import { useState } from "react";
import SectionContainer from "./section-container";
import SectionHeader from "./section-header";
import Image from "next/image";
import SectionBody from "./section-body";

const Pressure = ({ pressure }: { pressure: number }) => {
  const units = ["hPa", "mbar", "inHg", "mmHg", "kPa"];
  const [currentUnit, setCurrentUnit] = useState(0);

  function convertPressure(pressure: number, unit: string): number {
    switch (unit) {
      case "hPa":
        return pressure;
      case "mbar":
        return pressure; // hPa and mbar are equivalent
      case "inHg":
        return pressure * 0.02953; // 1 hPa = 0.02953 inHg
      case "mmHg":
        return pressure * 0.75006; // 1 hPa = 0.75006 mmHg
      case "kPa":
        return pressure * 0.1; // 1 hPa = 0.1 kPa
      default:
        throw new Error(`Unknown unit: ${unit}`);
    }
  }

  const handleClick = () => {
    setCurrentUnit((currentUnit + 1) % units.length);
  };

  return (
    <SectionContainer handleClick={handleClick}>
      <SectionHeader title="Pressure">
        <Image
          src="/pressure.svg"
          alt="pressure"
          width={20}
          height={20}
          className="icon"
        />
      </SectionHeader>
      <SectionBody lorem={false}>
        {Math.round(convertPressure(pressure, units[currentUnit]))}
        <span className="text-2xl">{units[currentUnit]}</span>
      </SectionBody>
    </SectionContainer>
  );
};

export default Pressure;
