"use client";

import { SlOptions } from "react-icons/sl";
import { PiSidebarLight } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import LocationList from "./locationlist";
import { useEffect } from "react";
import { useSearchStore } from "@/stores/search-store";

const Aside = () => {
  const searchTerm = useSearchStore((state) => state.search);
  const setSearchTerm = useSearchStore((state) => state.setSearch);
  const handleInputChange = useSearchStore((state) => state.handleInputChange);
  const isInputFocused = useSearchStore((state) => state.isInputFocused);
  const setIsInputFocused = useSearchStore((state) => state.setIsInputFocused);
  const setSearchResults = useSearchStore((state) => state.setSearchResults);

  useEffect(() => {
    if (isInputFocused) {
      setSearchTerm("");
      setSearchResults([]);
    }
  }, [isInputFocused, setSearchResults, setSearchTerm]);

  return (
    <aside
      className="flex flex-col min-h-screen hidden md:block md:w-1/3 xl:w-1/4 bg-neutral-900 bg-opacity-[.8]
        text-white"
    >
      <div className="p-4">
        {!isInputFocused && (
          <>
            <div className="flex items-center justify-between w-full mb-4">
              <button className="text-4xl font-bold text-left">
                <PiSidebarLight />
              </button>
              <button
                className="text-xl font-bold text-right border border-2 p-1 border-white rounded-full
                            "
              >
                <SlOptions />
              </button>
            </div>
            <h1 className="lg:text-4xl md:text-2xl font-bold text-left mb-2">
              Weather
            </h1>
          </>
        )}
        <div className="relative text-neutral-400 flex gap-4">
          <input
            className="bg-neutral-600 outline-none text-lg placeholder-text-lg rounded-lg w-full focus:w-[80%] p-2 px-8 text-neutral-200 placeholder-neutral-400"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleInputChange(e);
            }}
            name="cityName"
            type="text"
            placeholder="Search for a city"
            onFocus={() => setIsInputFocused(true)}
          />
          <FaSearch className="absolute text-lg top-1/2 left-2 transform -translate-y-1/2" />
          {isInputFocused && (
            <button
              className="text-neutral-200 text-lg"
              onClick={() => {
                setIsInputFocused(false);
                setSearchTerm("");
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      <LocationList />
    </aside>
  );
};

export default Aside;
