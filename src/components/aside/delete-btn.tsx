import { useLocationStore } from "@/stores/location-store";
import { locationSaved } from "@/types/locationTypes";
import { BsTrash3Fill } from "react-icons/bs";

type LocationListBtnProps = {
  loc: locationSaved;
};

const DeleteBtn = ({ loc }: LocationListBtnProps) => {
  const deleteLocation = useLocationStore((state) => state.deleteLocation);

  return (
    <button
      className="bg-red-500 px-6 py-[3.25rem] mt-4 rounded-3xl text-2xl box-border "
      onClick={() => deleteLocation(loc)}
    >
      <BsTrash3Fill className="text-white" />
    </button>
  );
};

export default DeleteBtn;
