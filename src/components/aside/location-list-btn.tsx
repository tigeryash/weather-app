import { location, locationSaved } from "@/types/locationTypes";
import SavedLocation from "./savedLocation";
import { useState } from "react";
import DeleteBtn from "./delete-btn";

type LocationListBtnProps = {
  loc: locationSaved;
  prevLoc: locationSaved | location | null;
};

const LocationListBtn = ({ loc, prevLoc }: LocationListBtnProps) => {
  const [dragOffset, setDragOffset] = useState(0);

  return (
    <>
      <SavedLocation
        loc={loc}
        dragOffset={dragOffset}
        setDragOffset={setDragOffset}
      />

      <DeleteBtn loc={loc} dragOffset={dragOffset} prevLoc={prevLoc} />
    </>
  );
};

export default LocationListBtn;
