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
