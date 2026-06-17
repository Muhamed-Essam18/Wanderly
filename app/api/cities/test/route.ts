import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {

  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    return NextResponse.json({
      success: true,
      message: "MongoDB Connected Successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Connection Failed",
        error,
      },
      { status: 500 }
    );
  }


}