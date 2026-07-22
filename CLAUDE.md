# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint (core-web-vitals + typescript rules)
```

No test runner is configured yet.

## Architecture

This is a **Next.js 16 App Router** project for Hally's Hair salon, currently at the boilerplate stage.

**Routing** — file-system based under `app/`. `app/layout.tsx` is the root layout wrapping all routes; `app/page.tsx` is the home page (`/`). Components are Server Components by default; add `'use client'` only when state, event handlers, or browser APIs are needed.

**Styling** — Tailwind CSS v4, configured entirely in CSS (no `tailwind.config.js`). Global styles and theme tokens live in `app/globals.css`. Theme values use `@theme inline { ... }` and CSS custom properties (`--background`, `--foreground`, `--font-sans`, `--font-mono`). Dark mode is handled with `@media (prefers-color-scheme: dark)`.

**Fonts** — Geist Sans and Geist Mono loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS variables (`--font-geist-sans`, `--font-geist-mono`) applied to the `<html>` element.

**Assets** — Salon photos in `public/Foto's van de zaak/`. Hero videos (desktop + mobile `.mp4`) are in the repo root under `Hero videos/` (untracked) and should be moved to `public/` before use with `next/image` or `<video>`.
