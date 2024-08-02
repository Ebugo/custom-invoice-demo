import { templates } from "@/_mock_";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // TODO: use cookie to control this on the server side level
    const body = await request.json();
    return NextResponse.json({
      data: templates,
      success: true,
      message: "Settings saved successfully",
    });
  } catch (error) {
    console.error({ error });
    return NextResponse.json({ data: error });
  }
}
