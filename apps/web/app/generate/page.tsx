import { GenerateReportForm } from "@/components/generate-report-form";
import { SiteShell } from "@/components/site-shell";
import { getAppSession } from "@/lib/session";

export default async function GeneratePage() {
  const session = await getAppSession();

  return (
    <SiteShell>
      <div className="page-shell max-w-3xl pb-10">
        <section className="surface-panel fade-up text-center">
          <span className="eyebrow">Start a report</span>
          <h1 className="title-section mt-5">
            Submit a paper and let the pipeline do the heavy lifting.
          </h1>
          <p className="text-subtle mt-4 mx-auto max-w-2xl">
            Jobs run asynchronously. Readers can come back later to inspect the report and earn
            more credits by reviewing it honestly.
          </p>
        </section>
        <section className="form-shell fade-up fade-delay-1 mt-6">
          <GenerateReportForm userId={session.userId} />
        </section>
      </div>
    </SiteShell>
  );
}
