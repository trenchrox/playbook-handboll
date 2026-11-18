# Playbook

Fristående HTML-app (`playbook.html`) för spelmönster i handboll. PWA via `manifest.json` och `sw.js`.

## Inloggning

Det finns ingen inloggning, ingen profil, inget namn, ingen PIN och ingen välkomstskärm. Appen startar direkt i ritytan.

**Vad användaren anger:** Ingenting.

**Vad som sparas och var:**
- IndexedDB, databas `handball_playbook` (version 1), store `kv`, nyckel `root`. Hela datan ligger i ett objekt: `{v:3, patterns[], trash[], settings{def,speed,theme,showPaths,showDefNums}, draft}`. Sparas av `persist()` med 260 ms debounce.
- Pågående utkast ligger i `root.draft`.
- Ingen localStorage, ingen sessionStorage.
- Service worker-cache: `handboll-playbook-v1`.

**Är datan knuten till inloggningen?** Det finns ingen inloggning. All data på enheten delas av den som öppnar appen.

**Utloggning:** Finns inte. "Nollställ allt" (`#resetAllBtn2`) kör `idbClear()`, skapar tom root och tomt utkast, och appen fortsätter utan skärmbyte.

**IndexedDB-databasnamn:** `handball_playbook`.

## Versionering och service worker

- Versionen står i **en enda konstant**: `const APP_VERSION` överst i scriptet i `playbook.html`. Den visas i sidomenyn (`#appVersion`, t.ex. `v1.2`) och styr service workerns cachenamn. Ändra den inte på något annat ställe, och skriv aldrig in en version i `sw.js` — den läses ur filens egen URL (`sw.js?v=`), och saknas `?v=` används `0`.
- **Regel:** andra siffran höjs vid nya funktioner och fixar (1.1 → 1.2). Första siffran höjs när IndexedDB-datamodellen ändras (1.x → 2.0), och då krävs alltid en migrering i `normalizeRoot()`.
- **Höj versionen vid varje ändring av `playbook.html`.** Annars byts inte service workerns cache ut.
- `sw.js`: cachenamn `handboll-playbook-v<version>`. Install förcachar `playbook.html`, `manifest.json` och `index.html` med `cache:'reload'`. Activate raderar bara cacher som börjar med `handboll-playbook-v` och inte är den aktuella — IndexedDB rörs aldrig.
- **Fetch är nätverk-först för HTML och cache-först för allt annat.** Det är avsiktligt: med cache-först hela vägen serveras den gamla HTML-filen, som registrerar samma `sw.js?v=`-URL, så webbläsaren ser ingen ändring och en ny version når aldrig en enhet som redan har appen. Nätverk-först bryter den låsningen; offline faller den tillbaka på den cachade appen.
- `index.html` är en liten omdirigering till `playbook.html` så att rotadressen öppnar appen i stället för att Pages renderar `README.md`. `.nojekyll` stänger av Jekyll.

## Inbäddat läge (v1.3)

PracticePlanner använder Playbook som ritverktyg för planbilder. Planeraren öppnar `playbook.html?embed=1` i en `iframe` (helskärm), och ritningen skickas tillbaka med `postMessage`. Ingen navigering och ingen delad lagring behövs.

- **Aktivering:** `EMBED` är sann bara om `?embed=1` finns **och** sidan ligger i en iframe (`window.parent !== window`). Öppnas `?embed=1` direkt i en flik fungerar appen som vanligt.
- **I inbäddat läge:** menyn, Visning och Spara är dolda (`body.embed`), och verktygsraden börjar med **Avbryt**, övningens namn och **Klar**. Appen startar med ett tomt utkast utan försvar, **läser eller skriver aldrig `handball_playbook`** (`persist()` gör inget) och rör inte bankens utkast.
- **Protokoll** (version 1, bara samma adress: `e.origin === location.origin` och `e.source === window.parent` kontrolleras åt båda håll):
  - Playbook → förälder `{type:'svit:ready'}` när appen är laddad.
  - Förälder → Playbook `{type:'svit:load', theme, title, diagram?}`. `diagram` är en befintlig ritning att redigera, annars börjar man på tom plan.
  - Playbook → förälder `{type:'svit:diagram', diagram}` vid **Klar**. Ritningen måste ha minst en bricka eller bana.
  - Playbook → förälder `{type:'svit:cancel'}` vid **Avbryt** (frågar om ändringar ska kastas om något ritats).
- **Ritningens form** (`handbollssviten/diagram@1`): `{schema, court:'half', defense, tokens[], paths[]}`. `tokens` och `paths` har samma form som i ett mönster (`{id, kind, label, x, y, attachedTo}` och `{id, tokenId, step, type, pts}`, koordinater i meter på halvplanen). Mottagaren ska rensa den (okända fält bort, längder och antal begränsade).
- **Ändra inte** formen eller meddelandena utan att ändra PracticePlanner i samma veva. Versionen i meddelandena (`version`) höjs vid brytande ändring.

### Jämförelse mellan sviteappar

Jämförelsen mellan apparna finns i sviterepot `trenchrox/handbollssviten`, `CLAUDE.md`.
