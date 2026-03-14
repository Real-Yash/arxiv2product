import Link from "next/link";

export function SiteShell({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="app-frame">
      <div className="ambient-grid" />
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="orb orb-three" />
      <header className="site-header">
        <div className="page-shell">
          <div className="nav-shell">
            <Link href="/" className="brand-lockup">
              <span className="brand-mark" />
              <span className="text-lg">arxiv2product</span>
            </Link>
            <nav className="nav-links" aria-label="Primary">
              <Link href="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link href="/generate" className="nav-link">
                Generate
              </Link>
              <Link href="/#how-it-works" className="nav-link">
                How it works
              </Link>
            </nav>
            <Link href="/generate" className="nav-cta nav-cta-subtle">
              Start a report
            </Link>
          </div>
        </div>
      </header>
      <main className="relative z-10 flex-1 pt-8">{children}</main>
      <footer className="relative z-10 footer-shell">
        <div className="page-shell footer-minimal">
          <div>
            <p className="footer-kicker">Research to product ideas</p>
            <p className="footer-copy">
              One free report a day. More when your feedback is actually useful.
            </p>
          </div>
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/generate">Generate</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
