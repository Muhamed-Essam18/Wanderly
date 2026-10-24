import { resolveRouteViaApi } from "@/lib/google-route";
import { PlanResult, PlannedDay, RawPlace, RouteMetrics, TimelinePlace } from "@/types/journey";

// This planner turns raw place results into a simple day-by-day trip flow.
// The main idea is:
// 1. pick one landmark to anchor the trip,
// 2. choose a hotel close to that landmark,
// 3. rank other landmarks by rating and closeness,
// 4. add a lunch stop for each day,
// 5. calculate travel legs between each stop.

const DAY_IN_MS = 1000 * 60 * 60 * 24;

// Hard cutoffs so a high rating can never drag a far-away place into the plan.
// Ratings only get to break ties among places that are actually reachable.
const MAX_HOTEL_DISTANCE_KM = 2;
const MAX_LANDMARK_DISTANCE_KM = 15;
const MAX_RESTAURANT_DISTANCE_KM = 10;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const normalizeRating = (rating: number, weight: number) => clamp((rating / 5) * weight, 0, weight);

const distanceScore = (distanceKm: number | null, weight: number, maxDistanceKm: number) => {
  if (distanceKm === null) return 0;
  const cappedMax = Math.max(0.1, maxDistanceKm);
  const normalized = clamp(1 - distanceKm / cappedMax, 0, 1);
  return normalized * weight;
};

// Drop anything farther than maxDistanceKm before scoring. If that leaves nothing
// (e.g. every candidate is far away), fall back to the full list rather than an empty day.
const filterWithinDistance = <T extends { distanceKm: number | null }>(
  entries: T[],
  maxDistanceKm: number,
): T[] => {
  const withinRange = entries.filter(
    (entry) => entry.distanceKm !== null && entry.distanceKm <= maxDistanceKm,
  );
  return withinRange.length ? withinRange : entries;
};

const formatDateByIndex = (startDate: string | undefined, dayIndex: number) => {
  if (!startDate) return `Day ${dayIndex + 1}`;
  return new Date(new Date(startDate).getTime() + dayIndex * DAY_IN_MS).toISOString().slice(0, 10);
};

const parsePlaceId = (rawName?: string) => {
  if (!rawName) return "";
  const parts = rawName.split("/");
  return parts[parts.length - 1] || rawName;
};

// Convert the raw API place objects into a cleaner format the planner can use.
// This keeps the page component simple and gives the planner a consistent shape.
export const toTimelinePlaces = (places: RawPlace[] = []): TimelinePlace[] =>
  places
    .map((place, index) => {
      const regular = place.regularOpeningHours || place.currentOpeningHours;
      return {
        id: place.id || parsePlaceId(place.name) || `${place.displayName?.text || "place"}-${index}`,
        name: place.displayName?.text || "Unknown place",
        address: place.formattedAddress || "",
        rating: Number(place.rating || 0),
        mapsUrl: place.googleMapsUri || "",
        photoName: place.photos?.[0]?.name || "",
        coordinates:
          place.location?.latitude !== undefined && place.location?.longitude !== undefined
            ? {
                latitude: place.location.latitude,
                longitude: place.location.longitude,
              }
            : null,
        openingHours: regular
          ? {
              openNow: place.currentOpeningHours?.openNow,
              weekdayDescriptions: regular.weekdayDescriptions || [],
            }
          : null,
      };
    })
    .filter((place) => place.name !== "Unknown place");

export const sortPlacesByRatingDesc = (places: TimelinePlace[]) =>
  [...places].sort((left, right) => right.rating - left.rating);

// Cache route results so the planner does not request the same trip leg repeatedly.
const createRouteResolver = () => {
  const cache = new Map<string, RouteMetrics>();

  return async (origin: TimelinePlace, destination: TimelinePlace): Promise<RouteMetrics> => {
    if (!origin.coordinates || !destination.coordinates) {
      return { distanceKm: null, durationMinutes: null };
    }

    const cacheKey = `${origin.id}::${destination.id}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey) || { distanceKm: null, durationMinutes: null };
    }

    const metrics = await resolveRouteViaApi(origin.coordinates, destination.coordinates);
    cache.set(cacheKey, metrics);
    return metrics;
  };
};



// Pick the best hotel near the top landmark.
// We only keep hotels that are within 2 km, and then rank them by rating.
const selectHotelWithin2km = async (
  topLandmark: TimelinePlace,
  hotels: TimelinePlace[],
  routeBetween: (origin: TimelinePlace, destination: TimelinePlace) => Promise<RouteMetrics>,
) => {
  const rankedHotels = sortPlacesByRatingDesc(hotels);
  const shortList = rankedHotels.slice(0, 20);

  const hotelDistances = await Promise.all(
    shortList.map(async (hotel) => {
      const metrics = await routeBetween(topLandmark, hotel);
      return { hotel, distanceKm: metrics.distanceKm };
    }),
  );

  const withinRange = hotelDistances.filter(
    (entry) => entry.distanceKm !== null && entry.distanceKm <= MAX_HOTEL_DISTANCE_KM,
  );
  if (withinRange.length) {
    return withinRange.sort((a, b) => b.hotel.rating - a.hotel.rating)[0].hotel;
  }

  // Nothing within range: fall back to the closest known hotel instead of leaving the trip without one.
  const knownDistance = hotelDistances.filter((entry) => entry.distanceKm !== null);
  if (knownDistance.length) {
    return knownDistance.sort((a, b) => (a.distanceKm as number) - (b.distanceKm as number))[0].hotel;
  }

  return null;
};

// This is the main function that creates the actual itinerary.
// It builds a plan by choosing a hotel, ranking landmarks, and assigning one or two landmarks per day.
export const buildScoredJourneyPlan = async ({
  startDate,
  maxDays,
  landmarks,
  hotels,
  restaurants,
}: {
  startDate?: string;
  maxDays: number;
  landmarks: TimelinePlace[];
  hotels: TimelinePlace[];
  restaurants: TimelinePlace[];
}): Promise<PlanResult> => {
  const sortedLandmarks = sortPlacesByRatingDesc(landmarks);
  const topLandmark = sortedLandmarks[0] || null;
  const routeBetween = createRouteResolver();

  const selectedHotel =
    topLandmark && hotels.length
      ? await selectHotelWithin2km(topLandmark, hotels, routeBetween)
      : sortPlacesByRatingDesc(hotels)[0] || null;

  const landmarkPool = sortPlacesByRatingDesc(landmarks).slice(0, 10);
  const landmarkDistances = await Promise.all(
    landmarkPool.map(async (landmark) => {
      if (!selectedHotel) return { landmark, distanceKm: null };
      const metrics = await routeBetween(selectedHotel, landmark);
      return { landmark, distanceKm: metrics.distanceKm };
    }),
  );

  const rankedLandmarks = filterWithinDistance(landmarkDistances, MAX_LANDMARK_DISTANCE_KM)
    .map(({ landmark, distanceKm }) => ({
      landmark,
      score: normalizeRating(landmark.rating, 60) + distanceScore(distanceKm, 40, MAX_LANDMARK_DISTANCE_KM),
    }))
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.landmark);

  const remainingLandmarks = [...rankedLandmarks];
  const usedRestaurantKeys = new Set<string>();
  const days: PlannedDay[] = [];

  for (let index = 0; index < maxDays; index += 1) {
    const landmark1 = remainingLandmarks.shift() || null;
    const landmark2 = remainingLandmarks.shift() || null;
    const anchorLandmark = landmark1 || landmark2;

    let lunchRestaurant: TimelinePlace | null = null;
    if (anchorLandmark) {
      const restaurantDistances = await Promise.all(
        restaurants.map(async (restaurant) => {
          const metrics = await routeBetween(anchorLandmark, restaurant);
          return { restaurant, distanceKm: metrics.distanceKm };
        }),
      );

      const bestUniqueRestaurant = filterWithinDistance(restaurantDistances, MAX_RESTAURANT_DISTANCE_KM)
        .map(({ restaurant, distanceKm }) => ({
          restaurant,
          score: normalizeRating(restaurant.rating, 50) + distanceScore(distanceKm, 50, MAX_RESTAURANT_DISTANCE_KM),
          key: `${restaurant.id}::${restaurant.name}::${restaurant.address}`,
        }))
        .sort((a, b) => b.score - a.score)
        .find((entry) => !usedRestaurantKeys.has(entry.key));

      lunchRestaurant = bestUniqueRestaurant?.restaurant || null;
      if (bestUniqueRestaurant) {
        usedRestaurantKeys.add(bestUniqueRestaurant.key);
      }
    }

    const hotelToLandmark1 =
      selectedHotel && landmark1
        ? await routeBetween(selectedHotel, landmark1)
        : { distanceKm: null, durationMinutes: null };
    const landmark1ToLunch =
      landmark1 && lunchRestaurant
        ? await routeBetween(landmark1, lunchRestaurant)
        : { distanceKm: null, durationMinutes: null };
    const lunchToLandmark2 =
      lunchRestaurant && landmark2
        ? await routeBetween(lunchRestaurant, landmark2)
        : { distanceKm: null, durationMinutes: null };

    days.push({
      day: index + 1,
      date: formatDateByIndex(startDate, index),
      breakfastHotel: selectedHotel,
      landmark1,
      lunchRestaurant,
      landmark2,
      legs: {
        hotelToLandmark1,
        landmark1ToLunch,
        lunchToLandmark2,
      },
    });
  }

  return {
    topLandmark,
    selectedHotel,
    rankedLandmarks,
    days,
  };
};
