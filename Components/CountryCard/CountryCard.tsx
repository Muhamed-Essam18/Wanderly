"use client";

import { DollarSign } from "lucide-react";
import { Country } from "../../Data/Data";
import Modal from "../Modal/Modal";
import { useState } from "react";
interface CountryCardProps {
  country: Country;

  index: number;
}

const budgetDots = {
  low: 1,
  medium: 2,
  high: 3,
};

export const CountryCard = ({ country, index }: CountryCardProps) => {
  const [modal, setmodal] = useState<boolean>(false);

  return (
    <>
      <article
        onClick={() => setmodal(true)}
        className="cursor-pointer group overflow-hidden animate-fade-up w-[90%] text-text-primary m-auto bg-surface my-5 rounded-2xl  border border-text-muted/15"
        style={{ animationDelay: `${index * 80}ms` }}
      >
        <div className="relative h-50 overflow-hidden">
          <img
            src={country.heroImage}
            alt={country.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/100 via-surface/30 to-transparent" />

          <div className="absolute top-3 left-3 text-3xl drop-shadow-lg">
            <img
              src={`https://flagcdn.com/w40/${country.flag}.png`}
              alt={country.name}
            />
          </div>

          <div className="absolute top-3 right-3 budget-indicator bg-card/80 backdrop-blur-sm px-2 py-1 rounded-full flex flex-row bg-secondary">
            {[...Array(3)].map((_, i) => (
              <DollarSign
                key={i}
                className={`w-4 h-4 ${
                  i < budgetDots[country.budgetLevel]
                    ? "text-primary"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className=" text-2xl font-bold text-text-primary group-hover:text-primary transition-colors">
              {country.name}
            </h3>
            <span className="text-sm text-muted-foreground whitespace-nowrap text-text-muted">
              ${country.weeklyBudget.min}-${country.weeklyBudget.max}/wk
            </span>
          </div>

          {/* Travel Style Tags */}
          <div className="flex flex-wrap gap-1.5 shadow-teal-200">
            {country.travelStyles.map((style) => (
              <span
                key={style}
                className="text-sm bg-text-special text-primary rounded-full px-3 py-1 border-border/50 border-primary"
              >
                {style}
              </span>
            ))}
          </div>

          {/* Quick Stats */}

          <div className="flex items-center gap-4 text-sm text-text-muted mt-6 pt-2 border-t opacity-70">
            <span>{country.cities.length} cities</span>
            <span>•</span>
            <span>{country.landmarks.length} landmarks</span>
          </div>
        </div>
      </article>
      {modal && <Modal country={country} onClose={() => setmodal(false)} />}
    </>
  );
};
