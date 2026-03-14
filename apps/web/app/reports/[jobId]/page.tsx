import { notFound } from "next/navigation";

import { FeedbackForm } from "@/components/feedback-form";
import { ReportMarkdown } from "@/components/report-markdown";
import { SiteShell } from "@/components/site-shell";
import { getReportDetail } from "@/lib/api";
import { getAppSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function ReportPage({
  params
}: Readonly<{
  params: Promise<{ jobId: string }>;
}>) {
  const { jobId } = await params;
  const session = await getAppSession();
  const report = await getReportDetail(jobId);

  if (!report) {
    notFound();
  }

  return (
    <SiteShell>
      <div className="page-shell pb-10">
        <section className="report-grid">
          <div className="surface-panel-strong fade-up">
            <p className="eyebrow">Report detail</p>
            <h1 className="title-section mt-5">{report.title}</h1>
            <div className="chip-row mt-5 mb-5">
              <span className="status-pill">
                <span
                  className={`status-dot ${
                    report.status === "completed"
                      ? "bg-emerald-500"
                      : report.status === "failed"
                        ? "bg-red-500"
                        : report.status === "running"
                          ? "bg-amber-400 animate-pulse"
                          : "bg-[color:var(--violet)]"
                  }`}
                />
                {report.status}
              </span>
              <span className="chip">Paper {report.paperId}</span>
              <span className="chip">Credits {report.creditsSpent}</span>
              <span className="chip">Updated {new Date(report.updatedAt).toLocaleString()}</span>
            </div>
            <p className="text-subtle mb-8">{report.summary}</p>
            <ReportMarkdown markdown={report.markdown} />
          </div>
          <div className="side-column">
            <div className="surface-panel fade-up fade-delay-1">
              <p className="eyebrow">Review posture</p>
              <h2 className="title-subsection mt-5">What readers should challenge</h2>
              <div className="idea-stack mt-6">
                <div className="notice-card">
                  <strong className="block text-lg">Buyer realism</strong>
                  <p className="helper-text mt-2">
                    Was the buyer specific enough to actually buy software, or was it hand-wavy market theater?
                  </p>
                </div>
                <div className="notice-card">
                  <strong className="block text-lg">Product sharpness</strong>
                  <p className="helper-text mt-2">
                    Did the report overrate generic platform ideas or identify a real wedge and workflow?
                  </p>
                </div>
                <div className="notice-card">
                  <strong className="block text-lg">Honest risk</strong>
                  <p className="helper-text mt-2">
                    Were deployment, GTM, and incumbent risk discussed with enough honesty?
                  </p>
                </div>
              </div>
            </div>
            <div className="form-shell fade-up fade-delay-2">
              <FeedbackForm reportId={report.id} userId={session.userId} />
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
