## **9. Teststrategie (High-Level)**

Eine umfassende Teststrategie ist entscheidend für die Qualität und Stabilität des "AI Strategy Navigator" MVP. Die Strategie umfasst verschiedene Testebenen und -typen:

1.  **Unit-Tests:**
    * **Ziel:** Testen einzelner, isolierter Funktionen, Module oder Komponenten.
    * **Frontend (`landing-page`, `app-frontend` - React/Lovable.dev):**
        * Werkzeuge: Jest, React Testing Library (RTL). Lovable.dev kann bei der Generierung von Test-Stubs für Komponenten unterstützen oder der "Dev Mode" kann genutzt werden, um Tests manuell hinzuzufügen.
        * Fokus: Testen von UI-Komponenten-Rendering, Props-Verarbeitung, Event-Handlern, einfacher Zustandslogik in Hooks.
    * **Backend (`node-proxy-service` - Node.js):**
        * Werkzeuge: Jest, Mocha/Chai oder das eingebaute Node.js `assert` Modul.
        * Fokus: Testen von Service-Funktionen (z.B. Gemini API-Interaktion, Chunking-Logik für simuliertes Streaming), Utility-Funktionen, einfacher Routen-Handler-Logik (ohne echte HTTP-Requests).
    * **Mocking:** Externe Abhängigkeiten (wie Supabase Client, Gemini API Client, N8N Webhook-Aufrufe) müssen in Unit-Tests gemockt werden.

2.  **Integrationstests:**
    * **Ziel:** Testen der Interaktion zwischen mehreren Komponenten oder Modulen.
    * **Frontend:**
        * Testen, wie mehrere React-Komponenten zusammenarbeiten, z.B. ein Formular mit seinen Eingabefeldern und dem Submit-Button.
        * Interaktion mit gemockten API-Services (z.B. simulierte Antworten vom Node.js Proxy oder Supabase).
    * **Backend (`node-proxy-service`):**
        * Testen der Interaktion zwischen Routen-Handlern und Service-Schichten.
        * Testen der WebSocket-Kommunikation mit einem Test-Client.
        * Testen der Interaktion mit einer Test-Instanz von Supabase (oder einer gemockten DB-Schicht). Werkzeug: Supertest für HTTP API-Endpunkte.
    * **N8N-Workflows:** Einzelne Knoten und Teil-Workflows können in N8N direkt getestet werden. Die Interaktion mit Supabase und der Gemini API innerhalb von N8N sollte mit Testdaten validiert werden.

3.  **End-to-End (E2E)-Tests:**
    * **Ziel:** Testen kompletter User Journeys durch die gesamte Anwendung, wie sie ein echter Nutzer erleben würde.
    * **Werkzeuge:** Cypress oder Playwright.
    * **Szenarien:**
        * **Landing Page:** Aufruf der Wissens-Nugget-Seiten, Interaktion mit Such-/Filterfunktionen.
        * **Hauptanwendung:** Vollständiger Fragebogen-Prozess (Start, Chat mit Agent 1, Zusammenfassung), Report-Anzeige, Feedback-Abgabe, CTA-Interaktion.
        * **Admin-Funktionen:** Login, Prompt-Verwaltung.
    * Diese Tests sind aufwendiger, aber essenziell, um das Zusammenspiel aller Systemteile zu validieren.

4.  **API-Tests (für `node-proxy-service`):**
    * **Ziel:** Direkte Tests der HTTP- und WebSocket-Endpunkte des Node.js Proxys.
    * **Werkzeuge:** Postman, Newman (für automatisierte API-Tests in CI/CD), oder spezialisierte WebSocket-Testclients.
    * Fokus: Validierung von Request/Response-Formaten, Authentifizierung/Autorisierung, Fehlercodes, Performance unter Last (Basis-Lasttests).

5.  **LLM-Output-Validierung (Qualitativ & Heuristisch):**
    * **Ziel:** Sicherstellen, dass die von den Gemini-Modellen generierten Texte (Chat-Antworten, Report-Inhalte) qualitativ hochwertig, relevant und im erwarteten Format sind.
    * **Ansatz:**
        * Definition von Testfällen mit Beispieldialogen und erwarteten Report-Strukturen.
        * Manuelle Überprüfung der LLM-Outputs anhand dieser Testfälle.
        * Heuristische Bewertung von Kohärenz, Relevanz, Tonalität und Faktizität (soweit möglich).
        * Für strukturierte LLM-Outputs (z.B. JSON aus Extraktions-Agent): Schema-Validierung.
    * Dies ist weniger ein automatisierter Test als ein kontinuierlicher Qualitätssicherungsprozess, insbesondere bei Änderungen an Prompts.

6.  **SEO-Tests (speziell für `landing-page`):**
    * **Ziel:** Überprüfung der technischen SEO-Implementierung der React SPA Landing Page.
    * **Ansatz:**
        * Validierung der durch `react-helmet-async` gesetzten Meta-Tags (Title, Description, OpenGraph) pro Seite.
        * Überprüfung der generierten `sitemap.xml` und `robots.txt`.
        * Testen der Prerendering-Funktionalität: Abruf von Seiten mit einem Crawler User-Agent (z.B. via `curl`) und Überprüfung, ob vollständiges HTML zurückgegeben wird.
        * Validierung strukturierter Daten (JSON-LD) mit Google's Rich Results Test oder schema.org Validator.
        * Ladezeit-Analysen (Core Web Vitals) mit Tools wie Lighthouse oder PageSpeed Insights.

7.  **CI/CD Integration:**
    * Automatisches Ausführen von Unit- und Integrationstests bei jedem Push/Merge in der CI/CD-Pipeline (GitHub Actions für Node.js Proxy, Lovable.dev Build-Prozess für Frontends).
    * E2E-Tests können seltener (z.B. nächtlich oder vor Releases) in einer Staging-Umgebung ausgeführt werden.
    * Linting und Code-Formatierungs-Checks als Teil der Pipeline.

**Allgemeine Prinzipien:**

* **Test-Pyramide:** Fokus auf eine breite Basis von Unit-Tests, ergänzt durch Integrationstests und eine kleinere Anzahl von E2E-Tests.
* **Automatisierung:** Wo immer möglich, sollten Tests automatisiert und in die CI/CD-Pipeline integriert werden.
* **Testdaten:** Verwendung von realistischen, aber anonymisierten Testdaten.
* **Isolation:** Tests sollten voneinander unabhängig sein.
* **Wartbarkeit:** Tests sollten gut strukturiert, lesbar und wartbar sein.