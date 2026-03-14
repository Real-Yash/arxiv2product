import { NextRequest, NextResponse } from "next/server";

import { getReportDetail } from "@/lib/api";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await context.params;
  try {
    const report = await getReportDetail(jobId);
    if (!report) {
      return new NextResponse("Report not found", { status: 404 });
    }
    return NextResponse.json(report);
  } catch (error) {
    return new NextResponse(error instanceof Error ? error.message : "Unable to load report", {
      status: 500
    });
  }
}
