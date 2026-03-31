"use client";
import { useState } from "react";
import type { LocationSaved } from "@/types/locationTypes";
import WeatherModal from "./weatherModal";
import { useSearchStore } from "@/stores/search-store";

const SearchResults = () => {
  const searchTerm = useSearchStore((state) => state.search);
  const searchResults = useSearchStore((state) => state.searchResults);
  const chosen = useSearchStore((state) => state.chosen);
  const setSearchTerm = useSearchStore((state) => state.setSearch);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setSearchResults = useSearchStore((state) => state.setSearchResults);
  const selectResult = useSearchStore((state) => state.selectResult);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSearchTerm("");
    setSearchResults([]);
  };
  const cancelModal = () => {
    setIsModalOpen(false);
  };
  return (
    <main className="bg-[#2c2c2e] w-3/4 pl-6">
      <h1 className="text-5xl pt-12 pb-2 font-bold text-left border-b-2 border-[#4c4c4e] mb-4 text-white">
        {`Results for "${searchTerm}"`}
      </h1>
      {isLoading && <p className="text-white text-lg">Loading...</p>}
      <ul>
        {searchResults.map((result: LocationSaved) => {
          const index = result.city
            .toLowerCase()
            .indexOf(searchTerm.toLowerCase());
          const before = result.city.slice(0, index);
          const match = result.city.slice(index, index + searchTerm.length);
          const after = result.city.slice(index + searchTerm.length);
          return (
            <li key={result.id}>
              <button
                type="button"
                className="w-full py-3 text-left text-2xl font-bold text-[#9d9ea7]"
                onClick={async () => {
                  setIsLoading(true);
                  await selectResult(result);
                  setIsLoading(false);
                  openModal();
                }}
              >
                {before}
                <span className="text-white">{match}</span>
                {after} {result.region} {result.country}
              </button>
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
