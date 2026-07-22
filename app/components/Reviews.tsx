"use client";

import { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Feline Liem",
    date: "5 maanden geleden",
    text: "Super goede jongens kapper! We komen hier al jaren, kinderen zijn op gemak bij Hally. Gaat lekker snel en altijd goed geknipt!",
  },
  {
    id: 2,
    name: "Wen Dietz",
    date: "2 weken geleden",
    text: "Fijne salon, zowel Hally als Yente heel professionele kappers en klantvriendelijk. Goede sfeer in de mooie salon.",
  },
  {
    id: 3,
    name: "menno wagenaar",
    date: "een jaar geleden",
    text: "Top kapper voor jong en oud. Klantvriendelijk, knipt snel en zeer goed tegelijk. Goede bereikbaarheid, openbaar vervoer dichtbij en parkeren voor de deur.",
  },
];

const googleReviewsUrl =
  "https://www.google.com/maps/place/Hallys+Hair/@52.296705,4.8524421,17z/data=!3m1!4b1!4m6!3m5!1s0x47c60b7db5417cb3:0xeaa76fee3feaa59a!8m2!3d52.2967017!4d4.855017!16s%2Fg%2F11h1s9xdjh";

const AUTO_ADVANCE_MS = 6000;

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    if (paused || reducedMotionRef.current) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % reviews.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const goTo = (i: number) => setIndex((i + reviews.length) % reviews.length);

  return (
    <section
      id="reviews"
      className="py-24 md:py-36 px-6 md:px-10 border-t border-smoke/10 bg-ink"
      aria-labelledby="reviews-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-copper mb-6">
            Reviews
          </p>
          <h2
            id="reviews-heading"
            className="font-display text-4xl md:text-5xl font-semibold text-smoke leading-snug"
          >
            Wat klanten zeggen.
          </h2>
        </div>

        {/* Mobile: auto-advancing carousel */}
        <div
          className="md:hidden relative max-w-2xl mx-auto"
          role="region"
          aria-roledescription="carousel"
          aria-label="Klantreviews"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {reviews.map((review, i) => (
                <article
                  key={review.id}
                  className="w-full shrink-0 p-8 md:p-12 flex flex-col items-center gap-6 text-center"
                  aria-hidden={i !== index}
                  aria-label={`Review ${i + 1} van ${reviews.length}`}
                >
                  <div className="flex gap-1" aria-label="5 van 5 sterren">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        size={14}
                        className="text-gold fill-gold"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <blockquote className="text-smoke/70 leading-relaxed italic font-display text-lg md:text-xl font-medium max-w-xl">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>

                  <footer className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-smoke/5 flex items-center justify-center">
                      <span className="font-mono text-xs text-copper">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="text-base text-smoke font-medium">{review.name}</p>
                      <p className="font-mono text-sm text-smoke/70 tracking-wide">
                        {review.date}
                      </p>
                    </div>
                  </footer>
                </article>
              ))}
            </div>
          </div>

          {/* Prev/next controls */}
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Vorige review"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 flex items-center justify-center text-smoke/50 hover:text-smoke transition-colors duration-200 cursor-pointer"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Volgende review"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 flex items-center justify-center text-smoke/50 hover:text-smoke transition-colors duration-200 cursor-pointer"
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>

          {/* Dot indicators */}
          <div className="mt-8 flex justify-center gap-3">
            {reviews.map((review, i) => (
              <button
                key={review.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ga naar review ${i + 1}`}
                aria-current={i === index}
                className="p-2 cursor-pointer"
              >
                <span
                  className={`block w-2 h-2 rounded-full transition-colors duration-200 ${
                    i === index ? "bg-copper" : "bg-smoke/20"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: static 3-column grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-px bg-smoke/10">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="bg-ink p-8 md:p-10 flex flex-col gap-6"
              aria-label={`Review van ${review.name}`}
            >
              <div className="flex gap-1" aria-label="5 van 5 sterren">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className="text-gold fill-gold"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="text-smoke/70 leading-relaxed italic font-display text-lg font-medium flex-1">
                &ldquo;{review.text}&rdquo;
              </blockquote>

              <footer className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-smoke/5 flex items-center justify-center">
                  <span className="font-mono text-xs text-copper">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-base text-smoke font-medium">{review.name}</p>
                  <p className="font-mono text-sm text-smoke/70 tracking-wide">
                    {review.date}
                  </p>
                </div>
              </footer>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center h-11 px-7 font-mono text-sm uppercase tracking-widest border border-copper text-copper hover:bg-copper hover:text-ink transition-all duration-200 cursor-pointer glow-copper-hover"
          >
            Bekijk alle reviews op Google
          </a>
        </div>
      </div>
    </section>
  );
}
