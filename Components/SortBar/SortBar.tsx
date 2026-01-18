import { FaArrowCircleDown } from "react-icons/fa";
import { useContext } from "react";
import { Context } from "@/app/page";
const SortBar = () => {
  const sort = useContext(Context);
  return (
    <div className="flex flex-col items-center mt-10 gap-2 relative">
      <span className="text-lg text-text-primary">Sort by</span>
      <select
        className="w-40 h-10 text-center rounded-full text-text-primary bg-secondary"
        onChange={(e) => sort.setSortType(e.target.value)}
      >
        <option value="match">Best match</option>
        <option value="cheap">Low Avg. Cost</option>
        <option value="expensive">High Avg. Cost</option>
        <option value="name-asc">Name A–Z</option>
        <option value="name-desc">Name Z–A</option>
      </select>
    </div>
  );
};

export default SortBar;
