import Image from "next/image";

const photos = [
  {
    src: "/foto-zaak/IMG_1197.jpeg",
    alt: "Hally aan het werk in de barbershop op Hueseplein, Amstelveen",
  },
  {
    src: "/foto-zaak/IMG_1198.jpeg",
    alt: "Strak gesneden krullend haar — resultaat bij Hallys Hair",
  },
  {
    src: "/foto-zaak/IMG_1199.jpeg",
    alt: "Strak gesneden haar met taper fade bij Hallys Hair Amstelveen",
  },
  {
    src: "/foto-zaak/IMG_1206.jpeg",
    alt: "Klassieke coupe bij Hallys Hair — precisie en stijl",
  },
];

export default function InstagramGrid() {
  return (
    <section
      className="py-24 md:py-36 px-6 md:px-10 border-t border-white/5 bg-panel"
      aria-labelledby="instagram-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-copper mb-6">
            Instagram
          </p>
          <h2
            id="instagram-heading"
            className="font-display text-4xl md:text-5xl font-light text-smoke leading-snug"
          >
            @hallyshair.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-2xl">
          {photos.map((photo) => (
            <div key={photo.src} className="relative aspect-square overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 45vw, 25vw"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://www.instagram.com/hallyshair/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center h-11 px-7 font-mono text-sm uppercase tracking-widest border border-copper text-copper hover:bg-copper hover:text-ink transition-all duration-200 cursor-pointer glow-copper-hover"
          >
            Volg @hallyshair op Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
