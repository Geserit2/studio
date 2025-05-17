# Step-by-Step Guide für den Start mit Firebase Studio (Überarbeitet)

Dieser Guide beschreibt die Schritte von der lokalen Initialisierung bis zum Setup in Firebase Studio für das "AI Strategy Navigator" Projekt, unter Berücksichtigung aktueller Best Practices (Mai 2025).

**Phase 1: Lokales Projekt & Mono-Repo Fundament**

1.  **Projektverzeichnis & Git initialisieren:**
    * Erstelle ein neues Projektverzeichnis (z.B., `ai-strategy-navigator`).
    * Navigiere hinein und initialisiere ein Git-Repository (`git init`).
2.  **`pnpm` Mono-Repo einrichten:**
    * Installiere `pnpm` global, falls noch nicht geschehen.
    * Initialisiere `pnpm` im Root (z.B. `pnpm init`).
    * Erstelle eine `pnpm-workspace.yaml` im Root:
        ```yaml
        packages:
          - 'apps/*'
          - 'packages/*'
        ```
3.  **Root `package.json` konfigurieren:**
    * Setze `name` (z.B. `ai-strategy-navigator-monorepo`) und `"private": true`.
    * Füge gemeinsame Entwicklungsabhängigkeiten hinzu (`pnpm add -wD typescript prettier eslint husky lint-staged`).
    * Definiere Basis-Skripte.
4.  **Projektstruktur etablieren:**
    * `apps/` (für `landing-page`, `main-app`)
    * `packages/` (für `functions`, `shared-types`)
    * `.idx/` (wird später für Firebase Studios `dev.nix` genutzt)
    * `docs/`
    * Haupt `README.md`.
5.  **TypeScript Basiskonfiguration:**
    * Erstelle `tsconfig.base.json` im Root.
6.  **Coding Standards Tooling:**
    * Prettier: `.prettierrc.json`, `.prettierignore`.
    * ESLint: `.eslintrc.json`, `.eslintignore`.
    * (Optional aber empfohlen) Husky und lint-staged für Pre-Commit Hooks.
7.  **Basis `.gitignore`:**
    * Inkludiere `node_modules/`, `.env*` (außer `.env.example`), `dist/`, `.next/`, Firebase Emulator-Daten, OS-spezifische Dateien etc.

**Phase 2: Cloud Services Setup & initiale lokale Konfiguration**

8.  **Firebase Projekt Setup (Cloud Console):**
    * Erstelle ein neues Firebase Projekt oder nutze ein bestehendes.
    * Aktiviere: Firestore, Firebase Authentication, Cloud Functions, und **Firebase App Hosting**.
    * Notiere Firebase Project ID, Web API Key, etc.
9.  **Pinecone Projekt Setup (Cloud Console):**
    * Erstelle Projekt und Index. Notiere API Key, Environment, Index Name. Konfiguriere Dimensionen und Metrik.
10. **`.firebaserc` konfigurieren (Lokal):**
    * Im Projekt-Root: `{"projects": {"default": "<YOUR_FIREBASE_PROJECT_ID>"}}`.
11. **`firebase.json` konfigurieren (Lokal):**
    * Erstelle `firebase.json` im Root (siehe Vorlage in `docs/firebase-studio-setup.md`).
    * **Hosting:** Definiere Targets für `landing-page` und `main-app`. Richte die Konfiguration auf **Firebase App Hosting** aus. Die `source`-Angabe (z.B. `apps/landing-page`) ist hierbei entscheidend für Mono-Repos. `frameworksBackend` wird für die Region des Cloud Run Service genutzt.
    * **Functions:** Setze `source` auf `packages/functions`. Inkludiere einen `predeploy`-Skript wie `"pnpm --filter functions run build"`. Stelle sicher, dass `packages/functions/package.json` alle Laufzeitabhängigkeiten enthält.
    * **Emulators:** Konfiguriere Emulator-Ports.
12. **Umgebungsvariablen & Secrets Setup (Lokale `.env.example` Dateien):**
    * Erstelle `.env.example` in `apps/landing-page`, `apps/main-app`, `packages/functions`.
    * Erstelle entsprechende `.env.local` Dateien (füge sie zu `.gitignore` hinzu).

**Phase 3: Lokale Applikations- & Paket-Entwicklung (Grundgerüste)**

13. **Paket-Grundgerüste entwickeln:**
    * Navigiere in jedes Unterverzeichnis (`apps/*`, `packages/*`).
    * Initialisiere `package.json` in jedem.
    * Füge `tsconfig.json` hinzu (erweitert von `tsconfig.base.json`).
    * Erstelle Basis-Quelldateistrukturen.
14. **Abhängigkeiten installieren (`pnpm install`):**
    * Führe `pnpm install` vom Root-Verzeichnis aus.
15. **Basisfunktionalität implementieren (Lokal):**
    * Beginne mit der Entwicklung der Grundstruktur für Landing Page und Main App (Next.js, TypeScript, Tailwind CSS).
    * Richte einen Platzhalter Genkit Flow in `packages/functions` ein.

**Phase 4: Lokales Testen mit Firebase Emulatoren**

16. **Firebase Emulatoren nutzen:**
    * Stelle sicher, dass `firebase.json` Emulator-Konfigurationen enthält.
    * Starte die Emulatoren: `firebase emulators:start --import=./firebase-data-emulator --export-on-exit` (Pfad anpassen).
    * Teste Interaktionen.

**Phase 5: Versionskontrolle & Push zu GitHub**

17. **Lokale Änderungen committen:**
    * `git add .`
    * `git commit -m "Initial project setup with mono-repo structure and Firebase config"`
18. **GitHub Repository erstellen.**
19. **Nach GitHub pushen:**
    * `git remote add origin <YOUR_GITHUB_REPOSITORY_URL.git>`
    * `git push -u origin main`

**Phase 6: Firebase Studio Import & Konfiguration**

20. **Projekt in Firebase Studio importieren:**
    * Öffne Firebase Studio, importiere von GitHub.
21. **`.idx/dev.nix` konfigurieren:**
    * Erstelle/aktualisiere `.idx/dev.nix` im Projekt-Root (siehe Vorlage in `docs/firebase-studio-setup.md`).
    * Verwende `channel = "stable-24.11";` (Stand Mai 2025).
    * Spezifiziere `pkgs.nodejs_20`, `pkgs.pnpm`, `pkgs.firebase-tools`.
    * Konfiguriere `idx.workspace.onCreate` mit `pnpm install --frozen-lockfile`.
    * Richte `idx.previews` ein.
    * Füge empfohlene `idx.extensions` hinzu (prüfe IDs auf Open VSX, z.B. für Firebase und Tailwind CSS).
    * **WICHTIG:** Committe und pushe `.idx/dev.nix` und `pnpm-workspace.yaml` sofort nach Erstellung/Änderung, um eine stabile Umgebung in Firebase Studio zu gewährleisten, insbesondere für `pnpm`-basierte Prozesse.
22. **Cloud Secret Manager Setup (Google Cloud Console):**
    * Speichere sensitive Keys (`GEMINI_API_KEY`, `PINECONE_API_KEY`) in Secret Manager für Produktionsumgebungen.
23. **Firebase Functions Environment Konfiguration (Cloud):**
    * Konfiguriere Functions für den Zugriff auf Secrets in Secret Manager.
    * Setze andere notwendige Umgebungsvariablen.
    * Stelle sicher, dass die `package.json` in `packages/functions` alle Laufzeitabhängigkeiten für die Cloud-Umgebung korrekt deklariert.
24. **Firebase App Hosting Environment Variablen (Cloud):**
    * Konfiguriere Umgebungsvariablen für die deployed Next.js Applikationen in der Firebase Console (App Hosting Settings).

**Phase 7: CI/CD und Deployment**

25. **CI/CD Pipelines einrichten:**
    * Nutze die eingebaute CI/CD-Integration von Firebase App Hosting mit GitHub für Next.js-Apps.
    * Richte für Cloud Functions einen GitHub Actions Workflow (oder Ähnliches) ein, der die Firebase CLI nutzt.
26. **Erste Deployments:**
    * Triggere CI/CD oder deploye manuell.
27. **Weiterentwicklung:**
    * Nutze Firebase Studio. Committe Änderungen an Git. Pushes zu GitHub triggern CI/CD.
