"use client";
import { FaArrowCircleDown } from "react-icons/fa";

import Landing from "../Components/Landing/Landing";
import BudgetSelector from "@/Components/BudgetSelector/BudgetSelector";
import { CountryCard } from "@/Components/CountryCard/CountryCard";
import SortBar from "@/Components/SortBar/SortBar";
import { countries, Country } from "@/Data/Data";
import { motion, LayoutGroup, AnimatePresence, easeInOut } from "motion/react";
import { useState, createContext, useMemo, useEffect } from "react";
const animation = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};
export const Context = createContext<any>(null);
export default function Home() {
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
        {onScreenCountries.length && (
          <Context.Provider value={{ sortType, setSortType }}>
            <SortBar resultsNo={visibleCountries.length} />
          </Context.Provider>
        )}

        <motion.div
          key={onScreenCountries.length}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            ease: easeInOut,
            duration: 0.6,
          }}
          className=" flex flex-col md:grid md:grid-cols-3 mt-10"
        >
          <LayoutGroup>
            <AnimatePresence initial={false} mode="popLayout">
              {onScreenCountries.map((country, i) => (
                <CountryCard
                  key={country.id}
                  country={country}
                  styleState={SelectedStyle}
                  vibeState={SelectedVibe}
                  index={i}
                />
              ))}
            </AnimatePresence>
          </LayoutGroup>
        </motion.div>

        {onScreenCountries.length >= 5 && !showMore && (
          <motion.div
            variants={animation}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center items-center"
          >
            <motion.button
              layout
              variants={animation}
              initial="hidden"
              animate="show"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-surface rounded-2xl p-3 shadow-2xl shadow-black my-10 cursor-pointer hover:bg-primary transition-colors"
              onClick={() => setShowMOre(true)}
            >
              <span className="text-text-primary font-bold hover:tex-primary">
                Show All Resaults
              </span>
              <FaArrowCircleDown className="text-text-primary" />
            </motion.button>
          </motion.div>
        )}
      </Context.Provider>
    </>
  );
}
