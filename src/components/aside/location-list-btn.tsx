import { locationSaved } from "@/types/locationTypes";
import { motion } from "framer-motion";
import SavedLocation from "./savedLocation";
import { useState } from "react";
import DeleteBtn from "./delete-btn";
import { BsTrash3Fill } from "react-icons/bs";
import { useLocationStore } from "@/stores/location-store";

type LocationListBtnProps = {
  loc: locationSaved;
};

const LocationListBtn = ({ loc }: LocationListBtnProps) => {
  const deleteLocation = useLocationStore((state) => state.deleteLocation);

  const [dragOffset, setDragOffset] = useState(0);

  return (
    <>
      <SavedLocation
        loc={loc}
        dragOffset={dragOffset}
        setDragOffset={setDragOffset}
      />

      <DeleteBtn loc={loc} dragOffset={dragOffset} />
    </>
  );
};

export default LocationListBtn;
