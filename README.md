# Playbook

Fristående HTML-app för att rita, spara och visa spelmönster i handboll. Tredje appen i
Handbollssviten, vid sidan av Tracker och Teambuilder: en självständig HTML-fil, allt inbäddat,
helt offline, IndexedDB för lagring, JSON-export/import som backup. Svenskt UI, byggd för
surfplatta i liggande läge.

| Fil | Vad |
| --- | --- |
| `playbook.html` | Hela appen — öppna filen, inget bygge, ingen server krävs |
| `manifest.json`, `sw.js` | PWA: installera på hemskärmen, fungerar offline |
| `docs/PLAYBOOK_spec_v0.1.md` | Specifikationen appen är byggd mot (original: samma namn, `.pdf`) |
| `docs/Playbook-guide.pdf` | Guide för betatestare — 6 sidor med skärmbilder |

## Kärnidé

Rita fritt — men varje draget streck är en spelbar bana. Placera brickor, dra deras löpvägar med
fingret och tryck play: alla brickor glider längs sina banor, steg för steg. Inga tidslinjer, inga
keyframes, inga rörelsemallar. Mallar används bara för försvarsuppställningar (startpositioner).

- **Rita** — halvplan med korrekt handbollsgeometri (6m, 9m, 7m, 4m, målbur), målburen uppåt så laget
  anfaller uppåt. Brickor dras ut ur sidopanelen: anfallare märkta med position (VK, V9, M9, H9, HK,
  M6, MV) eller nummer, försvarare numrerade efter roll (1 ytter · 2 halv · 3 mitt · MV målvakt), boll.
  Ett tryck ställer ut 6-0, 5-1, 3-2-1 eller 3-3 med målvakt — varje bricka är flyttbar efteråt.
  Linjespråk: tunn streckad = löpväg, heldragen = passning, finstreckad = dribbling — färgerna skiljer dem
  också (grön, gul, blå). Brickan följer med fingret medan du ritar, och **Visa** stänger av banorna eller
  försvarets nummer när planen blir för full.
- **Steg** — ett mönster har upp till sex steg, och varje steg börjar där det förra slutade. Väljer du
  steg 3 visar planen var alla står efter steg 2, och där ritar du vidare. En passning lämnar bollen hos
  den som står vid passningens slutpunkt, så nästa steg börjar hos mottagaren. Play spelar stegen i ordning.
- **Bank** — sparade mönster som kort med miniatyr renderad ur vektordatan. Sök på namn, filtrera på
  kategori och försvarsuppställning, duplicera för varianter, papperskorg i stället för hård radering.
- **Inställningar** — export/import av hela banken (ersätt allt eller slå ihop), förvalt försvar,
  uppspelningshastighet, ljust/mörkt tema.
- **Visningsläge** — fullskärm utan redigerings-UI, stora brickor, play/reset och stegning. För att
  vända plattan mot laget i en timeout.

Ett spelmönster är 2–3 kB. 500 mönster ≈ 1 MB — ingen lagringsrisk.

## Avvikelser från spec v0.1

- **Planen är roterad** så att målburen ligger uppåt och laget anfaller uppåt (specen sa inget om
  riktning; detta är valt).
- **Linjespråket är ändrat** på begäran: tunn streckad löpväg, heldragen passning, finstreckad dribbling.
  Specens sicksack för dribbling är borta — streckning ovanpå en sicksack blev oläslig.
- **Försvarare är cirklar** som anfallarna, skilda genom grå färg och rollnummer, och uppställningarna
  inkluderar försvarets målvakt. Specen föreslog en annan form för försvarare.
- **Hjälpen ligger under Inställningar** i stället för som ett fjärde menyval — specens meny har tre
  poster.
- **Vyn klipps till det som används** i visningsläget och i miniatyrerna, så en tom planhalva inte
  äter skärm. Ritytan visar hela halvplanen och datamodellen är oförändrad.

## Integritet

Playbook hanterar taktik, inte personer. Brickor märks med position eller nummer — aldrig med barns
namn. Därför är banken ofarlig att exportera och dela, och repot kan vara publikt.
