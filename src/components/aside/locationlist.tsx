import { useLocationStore } from "@/stores/location-store";
import CurrentLocation from "./currentLocation";
import SavedLocation from "./savedLocation";

const LocationList = () => {
  const locations = useLocationStore((state) => state.locations);
  const loading = useLocationStore((state) => state.loading);

  if (loading) return <div>Loading...</div>;

  return (
    <ul className="px-4 py-2 overflow-y-auto">
      <li>
        <CurrentLocation />
      </li>
      {locations.map((loc, index) => (
        <li key={loc.id}>
          <SavedLocation loc={loc} />
        </li>
      ))}
    </ul>
  );
};

export default LocationList;
