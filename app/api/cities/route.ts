import { NextRequest } from "next/server";
import modelTest from "../../models/testModel";
import {connectDB} from "../../../lib/mongodb";
import { placesTypes } from "@/Data/Data";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const placeType = searchParams.get("placeType");
  const cityName = searchParams.get("cityName");

  const tags = placesTypes.find((type) => type.name === placeType);
  const tagSet = new Set(tags?.googleInputValue || []);

  if (!query) {
    return Response.json({ error: "Missing query" }, { status: 400 });
  }

  await connectDB();
  const existingData = await modelTest.findOne({ cashKey: query });
  if (existingData) {
    const data = existingData.output;
    console.log("Data retrieved from MongoDB");
    return Response.json(data);
  }

  const res = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY!,
        "X-Goog-FieldMask":
          "places.displayName,places.formattedAddress,places.rating,places.googleMapsUri,places.photos,places.types,",
      },
      body: JSON.stringify({
        textQuery: query,
      }),
    },
  );
  const data = await res.json();
  console.log(data);

  const shouldIncludePlace = (place: any) => {
    if (!place.types) return false;
    if (!tags || (tags.googleInputValue && tags.googleInputValue.length === 0)) {
      return true;
    }
    return place.types.some((type: string) => tagSet.has(type));
  };

  const fetchCachedImage = async (photoName: string) => {
    try {
      const googleRes = await fetch(
        `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=800`,
        {
          headers: {
            "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY!,
          },
        },
      );

      if (!googleRes.ok) {
        console.error("Failed to fetch place image", googleRes.status);
        return null;
      }

      const contentType = googleRes.headers.get("content-type") || "image/jpeg";
      const buffer = Buffer.from(await googleRes.arrayBuffer());
      const base64 = buffer.toString("base64");
      return `data:${contentType};base64,${base64}`;
    } catch (error) {
      console.error("Cached image error", error);
      return null;
    }
  };

  const filteredPlaces = data.places.filter(shouldIncludePlace);
  const cachedPlaces = await Promise.all(
    filteredPlaces.map(async (place: any) => {
      if (!place.photos?.[0]?.name) return place;
      const cachedImage = await fetchCachedImage(place.photos[0].name);
      return cachedImage ? { ...place, cachedImage } : place;
    }),
  );

  const finalData = { places: cachedPlaces };

  console.log(finalData);
  console.log("Data retrieved from Google Places API");

  await modelTest.create({
    city: cityName,
    placeType: placeType,
    cashKey: query,
    output: finalData,
  });

  return Response.json(finalData);
}
