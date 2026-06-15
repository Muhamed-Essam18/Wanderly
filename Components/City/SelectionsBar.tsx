"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { placesTypes } from "@/Data/Data";
const SelectionsBar = ({ length }: { length: string }) => {
  const { cityName, placeType } = useParams<{
    cityName: string;
    placeType: string;
  }>();

  const decodedPlaceType = placeType
    ? decodeURIComponent(placeType)
    : placesTypes[0].name;
  const router = useRouter();
  return (
    <section className="flex justify-center items-center ">
      <div className="flex flex-row items-center justify-between py-3 px-4 md:py-6 md:px-10 rounded-2xl shadow-2xl shadow-black mt-10 md:mt-0 gap-2 bg-surface w-[90%] md:w-1/2 m-auto ">
        <div className="md:w-[80%] w-full text-sm font-bold md:text-lg  text-text-primary flex items-center gap-2 flex-row">
          <CiSearch className="text-xl" />
          {length} Places Found
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-end">
          <span className="text-primary font-bold text-sm md:text-md mr-3">
            Choose a Place:
          </span>{" "}
          <Select
            onValueChange={(value) => {
              router.push(`/cities/${cityName}/Places/${value}`);
            }}
            value={decodedPlaceType}
          >
            <SelectTrigger className="md:w-1/2 text-xs md:text-sm text-primary bg-secondary border border-background shadow-2xl shadow-balck ">
              <SelectValue className="text-white" placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="bg-surface text-primary border border-secondary">
              {placesTypes.map((placeType) => (
                <SelectItem
                  key={placeType.name}
                  value={placeType.name}
                  className="bg-surface rounded-lg p-2 text-primary md:text-sm text-xs "
                >
                  {placeType.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
};

export default SelectionsBar;
