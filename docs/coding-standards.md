**Coding Standards und Konventionen (High-Level)**

```markdown
## **5. Coding Standards und Konventionen (High-Level)**

Um eine hohe Code-Qualität, Konsistenz und Wartbarkeit im gesamten Projekt sicherzustellen, werden folgende Standards und Konventionen angestrebt:

1.  **Sprache und Internationalisierung:**
    * **TypeScript** wird für alle Frontend- (`landing-page`, `app-frontend`) und Backend-Projekte (`node-proxy-service`, `shared-types`) durchgängig verwendet, um von Typsicherheit und besserer Entwicklererfahrung zu profitieren. Lovable.dev generiert standardmäßig TypeScript-Code.
    * **Code-Kommentare und Dokumentationsstrings** (JSDoc/TSDoc) sollten primär auf **Englisch** verfasst werden, um internationale Verständlichkeit zu gewährleisten.
    * **Benutzeroberflächen (UI)** und Inhalte für Endnutzer werden mehrsprachig (**Deutsch/Englisch**) unterstützt. Mechanismen für Internationalisierung (i18n), z.B. mit `i18next` oder vergleichbaren Bibliotheken, sind in den Frontend-Anwendungen vorzusehen.

2.  **Formatierung:**
    * **Prettier** wird als automatischer Code-Formatter eingesetzt. Eine zentrale Prettier-Konfigurationsdatei (`.prettierrc.js` oder `.prettierrc.json`) im Root-Verzeichnis des Mono-Repos definiert die Formatierungsregeln für alle Pakete.
    * Die Formatierung sollte idealerweise automatisch bei jedem Commit (via Git-Hooks) und in der CI-Pipeline überprüft werden.

3.  **Linting:**
    * **ESLint** wird für statische Code-Analyse verwendet, um potenzielle Fehler und Stilprobleme frühzeitig zu erkennen.
    * Eine gemeinsame Basis-ESLint-Konfiguration wird im Root-Verzeichnis etabliert. Projektspezifische Erweiterungen oder Anpassungen (z.B. für React, Node.js) erfolgen in den jeweiligen `package.json` oder `.eslintrc.js` der Pakete.
    * Regeln für TypeScript (`@typescript-eslint/eslint-plugin`) und React (`eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y` für Barrierefreiheit) sind zu integrieren.

4.  **Namenskonventionen:**
    * Variablen und Funktionen: `camelCase` (z.B. `userName`, `calculateTotalAmount`).
    * Klassen, Typen, Interfaces, Enums und React-Komponenten: `PascalCase` (z.B. `UserProfile`, `ChatService`, `StatusEnum`, `PrimaryButton`).
    * Konstanten: `UPPER_SNAKE_CASE` (z.B. `MAX_USERS`, `API_TIMEOUT`).
    * Dateinamen für Komponenten: `PascalCase.tsx` (z.B. `UserProfile.tsx`).
    * Dateinamen für Module/Services: `camelCase.ts` oder `kebab-case.ts` (z.B. `authService.ts` oder `auth-service.ts`).

5.  **Komponentenstruktur (React - Lovable.dev generiert und angepasst):**
    * Primär **funktionale Komponenten mit Hooks**.
    * Lovable.dev wird die initiale Komponentenstruktur generieren. Anpassungen und Erweiterungen im "Dev Mode" von Lovable.dev sollten auf eine klare **Trennung von Logik (Hooks, Services) und Darstellung (JSX)** achten.
    * Komponenten sollten möglichst klein und auf eine spezifische Aufgabe fokussiert sein (Single Responsibility Principle).
    * Props sollten klar typisiert sein.

6.  **API-Design (Node.js Proxy):**
    * Für HTTP-Endpunkte werden **RESTful-Prinzipien** angestrebt (sinnvolle Nutzung von HTTP-Methoden, Statuscodes, Ressourcen-orientierte URLs).
    * Datenformate für Request/Response Bodies: **JSON**.
    * Klare und konsistente Fehlerantworten.
    * Für den Chat wird das im PoC validierte **WebSocket-Protokoll** mit einem spezifischen Nachrichtenformat (simuliertes Streaming im OpenAI-Stil) verwendet.

7.  **Commit-Messages:**
    * Die Verwendung von **Conventional Commits** ([https://www.conventionalcommits.org/](https://www.conventionalcommits.org/)) wird dringend empfohlen, um eine nachvollziehbare und automatisierbare Git-Historie zu erstellen (z.B. für Changelog-Generierung).
    * Beispiel: `feat: add user login via email` oder `fix: correct calculation error in cart total`.

8.  **Error Handling:**
    * Strukturiertes Error Handling in allen Anwendungsteilen.
    * Im Backend (`node-proxy-service`) ist ein klares Logging von Fehlern (z.B. mit Zeitstempel, Kontext, Stacktrace) für Debugging-Zwecke unerlässlich.
    * Im Frontend sollten Nutzer-freundliche Fehlermeldungen angezeigt werden, ohne technische Details preiszugeben.

9.  **Umgebungsvariablen:**
    * Alle Konfigurationen, die sich zwischen Umgebungen (lokal, Staging, Produktion) unterscheiden oder sensitiv sind (API-Keys, Datenbank-Credentials), müssen über Umgebungsvariablen verwaltet werden.
    * Eine `.env.example`-Datei im Root oder in den jeweiligen Paketen dokumentiert die benötigten Variablen.
    * Für Frontend-Anwendungen, die mit Vite (Annahme für Lovable.dev) gebaut werden, beginnen clientseitig zugängliche Umgebungsvariablen mit `VITE_` (z.B. `VITE_SUPABASE_URL`).

10. **Code-Dokumentation:**
    * Komplexe oder geteilte Logik, öffentliche APIs von Modulen/Services und wichtige Komponenten-Props sollten mit JSDoc/TSDoc-Kommentaren dokumentiert werden.
    * Die "Knowledge Files" für Lovable.dev dienen ebenfalls als eine Form der Dokumentation, um der KI Kontext zu geben.

11. **Lovable.dev Prompts und Workflow:**
    * Prompts für Lovable.dev sollten **klar, spezifisch und iterativ** formuliert werden. Es ist oft besser, komplexe Anforderungen in mehrere kleinere Prompts aufzuteilen.
    * Die Ergebnisse von Lovable.dev-Generierungen sollten stets im **"Visual Edit"** oder **"Dev Mode"** überprüft und bei Bedarf verfeinert werden.
    * **"Knowledge Files"** sollten aktiv genutzt und gepflegt werden, um Lovable.dev dauerhaften Kontext über Design-System-Elemente, wiederkehrende Muster oder spezifische Projektanforderungen zu liefern.
    * Die von Lovable.dev generierte Code-Struktur sollte respektiert und bei manuellen Änderungen im "Dev Mode" konsistent weitergeführt werden.

Diese Standards und Konventionen sollten in einem `CONTRIBUTING.md`-Dokument im Root-Verzeichnis des Mono-Repos festgehalten und für alle Teammitglieder zugänglich gemacht werden. Die Durchsetzung einiger dieser Standards kann durch Git-Hooks (z.B. mit Husky und lint-staged) und CI-Pipeline-Schritte automatisiert werden.

