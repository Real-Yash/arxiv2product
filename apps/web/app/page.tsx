import Link from "next/link";

import { SiteShell } from "@/components/site-shell";

export default function HomePage() {
  return (
    <SiteShell>
      <div className="page-shell pb-10">
        <section className="hero-shell">
          <div className="hero-main fade-up">
            <span className="eyebrow">Scientific paper intelligence for builders</span>
            <h1 className="title-hero text-balance">
              Research-grade ideas, reviewer-grade skepticism, one shared dashboard.
            </h1>
            <p className="hero-copy text-subtle">
              arxiv2product turns scientific papers into ranked product bets, then gives readers a
              sharper loop: call out weak buyer logic, fake moats, and shallow GTM, and earn more
              report credits when your feedback is actually useful.
            </p>
            <div className="hero-actions">
              <Link className="btn-primary" href="/dashboard">
                Open dashboard
              </Link>
              <Link className="btn-secondary" href="/generate">
                Generate a report
              </Link>
              <a className="btn-ghost" href="#how-it-works">
                See the review loop
              </a>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="notice-card fade-up fade-delay-1">
                <p className="metric-label">Report engine</p>
                <strong className="mt-3 block text-xl">Pipeline-backed</strong>
                <p className="helper-text mt-2">
                  Existing `arxiv2product` analysis, synthesis, and red-teaming stays underneath the UI.
                </p>
              </div>
              <div className="notice-card fade-up fade-delay-2">
                <p className="metric-label">Credit logic</p>
                <strong className="mt-3 block text-xl">1 free every day</strong>
                <p className="helper-text mt-2">
                  Reviewers earn more runs when the system agrees the feedback was honest and specific.
                </p>
              </div>
              <div className="notice-card fade-up fade-delay-3">
                <p className="metric-label">Reviewer posture</p>
                <strong className="mt-3 block text-xl">Skepticism rewarded</strong>
                <p className="helper-text mt-2">
                  The product is designed for challenging output, not just consuming it.
                </p>
              </div>
            </div>
          </div>

          <aside className="hero-side fade-up fade-delay-2">
            <span className="eyebrow-dark">Today&apos;s shape</span>
            <div className="signal-grid">
              <div className="signal-card">
                <span className="signal-value">1</span>
                <p className="signal-note">free report per reviewer, reset every UTC day</p>
              </div>
              <div className="signal-card">
                <span className="signal-value">+2</span>
                <p className="signal-note">credits for top-scoring feedback with real critique</p>
              </div>
              <div className="signal-card">
                <span className="signal-value">5</span>
                <p className="signal-note">analysis lenses from primitives to market attacks</p>
              </div>
              <div className="signal-card">
                <span className="signal-value">∞</span>
                <p className="signal-note">papers you can challenge, rank, and revisit</p>
              </div>
            </div>

            <div className="section-divider" />

            <div id="how-it-works" className="timeline-stack">
              <div className="timeline-step">
                <span className="timeline-index">01</span>
                <div>
                  <h3 className="title-subsection text-white">Generate a paper report</h3>
                  <p className="signal-note">
                    Submit an arXiv ID or URL and let the pipeline synthesize product opportunities.
                  </p>
                </div>
              </div>
              <div className="timeline-step">
                <span className="timeline-index">02</span>
                <div>
                  <h3 className="title-subsection text-white">Review like an operator</h3>
                  <p className="signal-note">
                    Attack weak assumptions, fake buyer logic, and overconfident positioning.
                  </p>
                </div>
              </div>
              <div className="timeline-step">
                <span className="timeline-index">03</span>
                <div>
                  <h3 className="title-subsection text-white">Compound your credits</h3>
                  <p className="signal-note">
                    High-quality feedback earns more generations and better future reports.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="section-shell">
          <div className="surface-panel fade-up">
            <span className="eyebrow">What makes this different</span>
            <h2 className="title-section mt-5 text-balance">
              Less “AI summary page”, more product control room for frontier research.
            </h2>
            <div className="idea-stack mt-8">
              <div className="notice-card">
                <strong className="block text-lg">Product-first outputs</strong>
                <p className="helper-text mt-2">
                  The report viewer is built around ranking, risk, buyer fit, and deployment realism.
                </p>
              </div>
              <div className="notice-card">
                <strong className="block text-lg">Feedback as a product mechanic</strong>
                <p className="helper-text mt-2">
                  Reader critique is not an afterthought. It is the path to more credits and stronger data.
                </p>
              </div>
              <div className="notice-card">
                <strong className="block text-lg">Async by default</strong>
                <p className="helper-text mt-2">
                  Report generation, status, and revisit flows are designed for a real pipeline, not instant fake demos.
                </p>
              </div>
            </div>
          </div>

          <div className="surface-panel-strong fade-up fade-delay-2">
            <span className="eyebrow">Ideal readers</span>
            <h2 className="title-subsection mt-5">Who this dashboard is for</h2>
            <div className="idea-stack mt-6">
              <div className="report-card !p-5">
                <strong className="block text-lg">Technical founders</strong>
                <p className="helper-text mt-2">
                  People scanning papers for overlooked startup wedges, not abstract summaries.
                </p>
              </div>
              <div className="report-card !p-5">
                <strong className="block text-lg">Research operators</strong>
                <p className="helper-text mt-2">
                  Teams who want a clearer bridge between new methods and productizable workflows.
                </p>
              </div>
              <div className="report-card !p-5">
                <strong className="block text-lg">Brutal reviewers</strong>
                <p className="helper-text mt-2">
                  Readers who know that useful feedback sounds more like objection handling than applause.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
