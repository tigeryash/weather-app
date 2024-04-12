import { locationSaved } from "@/types/locationTypes";
import { motion } from "framer-motion";
import SavedLocation from "./savedLocation";
import { useState } from "react";
import { useLocationStore } from "@/stores/location-store";

type LocationListBtnProps = {
  loc: locationSaved;
};

const LocationListBtn = ({ loc }: LocationListBtnProps) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const deleteLocation = useLocationStore((state) => state.deleteLocation);
  return (
    <motion.div
      style={{ overflow: "hidden" }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDrag={(event, info) => {
        if (info.offset.x < -100) {
          // Show the delete button if it's dragged more than 100px to the left
          setShowDeleteButton(true);
        } else {
          setShowDeleteButton(false);
        }
      }}
      onDragEnd={(event, info) => {
        if (info.offset.x < -200) {
          // Delete the location if it's swiped more than 200px to the left
          deleteLocation(loc);
        }
      }}
      // ... other props
    >
      <SavedLocation loc={loc} />
      {showDeleteButton && (
        <button onClick={() => deleteLocation(loc)}>Delete</button>
      )}
    </motion.div>
  );
};

export default LocationListBtn;
