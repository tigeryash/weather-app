import { useLocationStore } from "@/stores/location-store";
import CurrentLocation from "./currentLocation";
import LocationListBtn from "./location-list-btn";
import { AnimatePresence, motion } from "framer-motion";

const LocationList = () => {
  const locations = useLocationStore((state) => state.locations);
  const loading = useLocationStore((state) => state.loading);
  const error = useLocationStore((state) => state.error);
  const currLoc = useLocationStore((state) => state.currentLocation);

  if (loading) return <div>Loading...</div>;

  return (
    <ul className="px-4 py-2 overflow-y-auto">
      {error === null && (
        <li className="p-1">
          <CurrentLocation />
        </li>
      )}
      <AnimatePresence>
        {locations.map((loc, idx) => (
          <motion.li
            exit={{ opacity: 0, height: 0 }}
            transition={{
              opacity: { transition: { duration: 0 } },
            }}
            className="overflow-hidden p-1 flex w-full space-x-3 "
            key={loc.id}
          >
            {idx === 0 ? (
              <LocationListBtn loc={loc} prevLoc={currLoc} />
            ) : (
              <LocationListBtn loc={loc} prevLoc={locations[idx - 1]} />
            )}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default LocationList;
