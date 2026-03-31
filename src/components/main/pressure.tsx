import { useState } from "react";
import SectionContainer from "@/components/main/section-container";
import SectionHeader from "@/components/main/section-header";
import Image from "next/image";
import SectionBody from "@/components/main/section-body";
import { PRESSURE_UNITS, PRESSURE_CONVERSIONS } from "@/lib/constants";

const Pressure = ({ pressure }: { pressure: number }) => {
  const [currentUnit, setCurrentUnit] = useState(0);

  const units = PRESSURE_UNITS;
  const unit = units[currentUnit];

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
        {Math.round(PRESSURE_CONVERSIONS[unit](pressure))}
        <span className="text-2xl">{unit}</span>
      </SectionBody>
    </SectionContainer>
  );
};

export default Pressure;
