const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  throw new Error(
    "Missing NEXT_PUBLIC_APP_URL or VERCEL_URL environment variable for server-side API requests",
  );
};

export const getData = async function (query: string, cityName: string, placeType: string) {
  const params = new URLSearchParams({
    query,
    cityName,
    placeType,
  });

  const url = typeof window === "undefined"
    ? `${getBaseUrl()}/api/cities?${params.toString()}`
    : `/api/cities?${params.toString()}`;

  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!data.ok) {
    const errorText = await data.text();
    throw new Error(`Failed to fetch city data: ${data.status} ${data.statusText} - ${errorText}`);
  }

  const result = await data.json();
  const places = result.places || [];

  return places;
};
