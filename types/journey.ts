export type JourneyRouteParams = {
  // Route folder is [countryName]; this value is the country route slug.
  countryName: string;
};

export type JourneySearchParams = {
  startDate?: string;
  endDate?: string;
  budget?: string;
  city?: string;
};

export type JourneyPlanPageProps = {
  params: Promise<JourneyRouteParams>;
  searchParams: Promise<JourneySearchParams>;
};

export type RawPlace = {
  id?: string;
  name?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  rating?: number;
  googleMapsUri?: string;
  photos?: Array<{ name?: string }>;
  location?: { latitude?: number; longitude?: number };
  currentOpeningHours?: {
    openNow?: boolean;
    weekdayDescriptions?: string[];
    periods?: Array<{
      open?: { day?: number; hour?: number; minute?: number };
      close?: { day?: number; hour?: number; minute?: number };
    }>;
  };
  regularOpeningHours?: {
    weekdayDescriptions?: string[];
    periods?: Array<{
      open?: { day?: number; hour?: number; minute?: number };
      close?: { day?: number; hour?: number; minute?: number };
    }>;
  };
};

export type PlaceCoordinates = {
  latitude: number;
  longitude: number;
};

export type PlaceOpeningHours = {
  openNow?: boolean;
  weekdayDescriptions: string[];
};

export type TimelinePlace = {
  id: string;
  name: string;
  address: string;
  rating: number;
  mapsUrl: string;
  photoName: string;
  coordinates: PlaceCoordinates | null;
  openingHours: PlaceOpeningHours | null;
};

export type TimelineDay = {
  day: number;
  date: string;
  hotel: TimelinePlace | null;
  lunch: TimelinePlace | null;
  landmarks: TimelinePlace[];
};

export type RouteMetrics = {
  distanceKm: number | null;
  durationMinutes: number | null;
};

export type PlannedDay = {
  day: number;
  date: string;
  breakfastHotel: TimelinePlace | null;
  landmark1: TimelinePlace | null;
  lunchRestaurant: TimelinePlace | null;
  landmark2: TimelinePlace | null;
  legs: {
    hotelToLandmark1: RouteMetrics;
    landmark1ToLunch: RouteMetrics;
    lunchToLandmark2: RouteMetrics;
  };
};

export type PlanResult = {
  topLandmark: TimelinePlace | null;
  selectedHotel: TimelinePlace | null;
  rankedLandmarks: TimelinePlace[];
  days: PlannedDay[];
};