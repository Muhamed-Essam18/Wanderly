import { RouteMetrics } from "@/types/journey";

const DEFAULT_DRIVE_KMH = 35;

const haversineDistanceKm = (
  origin: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number },
) => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(destination.latitude - origin.latitude);
  const dLon = toRad(destination.longitude - origin.longitude);
  const lat1 = toRad(origin.latitude);
  const lat2 = toRad(destination.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return 6371 * c;
};

const estimateDurationMinutes = (distanceKm: number) =>
  Math.max(1, Math.round((distanceKm / DEFAULT_DRIVE_KMH) * 60));

const buildFallbackMetrics = (origin: { latitude: number; longitude: number }, destination: { latitude: number; longitude: number }): RouteMetrics => {
  const fallbackDistanceKm = haversineDistanceKm(origin, destination);
  return {
    distanceKm: fallbackDistanceKm,
    durationMinutes: estimateDurationMinutes(fallbackDistanceKm),
  };
};

export const getGoogleRouteMetrics = async (
  origin: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number },
): Promise<RouteMetrics> => {
  const key = process.env.GOOGLE_MAPS_API_KEY;

  if (!origin || !destination) {
    return { distanceKm: null, durationMinutes: null };
  }

  if (!key) {
    return buildFallbackMetrics(origin, destination);
  }

  try {
    const response = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
      },
      body: JSON.stringify({
        origin: {
          location: {
            latLng: {
              latitude: origin.latitude,
              longitude: origin.longitude,
            },
          },
        },
        destination: {
          location: {
            latLng: {
              latitude: destination.latitude,
              longitude: destination.longitude,
            },
          },
        },
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_UNAWARE",
        units: "METRIC",
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return buildFallbackMetrics(origin, destination);
    }

    const json = await response.json();
    const distanceMeters = json?.routes?.[0]?.distanceMeters;
    const routeDuration = json?.routes?.[0]?.duration;
    const distanceKm = typeof distanceMeters === "number" ? distanceMeters / 1000 : null;
    const durationSeconds =
      typeof routeDuration === "string" ? Number(routeDuration.replace("s", "")) : null;
    const durationMinutes =
      typeof durationSeconds === "number" && Number.isFinite(durationSeconds)
        ? Math.max(1, Math.round(durationSeconds / 60))
        : distanceKm !== null
          ? estimateDurationMinutes(distanceKm)
          : null;

    if (distanceKm === null) {
      return buildFallbackMetrics(origin, destination);
    }

    return { distanceKm, durationMinutes };
  } catch {
    return buildFallbackMetrics(origin, destination);
  }
};

const getRouteApiUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL || "http://localhost:3000";
  return new URL("/api/google-route", baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`).toString();
};

export const resolveRouteViaApi = async (
  origin: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number },
): Promise<RouteMetrics> => {
  try {
    const response = await fetch(getRouteApiUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ origin, destination }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Route API request failed");
    }

    return (await response.json()) as RouteMetrics;
  } catch {
    return getGoogleRouteMetrics(origin, destination);
  }
};
