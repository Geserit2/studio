## **6. API-Referenzdokumentation (Schnittstellen)**

Dieses Artefakt definiert die primären Kommunikationsschnittstellen zwischen den verschiedenen Komponenten des "AI Strategy Navigator" MVP. JSON wird als Standard-Datenformat für HTTP-basierte APIs verwendet.

### **6.1 Frontend (App) \<\-\> Node.js Backend Proxy (für Chat mit Agent 1)**

* **Protokoll:** WebSocket (WSS für Produktion, WS für lokale Entwicklung)
* **Endpunkt auf Node.js Backend Proxy:** `/chat` (oder ein anderer konfigurierbarer Pfad)
* **Initialisierung der Verbindung:**
    * Client sendet eine initiale Nachricht oder einen Event (z.B. `INIT_CHAT`) beim Verbindungsaufbau.
    * Payload (Client \-> Server): `{ sessionId?: string }`
        * `sessionId` (optional): Falls eine bestehende Session fortgesetzt werden soll.
* **Nachrichtenfluss (vereinfacht):**
    * **Client zu Server (C \-> S):**
        * `USER_MESSAGE`: Eine vom Nutzer eingegebene Nachricht.
            * Payload: `{ message: string, sessionId: string, language: "de" | "en" }`
        * `END_CHAT_SESSION_REQUEST` (Optional): Signalisiert den Wunsch, die aktuelle Chat-Session durch den Nutzer zu beenden (z.B. nach Bestätigung der Zusammenfassung).
            * Payload: `{ sessionId: string }`
    * **Server zu Client (S \-\> C):**
        * `SESSION_STARTED`: Bestätigung des Session-Starts und Übermittlung der (ggf. neuen) `sessionId`.
            * Payload: `{ sessionId: string, history?: Array<{ sender: "user" | "agent", content: string, timestamp: string }> }`
        * `AGENT_TYPING`: Signalisiert, dass der Agent eine Antwort generiert.
            * Payload: `{ isTyping: boolean }`
        * `AGENT_MESSAGE_CHUNK`: Ein Teil der Agenten-Antwort (simuliertes Streaming). **Format:** `data: {"choices": [{"delta": {"content": "chunk_text"}}]}\n\n` (OpenAI-kompatibel, wie im PoC).
        * `AGENT_MESSAGE_COMPLETE`: Signalisiert das Ende eines vollständigen Agenten-Nachrichten-Streams.
            * Payload: `data: [DONE]\n\n` (OpenAI-kompatibel, wie im PoC).
        * `AGENT_FINAL_SUMMARY`: Die vom Agenten generierte finale Zusammenfassung des Gesprächs.
            * Payload: `{ summaryText: string, sessionId: string }` (Format kann auch dem Chunk-Streaming folgen)
        * `CHAT_ENDED`: Bestätigung, dass die Session serverseitig beendet wurde.
            * Payload: `{ sessionId: string }`
        * `ERROR_MESSAGE`: Für Fehler während der WebSocket-Kommunikation oder serverseitige Fehler.
            * Payload: `{ error: string, details?: any, code?: string }` (z.B. `GEMINI_API_KEY_MISSING`, `WEBSOCKET_ERROR`)

**Erläuterungen:**

* Die `sessionId` ist entscheidend für die Zuordnung von Nachrichten und die spätere Report-Generierung.
* Das simulierte Streaming vom Node.js Proxy an das Frontend emuliert das Verhalten nativer Streaming-APIs (wie OpenAI), um die Frontend-Implementierung zu vereinfachen und eine "Word-by-Word"-Anzeige zu ermöglichen. Dies basiert auf den Erkenntnissen des "Word-by-Word Chat PoC".
* Fehlerbehandlung und robuste Verbindungs-Fallback-Mechanismen im Frontend (wie im PoC `useChatStream.tsx`) sind essenziell.

### **6.2 Node.js Backend Proxy \<\-\> Supabase (Datenbank)**

* **Protokoll:** SQL über den Supabase JavaScript Client (`@supabase/supabase-js`).
* **Aktionen:**
    * **Lesen:**
        * Abrufen der Konfiguration/System-Prompt für Agent 1 aus der Tabelle `admin_prompts_config`.
        * Abrufen der Chat-Historie für eine bestehende `sessionId` aus `raw_chat_history` (für "Save & Continue Later").
    * **Schreiben:**
        * Anlegen einer neuen Session in der `sessions` Tabelle.
        * Speichern jeder Nutzer- und Agentennachricht in der `raw_chat_history` Tabelle.
        * Aktualisieren des Status einer Session in der `sessions` Tabelle (z.B. `active`, `summary_pending`, `raw_chat_completed`).
        * Speichern/Aktualisieren von Agent-1-Prompts in `admin_prompts_config` (durch Admin-Funktionen).
* **Sicherheit:** Der Proxy verwendet den `SUPABASE_SERVICE_ROLE_KEY` für den Zugriff, was volle Datenbankrechte impliziert. RLS-Policies in Supabase sind hier weniger relevant, da der Proxy als vertrauenswürdiger Server agiert.

### **6.3 Node.js Backend Proxy \-\> N8N**

* **Protokoll:** HTTP POST (als Webhook-Aufruf).
* **Endpunkt auf N8N:** Eine durch N8N bereitgestellte und im Proxy konfigurierte Webhook-URL.
* **Payload (Proxy \-> N8N):**
    ```json
    {
      "sessionId": "eine_eindeutige_session_id",
      "triggerType": "REPORT_GENERATION_REQUESTED",
      "language": "de" // oder "en"
    }
    ```
* **Antwort von N8N (N8N \-> Proxy):** Standardmäßig `200 OK` oder `202 Accepted` bei erfolgreicher Annahme des Webhooks durch N8N. Der Proxy wartet nicht auf die vollständige Report-Generierung.

### **6.4 N8N \<\-\> Supabase (Datenbank)**

* **Protokoll:** SQL über die Supabase-Knoten in N8N oder alternativ über die PostgREST API von Supabase.
* **Aktionen:**
    * **Lesen:**
        * Abrufen des vollständigen, rohen Chatverlaufs aus `raw_chat_history` anhand der übergebenen `sessionId`.
        * Lesen des Nutzerstatus oder anderer relevanter Daten aus der `sessions` Tabelle.
    * **Schreiben:**
        * Speichern der vom Extraktions-Agenten erzeugten strukturierten JSON-Daten in der `extracted_chat_data` Tabelle.
        * Speichern des vom Report-Agenten generierten finalen Report-JSON-Objekts in der `generated_reports` Tabelle.
        * Aktualisieren des Report-Status in der `sessions` Tabelle (z.B. `report_generation_started`, `report_generated`, `report_failed`).

### **6.5 N8N \<\-\> Google Gemini API (für Extraktions- & Report-Agent)**

* **Protokoll:** HTTP POST.
* **Endpunkte & Payloads:** Gemäß der offiziellen Google Gemini API-Dokumentation.
* **Authentifizierung:** Der API-Key (`GEMINI_API_KEY`) wird sicher als Credential in N8N gespeichert und für die Anfragen verwendet.
* **Nutzung:** N8N ruft die Gemini API für Aufgaben wie Datenextraktion aus dem Chatverlauf und die Generierung der einzelnen Report-Abschnitte auf, basierend auf spezifischen Prompts, die in den N8N-Workflows definiert sind.

### **6.6 Frontend (App & Landing Page) \<\-\> Supabase (Direktzugriff für bestimmte Daten)**

* **Protokoll:** HTTP über den Supabase JavaScript Client (`@supabase/supabase-js`) oder direkt über die PostgREST API.
* **Authentifizierung:** Primär der `anon` Key für öffentliche Daten oder anonyme Aktionen. Für gesicherte Bereiche (Admin) wird Supabase Auth (JWTs) verwendet. **Row Level Security (RLS) Policies in Supabase sind für alle Tabellen, auf die direkt vom Frontend zugegriffen wird, absolut entscheidend, um die Datensicherheit zu gewährleisten.**
* **Aktionen (Hauptanwendung - APP\_FE):**
    * **Report-Abruf:** `GET /rest/v1/generated_reports?select=*&sessionId=eq.{sessionId}` (RLS: Nur wenn Session-Status `report_generated` ist und ggf. eine anonyme Zuordnung erlaubt ist oder der Nutzer authentifiziert ist).
    * **Feedback speichern:** `POST /rest/v1/feedback` (Payload: `{ sessionId?: string, contextUrl: string, feedbackText: string