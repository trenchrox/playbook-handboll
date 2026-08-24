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

## Kärnidé

Rita fritt — men varje draget streck är en spelbar bana. Placera brickor, dra deras löpvägar med
fingret och tryck play: alla brickor glider längs sina banor, fas för fas. Inga tidslinjer, inga
keyframes, inga rörelsemallar. Mallar används bara för försvarsuppställningar (startpositioner).

- **Rita** — halvplan med korrekt handbollsgeometri (6m, 9m, 7m, 4m, målbur). Brickor dras ut ur
  sidopanelen: anfallare märkta med position (VK, V9, M9, H9, HK, M6, MV) eller nummer, försvarare,
  boll. Ett tryck ställer ut 6-0, 5-1, 3-2-1 eller 3-3 — varje försvarare är flyttbar efteråt.
  Linjespråk: heldragen = löpväg, streckad = passning, sicksack = dribbling. Banor läggs i fas 1–3.
- **Bank** — sparade mönster som kort med miniatyr renderad ur vektordatan. Sök på namn, filtrera på
  kategori och försvarsuppställning, duplicera för varianter, papperskorg i stället för hård radering.
- **Inställningar** — export/import av hela banken (ersätt allt eller slå ihop), förvalt försvar,
  uppspelningshastighet, ljust/mörkt tema.
- **Visningsläge** — fullskärm utan redigerings-UI, stora brickor, play/reset och fasstegning. För att
  vända plattan mot laget i en timeout.

Ett spelmönster är 2–3 kB. 500 mönster ≈ 1 MB — ingen lagringsrisk.

## Integritet

Playbook hanterar taktik, inte personer. Brickor märks med position eller nummer — aldrig med barns
namn. Därför är banken ofarlig att exportera och dela, och repot kan vara publikt.
