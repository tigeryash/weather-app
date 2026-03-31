import LocationList from "@/components/aside/locationlist";
import Search from "@/components/aside/search";

const Aside = () => {
  return (
    <aside className="relative flex flex-col hidden md:block md:w-1/3 xl:w-1/4 bg-neutral-900 bg-opacity-[.8] text-white overflow-hidden h-screen">
      <div className="h-screen overflow-y-auto pt-14 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        <Search />
        <LocationList />
      </div>
    </aside>
  );
};

export default Aside;
