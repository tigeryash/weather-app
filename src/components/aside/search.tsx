import { SlOptions } from "react-icons/sl";
import { PiSidebarLight } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { useSearchStore } from "@/stores/search-store";

const Search = () => {
  const searchTerm = useSearchStore((state) => state.search);
  const setSearchTerm = useSearchStore((state) => state.setSearch);
  const handleInputChange = useSearchStore((state) => state.handleInputChange);
  const isInputFocused = useSearchStore((state) => state.isInputFocused);
  const setIsInputFocused = useSearchStore((state) => state.setIsInputFocused);
  return (
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
  );
};

export default Search;