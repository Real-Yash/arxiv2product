import Link from "next/link";

import { SiteShell } from "@/components/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <div className="page-shell pb-10">
        <section className="empty-state fade-up">
          <p className="eyebrow">Not found</p>
          <h1 className="title-section mt-5">This report does not exist yet.</h1>
          <p className="text-subtle mt-4">
            It may still be generating, or the link may point to a demo record that has not been
            created in this session.
          </p>
          <div className="mt-6">
            <Link className="btn-primary" href="/dashboard">
              Back to dashboard
            </Link>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
