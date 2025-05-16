# **Product Requirement Document: AI Strategy Navigator für KMUs**

Version: 1.0 Datum: 11\. Mai 2025 Erstellt von: Product Manager Agent (in Zusammenarbeit mit dem Projektinitiator)

## **Inhaltsverzeichnis**

* PROBLEM DEFINITION & KONTEXT  
  * 1.1 Problembeschreibung  
  * 1.2 Geschäftsziele & Erfolgsmetriken  
  * 1.3 Nutzerforschung & Einblicke  
* MVP SCOPE DEFINITION  
  * 2.1 Kernfunktionalität  
  * 2.2 Abgrenzung des Scopes  
  * 2.3 MVP Validierungsansatz  
* STRATEGISCHE ROADMAP (NOW / NEXT / LATER)  
  * 3.1 NOW (Fokus: MVP Launch & Validierung)  
  * 3.2 NEXT (Fokus: Wachstum, erste Monetarisierung & Produkterweiterung)  
  * 3.3 LATER (Fokus: Skalierung, Diversifizierung & Marktführerschaft)  
* USER EXPERIENCE (UX) REQUIREMENTS  
  * 4.1 User Journeys & Flows  
  * 4.2 Usability-Anforderungen  
  * 4.3 UI (User Interface) Anforderungen  
* FUNCTIONAL REQUIREMENTS  
  * 5.1 Feature-Vollständigkeit (High-Level Functions)  
  * 5.2 Qualität der Anforderungen  
* NON-FUNCTIONAL REQUIREMENTS (NFRs)  
  * 6.1 Performance und Skalierbarkeit  
  * 6.2 Sicherheit und Compliance  
  * 6.3 Zuverlässigkeit und Verfügbarkeit  
  * 6.4 Wartbarkeit und Erweiterbarkeit (aus Business-Sicht)  
  * 6.5 Initiale Technische Präferenzen/Überlegungen  
* TECHNICAL GUIDANCE (High-Level)  
  * 7.1 Allgemeine Architekturprinzipien  
  * 7.2 Initiale Technische Präferenzen/Überlegungen  
  * 7.3 Integrationspunkte (MVP)  
  * 7.4 Technische Entscheidungskriterien  
* CROSS-FUNCTIONAL REQUIREMENTS (High-Level)  
  * 8.1 Datenanforderungen (High-Level)  
  * 8.2 Integrationsanforderungen (LLM API)  
  * 8.3 Operationelle Anforderungen (Business-Perspektive für MVP)  
* DOKUMENTDETAILS  
  * 9.1 Zweck dieses Dokuments  
  * 9.2 Zielgruppe  
  * 9.3 Version und Datum  
  * 9.4 Glossar  
* PRD & EPIC VALIDATION SUMMARY

## **1\. PROBLEM DEFINITION & KONTEXT**

### **1.1 Problembeschreibung**

**Klare Formulierung des zu lösenden Problems:** Kleine und mittlere Unternehmen (KMUs) erkennen die strategische Bedeutung von Künstlicher Intelligenz (KI), sind jedoch durch die Komplexität des Themas, schnelle technologische Entwicklungen und eine Informationsflut überfordert. Ihnen fehlt Orientierung, spezifisches Anwendungswissen und ein niederschwelliger, vertrauenswürdiger Ansatz, um realistische KI-Potenziale für ihr individuelles Geschäft zu identifizieren und eine initiale KI-Integrationsstrategie zu entwickeln. **Identifikation der Betroffenen:** Primär KMUs (speziell 10-249 Mitarbeiter), insbesondere deren Geschäftsführer und Entscheidungsträger (wie Markus, CEO eines Produktionsbetriebs, und Sandra, Inhaberin einer Dienstleistungsagentur). Sekundär betroffen sind auch IT-Verantwortliche oder Innovationsmanager in diesen Unternehmen, falls vorhanden. **Bedeutung der Problemlösung:** Ohne eine klare Strategie und das Verständnis für konkrete Anwendungsfälle riskieren KMUs, den Anschluss an den Wettbewerb zu verlieren, Effizienzpotenziale ungenutzt zu lassen und Fehlinvestitionen zu tätigen. Die Lösung dieses Problems ermöglicht es KMUs, zukunftsfähig zu bleiben, ihre Wettbewerbsposition zu stärken und nachhaltig zu wachsen. **Quantifizierung der Problemauswirkungen (basierend auf Briefing):**

* KI kann Produktivität um \~66% steigern (Quelle: APB 2.4) – dieses Potenzial bleibt ungenutzt.  
* EU-Defizit \>500k KI-Experten (Quelle: APB 2.4) – unterstreicht den Mangel an internem Know-how in KMUs.  
* Nur 9% der CH KMU nutzen KI systematisch, 1 von 8 KMU in DE (Quelle: APB 2.4) – zeigt die geringe Adoptionsrate trotz erkanntem Bedarf.  
* Viele KMU tätigen ineffektive Ad-hoc-Versuche oder vermeiden das Thema komplett, was zu Wettbewerbsnachteilen führt (Quelle: Übergabe-Prompt). **Abgrenzung zu bestehenden Lösungen:**  
* **Klassische Unternehmensberatungen:** Oft zu teuer, zeitintensiv und nicht immer KMU-spezifisch fokussiert.  
* **Kostenlose Online-Ressourcen (Blogs, Whitepaper):** Meist generisch, erfordern hohe Eigenleistung zur Synthese und bieten keine individuelle Strategie.  
* **Softwareanbieter mit eingebetteten KI-Funktionen:** Bieten funktionsspezifische KI, aber keine übergreifende, initiale Gesamtstrategie.  
* **Bestehende spezifische "AI Strategy Navigators":** Oft noch jung, fokussieren auf Teilaspekte, sind primär Lead-Generierung für weitere Dienstleistungen oder technologisch weniger ausgereift. Der "AI Strategy Navigator" zielt auf eine ganzheitlichere, aber dennoch niederschwellige, automatisierte und personalisierte Erststrategie ab, die als vertrauenswürdiger Lotse dient.

### **1.2 Geschäftsziele & Erfolgsmetriken**

**Spezifische, messbare Geschäftsziele:**

* **Marktdurchdringung & Nutzerakquise:** Erzielung von 500 generierten kostenlosen Reports innerhalb der ersten 6 Monate nach Launch.  
* **Lead-Generierung für Upselling:** Erzielung einer Konversionsrate von 5% von Nutzern kostenloser Reports zu qualifizierten Leads für Premium-Features oder Beratungsleistungen innerhalb der ersten 12 Monate.  
* **Aufbau von Thought Leadership:** Positionierung als anerkannte Informationsquelle für KI-Strategien in KMUs, gemessen durch 25 organische Erwähnungen/Backlinks von relevanten Branchenseiten oder Medien innerhalb der ersten 12 Monate.  
* **Monetarisierung (mittelfristig):** Erzielung eines monatlich wiederkehrenden Umsatzes (MRR) von 3.000 € durch Premium-Tool-Abonnements nach 18 Monaten.  
* **Interesse an Premium-Modell (MVP):** Klickrate auf "Mehr erfahren" / "Benachrichtigen, wenn verfügbar" auf der Modellauswahl-Informationsseite (Ziel: \>15% der Nutzer, die diese Seite sehen), um initiales Interesse am Premium-Angebot zu quantifizieren. **Klare Erfolgsmetriken und KPIs (siehe auch APB Abschnitt 13):**  
* **Nutzerakquise:** Anzahl generierter Reports, Completion-Rate Fragebogen.  
* **Engagement:** Bewertung der Report-Qualität durch Nutzer, Verweildauer.  
* **Lead-Generierung:** Anzahl qualifizierter Leads für Beratung/Premium.  
* **Konversion:** CR Free-Report zu Premium-Abo, CR Free-Report zu Beratung.  
* **Umsatz:** MRR (Premium-Abos), Umsatz (Beratung).  
* **Kundenzufriedenheit:** NPS/CSAT. **Metriken sind an Nutzer- und Geschäftswert gekoppelt:**  
* Die Anzahl generierter Reports (Nutzerwert: Orientierung erhalten) treibt die Lead-Generierung (Geschäftswert: Umsatzpotenzial).  
* Hohe Report-Qualität (Nutzerwert: konkreter Nutzen) führt zu besserer Konversion und höherem NPS (Geschäftswert: Kundenbindung, Reputation). **Baseline-Messungen (initial nicht anwendbar, da neues Produkt):** Werden nach Launch etabliert. **Zeitrahmen für Zielerreichung:** Wie oben bei den Zielen spezifiziert (6, 12, 18 Monate).

### **1.3 Nutzerforschung & Einblicke**

**Definierte Ziel-Personas (aus APB 4.1 & 4.2):**

* **Markus (52, CEO Produktionsbetrieb):** "Der ambitionierte Optimierer". Sucht Wettbewerbsfähigkeit, Effizienz, klaren ROI, hat Angst vor Fehlinvestitionen.  
* **Sandra (38, Inhaberin Marketing-Agentur):** "Die überforderte Möglichmacherin". Sucht Wachstum, Effizienz, innovative Dienstleistungen, ist preissensibel, technikaffin. **Dokumentierte Nutzerbedürfnisse und Schmerzpunkte (aus APB & Übergabe-Prompt):**  
* **Bedürfnisse:** Niederschwelliger Einstieg, Verständlichkeit, konkrete/priorisierte/umsetzbare Anwendungsfälle, neutrale/objektive Einschätzung, Zeitersparnis, Kosteneffizienz, ROI-Klärung, Inspiration für neue Services/Effizienz, strategische Einordnung.  
* **Schmerzpunkte:** Überforderung (Komplexität, Info-Flut), fehlendes Know-how/Zeit/Ressourcen, unklarer ROI, Angst vor Kosten/Fehlinvestitionen, Unsicherheit bei Tool-Auswahl, Druck durch Wettbewerb/Kundenerwartungen, Sorge um Mitarbeiterentwicklung. **Zusammenfassung Nutzerforschung (implizit im APB enthalten):** Die detaillierten Personas und deren Pains/Gains im APB (Abschnitt 4 & 5\) stellen die Zusammenfassung der Nutzerforschung dar. Das Bedürfnis nach einer "Landkarte" oder "Guidance" ist zentral. **Wettbewerbsanalyse (aus APB Abschnitt 6):**  
* **Direkte Wettbewerber:** Wenige, oft auf Teilaspekte fokussiert oder generisch (z.B. Semblian, Roadmap.sh AI, F/MS & Galaxy.ai, staatliche Tools).  
* **Indirekte Wettbewerber:** Klassische Berater (teuer), IT-Dienstleister (technikfokussiert), Softwareanbieter (funktionsspezifisch).  
* **Substitute:** Kostenlose Ressourcen (generisch), Online-Kurse (keine Strategie), Verbände (begrenzte Tiefe), interne Champions (isoliert). **Positionierungschance:** Nische für ganzheitliche, erschwingliche, KI-gesteuerte, personalisierte Erststrategie für KMU ist unterversorgt. **Marktkontext (aus APB Abschnitt 2):**  
* Stark wachsender KI-Markt für KMU (CAGR \>30% in verwandten Segmenten).  
* KMUs sind Hauptzielgruppe, besonders 50-249 MA mit mittlerer digitaler Reife.  
* Haupttreiber: KI-Bewusstsein, Effizienzbedarf, Wettbewerbsdruck, Technologiefortschritt, Förderprogramme.  
* Haupthindernisse: Kosten, Fachkräftemangel, Skepsis, Datenqualität/-sicherheit, Komplexität, Regulatorik. Der Navigator adressiert viele dieser Hindernisse.

## **2\. MVP SCOPE DEFINITION**

### **2.1 Kernfunktionalität**

**Essenzielle Features klar von Nice-to-Haves unterschieden:** **Essenzielle Features (MVP):**

* **Modellauswahl-Informations-Interface:** Eine vorgeschaltete Benutzeroberfläche, die dem Nutzer die Wahl zwischen einem kostenlosen Standard-Analysemodell (im MVP immer aktiv) und einem zukünftigen, kostenpflichtigen Premium-Analysemodell ("Coming Soon", im MVP nicht wählbar/kaufbar) transparent erklärt. Inklusive Beispielen, die den Qualitätsunterschied verdeutlichen, und der Möglichkeit, Interesse am Premium-Modell zu bekunden. Die Report-Generierung im MVP erfolgt immer über das Standard-Modell.  
* **Interaktiver, geführter Fragebogen (einzelnes, durchgehendes Chat-Interface):**  
  * Der Nutzer interagiert in einem **einzigen, durchgehenden Chat-Fenster** mit **'Agent 1: Umfassender Gesprächs- und Erfassungs-Agent'** (dessen Verhalten durch einen im **/admin**\-Bereich der Hauptanwendung verwalteten Prompt gesteuert wird und der direkt mit dem LLM via App-Backend kommuniziert), der den Nutzer durch alle Fragen des spezifizierten Fragenkatalogs führt.  
  * Erfasst unternehmensspezifische Daten (Ziele, Schmerzpunkte, Branche, Unternehmensgröße, optional digitaler Reifegrad) durch gezielte Fragen.  
  * Bietet integrierte Hilfestellungen und Erklärungen zu jeder Frage, um Unklarheiten zu beseitigen und den Nutzer zur bestmöglichen Antwort zu führen.  
  * **"Save & Continue Later"-Funktion:** Ermöglicht dem Nutzer, die Bearbeitung des Fragebogens jederzeit zu unterbrechen und später über einen bereitgestellten, anonymen Session-Link fortzusetzen. Die bisherigen Eingaben bleiben für die Dauer der Session (z.B. 48 Stunden) erhalten.  
  * Optional: Möglichkeit zur Spracheingabe (Voice-to-Text) für die Beantwortung der Fragen (technische Machbarkeit durch Architect Agent zu prüfen).  
  * Am Ende des Dialogs fasst Agent 1 die gegebenen Antworten zur Verifizierung durch den Nutzer zusammen ("Habe ich Sie richtig verstanden, dass...?"). Der **Output dieses Agenten ist der vollständige, rohe Chatverlauf**.  
  * Anonyme Nutzung möglich und als Standard vorgesehen.  
* **Automatisierte Generierung eines personalisierten Basis-KI-Strategie-Reports (Standard-Modell):** Nach Abschluss des Chats mit Agent 1 wird der **rohe Chatverlauf** an einen **N8N-Workflow** übergeben. In N8N führt zuerst ein **'Extraktions-Agent'** (LLM-Knoten, dessen Prompt direkt in N8N verwaltet wird) eine Analyse des rohen Chatverlaufs durch und wandelt die Nutzerantworten in ein **strukturiertes JSON-Objekt** um. Anschließend können in N8N weitere Recherche-Schritte folgen. Zuletzt erstellt der **'Analyse- und Report-Agent'** (ebenfalls ein LLM-Knoten in N8N, dessen Prompt direkt in N8N verwaltet wird) basierend auf dem strukturierten JSON und den Recherche-Daten den finalen, personalisierten KI-Strategie-Report (als JSON für das Frontend), der das Standard-Analysemodell verwendet.  
  * **Inhalt des Basis-Reports:**  
    * Einführung in die AI-First Strategie: Kurze, verständliche Erklärung, was eine AI-First Strategie bedeutet und warum sie für KMUs wichtig ist.  
    * Bedeutung Proprietärer Daten: Erläuterung, wie eigene, einzigartige Daten (Proprietäre Daten) als nachhaltiger Wettbewerbsvorteil im KI-Zeitalter dienen können.  
    * Die Rolle der Mitarbeiter im Zeitalter von KI (Entwicklung statt Ersetzung, KI als Werkzeug zur Produktivitätssteigerung).  
    * Skizzierung eines generischen Transformationspfades zu einer AI-First Organisation (Kernbereiche: Datenstrategie, Kompetenzaufbau, Prozessintegration, Mitarbeiterentwicklung).  
    * Identifizierung und Kurzbeschreibung von 2-3 konkreten, branchenrelevanten und auf die KMU-Größe zugeschnittenen KI-Anwendungsfällen, die als erste Schritte auf diesem Pfad dienen können und ein hohes ROI-Potenzial haben.  
    * Verständliche Erklärung des direkten Nutzens dieser Anwendungsfälle für das spezifische KMU im Kontext der AI-First Strategie.  
    * Allgemeine, erste praxisnahe Implementierungsansätze für diese Anwendungsfälle (z.B. Tool-Kategorien, benötigte Skill-Typen – keine spezifischen Tool-Empfehlungen im MVP-Basis-Report).  
    * Kurzer Hinweis auf Datenqualität, Change Management und ethische Überlegungen.  
* **Mehrsprachigkeit (Deutsch & Englisch):** Die gesamte Plattform (Fragebogen, Report, Wissensdatenbank, UI-Elemente) wird von Beginn an in Deutsch und Englisch verfügbar sein.  
* **Report-Auslieferung (Web-Ansicht):** Direkte Anzeige des Reports im Webbrowser nach Abschluss des Fragebogens. Kein PDF-Download im MVP, um Nutzerengagement (Verweildauer, Rückkehr zum Report) besser messen zu können. Der anonyme Session-Link dient auch dem späteren Wiederaufruf des Reports.  
* **Grundlegende Wissensdatenbank/FAQ-Bereich ("Wissens-Nuggets"):** Mit ca. 15-20 kurzen Artikeln/Glossareinträgen, die grundlegende KI-Begriffe, Konzepte (inkl. AI-First, Proprietäre Daten, Rolle Mitarbeiter) und die im Report verwendeten Ansätze erklären (DE/EN).  
* **Durchgehender, unaufdringlicher Feedback-Mechanismus:**  
  * Einfache Möglichkeit für Nutzer, an verschiedenen Stellen der User Journey (Landingpage, Fragebogen-Schritte, Report-Ansicht, Wissensdatenbank) kontextbezogenes Feedback zu geben (z.B. über ein kleines Feedback-Icon/-Widget).  
  * Das Feedback wird gesammelt und für spätere Analysen (ggf. LLM-gestützt) aufbereitet, um Optimierungspotenziale zu identifizieren.  
* **Call-to-Action (CTA) für weiterführendes Interesse:** Ein klarer, aber nicht aufdringlicher CTA am Ende des Reports, um Interesse an einer tiefergehenden (manuellen) Beratung oder Informationen zu zukünftigen Premium-Features zu bekunden (z.B. "Mehr erfahren", "Interesse an Experten-Gespräch anmelden").  
* **Datenschutzkonforme Datenerfassung und \-verarbeitung:** Inklusive Cookie-Banner, Datenschutzerklärung und anonymisierter Speicherung der Fragebogendaten (ohne direkte Personenbezüge im Kern).  
* **Admin-Bereich für Landing Page und Hauptanwendung (/admin):** Ein passwortgeschützter Administrationsbereich, der nicht von Suchmaschinen indexierbar ist.  
  * Für die Landing Page: Ermöglicht grundlegende Einstellungen und Content-Anpassungen (Details TBD).  
  * Für die Hauptanwendung (app.ai-strategy-navigator.com): Ermöglicht die zentrale Verwaltung von Prompts für die KI-Agenten des Fragebogens.  
* **Dynamisches Prompt-Management im Admin-Bereich:** Die Möglichkeit für Administratoren, die System-Prompts für den **'Agent 1 (Gesprächs- und Erfassungs-Agent)'** einfach zu erstellen, anzuzeigen, zu aktualisieren und zu löschen (CRUD). Diese Prompts steuern das Verhalten, die Fragen, Ziele und den Output des KI-Agenten. Die Prompts für die N8N-internen Agenten (**Extraktions-Agent, Analyse- und Report-Agent**) werden **direkt in N8N** gepflegt.  
* **Sicherheitsmaßnahmen gegen LLM-Token-Missbrauch:** Implementierung von Mechanismen zur Vermeidung exzessiven Token-Verbrauchs durch bösartige Bots oder Nutzer im Chat-Interface (z.B. Rate Limiting, Input-Validierung, Captchas o.ä. – genaue Maßnahmen durch Architect Agent zu definieren). **Nice-to-Haves (Post-MVP):** Detailliertere individuelle Analysen im Report, Szenarioplanung, Benchmarking-Daten, Speicherfunktion für Reports (mit Login), Team-Funktionen, Blog-Ausbau, direkte Integration mit spezifischen Tools, weitere Sprachen, erweiterte Branchenanalysen, Community-Forum, Wissens-Nuggets als Podcast/YouTube, PDF-Download-Option für Reports (falls stark nachgefragt). **Features adressieren direkt das definierte Problem:** Der Fragebogen und der erweiterte Report helfen KMUs, die Komplexität zu reduzieren, eine strategische Orientierung zu gewinnen (AI-First, Proprietäre Daten, Mitarbeiterentwicklung) und erste konkrete, für sie relevante KI-Anwendungsfälle zu identifizieren. Der Feedback-Mechanismus und die Hilfestellungen adressieren die Nutzerunsicherheit. **Jedes Feature ist mit spezifischen Nutzerbedürfnissen verknüpft:**  
* Interaktiver Fragebogen mit Hilfen: Bedürfnis nach einfacher, geführter Erfassung und Vermeidung von Unsicherheit.  
* Erweiterter Report: Bedürfnis nach strategischer Einordnung UND konkreten Handlungsempfehlungen.  
* Wissensdatenbank: Bedürfnis nach Klärung von Begriffen und Aufbau von Grundverständnis.  
* Feedback-Kanal: Bedürfnis, gehört zu werden und zur Verbesserung beizutragen.  
* Mehrsprachigkeit: Erschließung eines größeren Nutzerkreises. **Features aus Nutzerperspektive beschrieben:** "Ich als KMU-Entscheider kann mich über verschiedene Analysemodelle informieren, dann in einem geführten Dialog (ähnlich einem Interview) meine Unternehmenssituation schildern, dabei Pausen machen und später weitermachen. Ich erhalte einen personalisierten Report direkt im Browser, der mir nicht nur aufzeigt, was eine AI-First Strategie, die Nutzung eigener Daten und die Entwicklung meiner Mitarbeiter für mich bedeuten, sondern mir auch einen Weg dorthin und 2-3 passende KI-Anwendungsfälle sowie deren Nutzen für mein Unternehmen aufzeigt – und das alles auf Deutsch oder Englisch. Währenddessen kann ich jederzeit einfach Feedback geben." **Mindestanforderungen für Erfolg definiert:** Der generierte Basis-Report muss für die Zielgruppe (Markus & Sandra) als strategisch erhellend, wertvoll, verständlich und glaubwürdig wahrgenommen werden. Die vorgeschlagenen Anwendungsfälle müssen als relevant und prinzipiell umsetzbar im Kontext der übergeordneten Strategie erscheinen. Der Fragebogen-Prozess muss als unterstützend und nicht überfordernd empfunden werden.

### **2.2 Abgrenzung des Scopes**

**Klare Formulierung, was NICHT im Scope des MVP enthalten ist:**

* Keine individuelle, manuelle Beratung als Teil des automatisierten Prozesses. Der CTA führt lediglich zu einer Interessensbekundung.  
* Keine Implementierung von KI-Lösungen für das KMU.  
* Keine spezifischen Software- oder Tool-Empfehlungen im kostenlosen Basis-Report (nur Kategorien).  
* Kein Login-Bereich für Nutzer oder Nutzer-Accounts im MVP. Die "Save & Continue Later"-Funktion basiert auf anonymen Session-Links.  
* Keine Aktivierung oder Bezahlung des Premium-Analysemodells. Die Option wird nur als "Coming Soon" angezeigt und erklärt.  
* Kein PDF-Download des Reports.  
* Keine vollautomatische Benachrichtigungsfunktion für die Verfügbarkeit des Premium-Modells (Interessensbekundungen werden gesammelt, die Benachrichtigung erfolgt Post-MVP oder initial manuell).  
* Keine Garantie für die technische Umsetzung der Voice-Eingabe im Fragebogen für den MVP – dies ist eine Exploration für den Architect Agent. Das Kern-MVP muss mit Texteingabe funktionieren.  
* Keine API-Schnittstellen für Drittanbieter im MVP.  
* Keine vollautomatische LLM-Analyse des Nutzerfeedbacks im MVP (Sammeln des Feedbacks ist MVP, Analyse ist Post-MVP).  
* **Eine vollumfängliche Content-Management-Funktionalität für alle Aspekte der Landing Page im /admin-Bereich (nur initiale Basisfunktionen).** **Bereich für zukünftige Erweiterungen (Post-MVP):** Siehe "Nice-to-Haves" oben; zudem Nutzer-Accounts, automatische Re-Evaluierung von Reports, kostenpflichtige Zusatzangebote/Beratung rund um die Themen "Proprietäre Daten Strategie entwickeln" und "Mitarbeiterentwicklung im KI-Zeitalter", Ausbau der Feedback-Analyse, PDF-Download-Option für Reports (falls Nutzer es stark nachfragen). **Rationale für Scope-Entscheidungen dokumentiert:** Fokus auf die Kernwertschöpfung (schnelle, automatisierte, personalisierte und nun auch strategisch fundierte Erstorientierung) gemäß der "Go-Entscheidung" Bedingung 1 (APB 1). Der MVP soll eine herausragende Kernfunktionalität liefern, die echten, sofort erkennbaren Mehrwert bietet. Die Erweiterungen (Mehrsprachigkeit, Chat-Interface, strategischer Report-Inhalt, Feedback-Kanal) steigern diesen Kernwert erheblich und verbessern die Chancen für Akzeptanz und Lernen. Der Ansatz, die Premium-Option als "Coming Soon" zu präsentieren, ermöglicht es, frühzeitig das Nutzerinteresse und das Verständnis für ein höherwertiges Angebot zu testen, ohne den MVP durch die Implementierung einer Bezahl-Infrastruktur oder die Aktivierung eines zweiten Analysemodells unnötig zu verkomplizieren. Es dient der initialen Validierung der Preisgestaltungsstrategie und der Kommunikation des Mehrwerts. **Architektonische Vorüberlegungen für Post-MVP-Funktionen:** Obwohl nicht Teil des MVP, sollte bei der Konzeption der Datenmodelle und der Backend-Architektur die spätere mögliche Einführung von Nutzer-Accounts und der Verknüpfung von Reports mit diesen Accounts bedacht werden, um spätere Umbauten zu minimieren. Dies ist ein Hinweis für den Architect Agent. **MVP minimiert Funktionalität bei gleichzeitiger Maximierung des Lernens:** Der MVP testet die Kernhypothese: Sind KMUs bereit, den (nun interaktiveren) Fragebogen auszufüllen, und empfinden sie den (nun strategisch erweiterten) Report als so wertvoll, dass sie Interesse an weiteren Schritten zeigen? Die Feedback-Kanäle liefern direktes Lernmaterial. **Scope wurde mehrfach geprüft und verfeinert (durch Interaktion mit dem Projektinitiator).**

### **2.3 MVP Validierungsansatz**

**Methode zur Überprüfung des MVP-Erfolgs definiert:**

* **Quantitative Metriken (Primär):**  
  * Anzahl generierter Reports (DE/EN getrennt erfassen).  
  * Completion-Rate des Fragebogens (Ziel: \>70% der Gestarteten, trotz potenziell längerer Interaktion durch Chat-Format).  
  * Nutzungsrate der "Save & Continue Later"-Funktion.  
  * Durchschnittliche Anzahl der Sessions bis zur Fertigstellung eines Reports.  
  * Klickrate auf den CTA für weiterführendes Interesse (Ziel: \>10% der Report-Empfänger).  
  * Klickrate auf "Mehr erfahren" / "Benachrichtigen, wenn verfügbar" für das Premium-Modell (Ziel: \>15% der Nutzer, die die Modellauswahl-Info sehen).  
  * Engagement mit dem Web-Report: Verweildauer auf der Report-Seite, Scrolltiefe, Häufigkeit von Report-Wiederaufrufen über den Session-Link.  
  * Nutzungsrate der Hilfestellungen im Fragebogen.  
  * Menge und Art des eingehenden Feedbacks über den Feedback-Mechanismus.  
* **Qualitatives Feedback (Sekundär):** Auswertung des gesammelten Feedbacks aus dem kontinuierlichen Mechanismus, eine einfache "Daumen hoch/runter"-Bewertung oder 1-5 Sterne direkt nach Anzeige des Reports, optionales kurzes Feedback-Formular, Durchführung von 5-10 strukturierten Interviews pro Sprache (DE/EN). **Mechanismen für initiales Nutzerfeedback geplant:** Kontinuierlicher Feedback-Kanal, Bewertungsmöglichkeit, optionales Formular, Interviews. **Kriterien für die Weiterentwicklung über das MVP hinaus spezifiziert:** Erreichen der Akquiseziele, positives qualitatives Feedback, Bestätigung der Nachfrage nach Premium/Beratung, technische Stabilität, Nachweis des Werts des strategischen Inhalts, Bewertung der "Save & Continue" Funktion und des Web-Report Engagements. **Lernziele für das MVP formuliert:**  
* Validieren, ob interaktiver Fragebogen und erweiterter, strategischer Report als benutzerfreundlich, personalisiert und wertvoll von KMUs (DE & EN) wahrgenommen werden.  
* Verstehen, welche strategischen Inhalte und KI-Anwendungsfälle am häufigsten als relevant für verschiedene KMU-Typen identifiziert werden.  
* Bewertung der Akzeptanz und Nützlichkeit der "Save & Continue Later"-Funktion.  
* Identifizieren der häufigsten Probleme/Abbrüche im Chat-Fragebogen, um UX zu optimieren.  
* Einschätzen der Akzeptanz des Chat-Formats gegenüber klassischen Formularen.  
* Sammeln von konkretem Feedback zur Verbesserung von Inhalten, Fragen und der Plattform-Usability.  
* Einschätzen des Interesses für spezifische Premium-Features oder Beratungsleistungen und für das Premium-Analysemodell in beiden Sprachräumen. **Zeithorizont-Erwartungen festgelegt:**  
* MVP-Launch: Ziel innerhalb von 4-6 Monaten (ambitioniert, muss mit technischem Team bewertet werden).  
* Erste Validierungsphase (Datensammlung & initiales Lernen): 3 Monate nach Launch.  
* Entscheidung über nächste Entwicklungsstufe/Skalierung: Nach den ersten 3-6 Monaten basierend auf den gesammelten Daten und Erkenntnissen.

## **3\. STRATEGISCHE ROADMAP (NOW / NEXT / LATER)**

Die Roadmap gliedert sich in drei Phasen, die auf den Erkenntnissen aus dem "Actionable Project Briefing" und unseren bisherigen Definitionen für das PRD aufbauen.

### **3.1 NOW (Fokus: MVP Launch & Validierung \- ca. 0-6 Monate nach Entwicklungsstart)**

**Produkt & Entwicklung:**

* Entwicklung und Launch des MVP "AI Strategy Navigator" mit allen in Abschnitt 2.1 definierten Kernfunktionalitäten:  
  * Interaktiver Chat-Fragebogen (DE/EN) mit Hilfestellungen und "Save & Continue Later"-Funktion.  
  * Automatisierte Generierung des personalisierten Basis-KI-Strategie-Reports (Web-Ansicht, kein PDF) mit den drei strategischen Leuchttürmen (AI-First, Proprietäre Daten, Mitarbeiter im KI-Zeitalter) und 2-3 konkreten Anwendungsfällen.  
  * Grundlegende Wissensdatenbank/FAQ ("Wissens-Nuggets") in DE/EN.  
  * Durchgehender, unaufdringlicher Feedback-Mechanismus.  
  * CTA für weiterführendes Interesse.  
  * Datenschutzkonforme Umsetzung.  
  * Modellauswahl-Informations-Interface (Standard aktiv, Premium "Coming Soon").  
  * **Admin-Bereich (/admin) für Landing Page (Basis-Content) und Hauptanwendung (Prompt-Management).**  
  * **Dynamisches Prompt-Management und Sicherheitsmaßnahmen gegen LLM-Token-Missbrauch.**  
* Aufbau der notwendigen Infrastruktur (Hosting, Datenbanken, Backend-LLM-Integration, N8N/LLM-Integration).  
* Implementierung eines robusten Qualitätssicherungsprozesses für die Report-Generierung. **Marketing & Vertrieb:**  
* Go-to-Market-Aktivitäten: Launch-Kommunikation.  
* Initiierung von Content-Marketing-Maßnahmen: Erste Blog-Artikel (über die Nuggets hinausgehend, falls Ressourcen es erlauben), Social Media Präsenz aufbauen, um erste Nutzer zu gewinnen und Expertise zu signalisieren.  
* SEO-Grundlagen schaffen. **Validierung & Lernen:**  
* Aktives Sammeln und erste Auswertung von Nutzerfeedback über den integrierten Mechanismus.  
* Tracking der definierten MVP KPIs (Anzahl Reports, Completion-Rates, Engagement-Metriken für Web-Report, CTA-Klicks, Interesse an Premium-Modell).  
* Durchführung der ersten qualitativen Nutzerinterviews (5-10 pro Sprache) zur Vertiefung der Erkenntnisse.  
* Iterative Optimierung des Fragebogens, der Report-Inhalte und der User Experience basierend auf den ersten Feedbacks und Daten. **Strategische Ziele dieser Phase:**  
* Technische Machbarkeit und Stabilität der Plattform beweisen.  
* Kernnutzenversprechen validieren (wird der Report als wertvoll und die UX als positiv empfunden?).  
* Erste Nutzerbasis aufbauen und Lernziele des MVP erreichen.  
* Grundlage für die "NEXT"-Phase schaffen.

### **3.2 NEXT (Fokus: Wachstum, erste Monetarisierung & Produkterweiterung \- ca. 6-18 Monate)**

**Produkt & Entwicklung (basierend auf MVP-Learnings):**

* Einführung von Nutzer-Accounts (optional): Ermöglicht das Speichern von Reports, Verfolgen der eigenen Entwicklung, ggf. ein personalisiertes Dashboard. (Architektonische Grundlagen wurden im MVP berücksichtigt).  
* Aktivierung und Weiterentwicklung des Premium-Analysemodells (falls MVP-Validierung positiv) und Einführung von Bezahlmechanismen.  
* Entwicklung erster weiterer Premium-Tool-Funktionen (Abonnement-Modell):  
  * Mögliche Features: Detailliertere Analysen im Report, mehr Anwendungsfälle zur Auswahl, erweiterte Inhalte in der Wissensdatenbank/spezifische Guides, PDF-Download-Option für Reports, Vergleich mit anonymisierten Branchendurchschnitten (erste Stufe der datengestützten Produkte).  
* Ausbau der Report-Personalisierung: Verfeinerung der LLM-Logik für noch präzisere und individuellere Empfehlungen.  
* Erweiterung der "Wissens-Nuggets": Ausbau zu einem umfassenderen Wissensportal, ggf. mit ersten Multimedia-Inhalten (kurze Erklärvideos – basierend auf Nutzerfeedback zu Formaten wie Podcast/YouTube).  
* Systematische Analyse des gesammelten Nutzerfeedbacks (ggf. mit LLM-Unterstützung) zur Priorisierung weiterer Features. **Marketing & Vertrieb:**  
* Skalierung der Content-Marketing-Aktivitäten: Regelmäßige Veröffentlichung hochwertiger Inhalte (Blog, Fallstudien, Whitepaper) zur Steigerung der organischen Reichweite und Etablierung als "Thought Leader".  
* Ausbau der SEO/SEM-Aktivitäten.  
* Entwicklung eines klaren Lead-Generierungs-Funnels für die Premium-Angebote und die kostenpflichtigen Beratungsleistungen.  
* Aufbau eines initialen (ggf. externen) Beratungsangebots für KMUs, die nach dem Report individuelle Unterstützung wünschen (z.B. für die Themen "Proprietäre Daten Strategie" oder "Mitarbeiterentwicklung im KI-Zeitalter"). **Geschäftsmodell-Entwicklung:**  
* Implementierung und Test verschiedener Preismodelle für die Premium-Features und das Premium-Analysemodell.  
* Erste Umsätze durch Premium-Abonnements, Premium-Reports und Beratungsleistungen generieren und die definierten Umsatzziele (3.000 € MRR nach 18 Monaten) anstreben. **Strategische Ziele dieser Phase:**  
* Nutzerwachstum signifikant steigern.  
* Das Freemium-Modell (inkl. bezahltem Premium-Report) validieren und erste zahlende Kunden gewinnen.  
* Produkt basierend auf Nutzerfeedback und Daten signifikant verbessern und erweitern.  
* Die Marke "AI Strategy Navigator" im DACH-Raum etablieren.

### **3.3 LATER (Fokus: Skalierung, Diversifizierung & Marktführerschaft \- ca. 18+ Monate)**

**Produkt & Entwicklung:**

* Entwicklung fortgeschrittener Premium-Features: Z.B. Szenarioplanung, tiefgreifende Benchmarking-Funktionen, Integrationen mit Drittanbieter-Tools (CRM, ERP), Team-Kollaborationsfunktionen.  
* Einführung von "Report Re-Evaluierung": Automatisierte oder teilautomatisierte Neubewertung gespeicherter Reports basierend auf neuen Marktdaten oder veränderten Nutzereingaben als Premium-Service.  
* Entwicklung datengestützter Produkte: Analyse aggregierter, anonymisierter Fragebogendaten zur Erstellung von kostenpflichtigen Branchen-Benchmark-Reports oder Trendanalysen (unter strikter Einhaltung von Datenschutz und Transparenz).  
* Mögliche Einführung weiterer KI-gestützter Analyse- oder Planungsmodule direkt in der Plattform.  
* Erweiterung der multimedialen Wissensinhalte (Podcasts, umfangreichere Videokurse). **Marketing & Vertrieb:**  
* Internationale Expansion über den deutsch- und englischsprachigen Raum hinaus (falls strategisch sinnvoll).  
* Aufbau von strategischen Partnerschaften (z.B. mit Verbänden, Technologieanbietern, Unternehmensberatern).  
* Community Building: Aufbau einer aktiven Nutzer-Community (Forum, Events) zum Austausch und zur Co-Kreation. **Geschäftsmodell-Entwicklung:**  
* Optimierung und Diversifizierung der Einnahmequellen.  
* Erschließung neuer Kundensegmente oder Branchen basierend auf gewonnenen Erkenntnissen. **Strategische Ziele dieser Phase:**  
* Nachhaltiges, profitables Wachstum sicherstellen.  
* Marktführerschaft in der Nische der KI-Strategie-Tools für KMU anstreben.  
* Den "AI Strategy Navigator" als umfassende Plattform für die KI-Transformation von KMUs etablieren.  
* Kontinuierliche Innovation und Anpassung an sich verändernde Marktbedingungen und Technologien.

## **4\. USER EXPERIENCE (UX) REQUIREMENTS**

Dieser Abschnitt beschreibt die Anforderungen an die User Experience, um sicherzustellen, dass der "AI Strategy Navigator" intuitiv, zugänglich, interaktiv und effizient nutzbar ist. Das Kernstück der Interaktion bildet ein geführter, dialogbasierter Fragebogen.

### **4.1 User Journeys & Flows**

**Journey 1: Erstmaliger anonymer Nutzer – Erfolgreiche Report-Generierung (mit Standard-Modell)**

* **Einstieg & Sprache:** Nutzer gelangt auf die Landing Page (DE oder EN). Die Sprache der Landing Page bestimmt die Sprache der gesamten Sitzung.  
* **Start & Modellauswahl-Information:** Klickt auf "Strategie-Report starten" (o.ä.). Dem Nutzer wird eine Seite/ein Modal angezeigt, auf der die Optionen für die Report-Qualität vorgestellt werden:  
  * **Standard-Modell (kostenlos):** Wird als Standard-Option präsentiert und ist für den kostenlosen Report aktiv. Die Vorteile (solide Analyse, kostenfrei) werden kurz erläutert.  
  * **Premium-Modell (kostenpflichtig – "Coming Soon"):** Wird ebenfalls vorgestellt und die qualitativen Unterschiede sowie der deutlich höhere Wert (tiefere Analyse, erweiterte Insights – mit konkreten Beispielen untermauert) werden erklärt. Diese Option ist im MVP visuell als "Demnächst verfügbar" oder "Coming Soon" gekennzeichnet, ist ausgegraut und nicht auswählbar/kaufbar. Ein CTA wie "Mehr erfahren" oder "Benachrichtigen, wenn verfügbar" könnte hier platziert werden, um Interesse zu messen. Der Nutzer fährt mit dem Standard-Modell fort.  
* **Fragebogen (Chat-Interface):**  
  * Der Nutzer interagiert in einem **einzigen, durchgehenden Chat-Fenster** mit **'Agent 1 (Gesprächs- und Erfassungs-Agent)'**. Dieser führt ihn durch den gesamten Fragenkatalog. Der Nutzer beantwortet die Fragen im Chat. Agent 1 kann Hilfestellung geben.  
  * Der Nutzer hat die Möglichkeit, den Fragebogen über die "Save & Continue Later"-Funktion (via Session-Link) zu unterbrechen und fortzusetzen. Diese Funktion bezieht sich auf den gesamten Chatverlauf.  
* **Abschluss & Zusammenfassung:** Am Ende des gesamten Fragebogens (alle Fragen durchlaufen) präsentiert Agent 1 eine Gesamtzusammenfassung der wichtigsten Eingaben zur finalen Bestätigung durch den Nutzer.  
* **Feedback zum Frageprozess:** Der Nutzer wird gefragt, ob er mit der Zusammenfassung und dem Frageprozess zufrieden war.  
* **Report-Generierung (mit Standard-Modell):** Startet die Generierung des Reports. Der Nutzer wird informiert, dass dies einige Minuten dauern kann (siehe 4.2 Erwartungsmanagement).  
* **Report-Ansicht (Web):**  
  * Der personalisierte Report wird direkt im Browser angezeigt (Zugriff ggf. auch später über den Session-Link, falls der Nutzer die Seite während der Generierung verlassen hat).  
  * Nutzer kann durch die Abschnitte navigieren und Links zu relevanten "Wissens-Nuggets" folgen.  
* **Interaktion & Nächste Schritte:** Optionales Feedback zum Report, Klick auf CTA.

**Journey 2: Wiederkehrender anonymer Nutzer – Fortsetzung des Fragebogens/Report-Abruf**

* **Einstieg:** Ruft den zuvor erhaltenen Session-Link auf.  
* **Fortsetzung/Abruf:**  
  * Setzt den Fragebogen an der unterbrochenen Chat-Interaktion fort.  
  * Oder (falls Fragebogen abgeschlossen) gelangt direkt zum generierten Report.  
* **Weiterer Verlauf:** Analog zu Journey 1\.

**Journey 3: Nutzer interagiert mit der Wissensdatenbank**

* **Einstieg:**  
  * Klickt auf einen Link aus dem Report heraus zu einem spezifischen "Wissens-Nugget".  
  * Navigiert direkt über die Hauptnavigation zur Wissensdatenbank.  
* **Nutzung:**  
  * Durchsucht oder browst die verfügbaren Artikel/Glossareinträge.  
  * Liest einen oder mehrere Artikel.  
* **Interaktion:** Nutzt optional den Feedback-Widget, um Rückmeldung zum Inhalt zu geben.

**Journey 4: Administrator im /admin-Bereich**

* **Einstieg:** Admin navigiert zur /admin-URL (der Landing Page oder der Hauptanwendung).  
* **Login:** Gibt Passwort ein, um Zugang zu erhalten.  
* **Navigation im Admin-Bereich:** Greift auf die verschiedenen Verwaltungsfunktionen zu (z.B. Prompt-Management).  
* **Prompt-Verwaltung (Beispiel für Hauptanwendung):**  
  * Wählt **'Agent 1 (Gesprächs- und Erfassungs-Agent)'** aus.  
  * Sieht den aktuellen Prompt.  
  * Bearbeitet und speichert den Prompt.  
  * Die Änderungen wirken sich auf das Verhalten von Agent 1 im Fragebogen aus.  
* **Logout:** Meldet sich sicher ab.

### **4.2 Usability-Anforderungen**

* **Zugänglichkeit (Accessibility):**  
  * Die Plattform soll so gestaltet sein, dass sie grundlegende Prinzipien der Barrierefreiheit berücksichtigt. Ziel ist die Konformität mit WCAG 2.1 Level AA für wesentliche Teile der Anwendung.  
  * Klare Kontraste, semantisch korrekte HTML-Struktur, Tastaturbedienbarkeit für Schlüsselfunktionen.  
* **Plattform-/Gerätekompatibilität:**  
  * Responsive Webdesign: Die Plattform muss auf gängigen Desktop-Browsern (aktuelle Versionen von Chrome, Firefox, Safari, Edge) sowie auf Tablets und Smartphones (iOS, Android) optimal dargestellt und bedienbar sein.  
* **Performance (aus Nutzersicht):**  
  * Ladezeiten: Die Landing Page und die Wissensdatenbank sollten schnell laden (\< 3 Sekunden für LCP).  
  * Interaktionsgeschwindigkeit Fragebogen: Antworten und Reaktionen des "Operator Agenten" im Chat (Streaming) müssen sich unmittelbar und flüssig anfühlen.  
  * Report-Generierungszeit: Die Generierung des Reports kann mehrere Minuten in Anspruch nehmen.  
* **Erwartungsmanagement bei langen Prozessen:**  
  * Für die Report-Generierung muss dem Nutzer klar kommuniziert werden, dass der Prozess länger dauert.  
  * Während der Wartezeit könnten ihm z.B. passende Wissens-Nuggets oder eine kurze Zusammenfassung der Vorteile des Reports angezeigt werden.  
  * Es muss sichergestellt sein, dass der Nutzer den Report auch später über seinen Session-Link abrufen kann, falls er die Seite verlässt. Eine Benachrichtigungsoption (z.B. "Wir informieren Sie per E-Mail, wenn Ihr Report fertig ist" – wäre aber Post-MVP, da E-Mail optional ist) ist für später zu erwägen.  
* **Fehlerbehandlung und \-vermeidung:**  
  * Eingaben im Fragebogen werden, wo möglich, plausibilisiert, um Fehleingaben zu minimieren.  
  * Fehlermeldungen müssen klar, verständlich und auf Deutsch/Englisch formuliert sein und dem Nutzer konkrete Hinweise zur Behebung geben.  
  * Graceful Handling von Session-Timeouts für die "Save & Continue Later"-Funktion (z.B. klare Information, wenn Link abgelaufen ist, und Hinweis, neu zu starten).  
* **Lernbarkeit & Verständlichkeit:**  
  * Die Bedienung der Plattform, insbesondere des Fragebogens, muss intuitiv und ohne vorherige Einarbeitung möglich sein.  
  * Die Sprache in UI-Elementen, Fragen, Hilfetexten und Reports muss klar, präzise und auf die Zielgruppe (KMU-Entscheider ohne tiefes KI-Vorwissen) zugeschnitten sein.  
  * Der Zweck jedes Schrittes und jeder Information sollte klar erkennbar sein.  
  * Die Erklärung der Modellunterschiede (Standard vs. Premium "Coming Soon") muss für KMU-Entscheider ohne technisches Vorwissen absolut verständlich und der Mehrwert des zukünftigen Premium-Modells klar sein.  
* **Feedback-Mechanismen:**  
  * Der in Abschnitt 2.1 definierte, durchgehende Feedback-Mechanismus (z.B. Widget) muss einfach zu finden und zu bedienen sein, ohne den Nutzerfluss zu stören.  
  * Explizite Feedback-Abfrage am Ende des Fragebogens zur Zufriedenheit mit Prozess und Zusammenfassung.

### **4.3 UI (User Interface) Anforderungen**

* **Informationsarchitektur:**  
  * Fragebogen: Ein durchgehendes Chat-Interface.  
  * Report & Wissensdatenbank: Klare Struktur und Navigation.  
* **Kritische UI-Komponenten:**  
  * **Modellauswahl-Informationsseite/-Modal:** Klare Darstellung der beiden Optionen (Standard und Premium). Deutliche Kennzeichnung des Standard-Modells als aktiv/kostenlos. Visuelle Hervorhebung des Premium-Modells mit Erklärungen zu dessen Vorteilen (mit Beispielen) und dem Hinweis "Coming Soon" (ausgegraut, nicht klickbar für Kauf). Ggf. ein Link/Button "Mehr über Premium erfahren" oder "Benachrichtigen, wenn verfügbar".  
  * **Chat-Interface:** Das Chat-Fenster ist das **einzige Hauptinteraktionsfenster** für den gesamten Fragebogen-Prozess mit Agent 1\. Erscheinungsbild ähnlich modernen LLM-Chat-Interfaces (klare Sprechblasen für Agent und Nutzer). "Agent 1" Persona (ggf. mit einem dezenten Avatar/Namen). Texteingabefeld für Nutzer. Anzeige für Streaming-Antworten des Agenten (blinkender Cursor, animierte Punkte).  
  * **Report-Darstellung:** Übersichtliche Gliederung, gut lesbare Typografie, ggf. Einsatz von Icons oder einfachen Grafiken zur Visualisierung von Konzepten. Verlinkung zu Wissens-Nuggets.  
  * **Navigationselemente:** Hauptmenü (Landing Page), klare Buttons für Aktionen (z.B. "Weiter", "Speichern & Schließen"), Fortschrittsanzeige für den gesamten Chat-Verlauf.  
  * **Feedback-Widget & Feedback-Abfragen.**  
  * **Sprachauswahl:** Erfolgt implizit über die Landingpage-Version; UI-Texte der Plattform passen sich an.  
  * **"Save & Continue Later"-Mechanismus:** Klar verständliche Generierung und Darstellung des Session-Links.  
  * **Admin-Interface (/admin):**  
    * Login-Maske (Passwortschutz).  
    * Übersichtliche Navigation zu den Verwaltungsfunktionen.  
    * Für die Hauptanwendung: Interface zur Verwaltung (Anzeige, Erstellung, Bearbeitung, Löschung) des Prompts für **Agent 1**. Dies sollte eine einfache Texteingabe und Speicherung ermöglichen.  
* **Visuelle Design-Richtlinien (basierend auf Nutzer-Briefing):**  
  * Stil: Hochwertig, professionell, minimalistisch – passend für eine B2B-Lösung. Fokus auf Klarheit und Benutzerfreundlichkeit.  
  * Farbpalette: Gedeckte, seriöse Farben. Basis aus Weiß- und Grautönen, kombiniert mit einem dunklen Blau oder Anthrazit für Texte und UI-Elemente. Eine einzelne Akzentfarbe (z.B. ein mittleres Blau oder Grün) kann für Call-to-Action-Buttons oder Fortschrittsindikatoren verwendet werden.  
  * Typografie: Klare, gut lesbare serifenlose Schriften (z.B. Inter, Roboto, Open Sans). Hierarchische Textgrößen für Titel, Untertitel und Chat-Inhalte.  
  * Responsivität: Das Design ist erkennbar responsiv. In einer mobilen Ansicht würde das Chat-Fenster den gesamten Bildschirm ausfüllen und für Touch-Bedienung optimiert sein.  
  * **Das Admin-Interface kann funktional und einfach gehalten sein, muss aber eine klare Struktur und Bedienbarkeit aufweisen. Es ist nicht primär auf ästhetische Hochglanz-Darstellung ausgelegt wie die Nutzer-Frontends.**  
* **Inhaltsanforderungen (UI-Texte):** Alle UI-Texte (Buttons, Menüs, Fehlermeldungen, Hinweise etc.) müssen in Deutsch und Englisch präzise, konsistent und verständlich formuliert sein. Terminologie soll einheitlich verwendet werden.  
* **Interaktionsdesign:**  
  * "Agent 1" kann direkte Fragen des Nutzers zum Verständnis der Fragebogen-Items beantworten.  
  * Für bestimmte Daten (z.B. Unternehmensgröße, Mitarbeiteranzahl) können im Chat auch geschlossene Fragen (Multiple Choice, Dropdown-ähnliche Auswahl im Chat) verwendet werden, um die Eingabe zu beschleunigen.  
  * Die Verlinkung von Report-Inhalten zu "Wissens-Nuggets" ist essenziell. Hinweis für Architect Agent: Die technische Umsetzung, wie das LLM bei der Report-Erstellung dynamisch auf die Wissens-Nuggets zugreifen und diese als Zitate/Links einbinden kann, ist zu explorieren.  
  * **Das Speichern von Änderungen im Admin-Bereich (z.B. an Prompts) muss dem Admin klar bestätigt werden.**

## **5\. FUNCTIONAL REQUIREMENTS**

Dieser Abschnitt listet die übergeordneten funktionalen Anforderungen (FR) für den MVP des "AI Strategy Navigators" auf. Diese Anforderungen leiten sich aus den definierten Kernfunktionalitäten und User Experience Requirements ab.

### **5.1 Feature-Vollständigkeit (High-Level Functions)**

**FR-MODSEL (Modellauswahl-Information):**

* **FR-MODSEL-001:** Das System muss eine Benutzeroberfläche anzeigen, die den Unterschied zwischen einem Standard-Analysemodell (kostenlos) und einem Premium-Analysemodell (kostenpflichtig, "Coming Soon") für die Reporterstellung erklärt.  
* **FR-MODSEL-002:** Das System muss das Standard-Modell als vorausgewählt und aktiv für die kostenlose Reporterstellung kennzeichnen.  
* **FR-MODSEL-003:** Das System muss das Premium-Modell als "Coming Soon" (oder ähnlich) darstellen, sodass es im MVP nicht für die Reporterstellung ausgewählt oder gekauft werden kann.  
* **FR-MODSEL-004:** Das System muss dem Nutzer ermöglichen, sein Interesse am Premium-Modell zu bekunden (z.B. über einen "Mehr erfahren"-Link oder eine Benachrichtigungsanfrage).

**FR-QUEST (Fragebogen-Interaktion):**

* **FR-QUEST-001:** Das System muss einen interaktiven, dialogbasierten Fragebogen in einem **einzigen, durchgehenden Chat-Fenster** starten.  
* **FR-QUEST-002 (Sprachsteuerung):** Das System muss alle nutzerzugewandten Texte und Interaktionen im Fragebogen in der Sprache (Deutsch oder Englisch) bereitstellen, die durch die initiale Landingpage-Auswahl des Nutzers bestimmt wurde.  
* **FR-QUEST-003 (Geführter Dialog):** Das System muss über **'Agent 1 (Gesprächs- und Erfassungs-Agent)'** (Chatbot, dessen Verhalten durch einen im **/admin**\-Bereich der Hauptanwendung hinterlegten Prompt gesteuert wird) den Nutzer aktiv durch **alle Fragen des definierten Fragenkatalogs** führen.  
* **FR-QUEST-004 (Kontextuelle Hilfe im Chat):** Der **'Agent 1 (Gesprächs- und Erfassungs-Agent)'** muss in der Lage sein, klärende Fragen des Nutzers zum Verständnis der aktuellen Fragebogen-Items direkt im Chat zu beantworten. **Das Verhalten dieses Agenten wird durch die im /admin-Bereich hinterlegten Prompts gesteuert.**  
* **FR-QUEST-005 (Texteingabe):** Das System muss freie Texteingaben des Nutzers im Chat-Interface akzeptieren und verarbeiten können.  
* **FR-QUEST-006 (Auswahlbasierte Eingabe):** Das System muss für bestimmte Fragen (z.B. Unternehmensgröße) die Möglichkeit bieten, Antworten über vordefinierte Auswahlmöglichkeiten im Chat zu geben.  
* **FR-QUEST-007 (Fortschrittsspeicherung – "Save & Continue Later"):** Das System muss dem Nutzer ermöglichen, seinen Fortschritt im Fragebogen anonym über einen einzigartigen Session-Link zu speichern und die Bearbeitung zu einem späteren Zeitpunkt fortzusetzen.  
* **FR-QUEST-008 (Antwortzusammenfassung):** **Agent 1** muss am Ende des gesamten Dialogs eine Zusammenfassung der gegebenen Antworten erstellen und dem Nutzer zur Bestätigung im Chat anzeigen.

**FR-REPORT (Report-Erstellung und \-Anzeige):**

* **FR-REPORT-001 (Report-Generierung):** Das System muss die Übergabe des **vollständigen, rohen Chatverlaufs** (nach Nutzerbestätigung der Zusammenfassung durch Agent 1\) an einen **N8N-Workflow** auslösen. Innerhalb von N8N muss zuerst ein **'Extraktions-Agent'** (LLM-Knoten mit in N8N verwaltetem Prompt) den Chatverlauf analysieren und in ein **strukturiertes JSON** umwandeln. Anschließend muss der **'Analyse- und Report-Agent'** (LLM-Knoten mit in N8N verwaltetem Prompt) auf Basis dieses JSON (und ggf. weiterer Recherche-Daten aus N8N) den personalisierten KI-Strategie-Report (Standard-Modell) erstellen und als JSON-Objekt zur Verfügung stellen.  
* **FR-REPORT-002 (Inhaltliche Personalisierung):** Das System muss die Inhalte des Reports (strategische Leuchttürme, Anwendungsfälle, Nutzenargumentation etc.) basierend auf den Antworten des Nutzers im Fragebogen personalisieren.  
* **FR-REPORT-003 (Report-Anzeige):** Das System muss den generierten Report in einer Web-Ansicht darstellen. Der Zugriff auf den Report muss auch über den Session-Link des Nutzers möglich sein.  
* **FR-REPORT-004 (Sprachsteuerung Report):** Der Report muss in der vom Nutzer initial gewählten Sprache (Deutsch oder Englisch) generiert und angezeigt werden.

**FR-KNOW (Wissensdatenbank):**

* **FR-KNOW-001 (Zugriff Wissensdatenbank):** Das System muss einen Bereich für "Wissens-Nuggets" (FAQ-artig) bereitstellen, der in Deutsch und Englisch zugänglich ist und nach Inhalten durchsucht/gefiltert werden kann.  
* **FR-KNOW-002 (Verlinkung aus Report):** Das System muss ermöglichen, dass im Report kontextuelle Links zu relevanten Artikeln in der Wissensdatenbank platziert werden.

**FR-FEED (Nutzerfeedback):**

* **FR-FEED-001 (Durchgängiger Feedback-Kanal):** Das System muss einen durchgängig verfügbaren, einfach zu bedienenden Mechanismus (z.B. Feedback-Widget) bereitstellen, über den Nutzer kontextbezogenes Feedback geben können.  
* **FR-FEED-002 (Feedback zum Frageprozess):** Das System muss den Nutzer nach der Bestätigung der Fragebogen-Zusammenfassung explizit um Feedback zur Zufriedenheit mit dem Frageprozess und der Zusammenfassung bitten.  
* **FR-FEED-003 (Feedback-Sammlung):** Das System muss das eingegebene Feedback zentral sammeln.

**FR-CTA (Call-to-Action):**

* **FR-CTA-001 (Interessensbekundung):** Das System muss am Ende des Reports einen Call-to-Action anzeigen, der es dem Nutzer ermöglicht, sein Interesse an weiterführenden Informationen, Beratung oder zukünftigen Premium-Funktionen zu signalisieren.  
* **FR-CTA-002 (Interessenssammlung):** Das System muss die über den CTA erfolgten Interessensbekundungen sammeln.

**FR-DATA (Datenschutz und \-management):**

* **FR-DATA-001 (Anonymität der Kernnutzung):** Das System muss die Bearbeitung des Fragebogens und die Generierung des Reports standardmäßig ohne Erfassung von direkt personenbezogenen Daten ermöglichen (Anonymität über Session-Link).  
* **FR-DATA-002 (DSGVO-Konformität):** Das System muss bei allen Datenverarbeitungsprozessen die geltenden Datenschutzbestimmungen (insb. DSGVO) einhalten. Eine Datenschutzerklärung muss zugänglich sein.  
* **FR-DATA-003 (Session-Management):** Das System muss anonyme Nutzersitzungen (über Session-Links) über einen definierten Zeitraum (z.B. 48 Stunden) aufrechterhalten können, um die "Save & Continue Later"-Funktion und den späteren Report-Abruf zu ermöglichen.

**FR-ADMIN (Administrationsfunktionen):**

* **FR-ADMIN-001 (Admin-Zugangsschutz):** Das System muss einen passwortgeschützten Zugang zu den /admin-Bereichen der Landing Page und der Hauptanwendung sicherstellen.  
* **FR-ADMIN-002 (Admin-Indexierbarkeit):** Das System muss sicherstellen, dass die /admin-Bereiche nicht von Suchmaschinen indexiert werden.  
* **FR-ADMIN-003 (Prompt-Verwaltung für Agent 1):** Das System muss es einem autorisierten Administrator ermöglichen, den **System-Prompt für 'Agent 1 (Gesprächs- und Erfassungs-Agent)'** zu erstellen, anzuzeigen, zu bearbeiten und zu speichern.  
* **FR-ADMIN-004 (Landing Page Admin \- Basis):** Das System muss grundlegende administrative Funktionen für die Landing Page bereitstellen (Details TBD, z.B. einfache Textänderungen).

**FR-SEC-LLM (Sicherheit LLM-Nutzung):**

* **FR-SEC-LLM-001 (Missbrauchsprävention):** Das System muss Mechanismen zur Prävention von Missbrauch der LLM-Schnittstellen durch Bots oder böswillige Nutzer implementieren, um exzessiven Token-Verbrauch zu verhindern (z.B. Rate Limiting für Sessions/IPs, Captcha bei Verdacht, Input-Längenbeschränkungen – genaue technische Ausgestaltung durch Architect Agent).

### **5.2 Qualität der Anforderungen**

* **Spezifisch und unmissverständlich:** Jede Anforderung soll klar definieren, welche Funktion erfüllt werden muss.  
* **Fokus auf "Was", nicht "Wie":** Die Anforderungen beschreiben das erwartete Ergebnis, nicht die technische Implementierung.  
* **Konsistente Terminologie:** Die in diesem PRD verwendete Terminologie wird durchgängig genutzt.  
* **Testbarkeit:** Die formulierten Anforderungen sollen so gestaltet sein, dass ihre Erfüllung überprüfbar ist (wird später in Akzeptanzkriterien detailliert).

## **6\. NON-FUNCTIONAL REQUIREMENTS (NFRs)**

### **6.1 Performance und Skalierbarkeit**

* **P.1 Responsivität der Benutzeroberfläche:**  
  * **Anforderung:** Die Interaktion mit dem Fragebogen (Chat-Antworten von Agent 1\) muss sich für den Nutzer unmittelbar und flüssig anfühlen, um Engagement und eine positive User Experience sicherzustellen.  
  * **Business Impact:** Hohe Nutzerzufriedenheit, höhere Abschlussraten des Fragebogens, professionelles Erscheinungsbild.  
* **P.2 Report-Generierungszeit und Nutzerführung:**  
  * **Anforderung:** Obwohl die Report-Generierung (mit dem Standard-Modell im MVP) mehrere Minuten dauern kann, muss der Nutzer währenddessen klar über den Fortschritt informiert werden und es muss ein adäquates Erwartungsmanagement stattfinden (siehe UX Requirements 4.2).  
  * **Business Impact:** Vertrauen des Nutzers in den Prozess, Reduktion von Abbrüchen während der Wartezeit.  
* **P.3 Initiale Skalierbarkeit:**  
  * **Anforderung:** Das System muss zum MVP-Launch und in den ersten Monaten danach in der Lage sein, eine Last von bis zu \[z.B. 100-200\] gleichzeitigen Nutzern (Fragebogen ausfüllend oder Report ansehend) ohne signifikante Performance-Einbußen zu bewältigen (Hinweis: Architect Agent prüft optimale, kosteneffiziente Auslegung für organischen Start und schrittweise Skalierung).  
  * **Business Impact:** Fähigkeit, erste Erfolge von Marketingkampagnen zu nutzen, Erreichung der Nutzerakquise-Ziele.  
* **P.4 Zukünftige Skalierbarkeit:**  
  * **Anforderung:** Die Systemarchitektur sollte so ausgelegt sein, dass eine spätere Skalierung auf eine deutlich höhere Nutzerzahl (z.B. mehrere Tausend gleichzeitige Nutzer) gemäß der "Next"- und "Later"-Roadmap-Phasen möglich ist.  
  * **Business Impact:** Langfristiges Wachstumspotenzial, Erreichung der übergeordneten Geschäftsziele.

### **6.2 Sicherheit und Compliance**

* **S.1 Datenschutz (DSGVO-Konformität):**  
  * **Anforderung:** Jegliche Verarbeitung von Daten (anonymisierte Session-Daten, später optional vom Nutzer angegebene Daten für Premium-Funktionen oder Benachrichtigungen) muss streng nach den Vorgaben der DSGVO erfolgen. Eine transparente Datenschutzerklärung muss für den Nutzer jederzeit einsehbar sein.  
  * **Business Impact:** Rechtliche Konformität, Schutz vor Strafen, Aufbau von Nutzervertrauen, positive Markenwahrnehmung.  
* **S.2 Anonymität der Kernfunktion:**  
  * **Anforderung:** Die Kernfunktionen des MVP (Ausfüllen des Fragebogens, Generierung und Abruf des Standard-Reports) müssen wie zugesichert anonym, d.h. ohne die Notwendigkeit zur Angabe direkt personenbezogener Daten, nutzbar sein. Die Identifikation erfolgt über den anonymen Session-Link.  
  * **Business Impact:** Niedrige Einstiegshürde, Vertrauensbildung bei datensensiblen KMU-Nutzern, höhere Adoptionsraten.  
* **S.3 Datensicherheit:**  
  * **Anforderung:** Alle gesammelten Daten (Session-Daten, Feedback, später optional Nutzeraccounts) müssen vor unbefugtem Zugriff, Verlust oder Beschädigung durch angemessene technische und organisatorische Maßnahmen geschützt werden.  
  * **Business Impact:** Schutz der Nutzerdaten, Aufrechterhaltung des Nutzervertrauens, Vermeidung von Reputationsschäden.  
* **S.4 Integrität der Report-Daten:**  
  * **Anforderung:** Das System muss sicherstellen, dass der generierte Report die Eingaben des Nutzers korrekt widerspiegelt und die Analyseergebnisse des verwendeten Standard-Modells nicht verfälscht werden.  
  * **Business Impact:** Glaubwürdigkeit und Nutzen des Reports, Vertrauen in die Kompetenz der Plattform.  
* **S.5 Schutz des Admin-Bereichs:**  
  * **Anforderung:** Der /admin-Bereich muss besonders gegen unautorisierten Zugriff geschützt sein. Änderungen im Admin-Bereich (z.B. an Prompts) sollten nachvollziehbar sein (Logging von Änderungen – Post-MVP-Überlegung, aber für Architektur relevant).  
  * **Business Impact:** Schutz kritischer Systemkonfigurationen, Nachvollziehbarkeit von Änderungen.  
* **S.6 Sicherheit der LLM-Nutzung:**  
  * **Anforderung:** Die Systemarchitektur muss Vorkehrungen treffen, um die LLM-API-Nutzung vor Missbrauch zu schützen und eine unkontrollierte Kostenexplosion durch exzessive Token-Nutzung zu verhindern.  
  * **Business Impact:** Kostenkontrolle, Schutz vor Service-Missbrauch.

### **6.3 Zuverlässigkeit und Verfügbarkeit**

* **Z.1 Plattformverfügbarkeit:**  
  * **Anforderung:** Die Kernplattform (Landing Page, Fragebogen, Report-Abruf via Link, Wissensdatenbank) soll während der üblichen Geschäftszeiten (z.B. MO-FR, 08:00-18:00 Uhr MEZ) eine hohe Verfügbarkeit von mindestens \[z.B. 99,5%\] aufweisen.  
  * **Business Impact:** Ständige Erreichbarkeit für Nutzer, professionelles Auftreten, Vermeidung von Nutzerfrustration.  
* **Z.2 Datenpersistenz (Session & Report):**  
  * **Anforderung:** Die über den Session-Link zugänglichen Fragebogenfortschritte müssen für die definierte Dauer (z.B. 48 Stunden) zuverlässig gespeichert und abrufbar sein. Generierte Reports müssen über den Session-Link für eine angemessene Dauer (z.B. mindestens 30 Tage oder solange der Session-Link gültig ist) verfügbar bleiben.  
  * **Business Impact:** Nutzerfreundlichkeit ("Save & Continue Later"), Wert des Reports durch Wiederaufrufbarkeit.  
* **Z.3 Fehlerrobustheit (insb. Report-Generierung):**  
  * **Anforderung:** Sollte die Report-Generierung im Einzelfall fehlschlagen, muss der Nutzer eine klare, verständliche Fehlermeldung erhalten. Das System sollte idealerweise einen erneuten Versuch ermöglichen oder den Fehler intern protokollieren, ohne dass die zuvor eingegebenen Fragebogendaten verloren gehen.  
  * **Business Impact:** Positive User Experience auch im Fehlerfall, Möglichkeit zur Fehleranalyse und \-behebung.  
* **Z.4 Geplante Wartung:**  
  * **Anforderung:** Notwendige geplante Wartungsarbeiten sollten, wenn möglich, außerhalb der Kernnutzungszeiten stattfinden und (falls sie die Nutzung beeinträchtigen) frühzeitig angekündigt werden.  
  * **Business Impact:** Minimale Störung für Nutzer, transparente Kommunikation.

### **6.4 Wartbarkeit und Erweiterbarkeit (aus Business-Sicht)**

* **W.1 Anpassbarkeit von Inhalten:**  
  * **Anforderung:** Das System sollte so gestaltet sein, dass Inhalte wie Fragen und Logiken im Fragebogen (insbesondere über das Prompt-Management im Admin-Bereich), die Struktur und Textbausteine der Reports sowie die Artikel in der Wissensdatenbank effizient und ohne tiefgreifende Code-Änderungen durch geschultes Personal aktualisiert und erweitert werden können.  
  * **Business Impact:** Schnelle Reaktionsfähigkeit auf Marktfeedback, iterative Produktverbesserung, Aktualität der Inhalte.  
* **W.2 Architektur für zukünftige Erweiterungen:**  
  * **Anforderung:** Die Softwarearchitektur muss die zukünftige Implementierung der in der Roadmap ("Next", "Later") vorgesehenen Erweiterungen (z.B. Nutzer-Accounts, Premium-Analysemodell, weitere Premium-Features, Bezahlfunktionen) unterstützen und erleichtern.  
  * **Business Impact:** Sicherstellung der langfristigen strategischen Entwicklungsfähigkeit, Effizienz bei der Umsetzung zukünftiger Umsatzquellen.

### **6.5 Initiale Technische Präferenzen/Überlegungen (zur Validierung durch den Architect Agent)**

**Anforderung:** Die folgenden Technologien, Plattformen und Architekturentscheidungen wurden vom Nutzer als initiale Präferenzen für die Umsetzung des "AI Strategy Navigators" genannt. Der Architect Agent wird gebeten, deren Eignung im Kontext der Gesamtarchitektur und der funktionalen sowie nicht-funktionalen Anforderungen detailliert zu bewerten und eine Empfehlung abzugeben:

* **Landing Page (ai-strategy-navigator.com):**  
  * Frontend-Erstellung: Bevorzugt mit **bolt.new** (KI-gestützt).  
  * Technologie: **Next.js** (wegen SEO-Vorteilen).  
  * Deployment: **Netlify** (oft von bolt.new unterstützt).  
  * Repository: **GitHub** (initial von bolt.new angelegt und für das Gesamtprojekt genutzt).  
* **Hauptanwendung (Fragebogen & Report – z.B. app.ai-strategy-navigator.com):**  
  * Frontend-Erstellung: Bevorzugt mit **lovable.dev** (KI-gestützt, spezialisiert auf React).  
  * Technologie: **React**.  
  * Deployment & Repo-Sync: Über die von lovable.dev angebotenen Mechanismen, Synchronisation mit dem bestehenden GitHub Repository.  
* **Backend:**  
  * Bevorzugte Plattform: **Supabase** (wegen guter Integration mit bolt.new, lovable.dev und N8N; bietet Datenbank, Authentifizierung, Edge Functions, Log-Management).  
* **LLM-Interaktion für Agent 1 (Frontend-Chat):** Die LLM-Aufrufe (z.B. Google Gemini 1.5 Pro) für die direkte Chat-Interaktion des **'Gesprächs- und Erfassungs-Agenten (Agent 1)'** erfolgen direkt durch das Backend der Hauptanwendung (z.B. implementiert mit Supabase Edge Functions oder einer anderen serverseitigen Logik). Der Prompt für Agent 1 wird über den /admin-Bereich der Hauptanwendung verwaltet.  
* **Backend-Automatisierung für Datenextraktion und Report-Generierung (N8N):** Die Plattform **N8N** wird für einen **zweistufigen LLM-Prozess** eingesetzt: 1\. Ein **'Extraktions-Agent'** (LLM-Knoten in N8N) empfängt den **rohen Chatverlauf** vom Backend der Hauptanwendung und wandelt ihn in ein **strukturiertes JSON** um. 2\. Ein **'Analyse- und Report-Agent'** (LLM-Knoten in N8N) nutzt dieses JSON (und ggf. weitere Recherche-Daten) zur Erstellung des detaillierten Reports. Die Prompts für diese beiden N8N-internen Agenten werden direkt in N8N gepflegt und feingetunt.  
* Weitere Entwicklungswerkzeuge (beispielhaft genannt): Roo Code, Cursor (Eignung im Kontext des gewählten Stacks zu prüfen). **Business Impact:** Eine klare Kommunikation dieser detaillierten Präferenzen an das technische Team ermöglicht eine fokussierte Evaluierung und beschleunigt potenziell die Technologieauswahl. Die genannten Tools versprechen eine schnelle Entwicklung und Iteration, besonders im Frontend-Bereich, und eine gute Integration für den Backend-Workflow. **Disclaimer:** Diese Nennungen stellen detaillierte Präferenzen des Nutzers dar und dienen als primärer Input für die Evaluierung durch den Architect Agent. Sie ersetzen nicht dessen finale Architekturentscheidung, die alle Anforderungen dieses PRDs berücksichtigen muss.

## **7\. TECHNICAL GUIDANCE (High-Level)**

Dieser Abschnitt dient als erste, übergeordnete technische Orientierung für den Architect Agent und fasst Präferenzen sowie bereits identifizierte technische Rahmenbedingungen zusammen. Er ersetzt keine detaillierte Architekturentscheidung.

### **7.1 Allgemeine Architekturprinzipien (geleitet durch NFRs):**

* Die Architektur soll die in Abschnitt 6 definierten nicht-funktionalen Anforderungen unterstützen, insbesondere hinsichtlich Skalierbarkeit (P.3, P.4), Sicherheit und DSGVO-Konformität (S.1, S.2, S.3, S.5, S.6) sowie Zuverlässigkeit und Verfügbarkeit (Z.1, Z.2).  
* Die Wartbarkeit und Erweiterbarkeit (W.1, W.2) für zukünftige Features (Nutzer-Accounts, Premium-Modell-Aktivierung, etc.) sind bei Architekturentscheidungen von Beginn an zu berücksichtigen.

### **7.2 Initiale Technische Präferenzen/Überlegungen:**

* Es wird auf die detaillierte Liste und Beschreibung in **Abschnitt 6.5** verwiesen.

### **7.3 Integrationspunkte (MVP):**

* Primäre externe Integrationen für den MVP sind:  
  * Die direkte Anbindung des Backends der Hauptanwendung an eine LLM API (z.B. Google Gemini 1.5 Pro) für den **'Gesprächs- und Erfassungs-Agenten (Agent 1)'**.  
  * Die Anbindung von N8N an eine LLM API für den **'Extraktions-Agenten'** und den **'Analyse- und Report-Agenten'**.  
  * Eine definierte Schnittstelle/Mechanismus, über den das Backend der Hauptanwendung den **rohen Chatverlauf** an den N8N-Workflow (zum Extraktions-Agenten) übergibt.  
* Weitere komplexe Integrationen mit externen Drittsystemen (außer Standard-Webtechnologien wie z.B. für Analytics oder ggf. das Feedback-Widget) sind für den MVP nicht vorgesehen.

### **7.4 Technische Entscheidungskriterien (Vorschlag für Architect Agent):**

* Bei Technologieentscheidungen sollten folgende Aspekte berücksichtigt werden: Erfüllung der Anforderungen (funktional und nicht-funktional), Kosten (Entwicklung und Betrieb), Sicherheit, Skalierbarkeit, Wartbarkeit, und die Verfügbarkeit von Know-how im potenziellen Entwicklungsteam sowie die vom Nutzer stark präferierten Werkzeuge und Plattformen (siehe 6.5).

## **8\. CROSS-FUNCTIONAL REQUIREMENTS (High-Level)**

Dieser Abschnitt beschreibt übergreifende Anforderungen, die verschiedene Funktionsbereiche betreffen.

### **8.1 Datenanforderungen (High-Level):**

* **Wesentliche Datenkategorien (MVP):**  
  * Session-/Fragebogen-Daten: **Roher Chatverlauf von Agent 1** und **Strukturiertes JSON der extrahierten Nutzerantworten (Output des Extraktions-Agenten)**, Fortschritt, Session-ID.  
  * Generierte Report-Daten: Der Inhalt des für den Nutzer erstellten Reports, verknüpft mit der Session-ID.  
  * Feedback-Daten: Gesammeltes Nutzerfeedback (aus Widget und Fragebogen-Abschlussbefragung).  
  * Wissens-Nugget-Inhalte: Texte und Metadaten der Wissensdatenbank-Artikel (DE/EN).  
  * Interessensbekundungs-Daten: Gesammelte Informationen von Nutzern, die Interesse am Premium-Modell oder an Beratung bekundet haben.  
  * **Admin-Konfigurationsdaten:** Gespeicherter **Prompt für Agent 1**, Admin-Benutzerinformationen (sicher gehashtes Passwort).  
* **Datenhandhabungsprinzipien:** Die in den NFRs definierten Prinzipien (DSGVO-Konformität, Anonymität der Kernnutzung, Datenintegrität, Datensicherheit) sind maßgeblich.  
* **Datenvolumen (MVP):** Initial wird mit einem moderaten Datenvolumen gerechnet, die Architektur sollte aber die Speicherung und Verarbeitung der Daten von einigen Tausend Nutzern (Reports) pro Jahr ohne Probleme ermöglichen.

### **8.2 Integrationsanforderungen (LLM API):**

* **Die Anbindung an die LLM API muss sowohl für die direkten Aufrufe aus dem Backend der Hauptanwendung (für Agent 1\) als auch für die Aufrufe aus N8N (für Extraktions- und Report-Agent) sicher, performant und robust sein.**  
* Die Latenzzeiten der API-Aufrufe müssen im Kontext der erwarteten Report-Generierungszeit (mehrere Minuten für den Gesamtprozess) handhabbar sein und dürfen diese nicht unnötig verlängern.  
* Das System muss Fehlerzustände der LLM API (z.B. Nicht-Erreichbarkeit, Fehlermeldungen) robust behandeln können.

### **8.3 Operationelle Anforderungen (Business-Perspektive für MVP):**

* **Deployment:** Für den MVP ist ein initiales Deployment auf einer produktiven Umgebung erforderlich, idealerweise unter Nutzung der von bolt.new und lovable.dev vorgeschlagenen Pfade (Netlify, etc.).  
* **Updates/Wartung (Post-MVP):** Es wird erwartet, dass das System nach dem MVP-Launch basierend auf Nutzerfeedback und strategischen Entscheidungen iterativ weiterentwickelt wird. Kleinere Updates und Bugfixes sollten zeitnah möglich sein, größere Feature-Erweiterungen in planbaren Zyklen (z.B. monatlich oder quartalsweise).  
* **Monitoring:** Ein grundlegendes technisches Monitoring der Plattform ist erforderlich, um die Verfügbarkeit sicherzustellen und kritische Fehler frühzeitig zu erkennen (z.B. Server-Erreichbarkeit, Fehler in der Report-Generierung). Supabase bietet hier ggf. bereits integrierte Möglichkeiten.  
* **Support (MVP):** Für den MVP wird kein dediziertes Support-Team benötigt. Nutzerfeedback und Supportanfragen werden initial über den integrierten Feedback-Mechanismus oder eine angegebene E-Mail-Adresse gesammelt und vom Kernteam bearbeitet.  
* **Sicherstellung des Managements für den Admin-Zugang (Passwort-Reset-Prozess für Admins – ggf. initial manuell).**

## **9\. DOKUMENTDETAILS**

### **9.1 Zweck dieses Dokuments:**

Dieses Product Requirement Document (PRD) definiert die Vision, Ziele, Anforderungen und den Scope für das Minimum Viable Product (MVP) des "AI Strategy Navigators". Es dient als zentrale Informationsquelle und Arbeitsgrundlage für alle Projektbeteiligten, insbesondere den Architect Agent und den Scrum Master Agent.

### **9.2 Zielgruppe:**

Projektinitiator/Nutzer, Architect Agent, Scrum Master Agent, potenzielles Entwicklungs- und Designteam.

### **9.3 Version und Datum:**

* Version: 1.0  
* Datum: 11\. Mai 2025

### **9.4 Glossar:**

Ein separates Glossar wird bei Bedarf geführt, falls im Laufe des Projekts spezifische Fachbegriffe oder Abkürzungen häufig verwendet werden, die einer weiteren Klärung bedürfen. Bisher wurde versucht, alle Begriffe im Kontext zu erläutern.

## **10\. PRD & EPIC VALIDATION SUMMARY**

| Category | Status | Kritische Punkte / Offene Fragen für Architect Agent |
| ----- | ----- | ----- |
| 1\. Problem Definition & Context | **PASS** | \- |
| 2\. MVP Scope Definition | **PASS** | \- |
| 3\. User Experience Requirements | **PASS** | \- |
| 4\. Functional Requirements | **PASS** | \- |
| 5\. Non-Functional Requirements | **PASS** | Bewertung initiale Skalierbarkeitsannahme (bis zu 100-200 concurrent users) bzgl. Komplexität/Kosten durch Architect. Definition konkreter Sicherheitsmaßnahmen gegen LLM-Token-Missbrauch. Überlegungen zum Logging von Änderungen im Admin-Bereich (Post-MVP, aber Architektur-relevant). |
| 6\. Epic & Story Structure | **PASS (initial)** | Detaillierung der User Stories durch Scrum Master Agent. |
| 7\. Technical Guidance | **PASS** | Detaillierte Evaluierung der Nutzer-Technologiepräferenzen (Abschnitt 6.5) und der neuen LLM-Interaktionsarchitektur durch Architect Agent. |
| 8\. Cross-Functional Requirements | **PASS** | \- |
| 9\. Clarity & Communication | **PASS** | \- |

In Google Sheets exportieren

In Google Sheets exportieren

**Kritische Defizite (die eine Übergabe verhindern würden):** Keine. Alle wesentlichen Aspekte für die nächste Phase wurden im PRD adressiert und vom Nutzer freigegeben.

**Empfehlungen für den Architect Agent:**

* Detaillierte Evaluierung der vom Nutzer stark präferierten Technologien (bolt.new, lovable.dev, Supabase, N8N) hinsichtlich ihrer Eignung zur Erfüllung aller funktionalen und nicht-funktionalen Anforderungen sowie der langfristigen Wartbarkeit und Skalierbarkeit, **insbesondere im Kontext der neuen zweigeteilten LLM-Interaktionsarchitektur (Backend der Hauptanwendung für Chat mit Agent 1; N8N für Extraktion und finale Reportgenerierung).**  
* Entwurf einer robusten, aber flexiblen Architektur, die den schnellen MVP-Launch ermöglicht und gleichzeitig die in der Roadmap skizzierten zukünftigen Erweiterungen (Nutzer-Accounts, Premium-Funktionen) berücksichtigt.  
* Besonderes Augenmerk auf die sichere und performante Integration der LLM-APIs (sowohl im Backend der Hauptanwendung für Agent 1 als auch in N8N für Extraktions- und Report-Agent) **sowie die Definition der Schnittstelle für die Übergabe der rohen Chatverläufe an N8N.**  
* **Konzeption der Mechanismen zur Prävention von LLM-Token-Missbrauch.**  
* Konzeption der Datenflüsse und \-speicherung unter strikter Beachtung der DSGVO und der Anonymitätsanforderungen für den MVP.  
* Definition einer initialen Deployment-Strategie unter Berücksichtigung der präferierten Tools (Netlify, lovable.dev Deployment).  
* **Architektonische Planung des Admin-Bereichs, insbesondere der Prompt-Verwaltungsfunktionen für Agent 1 und dessen Sicherheit.**

**Finale Entscheidung:** **READY FOR ARCHITECT:** Das PRD ist umfassend, die Anforderungen sind klar definiert und vom Nutzer validiert. Die initiale Epic-Struktur ist vorbereitet (siehe separate Epic-Dokumente). Das Dokument bildet eine solide Grundlage für die nachfolgende Architektur- und Designphase.

