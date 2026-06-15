import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/middleware-auth";

/**
 * Example protected route
 * This route requires authentication and returns the current user's info
 */
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const auth = await verifyAuth(request);

    if (!auth.isValid) {
      if (auth.response) {
        return auth.response;
      }
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // auth.payload contains { userId, email }
    return NextResponse.json(
      {
        message: "User profile retrieved successfully",
        user: auth.payload,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Profile error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
