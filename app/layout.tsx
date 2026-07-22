import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Oswald } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const siteUrl = "https://hallyshair.nl";

export const metadata: Metadata = {
  title: "Hallys Hair — Kapper & Barbershop in Amstelveen",
  description:
    "Hallys Hair is een barbershop op Hueseplein 9 in Amstelveen. Knippen, baard, kleuring en styling. Boek online een afspraak.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Hallys Hair — Kapper & Barbershop in Amstelveen",
    description:
      "Barbershop in Amstelveen. Knippen, baard, kleuring en styling, voor jong en oud. Boek online.",
    url: siteUrl,
    siteName: "Hallys Hair",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/foto-zaak/IMG_1197.jpeg", width: 1179, height: 1568 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hallys Hair — Kapper & Barbershop in Amstelveen",
    description:
      "Barbershop in Amstelveen. Knippen, baard, kleuring en styling.",
    images: ["/foto-zaak/IMG_1197.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-smoke">
        {children}
      </body>
    </html>
  );
}
