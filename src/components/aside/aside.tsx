import { SlOptions } from "react-icons/sl";
import LocationList from "./locationlist";
import Search from "./search";
import { PiSidebarLight } from "react-icons/pi";

const Aside = () => {
  return (
    <aside
      className="relative flex flex-col hidden md:block md:w-1/3 xl:w-1/4 bg-neutral-900 bg-opacity-[.8] text-white overflow-hidden
      "
      style={{ height: "100vh" }}
    >
      <div className="h-screen overflow-y-auto pt-14 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        <Search />
        <LocationList />
      </div>
    </aside>
  );
};

export default Aside;
