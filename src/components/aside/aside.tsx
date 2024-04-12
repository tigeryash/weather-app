import LocationList from "./locationlist";
import Search from "./search";

const Aside = () => {
  return (
    <aside
      className="flex flex-col min-h-screen hidden md:block md:w-1/3 xl:w-1/4 bg-neutral-900 bg-opacity-[.8]
        text-white"
    >
      <Search />
      <LocationList />
    </aside>
  );
};

export default Aside;
