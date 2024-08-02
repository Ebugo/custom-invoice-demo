import { templates } from "@/_mock_";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    data: templates,
    success: true,
    message: "Templates fetched successfully",
  });
}
