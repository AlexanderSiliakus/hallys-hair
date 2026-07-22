"use client";

import { useState } from "react";
import { Scissors, ScissorsLineDashed, Palette, Baby, Sparkles, ChevronDown } from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "Heren knippen",
    price: "€ 37,00",
    duration: "29 minuten",
  },
  {
    icon: Scissors,
    title: "Dames knippen",
    price: "€ 47,00",
    duration: "39 minuten",
  },
  {
    icon: Scissors,
    title: "Knippen t/m 17 jaar",
    price: "€ 32,00",
    duration: "21 minuten",
  },
  {
    icon: Baby,
    title: "Kinderen t/m 8 jaar",
    price: "€ 29,00",
    duration: "19 minuten",
  },
  {
    icon: Baby,
    title: "2x kinderen t/m 8 jaar",
    price: "€ 58,00",
    duration: "38 minuten",
  },
  {
    icon: Sparkles,
    title: "Signature Treatment",
    price: "€ 99,00",
    duration: "1 uur",
    description:
      "Wassen, hoofdmassage, haarmasker met warme handdoek, gezichtsmasker, knippen en styling. Inclusief stylingproduct voor thuis.",
  },
  {
    icon: ScissorsLineDashed,
    title: "Baard trimmen",
    price: "€ 18,00",
    duration: "15 minuten",
  },
  {
    icon: Palette,
    title: "Kleuren",
    price: "vanaf € 40,00",
    description: "Voor kleuren graag een bericht via WhatsApp.",
    whatsapp: "https://wa.me/31646295154",
  },
];

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="diensten"
      className="py-24 md:py-36 px-6 md:px-10 border-t border-smoke/10 bg-panel"
      aria-labelledby="diensten-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-copper mb-6">
            Diensten
          </p>
          <h2
            id="diensten-heading"
            className="font-display text-4xl md:text-5xl font-semibold text-smoke leading-snug max-w-xl"
          >
            Wat we doen.
          </h2>
          <p className="mt-6 text-lg text-smoke/70 max-w-lg leading-relaxed">
            Een overzicht van onze diensten en prijzen.
          </p>
        </div>

        {/* Mobile: collapsible accordion, one row per service */}
        <div className="md:hidden flex flex-col divide-y divide-smoke/10 border-y border-smoke/10">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isOpen = openIndex === index;
            return (
              <div key={service.title}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`dienst-${index}`}
                  className="w-full py-6 flex items-center gap-4 text-left cursor-pointer"
                >
                  <Icon
                    size={20}
                    className="text-copper shrink-0"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-xl font-semibold text-smoke flex-1">
                    {service.title}
                  </h3>
                  <span className="font-mono text-sm text-copper tracking-wide shrink-0">
                    {service.price}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-smoke/50 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <div
                  id={`dienst-${index}`}
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 pl-9">
                      {service.duration && (
                        <p className="font-mono text-sm text-smoke/70 tracking-wide mb-2">
                          {service.duration}
                        </p>
                      )}
                      {service.description && (
                        <p className="text-base text-smoke/65 leading-relaxed max-w-2xl">
                          {service.description}{" "}
                          {service.whatsapp && (
                            <a
                              href={service.whatsapp}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-copper hover:text-bronze transition-colors duration-200 cursor-pointer underline underline-offset-2"
                            >
                              06 46 29 51 54
                            </a>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: full static list, everything visible */}
        <div className="hidden md:flex md:flex-col divide-y divide-smoke/10 border-y border-smoke/10">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="py-8 md:py-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-10"
              >
                <div className="flex items-center gap-4 md:w-72 shrink-0">
                  <Icon
                    size={20}
                    className="text-copper shrink-0"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-2xl font-semibold text-smoke">
                    {service.title}
                  </h3>
                </div>
                <p className="font-mono text-sm text-copper tracking-wide md:w-56 shrink-0">
                  {service.price}
                  {service.duration && (
                    <span className="text-smoke/70"> · {service.duration}</span>
                  )}
                </p>
                {service.description && (
                  <p className="text-base text-smoke/65 leading-relaxed">
                    {service.description}{" "}
                    {service.whatsapp && (
                      <a
                        href={service.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-copper hover:text-bronze transition-colors duration-200 cursor-pointer underline underline-offset-2"
                      >
                        06 46 29 51 54
                      </a>
                    )}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="https://hallyshair.youcanbook.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center h-11 px-7 font-mono text-sm uppercase tracking-widest border border-copper text-copper hover:bg-copper hover:text-ink transition-all duration-200 cursor-pointer glow-copper-hover"
          >
            Boek een afspraak
          </a>
        </div>
      </div>
    </section>
  );
}
