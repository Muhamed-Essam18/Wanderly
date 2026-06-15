export const getData = async function (query: string, cityName: string, placeType: string) {
  const params = new URLSearchParams({
    query,
    cityName,
    placeType,
  });

  const data = await fetch(`/api/cities?${params.toString()}`, {
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
