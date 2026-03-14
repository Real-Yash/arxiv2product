import Link from "next/link";

import { GenerateReportForm } from "@/components/generate-report-form";
import { SiteShell } from "@/components/site-shell";
import { getDashboardSnapshot } from "@/lib/api";
import { getAppSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getAppSession();
  const dashboard = await getDashboardSnapshot(session.userId);

  return (
    <SiteShell>
      <div className="page-shell pb-10">
        <section className="surface-panel dashboard-top fade-up">
          <div className="dashboard-topbar">
            <div>
              <span className="eyebrow">Dashboard</span>
              <h1 className="title-section mt-5 text-balance">Reports, credits, and one clear next action.</h1>
              <p className="text-subtle">
                Signed in as <strong className="text-zinc-700">{dashboard.user.name}</strong> (
                {dashboard.user.role}). Data source: {session.source}.
              </p>
            </div>
            <div className="chip-row dashboard-chip-row">
              <span className="chip">
                Free today
                <strong>{dashboard.credits.freeReportRemainingToday ? "available" : "used"}</strong>
              </span>
              <span className="chip">
                Balance
                <strong>{dashboard.credits.balance}</strong>
              </span>
              <span className="chip">
                Earned today
                <strong className="text-[color:var(--emerald)]">+{dashboard.credits.earnedToday}</strong>
              </span>
            </div>
          </div>
          <div className="dashboard-summary mt-8">
            <div>
              <p className="metric-label">Reports generated</p>
              <strong>{dashboard.stats.generatedReports}</strong>
            </div>
            <div>
              <p className="metric-label">Feedback accepted</p>
              <strong>{dashboard.stats.feedbackAccepted}</strong>
            </div>
            <div>
              <p className="metric-label">Average honesty</p>
              <strong>{dashboard.stats.avgHonestyScore}</strong>
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="side-column">
            <div className="surface-panel-strong fade-up">
              <div className="dashboard-section-head">
                <div>
                  <span className="eyebrow">Reports</span>
                  <h2 className="title-subsection mt-5">Recent reports</h2>
                </div>
                <Link href="/generate" className="btn-secondary">
                  New report
                </Link>
              </div>
              <div className="report-list mt-8">
                {dashboard.reports.map((report, index) => (
                  <Link
                    key={report.id}
                    href={`/reports/${report.id}`}
                    className={`report-card fade-up ${index === 1 ? "fade-delay-1" : index >= 2 ? "fade-delay-2" : ""}`}
                  >
                    <div className="report-card-inner">
                      <div className="report-card-copy">
                        <h3 className="title-subsection mt-2">{report.title}</h3>
                        <p className="helper-text mt-3">{report.summary}</p>
                      </div>
                      <div className="report-card-meta">
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
                        <span className="report-meta-line">{new Date(report.createdAt).toLocaleDateString()}</span>
                        <span className="report-meta-line">Credits {report.creditsSpent}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="side-column dashboard-rail">
            <div className="form-shell fade-up fade-delay-1">
              <GenerateReportForm userId={session.userId} />
            </div>
            <div className="surface-panel-strong fade-up fade-delay-2" id="feedback">
              <span className="eyebrow">Feedback credits</span>
              <h2 className="title-subsection mt-5">Recent signal</h2>
              <p className="helper-text mt-3">
                Feedback works best at the report level. Use the report page when you want to earn
                more credits.
              </p>
              <div className="compact-feedback-list mt-6">
                {dashboard.recentFeedback.slice(0, 3).map((entry) => (
                  <div key={entry.id} className="compact-feedback-item">
                    <div className="chip-row">
                      <span className="chip">H {entry.honestyScore}</span>
                      <span className="chip">U {entry.usefulnessScore}</span>
                      <span className="chip">+{entry.creditsAwarded}</span>
                    </div>
                    <p className="helper-text mt-3">{entry.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
