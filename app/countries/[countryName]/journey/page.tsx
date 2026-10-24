"use client";

import { JourneyRouteParams } from "@/types/journey";
import {
  MAX_JOURNEY_DAYS,
  findCountryByRoute,
  validateJourneyDates,
} from "@/lib/journey-utils";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CalendarRange, Clock3, Coins, Sparkles } from "lucide-react";

export default function JourneyPage() {
  const params = useParams<JourneyRouteParams>();
  const router = useRouter();
  const countryRouteParam = params?.countryName;
  console.log(params)

  const country = useMemo(() => {
    if (!countryRouteParam) {
      return undefined;
    }

    return findCountryByRoute(countryRouteParam);
  }, [countryRouteParam]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [budget, setBudget] = useState<number>(country?.weeklyBudget.min ?? 0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (country) {
      setBudget(country.weeklyBudget.min);
      setSelectedCity("");
    }
  }, [country]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!country) {
      setError("Country data is not available for this journey.");
      return;
    }

    if (!selectedCity) {
      setError("Please choose one city to build your journey.");
      return;
    }

    const validationError = validateJourneyDates(startDate, endDate);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    const searchParams = new URLSearchParams({
      startDate,
      endDate,
      budget: String(budget),
      city: selectedCity,
    });

    router.push(`/countries/${countryRouteParam}/journey/plan?${searchParams.toString()}`);
  };

  if (!country) {
    return (
      <main className="min-h-screen bg-surface px-6 py-24 text-text-primary">
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-black/20 p-8 text-center shadow-2xl shadow-black/30">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Journey planner</p>
          <h1 className="mt-4 text-3xl font-bold">City not found</h1>
          <p className="mt-3 text-text-muted">Please choose one of the listed countries from the data set to build a journey.</p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 font-medium text-surface transition hover:opacity-90"
          >
            Back home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,130,170,0.16),_transparent_40%),linear-gradient(180deg,_#09111f_0%,_#050814_100%)] px-4 py-20 text-text-primary md:px-8">
     <h1>{country.name}</h1>
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-black/20 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            Smart journey builder
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            Build your trip to <span className="text-primary">{country.name}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-text-muted md:text-lg">
            Choose dates and budget. We will turn your saved places into a focused 4-day timeline with hotel, lunch, and landmark picks.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <CalendarRange className="h-4 w-4 text-primary" />
                Max days
              </div>
              <p className="mt-2 text-2xl font-bold">{MAX_JOURNEY_DAYS}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <Coins className="h-4 w-4 text-primary" />
                Budget
              </div>
              <p className="mt-2 text-2xl font-bold">${country.weeklyBudget.min}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <Clock3 className="h-4 w-4 text-primary" />
                Timeline style
              </div>
              <p className="mt-2 text-2xl font-bold">4-day flow</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 md:p-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm text-text-muted">Choose city</span>
                <select
                  value={selectedCity}
                  onChange={(event) => setSelectedCity(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-primary/60"
                >
                  <option value="">Select a city</option>
                  {country.cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm text-text-muted">Arrival date</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-primary/60"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm text-text-muted">Departure date</span>
                <input
                  type="date"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(event) => setEndDate(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-primary/60"
                />
              </label>
            </div>

            <label className="space-y-2">
              <span className="flex items-center justify-between text-sm text-text-muted">
                <span>Budget</span>
                <span className="text-primary">Default starts from ${country.weeklyBudget.min}</span>
              </span>
              <input
                type="number"
                value={budget}
                min={country.weeklyBudget.min}
                step="50"
                onChange={(event) => setBudget(Number(event.target.value))}
                className="w-full rounded-2xl border border-white/10 bg-surface px-4 py-3 text-text-primary outline-none transition focus:border-primary/60"
              />
            </label>

            {error ? (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 font-semibold text-surface transition hover:opacity-90"
            >
              Build timeline
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-black/20 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">How it works</p>
            <h2 className="mt-3 text-3xl font-bold">A timeline, not a pitch</h2>
            <p className="mt-3 text-sm leading-7 text-text-muted">
              The next page keeps it compact: top landmark first, hotel near it, then a scored path of landmarks and lunch stops.
            </p>
          </div>

          <div className="rounded-[2rem] border border-dashed border-white/15 bg-black/15 p-6 text-text-muted">
            <p className="text-lg font-semibold text-text-primary">Trip rules</p>
            <ul className="mt-4 space-y-3 text-sm leading-7">
              <li>• Maximum 4 days.</li>
              <li>• Hotel is selected near the top landmark.</li>
              <li>• Landmarks and restaurants are scored by rating + distance.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}