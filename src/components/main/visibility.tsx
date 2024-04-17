import { useState } from "react";
import { MdVisibility } from "react-icons/md";
import SectionContainer from "./section-container";
import SectionHeader from "./section-header";
import SectionBody from "./section-body";

const Visibility = ({ visible }: { visible: number }) => {
  const [isMetric, setIsMetric] = useState(true);

  const handleClick = () => {
    setIsMetric(!isMetric);
  };

  const convert = isMetric
    ? `${(visible / 1000).toFixed(1)} km`
    : `${Math.round(visible * 0.000621371)} mi`;

  return (
    <SectionContainer handleClick={handleClick}>
      <SectionHeader title="Visibility">
        <MdVisibility className="w-6 h-6 mr-2 text-white" />
      </SectionHeader>

      <SectionBody lorem={true}>{convert}</SectionBody>
    </SectionContainer>
  );
};

export default Visibility;
