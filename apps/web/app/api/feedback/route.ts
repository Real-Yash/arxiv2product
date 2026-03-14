import { NextRequest, NextResponse } from "next/server";

import { scoreFeedback } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.reportId || !body.userId || !body.detailedFeedback) {
      return new NextResponse("reportId, userId, and detailedFeedback are required", {
        status: 400
      });
    }

    const result = await scoreFeedback(body);
    return NextResponse.json(result);
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : "Unable to score feedback",
      { status: 500 }
    );
  }
}
