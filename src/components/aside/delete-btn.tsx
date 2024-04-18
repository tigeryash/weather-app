import { useLocationStore } from "@/stores/location-store";
import { locationSaved } from "@/types/locationTypes";
import { BsTrash3Fill } from "react-icons/bs";
import { motion } from "framer-motion";

type LocationListBtnProps = {
  loc: locationSaved;
  dragOffset: number;
};

const DeleteBtn = ({ loc, dragOffset }: LocationListBtnProps) => {
  const deleteLocation = useLocationStore((state) => state.deleteLocation);
  const setDisplayedLocation = useLocationStore(
    (state) => state.setDisplayedLocation
  );
  const locations = useLocationStore((state) => state.locations);

  return (
    <motion.button
      initial={{ opacity: 0, display: "none" }}
      animate={{
        opacity: dragOffset > 0 ? 0 : Math.min(Math.abs(dragOffset) / 100, 1),
        display: dragOffset === 0 ? "none" : "block",
        paddingRight: Math.min(Math.abs(dragOffset), 400), // adjust 100 to your preferred max width
      }}
      className="bg-red-500 px-6 py-[3.25rem] mt-4 rounded-3xl text-2xl box-border "
      onClick={() => {
        deleteLocation(loc);
      }}
    >
      <BsTrash3Fill className="text-white" />
    </motion.button>
  );
};

export default DeleteBtn;
