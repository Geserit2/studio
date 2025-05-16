## **2. Architekturübersicht**

Das folgende Diagramm visualisiert die Hauptkomponenten des "AI Strategy Navigator" und deren Interaktionen, unter Berücksichtigung der Umstellung auf Lovable.dev für beide Frontend-Anwendungen und der Erkenntnisse aus dem Chat-PoC.

```mermaid
graph LR
    subgraph "Nutzer-Interaktion"
        User[/"Nutzer (KMU-Entscheider, Admin)"/]
    end

    subgraph "Frontend-Schicht (Lovable.dev generiert & deployed)"
        LP[("Landing Page (ai-strategy-navigator.com)<br/>React auf CDN/Lovable Publishing<br/>(Lovable.dev generiert)<br/>Prerendering für SEO")]
        APP_FE[("Hauptanwendung (app.ai-strategy-navigator.com)<br/>React auf CDN/Lovable Publishing<br/>(Lovable.dev generiert)")]
    end

    subgraph "Backend-Schicht"
        NODE_PROXY[("Node.js Backend Proxy<br/>(PaaS, z.B. Render, Fly.io)<br/>Simuliertes Streaming für Chat")]
        N8N[("N8N Workflow Automation<br/>(Cloud auf Elest.io)")]
    end

    subgraph "Daten & KI Dienste"
        SUPABASE[("Supabase<br/>(PostgreSQL, Auth, Storage)")]
        GEMINI_LIVE[("Google Gemini API<br/>(für Agent 1 via Proxy)")]
        GEMINI_N8N[("Google Gemini API<br/>(für N8N Agenten)")]
        PRERENDERING_SERVICE[("Prerendering Dienst<br/>(z.B. Prerender.io, extern)")]
    end

    subgraph "Admin-Bereiche (via Lovable.dev Frontend & Supabase Auth)"
        LP_ADMIN_CONTENT{Content Management LP<br/>(Wissens-Nuggets via GitHub/Lovable Sync)}
        APP_ADMIN_CONFIG{Prompt/Konfig. Management App<br/>(Agent 1 Prompts in Supabase)}
    end

    %% Verbindungen Nutzer
    User -->|Besucht, Interagiert| LP
    User -->|Nutzt Fragebogen & Report| APP_FE
    User -->|Verwaltet Inhalte via APP_ADMIN| LP_ADMIN_CONTENT
    User -->|Verwaltet Prompts/Konfig. via APP_ADMIN| APP_ADMIN_CONFIG

    %% Verbindungen Landing Page
    LP -->|SEO-Crawler & Nutzer via Prerendered Cache| PRERENDERING_SERVICE
    PRERENDERING_SERVICE -->|Bedient statische HTML-Versionen| LP
    LP -->|Holt ggf. dyn. Inhalte / Feedback| SUPABASE
    LP_ADMIN_CONTENT -->|Verwaltet Wissens-Nuggets (Markdown in Git via Lovable Sync)| GITHUB[("GitHub Repository<br/>(Mono-Repo für allen Code)")]
    GITHUB -->|Build-Time Content für LP via Lovable.dev| LP

    %% Verbindungen Hauptanwendung Frontend
    APP_FE -->|WebSocket (Chat Agent 1, simuliertes Streaming)| NODE_PROXY
    APP_FE -->|HTTP API (Session, Feedback, Report-Abruf)| SUPABASE
    APP_ADMIN_CONFIG -->|Verwaltet Prompt Agent 1 Config| SUPABASE

    %% Verbindungen Node.js Backend Proxy
    NODE_PROXY -->|Anfrage/Antwort (kein natives Streaming von Gemini)| GEMINI_LIVE
    NODE_PROXY -->|Speichert Chatverlauf, Session;<br/>Liest Prompt Agent 1 Config| SUPABASE
    NODE_PROXY -->|Webhook (startet Report-Generierung mit SessionID)| N8N

    %% Verbindungen N8N
    N8N -->|Liest rohen Chatverlauf (via SessionID);<br/>Schreibt strukt. JSON & finalen Report-JSON| SUPABASE
    N8N -->|API-Aufrufe (Extraktion, Analyse)| GEMINI_N8N

    %% GitHub als Code-Basis und für Lovable.dev
    GITHUB -->|Lovable.dev Sync & Build-Quelle für| LP
    GITHUB -->|Lovable.dev Sync & Build-Quelle für| APP_FE
    GITHUB -->|Deployment-Quelle für (via CI/CD)| NODE_PROXY

    classDef user fill:#f9f,stroke:#333,stroke-width:2px;
    classDef frontend fill:#9cf,stroke:#333,stroke-width:2px;
    classDef backend fill:#f96,stroke:#333,stroke-width:2px;
    classDef services fill:#ccf,stroke:#333,stroke-width:2px;
    classDef admin fill:#lightgrey,stroke:#333,stroke-width:2px;
    classDef cicd fill:#grey,stroke:#333,stroke-width:2px;

    class User user;
    class LP,APP_FE frontend;
    class NODE_PROXY,N8N backend;
    class SUPABASE,GEMINI_LIVE,GEMINI_N8N,PRERENDERING_SERVICE services;
    class LP_ADMIN_CONTENT,APP_ADMIN_CONFIG admin;
    class GITHUB cicd;

Erläuterungen zum Diagramm und zur Architektur:

Nutzer: Interagiert mit der Landing Page und der Hauptanwendung. Admins greifen auf die passwortgeschützten Admin-Funktionen innerhalb der Hauptanwendung zu, um Inhalte der Landing Page (Wissensdatenbank) und Konfigurationen der Hauptanwendung (Agent 1 Prompt) zu verwalten.
Landing Page (LP): Erstellt mit React (via Lovable.dev), gehostet auf einer CDN-Infrastruktur (Lovable Publishing oder alternative Optionen wie Netlify/Vercel). Für SEO wird eine Prerendering-Strategie (z.B. über einen externen Dienst wie Prerender.io) eingesetzt. Die Wissensdatenbank wird Build-Time aus Markdown-Dateien (verwaltet in GitHub und synchronisiert mit Lovable.dev) generiert.
Hauptanwendung Frontend (APP_FE): Ebenfalls mit React (via Lovable.dev) erstellt und auf einer CDN-Infrastruktur gehostet. Hier findet der Chat mit Agent 1 und die Anzeige des Reports statt. Die WebSocket-Kommunikation nutzt das im PoC validierte simulierte Streaming.
Node.js Backend Proxy: Ein dedizierter Server (gehostet auf einer PaaS-Plattform, z.B. Render), der als sicherer Proxy für die Gemini API dient. Er implementiert das simulierte Streaming für Agent 1, indem er vollständige Antworten der Gemini API in Chunks zerlegt und sequentiell (im OpenAI-kompatiblen Format) an das Frontend sendet. Er managt WebSocket-Verbindungen, speichert Chatverläufe in Supabase und triggert N8N.
N8N: Orchestriert den Prozess der Datenextraktion aus dem Chatverlauf und die Generierung des finalen Reports unter Nutzung der Gemini API.
Supabase: Dient als zentrale PostgreSQL-Datenbank für alle persistenten Daten und für die Authentifizierung der Admin-Funktionen.
Google Gemini API: Die LLMs für Chat (via Proxy) und Report-Generierung (via N8N).
Prerendering Dienst: Ein externer Dienst (z.B. Prerender.io) für die SEO-Optimierung der Landing Page.
Admin-Bereiche: Funktionen zur Verwaltung von Inhalten und Konfigurationen, integriert in die Hauptanwendung und gesichert durch Supabase Auth.
GitHub: Zentrales Repository für allen Code, Quelle für CI/CD (Node.js Proxy) und Basis für Lovable.dev-Projekte (Frontends, Markdown-Content). Lovable.dev's GitHub-Integration ermöglicht Zwei-Wege-Synchronisation.