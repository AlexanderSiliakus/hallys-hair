import Image from "next/image";

const photos = [
  {
    src: "/foto-zaak/IMG_1200.jpeg",
    alt: "Loungehoek bij Hallys Hair",
  },
  {
    src: "/foto-zaak/IMG_1202.jpeg",
    alt: "Klant in behandeling bij Hallys Hair",
  },
  {
    src: "/foto-zaak/IMG_1204.jpeg",
    alt: "Hally met een klant bij Hallys Hair",
  },
  {
    src: "/foto-zaak/IMG_1205.jpeg",
    alt: "Kinderen wachten in de loungehoek bij Hallys Hair",
  },
];

export default function Gallery() {
  return (
    <section
      className="py-24 md:py-36 px-6 md:px-10 border-t border-smoke/10 bg-panel"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-copper mb-6">
            Galerij
          </p>
          <h2
            id="gallery-heading"
            className="font-display text-4xl md:text-5xl font-semibold text-smoke leading-snug"
          >
            In de zaak.
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
      </div>
    </section>
  );
}
