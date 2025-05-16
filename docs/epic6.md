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

