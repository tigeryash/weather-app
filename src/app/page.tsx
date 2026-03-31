"use client";
import Weather from "@/components/main/weather";
import Aside from "@/components/aside/aside";
import SearchResults from "@/components/searchResults";
import { useSearchStore } from "@/stores/search-store";
import { useLocationStore } from "@/stores/location-store";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import Loading from "@/app/loading";
import { useState, useCallback } from "react";
import { PiSidebarLight } from "react-icons/pi";

export default function Home() {
  const searchTerm = useSearchStore((state) => state.search);
  const isInputFocused = useSearchStore((state) => state.isInputFocused);
  const displayedLocation = useLocationStore(
    (state) => state.displayedLocation,
  );
  const { loading } = useCurrentLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

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
          <button
            type="button"
            data-menu-trigger="true"
            className="fixed top-3 left-3 z-40 text-white text-3xl md:hidden drop-shadow-lg"
            onTouchStart={(event) => {
              event.stopPropagation();
            }}
            onTouchEnd={(event) => {
              event.stopPropagation();
            }}
            onClick={() => setIsDrawerOpen(true)}
          >
            <PiSidebarLight />
          </button>
          <Aside isDrawerOpen={isDrawerOpen} closeDrawer={closeDrawer} />
          {searchTerm !== "" && isInputFocused ? (
            <SearchResults />
          ) : (
            displayedLocation !== null && <Weather />
          )}
        </>
      )}
    </div>
  );
}
