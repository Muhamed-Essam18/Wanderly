import { NextRequest } from "next/server";
import { getGoogleRouteMetrics } from "@/lib/google-route";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { origin, destination } = body || {};

    if (!origin || !destination) {
      return Response.json(
        { error: "Origin and destination are required" },
        { status: 400 },
      );
    }

    const metrics = await getGoogleRouteMetrics(origin, destination);
    return Response.json(metrics);
  } catch {
    return Response.json({ error: "Unable to resolve route" }, { status: 500 });
  }
}
