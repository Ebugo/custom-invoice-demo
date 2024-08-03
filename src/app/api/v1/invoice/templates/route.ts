import { templates } from "@/_mock_";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    data: templates,
    success: true,
    message: "Templates fetched successfully",
  });
}
