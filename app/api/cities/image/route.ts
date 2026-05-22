import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const rawPhotoName = req.nextUrl.searchParams.get("photoName");

  if (!rawPhotoName) {
    return new Response("Missing photoName", { status: 400 });
  }

  const photoName = decodeURIComponent(rawPhotoName);

  const googleRes = await fetch(
    `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=800`,
    {
      headers: {
        "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY!,
      },
      next: { revalidate: 86000 },
    },
  );

  if (!googleRes.ok) {
    console.error("Google error:", googleRes.status);
    return new Response("Failed to fetch image", { status: 404 });
  }

  const buffer = await googleRes.arrayBuffer();
  console.log("Fetching from Google...");
  return new Response(buffer, {
    headers: {
      "Content-Type": googleRes.headers.get("content-type") || "image/jpeg",
      "Cache-Control": "public, max-age=6000, s-maxage=6000",
    },
  });
}
