# PROMPT — plak dit volledig in Claude Code (Sonnet)

Bouw de website voor Hallys Hair, een barbershop in Amstelveen. Dit is een demo om aan de eigenaar (Hally) te presenteren. Doel: premium, cinematisch, onderscheidend. Geen generieke AI-site. Het project (Next.js 16, App Router, TypeScript, Tailwind v4) staat al klaar in deze map. Gebruik de ui-ux-pro-max skill die in .claude/skills staat voor alle designbeslissingen.

Werk sectie voor sectie en laat na elke sectie het resultaat zien voordat je doorgaat. Vraag toestemming voor elk shell-commando.

## STAP 0 — Frame-sequences genereren (eerst doen)

In de map "Hero videos/" staan twee bronvideo's (1916x1080 desktop en 1080x1916 mobiel, beide 24fps, 5 seconden). Deze worden een scroll-scrub hero. Genereer eerst de frames:

1. Check de exacte bestandsnamen met ls "Hero videos/"
2. Maak public/hero-frames/desktop en public/hero-frames/mobile aan
3. Draai (met de juiste bestandsnamen ingevuld):
   ffmpeg -i "Hero videos/[desktop-bestand].mp4" -vf "fps=12,scale=1920:-1" -q:v 80 public/hero-frames/desktop/frame_%03d.webp
   ffmpeg -i "Hero videos/[mobiel-bestand].mp4" -vf "fps=12,scale=750:-1" -q:v 80 public/hero-frames/mobile/frame_%03d.webp
4. Tel de frames per map (ls | wc -l) en gebruik dat aantal in de code, geen aannames
5. Check de totale grootte met du -sh public/hero-frames — boven de 20MB: verlaag naar fps=10 en genereer opnieuw

Als ffmpeg niet geïnstalleerd is: meld dat en stel brew install ffmpeg voor.

## BEDRIJFSGEGEVENS (echt, geen placeholders)

- Naam: Hallys Hair
- Adres: Hueseplein 9, 1185 HH Amstelveen
- Telefoon: +31 6 46295154
- E-mail: hallyshair@hotmail.com
- Instagram: instagram.com/hallys_hair
- Online boeken: https://hallyshair.youcanbook.me/
- Openingstijden: ma gesloten, di 9:00–18:00, wo 9:00–19:00, do 9:00–18:00, vr 10:00–22:00, za 9:00–17:00, zo gesloten
- Signature behandeling: wassen, hoofdmassage, haarmasker met warme handdoek, gezichtsmasker, knippen, styling, plus een stylingproduct mee naar huis. Dit is een verzorgingsritueel, geen snelle knipbeurt — dat gevoel draagt de hele site.

Echte foto's van de zaak staan in public/foto-zaak/. Bekijk ze eerst en gebruik ze door de site heen. Geen stockfoto's zolang deze voldoen.

## DESIGN SYSTEM

De artdirection komt uit de bestaande merkidentiteit: het logo (gegraveerd koperen medaillon met gekruiste zwarte schaar, ornamentiek) en de intro-video (pikzwart, warm koperlicht van boven, rook, kam en scheermes op tafel). Niets opnieuw verzinnen — dit doortrekken.

Kleuren:
- Ink zwart #0D0906 — basis achtergrond, warm bruinzwart, geen koude grijstinten
- Warm koper #B5723A — primair accent (uit het medaillon)
- Diep brons #7A4A24 — secundair, schaduwkant van koper
- Rookgrijs #C9C0B4 — bodytekst op donker, gedempt, geen puur wit
- Hoogglans goud #E8B978 — spaarzaam: hover, focus-ring, rand-glow

Typografie:
- Koppen: elegante smalle display-serif met karakter via next/font (bijv. Cormorant Garamond of Fraunces) — geen standaard geometrische sans
- Body: Geist Sans, ruime line-height (donkere achtergrond vraagt lucht)
- Labels/microcopy: Geist Mono, uppercase, ruime letter-spacing (zoals "OPENINGSTIJDEN", "DI — ZA")
- De wordmark "Hallys Hair" komt uit de video/het logo zelf, niet naäpen met een webfont

Effecten:
- Transities 150–300ms, rustige easing, niets speels of bouncy — ceremonieel
- Zachte koperen gloed (box-shadow lage opacity) i.p.v. harde schaduwen
- Hover op knoppen: lichte lift + gloed-intensivering
- Zeer subtiele grain/noise-overlay mag; geen particles, geen zware effecten
- Content "zweeft" in het donker met gerichte lichtvlekken, zoals de objecten in de video — geen vlakke kaarten met borders overal

Anti-patterns (niet doen):
- Cream/terracotta MKB-sjabloon — dit merk is donker en juweelachtig
- Emoji-iconen — alleen Lucide/SVG
- Rounded-full overal — scherpe of licht afgeronde hoeken, passend bij het metalen medaillon
- Verzonnen reviews of quotes
- Fel verlichte witte "happy salon" stockfoto's

## SECTIESTRUCTUUR (one-pager met anchor-nav)

1. Hero — scroll-scrub animatie (spec hieronder)
2. Over Hallys Hair — korte persoonlijke intro: vakmanschap, ritueel, de zaak in Amstelveen
3. De behandeling — het ritueel als volgorde: wassen → hoofdmassage → masker met warme handdoek → knippen → styling → product mee naar huis. Hier mag een stappen-opbouw, want het is echt een sequentie.
4. Reviews — layout voor 2–3 uitgelichte Google-reviews. Inhoud als gemarkeerde placeholder "[review volgt]", niet verzinnen.
5. Openingstijden + locatie — tijden, adres, Google Maps embed
6. Contact/boeken — primaire CTA naar de YouCanBook.me-link, daarnaast telefoon, WhatsApp (wa.me/31646295154), Instagram
7. Footer — adres, ruimte voor KvK, social links, privacy-link

Navigatie: vaste header met wordmark links, anchor-links, "Boek nu"-knop rechts. Onder 768px hamburger-menu, tap-targets minimaal 44px.

## HERO — SCROLL-SCRUB (het hart van de site)

1. Buitenste section van 400vh (de scrubruimte), daarbinnen een sticky container van 100vh die gepind blijft tijdens het scrollen.
2. Installeer framer-motion. Gebruik useScroll met target-ref op de buitenste sectie en offset ["start start", "end end"].
3. Map progress (0–1) via useTransform naar een frame-index (0 t/m aantal frames − 1). Gebruik het echte getelde aantal uit stap 0.
4. Teken het actieve frame op een canvas (geen wisselende img-tags — canvas voorkomt flikkeren). Preload alle frames bij mount in een array van Image-objecten; toon frame 1 als poster tot alles geladen is.
5. Desktop laadt alleen de desktop-sequence, mobiel (matchMedia, breakpoint 768px) alleen de mobile-sequence. Nooit beide sets laden.
6. Canvas retina-scherp: devicePixelRatio verwerken in canvas width/height vs CSS-maat.
7. Over de canvas heen, gepind: de tagline (zelf schrijven — kort, geen "Welkom bij", denk aan ritueel/ambacht/rook/koper) die subtiel meefadet met de voortgang.
8. Bij progress ~90–100%: CTA "Boek je moment" (of betere eigen formulering) naar de boekingslink zichtbaar, en de rest van de pagina onthult zich bij doorscrollen.
9. prefers-reduced-motion: geen scroll-hijack — sectie wordt 100vh met het laatste frame statisch en een gewone fade-in.

## COPY

Schrijf alle teksten zelf, in het Nederlands. Toon: rustig, zelfverzekerd, ambachtelijk. Korte zinnen. Geen "Welkom op onze website", geen superlatieven-stapels, geen AI-clichés, geen gedachtestreepjes. De behandeling beschrijven als ervaring, niet als lijstje diensten.

SEO-basics: title en meta description voor een barbershop/kapper in Amstelveen, Open Graph-tags, semantische HTML (één h1), alt-teksten op alle foto's.

## PRE-DELIVERY CHECKLIST

- Contrast minimaal 4.5:1 — let op rookgrijs op zwart en tekst op koperen knoppen, echt narekenen
- Zichtbare focus states: gouden ring, geen browser-default
- cursor-pointer op alle klikbare elementen
- prefers-reduced-motion overal gerespecteerd
- Responsive getest op 375 / 768 / 1024 / 1440
- Lighthouse-gedachte: frames lazy waar mogelijk, foto's via next/image, geen layout shift bij het laden van de hero

Begin met stap 0 (frames), laat het resultaat zien, en bouw daarna de hero als eerste sectie.
