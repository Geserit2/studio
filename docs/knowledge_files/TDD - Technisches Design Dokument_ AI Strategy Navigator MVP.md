# **TDD Technisches Design Dokument**  **AI Strategy Navigator MVP**

Version: 1.2

Datum: 14\. Mai 2025

Erstellt von: Architect Agent (in Zusammenarbeit mit dem Projektinitiator)

Letzte Überarbeitung: 14\. Mai 2025 (Neustrukturierung gemäß Nutzer-Feedback, Integration PoC-Erkenntnisse)

## **Inhaltsverzeichnis**

* Einleitung  
* Artefakt: Architekturübersicht  
* Artefakt: Technologie-Stack Spezifikation  
* Artefakt: Projektstruktur  
* Artefakt: Coding Standards und Konventionen (High-Level)  
* Artefakt: API-Referenzdokumentation (Schnittstellen)  
* Artefakt: Datenmodelle (Logisch für Supabase)  
* Artefakt: Dokumentation von Umgebungsvariablen (Initial)  
* Artefakt: Teststrategie (High-Level)  
* Artefakt: Frontend-Architektur (High-Level für React mit Lovable.dev)  
* Artefakt: Identifizierte Technische User Stories  
* Technisch Angereicherte Epics (Einzelartefakte)  
  * Artefakt: epic1.md  
  * Artefakt: epic2.md  
  * Artefakt: epic3.md  
  * Artefakt: epic4.md  
  * Artefakt: epic5.md  
  * Artefakt: epic6.md  
* Architektur-Validierungszusammenfassung  
* Schlussbemerkung / Nächste Schritte

# **1\. Einleitung**

Dieses **Technische Design Dokument** (**TDD**) beschreibt die technische **Architektur** für das **Minimum Viable Product** (**MVP**) des "**AI Strategy Navigator**". Es dient als **Blaupause** für die **Entwicklung** und **Implementierung** des Systems. Das Dokument ist in einzelne, **kopierbare Markdown-Artefakte** für jeden Hauptaspekt der Architektur unterteilt. Es baut auf dem **Product Requirement Document** (**PRD**), den initialen **Epic-Definitionen** und den Ergebnissen technischer **Recherchen** und **Proof of Concepts** (**PoCs**) auf, insbesondere der Entscheidung für **Lovable.dev** für beide Frontend-Anwendungen und den Erkenntnissen aus dem **Word-by-Word Chat PoC**.

# **2\. Architekturübersicht**

Das folgende Diagramm visualisiert die **Hauptkomponenten** des "**AI Strategy Navigator**" und deren **Interaktionen**, unter Berücksichtigung der Umstellung auf **Lovable.dev** für beide Frontend-Anwendungen und der Erkenntnisse aus dem **Chat-PoC**.

(Diagramm Beschreibung \- Original Mermaid Code wurde entfernt)

Das System besteht aus folgenden Hauptkomponenten und Schichten:

* **Nutzer-Interaktion**: Repräsentiert den **Nutzer** (KMU-Entscheider, Admin).  
* **Frontend-Schicht (Lovable.dev generiert & deployed)**:  
  * **Landing Page** (ai-strategy-navigator.com): **React** auf **CDN/Lovable Publishing**, von **Lovable.dev** generiert, mit **Prerendering** für **SEO**.  
  * **Hauptanwendung** (app.ai-strategy-navigator.com): **React** auf **CDN/Lovable Publishing**, von **Lovable.dev** generiert.  
* **Backend-Schicht**:  
  * **Node.js Backend Proxy**: Auf **PaaS** (z.B. Render, Fly.io), implementiert **simuliertes Streaming** für Chat.  
  * **N8N Workflow Automation**: **Cloud** auf **Elest.io**.  
* **Daten & KI Dienste**:  
  * **Supabase**: **PostgreSQL**, **Auth**, **Storage**.  
  * **Google Gemini API**: **GEMINI\_LIVE** (für Agent 1 via Proxy), **GEMINI\_N8N** (für N8N Agenten).  
  * **Prerendering Dienst**: (z.B. Prerender.io, extern).  
* **Admin-Bereiche (via Lovable.dev Frontend & Supabase Auth)**:  
  * **LP\_ADMIN\_CONTENT**: **Content Management LP** (Wissens-Nuggets via GitHub/Lovable Sync).  
  * **APP\_ADMIN\_CONFIG**: **Prompt/Konfig. Management App** (Agent 1 Prompts in Supabase).

**Verbindungen und Interaktionen**:

* **Nutzer** interagiert mit **Landing Page** und **Hauptanwendung**.  
* **Admin-Nutzer** verwaltet Inhalte und Konfigurationen über die **Hauptanwendung**.  
* **Landing Page** wird von **Prerendering Dienst** für **SEO-Crawler** und Nutzer bedient und holt dynamische Inhalte/Feedback von **Supabase**.  
* **LP\_ADMIN\_CONTENT** verwaltet Wissens-Nuggets in einem **GitHub Repository** via **Lovable Sync**.  
* **GitHub** ist die **Build-Time Content Quelle** für die **Landing Page** via **Lovable.dev**.  
* **Hauptanwendung Frontend** kommuniziert über **WebSocket** (Chat Agent 1, **simuliertes Streaming**) mit dem **NODE\_PROXY** und über **HTTP API** (Session, Feedback, Report-Abruf) mit **SUPABASE**.  
* **APP\_ADMIN\_CONFIG** verwaltet Prompt-Konfiguration in **SUPABASE**.  
* **NODE\_PROXY** interagiert mit **GEMINI\_LIVE**, speichert Daten in **SUPABASE** und triggert **N8N** via **Webhook**.  
* **N8N** liest Chatverlauf und schreibt Daten in **SUPABASE**, nutzt **GEMINI\_N8N** für Extraktion/Analyse.  
* **GitHub** dient als **zentrale Code-Basis** und **Build-Quelle** für **Lovable.dev** (Frontends) sowie **Deployment-Quelle** (via CI/CD) für den **NODE\_PROXY**.

**Erläuterungen zum Diagramm und zur Architektur**:

* **Nutzer**: Interagiert mit der **Landing Page** und der **Hauptanwendung**. Admins greifen auf die passwortgeschützten **Admin-Funktionen** innerhalb der Hauptanwendung zu, um Inhalte der Landing Page (**Wissensdatenbank**) und Konfigurationen der Hauptanwendung (**Agent 1 Prompt**) zu verwalten.  
* **Landing Page (LP)**: Erstellt mit **React** (via **Lovable.dev**), gehostet auf einer **CDN-Infrastruktur** (**Lovable Publishing** oder alternative Optionen wie Netlify/Vercel). Für **SEO** wird eine **Prerendering-Strategie** (z.B. über einen externen Dienst wie Prerender.io) eingesetzt. Die **Wissensdatenbank** wird **Build-Time** aus Markdown-Dateien (verwaltet in **GitHub** und synchronisiert mit **Lovable.dev**) generiert.  
* **Hauptanwendung Frontend (APP\_FE)**: Ebenfalls mit **React** (via **Lovable.dev**) erstellt und auf einer **CDN-Infrastruktur** gehostet. Hier findet der **Chat mit Agent 1** und die Anzeige des Reports statt. Die **WebSocket-Kommunikation** nutzt das im PoC validierte **simulierte Streaming**.  
* **Node.js Backend Proxy**: Ein dedizierter Server (gehostet auf einer **PaaS-Plattform**, z.B. Render), der als **sicherer Proxy** für die **Gemini API** dient. Er implementiert das **simulierte Streaming** für Agent 1, indem er vollständige Antworten der Gemini API in Chunks zerlegt und sequentiell (im OpenAI-kompatiblen Format) an das Frontend sendet. Er managt WebSocket-Verbindungen, speichert Chatverläufe in **Supabase** und triggert **N8N**.  
* **N8N**: Orchestriert den Prozess der **Datenextraktion** aus dem Chatverlauf und die Generierung des finalen Reports unter Nutzung der **Gemini API**.  
* **Supabase**: Dient als zentrale **PostgreSQL-Datenbank** für alle persistenten Daten und für die **Authentifizierung** der Admin-Funktionen.  
* **Google Gemini API**: Die **LLMs** für Chat (via Proxy) und Report-Generierung (via N8N).  
* **Prerendering Dienst**: Ein externer Dienst (z.B. Prerender.io) für die **SEO-Optimierung** der Landing Page.  
* **Admin-Bereiche**: Funktionen zur Verwaltung von Inhalten und Konfigurationen, integriert in die **Hauptanwendung** und gesichert durch **Supabase Auth**.  
* **GitHub**: Zentrales **Repository** für allen Code, Quelle für **CI/CD** (Node.js Proxy) und Basis für **Lovable.dev-Projekte** (Frontends, Markdown-Content). **Lovable.dev's GitHub-Integration** ermöglicht **Zwei-Wege-Synchronisation**.


# **3\. Technologie-Stack Spezifikation**

Hier ist die Spezifikation des Technologie-Stacks:

* ### **Landing Page (Frontend)**

  * **React**: Neueste stabile Version bei Implementierung. Begründung: Nutzerpräferenz (PRD 6.5), einheitliche Technologiebasis mit Hauptanwendung. Generierung via **Lovable.dev**.  
  * TypeScript: Neueste stabile Version bei Implementierung. Begründung: Empfohlen für Typsicherheit durch Lovable.dev.  
  * Styling: Tailwind CSS (via Lovable.dev): Neueste stabile Version bei Implementierung. Begründung: Von Lovable.dev präferiert und gut unterstützt für schnelle UI-Entwicklung.  
  * **Hosting & Deployment LP**: TBD: Lovable Publishing / Netlify / Vercel. Begründung: Auswahl basierend auf Prerendering-Kompatibilität, CI/CD-Optionen mit GitHub Sync und Lovable.dev-Features. Kosten und einfache Handhabung sind ebenfalls Kriterien.  
  * **Prerendering-Dienst (LP)**: z.B. Prerender.io, Rendertron, self-hosted Lösung. Begründung: **Kritisch für SEO der React SPA**. Auswahl basierend auf Kosten, Integration, Performance und Wartungsaufwand.  
  * **React SEO Tools (LP)**: `react-helmet-async`, Vite-Plugins für Sitemap/robots.txt, Strukturierte Daten Generatoren. Begründung: Für dynamische Meta-Tags, Sitemaps, strukturierte Daten etc., falls nicht vollständig durch Lovable.dev-Prompts abgedeckt. `react-helmet-async` für client-/serverseitige Head-Management. Vite-Plugins für Build-Prozesse.

* ### **Hauptanwendung (Frontend)**

  * **React**: Neueste stabile Version bei Implementierung. Begründung: Nutzerpräferenz (PRD 6.5). Generierung via **Lovable.dev**.  
  * TypeScript: Neueste stabile Version bei Implementierung. Begründung: Empfohlen für Typsicherheit durch Lovable.dev.  
  * State Management (Frontend): z.B. Zustand, Jotai, oder React Context. Begründung: Auswahl je nach Komplexität durch Lovable.dev oder im Dev Mode. Leichtgewichtige Lösung bevorzugt.  
  * Styling: Tailwind CSS (via Lovable.dev): Neueste stabile Version bei Implementierung. Begründung: Von Lovable.dev präferiert.  
  * Hosting & Deployment App: CDN (via Lovable.dev Publishing). Begründung: Primäre Option durch Lovable.dev.

* ### **Node.js Backend Proxy**

  * Node.js: Neueste LTS-Version bei Implementierung. Begründung: Notwendig als **sicherer Proxy** für Gemini API, WebSocket-Management und **simuliertes Streaming** (PoC bestätigt).  
  * Web-Framework (Node.js): Express.js. Begründung: Weit verbreitet, gute Community-Unterstützung, ausreichend für die Anforderungen des Proxys. PoC verwendet Express.js.  
  * WebSocket-Bibliothek (Node.js): `ws`. Begründung: Performant und Standard für WebSocket-Implementierungen in Node.js. Im PoC verwendet.  
  * Supabase Client Library (`@supabase/supabase-js`): Neueste stabile Version bei Implementierung. Begründung: Für die Interaktion mit der Supabase DB.  
  * Hosting: PaaS: Render.com, Fly.io, Railway. Begründung: Auswahl basierend auf Kosten, Skalierbarkeit, einfacher Handhabung und positiven Erfahrungen (z.B. Render.com im PoC).

* ### **Workflow Automation**

  * N8N: Cloud-Instanz (Elest.io). Begründung: Nutzerpräferenz (PRD 6.5), bestehende Instanz. Für Extraktion des Chatverlaufs und Report-Generierung.

* ### **Datenbank & Backend Services**

  * Supabase (PostgreSQL): Gemanagter Dienst. Begründung: Nutzerpräferenz (PRD 6.5). Dient als **Hauptdatenbank**.  
  * Supabase Auth: Gemanagter Dienst. Begründung: Für Admin-Login und später ggf. Nutzer-Accounts.  
  * Supabase Storage: Gemanagter Dienst. Begründung: Für spätere Datei-Uploads (nicht im MVP-Kern).

* ### **Large Language Models (LLMs)**

  * Google Gemini Pro (oder äquivalente aktuelle Version für Text-Chat, z.B. Gemini 1.5 Flash im PoC): Neueste stabile API-Version. Begründung: Für Agent 1 (via Proxy, **simuliertes Streaming**) und die Agenten in N8N (via Standard Gemini API). Modellbezeichnung konfigurierbar machen.

* ### **Code Repository & CI/CD**

  * GitHub: \-. Begründung: Nutzerpräferenz (PRD 6.5), zentrales Code-Management, Integration mit Lovable.dev.  
  * CI/CD-Pipelines: Lovable.dev (für Frontends), GitHub Actions (für Node.js Proxy). Begründung: Automatisierte Builds und Deployments. Lovable.dev integriert mit GitHub.

* ### **Wissensdatenbank Content**

  * Markdown-Dateien im Git-Repo (via Lovable.dev): \-. Begründung: Einfach, versionierbar. **Build-Time-Verarbeitung durch Lovable.dev/Vite für React SPA** \+ Prerendering für SEO. Lovable.dev's "Knowledge Files" und GitHub-Sync sind hier zentral.

* ### **Entwicklungswerkzeuge**

  * Lovable.dev (Prompting, Edit/Chat Mode, Visual Edits, Knowledge Files, GitHub Sync, Publishing): \-. Begründung: Primäres Werkzeug für Frontend-Entwicklung und \-Deployment.  
  * Roo Code, Cursor (Nutzer genannt): \-. Begründung: Nach Bedarf und Präferenz des Entwicklungsteams für Backend oder manuelle Anpassungen im Lovable.dev Dev Mode.

  ### **Erläuterungen und wichtige Hinweise:**

* **Versionen**: "Neueste stabile Version bei Implementierung" ist die Richtlinie. Spezifische Versionen sind zum Implementierungszeitpunkt zu recherchieren (Internetzugang erforderlich). Ohne diesen, Annahme "jeweils aktuellste stabile Version".  
* **Lovable.dev**: Ist das **zentrale Werkzeug** für die Erstellung, Wartung und das Deployment der React-basierten Frontend-Anwendungen. Die Möglichkeiten von **Lovable.dev** (**Prompting, Dev Mode, Visual Edits, Knowledge Files, GitHub Sync, Publishing**) sind integraler Bestandteil des Entwicklungsprozesses.  
* **Prerendering (Landing Page)**: Diese Strategie ist **entscheidend**, um die Nachteile einer reinen Client-Side-Rendered (**CSR**) React SPA für **SEO** zu mitigieren. Die Auswahl des Dienstes und die genaue Konfiguration sind wichtige technische Details.  
* **Simuliertes Streaming (Node.js Proxy)**: Basierend auf dem erfolgreichen **PoC** wird der Node.js Proxy die Antworten der **Gemini API** (die kein natives Streaming für Text-Chat bietet) in Chunks zerlegen und sequentiell an das Frontend senden, um eine **Word-by-Word Chaterfahrung** zu ermöglichen. Das Format der Chunks wird **OpenAI-kompatibel** sein, um die Frontend-Verarbeitung zu vereinfachen.  
* **React SEO Tools (Landing Page)**: Werkzeuge wie `react-helmet-async` sind notwendig, um Meta-Informationen pro Seite dynamisch zu setzen, was für **SEO** unerlässlich ist. Die Sitemap- und robots.txt-Generierung sollte idealerweise im Build-Prozess automatisiert werden.

# **4\. Projektstruktur**

Es wird eine **Mono-Repo-Struktur**, verwaltet mit `pnpm workspaces` (oder alternativ `npm`/`yarn workspaces`), vorgeschlagen. Diese Struktur **zentralisiert** die Verwaltung der verschiedenen Pakete (Frontend-Anwendungen, Backend-Proxy, geteilte Typen). **Lovable.dev's GitHub-Integration** ist darauf ausgelegt, mit Repositories zu arbeiten und sollte die **Mono-Repo-Struktur** unterstützen, indem es auf die spezifischen Pakete (`landing-page`, `app-frontend`) zugreift.

(Projektstruktur Beschreibung \- Original plaintext Struktur wurde entfernt)

Die Projektstruktur ist wie folgt organisiert:

* **/ai-strategy-navigator/**: Root-Verzeichnis des Mono-Repos.  
  * **packages/**: Hauptverzeichnis für die einzelnen Anwendungen und Bibliotheken.  
    * **landing-page/**: React Projekt (Lovable.dev generiert/verwaltet).  
      * `public/`: Statische Assets.  
      * `src/`: Quellcode.  
        * `components/`: UI-Komponenten.  
        * `pages/`: Seitenkomponenten.  
        * `layouts/`: Layout-Komponenten.  
        * `content/`: Für Wissens-Nuggets (Markdown).  
        * `services/`: API-Aufrufe.  
        * `config/`: SEO Konfigurationen.  
        * `styles/`: Globale Stile.  
        * `App.tsx`: Haupt-React-Komponente.  
      * `vite.config.ts`: Build-Konfiguration (angenommen Vite).  
      * `tsconfig.json`: TypeScript-Konfiguration.  
      * `package.json`: Paketkonfiguration.  
    * **app-frontend/**: React Projekt (Lovable.dev generiert/verwaltet).  
      * `public/`: Statische Assets.  
      * `src/`: Quellcode.  
        * `components/`: UI-Komponenten (Chat, Report, Admin-UI-Teile).  
        * `pages/`: Hauptseiten der Anwendung.  
        * `layouts/`: Layout-Komponenten.  
        * `services/`: API-Aufrufe an Node.js Proxy & Supabase.  
        * `contexts/`: React Context für State Management.  
        * `hooks/`: Custom Hooks.  
        * `admin/`: UI-Komponenten für Admin-Funktionen.  
        * `config/`: Konfigurationen.  
        * `styles/`: Globale Stile.  
        * `App.tsx`: Haupt-React-Komponente.  
      * `vite.config.ts`: Build-Konfiguration.  
      * `tsconfig.json`: TypeScript-Konfiguration.  
      * `package.json`: Paketkonfiguration.  
    * **node-proxy-service/**: Node.js Backend Proxy.  
      * `src/`: Quellcode.  
        * `routes/`: API Routen.  
        * `services/`: Business Logik.  
        * `config/`: Umgebungsvariablen-Ladung, CORS-Setup.  
        * `server.ts`: Hauptserver-Datei.  
      * `Dockerfile`: Für Deployment.  
      * `tsconfig.json`: TypeScript-Konfiguration.  
      * `package.json`: Paketkonfiguration.  
    * **shared-types/**: Gemeinsame TypeScript Typdefinitionen.  
      * `src/`: Quellcode.  
        * `index.ts`: Hauptexport.  
        * `api-interfaces.ts`: Typen für API Requests/Responses.  
      * `package.json`: Paketkonfiguration.  
  * **n8n-workflows/**: Exportierte N8N Workflow-Definitionen (JSON).  
  * **supabase/**: Supabase Konfigurationen.  
    * `migrations/`: SQL Migration-Skripte.  
    * `seed.sql`: Optionale Seed-Daten.  
  * **docs/**: Projektdokumentation.  
    * `ARCHITECTURE.md`: Dieses Dokument.  
    * `API_REFERENCE.md`: API-Spezifikationen.  
    * `DATA_MODELS.md`: Datenmodelle.  
    * `UX_GUIDE.md`: UI/UX Styleguide.  
    * `PRD.md`: Product Requirement Document.  
    * `lovable_knowledge_files/`: Ablage für "Knowledge Files" von Lovable.dev.  
  * **.github/**: GitHub spezifische Konfigurationen.  
    * `workflows/`: GitHub Actions (z.B. für CI/CD).  
  * **.vscode/**: VS Code spezifische Einstellungen (optional).  
  * `.editorconfig`: Editor-Konfiguration.  
  * `.env.example`: Beispiel für Umgebungsvariablen.  
  * `.gitignore`: Ignorierte Dateien.  
  * `package.json`: Root package.json für das Mono-Repo.  
  * `pnpm-workspace.yaml`: Konfiguration für pnpm Workspaces.  
  * `README.md`: Haupt-README des Projekts.

**Erläuterungen zur Struktur**:

* `packages/`: Hauptverzeichnis für die einzelnen Anwendungen und Bibliotheken des **Mono-Repos**.  
* `landing-page/`: Von **Lovable.dev** generiertes und verwaltetes **React-Projekt**. Die interne Struktur wird initial von **Lovable.dev** vorgegeben, kann aber im "**Dev Mode**" angepasst werden. Wichtig ist der `src/content/wissens-nuggets/` Ordner für die **Markdown-Dateien** der Wissensdatenbank, die von **Lovable.dev** und dem Build-Prozess (wahrscheinlich Vite) verarbeitet werden. **SEO-spezifische Konfigurationen** und Komponenten finden hier ebenfalls Platz.  
* `app-frontend/`: Ebenfalls ein von **Lovable.dev** generiertes und verwaltetes **React-Projekt** für die Hauptanwendung. Beinhaltet Komponenten für **Chat**, **Reportanzeige** und die **Admin-Oberflächen**.  
* `node-proxy-service/`: Das Backend für den Chat-Agenten, geschrieben in **Node.js** mit **TypeScript**. Die Struktur folgt gängigen Mustern mit Trennung von Routen, Services und Konfiguration. Enthält einen **Dockerfile** für einfaches Deployment.  
* `shared-types/`: Ein separates Paket für **TypeScript-Typdefinitionen**, die von mehreren Paketen gemeinsam genutzt werden, um **Konsistenz** und **Typsicherheit** über Systemgrenzen hinweg zu gewährleisten.  
* `n8n-workflows/`: Dient zur **Versionierung** der **N8N Workflow-Definitionen** im JSON-Format.  
* `supabase/`: Enthält **Datenbankmigrationen** (verwaltet durch die Supabase CLI) und optionale Seed-Daten.  
* `docs/`: Beinhaltet alle relevanten **Projektdokumentationen**.  
* `lovable_knowledge_files/`: Ein spezieller Ordner für die von **Lovable.dev** genutzten "**Knowledge Files**". Diese Markdown-Dateien liefern der Lovable-KI persistenten **Kontext** über die jeweiligen Anwendungen, was zu qualitativ hochwertigeren und konsistenteren Code-Generierungen führen soll.  
* Root-Level-Dateien: **Standardkonfigurationen** für das Mono-Repo, pnpm, Git, Editor etc.

  ### **Vorteile dieser Struktur:**

* **Klare Trennung** der Verantwortlichkeiten zwischen den einzelnen Anwendungen.  
* **Zentralisierte Verwaltung** von Abhängigkeiten und Skripten durch das Mono-Repo.  
* **Code-Sharing** (insbesondere Typdefinitionen) wird vereinfacht.  
* **Gute Integration mit Lovable.dev**, das auf die Frontend-Pakete zugreift und diese über GitHub synchronisiert.  
* **Skalierbarkeit** für zukünftige Erweiterungen.

# **5\. Coding Standards und Konventionen (High-Level)**

Um eine **hohe Code-Qualität**, **Konsistenz** und **Wartbarkeit** im gesamten Projekt sicherzustellen, werden folgende **Standards** und **Konventionen** angestrebt:

### **Sprache und Internationalisierung**

* **TypeScript** wird für alle **Frontend**\- (`landing-page`, `app-frontend`) und **Backend**\-Projekte (`node-proxy-service`, `shared-types`) durchgängig verwendet, um von **Typsicherheit** und besserer **Entwicklererfahrung** zu profitieren. **Lovable.dev** generiert standardmäßig **TypeScript-Code**.  
* **Code-Kommentare** und **Dokumentationsstrings** (**JSDoc/TSDoc**) sollten primär auf **Englisch** verfasst werden, um internationale Verständlichkeit zu gewährleisten.  
* **Benutzeroberflächen (UI)** und Inhalte für Endnutzer werden mehrsprachig (**Deutsch/Englisch**) unterstützt. Mechanismen für **Internationalisierung (i18n)**, z.B. mit `i18next` oder vergleichbaren Bibliotheken, sind in den **Frontend-Anwendungen** vorzusehen.

  ### **Formatierung**

* **Prettier** wird als **automatischer Code-Formatter** eingesetzt. Eine zentrale **Prettier-Konfigurationsdatei** (`.prettierrc.js` oder `.prettierrc.json`) im Root-Verzeichnis des **Mono-Repos** definiert die **Formatierungsregeln** für alle Pakete.  
* Die **Formatierung** sollte idealerweise automatisch bei jedem **Commit** (via **Git-Hooks**) und in der **CI-Pipeline** überprüft werden.

  ### **Linting**

* **ESLint** wird für **statische Code-Analyse** verwendet, um potenzielle **Fehler** und **Stilprobleme** frühzeitig zu erkennen.  
* Eine gemeinsame **Basis-ESLint-Konfiguration** wird im Root-Verzeichnis etabliert. Projektspezifische Erweiterungen oder Anpassungen (z.B. für **React**, **Node.js**) erfolgen in den jeweiligen `package.json` oder `.eslintrc.js` der Pakete.  
* Regeln für **TypeScript** (`@typescript-eslint/eslint-plugin`) und **React** (`eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y` für Barrierefreiheit) sind zu integrieren.

  ### **Namenskonventionen**

* **Variablen** und **Funktionen**: **`camelCase`** (z.B. `userName`, `calculateTotalAmount`).  
* **Klassen**, **Typen**, **Interfaces**, **Enums** und **React-Komponenten**: **`PascalCase`** (z.B. `UserProfile`, `ChatService`, `StatusEnum`, `PrimaryButton`).  
* **Konstanten**: **`UPPER_SNAKE_CASE`** (z.B. `MAX_USERS`, `API_TIMEOUT`).  
* **Dateinamen** für Komponenten: **`PascalCase.tsx`** (z.B. `UserProfile.tsx`).  
* **Dateinamen** für Module/Services: **`camelCase.ts`** oder **`kebab-case.ts`** (z.B. `authService.ts` oder `auth-service.ts`).

  ### **Komponentenstruktur (React \- Lovable.dev generiert und angepasst)**

* Primär **funktionale Komponenten** mit **Hooks**.  
* **Lovable.dev** wird die initiale **Komponentenstruktur** generieren. Anpassungen und Erweiterungen im "**Dev Mode**" von **Lovable.dev** sollten auf eine klare **Trennung** von **Logik** (**Hooks**, **Services**) und **Darstellung** (**JSX**) achten.  
* Komponenten sollten möglichst **klein** und auf eine **spezifische Aufgabe** fokussiert sein (**Single Responsibility Principle**).  
* **Props** sollten **klar typisiert** sein.

  ### **API-Design (Node.js Proxy)**

* Für **HTTP-Endpunkte** werden **RESTful-Prinzipien** angestrebt (sinnvolle Nutzung von **HTTP-Methoden**, **Statuscodes**, **Ressourcen-orientierte URLs**).  
* **Datenformate** für **Request/Response Bodies**: **JSON**.  
* Klare und konsistente **Fehlerantworten**.  
* Für den Chat wird das im **PoC** validierte **WebSocket-Protokoll** mit einem spezifischen Nachrichtenformat (simuliertes **Streaming** im **OpenAI-Stil**) verwendet.

  ### **Commit-Messages**

* Die Verwendung von **Conventional Commits** wird dringend empfohlen, um eine **nachvollziehbare** und **automatisierbare Git-Historie** zu erstellen (z.B. für **Changelog-Generierung**).  
* Beispiel: **`feat: add user login via email`** oder **`fix: correct calculation error in cart total`**.

  ### **Error Handling**

* Strukturiertes **Error Handling** in allen Anwendungsteilen.  
* Im **Backend** (`node-proxy-service`) ist ein klares **Logging** von Fehlern (z.B. mit Zeitstempel, Kontext, Stacktrace) für **Debugging-Zwecke** unerlässlich.  
* Im **Frontend** sollten **Nutzer-freundliche Fehlermeldungen** angezeigt werden, ohne technische Details preiszugeben.

  ### **Umgebungsvariablen**

* Alle **Konfigurationen**, die sich zwischen **Umgebungen** (lokal, Staging, Produktion) unterscheiden oder **sensitiv** sind (**API-Keys**, **Datenbank-Credentials**), müssen über **Umgebungsvariablen** verwaltet werden.  
* Eine **`.env.example`\-Datei** im Root oder in den jeweiligen Paketen dokumentiert die benötigten **Variablen**.  
* Für **Frontend-Anwendungen**, die mit **Vite** (Annahme für **Lovable.dev**) gebaut werden, beginnen clientseitig zugängliche **Umgebungsvariablen** mit **`VITE_`** (z.B. **`VITE_SUPABASE_URL`**).

  ### **Code-Dokumentation**

* Komplexe oder geteilte **Logik**, öffentliche **APIs** von Modulen/Services und wichtige **Komponenten-Props** sollten mit **JSDoc/TSDoc-Kommentaren** dokumentiert werden.  
* Die "**Knowledge Files**" für **Lovable.dev** dienen ebenfalls als eine Form der **Dokumentation**, um der **KI** Kontext zu geben.

  ### **Lovable.dev Prompts und Workflow**

* **Prompts** für **Lovable.dev** sollten **klar**, **spezifisch** und **iterativ** formuliert werden. Es ist oft besser, komplexe Anforderungen in mehrere kleinere **Prompts** aufzuteilen.  
* Die Ergebnisse von **Lovable.dev-Generierungen** sollten stets im "**Visual Edit**" oder "**Dev Mode**" überprüft und bei Bedarf verfeinert werden.  
* "**Knowledge Files**" sollten aktiv genutzt und gepflegt werden, um **Lovable.dev** dauerhaften Kontext über **Design-System-Elemente**, wiederkehrende Muster oder spezifische Projektanforderungen zu liefern.  
* Die von **Lovable.dev** generierte **Code-Struktur** sollte respektiert und bei manuellen Änderungen im "**Dev Mode**" konsistent weitergeführt werden.

Diese **Standards** und **Konventionen** sollten in einem **`CONTRIBUTING.md`**\-Dokument im Root-Verzeichnis des **Mono-Repos** festgehalten und für alle **Teammitglieder** zugänglich gemacht werden. Die Durchsetzung einiger dieser **Standards** kann durch **Git-Hooks** (z.B. mit **Husky** und **lint-staged**) und **CI-Pipeline-Schritte** automatisiert werden.

# **6\. API-Referenzdokumentation (Schnittstellen)**

Dieses **Artefakt** definiert die primären **Kommunikationsschnittstellen** zwischen den verschiedenen Komponenten des "**AI Strategy Navigator**" **MVP**. **JSON** wird als Standard-**Datenformat** für **HTTP-basierte APIs** verwendet.

### **6.1 Frontend (App) \<-\> Node.js Backend Proxy (für Chat mit Agent 1\)**

* **Protokoll**: **WebSocket** (**WSS** für Produktion, **WS** für lokale Entwicklung)  
* **Endpunkt** auf Node.js Backend Proxy: **/chat** (oder ein anderer konfigurierbarer Pfad)  
* **Initialisierung** der Verbindung:  
  * Client sendet eine initiale Nachricht oder einen Event (z.B. **`INIT_CHAT`**) beim Verbindungsaufbau.  
  * **Payload** (Client \-\> Server): `{ sessionId?: string }`  
    * **`sessionId`** (optional): Falls eine bestehende Session fortgesetzt werden soll.  
* **Nachrichtenfluss** (vereinfacht):  
  * **Client zu Server (C \-\> S)**:  
    * **`USER_MESSAGE`**: Eine vom Nutzer eingegebene Nachricht.  
      * **Payload**: `{ message: string, sessionId: string, language: "de" | "en" }`  
    * **`END_CHAT_SESSION_REQUEST`** (Optional): Signalisiert den Wunsch, die aktuelle Chat-Session durch den Nutzer zu beenden (z.B. nach Bestätigung der Zusammenfassung).  
      * **Payload**: `{ sessionId: string }`  
  * **Server zu Client (S \-\> C)**:  
    * **`SESSION_STARTED`**: Bestätigung des Session-Starts und Übermittlung der (ggf. neuen) **`sessionId`**.  
      * **Payload**: `{ sessionId: string, history?: Array<{ sender: "user" | "agent", content: string, timestamp: string }> }`  
    * **`AGENT_TYPING`**: Signalisiert, dass der Agent eine Antwort generiert.  
      * **Payload**: `{ isTyping: boolean }`  
    * **`AGENT_MESSAGE_CHUNK`**: Ein Teil der Agenten-Antwort (simuliertes **Streaming**). **Format**: `data: {"choices": [{"delta": {"content": "chunk_text"}}]}\n\n` (**OpenAI-kompatibel**, wie im **PoC**).  
    * **`AGENT_MESSAGE_COMPLETE`**: Signalisiert das Ende eines vollständigen Agenten-Nachrichten-Streams.  
      * **Payload**: `data: [DONE]\n\n` (**OpenAI-kompatibel**, wie im **PoC**).  
    * **`AGENT_FINAL_SUMMARY`**: Die vom Agenten generierte finale Zusammenfassung des Gesprächs.  
      * **Payload**: `{ summaryText: string, sessionId: string }` (Format kann auch dem Chunk-Streaming folgen)  
    * **`CHAT_ENDED`**: Bestätigung, dass die Session serverseitig beendet wurde.  
      * **Payload**: `{ sessionId: string }`  
    * **`ERROR_MESSAGE`**: Für Fehler während der **WebSocket**\-Kommunikation oder serverseitige Fehler.  
      * **Payload**: `{ error: string, details?: any, code?: string }` (z.B. `GEMINI_API_KEY_MISSING`, `WEBSOCKET_ERROR`)

**Erläuterungen:**

* Die **`sessionId`** ist entscheidend für die Zuordnung von Nachrichten und die spätere **Report-Generierung**.  
* Das simulierte **Streaming** vom **Node.js Proxy** an das **Frontend** emuliert das Verhalten nativer **Streaming-APIs** (wie **OpenAI**), um die **Frontend-Implementierung** zu vereinfachen und eine "**Word-by-Word**"-Anzeige zu ermöglichen. Dies basiert auf den Erkenntnissen des "**Word-by-Word Chat PoC**".  
* **Fehlerbehandlung** und robuste **Verbindungs-Fallback-Mechanismen** im **Frontend** (wie im **PoC** `useChatStream.tsx`) sind essenziell.

  ### **6.2 Node.js Backend Proxy \<-\> Supabase (Datenbank)**

* **Protokoll**: **SQL** über den **Supabase JavaScript Client** (`@supabase/supabase-js`).  
* **Aktionen**:  
  * **Lesen**:  
    * Abrufen der Konfiguration/System-Prompt für **Agent 1** aus der Tabelle **`admin_prompts_config`**.  
    * Abrufen der Chat-Historie für eine bestehende **`sessionId`** aus **`raw_chat_history`** (für "**Save & Continue Later**").  
  * **Schreiben**:  
    * Anlegen einer neuen **Session** in der **`sessions`** Tabelle.  
    * Speichern jeder Nutzer- und Agentennachricht in der **`raw_chat_history`** Tabelle.  
    * Aktualisieren des **Status** einer **Session** in der **`sessions`** Tabelle (z.B. **`active`**, **`summary_pending`**, **`raw_chat_completed`**).  
    * Speichern/Aktualisieren von **Agent-1-Prompts** in **`admin_prompts_config`** (durch Admin-Funktionen).  
* **Sicherheit**: Der **Proxy** verwendet den **`SUPABASE_SERVICE_ROLE_KEY`** für den Zugriff, was volle **Datenbankrechte** impliziert. **RLS-Policies** in **Supabase** sind hier weniger relevant, da der **Proxy** als vertrauenswürdiger Server agiert.

  ### **6.3 Node.js Backend Proxy \-\> N8N**

* **Protokoll**: **HTTP POST** (als **Webhook-Aufruf**).  
* **Endpunkt** auf **N8N**: Eine durch **N8N** bereitgestellte und im **Proxy** konfigurierte **Webhook-URL**.  
* **Payload** (Proxy \-\> N8N):  
  * `sessionId`: eine\_eindeutige\_session\_id  
  * `triggerType`: **`REPORT_GENERATION_REQUESTED`**  
  * `language`: **`de`** // oder **`en`**  
* **Antwort** von **N8N** (**N8N** \-\> Proxy): Standardmäßig **`200 OK`** oder **`202 Accepted`** bei erfolgreicher Annahme des **Webhooks** durch **N8N**. Der **Proxy** wartet nicht auf die vollständige **Report-Generierung**.

  ### **6.4 N8N \<-\> Supabase (Datenbank)**

* **Protokoll**: **SQL** über die **Supabase-Knoten** in **N8N** oder alternativ über die **PostgREST API** von **Supabase**.  
* **Aktionen**:  
  * **Lesen**:  
    * Abrufen des vollständigen, rohen Chatverlaufs aus **`raw_chat_history`** anhand der übergebenen **`sessionId`**.  
    * Lesen des Nutzerstatus oder anderer relevanter Daten aus der **`sessions`** Tabelle.  
  * **Schreiben**:  
    * Speichern der vom **Extraktions-Agenten** erzeugten strukturierten **JSON-Daten** in der **`extracted_chat_data`** Tabelle.  
    * Speichern des vom **Report-Agenten** generierten finalen **Report-JSON-Objekts** in der **`generated_reports`** Tabelle.  
    * Aktualisieren des Report-**Status** in der **`sessions`** Tabelle (z.B. **`report_generation_started`**, **`report_generated`**, **`report_failed`**).

  ### **6.5 N8N \<-\> Google Gemini API (für Extraktions- & Report-Agent)**

* **Protokoll**: **HTTP POST**.  
* **Endpunkte** & **Payloads**: Gemäß der offiziellen **Google Gemini API**\-Dokumentation.  
* **Authentifizierung**: Der **API-Key** (**`GEMINI_API_KEY`**) wird sicher als **Credential** in **N8N** gespeichert und für die Anfragen verwendet.  
* **Nutzung**: **N8N** ruft die **Gemini API** für Aufgaben wie **Datenextraktion** aus dem Chatverlauf und die Generierung der einzelnen **Report-Abschnitte** auf, basierend auf spezifischen **Prompts**, die in den **N8N-Workflows** definiert sind.

  ### **6.6 Frontend (App & Landing Page) \<-\> Supabase (Direktzugriff für bestimmte Daten)**

* **Protokoll**: **HTTP** über den **Supabase JavaScript Client** (`@supabase/supabase-js`) oder direkt über die **PostgREST API**.  
* **Authentifizierung**: Primär der **`anon` Key** für öffentliche Daten oder anonyme Aktionen. Für gesicherte Bereiche (Admin) wird **Supabase Auth** (**JWTs**) verwendet. **Row Level Security (RLS) Policies** in **Supabase** sind für alle Tabellen, auf die direkt vom **Frontend** zugegriffen wird, absolut entscheidend, um die **Datensicherheit** zu gewährleisten.  
* **Aktionen** (Hauptanwendung \- **APP\_FE**):  
  * **Report-Abruf**: `GET /rest/v1/generated_reports?select=*&sessionId=eq.{sessionId}` (**RLS**: Nur wenn Session-Status **`report_generated`** ist und ggf. eine anonyme Zuordnung erlaubt ist oder der Nutzer authentifiziert ist).  
  * **Feedback speichern**: `POST /rest/v1/feedback` (**Payload**: `{ sessionId?: string, contextUrl: string, feedbackText: string, rating?: number }`). **RLS**: Erlaubt **`INSERT`** für **`anon` Rolle**.  
  * **Interesse am Premium-Modell / CTA speichern**: `POST /rest/v1/interest_submissions` (**Payload**: `{ sessionId?: string, interestType: "premium_model_notification" | "expert_talk_request", sourcePage: string }`). **RLS**: Erlaubt **`INSERT`** für **`anon` Rolle**.  
  * **Session-Fortschritt (Save & Continue)**:  
    * `GET /rest/v1/sessions?select=last_state_json&id=eq.{sessionId}` (**RLS**: Nur wenn die Session dem anonymen Nutzer zugeordnet werden kann).  
    * `PATCH /rest/v1/sessions?id=eq.{sessionId}` (**Payload**: `{ last_state_json: object }`). **RLS**: Nur wenn die Session dem anonymen Nutzer zugeordnet werden kann.  
  * **Admin-Funktionen** (gesichert durch **Supabase Auth**):  
    * **CRUD-Operationen** auf **`admin_prompts_config`**.  
    * **Lesen** von **`feedback`**, **`interest_submissions`**, **`sessions`** etc.  
* **Aktionen** (Landing Page \- **LP**):  
  * **Wissens-Nuggets abrufen**: (Diese Option ist weniger wahrscheinlich, da die **Wissens-Nuggets** primär Build-Time aus **Markdown-Dateien** generiert und dann prerendered werden. Ein direkter **Supabase**\-Zugriff wäre nur für sehr dynamische, nicht-prerenderbare Inhalte auf der **LP** notwendig).  
    * Falls doch: `GET /rest/v1/knowledge_nuggets?select=*` (**RLS**: Öffentlich lesbar).  
  * **Feedback speichern** (vom **LP-Feedback-Widget**): `POST /rest/v1/feedback` (**Payload**: `{ contextUrl: string, feedbackText: string, rating?: number }`). **RLS**: Erlaubt **`INSERT`** für **`anon` Rolle**.

# 

# **7\. Datenmodelle (Logisch für Supabase)**

Dieses **Artefakt** beschreibt die logischen **Datenmodelle** für die **PostgreSQL**\-Datenbank, die von **Supabase** bereitgestellt wird. **Primärschlüssel** sind **fett** markiert. **Fremdschlüsselbeziehungen** und wichtige **Indizes** werden erwähnt. **Row Level Security (RLS)** ist für die meisten Tabellen essenziell, insbesondere für solche, auf die direkt vom **Frontend** zugegriffen wird.

### **1\. `sessions` (oder `chat_sessions`)**

* **`id`**: **`UUID`** (**PK**, Standard: `uuid_generate_v4()`, eindeutige **`sessionId`**)  
* `created_at`: **`TIMESTAMPZ`** (Standard: `now()`)  
* `updated_at`: **`TIMESTAMPZ`** (Standard: `now()`)  
* `status`: **`TEXT`** (z.B. **`active`**, **`summary_pending`**, **`raw_chat_completed`**, **`report_generation_requested`**, **`report_generated`**, **`report_failed`**, **`archived`**)  
* `language_code`: **`TEXT`** (z.B. **`de`**, **`en`**, Standard: **`de`**)  
* `report_type`: **`TEXT`** (Standard: **`standard`**; später erweiterbar für **`premium`**)  
* `last_state_json`: **`JSONB`** (Optional, für "**Save & Continue Later**" \- speichert den minimal notwendigen Zustand des Chats, um ihn fortsetzen zu können)  
* `user_id`: **`UUID`** (Nullable, **FK** zu **`auth.users`** \- für spätere Nutzer-Accounts und Zuordnung von Sessions zu eingeloggten Nutzern)  
* **Indizes**: **`status`**, **`user_id`**, **`created_at`**.

  ### **2\. `raw_chat_history`**

* **`id`**: **`BIGSERIAL`** (**PK**)  
* `session_id`: **`UUID`** (**FK** zu **`sessions.id` ON DELETE CASCADE**, **Nicht Null**, **Indiziert**)  
* `timestamp`: **`TIMESTAMPZ`** (Standard: `now()`)  
* `sender`: **`TEXT`** ('user' oder 'agent', **Nicht Null**)  
* `message_content`: **`TEXT`** (**Nicht Null**)  
* `message_metadata`: **`JSONB`** (Optional, z.B. für Agenten-Nachrichten-IDs, Tokens, etc.)  
* **Indizes**: **`session_id`**, **`timestamp`**.

  ### **3\. `extracted_chat_data` (Daten, die N8N aus dem `raw_chat_history` extrahiert)**

* **`id`**: **`BIGSERIAL`** (**PK**)  
* `session_id`: **`UUID`** (**FK** zu **`sessions.id` ON DELETE CASCADE**, **Unique**, **Nicht Null**, **Indiziert**)  
* `created_at`: **`TIMESTAMPZ`** (Standard: `now()`)  
* `structured_json_data`: **`JSONB`** (Output des **N8N Extraktions-Agenten**, enthält die relevanten Informationen aus dem Chat in strukturierter Form)  
* `processing_version`: **`TEXT`** (Optional, Version des Extraktions-Prompts/Logik)

  ### **4\. `generated_reports`**

* **`id`**: **`BIGSERIAL`** (**PK**)  
* `session_id`: **`UUID`** (**FK** zu **`sessions.id` ON DELETE CASCADE**, **Unique**, **Nicht Null**, **Indiziert**)  
* `created_at`: **`TIMESTAMPZ`** (Standard: `now()`)  
* `report_json_data`: **`JSONB`** (Finaler Report als **JSON** von **N8N**, optimiert für die **Frontend-Anzeige**)  
* `report_version`: **`INTEGER`** (Optional, Version des Report-Generierungs-Prompts/Logik)  
* `language_code`: **`TEXT`** (z.B. **`de`**, **`en`**, um die Sprache des Reports zu kennzeichnen)

  ### **5\. `feedback`**

* **`id`**: **`BIGSERIAL`** (**PK**)  
* `session_id`: **`UUID`** (Nullable, **FK** zu **`sessions.id` ON DELETE SET NULL**)  
* `created_at`: **`TIMESTAMPZ`** (Standard: `now()`)  
* `context_url`: **`TEXT`** (Die URL/Seite, auf der das Feedback gegeben wurde)  
* `feedback_text`: **`TEXT`** (Der eigentliche Feedback-Text)  
* `rating`: **`INTEGER`** (Optional, z.B. 1-5 Sterne)  
* `user_id`: **`UUID`** (Nullable, **FK** zu **`auth.users`** \- falls Feedback von eingeloggtem Nutzer kommt)  
* `type`: **`TEXT`** (Optional, z.B. **`widget`**, **`post_questionnaire`**)  
* **Indizes**: **`created_at`**, **`type`**.

  ### **6\. `interest_submissions` (Für CTA-Klicks und Interesse an Premium)**

* **`id`**: **`BIGSERIAL`** (**PK**)  
* `session_id`: **`UUID`** (Nullable, **FK** zu **`sessions.id` ON DELETE SET NULL**)  
* `created_at`: **`TIMESTAMPZ`** (Standard: `now()`)  
* `interest_type`: **`TEXT`** (**`premium_model_notification`**, **`expert_talk_request`**, etc., **Nicht Null**)  
* `source_page`: **`TEXT`** (Die Seite, von der die Interessensbekundung kam, z.B. **`/report`**, **`/premium-info`**)  
* `user_id`: **`UUID`** (Nullable, **FK** zu **`auth.users`**)  
* **Indizes**: **`interest_type`**, **`created_at`**.

  ### **7\. `knowledge_nuggets`**

* Diese Tabelle dient als **Fallback** oder **alternative Datenquelle**, falls die primäre **Markdown/Git-basierte Verwaltung** der **Wissens-Nuggets** über **Lovable.dev** für bestimmte Anwendungsfälle nicht ausreicht oder dynamischere Aspekte benötigt werden. Die Hauptquelle für die **Wissensdatenbank** sind **Markdown-Dateien**.  
* **`id`**: **`SERIAL`** (**PK**)  
* `slug`: **`TEXT`** (**Unique**, **Nicht Null**, **Indiziert**)  
* `title_de`: **`TEXT`** (**Nicht Null**)  
* `title_en`: **`TEXT`** (**Nicht Null**)  
* `content_markdown_de`: **`TEXT`**  
* `content_markdown_en`: **`TEXT`**  
* `category_de`: **`TEXT`**, `category_en`: **`TEXT`**  
* `tags_de`: **`TEXT[]`**, `tags_en`: **`TEXT[]`**  
* `publish_date`: **`DATE`**  
* `created_at`: **`TIMESTAMPZ`** (Standard: `now()`)  
* `updated_at`: **`TIMESTAMPZ`** (Standard: `now()`)  
* `is_published`: **`BOOLEAN`** (Standard: **`false`**)  
* **Indizes**: **`slug`**, **`category_de`**, **`category_en`**, **`publish_date`**, **`is_published`**.

  ### **8\. `admin_prompts_config` (Zur Verwaltung des System-Prompts für Agent 1\)**

* **`id`**: **`SERIAL`** (**PK**)  
* `agent_identifier`: **`TEXT`** (**Unique**, **Nicht Null**, z.B. **`agent_1_questionnaire_de`**, **`agent_1_questionnaire_en`**)  
* `prompt_text`: **`TEXT`** (**Nicht Null**)  
* `version`: **`INTEGER`** (Standard: **`1`**)  
* `is_active`: **`BOOLEAN`** (Standard: **`true`**, es sollte nur ein aktiver Prompt pro **`agent_identifier`** existieren)  
* `description`: **`TEXT`** (Optional, zur Beschreibung des Prompts)  
* `updated_at`: **`TIMESTAMPZ`** (Standard: `now()`)  
* `updated_by`: **`TEXT`** (Optional, E-Mail oder ID des Admins)  
* **Indizes**: **`agent_identifier`**, **`is_active`**.

## **Wichtige Überlegungen für alle Tabellen**

* **Row Level Security (RLS)**: Für alle Tabellen, die **sensible Daten** enthalten oder auf die direkt vom **Frontend** zugegriffen wird (**`feedback`**, **`interest_submissions`**, **`generated_reports`** etc.), müssen **strikte RLS-Policies** implementiert werden. Generell gilt: **`anon` Rolle** sollte nur minimal notwendige Rechte haben (z.B. **`INSERT`** auf **`feedback`**). **Authentifizierte Nutzer** (**`authenticated` Rolle**) dürfen nur auf ihre **eigenen Daten** zugreifen, es sei denn, es handelt sich um öffentliche Daten. **Admins** (spezielle Rolle oder über **`user_metadata`** in **`auth.users`**) haben erweiterte Rechte.  
* **Indizes**: Sorgfältig gewählte **Indizes** sind entscheidend für die **Performance** von Leseoperationen.  
* **Foreign Keys** und **Kaskadierung**: **`ON DELETE CASCADE`** oder **`ON DELETE SET NULL`** sollte je nach Anforderung bei **Fremdschlüsseln** verwendet werden, um **Datenintegrität** zu wahren.  
* **Timestamps**: **`created_at`** und **`updated_at`** Felder sind für die **Nachverfolgung** von Änderungen wichtig. Trigger können verwendet werden, um **`updated_at`** automatisch zu aktualisieren.  
* **Validierungen**: **Constraints** (z.B. **`NOT NULL`**, **`UNIQUE`**, **`CHECK`**) sollten genutzt werden, um die **Datenqualität** auf Datenbankebene sicherzustellen.

# 

# **8\. Dokumentation von Umgebungsvariablen (Initial)**

Dieses **Artefakt** listet die initial erwarteten **Umgebungsvariablen** für die verschiedenen Teile der Anwendung auf. Namen, die mit **`VITE_`** (für **Vite**\-basierte **React**\-Anwendungen, Annahme für **Lovable.dev**) oder **`REACT_APP_`** (traditionelles **Create React App** Muster) beginnen, sind **clientseitig** im **Frontend** zugänglich. **Niemals Secrets clientseitig zugänglich machen\!** **Secrets** sollten sicher in den Umgebungseinstellungen der jeweiligen **Hosting-Plattformen** (**Lovable.dev**, **PaaS** für **Node.js**, **N8N**) verwaltet werden.

Eine **`.env.example`\-Datei** sollte in jedem Paket und im Root-Verzeichnis des **Mono-Repos** bereitgestellt werden, um Entwicklern die benötigten **Variablen** aufzuzeigen.

### **Für `packages/landing-page` (React via Lovable.dev)**

* **`VITE_MAIN_APP_URL="https://app.ai-strategy-navigator.com"`** (URL der Hauptanwendung, für Links)  
* **`VITE_SUPABASE_URL="https://<your-project-ref>.supabase.co"`** (Falls direkter **Supabase**\-Zugriff für z.B. Feedback-Widget benötigt)  
* **`VITE_SUPABASE_ANON_KEY="your-anon-key"`** (Falls direkter **Supabase**\-Zugriff benötigt)  
* **`VITE_PRERENDERING_SERVICE_TOKEN="your_prerender_service_token"`** (Optional, falls der **Prerendering-Dienst** eine clientseitige Komponente oder Token benötigt)  
* (Weitere Variablen könnten von **Lovable.dev** selbst oder dem gewählten **Deployment-Ziel** wie **Netlify/Vercel** benötigt werden, z.B. für Build-Prozesse oder Feature Flags).

  ### **Für `packages/app-frontend` (React via Lovable.dev)**

* **`VITE_NODE_PROXY_WEBSOCKET_URL="wss://proxy.ai-strategy-navigator.com/chat"`** (**WebSocket** URL des **Node.js Proxys**)  
* **`VITE_SUPABASE_URL="https://<your-project-ref>.supabase.co"`** (Für direkten **Supabase**\-Zugriff)  
* **`VITE_SUPABASE_ANON_KEY="your-anon-key"`** (Für direkten **Supabase**\-Zugriff)  
* **`VITE_LANDING_PAGE_URL="https://ai-strategy-navigator.com"`** (URL der Landing Page, für Links)  
* (Auch hier könnten weitere **Variablen** von **Lovable.dev** oder dem **Deployment-Ziel** benötigt werden).

  ### **Für `packages/node-proxy-service` (Node.js Backend)**

* (Alle diese **Variablen** sind **serverseitig** und **SECRETS** sollten entsprechend geschützt werden)  
* **`PORT=10000`** (Port, auf dem der **Proxy-Server** lauscht)  
* **`CORS_ORIGIN="https://app.ai-strategy-navigator.com,https://ai-strategy-navigator.com,http://localhost:xxxx"`** (Comma-separated list of allowed origins for **CORS**)  
* **`SUPABASE_URL="https://<your-project-ref>.supabase.co"`** (**SECRET**)  
* **`SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"`** (**SECRET**) (Für vollen **DB-Zugriff** vom **Backend**)  
* **`GEMINI_API_KEY="your-google-gemini-api-key"`** (**SECRET**)  
* **`GEMINI_MODEL_NAME_AGENT1="gemini-1.5-flash"`** (Konfigurierbares Modell für **Agent 1**)  
* **`N8N_WEBHOOK_URL_REPORT_GENERATION="your-n8n-webhook-url"`** (**SECRET**, da Endpunkt bekannt sein muss)  
* **`ADMIN_USERNAME_APP_MAIN="admin_user"`** (Für Basis-Auth der Admin-Prompt-Endpunkte, falls nicht über **Supabase Auth** gelöst)  
* **`ADMIN_PASSWORD_HASH_APP_MAIN="hashed_password"`** (**SECRET**) (Falls Basis-Auth verwendet wird)  
* **`LOG_LEVEL="info"`** (z.B. **`debug`**, **`info`**, **`warn`**, **`error`**)

  ### **Für N8N (Credentials in N8N)**

* (Diese werden direkt in der **N8N-Oberfläche** als **Credentials** konfiguriert und nicht als **Umgebungsvariablen** im herkömmlichen Sinne für den **N8N-Prozess** selbst, es sei denn, **N8N** wird self-hosted mit **`.env`** betrieben.)  
* **`N8N_CRED_SUPABASE_SERVICE_KEY`** (**Supabase Service Role Key** für **DB-Zugriff**)  
* **`N8N_CRED_GEMINI_API_KEY`** (**Google Gemini API Key** für LLM-Aufrufe)

## **Generelle Hinweise**

* **Secrets Management**: Alle als **(SECRET)** markierten **Variablen** müssen sicher verwaltet werden (z.B. über die **Secret-Stores** der **Hosting-Plattformen**, **Lovable.dev**\-Einstellungen für **Secrets**, **HashiCorp Vault** etc.) und dürfen niemals direkt in den Code oder das **Git-Repository** eingecheckt werden.  
* **`.env` Dateien**: Für die lokale Entwicklung sollten **`.env` Dateien** verwendet werden, die von **Git** ignoriert werden (**`.gitignore`**).  
* **Konsistenz**: Die Namen der **Umgebungsvariablen** sollten **konsistent** über die verschiedenen Services hinweg sein, wo immer möglich.  
* **Dokumentation**: Jede **Variable** sollte klar **dokumentiert** sein (Zweck, Beispielwert, ob optional oder notwendig).

# 

# **9\. Teststrategie (High-Level)**

Eine umfassende **Teststrategie** ist entscheidend für die **Qualität** und **Stabilität** des "**AI Strategy Navigator**" **MVP**. Die **Strategie** umfasst verschiedene **Testebenen** und **\-typen**:

### **1\. Unit-Tests**

* **Ziel**: Testen einzelner, isolierter **Funktionen**, **Module** oder **Komponenten**.  
* **Frontend** (`landing-page`, `app-frontend` \- **React**/**Lovable.dev**):  
  * **Werkzeuge**: **Jest**, **React Testing Library (RTL)**. **Lovable.dev** kann bei der Generierung von **Test-Stubs** für **Komponenten** unterstützen oder der "**Dev Mode**" kann genutzt werden, um **Tests** manuell hinzuzufügen.  
  * **Fokus**: Testen von **UI-Komponenten-Rendering**, **Props-Verarbeitung**, **Event-Handlern**, einfacher **Zustandslogik** in **Hooks**.  
* **Backend** (`node-proxy-service` \- **Node.js**):  
  * **Werkzeuge**: **Jest**, **Mocha**/**Chai** oder das eingebaute **Node.js** `assert` Modul.  
  * **Fokus**: Testen von **Service-Funktionen** (z.B. **Gemini API**\-Interaktion, **Chunking-Logik** für simuliertes **Streaming**), **Utility-Funktionen**, einfacher **Routen-Handler-Logik** (ohne echte **HTTP-Requests**).  
* **Mocking**: Externe Abhängigkeiten (wie **Supabase Client**, **Gemini API Client**, **N8N Webhook-Aufrufe**) müssen in **Unit-Tests** gemockt werden.

  ### **2\. Integrationstests**

* **Ziel**: Testen der Interaktion zwischen mehreren **Komponenten** oder **Modulen**.  
* **Frontend**:  
  * Testen, wie mehrere **React-Komponenten** zusammenarbeiten, z.B. ein Formular mit seinen Eingabefeldern und dem Submit-Button.  
  * Interaktion mit gemockten **API-Services** (z.B. simulierte Antworten vom **Node.js Proxy** oder **Supabase**).  
* **Backend** (`node-proxy-service`):  
  * Testen der Interaktion zwischen **Routen-Handlern** und **Service-Schichten**.  
  * Testen der **WebSocket**\-Kommunikation mit einem Test-Client.  
  * Testen der Interaktion mit einer Test-Instanz von **Supabase** (oder einer gemockten **DB-Schicht**). **Werkzeug**: **Supertest** für **HTTP API-Endpunkte**.  
* **N8N-Workflows**: Einzelne **Knoten** und **Teil-Workflows** können in **N8N** direkt getestet werden. Die Interaktion mit **Supabase** und der **Gemini API** innerhalb von **N8N** sollte mit **Testdaten** validiert werden.

  ### **3\. End-to-End (E2E)-Tests**

* **Ziel**: Testen kompletter **User Journeys** durch die gesamte Anwendung, wie sie ein echter Nutzer erleben würde.  
* **Werkzeuge**: **Cypress** oder **Playwright**.  
* **Szenarien**:  
  * **Landing Page**: Aufruf der **Wissens-Nugget**\-Seiten, Interaktion mit Such-/Filterfunktionen.  
  * **Hauptanwendung**: Vollständiger Fragebogen-Prozess (Start, Chat mit **Agent 1**, Zusammenfassung), **Report**\-Anzeige, **Feedback**\-Abgabe, **CTA-Interaktion**.  
  * **Admin-Funktionen**: Login, Prompt-Verwaltung.  
* Diese **Tests** sind aufwendiger, aber essenziell, um das Zusammenspiel aller Systemteile zu validieren.

  ### **4\. API-Tests (für `node-proxy-service`)**

* **Ziel**: Direkte **Tests** der **HTTP-** und **WebSocket-Endpunkte** des **Node.js Proxys**.  
* **Werkzeuge**: **Postman**, **Newman** (für automatisierte **API-Tests** in **CI/CD**), oder spezialisierte **WebSocket-Testclients**.  
* **Fokus**: Validierung von **Request/Response-Formaten**, **Authentifizierung/Autorisierung**, **Fehlercodes**, **Performance** unter Last (**Basis-Lasttests**).

  ### **5\. LLM-Output-Validierung (Qualitativ & Heuristisch)**

* **Ziel**: Sicherstellen, dass die von den **Gemini-Modellen** generierten Texte (Chat-Antworten, Report-Inhalte) **qualitativ hochwertig**, **relevant** und im erwarteten **Format** sind.  
* **Ansatz**:  
  * Definition von **Testfällen** mit Beispieldialogen und erwarteten Report-Strukturen.  
  * Manuelle Überprüfung der **LLM-Outputs** anhand dieser **Testfälle**.  
  * **Heuristische Bewertung** von Kohärenz, Relevanz, Tonalität und Faktizität (soweit möglich).  
  * Für strukturierte **LLM-Outputs** (z.B. **JSON** aus **Extraktions-Agent**): **Schema-Validierung**.  
* Dies ist weniger ein automatisierter Test als ein kontinuierlicher **Qualitätssicherungsprozess**, insbesondere bei Änderungen an **Prompts**.

  ### **6\. SEO-Tests (speziell für `landing-page`)**

* **Ziel**: Überprüfung der technischen **SEO**\-Implementierung der **React SPA Landing Page**.  
* **Ansatz**:  
  * Validierung der durch **`react-helmet-async`** gesetzten **Meta-Tags** (**Title**, **Description**, **OpenGraph**) pro Seite.  
  * Überprüfung der generierten **`sitemap.xml`** und **`robots.txt`**.  
  * Testen der **Prerendering**\-Funktionalität: Abruf von Seiten mit einem **Crawler User-Agent** (z.B. via `curl`) und Überprüfung, ob vollständiges **HTML** zurückgegeben wird.  
  * Validierung strukturierter Daten (**JSON-LD**) mit **Google's Rich Results Test** oder **schema.org Validator**.  
  * **Ladezeit-Analysen** (**Core Web Vitals**) mit Tools wie **Lighthouse** oder **PageSpeed Insights**.

  ### **7\. CI/CD Integration**

* Automatisches Ausführen von **Unit-** und **Integrationstests** bei jedem Push/Merge in der **CI/CD-Pipeline** (**GitHub Actions** für **Node.js Proxy**, **Lovable.dev Build-Prozess** für **Frontends**).  
* **E2E-Tests** können seltener (z.B. nächtlich oder vor Releases) in einer Staging-Umgebung ausgeführt werden.  
* **Linting** und **Code-Formatierungs-Checks** als Teil der **Pipeline**.

## **Allgemeine Prinzipien**

* **Test-Pyramide**: Fokus auf eine breite Basis von **Unit-Tests**, ergänzt durch **Integrationstests** und eine kleinere Anzahl von **E2E-Tests**.  
* **Automatisierung**: Wo immer möglich, sollten **Tests** automatisiert und in die **CI/CD-Pipeline** integriert werden.  
* **Testdaten**: Verwendung von realistischen, aber anonymisierten **Testdaten**.  
* **Isolation**: **Tests** sollten voneinander unabhängig sein.  
* **Wartbarkeit**: **Tests** sollten gut strukturiert, lesbar und wartbar sein.

# **10\. Frontend-Architektur (High-Level für React mit Lovable.dev)**

Diese **Architektur** beschreibt die grundlegenden Prinzipien und Muster für die beiden **Frontend-Anwendungen** (`landing-page` und `app-frontend`), die beide mit **React** unter Verwendung von **Lovable.dev** als primärem Entwicklungswerkzeug erstellt werden.

### **1\. Komponentengenerierung und \-anpassung mit Lovable.dev**

* **Prompt-basierte Generierung**: Die initiale Erstellung von **UI-Komponenten**, **Layouts** und **Basis-Logik** erfolgt durch präzise textuelle Anweisungen (**Prompts**) an **Lovable.dev**. Dies umfasst die Definition von **Struktur**, **Aussehen** und **Verhalten**.  
* **Visuelle Anpassungen ("Visual Edits")**: Kleinere Design-Anpassungen (Farben, Abstände, Typografie) können direkt im visuellen Editor von **Lovable.dev** vorgenommen werden, ohne Code schreiben zu müssen.  
* **"Dev Mode"**: Für komplexe **Logik**, Integration von **Drittanbieter-Bibliotheken** (z.B. **`react-helmet-async`**, **`fuse.js`**), **Performance-Optimierungen** oder spezifische Anpassungen, die über **Prompts** schwer zu erreichen sind, wird der "**Dev Mode**" von **Lovable.dev** genutzt. Dieser ermöglicht direkten Zugriff auf den **React-Code** (**TypeScript/JSX**) und die Projektstruktur (oft **Vite**\-basiert).  
* **"Knowledge Files"**: Um die **Konsistenz** und **Qualität** der von **Lovable.dev** generierten **Komponenten** zu verbessern, werden "**Knowledge Files**" (**Markdown**) gepflegt. Diese enthalten Informationen über das **Design-System** (Farben, Typografie aus **`UX_GUIDE.md`**), wiederkehrende **UI-Muster**, spezifische Projektanforderungen oder bevorzugte **Code-Stile** und dienen **Lovable.dev** als persistenter Kontext.  
* **GitHub-Integration**: Der von **Lovable.dev** generierte und im "**Dev Mode**" angepasste Code wird kontinuierlich mit dem **GitHub Mono-Repo** synchronisiert. Dies ermöglicht **Versionierung**, **Kollaboration** und die Nutzung von Standard-**Git-Workflows**.

  ### **2\. State Management**

* **Lokaler Komponenten-State**: Für einfache, auf eine Komponente beschränkte Zustände wird **`useState`** und **`useReducer`** von **React** verwendet.  
* **Globaler/Geteilter State**:  
  * Für einfache, anwendungsweite Zustände oder themenbezogene Daten, die über wenige Komponenten geteilt werden, wird **React Context API** genutzt.  
  * Für komplexere globale Zustände, die Performance-optimiert sein müssen, wird eine leichtgewichtige **State-Management-Bibliothek** wie **Zustand** oder **Jotai** evaluiert und im "**Dev Mode**" integriert. Die Auswahl hängt von der spezifischen Komplexität ab, die sich im Laufe der Entwicklung ergibt.  
* **Server-State Management**: Für die Interaktion mit **Supabase** (Datenabruf, **Caching**, Synchronisation, **Optimistic Updates**) wird **TanStack Query (v5, ehemals React Query)** empfohlen. Dies wird im "**Dev Mode**" in die **Service-Schicht** integriert.

  ### **3\. Routing**

* Es wird **React Router (v6 oder neuer)** als primäre **Routing-Bibliothek** für beide **Single Page Applications (SPAs)** verwendet.  
* Die **Routenkonfiguration** (Definition von Pfaden und zugehörigen Seitenkomponenten) wird initial durch **Lovable.dev**\-**Prompts** angelegt und kann im "**Dev Mode**" verfeinert werden (z.B. für geschützte Routen, dynamische Routenparameter).

  ### **4\. Styling**

* **Tailwind CSS** ist das primäre **CSS-Framework**, da es von **Lovable.dev** gut unterstützt wird und eine schnelle, **utility-basierte UI-Entwicklung** ermöglicht. **Lovable.dev**\-**Prompts** werden angewiesen, **Tailwind-Klassen** für das **Styling** zu verwenden.  
* Globale **Stile**, **Design-Tokens** (Farben, Typografie, Abstände gemäß **`UX_GUIDE.md`**) und ggf. Basis-**Tailwind-Konfigurationen** (**`tailwind.config.js`**) werden im jeweiligen Frontend-Paket verwaltet und können **Lovable.dev** über "**Knowledge Files**" als Kontext dienen.

  ### **5\. API-Kommunikation**

* **`app-frontend`** (Chat mit **Agent 1**): Ein dedizierter **Hook** (z.B. **`useChatStream.tsx`**, basierend auf **PoC**\-Erkenntnissen) kapselt die **Logik** für die **WebSocket**\-Verbindung (mit **`socket.io-client`** oder nativem **WebSocket**) zum **`node-proxy-service`**. Dieser **Hook** managt den **Verbindungsaufbau** (inkl. Fallbacks), das Senden von Nutzernachrichten und das Empfangen/Verarbeiten der gestreamten Agenten-Antworten.  
* **Allgemeine HTTP-Anfragen** (an **Supabase PostgREST**, **Node.js Proxy Admin-Endpunkte**): Die Standard `Workspace` **API** oder eine leichtgewichtige Bibliothek wie **`axios`** wird verwendet. Diese Aufrufe werden in dedizierten **Service-Modulen** (z.B. `src/services/apiService.ts`, `src/services/supabaseService.ts`) gekapselt, um die **Logik** von den **UI-Komponenten** zu trennen und die **Testbarkeit** zu verbessern.

  ### **6\. Landing Page SEO-Optimierung (Spezifische Aspekte für die React SPA)**

* **Prerendering**: Ein externer Dienst (z.B. **Prerender.io**) wird genutzt, um statische **HTML**\-Versionen der **Landing Page** Seiten für **Suchmaschinen-Crawler** bereitzustellen. Die Konfiguration erfolgt auf **Hosting-Ebene**.  
* **Dynamische Meta-Tags**: **`react-helmet-async`** wird eingesetzt, um pro Seite (insbesondere für **Wissens-Nuggets**) unique **`<title>`**, **`<meta description>`**, **`<meta keywords>`**, **OpenGraph-Tags** und andere relevante Head-Elemente zu setzen. Inhalte hierfür stammen aus **Markdown-Frontmatter** oder werden dynamisch generiert. **Lovable.dev** kann angewiesen werden, Komponenten zu erstellen oder anzupassen, die **`react-helmet-async`** verwenden.  
* **Sitemap & `robots.txt`**: Die Generierung erfolgt zur **Build-Zeit**, idealerweise automatisiert durch **Vite-Plugins** (falls **Lovable.dev Vite** nutzt) oder Skripte. Die **`robots.txt`** wird manuell oder generiert im `public` Ordner abgelegt. **Lovable.dev** kann hier beratend oder bei der Skriptgenerierung unterstützen.  
* **Strukturierte Daten (JSON-LD)**: Für **Wissens-Nuggets** (**`Article`**, **`FAQPage`**) und ggf. andere wichtige Seiten werden **React-Komponenten** entwickelt (ggf. via **Lovable.dev**\-**Prompts**), die das **JSON-LD** dynamisch basierend auf den Seiteninhalten generieren und in den **`<head>`** einfügen.  
* **Performance**: Neben **Prerendering** tragen **Code-Splitting** (Standard in **Vite**/modernen **React-Setups**), **optimierte Bilder** (Formate, Komprimierung, **Lazy Loading**) und effizientes **State Management** zur Verbesserung der **Core Web Vitals** bei.

  ### **7\. Struktur der Frontend-Pakete (Lovable.dev generiert)**

* Die von **Lovable.dev** generierte **Ordnerstruktur** (typischerweise `src/components`, `src/pages`, `src/assets`, `src/App.tsx`, `vite.config.ts` etc.) wird als Basis verwendet.  
* Spezifische Ordner für **`services`**, **`hooks`**, **`contexts`**, **`config`**, **`layouts`**, **`styles`** werden bei Bedarf im "**Dev Mode**" hinzugefügt, um eine saubere **Organisation** zu gewährleisten.  
* Für die **Landing Page** wird ein `src/content/wissen/` Ordner für **Markdown-Dateien** angelegt.

  ### **8\. Fehlerbehandlung im Frontend**

* **React Error Boundaries** werden verwendet, um **Fehler** in Teilen der **UI** abzufangen und eine Fallback-UI anzuzeigen, anstatt die gesamte Anwendung abstürzen zu lassen.  
* **Fehler** von **API-Aufrufen** werden abgefangen und dem Nutzer verständlich kommuniziert (z.B. über **Toasts/Notifications**).

# **11\. Identifizierte Technische User Stories**

Dieses Artefakt listet **technische User Stories** auf, die notwendig sind, um die **Architektur** zu implementieren, **Non-Functional Requirements (NFRs)** zu erfüllen oder die **Entwicklererfahrung (DevEx)** zu verbessern. Diese Stories sind oft nicht direkt aus Endnutzer-Features abgeleitet, aber für die **Stabilität**, **Sicherheit** und **Wartbarkeit** des Systems unerlässlich. Sie ergänzen die **funktionalen User Stories** in den **Epics**.

### **T-INFRA.1: Node.js Backend Proxy Deployment-Pipeline einrichten**

**User Story / Goal:** Als Entwicklungsteam möchte ich eine **CI/CD-Pipeline** (z.B. mit **GitHub Actions**) für den **Node.js Backend Proxy** einrichten, die automatisch **Tests** ausführt, die Anwendung baut (**Docker-Image** erstellt) und auf der gewählten **PaaS-Plattform** (z.B. **Render.com**) deployed, um schnelle und zuverlässige Updates des Proxys zu ermöglichen.

**Acceptance Criteria (ACs):**

* Änderungen im `packages/node-proxy-service` auf dem **Main-Branch** lösen automatisch den **Build-** und **Deployment-Prozess** aus.  
* Die Pipeline führt **Unit-** und **Integrationstests** für den Proxy aus; ein Fehlschlagen der Tests verhindert das Deployment.  
* **Umgebungsvariablen** für die PaaS-Plattform werden sicher verwaltet und korrekt in die Deployment-Umgebung geladen.  
* Die deployte Anwendung ist auf der PaaS-Plattform **erreichbar und funktionsfähig**.

  ### **T-INFRA.2: Supabase Migrationen automatisieren**

**User Story / Goal:** Als Entwicklungsteam möchte ich den Prozess für **Datenbankmigrationen** mit der **Supabase CLI** und **GitHub Actions** automatisieren, um Schemaänderungen **versionierbar**, **nachvollziehbar** und **konsistent** über verschiedene Umgebungen hinweg (lokal, Staging, Produktion) anwenden zu können.

**Acceptance Criteria (ACs):**

* Neue Migrationsdateien im `supabase/migrations` Ordner werden von der **CI-Pipeline** erkannt.  
* **Migrationen** können automatisch auf einer Test- oder Staging-Datenbank angewendet werden.  
* Der Migrationsstatus ist **nachvollziehbar** (z.B. über Supabase Dashboard oder CLI-Ausgaben).  
* **Rollback-Strategien** für fehlgeschlagene Migrationen sind bedacht (manuell oder automatisiert).

  ### **T-INFRA.3: Mono-Repo Setup und Build-Prozess konfigurieren**

**User Story / Goal:** Als Entwicklungsteam möchte ich das **Mono-Repo-Tooling** (**pnpm workspaces**) vollständig konfigurieren, inklusive der **Build-Prozesse** für die einzelnen Pakete (`landing-page`, `app-frontend`, `node-proxy-service`, `shared-types`) und der korrekten Verlinkung des `shared-types` Pakets, um eine **effiziente Entwicklung** und **konsistente Builds** über das gesamte Projekt hinweg sicherzustellen.

**Acceptance Criteria (ACs):**

* Alle Pakete können von der Root-Ebene des Mono-Repos aus **gebaut werden** (z.B. `pnpm build --filter <package-name>`).  
* Das `shared-types` Paket wird korrekt von abhängigen Paketen **importiert** und Änderungen darin werden in den abhängigen Paketen **reflektiert**.  
* **Abhängigkeiten** zwischen den Paketen sind korrekt im jeweiligen `package.json` deklariert und werden vom Workspace-Tooling aufgelöst.

  ### **T-INFRA.4: Prerendering-Dienst für Landing Page konfigurieren und integrieren**

**User Story / Goal:** Als Entwicklungteam möchte ich einen **Prerendering-Dienst** (z.B. **Prerender.io**) für die **React-basierte Landing Page** (`packages/landing-page`) einrichten und mit der gewählten **Hosting-Plattform** (**Lovable Publishing, Netlify oder Vercel**) integrieren, damit **Suchmaschinen-Crawler** vollständig gerenderte **HTML-Versionen** der Seiten erhalten und die **SEO-Performance** maximiert wird.

**Acceptance Criteria (ACs):**

* Der **Prerendering-Dienst** ist korrekt konfiguriert und mit der Hosting-Umgebung der Landing Page verbunden.  
* **Suchmaschinen-Crawler** (identifiziert über User-Agent) erhalten **gecachte, serverseitig gerenderte HTML-Seiten**.  
* Reguläre Nutzer erhalten weiterhin die **interaktive React SPA**.  
* Die Prerendering-Logik beeinflusst die **Ladezeiten** für reguläre Nutzer nicht negativ.  
* Der **Cache** des Prerendering-Dienstes wird bei Updates der Landing Page invalidiert/aktualisiert.

  ### **T-INFRA.5: Build-Prozess für Wissensdatenbank-Inhalte (Markdown) optimieren**

**User Story / Goal:** Als Entwicklungsteam möchte ich sicherstellen, dass die **Markdown-Inhalte** der Wissensdatenbank (`packages/landing-page/src/content/`) zur **Build-Zeit effizient verarbeitet** (geparst, in HTML umgewandelt oder als Datenobjekte für React-Komponenten aufbereitet) und für das **Prerendering** sowie die dynamische Anzeige in der **React-Anwendung** (Landing Page) vorbereitet werden, unter Nutzung der von **Lovable.dev** bereitgestellten Mechanismen (**GitHub Sync, Vite-Build-Prozess**) oder ergänzender **Vite-Plugins**.

**Acceptance Criteria (ACs):**

* **Markdown-Inhalte** inklusive **Frontmatter-Metadaten** sind auf den Wissens-Nugget-Seiten korrekt dargestellt.  
* Der Build-Prozess ist **performant** und skaliert auch mit einer größeren Anzahl von Artikeln.  
* Die generierten Daten/Komponenten sind für das **Prerendering-System zugänglich** und werden korrekt gerendert.

  ### **T-SEC.1: Rate Limiting im Node.js Backend Proxy implementieren**

**User Story / Goal:** Als Entwicklungsteam möchte ich **Rate-Limiting-Mechanismen** für eingehende **WebSocket-Verbindungen** und \-Nachrichten sowie für **HTTP-Endpunkte** im **Node.js Backend Proxy** implementieren, um **Missbrauch der Google Gemini API** zu verhindern und den Dienst vor **Überlastung** durch einzelne Clients zu schützen.

**Acceptance Criteria (ACs):**

* **Definierte Limits** (z.B. Anzahl Anfragen pro Minute pro IP-Adresse oder `sessionId`) sind implementiert.  
* Bei Überschreitung der Limits erhalten Clients eine entsprechende **Fehlermeldung** (z.B. HTTP 429, WebSocket-Fehlernachricht).  
* Das Rate Limiting beeinträchtigt die **normale Nutzung** der Anwendung nicht.

  ### **T-SEC.2: Detaillierte Row Level Security (RLS) Policies in Supabase implementieren**

**User Story / Goal:** Als Entwicklungsteam möchte ich **detaillierte** und **restriktive Row Level Security (RLS) Policies** für alle relevanten Tabellen in der **Supabase-Datenbank** implementieren, um sicherzustellen, dass Nutzer (sowohl anonyme als auch authentifizierte) nur auf die Daten zugreifen können, für die sie explizit berechtigt sind.

**Acceptance Criteria (ACs):**

* **RLS** ist für alle Tabellen aktiviert.  
* **Policies** für `SELECT`, `INSERT`, `UPDATE`, `DELETE` sind pro Tabelle und Nutzerrolle (anon, authenticated, admin) definiert.  
* Nutzer können nicht auf Daten anderer Nutzer zugreifen, es sei denn, dies ist **explizit erlaubt**.  
* Die **Policies** werden regelmäßig überprüft und getestet.

  ### **T-NFR.1: Strukturiertes Logging im Node.js Backend Proxy einrichten**

**User Story / Goal:** Als Entwicklungsteam möchte ich ein **strukturiertes Logging-System** (z.B. mit **Winston** oder **Pino**) im **Node.js Backend Proxy** einrichten, das wichtige Ereignisse, Fehler und Anfragen mit relevantem Kontext (Zeitstempel, Request-ID, Fehlermeldung, Stacktrace) erfasst, um **Debugging**, **Monitoring** und **Fehleranalyse** zu erleichtern.

**Acceptance Criteria (ACs):**

* Logs werden in einem **konsistenten Format** (z.B. JSON) ausgegeben.  
* Verschiedene **Log-Level** (DEBUG, INFO, WARN, ERROR) werden unterstützt und können konfiguriert werden.  
* **Sensitive Informationen** (z.B. API-Keys) werden nicht in die Logs geschrieben.

  ### **T-NFR.2: Basis-Monitoring für den Node.js Backend Proxy einrichten**

**User Story / Goal:** Als Entwicklungsteam möchte ich ein **Basis-Monitoring** für den **Node.js Backend Proxy** auf der **PaaS-Plattform** einrichten, um wichtige Metriken wie **CPU-/Speichernutzung**, **Antwortzeiten**, **Fehlerraten** und **Verfügbarkeit** zu überwachen und bei Problemen benachrichtigt zu werden.

**Acceptance Criteria (ACs):**

* **Grundlegende Metriken** werden von der PaaS-Plattform erfasst und visualisiert.  
* **Alerts** für kritische Schwellenwerte (z.B. hohe Fehlerrate, Nicht-Erreichbarkeit) sind konfiguriert.

  ### **T-NFR.3: Coding Standards (Linting, Formatting) in CI durchsetzen**

**User Story / Goal:** Als Entwicklungsteam möchte ich, dass die definierten **Coding Standards** (**ESLint** für Linting, **Prettier** für Formatierung) automatisch als Teil der **CI-Pipeline** (**GitHub Actions**, Lovable.dev Build-Prozess) für alle Pakete überprüft werden, um die **Code-Qualität** und **Konsistenz** im gesamten **Mono-Repo** sicherzustellen.

**Acceptance Criteria (ACs):**

* Die **CI-Pipeline** führt **Linting-** und **Formatierungs-Checks** aus.  
* Code, der den Standards nicht entspricht, führt zu einem **Fehlschlagen des Builds** oder zumindest zu einer Warnung.  
* Entwickler können die Checks auch **lokal ausführen** (z.B. via Git-Hooks).

  ### **T-DEVEX.1: Lovable.dev "Knowledge Files" für Landing Page und Hauptanwendung erstellen und pflegen**

**User Story / Goal:** Als Entwicklungsteam möchten wir **umfassende "Knowledge Files"** für die Landing Page und die Hauptanwendung erstellen und aktuell halten. Diese Dateien liefern **Lovable.dev** wichtigen Kontext (z.B. **Design-System-Spezifika** aus `UX_GUIDE.md`, wiederkehrende Komponentenmuster, spezifische Projektanforderungen, bevorzugte Bibliotheken), um die **Qualität**, **Konsistenz** und **Relevanz** der KI-generierten Codevorschläge und \-anpassungen zu verbessern.

**Acceptance Criteria (ACs):**

* **"Knowledge Files"** sind im `docs/lovable_knowledge_files/` Ordner des **Mono-Repos** versioniert und aktuell.  
* **Lovable.dev** wird so konfiguriert (falls möglich), dass es diese Dateien bei der Code-Generierung berücksichtigt.  
* Die Qualität der von **Lovable.dev** generierten Artefakte verbessert sich durch den bereitgestellten Kontext.

  ### **T-SEO.1: `react-helmet-async` für dynamische Meta-Tags auf der Landing Page implementieren**

**User Story / Goal:** Als Entwickler möchte ich die Bibliothek **`react-helmet-async`** in die von **Lovable.dev** generierte Landing Page integrieren (ggf. im "Dev Mode"), um **dynamisch pro Seite** (insbesondere für Wissens-Nuggets) **unique Title-Tags**, **Meta-Descriptions**, **OpenGraph-Tags** und andere **SEO-relevante Head-Elemente** zu setzen. Die Inhalte dafür sollen aus dem Markdown-Frontmatter oder dynamisch generiert werden.

**Acceptance Criteria (ACs):**

* Jede Wissens-Nugget-Seite und andere wichtige Landing Page Seiten haben einen **unique** und **relevanten `<title>`** und **`<meta name="description">`**.  
* **OpenGraph-Tags** (`og:title`, `og:description`, `og:image` etc.) sind korrekt für das Teilen in sozialen Medien gesetzt.  
* **`react-helmet-async`** funktioniert korrekt im Kontext des **Prerendering-Dienstes**, sodass die Tags im serverseitig gerenderten HTML vorhanden sind.

  ### **T-SEO.2: Sitemap-Generierung und `robots.txt` für Landing Page einrichten**

**User Story / Goal:** Als Entwickler möchte ich einen Prozess zur **automatischen Generierung** einer **`sitemap.xml`** und einer **`robots.txt`** für die Landing Page während des **Build-Prozesses** implementieren (z.B. via Vite-Plugin, falls Lovable.dev Vite verwendet, oder durch ein Skript, das Lovable.dev ausführen kann), um Suchmaschinen die **Indexierung zu erleichtern** und zu steuern.

**Acceptance Criteria (ACs):**

* Eine **`sitemap.xml`** wird korrekt generiert und enthält URLs zu allen relevanten, indexierbaren Seiten der Landing Page (inkl. aller Sprachversionen der Wissens-Nuggets).  
* Eine **`robots.txt`**\-Datei ist vorhanden und korrekt konfiguriert (z.B. Verweis auf Sitemap, Disallow für nicht-öffentliche Pfade).  
* Beide Dateien werden im **Root-Verzeichnis** der deployten Landing Page bereitgestellt.

# 

# **Technisch Angereicherte Epics (Einzelartefakte)**

Im Folgenden werden die sechs **Kern-Epics** des "**AI Strategy Navigator**" **MVP** detailliert beschrieben. Jedes Epic ist als **eigenständiges Markdown-Artefakt** formatiert und beinhaltet das **Ziel**, die spezifische Einbettung in den **technischen Kontext** (unter Berücksichtigung von **Lovable.dev** und der **PoC-Erkenntnisse**) sowie eine Liste der zugehörigen **User Stories**. Die User Stories sind so formuliert, dass sie den Einsatz von **Lovable.dev** als primäres Frontend-Entwicklungswerkzeug widerspiegeln und die Interaktion mit der **KI-gestützten Generierung** und Anpassung von Komponenten betonen.

# 

# **Epic 1: Initiales Setup, Basisarchitektur, Deployment & Admin-Grundlagen (Technisch Angereichert)**

## **Goal:**

Schaffung der **grundlegenden technischen Infrastruktur** im Rahmen eines **Mono-Repos** (verwaltet mit **pnpm workspaces** oder ähnlichem Tool), des Projekt-Setups für alle Kernanwendungen (**Landing Page via Lovable.dev/React**, **Hauptanwendungs-Frontend via Lovable.dev/React**, **Node.js Backend Proxy**), der initialen Deployment-Pipelines (Ziel: **Lovable Publishing / Netlify / Vercel für Frontends, PaaS für Node.js**) inklusive **Prerendering-Setup für die Landing Page**, sowie der rudimentären Grundlagen für die Admin-Funktionen (Zugriff via **Supabase Auth**). Dieses Epic legt die stabile Basis für alle weiteren MVP-Funktionalitäten, inklusive der **sicheren Anbindung an Supabase** (Datenbank) und der Vorbereitung für die **LLM-Integration** (**Google Gemini**). Ziel ist es, eine erste, **minimal lauffähige "Hülle"** der Systeme inklusive der **gesicherten Admin-Zugangspunkte**, der **grundlegenden DevOps-Praktiken** und der **SEO-fähigen Landing Page** in den Zielumgebungen zu haben.

## **Deployability:**

Dieses Epic etabliert die **absolute Grundlage** und ist **Voraussetzung für alle nachfolgenden Epics**. Nach Abschluss sind die **Mono-Repo-Struktur** und die Build-Prozesse etabliert. Die **Deployment-Strukturen** für Landing Page (React/Lovable.dev mit Prerendering), App-Frontend (React/Lovable.dev) und Node.js Backend Proxy sind aufgesetzt. Die Landing Page ist **initial sichtbar** und **SEO-freundlich**. Die Hauptanwendungsumgebung und der Node.js Proxy sind lauffähig. Admin-Funktionen sind **initial gesichert**. Grundlegende Datenbanktabellen in **Supabase** sind via **Migrationen** angelegt. Es ermöglicht die Entwicklung und das Deployment der in den folgenden Epics beschriebenen Features.

## **Epic-Specific Technical Context (Technisch Angereichert):**

### **Projekt-Scaffolding & Repository (Mono-Repo):**

* Initialisierung eines **GitHub Mono-Repos** (z.B. mit `pnpm workspaces`).  
* Strukturierung der `packages/` für:  
  * `landing-page` (**React, Lovable.dev generiert/verwaltet**)  
  * `app-frontend` (**React, Lovable.dev generiert/verwaltet**)  
  * `node-proxy-service` (Node.js, Express.js/Fastify)  
  * `shared-types` (TypeScript Typdefinitionen)  
* Einrichtung von Root-Level Konfigurationen für **Prettier**, **ESLint** und **TypeScript**.  
* Erstellung von **Lovable.dev "Knowledge Files"** (`docs/lovable_knowledge_files/`) für beide Frontend-Anwendungen, um **Lovable.dev Kontext** über Design-System-Elemente, UI-Muster, Textstile, Markenrichtlinien, Tonalität und spezifische Projektanforderungen zu geben. Diese Dateien sind entscheidend, um die **Qualität und Konsistenz** der von **Lovable.dev** generierten Komponenten zu optimieren.  
* Ergänzung eines `UX_GUIDE.md` in `docs/` (Grundfarben, Typografie, Icon-Set, Responsiveness-Richtlinien, **Lovable.dev Design-System Referenzen**).  
* Einrichtung von `supabase/migrations` für **Datenbankmigrationen**.

  ### **Landing Page Setup (packages/landing-page):**

* Frontend-Erstellung: **Lovable.dev** (KI-gestützt via **Prompts, Visual Edits, Dev Mode**). Prompts sollten spezifische Anweisungen zu Struktur, Inhaltselementen (Hero, CTA, Trust-Elemente), Styling (gemäß `UX_GUIDE.md`) und gewünschten **Lovable.dev-Features** (z.B. Nutzung von "Knowledge Files") enthalten.  
* Technologie: **React**, TypeScript, **Tailwind CSS** (durch Lovable.dev).  
* **SEO-Strategie:**  
  * **Prerendering-Dienst** (z.B. **Prerender.io**) einrichten und mit der gewählten Hosting-Lösung (**Lovable Publishing, Netlify oder Vercel**) integrieren. Die Konfiguration muss sicherstellen, dass Crawler gecachte HTML-Versionen erhalten.  
  * Implementierung von **`react-helmet-async`** für **dynamische Meta-Tags**. **Lovable.dev** kann angewiesen werden, Komponenten zu generieren, die `react-helmet-async` für das Setzen von `<title>`, `<meta description>` etc. nutzen.  
  * **Build-Time Generierung** von **`sitemap.xml`** und **`robots.txt`** (z.B. durch Vite-Plugins, die im **Lovable.dev "Dev Mode"** konfiguriert werden, oder durch spezifische Prompts an Lovable.dev, falls unterstützt).  
* Deployment: **CI/CD-Pipeline** zu **Lovable Publishing / Netlify / Vercel** (Auswahl TBD), konfiguriert für **Prerendering** und **GitHub-Sync** mit Lovable.dev.  
* Initiales Setup einer **passwortgeschützten Admin-Funktionalität** (z.B. integriert in die Hauptanwendungs-Admin-UI) für **Basis-Content-Management** der Wissensdatenbank-Artikel (Markdown-Dateien via GitHub/Lovable.dev Sync), gesichert über **Supabase Auth**.  
* Umsetzung der **UI/UX-Grundlagen** (Hero-Headline, CTA, Trust-Elemente, Responsivität) gemäß PRD durch **Lovable.dev-Prompts** und ggf. **"Visual Edits"**.

  ### **Hauptanwendung Frontend Setup (packages/app-frontend):**

* Frontend-Erstellung: **Lovable.dev** (KI-gestützt via **Prompts, Visual Edits, Dev Mode**). Prompts sollten die Struktur der Hauptanwendung (z.B. Layout für Chat-Interface, Report-Anzeige, Admin-Bereich) und die zu verwendenden **Lovable.dev-Features** spezifizieren.  
* Technologie: **React**, TypeScript, **Tailwind CSS** (durch Lovable.dev).  
* Deployment: **CI/CD-Pipeline** zur Ziel-CDN-Infrastruktur (**Lovable.dev Publishing** oder Alternativen wie Netlify/Vercel mit GitHub Sync).  
* Initiales Setup von **Admin-Funktionen** (z.B. für **Prompt-Management** von Agent 1), gesichert über **Supabase Auth**. UI-Komponenten hierfür werden mit **Lovable.dev** erstellt.

  ### **Node.js Backend Proxy Setup (packages/node-proxy-service):**

* Technologie: **Node.js** (LTS), **Express.js**, **`ws`** für WebSockets.  
* Aufgaben: **Sicherer Proxy** für **Gemini API**, **WebSocket-Management**, **Implementierung des simulierten Streamings** (Antworten der Gemini API in Chunks zerlegen und im OpenAI-kompatiblen Format sequentiell senden, wie im PoC validiert), Speichern von Chatverläufen in **Supabase**, Triggern von **N8N**.  
* Deployment: **CI/CD-Pipeline** zu einer **PaaS-Plattform** (z.B. **Render.com**, wie im PoC positiv getestet). Inklusive **Dockerfile** für Portabilität.

  ### **Supabase Backend Setup:**

* Initialisierung des **Supabase-Projekts**.  
* Einrichtung der **initialen Datenbanktabellen** (`sessions`, `raw_chat_history`, `admin_prompts_config`, `feedback`, `interest_submissions` etc.) mittels **SQL-Migrationen** im `supabase/migrations` Ordner.  
* Konfiguration von **Row Level Security (RLS)** als Standard für alle Tabellen, um **Datensicherheit** zu gewährleisten.  
* Sichere Verwaltung der **Supabase Zugangsdaten** (`SERVICE_ROLE_KEY` für Backend, `ANON_KEY` für Frontend-Zugriffe).  
* Einrichtung von **Supabase Auth** für die Absicherung der Admin-Funktionen.

  ### **N8N Workflow-Vorbereitung:**

* Einrichtung eines **Webhook-Triggers** in der bestehenden **N8N Cloud-Instanz** (Elest.io) für die spätere Entgegennahme von Report-Generierungsanfragen vom Node.js Proxy.  
* Sichere Speicherung der **N8N-Webhook-URL** als Umgebungsvariable im Node.js Proxy.

  ### **LLM API Anbindung:**

* Sichere Speicherung des **Google Gemini API-Keys** als Umgebungsvariable im Node.js Backend Proxy und als Credential in N8N.  
* Vorbereitung für die Nutzung der entsprechenden **Gemini API-Endpunkte** im Node.js Proxy (für den Chat-Agenten) und in N8N (für Extraktions- und Report-Agenten).

  ### **Sicherheitsaspekte (Basis):**

* Authentifizierung für **Admin-Funktionen** über **Supabase Auth**.  
* Sichere API-Kommunikation (**HTTPS** für alle externen Endpunkte).  
* Grundlagen für **LLM-Missbrauchsprävention** (**Rate Limiting** im Node.js Proxy – siehe T-SEC.1).  
* Implementierung eines **Cookie-Banners** (**DSGVO-konform**) auf der Landing Page und ggf. Hauptanwendung, idealerweise durch **Lovable.dev** generiert.

  ### **Entwicklungsumgebung & Standards:**

* Einrichtung von **Prettier** und **ESLint** mit **Git-Hooks** (Husky, lint-staged) zur automatischen Formatierung und Code-Prüfung.  
* Definition von **`pnpm` Skripten** für gängige Aufgaben (Testen, Bauen, Starten der Dev-Server).  
* **Lovable.dev Workflow:** Dokumentation von **Best Practices** für die Formulierung von Prompts, die Nutzung des "Edit Mode" und "Chat Mode", den effektiven Einsatz von "Visual Edits" und die Pflege der "Knowledge Files" zur Optimierung der KI-gestützten Entwicklung.

# **Story List (Technisch Angereichert & Ergänzt für Epic 1):**

### **Story 1.1: Mono-Repo mit pnpm Workspaces (oder Äquivalent) initialisieren und strukturieren**

**User Story / Goal:** Als Entwicklungsteam möchte ich ein **Mono-Repo** mit **`pnpm workspaces`** (oder einem äquivalenten Tool) initialisieren und die Paketstruktur für `landing-page`, `app-frontend`, `node-proxy-service` und `shared-types` einrichten, damit die Codebasis **zentral verwaltet**, Code geteilt und die **Entwicklung effizient** gestaltet werden kann.

**Detailed Requirements:**

* Einrichtung der **Workspace-Konfiguration**.  
* Erstellung initialer `package.json` für jedes Paket.  
* Konfiguration von **Root-Level Skripten**.  
* Erstellung des `shared-types` Pakets.  
* Einrichtung `docs/UX_GUIDE.md` und `docs/lovable_knowledge_files/`.

**Acceptance Criteria (ACs):**

* Abhängigkeiten workspace-übergreifend **installierbar/verlinkbar**.  
* `shared-types` **importierbar**.  
* Basis-Build-Prozesse **definierbar**.

  ### **Story 1.2 (Überarbeitet): Landing Page Projekt (React/Lovable.dev) initialisieren, SEO-Grundlagen und CI/CD einrichten**

**User Story / Goal:** Als Entwickler, der **Lovable.dev** nutzt, möchte ich die **KI anweisen (prompten)**, das Landing Page Projekt im `packages/landing-page` Verzeichnis mit **React**, **TypeScript** und **Tailwind CSS** zu initialisieren. Ich möchte eine **CI/CD-Pipeline** für das automatisierte Deployment (**Lovable Publishing/Netlify/Vercel**) einrichten, die **Prerendering** unterstützt. Die initialen UI/UX-Anforderungen (Hero, CTA, Trust) sollen umgesetzt und Basisfunktionen für **SEO** (dynamische Meta-Tags via **`react-helmet-async`**, Placeholder für Sitemap/robots.txt) vorbereitet werden.

**Detailed Requirements (Lovable.dev fokussiert):**

* Erstellung eines neuen **Lovable.dev-Projekts** für die Landing Page, verbunden mit dem GitHub Mono-Repo-Pfad `packages/landing-page`.  
* Formulierung eines initialen **Prompts an Lovable.dev** zur Generierung der Grundstruktur der Landing Page (Layout, Hero-Sektion, CTA-Button, Footer für Trust-Elemente) basierend auf dem `UX_GUIDE.md` und dem PRD.  
* Einrichtung der gewählten **Deployment-Option** (**Lovable Publishing** oder Netlify/Vercel) mit **GitHub-Sync**.  
* Konfiguration des **Prerendering-Dienstes** (z.B. Prerender.io) in der gewählten Hosting-Umgebung.  
* **Prompt an Lovable.dev** zur Integration von **`react-helmet-async`** in die Seiten-Templates oder manuelle Implementierung im "Dev Mode".  
* Erstellung eines **"Knowledge File"** für die Landing Page (`docs/lovable_knowledge_files/landing_page_context.md`) mit Kernanforderungen und Design-Vorgaben.

**Acceptance Criteria (ACs):**

* Landing Page ist via **Lovable.dev deploybar**.  
* **Prerendering** funktioniert für Testseiten.  
* Basis-Meta-Tags sind setzbar.  
* UI-Grundelemente sind vorhanden.

  ### **Story 1.3 (Überarbeitet): Hauptanwendungs-Frontend Projekt (React/Lovable.dev) initialisieren und CI/CD einrichten**

**User Story / Goal:** Als Entwickler, der **Lovable.dev** nutzt, möchte ich die **KI anweisen (prompten)**, das Frontend-Projekt für die Hauptanwendung im `packages/app-frontend` Verzeichnis mit **React**, **TypeScript** und **Tailwind CSS** zu initialisieren und die **CI/CD-Pipeline** für das automatisierte Deployment (**Lovable.dev Publishing** oder Alternative) einzurichten.

**Detailed Requirements (Lovable.dev fokussiert):**

* Erstellung eines neuen **Lovable.dev-Projekts** für die Hauptanwendung, verbunden mit `packages/app-frontend`.  
* Initialer **Prompt an Lovable.dev** zur Generierung des Haupt-Layouts (z.B. mit Platzhaltern für Chat, Report, Admin-Bereich).  
* Einrichtung der **Deployment-Option**.  
* Erstellung eines **"Knowledge File"** für die Hauptanwendung.

**Acceptance Criteria (ACs):**

* Hauptanwendungs-Frontend ist via **Lovable.dev deploybar**.  
* Grundstruktur ist vorhanden.

  ### **Story 1.4: Node.js Backend Proxy Projekt initialisieren**

**User Story / Goal:** Als Backend-Entwickler möchte ich das **Node.js Backend Proxy** Projekt im `packages/node-proxy-service` Verzeichnis initialisieren (mit **Express.js**, **TypeScript**, **`ws`**), das als **sicherer Proxy zur Gemini API** dient, **WebSocket-Verbindungen** handhabt, **simuliertes Streaming** implementiert und mit **Supabase** interagiert.

**Detailed Requirements:**

* Grundlegendes **Server-Setup**.  
* Basis-Ordnerstruktur.  
* Einrichtung **TypeScript**, **ESLint**, **Prettier**.  
* Implementierung eines **Health-Check-Endpunkts**.

**Acceptance Criteria (ACs):**

* Einfacher HTTP-Endpunkt im Proxy erreichbar.  
* Projekt **lokal startbar/baubar**.

  ### **Story T-INFRA.1: Node.js Backend Proxy Deployment-Pipeline einrichten**

**User Story / Goal:** Als Entwicklungsteam möchte ich eine **CI/CD-Pipeline** (z.B. mit **GitHub Actions**) für den **Node.js Backend Proxy** einrichten, die automatisch **Tests** ausführt, die Anwendung baut (**Docker-Image** erstellt) und auf der gewählten **PaaS-Plattform** (z.B. **Render.com**) deployed, um schnelle und zuverlässige Updates des Proxys zu ermöglichen.

**Acceptance Criteria (ACs):**

* Änderungen im `packages/node-proxy-service` auf dem **Main-Branch** lösen automatisch den **Build-** und **Deployment-Prozess** aus.  
* Die Pipeline führt **Unit-** und **Integrationstests** für den Proxy aus; ein Fehlschlagen der Tests verhindert das Deployment.  
* **Umgebungsvariablen** für die PaaS-Plattform werden sicher verwaltet und korrekt in die Deployment-Umgebung geladen.  
* Die deployte Anwendung ist auf der PaaS-Plattform **erreichbar und funktionsfähig**.

  ### **Story T-INFRA.4: Prerendering-Dienst für Landing Page konfigurieren und integrieren**

**User Story / Goal:** Als Entwicklungteam möchte ich einen **Prerendering-Dienst** (z.B. **Prerender.io**) für die **React-basierte Landing Page** (`packages/landing-page`) einrichten und mit der gewählten **Hosting-Plattform** (**Lovable Publishing, Netlify oder Vercel**) integrieren, damit **Suchmaschinen-Crawler** vollständig gerenderte **HTML-Versionen** der Seiten erhalten und die **SEO-Performance** maximiert wird.

**Acceptance Criteria (ACs):**

* Der **Prerendering-Dienst** ist korrekt konfiguriert und mit der Hosting-Umgebung der Landing Page verbunden.  
* **Suchmaschinen-Crawler** (identifiziert über User-Agent) erhalten **gecachte, serverseitig gerenderte HTML-Seiten**.  
* Reguläre Nutzer erhalten weiterhin die **interaktive React SPA**.  
* Die Prerendering-Logik beeinflusst die **Ladezeiten** für reguläre Nutzer nicht negativ.  
* Der **Cache** des Prerendering-Dienstes wird bei Updates der Landing Page invalidiert/aktualisiert.

  ### **Story 1.5: Supabase Backend initialisieren und Datenbankmigrationen einrichten**

**User Story / Goal:** Als Backend-Entwickler möchte ich ein **Supabase-Projekt** initialisieren, die **Supabase CLI** für lokale Entwicklung und Migrationen einrichten und die **initialen Datenbanktabellen** (`sessions`, `raw_chat_history`, `admin_prompts_config`, `feedback`, `interest_submissions` etc.) über **SQL-Skripte** im `supabase/migrations` Ordner definieren und anwenden können, inklusive initialer **RLS-Policies**.

**Detailed Requirements:**

* **Supabase Projekt erstellen**.  
* **CLI installieren/verlinken**.  
* Erste **Migrationen** für die im Datenmodell (Abschnitt 7\) definierten Tabellen erstellen.  
* **RLS initial für alle Tabellen aktivieren** (z.B. "deny all" als sicherer Standard, dann spezifische `ALLOW` Policies hinzufügen).

**Acceptance Criteria (ACs):**

* **Supabase-Schema** ist via Migrationen erstellt.  
* **RLS** ist für alle Tabellen aktiviert.

  ### **Story T-INFRA.2: Supabase Migrationen automatisieren**

**User Story / Goal:** Als Entwicklungsteam möchte ich den Prozess für **Datenbankmigrationen** mit der **Supabase CLI** und **GitHub Actions** automatisieren, um Schemaänderungen **versionierbar**, **nachvollziehbar** und **konsistent** über verschiedene Umgebungen hinweg (lokal, Staging, Produktion) anwenden zu können.

**Acceptance Criteria (ACs):**

* Neue Migrationsdateien im `supabase/migrations` Ordner werden von der **CI-Pipeline** erkannt.  
* **Migrationen** können automatisch auf einer Test- oder Staging-Datenbank angewendet werden.  
* Der Migrationsstatus ist **nachvollziehbar** (z.B. über Supabase Dashboard oder CLI-Ausgaben).  
* **Rollback-Strategien** für fehlgeschlagene Migrationen sind bedacht (manuell oder automatisiert).

  ### **Story 1.6: N8N Webhook-Trigger für Report-Generierung vorbereiten**

**User Story / Goal:** Als Entwickler möchte ich einen **Webhook-Trigger** in der bestehenden **N8N Cloud-Instanz** (Elest.io) einrichten, damit der Node.js Proxy später **Report-Generierungsanfragen** an N8N senden kann.

**Acceptance Criteria (ACs):**

* Ein Webhook-Trigger ist in der **N8N-Instanz** erstellt.  
* Die Webhook-URL ist bekannt und kann im Node.js Proxy als Umgebungsvariable gespeichert werden.

  ### **Story 1.7: LLM API Anbindung für Node.js Proxy vorbereiten**

**User Story / Goal:** Als Entwickler möchte ich eine **sichere Methode** zur Speicherung und zum Zugriff auf den **API-Schlüssel für Google Gemini** im Node.js Backend Proxy implementieren und erste **erfolgreiche Testaufrufe** zur **Gemini API** (Text-Generierung, nicht zwingend Streaming im ersten Schritt) durchführen können, um die Konnektivität sicherzustellen.

**Acceptance Criteria (ACs):**

* **Gemini API-Key** wird sicher aus Umgebungsvariablen geladen.  
* **Testaufruf** an Gemini API vom Proxy ist erfolgreich und gibt eine erwartete Antwort zurück.

  ### **Story 1.8: Basis-Kommunikation App-Frontend \<-\> Node.js Proxy etablieren**

**User Story / Goal:** Als Entwickler möchte ich, dass die React-Hauptanwendung (`app-frontend`), generiert mit **Lovable.dev**, eine grundlegende **WebSocket-Testverbindung** zum **Node.js Backend Proxy** aufbauen und Testnachrichten austauschen kann, um die Netzwerkkommunikation und das grundlegende WebSocket-Setup zu validieren.

**Detailed Requirements:**

* **Lovable.dev-Prompt** zur Generierung einer einfachen Komponente im `app-frontend`, die eine WebSocket-Verbindung zum Proxy aufbaut und Testnachrichten sendet/empfängt.  
* Im Node.js Proxy ein einfacher **WebSocket-Echo-Handler**.

**Acceptance Criteria (ACs):**

* `app-frontend` kann **WebSocket-Verbindung** zum Proxy herstellen.  
* **Testnachrichten** werden erfolgreich gesendet und empfangen.  
* **CORS** (falls relevant für initialen HTTP-Upgrade-Request) korrekt konfiguriert.

  ### **Story 1.9 (Überarbeitet): Rudimentäre Admin-Funktionen mit Supabase Auth einrichten**

**User Story / Goal:** Als Entwickler möchte ich initiale **Admin-Funktionen** für die Landing Page (Content-Verwaltung für Wissens-Nuggets via GitHub/Lovable.dev Sync – primär Bereitstellung der Struktur, die Inhalte kommen via Git) und die Hauptanwendung (Prompt-Management Agent 1\) einrichten. Der Zugriff auf diese Funktionen soll über **Supabase Auth** gesichert sein. Die UI-Komponenten hierfür werden mit **Lovable.dev** erstellt.

**Detailed Requirements (Lovable.dev fokussiert):**

* Einrichtung von **Supabase Auth** (z.B. E-Mail/Passwort für Admins).  
* Im `app-frontend` (via **Lovable.dev Prompts**): Generierung von **geschützten Routen/Seiten** für Admin-Funktionen; Erstellung von **UI-Formularen** für das Management von Agent 1 Prompts (CRUD-Operationen).  
* Im `node-proxy-service`: Erstellung von **HTTP-Endpunkten**, die durch **Supabase Auth (JWT-Validierung)** geschützt sind, um Agent 1 Prompts in der `admin_prompts_config` Tabelle zu lesen/schreiben.  
* Für Landing Page Content: Der "Admin-Bereich" ist hier eher die Organisation des GitHub Repos und der **Lovable.dev "Knowledge Files"**, die den Build-Prozess der Wissensdatenbank steuern.

**Acceptance Criteria (ACs):**

* Admin-Nutzer können sich via **Supabase Auth** anmelden.  
* **Geschützte Admin-Bereiche** sind nur für authentifizierte Admins zugänglich.  
* Prompts für Agent 1 können über die Admin-UI verwaltet und in **Supabase** gespeichert werden.

  ### **Story 1.10 (Überarbeitet): Datenschutzbanner (Cookie Consent) implementieren (via Lovable.dev)**

**User Story / Goal:** Als Nutzer der Landing Page und Hauptanwendung möchte ich über die Verwendung von Cookies und ähnlichen Technologien informiert werden und meine Zustimmung geben oder ablehnen können, damit die Plattform **DSGVO-konform** ist. Die Implementierung des Banners erfolgt durch **Prompts an Lovable.dev**.

**Detailed Requirements:**

* **Lovable.dev-Prompt** zur Generierung einer **Cookie-Consent-Banner-Komponente** (gemäß `UX_GUIDE.md`), die die notwendigen Informationen anzeigt und Nutzereingaben verarbeitet (z.B. Speicherung der Zustimmung im LocalStorage).

**Acceptance Criteria (ACs):**

* **Cookie-Banner** wird angezeigt.  
* **Zustimmung** kann gegeben/abgelehnt werden.  
* Notwendige Cookies werden erst nach Zustimmung gesetzt (falls zutreffend).

  ### **Story T-NFR.3: Coding Standards (Linting, Formatting) in CI durchsetzen**

**User Story / Goal:** Als Entwicklungsteam möchte ich, dass die definierten **Coding Standards** (**ESLint** für Linting, **Prettier** für Formatierung) automatisch als Teil der **CI-Pipeline** (**GitHub Actions**, Lovable.dev Build-Prozess) für alle Pakete überprüft werden, um die **Code-Qualität** und **Konsistenz** im gesamten **Mono-Repo** sicherzustellen.

**Acceptance Criteria (ACs):**

* Die **CI-Pipeline** führt **Linting-** und **Formatierungs-Checks** aus.  
* Code, der den Standards nicht entspricht, führt zu einem **Fehlschlagen des Builds** oder zumindest zu einer Warnung.  
* Entwickler können die Checks auch **lokal ausführen** (z.B. via Git-Hooks).

  ### **Story T-INFRA.3: Mono-Repo Setup und Build-Prozess konfigurieren**

**User Story / Goal:** Als Entwicklungteam möchte ich das **Mono-Repo-Tooling** (**pnpm workspaces**) vollständig konfigurieren, inklusive der **Build-Prozesse** für die einzelnen Pakete (`landing-page`, `app-frontend`, `node-proxy-service`, `shared-types`) und der korrekten Verlinkung des `shared-types` Pakets, um eine **effiziente Entwicklung** und **konsistente Builds** über das gesamte Projekt hinweg sicherzustellen.

**Acceptance Criteria (ACs):**

* Alle Pakete können von der Root-Ebene des Mono-Repos aus **gebaut werden** (z.B. `pnpm build --filter <package-name>`).  
* Das `shared-types` Paket wird korrekt von abhängigen Paketen **importiert** und Änderungen darin werden in den abhängigen Paketen **reflektiert**.  
* **Abhängigkeiten** zwischen den Paketen sind korrekt im jeweiligen `package.json` deklariert und werden vom Workspace-Tooling aufgelöst.

  ### **Story T-DEVEX.1: Lovable.dev "Knowledge Files" für Landing Page und Hauptanwendung erstellen und pflegen**

**User Story / Goal:** Als Entwicklungsteam möchten wir **umfassende "Knowledge Files"** für die Landing Page und die Hauptanwendung erstellen und aktuell halten. Diese Dateien liefern **Lovable.dev** wichtigen Kontext (z.B. **Design-System-Spezifika** aus `UX_GUIDE.md`, wiederkehrende Komponentenmuster, spezifische Projektanforderungen, bevorzugte Bibliotheken), um die **Qualität**, **Konsistenz** und **Relevanz** der KI-generierten Codevorschläge und \-anpassungen zu verbessern.

**Acceptance Criteria (ACs):**

* **"Knowledge Files"** sind im `docs/lovable_knowledge_files/` Ordner des **Mono-Repos** versioniert und aktuell.  
* **Lovable.dev** wird so konfiguriert (falls möglich), dass es diese Dateien bei der Code-Generierung berücksichtigt.  
* Die Qualität der von **Lovable.dev** generierten Artefakte verbessert sich durch den bereitgestellten Kontext.

  ### **Story T-SEO.1: react-helmet-async für dynamische Meta-Tags auf der Landing Page implementieren**

**User Story / Goal:** Als Entwickler möchte ich die Bibliothek **`react-helmet-async`** in die von **Lovable.dev** generierte Landing Page integrieren (ggf. im "Dev Mode"), um **dynamisch pro Seite** (insbesondere für Wissens-Nuggets) **unique Title-Tags**, **Meta-Descriptions**, **OpenGraph-Tags** und andere **SEO-relevante Head-Elemente** zu setzen. Die Inhalte dafür sollen aus dem Markdown-Frontmatter oder dynamisch generiert werden.

**Acceptance Criteria (ACs):**

* Jede Wissens-Nugget-Seite und andere wichtige Landing Page Seiten haben einen **unique** und **relevanten `<title>`** und **`<meta name="description">`**.  
* **OpenGraph-Tags** (`og:title`, `og:description`, `og:image` etc.) sind korrekt für das Teilen in sozialen Medien gesetzt.  
* **`react-helmet-async`** funktioniert korrekt im Kontext des **Prerendering-Dienstes**, sodass die Tags im serverseitig gerenderten HTML vorhanden sind.

  ### **Story T-SEO.2: Sitemap-Generierung und robots.txt für Landing Page einrichten**

**User Story / Goal:** Als Entwickler möchte ich einen Prozess zur **automatischen Generierung** einer **`sitemap.xml`** und einer **`robots.txt`** für die Landing Page während des **Build-Prozesses** implementieren (z.B. via Vite-Plugin, falls Lovable.dev Vite verwendet, oder durch ein Skript, das Lovable.dev ausführen kann), um Suchmaschinen die **Indexierung zu erleichtern** und zu steuern.

**Acceptance Criteria (ACs):**

* Eine **`sitemap.xml`** wird korrekt generiert und enthält URLs zu allen relevanten, indexierbaren Seiten der Landing Page (inkl. aller Sprachversionen der Wissens-Nuggets).  
* Eine **`robots.txt`**\-Datei ist vorhanden und korrekt konfiguriert (z.B. Verweis auf Sitemap, Disallow für nicht-öffentliche Pfade).  
* Beide Dateien werden im **Root-Verzeichnis** der deployten Landing Page bereitgestellt.

## 

# **Epic 2: Fragebogen (Chat-Interface & Prompt-gesteuerte KI-Agenten) (Technisch Angereichert)**

### **Goal**

**Implementierung** des voll funktionsfähigen, **interaktiven**, mehrsprachigen (**DE/EN**) und **benutzerfreundlichen Fragebogens** als einzelnes, durchgehendes **Chat-Interface** im `app-frontend` (**React**, generiert und verwaltet mit **Lovable.dev**). Der '**Agent 1**: Umfassender Gesprächs- und Erfassungs-Agent' (dessen Verhalten durch einen im **Admin-Bereich** der **Hauptanwendung** verwalteten und in **Supabase** gespeicherten **System-Prompt** gesteuert wird) interagiert mit dem Nutzer. Diese Interaktion wird über ein **dediziertes Node.js Backend Proxy (`node-proxy-service`)** abgewickelt, das sicher mit der **Google Gemini API** kommuniziert und dabei **simuliertes Streaming** (Wort-für-Wort-Antworten durch serverseitiges Chunking, wie im **PoC validiert**) verwendet. Das Epic umfasst die Erfassung und Speicherung des vollständigen, rohen **Chatverlaufs** in **Supabase** (durch den **Node.js Proxy**), die '**Save & Continue Later**'-Funktion (**Session**\-basiert via **URL** mit `sessionId`) und die Übergabe der `sessionId` an den **N8N**\-**Workflow** (via **Webhook** vom **Node.js Proxy**), wo in einem ersten Schritt der '**Extraktions-Agent**' die Daten aus **Supabase** liest und in **JSON** umwandelt. Grundlegende **Sicherheitsmaßnahmen** gegen **LLM-Missbrauch** im **Chat** (**Rate Limiting**) werden im **Node.js Proxy** implementiert.

### **Deployability**

Der **Fragebogen** wird als Kernfunktion des `app-frontend` (**React**\-Anwendung via **Lovable.dev**) bereitgestellt. Nutzer können den **Fragebogen** über eine dedizierte Seite oder einen Button starten. Das `app-frontend` kommuniziert über **WebSockets** mit dem separat deployten **`node-proxy-service`**. Nach Abschluss des **Chats** und Speicherung des Verlaufs durch den **Proxy** wird der **N8N**\-**Workflow** asynchron getriggert. Das **Deployment** umfasst die **Frontend**\-Komponenten für das **Chat-Interface** (im `app-frontend` Paket, erstellt mit **Lovable.dev**), das **Node.js Backend Proxy** (als eigenes deploybares Paket auf einer **PaaS-Plattform** wie **Render.com**) und die **Konfigurationsschnittstellen** für den **Prompt** von **Agent 1** im **Admin-Bereich** (**Frontend** im `app-frontend`, **Backend**\-Logik im **Proxy**, Daten in **Supabase**). Die '**Save & Continue Later**'-Funktion basiert auf einer in der **URL** übergebenen `sessionId`.

### **Epic-Specific Technical Context (Technisch Angereichert)**

### **Frontend-Entwicklung (packages/app-frontend \- React/Lovable.dev)**

* **Lovable.dev-Prompts** zur Generierung des **einzelnen, durchgehenden Chat-Interface-Fensters** (Komponente `ChatWindow.tsx` oder ähnlich, mit Nachrichtenliste, Eingabefeld, Sende-Button). **Prompts** sollten das Design (gemäß `UX_GUIDE.md`), die Responsivität und die grundlegende Struktur spezifizieren.  
* **Implementierung** (ggf. im **Lovable.dev** "Dev Mode" basierend auf dem PoC-Hook `useChatStream.tsx`) der Logik für Aufbau und Management der **WebSocket-Verbindung** zum `/chat` Endpunkt des `node-proxy-service`. Dies beinhaltet robuste Verbindungs-Fallbacks und Fehlerbehandlung.  
* Senden von `USER_MESSAGE` und Empfangen/Verarbeiten von `AGENT_MESSAGE_CHUNK` (für **Wort-für-Wort-Animation**, Logik wie im **PoC** `ChatMessage.tsx`), `AGENT_TYPING`, `AGENT_FINAL_SUMMARY`, `SESSION_STARTED`, `ERROR_MESSAGE` etc. (gemäß API-Referenz).  
* **Lovable.dev-Prompts** für die **UI**\-Elemente gemäß PRD: Fortschrittsanzeige/Roadmap, **Agenten-Avatar/Name**, dynamisches Texteingabefeld (automatische Höhenanpassung), **Sprachauswahl** (**DE/EN**), Button für "**Speichern & später fortfahren**".  
* **Implementierung** der '**Save & Continue Later**'-Funktion:  
  * `app-frontend` generiert/liest `sessionId` aus URL-Parameter.  
  * Anzeige des **Session**\-Links (`app.ai-strategy-navigator.com/chat/{sessionId}`).  
  * Bei Laden mit `sessionId`, diese an `INIT_CHAT` **WebSocket-Event** senden.  
* **State Management** (z.B. **React Context** oder Zustand/Jotai, via **Lovable.dev** oder "Dev Mode") für **Chat-Nachrichten**, Verbindungsstatus, `isTyping`\-Status.  
* **Implementierung** der **Frontend**\-Seite für den `/admin`\-Bereich (via **Lovable.dev Prompts**) zur Verwaltung des **Agent**\-1-**Prompts** (CRUD-UI, die API-Aufrufe an geschützte Endpunkte des **Node.js Proxy** macht).

  ### **Backend-Entwicklung (`packages/node-proxy-service` \- Node.js)**

* **Implementierung** eines **WebSocket-Servers** (mit `ws`\-Bibliothek) auf dem `/chat` Endpunkt.  
* Management von Client-Verbindungen und **Sessions** (identifiziert durch `sessionId`).  
* Bei `INIT_CHAT`:  
  * Wenn `sessionId` vorhanden: Lade **Chatverlauf** für **Agent 1** aus `raw_chat_history` (**Supabase**).  
  * Wenn keine `sessionId`: Generiere neue, speichere neue **Session** in `sessions` (**Supabase**).  
  * Sende `SESSION_STARTED` mit `sessionId` und ggf. `history` an Client.  
* Bei `USER_MESSAGE`:  
  * Speichere Nutzernachricht in `raw_chat_history`.  
  * Lade aktuellen **System-Prompt** für **Agent 1** (passend zur `language` aus Client-Message) aus `admin_prompts_config` (**Supabase**).  
  * Formuliere Anfrage an **Google Gemini API** (inkl. **Chat-Historie**, **System-Prompt**).  
  * **Simuliertes Streaming:** Empfange vollständige Antwort von **Gemini**, zerlege sie in Chunks und sende diese sequentiell im OpenAI-kompatiblen Format (`data: {...}\n\n` und `data: [DONE]\n\n`) an den Client, wie im **PoC** demonstriert.  
  * Speichere vollständige **Agenten-Antwort** in `raw_chat_history` nach Abschluss des Streamings.  
* **Implementierung** der Logik für die **finale Zusammenfassung** durch **Agent 1**.  
* Nach Bestätigung der **Zusammenfassung** (oder explizitem **Chat**\-Ende):  
  * Aktualisiere **Session**\-Status in `sessions` (z.B. zu `raw_chat_completed`).  
  * Sende **Webhook** an **N8N** (`N8N_WEBHOOK_URL_REPORT_GENERATION`) mit `sessionId` und `language`.  
* **Implementierung** von **Rate Limiting** (siehe Story **T-SEC.1**).  
* **Implementierung** von **HTTP-Endpunkten** (gesichert via **Supabase Auth** oder Basis-Auth für **MVP**), die vom **Admin-Frontend** aufgerufen werden, um **Agent**\-1-**Prompts** in der `admin_prompts_config` Tabelle in **Supabase** zu verwalten (CRUD).  
* Sichere Verwendung von `GEMINI_API_KEY` und `SUPABASE_SERVICE_ROLE_KEY`.

  ### **N8N-Workflow (Beginn)**

* Der **N8N**\-**Workflow** wird durch den **Webhook** vom `node-proxy-service` gestartet und empfängt `sessionId` und `language`.  
* Erster Schritt: Abrufen des vollständigen, rohen **Chatverlaufs** aus `raw_chat_history` (**Supabase**) anhand der `sessionId`.  
* Zweiter Schritt: Übergabe dieses Verlaufs an den '**Extraktions-Agenten**' (LLM-Knoten in **N8N**, **Prompt** wird in **N8N** verwaltet, berücksichtigt `language`), der die relevanten Informationen in ein strukturiertes **JSON** umwandelt. Dieses **JSON** wird dann in der `extracted_chat_data` Tabelle in **Supabase** gespeichert, verknüpft mit der `sessionId`.

  ### **Prompt-Management**

* Der **System-Prompt** für '**Agent 1 (Gesprächs- und Erfassungs-Agent)**' wird über die **UI** im `/admin`\-Bereich des `app-frontend` erstellt/bearbeitet (mehrsprachig, z.B. separater **Prompt** für **DE** und **EN**). Die **UI** sendet die Daten an das `node-proxy-service`, welches sie in der `admin_prompts_config` Tabelle in **Supabase** speichert/aktualisiert. Der **Node.js Proxy** lädt den aktiven **Prompt** (passend zur vom Client gesendeten Sprache) aus dieser Tabelle für jede neue Konversation.  
* Der **Prompt** des '**Extraktions-Agenten**' wird direkt im **N8N**\-**Workflow** verwaltet und ist ebenfalls mehrsprachig auszulegen.

# **Story List (Technisch Angereichert für Epic 2 \- Fokus auf Lovable.dev Workflow)**

### **Story 2.1 (Überarbeitet): Interaktion mit 'Agent 1' im durchgehenden Chat-Fenster (Lovable.dev & WebSocket)**

* **User Story / Goal:** Als Nutzer möchte ich den **Fragebogen** in einem von **Lovable.dev** generierten, einzelnen, durchgehenden **Chat-Interface** mit '**Agent 1**' bearbeiten, wobei die Kommunikation über eine robuste **WebSocket-Verbindung** zum `node-proxy-service` erfolgt und **Agenten-Antworten** **Wort für Wort** animiert dargestellt werden.  
* **Detailed Requirements (Lovable.dev fokussiert):**  
  * **Lovable.dev-Prompt** zur Generierung der `ChatWindow`\-Komponente mit Nachrichtenanzeige (unterschiedliche Stile für User/**Agent**), Texteingabefeld und Sende-Button.  
  * **Implementierung** (im "Dev Mode", basierend auf **PoC**) des `useChatStream`\-Hooks für **WebSocket**\-Management (inkl. Fallbacks) und Nachrichtenverarbeitung.  
  * **Implementierung** (im "Dev Mode", basierend auf **PoC**) der `ChatMessage`\-Komponente für die **Wort-für-Wort-Animation**.  
  * **UI**\-Elemente (Fortschritt, **Agenten-Avatar**, Typing-Indikator) werden via **Lovable.dev**\-**Prompts** erstellt.  
* **ACs:** **WebSocket-Verbindung** stabil; Nachrichten werden korrekt ausgetauscht und gestreamt/animiert dargestellt; **UI**\-Elemente sind funktional.

  ### **Story 2.2 (Überarbeitet): Save & Continue Later via URL-Session (Lovable.dev & Proxy)**

* **User Story / Goal:** Als Nutzer möchte ich meinen Fortschritt im mit **Lovable.dev** erstellten **Chat**\-**Fragebogen** jederzeit speichern und über einen **Session**\-Link (`app.ai-strategy-navigator.com/chat/{sessionId}`) später fortsetzen können.  
* **Detailed Requirements (Lovable.dev fokussiert):**  
  * Logik im `app-frontend` (via **Lovable.dev Dev Mode** oder komplexe **Prompts**) zur Handhabung der `sessionId` im **URL** und Initiierung des **Chats** beim **Proxy**.  
  * `node-proxy-service` lädt **Chat-Historie** aus `raw_chat_history` (**Supabase**) bei `INIT_CHAT` mit `sessionId`.  
* **ACs:** Unterbrochener **Chat** kann via **Session**\-Link fortgesetzt werden; **Chatverlauf** wird korrekt geladen.

  ### **Story 2.3 (Überarbeitet): Sprachauswahl im Chat (Lovable.dev UI)**

* **User Story / Goal:** Als Nutzer möchte ich die **Sprache** des **Chat**\-Dialogs (**DE/EN**) direkt im von **Lovable.dev** erstellten **Chat-Interface** auswählen und ändern können.  
* **Detailed Requirements:** **Lovable.dev-Prompt** zur Generierung eines **Sprachauswahl**\-Elements (z.B. Dropdown, Buttons). Zustand für ausgewählte **Sprache** wird im **Frontend** gehalten und mit jeder `USER_MESSAGE` an den **Proxy** gesendet.  
* **ACs:** **Sprache** kann im **UI** geändert werden; **Proxy** erhält Sprachinfo; **Agent 1** antwortet in gewählter **Sprache**.

  ### **Story 2.4: Antworten auf Fragen von Agent 1**

* (Funktionalität durch **Chat-Interface** aus **2.1** gegeben)

  ### **Story 2.5: Feedback zur Eingabequalität**

* (Logik primär im **Prompt** von **Agent 1**)

  ### **Story 2.6: Abbruch des Fragebogens**

* (**Frontend** sendet Signal an **Proxy** oder schließt **WebSocket**)

  ### **Story 2.7 (Überarbeitet): Zusammenfassung durch Agent 1 erhalten und bestätigen (Lovable.dev & Proxy)**

* **User Story / Goal:** Als Nutzer möchte ich am Ende des **Fragebogen**\-Dialogs im von **Lovable.dev** erstellten **Chat-Interface** eine **Zusammenfassung** meiner Eingaben von **Agent 1** erhalten und diese bestätigen können, bevor der **N8N**\-**Workflow** zur Report-Erstellung angestoßen wird.  
* **Detailed Requirements:** `node-proxy-service` instruiert **Agent 1** zur **Zusammenfassung**; **Zusammenfassung** wird an `app-frontend` gesendet und angezeigt. Bestätigungs-Button im **UI** (via **Lovable.dev**) sendet Signal an **Proxy**, der **N8N**\-**Webhook** triggert.  
* **ACs:** **Zusammenfassung** korrekt angezeigt; nach Bestätigung wird **N8N**\-**Workflow** mit `sessionId` und `language` angestoßen.

  ### **Story 2.11: Vollständigen, rohen Chatverlauf mit Agent 1 in Supabase persistieren**

* (**Verantwortung:** `node-proxy-service`) (Unverändert)

  ### **Story 2.12: N8N-Workflow mit 'Extraktions-Agent' zur JSON-Erstellung aus rohem Chatverlauf anstoßen**

* (**Verantwortung:** `node-proxy-service` & **N8N**)  
* **User Story / Goal:** Als `node-proxy-service` möchte ich nach Abschluss des **Chat**\-Dialogs einen **Webhook** an **N8N** senden (`sessionId`, `language`). Als **N8N**\-System möchte ich diesen **Webhook** empfangen, den **Chatverlauf** aus **Supabase** abrufen und mit einem '**Extraktions-Agenten**' (LLM-Knoten) die relevanten Informationen in ein strukturiertes **JSON** umwandeln, das in `extracted_chat_data` (**Supabase**) gespeichert wird.  
* **ACs:** **Webhook** erfolgreich gesendet/empfangen; **Chatverlauf** aus **Supabase** gelesen; Strukturiertes **JSON** wird in `extracted_chat_data` gespeichert.

  ### **Story T-SEC.1: Rate Limiting im Node.js Backend Proxy implementieren**

* (Unverändert)

  ### **Story 2.14 (Überarbeitet): Prompt für 'Agent 1' im /admin-Bereich verwalten (Lovable.dev & Proxy/Supabase)**

* **User Story / Goal:** Als Administrator möchte ich über eine von **Lovable.dev** generierte **UI** im `/admin`\-Bereich den **System-Prompt** für '**Agent 1**' (mehrsprachig) verwalten können. Änderungen werden über geschützte **API**\-Endpunkte des `node-proxy-service` in der `admin_prompts_config`\-Tabelle in **Supabase** gespeichert.  
* **Detailed Requirements:**  
  * **Lovable.dev-Prompts** zur Generierung der **Admin**\-**UI** (Formularfelder für **Prompt**\-Text, **Sprachauswahl**, Aktiv-Status).  
  * `node-proxy-service` **implementiert** gesicherte **HTTP-Endpunkte** (CRUD) für `admin_prompts_config`.  
  * `node-proxy-service` lädt den jeweils aktiven, sprachlich passenden **Prompt** für **Agent 1**.  
* **ACs:** **Admin** kann **Prompts** über **UI** ändern; Änderungen in **Supabase** gespeichert; neue **Chats** nutzen aktualisierten **Prompt**.

## **Dependencies**

Technisch Angereicherter **Epic 1** (Setup aller Basiskomponenten, **Supabase**\-Tabellen, **Admin**\-Auth); **Fragenkatalog** aus PRD; **N8N**\-**Webhook**\-Trigger.

## **Acceptance Criteria**

* Der Nutzer kann den gesamten **Fragebogen** im `app-frontend` (via **Lovable.dev**) in einem einzigen, durchgehenden **Chat-Interface** mit '**Agent 1**' (via `node-proxy-service` und **Gemini API** mit simuliertem **Streaming**) abschließen.  
* Der **Chat**\-Dialog von **Agent 1** folgt dem in **Supabase** (`admin_prompts_config`) gespeicherten und vom `node-proxy-service` geladenen **Prompt** (in der gewählten **Sprache**).  
* Der vollständige, rohe **Chatverlauf** wird vom `node-proxy-service` erfolgreich in `raw_chat_history` (**Supabase**) gespeichert.  
* Die '**Save & Continue Later**'-Funktion funktioniert wie spezifiziert.  
* Nach Abschluss des **Chats** wird der **N8N**\-**Webhook** vom `node-proxy-service` erfolgreich angestoßen.  
* Der '**Extraktions-Agent**' in **N8N** wandelt den **Chatverlauf** in ein strukturiertes **JSON** um und speichert es in `extracted_chat_data` (**Supabase**).  
* Der **Prompt** für '**Agent 1**' kann über den `/admin`\-Bereich verwaltet werden.  
* **Rate Limiting** im `node-proxy-service` ist funktionsfähig.  
* Das **Chat-Interface** unterstützt **Sprachumschaltung** (**DE/EN**).  
* Die **UI/UX-Anforderungen** (**Wort-für-Wort-Animation**, Fallbacks, etc.) sind erfüllt.

# **Epic 3: Report-Generierung & Anzeige (Technisch Angereichert)**

## **Goal**

**Implementierung** der **serverseitigen Logik** (orchestriert durch **N8N** mit dort verwalteten **Prompts** für den '**Analyse- und Report-Agenten**') zur automatischen Generierung des personalisierten **KI-Strategie-Reports**. Dieser Report basiert auf dem Standard-Analysemodell und dem **strukturierten JSON-Input, der vom N8N-Extraktions-Agenten in Epic 2 erstellt und in der `extracted_chat_data`\-Tabelle in Supabase gespeichert wurde**, unter Nutzung der **Google Gemini API** (nicht Live API). Der Output dieses Prozesses ist ein **umfassendes Report-JSON-Objekt, das in der `generated_reports`\-Tabelle in Supabase gespeichert wird.** Zudem umfasst das Epic die Entwicklung der **Frontend**\-Komponenten im `app-frontend` (**React**, generiert und verwaltet mit **Lovable.dev**) zur ansprechenden, verständlichen und mehrsprachigen (**DE/EN**) Anzeige dieses Reports im Webbrowser des Nutzers. Dies beinhaltet die dynamische Darstellung basierend auf dem aus **Supabase** abgerufenen **Report-JSON**, inklusive **visueller Aufbereitung** und intuitiver Navigation, alles erstellt und anpassbar durch **Lovable.dev**\-Workflows.

## **Deployability**

Dieses Epic baut auf **Epic 1** (Setup) und **Epic 2** (**Fragebogen** liefert strukturierten **JSON**\-Input in **Supabase** via **N8N**\-Extraktions-Agent) auf. Nach Abschluss dieses Epics kann ein Nutzer den **Fragebogen** komplett ausfüllen (**Epic 2**), **N8N** den Report generieren und in **Supabase** speichern, und das `app-frontend` (via **Lovable.dev**) den personalisierten Report aus **Supabase** abrufen und im Webbrowser anzeigen. Dies schließt den Kern-Wertschöpfungszyklus des **MVP** für den Nutzer ab. Die Funktionalität ist testbar, sobald ein valider, strukturierter **JSON**\-Input in der `extracted_chat_data`\-Tabelle in **Supabase** vorliegt.

## **Epic-Specific Technical Context (Technisch Angereichert)**

### **N8N Workflow-Entwicklung (Fortsetzung von Epic 2\)**

* Der bestehende **N8N**\-**Workflow** wird erweitert oder ein neuer **Workflow** wird erstellt, der als Input die `sessionId` und `language` erhält (oder auf einen neuen Eintrag/Statusänderung in `extracted_chat_data` reagiert).  
* Der **Workflow** liest das **strukturierte JSON** aus der `extracted_chat_data`\-Tabelle in **Supabase** für die gegebene `sessionId`.  
* **Implementierung** des '**Analyse- und Report-Agenten**' als LLM-Knoten (**Google Gemini API**) in **N8N**. Die **Prompts** für diesen **Agenten** werden direkt in **N8N** verwaltet (mehrsprachig) und sind darauf ausgelegt, die Inhalte gemäß PRD **2.1** und der detaillierten Report-Struktur aus 'Report & Fragen & Agentendefinition.md' zu generieren.  
* Der **N8N**\-**Workflow** kann bei Bedarf weitere Recherche-Knoten oder Logik zur Anreicherung der Report-Daten enthalten.  
* Logik innerhalb des **N8N**\-**Workflows**, um die Antworten des **LLM** zu strukturieren und zu einem finalen, **für die Frontend-Anzeige optimierten Report-JSON-Objekt** zusammenzufügen (inkl. Daten für Visualisierungen, Links etc., alles in der Zielsprache).  
* Speicherung des vollständigen, generierten **Report-JSON-Objekts in der `generated_reports`\-Tabelle in Supabase**, verknüpft mit der `sessionId` und `language_code`. Status in `sessions`\-Tabelle wird aktualisiert (z.B. `report_generated` oder `report_failed`).

  ### **Frontend-Entwicklung (`packages/app-frontend` \- React/Lovable.dev)**

* **Lovable.dev-Prompts** zur Generierung von **React**\-Komponenten für die Report-Anzeige (z.B. `ReportViewer.tsx`, `ReportSection.tsx`, `VisualizationComponents.tsx`). Die **Prompts** beschreiben die gewünschte Struktur und das Aussehen der Report-Elemente.  
* **Implementierung** (ggf. im **Lovable.dev** "Dev Mode") der Logik zum **Abrufen des Report-JSONs aus der `generated_reports`\-Tabelle in Supabase** (via `sessionId` und RLS) über den **Supabase JS Client**.  
* Dynamische Darstellung der Report-Inhalte basierend auf dem **Report-JSON**. **Lovable.dev** kann angewiesen werden, Komponenten zu erstellen, die flexibel auf die Struktur des **JSON** reagieren.  
* **Struktur & Navigation**: **Implementierung** einer klaren Navigationsstruktur (z.B. Sidebar, Breadcrumbs), die dynamisch aus dem **Report-JSON** generiert wird. Dies wird durch **Lovable.dev**\-**Prompts** initiiert und im "Dev Mode" verfeinert.  
* **Visualisierungen**: **Lovable.dev-Prompts** zur Generierung von Komponenten für Infografiken, **2x2-Matrizen**, Headline-Karten, die Daten aus dem **Report-JSON** beziehen. Komplexere Charting-Bibliotheken können im "Dev Mode" integriert werden.  
* **Kontextuelle Links**: **Lovable.dev** erstellt Komponenten, die Links zu **Wissens-Nuggets** (**Epic 4**) rendern, basierend auf Metadaten im **Report-JSON**. Tooltip-Vorschau kann ebenfalls via **Prompt** oder "Dev Mode" hinzugefügt werden.  
* **Call-to-Action**: Anzeige am Report-Ende, generiert und gestylt durch **Lovable.dev**.  
* Mehrsprachigkeit: Die Report-Komponenten zeigen Inhalte basierend auf dem `language_code` des abgerufenen **Report-JSONs** an.

  ### **Backend-Kommunikation (Supabase für Frontend)**

* `app-frontend` (via **Lovable.dev** generierter Code oder "Dev Mode"-Anpassungen) **implementiert** Logik zum **Überwachen des Report-Generierungsstatus** (Polling des `status`\-Feldes in der `sessions`\-Tabelle in **Supabase** oder Nutzung von **Supabase Realtime Subscriptions**).  
* **Lovable.dev-Prompts** zur Erstellung einer Warte-/Informationsseite für den Nutzer während der Report-Generierung.  
* Abruf des finalen **Report-JSONs** bei Status `report_generated`.

# **Story List (Technisch Angereichert für Epic 3 \- Fokus auf Lovable.dev Workflow)**

### **Story 3.1: N8N-Workflow für Report-Generierung erstellen und Input verarbeiten**

* (Unverändert in der Anforderung an **N8N**/**Supabase**)

  ### **Story 3.2: LLM-basierte Generierung der Report-Inhalte in N8N durch 'Analyse- und Report-Agenten'**

* (Unverändert in der Anforderung an **N8N**/**LLM**)

  ### **Story 3.3: Strukturierung und Speicherung des generierten Reports als JSON in Supabase**

* (Unverändert in der Anforderung an **N8N**/**Supabase**)

  ### **Story 3.4 (Überarbeitet): Information und Erwartungsmanagement während Report-Generierung (Lovable.dev UI)**

* **User Story / Goal:** Als Nutzer möchte ich nach Abschluss des **Fragebogens** im von **Lovable.dev** erstellten **UI** klar informiert werden, dass mein Report generiert wird, inklusive einer Statusanzeige oder Warteanimation.  
* **Detailed Requirements:** **Lovable.dev-Prompt** zur Generierung einer **UI**\-Nachricht/Seite. **Implementierung** (Dev Mode) der Statusabfrage aus `sessions` (**Supabase**).  
* **ACs:** Nutzer wird informiert; Status wird angezeigt.

  ### **Story 3.5 (Überarbeitet): Personalisierten KI-Strategie-Report im Webbrowser anzeigen (Lovable.dev Komponenten)**

* **User Story / Goal:** Als Nutzer möchte ich meinen personalisierten Report in einer von **Lovable.dev** generierten, ansprechenden und verständlichen Web-Oberfläche angezeigt bekommen, die dynamisch auf dem aus **Supabase** geladenen **Report-JSON** basiert.  
* **Detailed Requirements:** **Lovable.dev-Prompts** zur Generierung der Haupt-Report-Anzeigekomponente und der untergeordneten Inhalts-Komponenten. Logik zum Abruf des **Report-JSONs** im "Dev Mode".  
* **ACs:** Report wird korrekt und vollständig basierend auf dem **Report-JSON** angezeigt.

  ### **Story 3.6 (Überarbeitet): Innerhalb des Reports navigieren (Lovable.dev generierte Navigation)**

* **User Story / Goal:** Als Nutzer möchte ich über eine von **Lovable.dev** generierte Navigationsstruktur (z.B. Sidebar, Breadcrumbs) einfach zwischen den Abschnitten meines Reports wechseln können.  
* **Detailed Requirements:** **Lovable.dev-Prompt** zur Erstellung der Navigationskomponenten, die dynamisch aus der Struktur des **Report-JSONs** generiert werden.  
* **ACs:** Alle Hauptabschnitte sind erreichbar; Navigation ist intuitiv.

  ### **Story 3.7: Report in gewählter Sprache erhalten**

* (**Report-JSON** ist bereits sprachspezifisch; **Frontend** zeigt es an)

  ### **Story 3.8 (Überarbeitet): Kontextuelle Links zu Wissens-Nuggets im Report nutzen (Lovable.dev Komponenten)**

* **User Story / Goal:** Als Nutzer möchte ich im von **Lovable.dev** dargestellten Report **kontextuelle Links** (mit Tooltip-Vorschau) zu **Wissens-Nuggets** finden.  
* **Detailed Requirements:** **Report-JSON** enthält Link-Metadaten. **Lovable.dev-Prompts** zur Generierung von Komponenten, die diese Links und Tooltips rendern.  
* **ACs:** Links werden angezeigt und funktionieren; Tooltips erscheinen bei Hover.

  ### **Story 3.9 (Überarbeitet): Visuelle Aufbereitung von Report-Inhalten (Lovable.dev Komponenten)**

* **User Story / Goal:** Als Nutzer möchte ich, dass wichtige Daten im Report durch von **Lovable.dev** generierte Komponenten (Infografiken, Matrizen, Karten) **visuell ansprechend dargestellt** werden.  
* **Detailed Requirements:** **Report-JSON** liefert Daten für Visualisierungen. **Lovable.dev-Prompts** zur Erstellung der entsprechenden Visualisierungskomponenten. Komplexere Diagramme ggf. via "Dev Mode" und externer Libs.  
* **ACs:** Visualisierungen werden korrekt mit den Daten aus dem **JSON** angezeigt.

  ### **Story 3.10 (Überarbeitet): Call-to-Action am Report-Ende anzeigen (Lovable.dev Komponente)**

* **User Story / Goal:** Als Nutzer möchte ich am Ende des von **Lovable.dev** dargestellten Reports einen klaren **Call-to-Action**\-Bereich sehen.  
* **Detailed Requirements:** **Lovable.dev-Prompt** zur Generierung des **CTA**\-Bereichs gemäß `UX_GUIDE.md`.  
* **ACs:** **CTA** wird korrekt angezeigt.

  ### **Story 3.11 (Überarbeitet): Gespeicherten Report später wieder aufrufen (Lovable.dev UI)**

* **User Story / Goal:** Als Nutzer möchte ich meinen bereits generierten Report über den **Session**\-Link im von **Lovable.dev** erstellten **UI** später wieder aufrufen können.  
* **Detailed Requirements:** `app-frontend` prüft Status in `sessions`; bei `report_generated` wird Report direkt aus `generated_reports` geladen und von **Lovable.dev**\-Komponenten angezeigt.  
* **ACs:** Bereits generierter Report wird direkt angezeigt.

## **Dependencies**

Technisch Angereicherter **Epic 2** (strukturierter **JSON**\-Output in **Supabase**); **N8N** mit **Gemini** Credentials; Basis-Layout/Routing im `app-frontend` (**Epic 1**, via **Lovable.dev**).

## **Acceptance Criteria**

* Nachdem der **N8N**\-Extraktions-Agent (**Epic 2**) das strukturierte **JSON** in **Supabase** gespeichert hat, generiert der **N8N**\-**Workflow** (**Analyse- und Report-Agent**) erfolgreich einen Report und speichert diesen als **JSON-Objekt** in der `generated_reports`\-Tabelle in **Supabase**.  
* Das `app-frontend` (via **Lovable.dev**) kann den Status der Report-Generierung aus **Supabase** abfragen und den Nutzer entsprechend informieren.  
* Nach erfolgreicher Generierung kann das `app-frontend` (via **Lovable.dev**) das **Report-JSON** aus **Supabase** abrufen und den Report korrekt, vollständig und in der gewählten **Sprache** anzeigen.  
* Alle im **Report-JSON** spezifizierten Inhalte, Navigationshilfen, Visualisierungen und **kontextuellen Links** (zu **Epic 4**) werden wie definiert im von **Lovable.dev** erstellten **Frontend** dargestellt.  
* Der Nutzer kann einen bereits generierten Report über seinen **Session**\-Link erneut aufrufen.

# **Epic 4: Wissensdatenbank ("Wissens-Nuggets" SEO-optimiert auf Landing Page) (Technisch Angereichert)**

## **Goal**

Bereitstellung einer grundlegenden, mehrsprachigen (**DE/EN**), durchsuchbaren und **SEO-optimierten Wissensdatenbank** ("**Wissens-Nuggets**"). Diese soll ca. **15-20 initiale Artikel** umfassen, die grundlegende **KI**\-Begriffe sowie die im Report verwendeten Konzepte verständlich erklären. Die **Wissensdatenbank** ist integraler Bestandteil der **Landing Page (`ai-strategy-navigator.com`)**, die mit **React** (**Lovable.dev** generiert und verwaltet) erstellt wird. Die Inhalte werden als **Markdown-Dateien im Git-Repository** (`packages/landing-page/src/content/wissens-nuggets/`) verwaltet und über **Lovable.dev** synchronisiert. Für optimale **SEO** wird eine **Build-Time Content Generation** (**Markdown** zu HTML/**React**\-Komponenten) und eine **Prerendering-Strategie** für die resultierenden **React SPA**\-Seiten eingesetzt. **Lovable.dev** wird genutzt, um Komponenten für die Anzeige und Filterung der Nuggets zu generieren und **SEO**\-Features (Meta-Tags, strukturierte Daten) via **Prompts** oder Anpassungen im "Dev Mode" zu **implementieren**.

## **Deployability**

Dieses Epic baut auf **Epic 1** (Initiales Setup der **Landing Page** mit **React**/**Lovable.dev** und **Prerendering-Strategie**) auf. Es kann parallel zu **Epic 2** und **3** entwickelt werden. Für die volle Nutzererfahrung von **Epic 3** (**kontextuelle Links** aus dem Report auf `app.ai-strategy-navigator.com` zu den **Wissens-Nuggets** auf `ai-strategy-navigator.com`) ist die Fertigstellung dieses Epics notwendig. Nach Abschluss ist die **Wissensdatenbank** für Nutzer öffentlich auf der Hauptdomain zugänglich, bietet eigenständigen Mehrwert, ist für Suchmaschinen optimiert und die Inhalte sind über den **Lovable.dev**/**GitHub**\-**Workflow** pflegbar.

## **Epic-Specific Technical Context (Technisch Angereichert)**

### **Content-Management-Strategie (Markdown/Git-basiert via Lovable.dev)**

* Inhalte der **Wissens-Nuggets** (Artikel) werden als **Markdown-Dateien (`.md`)** in einer definierten Ordnerstruktur innerhalb des `packages/landing-page`\-Projekts verwaltet (z.B. `packages/landing-page/src/content/wissens-nuggets/{sprache}/{slug}.md`). **Lovable.dev's GitHub**\-Sync-Feature hält diese Dateien synchron.  
* Jede **Markdown**\-Datei enthält **Frontmatter** (**YAML**\-Block am Anfang) zur Definition von Metadaten wie `title`, `slug`, `language`, `category`, `tags`, `description` (für **SEO**), `publishDate`.  
* Änderungen oder Neuerstellungen von `.md`\-Dateien im **Git-Repository** werden von **Lovable.dev** erkannt und triggern automatisch einen **Build- und Deployment-Prozess der Landing Page** (via **Lovable Publishing** oder angebundene Dienste wie **Netlify**/**Vercel**).  
* Der Build-Prozess (wahrscheinlich Vite-basiert im Hintergrund von **Lovable.dev**) muss die **Markdown**\-Dateien parsen (inkl. **Frontmatter**) und sie entweder in HTML umwandeln oder als Datenobjekte für **React**\-Komponenten aufbereiten. Diese aufbereiteten Inhalte werden dann von der **Prerendering-Lösung** erfasst.

  ### **Frontend-Entwicklung (`packages/landing-page` \- React/Lovable.dev)**

* **Lovable.dev-Prompts** werden verwendet, um **UI**\-Komponenten für die Darstellung der **Wissensdatenbank** zu generieren:  
  * Eine **Übersichtsseite** (z.B. `/wissen`): **Lovable.dev** generiert Komponenten, die zur Build-Zeit die geparsten **Markdown**\-Daten (Titel, Teaser, Metadaten) für alle Nuggets lesen und als Liste oder Kacheln darstellen. Filter- und Such-**UI**\-Elemente werden ebenfalls via **Prompt** erstellt.  
  * **Dynamisch generierte Detailseiten** für jeden **Wissens-Nugget** (z.B. `/wissen/{slug}`): **Lovable.dev** generiert Template-Komponenten, die zur Build-Zeit für jeden Artikel mit dem geparsten **Markdown**\-Inhalt (umgewandelt in HTML oder direkt von einer **React**\-**Markdown**\-Komponente gerendert) und den **Frontmatter**\-Metadaten gefüllt werden.  
* **Implementierung** einer **clientseitigen Suchfunktion** (z.B. mit `fuse.js` oder einer ähnlichen leichtgewichtigen Bibliothek). Diese wird im **Lovable.dev** "Dev Mode" in die Übersichtsseiten-Komponente integriert und nutzt die zur Build-Zeit aufbereiteten Artikeldaten.  
* **Markdown-Verarbeitung im Build-Prozess:** Konfiguration von Vite-kompatiblen **Markdown**\-Prozessoren (z.B. `vite-plugin-md`, `remark` / `rehype` mit Plugins wie `remark-html`, `remark-prism` für Code-Highlighting) im **Lovable.dev** "Dev Mode", falls die Standard-**Lovable.dev**\-Funktionen nicht ausreichen. Ziel ist es, **Markdown** zur Build-Zeit in **React**\-Komponenten oder direkt in sicheres HTML umzuwandeln.  
* **SEO-Optimierung (React SPA mit Prerendering):**  
  * Der in **Epic 1** eingerichtete **Prerendering-Dienst** stellt sicher, dass Suchmaschinen-Crawler vollständig gerenderte, statische HTML-Versionen der **Wissens-Nugget**\-Seiten erhalten.  
  * **Dynamische Meta-Tags via `react-helmet-async`**: **Lovable.dev-Prompts** erstellen Komponenten oder passen bestehende an, um `<title>`, `<meta description>`, OpenGraph-Tags etc. basierend auf den **Frontmatter**\-Daten der jeweiligen **Markdown**\-Datei zu setzen (Details siehe **T-SEO.1**).  
  * **Strukturierte Daten (JSON-LD)**: Komponenten generieren dynamisch `Article`, `FAQPage` (falls zutreffend), und `BreadcrumbList` Schemata für jede **Wissens-Nugget**\-Seite. **Lovable.dev-Prompts** können zur Erstellung dieser Logik genutzt werden, oder sie wird im "Dev Mode" **implementiert**.  
  * Generierung von `sitemap.xml` und `robots.txt` zur Build-Zeit (siehe **T-SEO.2**).  
* Sicherstellung der Mehrsprachigkeit (**DE/EN**) durch die Ordnerstruktur der **Markdown**\-Dateien und entsprechende Routing-Logik in der **React**\-Anwendung (ggf. mit `react-router-dom` und einer i18n-Bibliothek wie `i18next`, konfiguriert im **Lovable.dev** "Dev Mode").

  ### **Lovable.dev Workflow**

* **Prompts** für die initiale Generierung der Seitenlayouts (Übersicht, Detail), der Komponenten zur Artikeldarstellung und Basis-**SEO**\-Funktionen.  
* **"Dev Mode"** für die Integration der **Markdown**\-Verarbeitungs-Pipeline, der clientseitigen Suchlogik, der `react-helmet-async`\-Nutzung und der Konfiguration von Vite-Plugins (falls notwendig).  
* **"Knowledge Files"** für **Lovable.dev**, die den Aufbau der **Wissensdatenbank**, die Struktur der **Markdown**\-Dateien (**Frontmatter**\-Felder) und die spezifischen **SEO**\-Anforderungen detailliert beschreiben, um die **KI**\-Generierung zu optimieren.  
* **GitHub-Sync** für die Verwaltung der **Markdown**\-Content-Dateien und des gesamten `landing-page`\-Paket-Codes.

# **Story List (Technisch Angereichert für Epic 4 \- Fokus auf Lovable.dev Workflow)**

### **Story 4.1 (Überarbeitet): Auf SEO-optimierte Wissens-Nuggets zugreifen und lesen (React SPA mit Prerendering via Lovable.dev)**

* **User Story / Goal:** Als Nutzer möchte ich auf der mit **Lovable.dev** erstellten **Landing Page** **Wissens-Nuggets** in einer ansprechenden **UI** lesen können. Diese Seiten sollen dank **Prerendering** schnell laden und von Suchmaschinen optimal indexiert werden.  
* **Detailed Requirements:** **Lovable.dev** generiert die Detailseiten-Komponente, die **Markdown**\-Inhalt und **Frontmatter**\-Daten anzeigt. **Prerendering**\-Dienst liefert statisches HTML an Crawler.  
* **ACs:** **Wissens-Nugget**\-Detailseiten sind über **SEO**\-freundliche **URLs** erreichbar, werden korrekt gerendert (sowohl **SPA** als auch prerendered Version); Inhalte sind indexierbar.

  ### **Story 4.2 (Überarbeitet): Wissens-Nuggets durchsuchen und filtern (Lovable.dev UI & clientseitige Logik)**

* **User Story / Goal:** Als Nutzer möchte ich auf der von **Lovable.dev** generierten **Wissensdatenbank**\-Übersichtsseite die Artikel nach Schlagwörtern durchsuchen und nach Kategorien/Tags filtern können, um schnell relevante Informationen zu finden.  
* **Detailed Requirements:** **Lovable.dev-Prompt** zur Erstellung der **UI**\-Elemente für Suche und Filter. Clientseitige Suchlogik (z.B. `fuse.js`) wird im "Dev Mode" integriert und greift auf die zur Build-Zeit aufbereiteten Artikeldaten zu.  
* **ACs:** Live-Suche liefert relevante Ergebnisse; Filterung aktualisiert Ergebnisliste korrekt.

  ### **Story 4.3 (Überarbeitet): Wissens-Nuggets und deren UI in Deutsch oder Englisch nutzen (Lovable.dev & React i18n)**

* **User Story / Goal:** Als Nutzer möchte ich die von **Lovable.dev** erstellten **Wissens-Nugget**\-Seiten und die zugehörigen **UI**\-Elemente in Deutsch oder Englisch nutzen können, basierend auf sprachspezifischen **Markdown**\-Dateien und einer einfach bedienbaren **Sprachumschaltung**.  
* **Detailed Requirements:** **Lovable.dev-Prompt** zur Generierung eines **Sprachumschalters**. **React**\-Routing und i18n-Logik (im "Dev Mode") laden sprachspezifische Inhalte.  
* **ACs:** Wechsel zwischen Sprachversionen der Artikel und der **UI** ist möglich.

  ### **Story 4.4: Vom Strategie-Report zu Wissens-Nuggets springen**

* (Unverändert in der Anforderung, technische Umsetzung im Report-**Frontend**)

  ### **Story 4.5 (Überarbeitet): Inhalte für Wissens-Nuggets via Markdown/Git und Lovable.dev-Sync verwalten**

* **User Story / Goal:** Als Administrator oder Content Manager möchte ich Inhalte für **Wissens-Nuggets** durch Erstellen oder Bearbeiten von **Markdown**\-Dateien im **Git-Repository** (`packages/landing-page/src/content/wissen/`) verwalten. **Lovable.dev** soll diese Änderungen automatisch synchronisieren und die **Landing Page** auf der Hosting-Plattform aktualisieren.  
* **Detailed Requirements:** Definition einer klaren Ordner- und Dateibenennungskonvention; Dokumentation des **Frontmatter**\-Formats; **CI/CD**\-Prozess (**Lovable Publishing** oder **Netlify**/**Vercel** via **GitHub-Sync**) löst Rebuild aus.  
* **ACs:** Änderungen an **Markdown**\-Dateien im **Git** führen zu aktualisierten Inhalten auf der Live-Seite.

  ### **Story 4.6 (Überarbeitet): Datenmodell/Struktur und Abruflogik für Wissens-Nuggets (Markdown, Build-Time mit Lovable.dev/Vite) implementieren**

* **User Story / Goal:** Als Entwickler, der **Lovable.dev** nutzt, möchte ich die **KI** anweisen und ggf. im "Dev Mode" anpassen, eine Struktur zu **implementieren**, bei der **Markdown**\-Dateien (inkl. **Frontmatter**) zur Build-Zeit (wahrscheinlich mit Vite-Plugins im **Lovable.dev**\-Kontext) gelesen, geparst und als Datenquelle für die von **Lovable.dev** generierten **React**\-Komponenten (Übersichts- und Detailseiten) dienen. Diese Komponenten werden dann vom **Prerendering-Dienst** verarbeitet.  
* **Detailed Requirements:** Konfiguration des Build-Prozesses im **Lovable.dev**\-Umfeld (ggf. Anpassung der `vite.config.ts` im "Dev Mode") zur Einbindung von **Markdown**\-Verarbeitungstools. Sicherstellung, dass die Datenstruktur für die **React**\-Komponenten optimal ist.  
* **ACs:** `getStaticProps`\-ähnliche Funktionalität (Datenladen zur Build-Zeit) ist für die **Wissens-Nugget**\-Seiten **implementiert**; Geparsed **Markdown**\-Inhalte und Metadaten sind in den **React**\-Komponenten verfügbar.

  ### **Story 4.7 (Überarbeitet): State-of-the-Art SEO für Wissens-Nugget-Seiten (React SPA) sicherstellen (Lovable.dev Prompts & Dev Mode)**

* **User Story / Goal:** Als Entwickler, der **Lovable.dev** nutzt, möchte ich die **KI** via **Prompts** anweisen und ggf. im "Dev Mode" Anpassungen vornehmen, um sicherzustellen, dass alle **Wissens-Nugget**\-Seiten (**React SPA**) State-of-the-Art **SEO**\-Praktiken folgen (dynamische Meta-Tags via `react-helmet-async`, `hreflang` für Sprachversionen, **JSON-LD** für strukturierte Daten, Generierung von `sitemap.xml` und `robots.txt`, Optimierung für Core Web Vitals im Rahmen der **Prerendering-Strategie**).  
* **Detailed Requirements:** Siehe technische User Stories **T-SEO.1** und **T-SEO.2**. **Lovable.dev-Prompts** zur Generierung von Komponenten, die **JSON-LD** ausgeben. Überprüfung der prerendered Seiten auf korrekte **SEO**\-Elemente.  
* **ACs:** Alle definierten **SEO**\-Maßnahmen sind umgesetzt und validierbar (z.B. mit **Google Rich Results Test**, Lighthouse).

## **Dependencies**

Technisch Angereicherter **Epic 1** (Setup **Landing Page** mit **React**/**Lovable.dev**, **CI/CD**, **Prerendering-Dienst**); Initiale Inhalte für **Wissens-Nuggets** (**Markdown**\-Dateien).

## **Acceptance Criteria**

* Die **Wissensdatenbank** ist auf der `ai-strategy-navigator.com` **Landing Page** unter einem definierten Pfad (z.B. `/wissen`) zugänglich.  
* Alle initialen **Wissens-Nuggets** sind als **Markdown**\-Dateien im Repository vorhanden und werden als einzelne, **SEO-optimierte** und prerenderte **React**\-Seiten (**DE/EN**) angezeigt.  
* Die Such- und Filterfunktionen auf der Übersichtsseite funktionieren wie spezifiziert.  
* Inhalte können durch Hinzufügen/Bearbeiten von **Markdown**\-Dateien und einen **Git**\-Push (Merge), synchronisiert durch **Lovable.dev**, aktualisiert werden, was zu einem automatischen Rebuild und **Deployment** führt.  
* Alle in Story **4.7** und den technischen **SEO**\-Stories definierten **SEO**\-Maßnahmen sind umgesetzt.  
* Die Verlinkung von der Report-Anzeige (**Epic 3**) zu den **Wissens-Nuggets** ist funktionsfähig.

# **Epic 5: Feedback-Mechanismen & Call-to-Action (CTA) (Technisch Angereichert)**

## **Goal**

**Implementierung** der im PRD definierten, durchgehenden **Feedback-Mechanismen** auf der gesamten Plattform (**kontextbezogenes Feedback-Widget**, explizite Abfrage nach dem **Fragebogen**). Zusätzlich wird der **Call-to-Action (CTA)** am Ende des Reports **implementiert**, um weiterführendes Nutzerinteresse an Beratung oder zukünftigen **Premium**\-Funktionen zu erfassen. Ziel ist es, kontinuierlich qualitative Daten zur **Nutzerzufriedenheit** sowie Indikatoren für potenzielle Leads zu sammeln und diese **direkt von den Frontend-Anwendungen (`packages/landing-page` und `packages/app-frontend`, beide via Lovable.dev erstellt) zentral in Supabase (Tabellen `feedback` und `interest_submissions`) zu speichern**, unter Nutzung des **Supabase JS Clients** und entsprechender **Row Level Security Policies**.

## **Deployability**

Dieses Epic baut auf **Epic 1** (Initiales Setup der **Frontend**\-Anwendungen via **Lovable.dev**) auf. Seine Komponenten werden in die bestehenden Teile der Plattform integriert: das **Feedback-Widget** auf der **Landing Page** und in der **Hauptanwendung**, die explizite Feedback-Abfrage als Teil des **Fragebogens** im `app-frontend` (**Epic 2**), und der **CTA** als Teil der Report-Anzeige im `app-frontend` (**Epic 3**). Alle **UI**\-Komponenten werden mit **Lovable.dev** generiert und angepasst. Nach Abschluss dieses Epics sind die Feedback-Kanäle live und sammeln Daten direkt in **Supabase**, und der **CTA** am Ende des Reports ist funktionsfähig.

## **Epic-Specific Technical Context (Technisch Angereichert)**

### **Frontend-Entwicklung (`packages/landing-page` \- React/Lovable.dev & `packages/app-frontend` \- React/Lovable.dev)**

* **Feedback-Widget:**  
  * **Lovable.dev-Prompt** zur Generierung einer **UI**\-Komponente als **dezenter, sticky Button rechts unten** (gemäß PRD **UI/UX** Vorgaben und `UX_GUIDE.md`). Diese Komponente soll möglichst wiederverwendbar sein oder für beide Anwendungen konsistent generiert werden.  
  * Bei Aktivierung öffnet sich ein einfaches Formular (generiert via **Lovable.dev**) zur Eingabe von freiem Textfeedback.  
  * Das Widget übermittelt den Feedback-Text zusammen mit dem Kontext (aktuelle **URL**/Sektion, `sessionId` falls im `app-frontend` vorhanden) direkt an **Supabase** (Tabelle `feedback`) über den **Supabase JS Client** (`anon` Key). Die Logik hierfür wird im **Lovable.dev** "Dev Mode" **implementiert** oder durch detaillierte **Prompts** generiert.  
* **Explizite Feedback-Abfrage (`packages/app-frontend` \- React/Lovable.dev):**  
  * Die **UI** für die Zufriedenheitsabfrage (**Smiley**\-/**Sterne**\-Rating und optionales Textfeld) wird am Ende des **Fragebogens** (nach der finalen **Zusammenfassung** durch **Agent 1** – siehe **Epic 2**) in das **Chat-Interface** integriert. **Lovable.dev** wird angewiesen, diese **UI**\-Elemente zu erstellen.  
  * Die abgegebenen Daten werden **direkt an Supabase** (Tabelle `feedback`) gesendet (Logik im "Dev Mode" oder via **Prompt**).  
* **Call-to-Action (CTA) Bereich (`packages/app-frontend` \- React/Lovable.dev):**  
  * Gestaltung und **Implementierung** des **CTA**\-Bereichs am Ende der Report-Anzeige (siehe **Epic 3**) durch **Lovable.dev-Prompts**, unter Beachtung der Farbhierarchie aus dem `UX_GUIDE.md`.  
  * Ein Klick auf die **CTA**\-Buttons löst die Speicherung der Interessensbekundung (Art des **CTAs**, `sessionId`, Quellseite) **direkt in Supabase** (Tabelle `interest_submissions`) aus (Logik im "Dev Mode" oder via **Prompt**).

  ### **Backend (Supabase)**

* Nutzung der bereits in **Epic 1** definierten Datenbanktabellen `feedback` und `interest_submissions`.  
* **Implementierung von Row Level Security (RLS) Policies** für diese Tabellen:  
  * `feedback`: Erlaubt `INSERT` für `anon`\-Rolle. Lesen/Ändern/Löschen stark eingeschränkt (nur Admins).  
  * `interest_submissions`: Gleiches Prinzip wie bei `feedback`.

  ### **Datenschutz**

* Sicherstellung, dass bei der Erfassung von Feedback und **CTA**\-Interaktionen keine ungewollten personenbezogenen Daten übermittelt werden und die Verarbeitung **DSGVO**\-konform erfolgt. Die `sessionId` dient zur anonymen Zuordnung im **MVP**.

# **Story List (Technisch Angereichert für Epic 5 \- Fokus auf Lovable.dev Workflow)**

### **Story 5.1 (Überarbeitet): Kontextbezogenes Feedback über Widget geben (Lovable.dev Komponente)**

* **User Story / Goal:** Als Nutzer möchte ich über ein von **Lovable.dev** generiertes, dezentes **Feedback-Widget** auf allen Seiten Feedback geben können, das direkt in **Supabase** gespeichert wird.  
* **Detailed Requirements:** **Lovable.dev-Prompt** zur Erstellung der Widget-Komponente. **Implementierung** der **Supabase**\-Anbindung im "Dev Mode".  
* **ACs:** Widget ist auf relevanten Seiten verfügbar; Feedback wird in **Supabase** gespeichert.

  ### **Story 5.2 (Überarbeitet): Zufriedenheit mit Fragebogen-Prozess mitteilen (Lovable.dev UI im Chat)**

* **User Story / Goal:** Als Nutzer möchte ich am Ende des **Fragebogens** meine Zufriedenheit über eine von **Lovable.dev** integrierte **UI** (Rating, Textfeld) im **Chat** mitteilen können.  
* **Detailed Requirements:** **Lovable.dev-Prompt** zur Integration der Feedback-Elemente in die **Chat**\-Komponente aus **Epic 2**. Daten werden direkt an **Supabase** gesendet.  
* **ACs:** Feedback kann am Ende des **Chats** gegeben werden; Daten in **Supabase** gespeichert.

  ### **Story 5.3 (Überarbeitet): Interesse über Call-to-Action am Report-Ende bekunden (Lovable.dev Komponente)**

* **User Story / Goal:** Als Nutzer möchte ich am Ende meines Reports über von **Lovable.dev** generierte **CTA**\-Buttons mein Interesse signalisieren können, was in **Supabase** erfasst wird.  
* **Detailed Requirements:** **Lovable.dev-Prompt** zur Erstellung des **CTA**\-Bereichs. Klick-Handler im "Dev Mode" **implementieren**, um Daten an **Supabase** zu senden.  
* **ACs:** **CTA** wird angezeigt; Interaktionen werden in **Supabase** gespeichert.

  ### **Story 5.4: Kontextbezogenes Feedback und Fragebogen-Feedback in Supabase speichern (Fokus auf RLS)**

* (Unverändert in der Anforderung an **Supabase**)

  ### **Story 5.5: CTA-Interaktionen (Interessensbekundungen) in Supabase speichern (Fokus auf RLS)**

* (Unverändert in der Anforderung an **Supabase**)

  ### **Story 5.6 (Überarbeitet): Wiederverwendbare Feedback-Widget-Komponente mit Lovable.dev entwickeln**

* **User Story / Goal:** Als Entwickler möchte ich **Lovable.dev** anweisen, eine möglichst wiederverwendbare oder konsistent gestaltete **Feedback-Widget**\-Komponente zu erstellen, die auf der **Landing Page** und in der **Hauptanwendung** eingesetzt werden kann.  
* **Detailed Requirements:** **Lovable.dev-Prompt**, der die Anforderungen an das Widget (sticky, rechts unten, Formular bei Klick) und das Design (gemäß `UX_GUIDE.md`) beschreibt. Nutzung von "Knowledge Files" für **Lovable.dev**, um Konsistenz zu fördern.  
* **ACs:** Widget funktioniert konsistent; Komponente ist via **Lovable.dev** generiert/anpassbar.

  ### **Story 5.7: Datenbankstrukturen und API-Endpunkte für Feedback/CTA anlegen**

* (Anforderung primär durch **Epic 1** und **RLS**\-Stories abgedeckt, hier Fokus auf korrekte Nutzung durch **Frontend**).

## **Dependencies**

Technisch Angereicherter **Epic 1** (Setup Frontends via **Lovable.dev**, **Supabase**\-Tabellen); Komponenten aus **Epic 2** (**Fragebogen**\-Ende) und **Epic 3** (Report-Anzeige); `UX_GUIDE.md`.

## **Acceptance Criteria**

* Das **kontextbezogene Feedback-Widget** (via **Lovable.dev**) ist auf der **Landing Page** und in der **Hauptanwendung** funktionsfähig und speichert Daten korrekt in **Supabase**.  
* Die explizite Feedback-Abfrage am Ende des **Fragebogens** (via **Lovable.dev**) ist funktionsfähig und speichert Daten korrekt in **Supabase**.  
* Der **Call-to-Action** am Ende des Reports (via **Lovable.dev**) ist funktionsfähig und speichert Interessensbekundungen korrekt in **Supabase**.  
* Die Daten in den **Supabase**\-Tabellen `feedback` und `interest_submissions` sind durch **RLS**\-Policies geschützt.  
* Die **Implementierung** ist **DSGVO**\-konform.

# 

# **Epic 6: Modellauswahl-Information (Premium "Coming Soon") (Technisch Angereichert)**

## **Goal:**

Implementierung der Benutzeroberfläche im **app-frontend** (**React**, generiert und verwaltet mit **Lovable.dev**), die den Nutzern vor Beginn des Fragebogens (**Epic 2**) die Wahl bzw. die Information über das kostenlose **Standard-Analysemodell** und ein zukünftiges, kostenpflichtiges **Premium-Analysemodell** transparent erklärt. Das **Premium-Modell** wird im **MVP** als "**Coming Soon**" dargestellt und ist nicht auswählbar/kaufbar. Ziel ist es, das Interesse an einer **Premium-Option** frühzeitig zu validieren (durch Erfassung von **Klicks** auf "**Bei Verfügbarkeit benachrichtigen**" und Speicherung in **Supabase**), Nutzer über den geplanten Mehrwert zu informieren und die Grundlage für spätere **Upselling-Pfade** zu legen. Die Architektur berücksichtigt die spätere Einführung unterschiedlicher **N8N**\-Workflows (**Standard/Premium**) basierend auf einem **Nutzerstatus** in **Supabase**.

## **Deployability:**

Dieses **Epic** baut auf **Technisch Angereichertem Epic 1** (Initiales Setup des **app-frontend** via **Lovable.dev**) auf. Die resultierende Funktionalität (Informationsseite/-modal) wird dem Nutzer im **app-frontend** direkt vor dem Start des Fragebogens (**Epic 2**) angezeigt. Alle **UI-Komponenten** werden mit **Lovable.dev** erstellt. Nach Abschluss dieses **Epics** ist die Informationsseite/-modal **live**, die Inhalte sind **mehrsprachig** (**DE/EN**) verfügbar, und Interaktionen mit dem "**Bei Verfügbarkeit benachrichtigen**"-**CTA** werden **direkt vom Frontend in der `interest_submissions`\-Tabelle in Supabase erfasst.**

## **Epic-Specific Technical Context (Technisch Angereichert):**

* **Frontend-Entwicklung (`packages/app-frontend` \- React/Lovable.dev):**  
  * **Lovable.dev-Prompts** zur Generierung der **UI-Komponente** (eine vorgeschaltete Seite oder ein Modal-Dialog), die die beiden **Analysemodelle** (**Standard** vs. **Premium** "**Coming Soon**") beschreibt. Prompts sollten die Struktur, Inhalte und das Design (gemäß `UX_GUIDE.md`) spezifizieren.  
  * **Lovable.dev-Prompts** zur Erstellung einer **Vergleichstabelle** mit Icons und Bullet-Points zur Darstellung der Modellunterschiede.  
  * Visuelle Hervorhebung des **Premium-Modells** als "**Coming Soon**" (ausgegraut, **Tooltip**), umgesetzt via **Lovable.dev**.  
  * Inhalte (Beispiele, Szenarien) für Modellunterschiede werden initial im **Code**/**JSON-Struktur** im **app-frontend** gehalten (durch **Lovable.dev** eingefügt oder im "**Dev Mode**" gepflegt).  
  * **Lovable.dev-Prompt** für einen **Call-to-Action**\-Button (z.B. "**Mehr über Premium erfahren**"), der ein Modal mit weiteren Details öffnet.  
  * Innerhalb dieses Detail-Modals (ebenfalls via **Lovable.dev** generiert): Ein Button "**Bei Verfügbarkeit benachrichtigen**".  
  * Die Logik zum Speichern der Interessensbekundung (`interestType: "premium_model_notification"`) **direkt in `interest_submissions` (Supabase)** via **Supabase JS Client** wird im **Lovable.dev** "**Dev Mode**" implementiert oder durch einen sehr spezifischen **Prompt** generiert. Verknüpfung mit **`sessionId`** (falls vorhanden).  
  * Sicherstellung, dass der Nutzer nach Kenntnisnahme mit dem **Standard-Modell** in den Fragebogen (**Epic 2**) geleitet wird (**Routing-Logik** via **Lovable.dev** oder "**Dev Mode**").  
* **Backend (Supabase):**  
  * Nutzung der bestehenden Tabelle **`interest_submissions`**. **RLS-Policies** sicherstellen (siehe **Epic 5**).  
  * Vorbereitung für **Premium**: Tabelle **`sessions`** hat bereits Feld **`report_type`** (Default 'standard'). Dieses Feld wird im **MVP** noch nicht geändert.  
* **Content Management (MVP):**  
  * Texte und Beispiele für die Modellunterschiede werden für den **MVP** direkt im **Code** der von **Lovable.dev** generierten **React-Komponenten** oder als ausgelagerte **JSON-Struktur** im **app-frontend**\-Paket verwaltet.  
* **Mehrsprachigkeit (DE/EN):**  
  * Alle **UI-Texte** und Inhalte dieser Informationsseite/-modal müssen in **Deutsch** und **Englisch** verfügbar sein. **Lovable.dev** kann angewiesen werden, Platzhalter für Texte zu generieren, die dann über ein **i18n-Framework** (im "**Dev Mode**" integriert) übersetzt werden. Ein **Inline-Sprachwechsler** im Header wird ebenfalls via **Lovable.dev** erstellt.

# 

# **Story List (Technisch Angereichert für Epic 6 \- Fokus auf Lovable.dev Workflow):**

* **Story 6.1 (Überarbeitet): Über Analysemodelle und deren Unterschiede informiert werden (Lovable.dev UI)**  
  * **User Story / Goal:** Als Nutzer möchte ich vor dem Fragebogenstart in einer von **Lovable.dev** erstellten **UI** klar über die **Analysemodelle** (**Standard** kostenlos, **Premium** "**Coming Soon**") und deren Unterschiede informiert werden.  
  * **Detailed Requirements:** **Lovable.dev-Prompt** zur Generierung der Informationsseite/-modals mit **Vergleichstabelle**.  
  * **ACs:** Informations-**UI** wird korrekt angezeigt; Unterschiede sind klar ersichtlich.  
* **Story 6.2 (Überarbeitet): Qualitätsunterschiede der Modelle anhand von Beispielen verstehen (Lovable.dev Modal)**  
  * **User Story / Goal:** Als Nutzer möchte ich in einem von **Lovable.dev** generierten Modal konkrete Beispiele sehen, die den Qualitätsunterschied der Modelle verdeutlichen.  
  * **Detailed Requirements:** **Lovable.dev-Prompt** zur Erstellung des Modals. Inhalte (Beispiele) werden als **statischer Content** via **Lovable.dev** eingefügt.  
  * **ACs:** Modal mit Beispielen wird korrekt angezeigt.  
* **Story 6.3 (Überarbeitet): Interesse am zukünftigen Premium-Modell bekunden (Lovable.dev Button & Supabase)**  
  * **User Story / Goal:** Als Nutzer möchte ich mein Interesse am **Premium-Modell** durch Klick auf einen von **Lovable.dev** erstellten Button ("**Bei Verfügbarkeit benachrichtigen**") bekunden, was in **Supabase** erfasst wird.  
  * **Detailed Requirements:** **Lovable.dev-Prompt** für Button. **Klick-Handler** im "**Dev Mode**" implementieren, der **`INSERT`** in **`interest_submissions` (Supabase)** auslöst.  
  * **ACs:** Klick auf Button speichert Interessensbekundung in **Supabase**.  
* **Story 6.4 (Überarbeitet): Modellauswahl-Informationsseite/-modal korrekt anzeigen (DE/EN) (Lovable.dev & i18n)**  
  * **User Story / Goal:** Als System möchte ich, dass die von **Lovable.dev** generierte Modellauswahl-Informationsseite/-modal korrekt in **Deutsch** oder **Englisch** angezeigt wird, inklusive **Inline-Sprachwechsler**.  
  * **Detailed Requirements:** **Lovable.dev-Prompt** für Sprachwechsler. **React-Komponente** unterstützt **DE/EN** (**i18n-Logik** im "**Dev Mode**").  
  * **ACs:** Sprachwechsel funktioniert für alle relevanten Texte.  
* **Story 6.5: Interessensbekundungen für Premium-Modell in Supabase erfassen** (Unverändert in der Anforderung an **Supabase**, Frontend-Logik in 6.3)  
* **Story 6.6 (Überarbeitet): Inhalte zur Erklärung der Modellunterschiede pflegen (Lovable.dev Content)**  
  * **User Story / Goal:** Als Administrator möchte ich die Texte zur Erklärung der Modellunterschiede einfach pflegen können (für **MVP**: direkt im von **Lovable.dev** generierten **Code** oder einer zugehörigen **JSON-Datei** im **app-frontend**\-Paket).  
  * **Detailed Requirements:** Inhalte werden als **statischer Teil** der **Lovable.dev-Komponenten** verwaltet. Änderungen erfordern **Re-Deployment**.  
  * **ACs:** Inhalte sind im **Code**/**JSON** hinterlegt und werden korrekt angezeigt.

## **Dependencies:**

* **Technisch Angereicherter Epic 1** (Setup **app-frontend** via **Lovable.dev**, **Supabase-Tabelle `interest_submissions`**);  
* Globales **i18n-Setup** im **app-frontend** (ggf. via **Lovable.dev** "**Dev Mode**").

## **Acceptance Criteria:**

* Die Modellauswahl-Informationsseite/-modal (via **Lovable.dev**) wird im **app-frontend** korrekt vor dem Start des Fragebogens angezeigt.  
* Das **Premium-Modell** ist klar als "**Coming Soon**" gekennzeichnet und nicht auswählbar.  
* Nutzer können ihr Interesse am **Premium-Modell** bekunden; diese Daten werden korrekt in **Supabase** gespeichert.  
* Alle **UI-Elemente** und Texte sind in **Deutsch** und **Englisch** verfügbar, inklusive Sprachumschaltung.  
* Die Architektur ist für die spätere Einführung unterschiedlicher **N8N**\-Workflows vorbereitet.

# **13.Architektur-Validierungszusammenfassung**

(Dieser Abschnitt ist bereits im korrekten H-Format und bleibt inhaltlich wie in der vorherigen Version, da die Umstrukturierung der Artefakte die Validierungsergebnisse nicht ändert. Die **positiven Aspekte** der **Lovable.dev-Umstellung** und der **PoC-Bestätigungen** sind bereits dort eingeflossen.)

## **1\. Anforderungserfüllung (PRD)**

* **Kategorie**: Anforderungserfüllung (PRD)

* **Prüfpunkt**: Alle **Kernfunktionen des MVP** abgedeckt?

* **Status**: ✅ **PASS**

* **Anmerkungen/Ergebnisse**: Ja, durch die **Umstellung** ist die **Landing Page** nun auch **technologisch zukunftssicher** und die **SEO-Anforderungen** sind **spezifischer adressiert**. Die **Chat-Funktionalität** profitiert von den **PoC-Erkenntnissen**.

* **Kategorie**: Anforderungserfüllung (PRD)

* **Prüfpunkt**: **Nicht-Funktionale Anforderungen (NFRs)** adressiert?

* **Status**: ✅ **PASS** (**mit Fokus auf LP SEO & Chat UX**)

* **Anmerkungen/Ergebnisse**: **Performance LP** durch **Prerendering**; **Skalierbarkeit** durch **CDN-Hosting** der **Lovable.dev Apps**; **Sicherheit** und **Wartbarkeit** durch **vereinheitlichten Frontend-Stack** und **Lovable.dev-Workflows**. **Robuste Chat-Verbindung** durch **PoC-Praktiken**.

## **2\. Technologieauswahl**

* **Kategorie**: Technologieauswahl

* **Prüfpunkt**: **Tech-Stack kohärent** und **für den Zweck geeignet**?

* **Status**: ✅ **PASS**

* **Anmerkungen/Ergebnisse**: Ja, die **einheitliche React-Basis** mit **Lovable.dev** für beide **Frontends** ist sehr **kohärent**. **Prerendering-Dienst** ist notwendig. **Node.js-Proxy** mit **simuliertem Streaming** ist durch **PoC validiert**.

* **Kategorie**: Technologieauswahl

* **Prüfpunkt**: **Nutzerpräferenzen (PRD 6.5)** berücksichtigt & **validiert**?

* **Status**: ✅ **PASS**

* **Anmerkungen/Ergebnisse**: Ja, **Lovable.dev** ist nun zentral. **SEO-PoC-Ergebnisse** für **Lovable.dev** und **Chat-PoC-Ergebnisse** wurden berücksichtigt.

* **Kategorie**: Technologieauswahl

* **Prüfpunkt**: **Versionsstrategie klar**?

* **Status**: ✅ **PASS** (**mit Internet-Abhängigkeit für Recherche**)

* **Anmerkungen/Ergebnisse**: "**Neueste stabile Version bei Implementierung**" bleibt bestehen.

## **3\. Architekturdesign & Prinzipien**

* **Kategorie**: Architekturdesign & Prinzipien

* **Prüfpunkt**: **Modularität** und **Komponententrennung**?

* **Status**: ✅ **PASS**

* **Anmerkungen/Ergebnisse**: Bleibt durch **getrennte Pakete und Services** gewahrt. **Lovable.dev** fördert **komponentenbasiertes Design**. Der **Node.js-Proxy** kapselt die **Chat-Logik**.

* **Kategorie**: Architekturdesign & Prinzipien

* **Prüfpunkt**: **Klare Schnittstellen** definiert?

* **Status**: ✅ **PASS**

* **Anmerkungen/Ergebnisse**: Ja, insbesondere die **WebSocket-Schnittstelle** wurde durch den **PoC** konkretisiert.

* **Kategorie**: Architekturdesign & Prinzipien

* **Prüfpunkt**: **Skalierbarkeit im Design** berücksichtigt?

* **Status**: ✅ **PASS**

* **Anmerkungen/Ergebnisse**: Ja, insbesondere durch die **Cloud-Dienste** und die **CDN-basierte Auslieferung** der **Lovable.dev Apps**. **Node.js-Proxy auf PaaS**.

* **Kategorie**: Architekturdesign & Prinzipien

* **Prüfpunkt**: **Sicherheit "by Design"** berücksichtigt?

* **Status**: ✅ **PASS**

* **Anmerkungen/Ergebnisse**: Bleibt bestehen. **RLS**, **HTTPS**, **Admin-Auth via Supabase**, **Rate Limiting** geplant.

* **Kategorie**: Architekturdesign & Prinzipien

* **Prüfpunkt**: **Wartbarkeit und Erweiterbarkeit** gegeben?

* **Status**: ✅ **PASS**

* **Anmerkungen/Ergebnisse**: Verbessert durch **einheitlichen Frontend-Stack** und Nutzung von **Lovable.dev**, was Änderungen und Erweiterungen im **Frontend** erleichtern kann. Klare Struktur des **Node.js-Proxys**.

* **Kategorie**: Architekturdesign & Prinzipien

* **Prüfpunkt**: **Fehlertoleranz und Resilienz** adressiert?

* **Status**: ✅ **PASS**

* **Anmerkungen/Ergebnisse**: Ja, insbesondere im Bereich der **WebSocket-Kommunikation** durch **Fallback-Mechanismen (PoC)**.

## **4\. Datenmanagement**

* **Kategorie**: Datenmanagement

* **Prüfpunkt**: **Datenmodelle klar** und **passend definiert**?

* **Status**: ✅ **PASS**

* **Anmerkungen/Ergebnisse**: Unverändert.

* **Kategorie**: Datenmanagement

* **Prüfpunkt**: **Datensicherheit** und **DSGVO-Konformität** berücksichtigt?

* **Status**: ✅ **PASS**

* **Anmerkungen/Ergebnisse**: Unverändert.

* **Kategorie**: Datenmanagement

* **Prüfpunkt**: **Datenintegrität** gewährleistet?

* **Status**: ✅ **PASS**

* **Anmerkungen/Ergebnisse**: Unverändert.

## **5\. Deployment & Betrieb**

* **Kategorie**: Deployment & Betrieb

* **Prüfpunkt**: **Deployment-Strategie klar**?

* **Status**: ✅ **PASS** (**mit TBD für LP Hosting**)

* **Anmerkungen/Ergebnisse**: Ja, **Landing Page** (**Lovable Publishing/Netlify/Vercel** mit **Prerendering**), **App-Frontend** (**Lovable Publishing**), **Node.js Proxy** (**PaaS, z.B. Render.com**).

* **Kategorie**: Deployment & Betrieb

* **Prüfpunkt**: **CI/CD-Pipelines** berücksichtigt?

* **Status**: ✅ **PASS**

* **Anmerkungen/Ergebnisse**: Ja, **Lovable.dev integriert** mit **GitHub**; **GitHub Actions** für **Proxy**.

* **Kategorie**: Deployment & Betrieb

* **Prüfpunkt**: **Monitoring & Logging** berücksichtigt?

* **Status**: ✅ **PASS**

* **Anmerkungen/Ergebnisse**: Bleibt bestehen. **Strukturiertes Logging im Proxy** ist wichtig.

## **6\. Entwicklererfahrung (DX)**

* **Kategorie**: Entwicklererfahrung (DX)

* **Prüfpunkt**: **Projektstruktur klar** und **verständlich**?

* **Status**: ✅ **PASS**

* **Anmerkungen/Ergebnisse**: Ja, **Mono-Repo-Struktur**. Klare Trennung der **Lovable.dev-verwalteten Frontend-Pakete** und des **Node.js-Backends**.

* **Kategorie**: Entwicklererfahrung (DX)

* **Prüfpunkt**: **Coding Standards (High-Level)** definiert?

* **Status**: ✅ **PASS**

* **Anmerkungen/Ergebnisse**: Ja, ergänzt um **Lovable.dev spezifische Prompting-Konventionen** und Nutzung von "**Knowledge Files**".

* **Kategorie**: Entwicklererfahrung (DX)

* **Prüfpunkt**: **Teststrategie (High-Level)** vorhanden?

* **Status**: ✅ **PASS**

* **Anmerkungen/Ergebnisse**: Ja, ergänzt um **SEO-Tests** und Validierung des **simulierten Streamings**.

## **7\. Risikobewertung**

* **Kategorie**: Risikobewertung

* **Prüfpunkt**: **Potenzielle Risiken** identifiziert und **adressiert**?

* **Status**: ✅ **PASS**

* **Anmerkungen/Ergebnisse**: Abhängigkeit von **Lovable.dev** als zentrales **Frontend-Tool**. Komplexität des **Prerendering-Setups**. Korrekte Implementierung des **simulierten Streamings** im **Proxy**.

* **Kategorie**: Risikobewertung

* **Prüfpunkt**: **Single Points of Failure (SPOFs)** minimiert?

* **Status**: **PASS** (**mit Anmerkung**)

* **Anmerkungen/Ergebnisse**: **Cloud-Dienste** bleiben **SPOFs**. **Prerendering-Dienst** ist ein weiterer potenzieller **SPOF**.

## **8\. Dokumentation**

* **Kategorie**: Dokumentation

* **Prüfpunkt**: **Architektur ausreichend dokumentiert**?

* **Status**: ✅ **PASS**

* **Anmerkungen/Ergebnisse**: Ja, dieses **Dokument** wurde entsprechend **aktualisiert** und **neu strukturiert**.

* **Kategorie**: Dokumentation

* **Prüfpunkt**: **Epics und technische Stories** klar und **technisch angereichert**?

* **Status**: ✅ **PASS**

* **Anmerkungen/Ergebnisse**: Ja, die **Epics und Stories** wurden **überarbeitet**, um den **Lovable.dev-Workflow**, die neuen **technischen Anforderungen** und die **PoC-Erkenntnisse** widerzuspiegeln.

* Hinweis: In Google Sheets exportieren (dieser Schritt wird hier nicht ausgeführt)

## **Gesamtergebnis der Validierung**

* **Überprüfung der Empfehlungen** aus dem **PRD (Abschnitt 10\)** für den **Architect Agent**: Alle **Empfehlungen** wurden **adressiert** und in die aktuelle **Struktur** und den **Inhalt des TDD** integriert.  
* **Gesamtergebnis der Validierung**: Die **überarbeitete Architektur** ist **solide**, berücksichtigt nun die **strategische Entscheidung** für **Lovable.dev**, integriert die **Erkenntnisse aus den PoCs** und adressiert die **SEO-Anforderungen der Landing Page** sowie die **UX-Anforderungen des Chats** umfassender. Sie ist **bereit**, als **aktualisierte Blaupause** zu dienen.

# **14\. Schlussbemerkung / Nächste Schritte**

Dieses **Technisches Design Dokument (TDD)** in seiner **aktuellen Version** und **Struktur** dient als umfassende **Blaupause** für die **Entwicklung** des "**AI Strategy Navigator" MVP**. Es reflektiert die **technologischen Entscheidungen**, insbesondere den Einsatz von **Lovable.dev** für die **Frontend-Entwicklung**, die Implementierung einer **Prerendering-Strategie** für die **SEO-Optimierung** der **Landing Page** und die Nutzung eines **Node.js-Proxys** mit **simuliertem Streaming** für eine **interaktive Chat-Erfahrung**, basierend auf den **Erkenntnissen aus durchgeführten Proof of Concepts**.

Die Aufteilung des **Dokuments** in einzelne, kopierbare **Markdown-Artefakte** soll die **Lesbarkeit** und **Verwendbarkeit** für die nachfolgenden **(KI-)Agenten** und das **Entwicklungsteam** verbessern.

## **Die nächsten Schritte umfassen:**

* **Überprüfung und Freigabe**: Dieses **TDD** sollte vom **Projektinitiator** und relevanten **Stakeholdern** **überprüft** und **freigegeben** werden.  
* **Detaillierung des Product Backlogs**: Der **Scrum Master Agent** wird basierend auf den hier **technisch angereicherten Epics und User Stories** ein **detailliertes Product Backlog** erstellen.  
* **Implementierungsbeginn**: Das **Entwicklungsteam** (oder spezialisierte **Developer Agents**) beginnt mit der **Implementierung** der einzelnen **Pakete und Funktionen**, wobei für **Frontend-Aufgaben** der **Lovable.dev-Workflow (Prompts, Visual Edits, Dev Mode, Knowledge Files, GitHub Sync)** im Vordergrund steht.  
* **Fortlaufende technische Beratung**: Der **Architect Agent** steht während der **Implementierungsphasen** weiterhin für **technische Beratung**, Klärung von **Architekturfragen** und **Anpassung von Designdokumenten** bei Bedarf zur Verfügung (**Modus 3: Master Architect Advisory**).

Es ist von **entscheidender Bedeutung**, dieses **Dokument** als **lebendiges Artefakt** zu betrachten und es während des gesamten **Projektverlaufs** bei **signifikanten Änderungen** oder **neuen Erkenntnissen** **aktuell zu halten**.

