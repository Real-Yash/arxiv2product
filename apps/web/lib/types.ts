export type ReportStatus = "queued" | "running" | "completed" | "failed";

export interface DashboardSnapshot {
  user: {
    id: string;
    name: string;
    role: string;
  };
  credits: {
    balance: number;
    freeReportRemainingToday: boolean;
    earnedToday: number;
  };
  stats: {
    generatedReports: number;
    feedbackAccepted: number;
    avgHonestyScore: number;
  };
  reports: ReportCard[];
  recentFeedback: FeedbackCard[];
}

export interface ReportCard {
  id: string;
  paperId: string;
  title: string;
  summary: string;
  createdAt: string;
  status: ReportStatus;
  creditsSpent: number;
}

export interface ReportDetail {
  id: string;
  paperId: string;
  title: string;
  markdown: string;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
  summary: string;
  creditsSpent: number;
}

export interface FeedbackCard {
  id: string;
  reportId: string;
  createdAt: string;
  honestyScore: number;
  usefulnessScore: number;
  creditsAwarded: number;
  note: string;
}

export interface CreateReportRequest {
  paperRef: string;
  model?: string;
  userId: string;
}

export interface CreateReportResponse {
  id: string;
  status: ReportStatus;
  creditsSpent: number;
}

export interface ScoreFeedbackRequest {
  reportId: string;
  userId: string;
  honestyRating: number;
  usefulnessRating: number;
  detailedFeedback: string;
}

export interface ScoreFeedbackResponse {
  feedbackId: string;
  honestyScore: number;
  usefulnessScore: number;
  specificityScore: number;
  score: number;
  creditsAwarded: number;
  rationale: string;
}
