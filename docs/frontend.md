## **10. Frontend-Architektur (High-Level für React mit Lovable.dev)**

Diese Architektur beschreibt die grundlegenden Prinzipien und Muster für die beiden Frontend-Anwendungen (`landing-page` und `app-frontend`), die beide mit **React** unter Verwendung von **Lovable.dev** als primärem Entwicklungswerkzeug erstellt werden.

1.  **Komponentengenerierung und -anpassung mit Lovable.dev:**
    * **Prompt-basierte Generierung:** Die initiale Erstellung von UI-Komponenten, Layouts und Basis-Logik erfolgt durch präzise textuelle Anweisungen (Prompts) an Lovable.dev. Dies umfasst die Definition von Struktur, Aussehen und Verhalten.
    * **Visuelle Anpassungen ("Visual Edits"):** Kleinere Design-Anpassungen (Farben, Abstände, Typografie) können direkt im visuellen Editor von Lovable.dev vorgenommen werden, ohne Code schreiben zu müssen.
    * **"Dev Mode":** Für komplexe Logik, Integration von Drittanbieter-Bibliotheken (z.B. `react-helmet-async`, `fuse.js`), Performance-Optimierungen oder spezifische Anpassungen, die über Prompts schwer zu erreichen sind, wird der "Dev Mode" von Lovable.dev genutzt. Dieser ermöglicht direkten Zugriff auf den React-Code (TypeScript/JSX) und die Projektstruktur (oft Vite-basiert).
    * **"Knowledge Files":** Um die Konsistenz und Qualität der von Lovable.dev generierten Komponenten zu verbessern, werden "Knowledge Files" (Markdown) gepflegt. Diese enthalten Informationen über das Design-System (Farben, Typografie aus `UX_GUIDE.md`), wiederkehrende UI-Muster, spezifische Projektanforderungen oder bevorzugte Code-Stile und dienen Lovable.dev als persistenter Kontext.
    * **GitHub-Integration:** Der von Lovable.dev generierte und im "Dev Mode" angepasste Code wird kontinuierlich mit dem GitHub Mono-Repo synchronisiert. Dies ermöglicht Versionierung, Kollaboration und die Nutzung von Standard-Git-Workflows.

2.  **State Management:**
    * **Lokaler Komponenten-State:** Für einfache, auf eine Komponente beschränkte Zustände wird `useState` und `useReducer` von React verwendet.
    * **Globaler/Geteilter State:**
        * Für einfache, anwendungsweite Zustände oder themenbezogene Daten, die über wenige Komponenten geteilt werden, wird **React Context API** genutzt.
        * Für komplexere globale Zustände, die Performance-optimiert sein müssen, wird eine leichtgewichtige State-Management-Bibliothek wie **Zustand** oder **Jotai** evaluiert und im "Dev Mode" integriert. Die Auswahl hängt von der spezifischen Komplexität ab, die sich im Laufe der Entwicklung ergibt.
    * **Server-State Management:** Für die Interaktion mit Supabase (Datenabruf, Caching, Synchronisation, Optimistic Updates) wird **TanStack Query (v5, ehemals React Query)** empfohlen. Dies wird im "Dev Mode" in die Service-Schicht integriert.

3.  **Routing:**
    * Es wird **React Router (v6 oder neuer)** als primäre Routing-Bibliothek für beide Single Page Applications (SPAs) verwendet.
    * Die Routenkonfiguration (Definition von Pfaden und zugehörigen Seitenkomponenten) wird initial durch Lovable.dev-Prompts angelegt und kann im "Dev Mode" verfeinert werden (z.B. für geschützte Routen, dynamische Routenparameter).

4.  **Styling:**
    * **Tailwind CSS** ist das primäre CSS-Framework, da es von Lovable.dev gut unterstützt wird und eine schnelle, utility-basierte UI-Entwicklung ermöglicht. Lovable.dev-Prompts werden angewiesen, Tailwind-Klassen für das Styling zu verwenden.
    * Globale Stile, Design-Tokens (Farben, Typografie, Abstände gemäß `UX_GUIDE.md`) und ggf. Basis-Tailwind-Konfigurationen (`tailwind.config.js`) werden im jeweiligen Frontend-Paket verwaltet und können Lovable.dev über "Knowledge Files" als Kontext dienen.

5.  **API-Kommunikation:**
    * **`app-frontend` (Chat mit Agent 1):** Ein dedizierter Hook (z.B. `useChatStream.tsx`, basierend auf PoC-Erkenntnissen) kapselt die Logik für die **WebSocket**-Verbindung (mit `socket.io-client` oder nativem WebSocket) zum `node-proxy-service`. Dieser Hook managt den Verbindungsaufbau (inkl. Fallbacks), das Senden von Nutzernachrichten und das Empfangen/Verarbeiten der gestreamten Agenten-Antworten.
    * **Allgemeine HTTP-Anfragen (an Supabase PostgREST, Node.js Proxy Admin-Endpunkte):** Die Standard `Workspace` API oder eine leichtgewichtige Bibliothek wie `axios` wird verwendet. Diese Aufrufe werden in dedizierten Service-Modulen (z.B. `src/services/apiService.ts`, `src/services/supabaseService.ts`) gekapselt, um die Logik von den UI-Komponenten zu trennen und die Testbarkeit zu verbessern.

6.  **Landing Page SEO-Optimierung (Spezifische Aspekte für die React SPA):**
    * **Prerendering:** Ein externer Dienst (z.B. Prerender.io) wird genutzt, um statische HTML-Versionen der Landing Page Seiten für Suchmaschinen-Crawler bereitzustellen. Die Konfiguration erfolgt auf Hosting-Ebene.
    * **Dynamische Meta-Tags:** `react-helmet-async` wird eingesetzt, um pro Seite (insbesondere für Wissens-Nuggets) unique `<title>`, `<meta description>`, `<meta keywords>`, OpenGraph-Tags und andere relevante Head-Elemente zu setzen. Inhalte hierfür stammen aus Markdown-Frontmatter oder werden dynamisch generiert. Lovable.dev kann angewiesen werden, Komponenten zu erstellen oder anzupassen, die `react-helmet-async` verwenden.
    * **Sitemap & `robots.txt`:** Die Generierung erfolgt zur Build-Zeit, idealerweise automatisiert durch Vite-Plugins (falls Lovable.dev Vite nutzt) oder Skripte. Die `robots.txt` wird manuell oder generiert im `public` Ordner abgelegt. Lovable.dev kann hier beratend oder bei der Skriptgenerierung unterstützen.
    * **Strukturierte Daten (JSON-LD):** Für Wissens-Nuggets (`Article`, `FAQPage`) und ggf. andere wichtige Seiten werden React-Komponenten entwickelt (ggf. via Lovable.dev-Prompts), die das JSON-LD dynamisch basierend auf den Seiteninhalten generieren und in den `<head>` einfügen.
    * **Performance:** Neben Prerendering tragen Code-Splitting (Standard in Vite/modernen React-Setups), optimierte Bilder (Formate, Komprimierung, Lazy Loading) und effizientes State Management zur Verbesserung der Core Web Vitals bei.

7.  **Struktur der Frontend-Pakete (Lovable.dev generiert):**
    * Die von Lovable.dev generierte Ordnerstruktur (typischerweise `src/components`, `src/pages`, `src/assets`, `src/App.tsx`, `vite.config.ts` etc.) wird als Basis verwendet.
    * Spezifische Ordner für `services`, `hooks`, `contexts`, `config`, `layouts`, `styles` werden bei Bedarf im "Dev Mode" hinzugefügt, um eine saubere Organisation zu gewährleisten.
    * Für die Landing Page wird ein `src/content/wissen/` Ordner für Markdown-Dateien angelegt.

8.  **Fehlerbehandlung im Frontend:**
    * React Error Boundaries werden verwendet, um Fehler in Teilen der UI abzufangen und eine Fallback-UI anzuzeigen, anstatt die gesamte Anwendung abstürzen zu lassen.
    * Fehler von API-Aufrufen werden abgefangen und dem Nutzer verständlich kommuniziert (z.B. über Toasts/Notifications).