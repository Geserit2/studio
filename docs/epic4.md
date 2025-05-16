# **Epic 4: Wissensdatenbank ("Wissens-Nuggets" SEO-optimiert auf Landing Page) (Technisch Angereichert)**

## **Goal**

Bereitstellung einer grundlegenden, mehrsprachigen (**DE/EN**), durchsuchbaren und **SEO-optimierten Wissensdatenbank** ("**Wissens-Nuggets**"). Diese soll ca. **15-20 initiale Artikel** umfassen, die grundlegende **KI**\-Begriffe sowie die im Report verwendeten Konzepte verständlich erklären. Die **Wissensdatenbank** ist integraler Bestandteil der **Landing Page (`ai-strategy-navigator.com`)**, die mit **React** (**Lovable.dev** generiert und verwaltet) erstellt wird. Die Inhalte werden als **Markdown-Dateien im Git-Repository** (`packages/landing-page/src/content/wissens-nuggets/`) verwaltet und über **Lovable.dev** synchronisiert. Für optimale **SEO** wird eine **Build-Time Content Generation** (**Markdown** zu HTML/**React**\-Komponenten) und eine **Prerendering-Strategie** für die resultierenden **React SPA**\-Seiten eingesetzt. **Lovable.dev** wird genutzt, um Komponenten für die Anzeige und Filterung der Nuggets zu generieren und **SEO**\-Features (Meta-Tags, strukturierte Daten) via **Prompts** oder Anpassungen im "Dev Mode" zu **implementieren**.

## **Deployability**

Dieses Epic baut auf **Epic 1** (Initiales Setup der **Landing Page** mit **React**/**Lovable.dev** und **Prerendering-Strategie**) auf. Es kann parallel zu **Epic 2** und **3** entwickelt werden. Für die volle Nutzererfahrung von **Epic 3** (**kontextuelle Links** aus dem Report auf `app.ai-strategy-navigator.com` zu den **Wissens-Nuggets** auf `ai-strategy-navigator.com`) ist die Fertigstellung dieses Epics notwendig. Nach Abschluss ist die **Wissensdatenbank** für Nutzer öffentlich auf der Hauptdomain zugänglich, bietet eigenständigen Mehrwert, ist für Suchmaschinen optimiert und die Inhalte sind über den **Lovable.dev**/**GitHub**\-**Workflow** pflegbar.

## **Epic-Specific Technical Context (Technisch Angereichert)**

### **Content-Management-Strategie (Markdown/Git-basiert via Lovable.dev)**

* Inhalte der **Wissens-Nuggets** (Artikel) werden als **Markdown-Dateien (`.md`)** in einer definierten Ordnerstruktur innerhalb des `packages/landing-page`\-Projekts verwaltet (z.B. `packages/landing-page/src/content/wissens-nuggets/{sprache}/{slug}.md`). **Lovable.dev's GitHub**\-Sync-Feature hält diese Dateien synchron.  
* Jede **Markdown**\-Datei enthält **Frontmatter** (**YAML**\-Block am Anfang) zur Definition von Metadaten wie `title`, `slug`, `language`, `category`, `tags`, `description` (für **SEO**), `publishDate`.  
* Änderungen oder Neuerstellungen von `.md`\-Dateien im **Git-Repository** werden von **Lovable.dev** erkannt und triggern automatisch einen **Build- und Deployment-Prozess der Landing Page** (via **Lovable Publishing** oder angebundene Dienste wie **Netlify**/**Vercel**).  
* Der Build-Prozess (wahrscheinlich Vite-basiert im Hintergrund von **Lovable.dev**) muss die **Markdown**\-Dateien parsen (inkl. **Frontmatter**) und sie entweder in HTML umwandeln oder als Datenobjekte für **React**\-Komponenten aufbereiten. Diese aufbereiteten Inhalte werden dann von der **Prerendering-Lösung** erfasst.

  ### **Frontend-Entwicklung (`packages/landing-page` \- React/Lovable.dev)**

* **Lovable.dev-Prompts** werden verwendet, um **UI**\-Komponenten für die Darstellung der **Wissensdatenbank** zu generieren:  
  * Eine **Übersichtsseite** (z.B. `/wissen`): **Lovable.dev** generiert Komponenten, die zur Build-Zeit die geparsten **Markdown**\-Daten (Titel, Teaser, Metadaten) für alle Nuggets lesen und als Liste oder Kacheln darstellen. Filter- und Such-**UI**\-Elemente werden ebenfalls via **Prompt** erstellt.  
  * **Dynamisch generierte Detailseiten** für jeden **Wissens-Nugget** (z.B. `/wissen/{slug}`): **Lovable.dev** generiert Template-Komponenten, die zur Build-Zeit für jeden Artikel mit dem geparsten **Markdown**\-Inhalt (umgewandelt in HTML oder direkt von einer **React**\-**Markdown**\-Komponente gerendert) und den **Frontmatter**\-Metadaten gefüllt werden.  
* **Implementierung** einer **clientseitigen Suchfunktion** (z.B. mit `fuse.js` oder einer ähnlichen leichtgewichtigen Bibliothek). Diese wird im **Lovable.dev** "Dev Mode" in die Übersichtsseiten-Komponente integriert und nutzt die zur Build-Zeit aufbereiteten Artikeldaten.  
* **Markdown-Verarbeitung im Build-Prozess:** Konfiguration von Vite-kompatiblen **Markdown**\-Prozessoren (z.B. `vite-plugin-md`, `remark` / `rehype` mit Plugins wie `remark-html`, `remark-prism` für Code-Highlighting) im **Lovable.dev** "Dev Mode", falls die Standard-**Lovable.dev**\-Funktionen nicht ausreichen. Ziel ist es, **Markdown** zur Build-Zeit in **React**\-Komponenten oder direkt in sicheres HTML umzuwandeln.  
* **SEO-Optimierung (React SPA mit Prerendering):**  
  * Der in **Epic 1** eingerichtete **Prerendering-Dienst** stellt sicher, dass Suchmaschinen-Crawler vollständig gerenderte, statische HTML-Versionen der **Wissens-Nugget**\-Seiten erhalten.  
  * **Dynamische Meta-Tags via `react-helmet-async`**: **Lovable.dev-Prompts** erstellen Komponenten oder passen bestehende an, um `<title>`, `<meta description>`, OpenGraph-Tags etc. basierend auf den **Frontmatter**\-Daten der jeweiligen **Markdown**\-Datei zu setzen (Details siehe **T-SEO.1**).  
  * **Strukturierte Daten (JSON-LD)**: Komponenten generieren dynamisch `Article`, `FAQPage` (falls zutreffend), und `BreadcrumbList` Schemata für jede **Wissens-Nugget**\-Seite. **Lovable.dev-Prompts** können zur Erstellung dieser Logik genutzt werden, oder sie wird im "Dev Mode" **implementiert**.  
  * Generierung von `sitemap.xml` und `robots.txt` zur Build-Zeit (siehe **T-SEO.2**).  
* Sicherstellung der Mehrsprachigkeit (**DE/EN**) durch die Ordnerstruktur der **Markdown**\-Dateien und entsprechende Routing-Logik in der **React**\-Anwendung (ggf. mit `react-router-dom` und einer i18n-Bibliothek wie `i18next`, konfiguriert im **Lovable.dev** "Dev Mode").

  ### **Lovable.dev Workflow**

* **Prompts** für die initiale Generierung der Seitenlayouts (Übersicht, Detail), der Komponenten zur Artikeldarstellung und Basis-**SEO**\-Funktionen.  
* **"Dev Mode"** für die Integration der **Markdown**\-Verarbeitungs-Pipeline, der clientseitigen Suchlogik, der `react-helmet-async`\-Nutzung und der Konfiguration von Vite-Plugins (falls notwendig).  
* **"Knowledge Files"** für **Lovable.dev**, die den Aufbau der **Wissensdatenbank**, die Struktur der **Markdown**\-Dateien (**Frontmatter**\-Felder) und die spezifischen **SEO**\-Anforderungen detailliert beschreiben, um die **KI**\-Generierung zu optimieren.  
* **GitHub-Sync** für die Verwaltung der **Markdown**\-Content-Dateien und des gesamten `landing-page`\-Paket-Codes.

# **Story List (Technisch Angereichert für Epic 4 \- Fokus auf Lovable.dev Workflow)**

### **Story 4.1 (Überarbeitet): Auf SEO-optimierte Wissens-Nuggets zugreifen und lesen (React SPA mit Prerendering via Lovable.dev)**

* **User Story / Goal:** Als Nutzer möchte ich auf der mit **Lovable.dev** erstellten **Landing Page** **Wissens-Nuggets** in einer ansprechenden **UI** lesen können. Diese Seiten sollen dank **Prerendering** schnell laden und von Suchmaschinen optimal indexiert werden.  
* **Detailed Requirements:** **Lovable.dev** generiert die Detailseiten-Komponente, die **Markdown**\-Inhalt und **Frontmatter**\-Daten anzeigt. **Prerendering**\-Dienst liefert statisches HTML an Crawler.  
* **ACs:** **Wissens-Nugget**\-Detailseiten sind über **SEO**\-freundliche **URLs** erreichbar, werden korrekt gerendert (sowohl **SPA** als auch prerendered Version); Inhalte sind indexierbar.

  ### **Story 4.2 (Überarbeitet): Wissens-Nuggets durchsuchen und filtern (Lovable.dev UI & clientseitige Logik)**

* **User Story / Goal:** Als Nutzer möchte ich auf der von **Lovable.dev** generierten **Wissensdatenbank**\-Übersichtsseite die Artikel nach Schlagwörtern durchsuchen und nach Kategorien/Tags filtern können, um schnell relevante Informationen zu finden.  
* **Detailed Requirements:** **Lovable.dev-Prompt** zur Erstellung der **UI**\-Elemente für Suche und Filter. Clientseitige Suchlogik (z.B. `fuse.js`) wird im "Dev Mode" integriert und greift auf die zur Build-Zeit aufbereiteten Artikeldaten zu.  
* **ACs:** Live-Suche liefert relevante Ergebnisse; Filterung aktualisiert Ergebnisliste korrekt.

  ### **Story 4.3 (Überarbeitet): Wissens-Nuggets und deren UI in Deutsch oder Englisch nutzen (Lovable.dev & React i18n)**

* **User Story / Goal:** Als Nutzer möchte ich die von **Lovable.dev** erstellten **Wissens-Nugget**\-Seiten und die zugehörigen **UI**\-Elemente in Deutsch oder Englisch nutzen können, basierend auf sprachspezifischen **Markdown**\-Dateien und einer einfach bedienbaren **Sprachumschaltung**.  
* **Detailed Requirements:** **Lovable.dev-Prompt** zur Generierung eines **Sprachumschalters**. **React**\-Routing und i18n-Logik (im "Dev Mode") laden sprachspezifische Inhalte.  
* **ACs:** Wechsel zwischen Sprachversionen der Artikel und der **UI** ist möglich.

  ### **Story 4.4: Vom Strategie-Report zu Wissens-Nuggets springen**

* (Unverändert in der Anforderung, technische Umsetzung im Report-**Frontend**)

  ### **Story 4.5 (Überarbeitet): Inhalte für Wissens-Nuggets via Markdown/Git und Lovable.dev-Sync verwalten**

* **User Story / Goal:** Als Administrator oder Content Manager möchte ich Inhalte für **Wissens-Nuggets** durch Erstellen oder Bearbeiten von **Markdown**\-Dateien im **Git-Repository** (`packages/landing-page/src/content/wissen/`) verwalten. **Lovable.dev** soll diese Änderungen automatisch synchronisieren und die **Landing Page** auf der Hosting-Plattform aktualisieren.  
* **Detailed Requirements:** Definition einer klaren Ordner- und Dateibenennungskonvention; Dokumentation des **Frontmatter**\-Formats; **CI/CD**\-Prozess (**Lovable Publishing** oder **Netlify**/**Vercel** via **GitHub-Sync**) löst Rebuild aus.  
* **ACs:** Änderungen an **Markdown**\-Dateien im **Git** führen zu aktualisierten Inhalten auf der Live-Seite.

  ### **Story 4.6 (Überarbeitet): Datenmodell/Struktur und Abruflogik für Wissens-Nuggets (Markdown, Build-Time mit Lovable.dev/Vite) implementieren**

* **User Story / Goal:** Als Entwickler, der **Lovable.dev** nutzt, möchte ich die **KI** anweisen und ggf. im "Dev Mode" anpassen, eine Struktur zu **implementieren**, bei der **Markdown**\-Dateien (inkl. **Frontmatter**) zur Build-Zeit (wahrscheinlich mit Vite-Plugins im **Lovable.dev**\-Kontext) gelesen, geparst und als Datenquelle für die von **Lovable.dev** generierten **React**\-Komponenten (Übersichts- und Detailseiten) dienen. Diese Komponenten werden dann vom **Prerendering-Dienst** verarbeitet.  
* **Detailed Requirements:** Konfiguration des Build-Prozesses im **Lovable.dev**\-Umfeld (ggf. Anpassung der `vite.config.ts` im "Dev Mode") zur Einbindung von **Markdown**\-Verarbeitungstools. Sicherstellung, dass die Datenstruktur für die **React**\-Komponenten optimal ist.  
* **ACs:** `getStaticProps`\-ähnliche Funktionalität (Datenladen zur Build-Zeit) ist für die **Wissens-Nugget**\-Seiten **implementiert**; Geparsed **Markdown**\-Inhalte und Metadaten sind in den **React**\-Komponenten verfügbar.

  ### **Story 4.7 (Überarbeitet): State-of-the-Art SEO für Wissens-Nugget-Seiten (React SPA) sicherstellen (Lovable.dev Prompts & Dev Mode)**

* **User Story / Goal:** Als Entwickler, der **Lovable.dev** nutzt, möchte ich die **KI** via **Prompts** anweisen und ggf. im "Dev Mode" Anpassungen vornehmen, um sicherzustellen, dass alle **Wissens-Nugget**\-Seiten (**React SPA**) State-of-the-Art **SEO**\-Praktiken folgen (dynamische Meta-Tags via `react-helmet-async`, `hreflang` für Sprachversionen, **JSON-LD** für strukturierte Daten, Generierung von `sitemap.xml` und `robots.txt`, Optimierung für Core Web Vitals im Rahmen der **Prerendering-Strategie**).  
* **Detailed Requirements:** Siehe technische User Stories **T-SEO.1** und **T-SEO.2**. **Lovable.dev-Prompts** zur Generierung von Komponenten, die **JSON-LD** ausgeben. Überprüfung der prerendered Seiten auf korrekte **SEO**\-Elemente.  
* **ACs:** Alle definierten **SEO**\-Maßnahmen sind umgesetzt und validierbar (z.B. mit **Google Rich Results Test**, Lighthouse).

## **Dependencies**

Technisch Angereicherter **Epic 1** (Setup **Landing Page** mit **React**/**Lovable.dev**, **CI/CD**, **Prerendering-Dienst**); Initiale Inhalte für **Wissens-Nuggets** (**Markdown**\-Dateien).

## **Acceptance Criteria**

* Die **Wissensdatenbank** ist auf der `ai-strategy-navigator.com` **Landing Page** unter einem definierten Pfad (z.B. `/wissen`) zugänglich.  
* Alle initialen **Wissens-Nuggets** sind als **Markdown**\-Dateien im Repository vorhanden und werden als einzelne, **SEO-optimierte** und prerenderte **React**\-Seiten (**DE/EN**) angezeigt.  
* Die Such- und Filterfunktionen auf der Übersichtsseite funktionieren wie spezifiziert.  
* Inhalte können durch Hinzufügen/Bearbeiten von **Markdown**\-Dateien und einen **Git**\-Push (Merge), synchronisiert durch **Lovable.dev**, aktualisiert werden, was zu einem automatischen Rebuild und **Deployment** führt.  
* Alle in Story **4.7** und den technischen **SEO**\-Stories definierten **SEO**\-Maßnahmen sind umgesetzt.  
* Die Verlinkung von der Report-Anzeige (**Epic 3**) zu den **Wissens-Nuggets** ist funktionsfähig.
