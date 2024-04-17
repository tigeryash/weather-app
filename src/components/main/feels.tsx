import { LiaTemperatureHighSolid } from "react-icons/lia";
import SectionHeader from "./section-header";
import SectionContainer from "./section-container";
import SectionBody from "./section-body";

const Feels = ({ feels }: { feels: number }) => {
  return (
    <SectionContainer>
      <SectionHeader title="Feels Like">
        <LiaTemperatureHighSolid className="w-6 h-6 mr-2 text-white" />
      </SectionHeader>

      <SectionBody lorem={true}>{Math.round(feels)}&deg;</SectionBody>
    </SectionContainer>
  );
};

export default Feels;
