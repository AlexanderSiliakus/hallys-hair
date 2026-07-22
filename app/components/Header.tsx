"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Over", href: "#over" },
  { label: "Diensten", href: "#diensten" },
  { label: "Reviews", href: "#reviews" },
  { label: "Openingstijden", href: "#openingstijden" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // The header stays in its transparent, light-text state for as long as
    // the dark hero video is what's actually behind it — not after a fixed
    // pixel amount — since the hero can be 400vh (scroll-scrub) or 100vh
    // (reduced-motion fallback).
    const onScroll = () => {
      const hero = document.getElementById("hero");
      const heroBottom = hero ? hero.offsetHeight : 0;
      setScrolled(window.scrollY > Math.max(60, heroBottom - 80));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-ink/95 backdrop-blur-sm border-b border-smoke/10 ${
        scrolled ? "" : "md:bg-transparent md:backdrop-blur-none md:border-b-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 cursor-pointer"
          aria-label="Hallys Hair — naar boven"
        >
          <span className="relative block w-10 h-10 rounded-full overflow-hidden shrink-0">
            <Image
              src="/logo-mark.png"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </span>
          <span
            className={`hidden sm:block font-display text-xl font-semibold tracking-[0.15em] uppercase transition-colors duration-300 text-smoke ${
              scrolled ? "" : "md:text-white"
            }`}
          >
            Hallys Hair
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Hoofdnavigatie">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-mono text-sm uppercase tracking-widest transition-colors duration-300 cursor-pointer ${
                scrolled
                  ? "text-smoke/70 hover:text-smoke"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="https://hallyshair.youcanbook.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center h-11 px-7 text-sm font-mono uppercase tracking-widest bg-copper text-ink hover:bg-bronze transition-all duration-200 cursor-pointer glow-copper"
        >
          Boek nu
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-11 h-11 flex items-center justify-center cursor-pointer text-smoke"
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-ink/98 backdrop-blur-sm border-t border-smoke/10 px-6 py-6 flex flex-col gap-6">
          <nav className="flex flex-col gap-4" aria-label="Mobiele navigatie">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="font-mono text-base uppercase tracking-widest text-smoke/80 hover:text-smoke transition-colors duration-200 py-1 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="https://hallyshair.youcanbook.me/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="inline-flex items-center justify-center h-12 px-6 text-sm font-mono uppercase tracking-widest bg-copper text-ink hover:bg-bronze transition-all duration-200 cursor-pointer glow-copper"
          >
            Boek nu
          </a>
        </div>
      )}
    </header>
  );
}
