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
