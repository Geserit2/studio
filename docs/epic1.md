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

 
