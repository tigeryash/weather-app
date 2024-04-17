"use client";
import Weather from "../components/main/weather";
import Aside from "../components/aside/aside";
import SearchResults from "@/components/searchResults";
import { useSearchStore } from "@/stores/search-store";
import { useLocationStore } from "@/stores/location-store";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import Loading from "./loading";

export default function Home() {
  const searchTerm = useSearchStore((state) => state.search);
  const isInputFocused = useSearchStore((state) => state.isInputFocused);
  const displayedLocation = useLocationStore(
    (state) => state.displayedLocation
  );
  const { loading } = useCurrentLocation();
  return (
    <div
      style={{
        position: "static",
        backgroundImage:
          "url('https://littlevisuals.co/images/atlantic_ridge.jpg')",
        backgroundSize: "cover",
      }}
      className="flex min-h-screen"
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <Aside />
          {
            // if the user is searching and the input is focused, display the search results if not display the weather data for selected location
            searchTerm !== "" && isInputFocused ? (
              <SearchResults />
            ) : (
              displayedLocation !== null && <Weather />
            )
          }
        </>
      )}
    </div>
  );
}
