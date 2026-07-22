import { Phone, Mail } from "lucide-react";

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

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 md:py-36 px-6 md:px-10 border-t border-smoke/10 bg-panel"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-copper mb-6">
            Reserveer
          </p>
          <h2
            id="contact-heading"
            className="font-display text-4xl md:text-5xl font-semibold text-smoke leading-snug mb-8"
          >
            Maak een afspraak.
          </h2>
          <p className="text-lg text-smoke/70 leading-relaxed mb-12">
            Online boeken kan altijd, direct in onze agenda. Liever bellen of
            een berichtje sturen? Dat kan ook.
          </p>
        </div>

        {/* Primary CTA */}
        <div className="mb-14">
          <a
            href="https://hallyshair.youcanbook.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center h-14 px-10 font-mono text-sm uppercase tracking-widest bg-copper text-ink hover:bg-bronze transition-all duration-200 cursor-pointer glow-copper"
          >
            Boek een afspraak
          </a>
        </div>

        {/* Secondary contacts */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
          <a
            href="tel:+31646295154"
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="Bel Hallys Hair: +31 6 46295154"
          >
            <Phone
              size={16}
              className="text-copper shrink-0"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="font-mono text-base text-smoke/70 group-hover:text-smoke transition-colors duration-200">
              +31 6 462 951 54
            </span>
          </a>

          <a
            href="https://wa.me/31646295154"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="App Hallys Hair via WhatsApp (opent in nieuw tabblad)"
          >
            {/* WhatsApp icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-copper shrink-0"
              aria-hidden="true"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span className="font-mono text-base text-smoke/70 group-hover:text-smoke transition-colors duration-200">
              WhatsApp
            </span>
          </a>

          <a
            href="https://www.instagram.com/hallyshair/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="Volg Hallys Hair op Instagram (opent in nieuw tabblad)"
          >
            <InstagramIcon size={16} className="text-copper shrink-0" />
            <span className="font-mono text-base text-smoke/70 group-hover:text-smoke transition-colors duration-200">
              @hallyshair
            </span>
          </a>

          <a
            href="mailto:hallyshair@hotmail.com"
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="Stuur een e-mail naar hallyshair@hotmail.com"
          >
            <Mail
              size={16}
              className="text-copper shrink-0"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="font-mono text-base text-smoke/70 group-hover:text-smoke transition-colors duration-200">
              hallyshair@hotmail.com
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
