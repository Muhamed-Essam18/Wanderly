import { RawPlace, TimelineDay, TimelinePlace } from "@/types/journey";
import { formatJourneyDate } from "./journey-utils";

export const toTimelinePlaces = (places: RawPlace[] = []): TimelinePlace[] =>
  places
    .map((place) => ({
      name: place.displayName?.text || "Unknown place",
      address: place.formattedAddress || "",
      rating: Number(place.rating || 0),
      mapsUrl: place.googleMapsUri || "",
      photoName: place.photos?.[0]?.name || "",
    }))
    .filter((place) => place.name !== "Unknown place");

export const sortPlacesByRatingDesc = (places: TimelinePlace[]) =>
  [...places].sort((left, right) => right.rating - left.rating);

export const buildTimelineDays = ({
  maxDays,
  startDate,
  topHotel,
  topLandmarks,
  topRestaurants,
}: {
  maxDays: number;
  startDate?: string;
  topHotel: TimelinePlace | null;
  topLandmarks: TimelinePlace[];
  topRestaurants: TimelinePlace[];
}): TimelineDay[] =>
  Array.from({ length: maxDays }).map((_, index) => {
    const dayLandmarks = topLandmarks.slice(index * 2, index * 2 + 2);
    const lunch = topRestaurants[index] || topRestaurants[0] || null;

    return {
      day: index + 1,
      date: formatJourneyDate(startDate, index),
      hotel: topHotel,
      lunch,
      landmarks: dayLandmarks,
    };
  });