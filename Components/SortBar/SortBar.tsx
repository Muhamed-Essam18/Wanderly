import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { useContext } from "react";
import { Context } from "@/app/page";
const SortBar = () => {
  const sort = useContext(Context);
  return (
    <div className="flex flex-col items-center mt-10 gap-2  ">
      <span className="text-lg text-text-primary">Sort by</span>
      <Select onValueChange={sort.setSortType} value={sort.sortType}>
        <SelectTrigger className="text-primary bg-surface w-2/3 md:w-[20%] border border-background shadow-2xl shadow-balck ">
          <SelectValue className="text-white text-xl" placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent className="bg-surface text-primary border border-secondary">
          <SelectItem value="best-match">Best match</SelectItem>
          <SelectItem value="cheap">Low Avg. Cost</SelectItem>
          <SelectItem value="expensive">High Avg. Cost</SelectItem>
          <SelectItem value="name-asc">Name A–Z</SelectItem>
          <SelectItem value="name-desc">Name Z–A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortBar;
