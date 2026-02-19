import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return Response.json({ error: "Missing query" }, { status: 400 });
  }

  const res = await fetch(
    "https://places.googleapis.com/v1/places:searchText",

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY!,
        "X-Goog-FieldMask":
          "places.displayName,places.formattedAddress,places.rating,places.googleMapsUri,places.photos",
      },
      body: JSON.stringify({
        textQuery: query,
      }),
    },
  );

  const data = await res.json();
  return Response.json(data);
}
