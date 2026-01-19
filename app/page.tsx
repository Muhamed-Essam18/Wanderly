"use client";
import { FaArrowCircleDown } from "react-icons/fa";

import Landing from "../Components/Landing/Landing";
import BudgetSelector from "@/Components/BudgetSelector/BudgetSelector";
import { CountryCard } from "@/Components/CountryCard/CountryCard";
import SortBar from "@/Components/SortBar/SortBar";
import { countries, Country } from "@/Data/Data";
import { useState, createContext, useMemo, useEffect } from "react";

export const Context = createContext<any>(null);
export default function Home() {
  //states
  const [Budget, setBudget] = useState(500);
  const [SelectedStyle, setSelectedStyle] = useState<string[]>([]);
  const [SelectedVibe, setSelectedVibe] = useState<string[]>([]);
  const [sortType, setSortType] = useState<string>("best-match");
  const [showMore, setShowMOre] = useState<boolean>(false);

  useEffect(() => setShowMOre(false), [Budget, SelectedStyle, SelectedVibe]);
  const visibleCountries = useMemo(() => {
    const filtered = countries.filter(
      (country) =>
        country.weeklyBudget.min < Budget &&
        (country.travelStyles.some((s) => SelectedStyle.includes(s)) ||
          country.vibe.some((v) => SelectedVibe.includes(v)))
    );

    // SORT
    return [...filtered].sort((a, b) => {
      switch (sortType) {
        case "cheap":
          return a.weeklyBudget.min - b.weeklyBudget.min;
        case "expensive":
          return b.weeklyBudget.min - a.weeklyBudget.min;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
      }

      // match
      const score = (c: Country) =>
        c.travelStyles.filter((s) => SelectedStyle.includes(s)).length +
        c.vibe.filter((v) => SelectedVibe.includes(v)).length;

      return score(b) - score(a);
    });
  }, [Budget, SelectedStyle, SelectedVibe, sortType, showMore]);

  const onScreenCountries = useMemo(() => {
    if (showMore) {
      return visibleCountries;
    } else {
      return visibleCountries.slice(0, 5);
    }
  }, [visibleCountries, showMore]);
  return (
    <>
      <Landing />
      <Context.Provider
        value={{
          Budget,
          setBudget,
          SelectedStyle,
          setSelectedStyle,
          SelectedVibe,
          setSelectedVibe,
        }}
      >
        <BudgetSelector />
        {onScreenCountries.length > 1 && (
          <Context.Provider value={{ sortType, setSortType }}>
            <SortBar />
          </Context.Provider>
        )}
        <div className=" flex flex-col md:grid md:grid-cols-3 mt-10">
          {onScreenCountries.map((country, i) => (
            <CountryCard
              key={i}
              country={country}
              styleState={SelectedStyle}
              vibeState={SelectedVibe}
              index={i}
            />
          ))}
        </div>
        {onScreenCountries.length >= 5 && !showMore && (
          <div className="flex flex-col justify-center items-center">
            <button
              className="flex items-center gap-2"
              onClick={() => setShowMOre(true)}
            >
              <span className="text-text-primary">Show All Resaults</span>
              <FaArrowCircleDown className="text-text-primary" />
            </button>
          </div>
        )}
      </Context.Provider>
    </>
  );
}
