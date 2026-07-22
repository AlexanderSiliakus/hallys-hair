import { MapPin, Clock } from "lucide-react";

const schedule = [
  { day: "Maandag", time: "Gesloten", closed: true },
  { day: "Dinsdag", time: "9:00 – 18:00", closed: false },
  { day: "Woensdag", time: "9:00 – 19:00", closed: false },
  { day: "Donderdag", time: "9:00 – 18:00", closed: false },
  { day: "Vrijdag", time: "10:00 – 22:00", closed: false },
  { day: "Zaterdag", time: "9:00 – 17:00", closed: false },
  { day: "Zondag", time: "Gesloten", closed: true },
];

export default function Hours() {
  return (
    <section
      id="openingstijden"
      className="py-24 md:py-36 px-6 md:px-10 border-t border-smoke/10 bg-ink"
      aria-labelledby="openingstijden-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-copper mb-6">
            Openingstijden & locatie
          </p>
          <h2
            id="openingstijden-heading"
            className="font-display text-4xl md:text-5xl font-semibold text-smoke leading-snug"
          >
            Wanneer en waar.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Schedule */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <Clock size={14} className="text-copper" aria-hidden="true" />
              <span className="font-mono text-sm uppercase tracking-widest text-copper">
                Openingstijden
              </span>
            </div>
            <table className="w-full" aria-label="Openingstijden Hallys Hair">
              <tbody>
                {schedule.map((entry) => (
                  <tr
                    key={entry.day}
                    className="border-b border-smoke/10 last:border-0"
                  >
                    <td className="py-4 font-mono text-sm uppercase tracking-widest text-smoke/65 w-1/2">
                      {entry.day}
                    </td>
                    <td
                      className={`py-4 font-mono text-sm tracking-wide text-right ${
                        entry.closed ? "text-smoke/70" : "text-smoke"
                      }`}
                    >
                      {entry.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <MapPin size={14} className="text-copper" aria-hidden="true" />
                <span className="font-mono text-sm uppercase tracking-widest text-copper">
                  Adres
                </span>
              </div>
              <address className="not-italic space-y-1">
                <p className="text-smoke font-display text-2xl font-semibold">
                  Hueseplein 9
                </p>
                <p className="text-lg text-smoke/70">1185 HH Amstelveen</p>
              </address>
              <a
                href="https://maps.google.com/?q=Hueseplein+9,+1185+HH+Amstelveen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-5 font-mono text-sm uppercase tracking-widest text-copper hover:text-bronze transition-colors duration-200 cursor-pointer"
                aria-label="Bekijk Hueseplein 9 Amstelveen op Google Maps (opent in nieuw tabblad)"
              >
                Bekijk op kaart
                <span className="ml-2" aria-hidden="true">↗</span>
              </a>
            </div>

            {/* Map embed */}
            <div className="relative w-full aspect-video overflow-hidden border border-smoke/10">
              <iframe
                title="Hallys Hair op de kaart — Hueseplein 9, Amstelveen"
                src="https://maps.google.com/maps?q=Hueseplein+9,+1185+HH+Amstelveen&output=embed&z=16"
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full grayscale contrast-[0.8] opacity-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
