import {
  CreateReportRequest,
  CreateReportResponse,
  DashboardSnapshot,
  ReportDetail,
  ScoreFeedbackRequest,
  ScoreFeedbackResponse
} from "@/lib/types";
import {
  demoDashboard,
  getDemoReport,
  simulateFeedbackScore,
  simulateReportCreation
} from "@/lib/mock-data";

const baseUrl = process.env.PIPELINE_API_BASE_URL?.replace(/\/$/, "");

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  if (!baseUrl) {
    throw new Error("PIPELINE_API_BASE_URL is not configured.");
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function getDashboardSnapshot(userId: string): Promise<DashboardSnapshot> {
  if (!baseUrl) {
    return demoDashboard;
  }
  return fetchJson<DashboardSnapshot>(`/dashboard/${userId}`);
}

export async function createReportJob(
  payload: CreateReportRequest
): Promise<CreateReportResponse> {
  if (!baseUrl) {
    return simulateReportCreation(payload.paperRef);
  }
  return fetchJson<CreateReportResponse>("/reports", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function getReportDetail(reportId: string): Promise<ReportDetail | null> {
  if (!baseUrl) {
    return getDemoReport(reportId);
  }
  return fetchJson<ReportDetail>(`/reports/${reportId}`);
}

export async function scoreFeedback(
  payload: ScoreFeedbackRequest
): Promise<ScoreFeedbackResponse> {
  if (!baseUrl) {
    return simulateFeedbackScore(payload);
  }
  return fetchJson<ScoreFeedbackResponse>("/feedback/score", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
