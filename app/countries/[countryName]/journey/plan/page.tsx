import { getData } from "@/app/lib/api-helper";
import {
  buildScoredJourneyPlan,
  toTimelinePlaces,
} from "@/lib/journey-planner";
import {
  findCountryByRoute,
  getCityFromRouteIfExists,
  getTripDayCount,
} from "@/lib/journey-utils";
import { JourneyPlanPageProps } from "@/types/journey";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PlaceCard from "./PlaceCard";

const formatLeg = (distanceKm: number | null, durationMinutes: number | null) => {
  if (distanceKm === null || durationMinutes === null) {
    return "Route data unavailable";
  }

  return `${distanceKm.toFixed(1)} km · ${durationMinutes} min drive`;
};

export default async function JourneyPlanPage({ params, searchParams }: JourneyPlanPageProps) {
  const { countryName: countryRouteParam } = await params;
  const { startDate, endDate, budget, city } = await searchParams;

  const country = findCountryByRoute(countryRouteParam);

  if (!country) {
    return (
      <main className="min-h-screen bg-surface px-6 py-24 text-text-primary">
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-black/20 p-8 text-center shadow-2xl shadow-black/30">
          <h1 className="text-3xl font-bold">Country not found</h1>
          <p className="mt-3 text-text-muted">Please start from one of the listed countries in the journey flow.</p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-surface transition hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
        </div>
      </main>
    );
  }

  // Decide how many days the user will spend in the country, then use that number
  // to build a matching itinerary from the fetched places.
  const maxDays = getTripDayCount(startDate, endDate);
  const cityQueryValue = city
    ? getCityFromRouteIfExists(city, country.cities)
    : "";
  const searchLocation = cityQueryValue || country.name;

  // Gather landmarks, hotels, and restaurants in parallel before the planner builds the trip.
  let plan;
  try {
    const [landmarks, hotels, restaurants] = await Promise.all([
      getData(`Top-Landmarks in ${searchLocation}, ${country.name}`, searchLocation, "Top-Landmarks"),
      getData(`Best hotels in ${searchLocation}, ${country.name}`, searchLocation, "Hotels"),
      // "Resturants" is the existing category key in Data.ts, so keep it as-is.
      getData(`Best restaurants in ${searchLocation}, ${country.name}`, searchLocation, "Resturants"),
    ]);

    plan = await buildScoredJourneyPlan({
      startDate,
      maxDays,
      landmarks: toTimelinePlaces(landmarks),
      hotels: toTimelinePlaces(hotels),
      restaurants: toTimelinePlaces(restaurants),
    });
  } catch (error) {
    console.error("Failed to build journey plan", error);
    return (
      <main className="min-h-screen bg-surface px-6 py-24 text-text-primary">
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-black/20 p-8 text-center shadow-2xl shadow-black/30">
          <h1 className="text-3xl font-bold">We couldn&apos;t build your itinerary</h1>
          <p className="mt-3 text-text-muted">Something went wrong while loading places. Please try again.</p>
          <Link
            href={`/countries/${countryRouteParam}/journey`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-surface transition hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to journey
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-12 text-text-primary md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 rounded-3xl border border-white/10 bg-black/20 p-6 shadow-2xl shadow-black/30 md:p-8">
          <Link
            href={`/countries/${countryRouteParam}/journey`}
            className="inline-flex items-center gap-2 text-sm text-primary transition hover:text-primary/80"
          >
            <ArrowLeft className="h-4 w-4" />
            Edit journey
          </Link>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">Your {country.name} journey</h1>
          <p className="mt-3 max-w-3xl text-text-muted">
            A day-by-day itinerary built around a top-rated hotel close to the best landmarks,
            with highly rated stops that keep travel time short.
          </p>
        </div>

        <section className="mb-10 rounded-2xl border border-white/10 bg-black/20 p-5 md:p-6">
          <h2 className="text-2xl font-bold">Where you&apos;ll stay</h2>
          <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <PlaceCard
              place={plan.selectedHotel}
              title="Your Hotel"
              note="Top-rated hotel close to the city's best landmark."
            />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-text-muted">
              <p className="text-xs uppercase tracking-[0.22em] text-primary">Why this base</p>
              <p className="mt-3">
                Staying here keeps your daily routes short, so you spend more time exploring
                and less time on the road.
              </p>
              <p className="mt-4 text-white/70">
                Closest top landmark: {plan.topLandmark?.name || "Not found"}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/20 p-5 md:p-6">
          <h2 className="text-2xl font-bold">Your itinerary</h2>
          <div className="relative mt-8 pl-8">
            <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-primary via-primary/60 to-transparent" />
            <div className="space-y-8">
              {plan.days.map((day) => (
                <article key={day.day} className="relative">
                  <div className="absolute -left-[1.95rem] top-2 h-6 w-6 rounded-full border border-primary/50 bg-primary/20" />
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold">Day {day.day} · {day.date}</h3>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
                    <PlaceCard
                      place={day.breakfastHotel}
                      title="Breakfast"
                      note="Start the day at your hotel."
                    />
                    <PlaceCard
                      place={day.landmark1}
                      title="Landmark 1"
                      note="Highly rated and close to your hotel."
                    />
                    <PlaceCard
                      place={day.lunchRestaurant}
                      title="Lunch"
                      note="Highly rated and close to Landmark 1."
                    />
                    <PlaceCard
                      place={day.landmark2}
                      title="Landmark 2"
                      note="Next best landmark on your route."
                    />
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {[
                      { label: "Hotel to Landmark 1", leg: day.legs.hotelToLandmark1 },
                      { label: "Landmark 1 to Lunch", leg: day.legs.landmark1ToLunch },
                      { label: "Lunch to Landmark 2", leg: day.legs.lunchToLandmark2 },
                    ].map(({ label, leg }) => (
                      <div
                        key={label}
                        className="rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-xs text-white/80"
                      >
                        <p className="uppercase tracking-[0.2em] text-primary">{label}</p>
                        <p className="mt-1 text-sm">{formatLeg(leg.distanceKm, leg.durationMinutes)}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-10 text-center text-sm text-text-muted">
          Estimated budget: ${budget || country.weeklyBudget.min}
          {budget ? "" : " (suggested minimum)"} · Up to 4 days planned.
        </div>
      </div>
    </main>
  );
}
