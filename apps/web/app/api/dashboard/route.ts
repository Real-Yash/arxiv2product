import { NextRequest, NextResponse } from "next/server";

import { getDashboardSnapshot } from "@/lib/api";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId") || "demo-reviewer";
  try {
    const dashboard = await getDashboardSnapshot(userId);
    return NextResponse.json(dashboard);
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : "Unable to load dashboard",
      { status: 500 }
    );
  }
}
