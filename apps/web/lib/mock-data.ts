import {
  DashboardSnapshot,
  ReportDetail,
  ReportStatus,
  ScoreFeedbackRequest,
  ScoreFeedbackResponse
} from "@/lib/types";

function nowMinus(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

export const demoDashboard: DashboardSnapshot = {
  user: {
    id: "demo-reviewer",
    name: "Maya Reviewer",
    role: "Reader / Reviewer"
  },
  credits: {
    balance: 7,
    freeReportRemainingToday: true,
    earnedToday: 3
  },
  stats: {
    generatedReports: 18,
    feedbackAccepted: 12,
    avgHonestyScore: 83
  },
  reports: [
    {
      id: "demo-evo-scientist",
      paperId: "2603.08127",
      title: "EvoScientist",
      summary: "Multi-agent scientific discovery turned into lab ops, review intelligence, and tooling bets.",
      createdAt: nowMinus(6),
      status: "completed",
      creditsSpent: 0
    },
    {
      id: "demo-vision-agent",
      paperId: "2603.09229",
      title: "Vision-Agent Systems",
      summary: "Operational tooling ideas for high-throughput multimodal agent teams.",
      createdAt: nowMinus(28),
      status: "running",
      creditsSpent: 1
    },
    {
      id: "demo-biology-sim",
      paperId: "2509.12345",
      title: "Biology Simulation Acceleration",
      summary: "Platform-risky, infrastructure-rich ideas around new throughput bottlenecks.",
      createdAt: nowMinus(70),
      status: "queued",
      creditsSpent: 1
    }
  ],
  recentFeedback: [
    {
      id: "fb-1",
      reportId: "demo-evo-scientist",
      createdAt: nowMinus(3),
      honestyScore: 91,
      usefulnessScore: 88,
      creditsAwarded: 2,
      note: "Called out the weak buyer assumptions instead of just praising the ideas."
    },
    {
      id: "fb-2",
      reportId: "demo-vision-agent",
      createdAt: nowMinus(19),
      honestyScore: 77,
      usefulnessScore: 74,
      creditsAwarded: 1,
      note: "Specific objections around data ingestion and rollout risk."
    }
  ]
};

const reports: Record<string, ReportDetail> = {
  "demo-evo-scientist": {
    id: "demo-evo-scientist",
    paperId: "2603.08127",
    title: "EvoScientist",
    status: "completed",
    createdAt: nowMinus(6),
    updatedAt: nowMinus(5),
    creditsSpent: 0,
    summary: "A report on how multi-agent science systems can become software products for labs and R&D teams.",
    markdown: `# EvoScientist Report

## #1: Autonomous Experiment Review Room
> A reviewer cockpit for ranking hypotheses, simulation outputs, and experiment branches.

### Core Insight
The paper normalizes autonomous scientific loops. The product angle is not another agent shell, but the coordination, gating, and review layer labs will need once these loops are common.

### Market
First buyers are biotech platform teams, applied research labs, and AI-enabled materials teams.

### Verdict: 87/100

## #2: R&D Drift Monitor
> Detects when exploration agents begin optimizing for convenience instead of scientific novelty.

### Core Insight
As autonomous science teams scale, trust and auditability become the hidden software category.

### Verdict: 81/100`
  },
  "demo-vision-agent": {
    id: "demo-vision-agent",
    paperId: "2603.09229",
    title: "Vision-Agent Systems",
    status: "running",
    createdAt: nowMinus(28),
    updatedAt: nowMinus(1),
    creditsSpent: 1,
    summary: "Still synthesizing the strongest surviving ideas.",
    markdown: `# Report in progress

The pipeline is still running. Refresh shortly to load the final markdown report.`
  },
  "demo-biology-sim": {
    id: "demo-biology-sim",
    paperId: "2509.12345",
    title: "Biology Simulation Acceleration",
    status: "queued",
    createdAt: nowMinus(70),
    updatedAt: nowMinus(70),
    creditsSpent: 1,
    summary: "Queued for execution.",
    markdown: `# Report queued

This report is waiting for an execution slot.`
  }
};

export function getDemoReport(reportId: string): ReportDetail | null {
  return reports[reportId] ?? null;
}

export function simulateReportCreation(paperRef: string): {
  id: string;
  status: ReportStatus;
  creditsSpent: number;
} {
  return {
    id: `demo-${paperRef.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}`,
    status: "queued",
    creditsSpent: demoDashboard.credits.freeReportRemainingToday ? 0 : 1
  };
}

export function simulateFeedbackScore(
  payload: ScoreFeedbackRequest
): ScoreFeedbackResponse {
  const lengthScore = Math.min(100, Math.round(payload.detailedFeedback.length / 6));
  const honestyScore = Math.round((payload.honestyRating * 16 + lengthScore) / 2);
  const usefulnessScore = Math.round((payload.usefulnessRating * 16 + lengthScore) / 2);
  const specificityScore = Math.max(48, Math.min(96, lengthScore));
  const score = Math.round((honestyScore + usefulnessScore + specificityScore) / 3);
  const creditsAwarded = score >= 82 ? 2 : score >= 68 ? 1 : 0;

  return {
    feedbackId: `feedback-${payload.reportId}`,
    honestyScore,
    usefulnessScore,
    specificityScore,
    score,
    creditsAwarded,
    rationale:
      creditsAwarded > 0
        ? "Feedback contained concrete objections and non-generic reasoning, so it qualifies for reviewer credits."
        : "Feedback was too shallow or too generic to earn additional credits."
  };
}
