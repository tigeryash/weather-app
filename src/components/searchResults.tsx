"use client";
import { useState } from "react";
import { locationSaved } from "@/types/locationTypes";
import WeatherModal from "./weatherModal";
import { useSearchStore } from "@/stores/search-store";

const SearchResults = () => {
  const searchTerm = useSearchStore((state) => state.search);
  const searchResults = useSearchStore((state) => state.searchResults);
  const setChosen = useSearchStore((state) => state.setChosen);
  const chosen = useSearchStore((state) => state.chosen);
  const setSearchTerm = useSearchStore((state) => state.setSearch);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setSearchResults = useSearchStore((state) => state.setSearchResults);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setChosen(null);
    setSearchTerm("");
    setSearchResults([]);
  };
  const cancelModal = () => {
    setIsModalOpen(false);
    setChosen(null);
  };
  return (
    <main className="bg-[#2c2c2e] w-3/4 pl-6">
      <h1 className="text-5xl pt-12 pb-2 font-bold text-left border-b-2 border-[#4c4c4e] mb-4 text-white">
        {`Results for "${searchTerm}"`}
      </h1>
      <ul>
        {searchResults.map((result: locationSaved) => {
          const index = result.city
            .toLowerCase()
            .indexOf(searchTerm.toLowerCase());
          const before = result.city.slice(0, index);
          const match = result.city.slice(index, index + searchTerm.length);
          const after = result.city.slice(index + searchTerm.length);
          return (
            <li
              className=" py-3 text-[#9d9ea7] font-bold text-2xl"
              key={result.id}
              onClick={() => {
                setChosen({
                  id: result.id,
                  city: result.city,
                  country: result.country,
                  region: result.region,
                });
                openModal();
              }}
            >
              {before}
              <span className="text-white">{match}</span>
              {after} {result.region} {result.country}
            </li>
          );
        })}
      </ul>
      {chosen !== null && (
        <WeatherModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          chosen={chosen}
          cancelModal={cancelModal}
        />
      )}
    </main>
  );
};

export default SearchResults;
