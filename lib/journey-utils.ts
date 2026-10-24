import { countries } from "@/Data/Data";

const DAY_IN_MS = 1000 * 60 * 60 * 24;
export const MAX_JOURNEY_DAYS = 4;

export const slugify = (value: string) => value.toLowerCase().replace(/\s+/g, "-");

export const normalizeRouteValue = (value: string) =>
  decodeURIComponent(value).toLowerCase().replace(/\s+/g, "-");

export const findCountryByRoute = (routeParam: string) => {
  const routeValue = normalizeRouteValue(routeParam);

  return countries.find((entry) => {
    const countrySlug = slugify(entry.name);
    const countryId = slugify(entry.id);

    return routeValue === countrySlug || routeValue === countryId;
  });
};

export const getCityFromRouteIfExists = (routeParam: string, cityList: string[]) => {
  const routeValue = normalizeRouteValue(routeParam);
  return cityList.find((city) => slugify(city) === routeValue) || "";
};

export const getTripDayCount = (startDate?: string, endDate?: string) => {
  if (!startDate || !endDate) {
    return MAX_JOURNEY_DAYS;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = Math.ceil((end.getTime() - start.getTime()) / DAY_IN_MS) + 1;

  if (!Number.isFinite(diff)) {
    return MAX_JOURNEY_DAYS;
  }

  return Math.min(MAX_JOURNEY_DAYS, Math.max(1, diff));
};

export const validateJourneyDates = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) {
    return "Please choose the dates you will be in the country.";
  }

  const diff = getTripDayCount(startDate, endDate);
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
    return "Please choose a valid date range.";
  }

  const realDiff = Math.ceil((end.getTime() - start.getTime()) / DAY_IN_MS) + 1;
  if (realDiff > MAX_JOURNEY_DAYS) {
    return "Manual journeys are limited to 4 days.";
  }

  if (diff < 1) {
    return "Please choose a valid date range.";
  }

  return "";
};

export const formatJourneyDate = (startDate: string | undefined, dayIndex: number) => {
  if (!startDate) {
    return `Day ${dayIndex + 1}`;
  }

  return new Date(new Date(startDate).getTime() + dayIndex * DAY_IN_MS)
    .toISOString()
    .slice(0, 10);
};