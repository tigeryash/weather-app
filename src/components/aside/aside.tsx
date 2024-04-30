import { SlOptions } from "react-icons/sl";
import LocationList from "./locationlist";
import Search from "./search";
import { PiSidebarLight } from "react-icons/pi";

const Aside = () => {
  return (
    <aside
      className="relative flex flex-col hidden md:block md:w-1/3 xl:w-1/4 bg-neutral-900 bg-opacity-[.8] text-white overflow-hidden"
      style={{ height: "100vh" }}
    >
      <div className="absolute p-4 flex items-center justify-between w-full bg-neutral-900 bg-opacity-[.8]">
        <button className="text-4xl font-bold text-left">
          <PiSidebarLight />
        </button>
        <button className="text-xl font-bold text-right border-2 p-1 border-white rounded-full">
          <SlOptions />
        </button>
      </div>
      <div className="flex-grow overflow-y-scroll pt-14">
        <Search />
        <LocationList />
      </div>
    </aside>
  );
};

export default Aside;
