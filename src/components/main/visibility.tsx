import { useState } from "react";
import { MdVisibility } from "react-icons/md";
import SectionContainer from "@/components/main/section-container";
import SectionHeader from "@/components/main/section-header";
import SectionBody from "@/components/main/section-body";
import { VISIBILITY_CONVERSIONS } from "@/lib/constants";

const Visibility = ({ visible }: { visible: number }) => {
  const [isMetric, setIsMetric] = useState(true);

  const handleClick = () => {
    setIsMetric(!isMetric);
  };

  const kmValue = visible / 1000;
  const convert = isMetric
    ? `${VISIBILITY_CONVERSIONS.km(kmValue).toFixed(1)} km`
    : `${Math.round(VISIBILITY_CONVERSIONS.miles(kmValue))} mi`;

  return (
    <SectionContainer handleClick={handleClick}>
      <SectionHeader title="Visibility">
        <MdVisibility className="icon" />
      </SectionHeader>

      <SectionBody lorem={true}>{convert}</SectionBody>
    </SectionContainer>
  );
};

export default Visibility;
