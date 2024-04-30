import { FaSearch } from "react-icons/fa";
import { useSearchStore } from "@/stores/search-store";

const Search = () => {
  const searchTerm = useSearchStore((state) => state.search);
  const setSearchTerm = useSearchStore((state) => state.setSearch);
  const handleInputChange = useSearchStore((state) => state.handleInputChange);
  const isInputFocused = useSearchStore((state) => state.isInputFocused);
  const setIsInputFocused = useSearchStore((state) => state.setIsInputFocused);
  return (
    <div className="p-4 ">
      {!isInputFocused && (
        <>
          <h1 className="lg:text-4xl md:text-2xl font-bold text-left mb-2">
            Weather
          </h1>
        </>
      )}
      <div className="relative text-neutral-400 flex gap-2">
        <input
          className="bg-neutral-700 outline-none text-lg placeholder-text-lg rounded-lg w-full focus:w-[80%] p-2 px-8 text-neutral-200 hover:bg-neutral-600 placeholder-neutral-400 transition duration-250 ease-in-out"
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
            className="text-neutral-200 text-lg hover:bg-neutral-500 hover:rounded-lg px-2"
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
