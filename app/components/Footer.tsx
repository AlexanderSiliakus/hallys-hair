function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-smoke/10 px-6 md:px-10 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Brand + address */}
        <div className="space-y-1">
          <p className="font-display text-base font-semibold tracking-widest text-smoke/80 uppercase">
            Hallys Hair
          </p>
          <address className="not-italic font-mono text-sm text-smoke/70 tracking-wide">
            Hueseplein 9 · 1185 HH Amstelveen
          </address>
        </div>

        {/* Center: KvK placeholder */}
        <p className="font-mono text-sm text-smoke/70 tracking-wide">
          KvK [volgt] &nbsp;·&nbsp; {year}
        </p>

        {/* Right: links */}
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/hallyshair/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-smoke/50 hover:text-copper transition-colors duration-200 cursor-pointer"
            aria-label="Hallys Hair op Instagram (opent in nieuw tabblad)"
          >
            <InstagramIcon size={16} />
          </a>
          <a
            href="#"
            className="font-mono text-sm text-smoke/70 hover:text-smoke transition-colors duration-200 cursor-pointer tracking-wide"
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
