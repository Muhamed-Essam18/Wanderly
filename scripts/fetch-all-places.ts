import fs from "fs";
import path from "path";

const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, "utf8");
  for (const line of env.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (!key) continue;
    if (process.env[key] === undefined) {
      process.env[key] = rest.join("=");
    }
  }
}

const { connectDB } = await import("../lib/mongodb.ts");
const modelTest = (await import("../app/models/testModel.ts")).default;
const { countries, placesTypes } = await import("../Data/Data.ts");

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchPlacesForCity(city: string, placeType: { name: string; googleInputValue: string[] }) {
  const query = `${placeType.name} in ${city}`;
  const existing = await modelTest.findOne({ city, placeType: placeType.name, cashKey: query });
  if (existing) {
    console.log(`Skipping existing entry: ${city} / ${placeType.name}`);
    return;
  }

  const tags = placeType;
  const tagSet = new Set(tags.googleInputValue || []);

  if (!process.env.GOOGLE_MAPS_API_KEY) {
    throw new Error("Missing GOOGLE_MAPS_API_KEY in environment");
  }

  console.log(`Fetching: ${query}`);
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
      "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.rating,places.googleMapsUri,places.photos,places.types",
    },
    body: JSON.stringify({ textQuery: query }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`Google Places API failed for ${query}:`, res.status, body);
    return;
  }

  const data = await res.json();
  const places = Array.isArray(data.places) ? data.places : [];

  const shouldIncludePlace = (place: any) => {
    if (!place.types) return false;
    if (!tags || tags.googleInputValue.length === 0) {
      return true;
    }
    return place.types.some((type: string) => tagSet.has(type));
  };

  const fetchCachedImage = async (photoName: string) => {
    try {
      const googleRes = await fetch(
        `https://places.googleapis.com/v1/${encodeURIComponent(photoName)}/media?maxWidthPx=800`,
        {
          headers: {
            "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY!,
          },
        },
      );

      if (!googleRes.ok) {
        console.warn(`Failed to fetch image for ${photoName}:`, googleRes.status);
        return null;
      }

      const contentType = googleRes.headers.get("content-type") || "image/jpeg";
      const buffer = Buffer.from(await googleRes.arrayBuffer());
      return `data:${contentType};base64,${buffer.toString("base64")}`;
    } catch (error) {
      console.warn(`Image fetch error for ${photoName}:`, error);
      return null;
    }
  };

  const filtered = places.filter(shouldIncludePlace);
  const cachedPlaces = await Promise.all(
    filtered.map(async (place: any) => {
      const photoName = place.photos?.[0]?.name;
      if (!photoName) return place;
      const cachedImage = await fetchCachedImage(photoName);
      return cachedImage ? { ...place, cachedImage } : place;
    }),
  );

  const finalData = { places: cachedPlaces };
  await modelTest.findOneAndUpdate(
    { city, placeType: placeType.name, cashKey: query },
    { city, placeType: placeType.name, cashKey: query, output: finalData },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  console.log(`Stored: ${city} / ${placeType.name} (${cachedPlaces.length} places)`);
}

async function run() {
  try {
    await connectDB();
    const cities = countries.flatMap((country) => country.cities.map((city) => ({ country: country.name, city })));

    for (const { city } of cities) {
      for (const placeType of placesTypes) {
        await fetchPlacesForCity(city, placeType);
        await sleep(1200);
      }
    }

    console.log("All data fetch complete.");
  } catch (error) {
    console.error("Script failed:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

run();
