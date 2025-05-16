## **8. Dokumentation von Umgebungsvariablen (Initial)**

Dieses Artefakt listet die initial erwarteten Umgebungsvariablen für die verschiedenen Teile der Anwendung auf. Namen, die mit `VITE_` (für Vite-basierte React-Anwendungen, Annahme für Lovable.dev) oder `REACT_APP_` (traditionelles Create React App Muster) beginnen, sind clientseitig im Frontend zugänglich. **Niemals Secrets clientseitig zugänglich machen!** Secrets sollten sicher in den Umgebungseinstellungen der jeweiligen Hosting-Plattformen (Lovable.dev, PaaS für Node.js, N8N) verwaltet werden.

Eine `.env.example`-Datei sollte in jedem Paket und im Root-Verzeichnis des Mono-Repos bereitgestellt werden, um Entwicklern die benötigten Variablen aufzuzeigen.

**Für `packages/landing-page` (React via Lovable.dev):**

* `VITE_MAIN_APP_URL="https://app.ai-strategy-navigator.com"` (URL der Hauptanwendung, für Links)
* `VITE_SUPABASE_URL="https://<your-project-ref>.supabase.co"` (Falls direkter Supabase-Zugriff für z.B. Feedback-Widget benötigt)
* `VITE_SUPABASE_ANON_KEY="your-anon-key"` (Falls direkter Supabase-Zugriff benötigt)
* `VITE_PRERENDERING_SERVICE_TOKEN="your_prerender_service_token"` (Optional, falls der Prerendering-Dienst eine clientseitige Komponente oder Token benötigt)
* *(Weitere Variablen könnten von Lovable.dev selbst oder dem gewählten Deployment-Ziel wie Netlify/Vercel benötigt werden, z.B. für Build-Prozesse oder Feature Flags).*

**Für `packages/app-frontend` (React via Lovable.dev):**

* `VITE_NODE_PROXY_WEBSOCKET_URL="wss://proxy.ai-strategy-navigator.com/chat"` (WebSocket URL des Node.js Proxys)
* `VITE_SUPABASE_URL="https://<your-project-ref>.supabase.co"` (Für direkten Supabase-Zugriff)
* `VITE_SUPABASE_ANON_KEY="your-anon-key"` (Für direkten Supabase-Zugriff)
* `VITE_LANDING_PAGE_URL="https://ai-strategy-navigator.com"` (URL der Landing Page, für Links)
* *(Auch hier könnten weitere Variablen von Lovable.dev oder dem Deployment-Ziel benötigt werden).*

**Für `packages/node-proxy-service` (Node.js Backend):**
    _(Alle diese Variablen sind serverseitig und **SECRETS** sollten entsprechend geschützt werden)_

* `PORT=10000` (Port, auf dem der Proxy-Server lauscht)
* `CORS_ORIGIN="https://app.ai-strategy-navigator.com,https://ai-strategy-navigator.com,http://localhost:xxxx"` (Comma-separated list of allowed origins for CORS)
* `SUPABASE_URL="https://<your-project-ref>.supabase.co"` **(SECRET)**
* `SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"` **(SECRET)** (Für vollen DB-Zugriff vom Backend)
* `GEMINI_API_KEY="your-google-gemini-api-key"` **(SECRET)**
* `GEMINI_MODEL_NAME_AGENT1="gemini-1.5-flash"` (Konfigurierbares Modell für Agent 1)
* `N8N_WEBHOOK_URL_REPORT_GENERATION="your-n8n-webhook-url"` **(SECRET, da Endpunkt bekannt sein muss)**
* `ADMIN_USERNAME_APP_MAIN="admin_user"` (Für Basis-Auth der Admin-Prompt-Endpunkte, falls nicht über Supabase Auth gelöst)
* `ADMIN_PASSWORD_HASH_APP_MAIN="hashed_password"` **(SECRET)** (Falls Basis-Auth verwendet wird)
* `LOG_LEVEL="info"` (z.B. 'debug', 'info', 'warn', 'error')

**Für N8N (Credentials in N8N):**
    _(Diese werden direkt in der N8N-Oberfläche als Credentials konfiguriert und nicht als Umgebungsvariablen im herkömmlichen Sinne für den N8N-Prozess selbst, es sei denn, N8N wird self-hosted mit .env betrieben.)_

* `N8N_CRED_SUPABASE_SERVICE_KEY` (Supabase Service Role Key für DB-Zugriff)
* `N8N_CRED_GEMINI_API_KEY` (Google Gemini API Key für LLM-Aufrufe)

**Generelle Hinweise:**

* **Secrets Management:** Alle als `(SECRET)` markierten Variablen müssen sicher verwaltet werden (z.B. über die Secret-Stores der Hosting-Plattformen, Lovable.dev-Einstellungen für Secrets, HashiCorp Vault etc.) und dürfen niemals direkt in den Code oder das Git-Repository eingecheckt werden.
* **`.env` Dateien:** Für die lokale Entwicklung sollten `.env` Dateien verwendet werden, die von Git ignoriert werden (`.gitignore`).
* **Konsistenz:** Die Namen der Umgebungsvariablen sollten konsistent über die verschiedenen Services hinweg sein, wo immer möglich.
* **Dokumentation:** Jede Variable sollte klar dokumentiert sein (Zweck, Beispielwert, ob optional oder notwendig).