import { NextRequest, NextResponse } from "next/server";

import { createReportJob } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      paperRef?: string;
      model?: string;
      userId?: string;
    };
    if (!body.paperRef || !body.userId) {
      return new NextResponse("paperRef and userId are required", { status: 400 });
    }

    const result = await createReportJob({
      paperRef: body.paperRef,
      model: body.model,
      userId: body.userId
    });
    return NextResponse.json(result);
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : "Unable to create report job",
      { status: 500 }
    );
  }
}
