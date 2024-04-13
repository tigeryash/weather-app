import { locationSaved } from "@/types/locationTypes";
import { motion } from "framer-motion";
import SavedLocation from "./savedLocation";
import { useState } from "react";
import DeleteBtn from "./delete-btn";

type LocationListBtnProps = {
  loc: locationSaved;
};

const LocationListBtn = ({ loc }: LocationListBtnProps) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  return (
    <motion.div
      className="flex items-center space-x-3"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDrag={(event, info) => {
        if (info.offset.x < -50) {
          // Show the delete button if it's dragged more than 100px to the left
          setShowDeleteButton(true);
        } else {
          setShowDeleteButton(false);
        }
      }}

      // ... other props
    >
      <SavedLocation loc={loc} />
      {showDeleteButton && <DeleteBtn loc={loc} />}
    </motion.div>
  );
};

export default LocationListBtn;
