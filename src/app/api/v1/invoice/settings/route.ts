import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false, // Disables the default body parser
  },
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const body = Object.fromEntries(formData);
    const file = (body.file as Blob) || null;

    // Make use of data in fields and file in files

    return NextResponse.json({
      data: { ...body, file: Buffer.from(await file.arrayBuffer()) },
      success: true,
      message: "Settings saved successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred",
        error,
      },
      { status: 400 }
    );
  }
}
