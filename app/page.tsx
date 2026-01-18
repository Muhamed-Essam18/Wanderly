"use client";
import Landing from "../Components/Landing/Landing";
import BudgetSelector from "@/Components/BudgetSelector/BudgetSelector";
import { CountryCard } from "@/Components/CountryCard/CountryCard";
import SortBar from "@/Components/SortBar/SortBar";
import { countries, Country } from "@/Data/Data";
import { useState, createContext, useMemo } from "react";

export const Context = createContext<any>(null);
export default function Home() {
  //states
  const [Budget, setBudget] = useState(500);
  const [SelectedStyle, setSelectedStyle] = useState<string[]>([]);
  const [SelectedVibe, setSelectedVibe] = useState<string[]>([]);
  const [sortType, setSortType] = useState("");

  const visibleCountries = useMemo(() => {
    // FILTER
    const filtered = countries
      .filter(
        (country) =>
          country.weeklyBudget.min < Budget &&
          (country.travelStyles.some((s) => SelectedStyle.includes(s)) ||
            country.vibe.some((v) => SelectedVibe.includes(v)))
      )
      .sort((a, b) => a.name.localeCompare(b.name));

    // SORT
    return [...filtered].sort((a, b) => {
      switch (sortType) {
        case "cheap":
          return a.weeklyBudget.min - b.weeklyBudget.min;
          break;
        case "expensive":
          return b.weeklyBudget.min - a.weeklyBudget.min;
          break;
      }

      // match
      const score = (c: Country) =>
        c.travelStyles.filter((s) => SelectedStyle.includes(s)).length +
        c.vibe.filter((v) => SelectedVibe.includes(v)).length;

      return score(b) - score(a);
    });
  }, [Budget, SelectedStyle, SelectedVibe, sortType]);
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
        {visibleCountries.length >= 1 && (
          <Context.Provider value={{ sortType, setSortType }}>
            <SortBar />
          </Context.Provider>
        )}
        <div className=" flex flex-col md:grid md:grid-cols-3 mt-10">
          {visibleCountries.map((country, i) => (
            <CountryCard key={i} country={country} index={i} />
          ))}
        </div>
      </Context.Provider>
    </>
  );
}
