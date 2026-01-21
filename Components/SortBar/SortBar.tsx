import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CiSearch } from "react-icons/ci";

import { useContext } from "react";
import { Context } from "@/app/page";
import { motion } from "motion/react";
const sortAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const SortBar = ({ resultsNo }: any) => {
  const sort = useContext(Context);
  return (
    <motion.div
      layout
      variants={sortAnimation}
      initial="hidden"
      animate="show"
      className="flex flex-row items-center justify-between rounded-2xl shadow-2xl shadow-black mt-10 gap-2 bg-surface w-[90%] md:w-1/2 m-auto  "
    >
      <div className="w-full text-sm font-bold md:text-lg p-6 text-text-primary flex items-center gap-2 flex-row">
        <CiSearch className="text-2xl" /> {resultsNo} Destinations Found
      </div>
      <div className="flex flex-col md:flex-row w-full justify-center items-center">
        <span className="text-sm md:text-lg mr-2 text-primary font-bold">
          Sort by
        </span>
        <Select onValueChange={sort.setSortType} value={sort.sortType}>
          <SelectTrigger className="w-2/3 text-xs md:text-sm text-primary bg-secondary border border-background shadow-2xl shadow-balck ">
            <SelectValue className="text-white" placeholder="Sort By" />
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
    </motion.div>
  );
};

export default SortBar;
