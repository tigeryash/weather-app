import { useEffect } from "react";
import { useLocationStore } from "@/stores/location-store";

const useCurrentLocation = () => {
  const currentLocation = useLocationStore((state) => state.currentLocation);
  const loading = useLocationStore((state) => state.loading);
  const getLocation = useLocationStore((state) => state.getLocation);
  const onError = useLocationStore((state) => state.onError);
  const setLoading = useLocationStore((state) => state.setLoading);

  useEffect(() => {
    console.log("useEffect");
    setLoading(true);
    if (!("geolocation" in navigator)) {
      onError();
    }
    getLocation();
    console.log("getting location");
  }, []);

  return { currentLocation, loading };
};

export default useCurrentLocation;
