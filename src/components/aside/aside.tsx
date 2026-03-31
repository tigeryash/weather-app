import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import LocationList from "@/components/aside/locationlist";
import Search from "@/components/aside/search";
import { useLocationStore } from "@/stores/location-store";

interface AsideProps {
  isDrawerOpen: boolean;
  closeDrawer: () => void;
}

const Aside = ({ isDrawerOpen, closeDrawer }: AsideProps) => {
  const pendingLocation = useLocationStore((state) => state.pendingLocation);

  useEffect(() => {
    if (pendingLocation !== null && isDrawerOpen) {
      closeDrawer();
    }
  }, [pendingLocation, isDrawerOpen, closeDrawer]);

  return (
    <>
      <aside className="relative flex flex-col hidden md:block md:w-1/3 xl:w-1/4 bg-neutral-900 bg-opacity-[.8] text-white overflow-hidden h-screen">
        <div className="h-screen overflow-y-auto pt-14 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
          <Search />
          <LocationList />
        </div>
      </aside>

      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
            />
            <motion.aside
              className="relative flex flex-col w-4/5 max-w-sm bg-neutral-900 text-white overflow-hidden h-full"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="h-full overflow-y-auto pt-14 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
                <Search closeDrawer={closeDrawer} />
                <LocationList />
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Aside;
