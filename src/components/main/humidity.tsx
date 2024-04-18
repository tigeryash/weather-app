import React from "react";
import Image from "next/image";
import SectionContainer from "./section-container";
import SectionHeader from "./section-header";
import SectionBody from "./section-body";

const Humidity = ({ humid }: { humid: number }) => {
  return (
    <SectionContainer>
      <SectionHeader title="Humidity">
        <Image
          src="/humidity.svg"
          alt="humidity"
          width={20}
          height={20}
          className="icon"
        />
      </SectionHeader>

      <SectionBody lorem={true}>{humid}%</SectionBody>
    </SectionContainer>
  );
};

export default Humidity;
