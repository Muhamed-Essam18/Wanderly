import { countries } from "@/Data/Data";
import { NextRequest, NextResponse } from "next/server";

type JourneyRequest = {
  countryName?: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
};

type Place = {
  name: string;
  rating: number;
  address: string;
  mapsUrl: string;
  imageUrl: string;
};

const slugify = (value: string) => value.toLowerCase().replace(/\s+/g, "-");

const getTripDays = (startDate?: string, endDate?: string) => {
  if (!startDate || !endDate) return 7;

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 7;
  }

  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return Math.min(7, Math.max(1, days));
};

const findCountry = (countryName: string) =>
  countries.find(
    (country) =>
      slugify(country.name) === slugify(countryName) ||
      country.name.toLowerCase() === countryName.toLowerCase() ||
      country.cities.some((city) => slugify(city) === slugify(countryName)),
  );

const mapPlace = (place: any): Place => ({
  name: place.displayName?.text || place.name || "Unknown place",
  rating: Number(place.rating || 0),
  address: place.formattedAddress || "",
  mapsUrl: place.googleMapsUri || "",
  imageUrl: place.photos?.[0]?.name || "",
});

const searchPlaces = async (query: string) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) return [];

  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "places.displayName,places.formattedAddress,places.rating,places.googleMapsUri,places.photos",
    },
    body: JSON.stringify({ textQuery: query }),
  });

  if (!response.ok) return [];

  const data = await response.json();
  return Array.isArray(data.places) ? data.places.map(mapPlace) : [];
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as JourneyRequest;
    const countryName = body.countryName?.trim();
    const budget = Number(body.budget);

    if (!countryName || !Number.isFinite(budget)) {
      return NextResponse.json(
        { error: "countryName and budget are required" },
        { status: 400 },
      );
    }

    const country = findCountry(countryName);
    if (!country) {
      return NextResponse.json({ error: "Country not found" }, { status: 404 });
    }

    const dayCount = getTripDays(body.startDate, body.endDate);
    const cities = country.cities.length ? country.cities : [country.name];
    const landmarks = country.landmarks.length ? country.landmarks : [country.name];

    const hotelPlaces = await searchPlaces(`${country.name} best hotels`);
    const topHotel = hotelPlaces.sort((left: Place, right: Place) => right.rating - left.rating)[0] || null;

    const days = [] as Array<{
      day: number;
      date: string;
      stay: {
        area: string;
        recommendation: string;
        why: string;
        places: Place[];
      };
      eat: {
        breakfast: string;
        lunch: string;
        dinner: string;
        places: Place[];
      };
      places: Place[];
      budget: {
        suggested: number;
        notes: string;
      };
      tips: string[];
    }>;

    const startDateValue = body.startDate ? new Date(body.startDate) : null;

    for (let index = 0; index < dayCount; index += 1) {
      const city = cities[index % cities.length];
      const landmarkSlice = landmarks.slice(index * 2, index * 2 + 2);
      const landmarkResults = await Promise.all(
        landmarkSlice.map((landmark) => searchPlaces(`${landmark} in ${city}`)),
      );

      const topLandmarks = landmarkResults.flat().sort((left, right) => right.rating - left.rating).slice(0, 2);
      const lunchPlaces = await searchPlaces(`${city} lunch spots`);
      const lunch = lunchPlaces.sort((left: Place, right: Place) => right.rating - left.rating)[0] || null;

      const date = startDateValue
        ? new Date(startDateValue.getTime() + index * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10)
        : `Day ${index + 1}`;

      days.push({
        day: index + 1,
        date,
        stay: topHotel
          ? {
              area: country.name,
              recommendation: topHotel.name,
              why: "We picked the highest-rated hotel from the search results.",
              places: [topHotel],
            }
          : {
              area: country.name,
              recommendation: "No hotel found",
              why: "We could not find a hotel result.",
              places: [],
            },
        eat: {
          breakfast: "Breakfast at the hotel",
          lunch: lunch?.name || "Choose a local lunch spot",
          dinner: "Dinner at the hotel",
          places: lunch ? [lunch] : [],
        },
        places: topLandmarks,
        budget: {
          suggested: Math.round(budget / dayCount),
          notes: "Budget split evenly across the trip.",
        },
        tips: [
          "Keep the route short and easy.",
          "Open the map links when you need directions.",
        ],
      });
    }

    return NextResponse.json({
      country: {
        name: country.name,
        slug: slugify(country.name),
        cities: country.cities,
        landmarks: country.landmarks,
        weeklyBudget: country.weeklyBudget,
        avgFoodCost: country.avgFoodCost,
        avgAccommodationCost: country.avgAccommodationCost,
      },
      itinerary: {
        title: `${country.name} journey timeline`,
        summary: `A simple ${dayCount}-day manual journey built from saved places.`,
        tripHighlights: ["Max 7 days", "Top hotel first", "Two landmarks per day"],
        days,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
