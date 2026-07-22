import Image from "next/image";

export default function About() {
  return (
    <section
      id="over"
      className="py-24 md:py-36 px-6 md:px-10 bg-ink"
      aria-labelledby="over-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text */}
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-copper mb-6">
              Over de zaak
            </p>
            <h2
              id="over-heading"
              className="font-display text-4xl md:text-5xl font-semibold text-smoke leading-snug mb-8"
            >
              Hallys Hair
              <br />
              in Amstelveen.
            </h2>
            <div className="space-y-5 text-lg text-smoke/80 leading-relaxed">
              <p>
                Hallys Hair zit op Hueseplein 9 in Amstelveen. Een kleine,
                persoonlijke zaak waar Hally en het team je knippen.
              </p>
              <p>
                Je krijgt de tijd die nodig is voor een goede knipbeurt. Geen
                haast, geen lange wachtrij.
              </p>
              <p>
                Veel klanten komen al jaren terug, vaak met hun kinderen erbij.
              </p>
            </div>
            <div className="mt-10">
              <a
                href="https://hallyshair.youcanbook.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center h-11 px-7 font-mono text-sm uppercase tracking-widest bg-copper text-ink hover:bg-bronze transition-all duration-200 cursor-pointer glow-copper"
              >
                Boek een afspraak
              </a>
            </div>
          </div>

          {/* Photos grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/foto-zaak/IMG_1197.jpeg"
                alt="Hally aan het werk in de barbershop op Hueseplein, Amstelveen"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 45vw, 22vw"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden mt-8">
              <Image
                src="/foto-zaak/IMG_1198.jpeg"
                alt="Strak gesneden krullend haar — resultaat bij Hallys Hair"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 45vw, 22vw"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/foto-zaak/IMG_1199.jpeg"
                alt="Strak gesneden haar met taper fade bij Hallys Hair Amstelveen"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 45vw, 22vw"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden mt-8">
              <Image
                src="/foto-zaak/IMG_1206.jpeg"
                alt="Klassieke coupe bij Hallys Hair — precisie en stijl"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 45vw, 22vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
