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

### Jämförelse mellan sviteappar

Jämförelsen mellan apparna finns i sviterepot `trenchrox/handbollssviten`, `CLAUDE.md`.
