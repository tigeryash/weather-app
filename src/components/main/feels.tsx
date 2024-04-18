import { LiaTemperatureHighSolid } from "react-icons/lia";
import SectionHeader from "./section-header";
import SectionContainer from "./section-container";
import SectionBody from "./section-body";

const Feels = ({ feels }: { feels: number }) => {
  return (
    <SectionContainer>
      <SectionHeader title="Feels Like">
        <LiaTemperatureHighSolid className="icon" />
      </SectionHeader>

      <SectionBody lorem={true}>{Math.round(feels)}&deg;</SectionBody>
    </SectionContainer>
  );
};

export default Feels;
