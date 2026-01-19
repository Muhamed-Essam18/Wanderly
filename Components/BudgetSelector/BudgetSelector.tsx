"use client";
import { useState, createContext, useContext } from "react";
import { LuWallet } from "react-icons/lu";
import { travelStyles, vibeOptions } from "@/Data/Data";
import { BsCompass } from "react-icons/bs";
import { FaRegGrinStars } from "react-icons/fa";
import { Context } from "@/app/page";

const BudgetSelector = () => {
  const cardState = useContext(Context);
  const styleClicked = (key: string) => {
    cardState.setSelectedStyle((prev: string[]) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };
  const vibeClicked = (key: string) => {
    cardState.setSelectedVibe((prev: string[]) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };
  const checkAllHandler = (
    checked: boolean,
    setState: React.Dispatch<React.SetStateAction<string[]>>,
    options: string[]
  ) => {
    checked ? setState(options) : setState([]);
  };

  return (
    <section className="flex flex-col items-center mt-15">
      <div className="w-[90%] md:w-3/4 flex flex-col gap-10 justify-center items-center p-7 bg-surface rounded-2xl">
        <div className="w-full flex flex-row justify-between items-center ">
          <h4 className="text-xl font-bold text-text-primary ">
            <LuWallet className="text-primary text-xl inline mr-2 mb-1" />
            Weekly Budget
          </h4>
          <h3 className="text-lg text-primary font-bold">
            ${cardState.Budget}
          </h3>
        </div>
        <div className="w-full  space-y-4">
          <div className="flex justify-between text-sm text-text-muted">
            <span>Budget</span>
          </div>

          <input
            type="range"
            min="500"
            max="2500"
            value={cardState.Budget}
            onChange={(e) => cardState.setBudget(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer 
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg
                [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
          />

          <ul className="flex flex-row justify-between text-center gap-5">
            <li className="text-primary text-md">$500</li>
            <li className="text-primary text-md">$1000</li>
            <li className="text-primary text-md">$1500</li>
            <li className="text-primary text-md">$2000</li>
            <li className="text-primary text-md">$2500</li>
          </ul>
          <div className="space-y-3 mt-10">
            <div className="flex items-center gap-2 500-10">
              <BsCompass className="text-primary text-lg" />
              <span className="text-text-primary font-bold text-lg">
                Travel Style
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {travelStyles.map((style) => (
                <button
                  key={style}
                  className={`text-sm  rounded-full  px-5 py-3 hover:text-text-primary transition-colors duration-300 ${
                    cardState.SelectedStyle.includes(style)
                      ? "bg-primary text-black"
                      : "bg-secondary text-text-muted"
                  }`}
                  onClick={() => styleClicked(style)}
                >
                  {style}
                </button>
              ))}
              <div className="flex flex-row items-center justify-center gap-2 ml-2 md:ml-5">
                <input
                  type="checkbox"
                  className="bg-surface text-secondary"
                  onChange={(e) =>
                    checkAllHandler(
                      e.target.checked,
                      cardState.setSelectedStyle,
                      [...travelStyles]
                    )
                  }
                  checked={
                    cardState.SelectedStyle.length === travelStyles.length
                  }
                />
                <span className="text-sm md:text-md text-text-primary">
                  Check All
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-10">
              <FaRegGrinStars className="text-primary text-lg" />
              <span className="text-text-primary font-bold text-lg">Vibe</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {vibeOptions.map((style) => (
                <button
                  key={style}
                  className={`text-sm  rounded-full bg- px-5 py-3 hover:text-text-primary transition-colors duration-500 ${
                    cardState.SelectedVibe.includes(style)
                      ? "bg-primary text-black"
                      : "bg-secondary text-text-muted"
                  }`}
                  onClick={() => vibeClicked(style)}
                >
                  {style}
                </button>
              ))}
              <div className="flex flex-row items-center justify-center gap-2 ml-2 md:ml-5">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    checkAllHandler(
                      e.target.checked,
                      cardState.setSelectedVibe,
                      [...vibeOptions]
                    )
                  }
                  checked={cardState.SelectedVibe.length === vibeOptions.length}
                />
                <span className="text-sm md:text-md text-text-primary">
                  Check All
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BudgetSelector;
