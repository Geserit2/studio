## **4. Projektstruktur**

Es wird eine **Mono-Repo-Struktur**, verwaltet mit `pnpm workspaces` (oder alternativ `npm`/`yarn workspaces`), vorgeschlagen. Diese Struktur zentralisiert die Verwaltung der verschiedenen Pakete (Frontend-Anwendungen, Backend-Proxy, geteilte Typen). Lovable.dev's GitHub-Integration ist darauf ausgelegt, mit Repositories zu arbeiten und sollte die Mono-Repo-Struktur unterstützen, indem es auf die spezifischen Pakete (`landing-page`, `app-frontend`) zugreift.

```plaintext
/ai-strategy-navigator/
├── packages/
│   ├── landing-page/                  # React Projekt (Lovable.dev generiert/verwaltet)
│   │   ├── public/                    # Statische Assets (Favicon, robots.txt falls nicht generiert)
│   │   ├── src/
│   │   │   ├── components/            # UI-Komponenten (Lovable.dev generiert/anpassbar via Prompts & Dev Mode)
│   │   │   │   └── ui/                # Ggf. shadcn/ui ähnliche Komponenten von Lovable
│   │   │   ├── pages/                 # Seitenkomponenten (z.B. /wissen, /wissen/[slug])
│   │   │   ├── layouts/               # Layout-Komponenten
│   │   │   ├── content/               # Für Wissens-Nuggets (Markdown)
│   │   │   │   └── wissen/
│   │   │   │       ├── de/
│   │   │   │       │   └── beispiel-artikel.md
│   │   │   │       └── en/
│   │   │   │           └── example-article.md
│   │   │   ├── services/              # API-Aufrufe (z.B. an Supabase für Feedback)
│   │   │   ├── config/                # SEO Konfigurationen, react-helmet-async Setup
│   │   │   ├── styles/                # Globale Stile, Tailwind Basis-Konfiguration
│   │   │   └── App.tsx                # Haupt-React-Komponente (oder index.tsx)
│   │   ├── vite.config.ts             # (Annahme, dass Lovable.dev Vite als Build-Tool verwendet)
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── app-frontend/                  # React Projekt (Lovable.dev generiert/verwaltet)
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/            # UI-Komponenten (Chat, Report, Admin-UI-Teile etc.)
│   │   │   ├── pages/                 # Hauptseiten der Anwendung
│   │   │   ├── layouts/
│   │   │   ├── services/              # API-Aufrufe an Node.js Proxy & Supabase
│   │   │   ├── contexts/              # React Context für State Management
│   │   │   ├── hooks/                 # Custom Hooks (z.B. für WebSocket-Chat aus PoC)
│   │   │   ├── admin/                 # UI-Komponenten für Admin-Funktionen
│   │   │   ├── config/
│   │   │   ├── styles/
│   │   │   └── App.tsx
│   │   ├── vite.config.ts             # (Annahme)
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── node-proxy-service/            # Node.js Backend Proxy
│   │   ├── src/
│   │   │   ├── routes/                # API Routen (z.B. WebSocket Endpunkt /chat, HTTP Admin Endpunkte)
│   │   │   ├── services/              # Business Logik (Gemini Interaktion, Supabase Interaktion, simuliertes Streaming)
│   │   │   ├── config/                # Umgebungsvariablen-Ladung, CORS-Setup
│   │   │   └── server.ts              # Hauptserver-Datei (Express-Setup, WebSocket-Server)
│   │   ├── Dockerfile                 # Für Deployment auf PaaS
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── shared-types/                  # Gemeinsame TypeScript Typdefinitionen
│       ├── src/
│       │   ├── index.ts
│       │   └── api-interfaces.ts      # Typen für API Requests/Responses, Chat-Nachrichten etc.
│       └── package.json
│
├── n8n-workflows/                     # Exportierte N8N Workflow-Definitionen (JSON)
│   ├── 01_report_generation_workflow.json
│   └── ...
│
├── supabase/
│   ├── migrations/                    # SQL Migration-Skripte für Supabase DB Schema (von Supabase CLI verwaltet)
│   │   └── V1__initial_schema.sql
│   └── seed.sql                       # Optionale Seed-Daten für lokale Entwicklung/Tests
│
├── docs/                              # Projektdokumentation
│   ├── ARCHITECTURE.md                # Dieses Dokument (oder Verweis darauf)
│   ├── API_REFERENCE.md               # Detaillierte API-Spezifikationen
│   ├── DATA_MODELS.md                 # Detaillierte Datenmodelle
│   ├── UX_GUIDE.md                    # UI/UX Styleguide (Farben, Typo, Komponentenrichtlinien)
│   ├── PRD.md                         # Product Requirement Document (Referenz)
│   └── lovable_knowledge_files/       # Ablage für "Knowledge Files" von Lovable.dev
│       ├── landing_page_context.md    # Kontext für die Landing Page KI-Generierung
│       └── app_frontend_context.md    # Kontext für die Hauptanwendung KI-Generierung
│
├── .github/                           # GitHub spezifische Konfigurationen
│   └── workflows/                     # GitHub Actions (z.B. für CI/CD des Node.js Proxy)
│       └── nodejs-ci.yml
├── .vscode/                           # VS Code spezifische Einstellungen (optional)
│   └── settings.json
├── .editorconfig
├── .env.example                       # Beispiel für Umgebungsvariablen
├── .gitignore
├── package.json                       # Root package.json für das Mono-Repo (Verwaltung der Workspaces)
├── pnpm-workspace.yaml                # Konfiguration für pnpm Workspaces
└── README.md                          # Haupt-README des Projekts

Erläuterungen zur Struktur:

packages/: Hauptverzeichnis für die einzelnen Anwendungen und Bibliotheken des Mono-Repos.
landing-page/: Von Lovable.dev generiertes und verwaltetes React-Projekt. Die interne Struktur (src/components, src/pages, etc.) wird initial von Lovable.dev vorgegeben, kann aber im "Dev Mode" angepasst werden. Wichtig ist der src/content/wissens-nuggets/ Ordner für die Markdown-Dateien der Wissensdatenbank, die von Lovable.dev und dem Build-Prozess (wahrscheinlich Vite) verarbeitet werden. SEO-spezifische Konfigurationen und Komponenten (z.B. für react-helmet-async) finden hier ebenfalls Platz.
app-frontend/: Ebenfalls ein von Lovable.dev generiertes und verwaltetes React-Projekt für die Hauptanwendung. Beinhaltet Komponenten für Chat, Reportanzeige und die Admin-Oberflächen.
node-proxy-service/: Das Backend für den Chat-Agenten, geschrieben in Node.js mit TypeScript. Die Struktur folgt gängigen Mustern mit Trennung von Routen, Services und Konfiguration. Enthält einen Dockerfile für einfaches Deployment.
shared-types/: Ein separates Paket für TypeScript-Typdefinitionen, die von mehreren Paketen (z.B. app-frontend und node-proxy-service) gemeinsam genutzt werden, um Konsistenz und Typsicherheit über Systemgrenzen hinweg zu gewährleisten.
n8n-workflows/: Dient zur Versionierung der N8N Workflow-Definitionen im JSON-Format.
supabase/: Enthält Datenbankmigrationen (verwaltet durch die Supabase CLI) und optionale Seed-Daten.
docs/: Beinhaltet alle relevanten Projektdokumentationen.
lovable_knowledge_files/: Ein spezieller Ordner für die von Lovable.dev genutzten "Knowledge Files". Diese Markdown-Dateien liefern der Lovable-KI persistenten Kontext über die jeweiligen Anwendungen, was zu qualitativ hochwertigeren und konsistenteren Code-Generierungen führen soll.
Root-Level-Dateien: Standardkonfigurationen für das Mono-Repo, pnpm, Git, Editor etc.
Vorteile dieser Struktur:

Klare Trennung der Verantwortlichkeiten zwischen den einzelnen Anwendungen.
Zentralisierte Verwaltung von Abhängigkeiten und Skripten durch das Mono-Repo.
Code-Sharing (insbesondere Typdefinitionen) wird vereinfacht.
Gute Integration mit Lovable.dev, das auf die Frontend-Pakete zugreift und diese über GitHub synchronisiert.
Skalierbarkeit für zukünftige Erweiterungen.
