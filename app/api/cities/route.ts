import { NextRequest } from "next/server";

type LatLng = { latitude: number; longitude: number };

// Text search alone can return places far outside the intended city (ambiguous
// names, loosely-matched text). Resolve the city's coordinates once and bias
// every search toward them so the candidate pool stays local.
const SEARCH_BIAS_RADIUS_METERS = 20000;
const locationCenterCache = new Map<string, LatLng | null>();

const resolveLocationCenter = async (locationName: string, apiKey: string): Promise<LatLng | null> => {
  const cacheKey = locationName.toLowerCase();
  if (locationCenterCache.has(cacheKey)) {
    return locationCenterCache.get(cacheKey) ?? null;
  }

  try {
    const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.location",
      },
      body: JSON.stringify({ textQuery: locationName }),
    });

    if (!res.ok) {
      locationCenterCache.set(cacheKey, null);
      return null;
    }

    const data = await res.json();
    const location = data?.places?.[0]?.location;
    const center =
      typeof location?.latitude === "number" && typeof location?.longitude === "number"
        ? { latitude: location.latitude, longitude: location.longitude }
        : null;

    locationCenterCache.set(cacheKey, center);
    return center;
  } catch {
    locationCenterCache.set(cacheKey, null);
    return null;
  }
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const locationName = searchParams.get("locationName") || searchParams.get("cityName");

  if (!query) {
    return Response.json({ error: "Missing query" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY!;
  const hasLocationInQuery = locationName
    ? query.toLowerCase().includes(locationName.toLowerCase())
    : false;
  const textQuery = locationName && !hasLocationInQuery ? `${query} in ${locationName}` : query;

  const locationCenter = locationName ? await resolveLocationCenter(locationName, apiKey) : null;

  const res = await fetch(
    "https://places.googleapis.com/v1/places:searchText",

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.id,places.name,places.displayName,places.formattedAddress,places.rating,places.googleMapsUri,places.photos,places.location,places.currentOpeningHours,places.regularOpeningHours",
      },
      body: JSON.stringify({
        textQuery,
        ...(locationCenter
          ? { locationBias: { circle: { center: locationCenter, radius: SEARCH_BIAS_RADIUS_METERS } } }
          : {}),
      }),
    },
  );

  const data = await res.json();
  return Response.json(data);
}
