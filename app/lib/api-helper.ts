const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const getData = async function (query: string, cityName: string, placeType: string) {
  const data = await fetch(
    `${baseUrl}/api/cities/?query=${encodeURIComponent(query)}&cityName=${encodeURIComponent(cityName)}&placeType=${encodeURIComponent(placeType)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!data.ok) {
    throw new Error(`Failed to fetch city data: ${data.status} ${data.statusText}`);
  }

  const result = await data.json();
  const places = result.places;

  return places;
};
