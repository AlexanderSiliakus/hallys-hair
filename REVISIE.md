# REVISIE — plak dit niet, maar laat Claude Code dit bestand lezen

Dit is een revisieronde op de bestaande site. Ga de onderstaande punten één voor één af, laat na elk punt zien wat je hebt aangepast.

## 1. Instagram-link corrigeren
De link staat nu fout op instagram.com/hallys_hair. Vervang dit overal (footer, contact-sectie, eventuele meta/OG-tags) door de juiste: https://www.instagram.com/hallyshair/

## 2. Copy herschrijven — minder zweverig
De huidige teksten zijn te poëtisch/vaag ("Het ritueel", "omdat het zo werkt", lange dromerige zinnen). Herschrijf alle copy op de site: concreet, direct, feitelijk. Kort en zakelijk waar het kan, warm maar niet zweverig. Vermijd metaforen, vermijd woorden als "ritueel" of "ervaring" als vervanging voor gewoon zeggen wat iets is. De klant moet in één oogopslag snappen wat hij krijgt en hoe hij een afspraak maakt.

## 3. Donkerte en leesbaarheid
De site is nu te donker en de tekst te klein.
- Verhoog de basis-achtergrondkleur iets: van bijna zwart (#0D0906) naar een iets lichtere warme houtskool/walnoot-tint, bijvoorbeeld #1A1410 tot #1F1812, zodat het nog steeds donker en premium aanvoelt maar niet dichtslaat op scherm.
- Verhoog het contrast tussen secties (bijv. om en om een fractie lichter/donkerder paneel) zodat de pagina niet één ononderbroken zwart vlak is.
- Verhoog de basis-lettergrootte: body-tekst een stap groter (bijv. van text-base naar text-lg als basis), labels/microcopy ook een fractie groter zodat het goed leesbaar blijft op een gewoon scherm.

## 4. Boeken centraal zetten
Een afspraak maken moet de duidelijke hoofdactie worden, niet een knop tussen andere.
- Vergroot de "Boek nu"-knop in de header en maak 'm visueel de duidelijke primaire actie (volle kleur i.p.v. alleen een rand, bijvoorbeeld)
- Voeg op mobiel een vaste (sticky/fixed) boek-balk onderaan het scherm toe die zichtbaar blijft tijdens het scrollen, met de boekingslink
- De hero-CTA "Boek je moment" mag prominenter, groter

## 5. Echte reviews toevoegen
Vervang de "[review volgt]"-placeholders door deze drie echte Google-reviews:

Review 1:
- Naam: Feline Liem
- Sterren: 5
- Tekst: "Super goede jongens kapper! We komen hier al jaren, kinderen zijn op gemak bij Hally. Gaat lekker snel en altijd goed geknipt!"
- Datum: 5 maanden geleden

Review 2:
- Naam: Wen Dietz
- Sterren: 5
- Tekst: "Fijne salon, zowel Hally als Yente heel professionele kappers en klantvriendelijk. Goede sfeer in de mooie salon."
- Datum: 2 weken geleden

Review 3:
- Naam: menno wagenaar
- Sterren: 5
- Tekst: "Top kapper voor jong en oud. Klantvriendelijk, knipt snel en zeer goed tegelijk. Goede bereikbaarheid, openbaar vervoer dichtbij en parkeren voor de deur."
- Datum: een jaar geleden

Voeg onder de reviews een knop toe: "Bekijk alle reviews op Google" die linkt naar:
https://www.google.com/maps/place/Hallys+Hair/@52.296705,4.8524421,17z/data=!3m1!4b1!4m6!3m5!1s0x47c60b7db5417cb3:0xeaa76fee3feaa59a!8m2!3d52.2967017!4d4.855017!16s%2Fg%2F11h1s9xdjh

## 6. Instagram-grid nabouwen
We kunnen geen live Instagram-feed embedden (Instagram blokkeert dit soort toegang). Bouw in plaats daarvan een sectie die er hetzelfde uitziet: een grid van vierkante tegels (bijv. 3 kolommen op desktop, 2 op mobiel) met echte foto's uit public/foto-zaak/. Onder het grid een knop: "Volg @hallyshair op Instagram" die linkt naar https://www.instagram.com/hallyshair/

## 7. Echt logo toevoegen
Er staat al een logo.png in public/. Gebruik dit echte logo in de header (in plaats van of naast de getypte tekst-wordmark "Hallys Hair"), en stel 'm ook in als favicon.

## 8. "Het ritueel" ombouwen naar "Diensten"
De huidige sectie beschrijft één vaste volgorde (wassen → massage → masker → knippen → styling) als hét ritueel. Dat klopt niet: elke behandeling is anders per klant. Bouw deze sectie om naar een "Diensten" of "Wat we doen"-sectie die de opties toont in plaats van een vaste sequentie, bijvoorbeeld: Knippen, Baard/lijnen, Kleuring, Kinderen, Styling — als kaarten naast elkaar, niet genummerd als volgorde. Laat bij elke dienst een korte, feitelijke beschrijving staan (geen prijzen, die volgen nog). Markeer in een code-comment dat de exacte lijst en eventuele prijzen nog bevestigd moeten worden door de klant voordat dit live gaat.

Ga de punten in deze volgorde af en laat na elk onderdeel het resultaat zien.
