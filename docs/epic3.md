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
