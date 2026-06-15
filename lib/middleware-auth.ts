import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";

/**
 * Middleware to verify JWT token
 * Can be used in any route that needs authentication
 */
export async function verifyAuth(request: NextRequest) {
  try {
    // Get token from cookies or Authorization header
    const tokenFromCookie = request.cookies.get("accessToken")?.value;
    const authHeader = request.headers.get("authorization");
    const tokenFromHeader = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    const token = tokenFromCookie || tokenFromHeader;

    if (!token) {
      return {
        isValid: false,
        error: "No authentication token provided",
        response: NextResponse.json(
          { error: "Unauthorized - No token provided" },
          { status: 401 }
        ),
      };
    }

    // Verify token
    const payload = verifyAccessToken(token);
    if (!payload) {
      return {
        isValid: false,
        error: "Invalid or expired token",
        response: NextResponse.json(
          { error: "Unauthorized - Invalid token" },
          { status: 401 }
        ),
      };
    }

    return {
      isValid: true,
      payload,
      response: null,
    };
  } catch (error: any) {
    return {
      isValid: false,
      error: error.message,
      response: NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      ),
    };
  }
}

/**
 * Helper function to extract user from request
 * Usage: const user = await getUser(request);
 */
export async function getUser(request: NextRequest) {
  const auth = await verifyAuth(request);
  return auth.isValid ? auth.payload : null;
}
