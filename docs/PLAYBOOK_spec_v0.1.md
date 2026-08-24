# PLAYBOOK

**Specifikation v0.1 · 2026-08-24 · Del av Handbollssviten · underlag för Claude Code**

## Koncept

Fristående HTML-app för att rita, spara och visa spelmönster i handboll. Tredje appen i
Handbollssviten (fil: `playbook.html`, accentfärg grön `--save #30d158`). Samma tekniska modell som
Tracker och Teambuilder: en självständig HTML-fil, allt inbäddat, helt offline, IndexedDB för
lagring, JSON-export/import som backup, svenskt UI, optimerad för surfplatta i liggande läge men
enhetsneutralt språk.

**Kärnidé:** Rita fritt – men varje draget streck är en spelbar bana. Användaren placerar brickor,
drar deras löpvägar med fingret och trycker play: alla brickor glider längs sina banor. Det statiska
ritandet är animationen. Inga tidslinjer, inga keyframes, inga förprogrammerade rörelsemallar.
Mallar används enbart för uppställningar (startpositioner), aldrig för rörelser.

## Meny

1. **Rita** – ritytan: skapa/redigera spelmönster
2. **Bank** – sparade spelmönster, sök och kategorier
3. **Inställningar** – export/import, standardval

## 1. Ritytan

### Plan

- Halvplan som spelyta i v1 (helplan/kontringar = senare version)
- Korrekt handbollsgeometri: 6m-båge (heldragen), 9m-båge (streckad), 7m-linje, målbur
- Planens linjer ritas i svitens dova linjefärg (`--line`) mot svart bakgrund – samma estetik som
  hubbens bakgrundsplan

### Brickor

- **Anfallare:** cirklar i accentfärg, märkta med position (M6, M9, V9, H9, VK, HK, MV) eller siffra
- **Försvarare:** dämpat grå, annan kontur/form så skillnaden syns på avstånd
- **Boll:** liten gul prick; fästs vid en spelare eller ligger fri
- Brickor placeras genom att dras ut från en sidopanel; dras fritt på planen; tas bort genom att
  dras av planen

### Försvarsuppställningar (mallar)

- Ett tryck ställer sex grå försvarare rätt: Inget · 6-0 · 5-1 · 3-2-1 · 3-3
- Efter placering är varje försvarare fritt flyttbar ("knuffbar") för finjustering
- Vald uppställning sparas med spelmönstret och är filtrerbar i banken
- Tekniskt: en uppställning är endast sex koordinatpar

### Banor och animation

- Välj bricka → dra dess väg på planen → banan sparas och visas som pil
- Linjespråk (taktiktavle-standard): heldragen pil = löpväg, streckad pil = passning, sicksack =
  dribbling
- Råpunkter från fingret decimeras till ett par dussin punkter innan lagring (mjuk kurva, små filer)
- **Faser:** varje bana tillhör fas 1, 2 eller 3; play spelar faserna i ordning. Standard: allt i fas 1
- **Play-knapp:** alla brickor glider samtidigt längs sina banor, fas för fas; reset återställer
  startläget
- Även försvarare kan få banor (samma mekanik) – för att visa försvarets reaktion. Frivilligt, ingen
  egen UI-komplexitet
- Uppspelningshastighet: normal + långsam (genomgångsläge)

### Redigering

- Tryck på bana → radera eller rita om; brickor flyttbara även efter att banor ritats (banans
  startpunkt följer brickan)
- Ångra senaste steg (enkel undo-stack, minst 10 steg)
- Textetikett per spelmönster (kort anteckning, t.ex. "OBS: vänta in spärren")

## 2. Bank

- Spara-flöde: namn + kategori, klart. Allt annat frivilligt
- Kategorier: Anfall · Kontring · Fasta situationer · Övningar
- Bläddringsvy: rutnät av kort där varje mönster visas som miniatyr av planen (brickor + banor i
  litet format)
- Miniatyrer renderas ur vektordatan vid visning – lagras aldrig som bilder
- Sök på namn; filtrera på kategori och försvarsuppställning ("allt jag har mot 5-1")
- Duplicera mönster som utgångspunkt för variant ("samma korsning fast vänster")
- Papperskorg istället för hård radering

**Ej i v1 (v1.5-backlog):** fria taggar, stjärnmärkning, "dagens matchplan"-lista, delning av
enskilda mönster.

## 3. Inställningar

- Export/import av hela banken (JSON) – backup och delning med medtränare
- Import med "ersätt allt" och "slå ihop"
- Standardval: förvald försvarsuppställning, uppspelningshastighet
- Ev. ljust tema via `body.light` (ärvs från designsystemet)

## Visningsläge ("i hallen")

- Fullskärmsläge utan redigerings-UI: bara planen, stora brickor, play/reset och fasstegning
- Tänkt för att vända plattan mot laget i timeout/genomgång – allt måste synas på två meters avstånd
- Nås med ett tryck från både ritytan och banken

## Datamodell (IndexedDB)

- `pattern`: id, namn, kategori, försvarsuppställning, anteckning, skapad/ändrad, brickor[], banor[]
- `bricka`: id, typ (anfall/försvar/boll), etikett, startX, startY
- `bana`: brickId, fas (1–3), typ (löpväg/passning/dribbling), punkter[]
- Beräknad storlek: 2–3 kB per spelmönster – även 500 mönster ≈ 1 MB. Ingen lagringsrisk

## Design – ärvs från sviten

- Designtokens, typsnitt (Big Shoulders + Instrument Sans, base64) och komponentmönster enligt
  `tracker.html` och Teambuilder-spec:ens designsida
- Primär accent: grön `--save #30d158` (Playbooks signaturfärg i hubben)
- Skarpa hörn (`--radius 0`), kort-i-lager, samma skuggor och tap-animation
- Sidomeny med `data-svg`-ikonmönster; login/PIN behövs sannolikt inte (ingen känslig data – inga
  barnnamn ska användas som brick-etiketter)

## Integritet

Playbook hanterar taktik, inte personer. Brickor etiketteras med position eller nummer – aldrig med
barns namn. Därmed är banken ofarlig att exportera och dela fritt, och repot kan förbli publikt utan
risk.

## Hubb-uppdatering vid release

- I `index.html`: byt Playbook-kortet från `div.app.playbook.soon` till `a href="playbook.html"`
- Ta bort klassen `soon`, ändra "Under utveckling" till "Öppna" med pil-SVG (samma som övriga kort)

## Ej i v1 (medvetet)

Helplan/kontringar, fria taggar, matchplan-lista, rörelsemallar (ska aldrig byggas – strider mot
kärnidén), videoexport, koppling till övriga appars data.
