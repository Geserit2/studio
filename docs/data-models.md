## **7. Datenmodelle (Logisch für Supabase)**

Dieses Artefakt beschreibt die logischen Datenmodelle für die PostgreSQL-Datenbank, die von Supabase bereitgestellt wird. Primärschlüssel sind fett markiert. Fremdschlüsselbeziehungen und wichtige Indizes werden erwähnt. Row Level Security (RLS) ist für die meisten Tabellen essenziell, insbesondere für solche, auf die direkt vom Frontend zugegriffen wird.

1.  **`sessions`** (oder `chat_sessions`)
    * **`id`**: `UUID` (PK, Standard: `uuid_generate_v4()`, eindeutige `sessionId`)
    * `created_at`: `TIMESTAMPZ` (Standard: `now()`)
    * `updated_at`: `TIMESTAMPZ` (Standard: `now()`)
    * `status`: `TEXT` (z.B. 'active', 'summary\_pending', 'raw\_chat\_completed', 'report\_generation\_requested', 'report\_generated', 'report\_failed', 'archived')
    * `language_code`: `TEXT` (z.B. 'de', 'en', Standard: 'de')
    * `report_type`: `TEXT` (Standard: 'standard'; später erweiterbar für 'premium')
    * `last_state_json`: `JSONB` (Optional, für "Save & Continue Later" - speichert den minimal notwendigen Zustand des Chats, um ihn fortsetzen zu können)
    * `user_id`: `UUID` (Nullable, FK zu `auth.users` - für spätere Nutzer-Accounts und Zuordnung von Sessions zu eingeloggten Nutzern)
    * **Indizes:** `status`, `user_id`, `created_at`.

2.  **`raw_chat_history`**
    * **`id`**: `BIGSERIAL` (PK)
    * `session_id`: `UUID` (FK zu `sessions.id` ON DELETE CASCADE, Nicht Null, Indiziert)
    * `timestamp`: `TIMESTAMPZ` (Standard: `now()`)
    * `sender`: `TEXT` ('user' oder 'agent', Nicht Null)
    * `message_content`: `TEXT` (Nicht Null)
    * `message_metadata`: `JSONB` (Optional, z.B. für Agenten-Nachrichten-IDs, Tokens, etc.)
    * **Indizes:** `session_id`, `timestamp`.

3.  **`extracted_chat_data`** (Daten, die N8N aus dem `raw_chat_history` extrahiert)
    * **`id`**: `BIGSERIAL` (PK)
    * `session_id`: `UUID` (FK zu `sessions.id` ON DELETE CASCADE, Unique, Nicht Null, Indiziert)
    * `created_at`: `TIMESTAMPZ` (Standard: `now()`)
    * `structured_json_data`: `JSONB` (Output des N8N Extraktions-Agenten, enthält die relevanten Informationen aus dem Chat in strukturierter Form)
    * `processing_version`: `TEXT` (Optional, Version des Extraktions-Prompts/Logik)

4.  **`generated_reports`**
    * **`id`**: `BIGSERIAL` (PK)
    * `session_id`: `UUID` (FK zu `sessions.id` ON DELETE CASCADE, Unique, Nicht Null, Indiziert)
    * `created_at`: `TIMESTAMPZ` (Standard: `now()`)
    * `report_json_data`: `JSONB` (Finaler Report als JSON von N8N, optimiert für die Frontend-Anzeige)
    * `report_version`: `INTEGER` (Optional, Version des Report-Generierungs-Prompts/Logik)
    * `language_code`: `TEXT` (z.B. 'de', 'en', um die Sprache des Reports zu kennzeichnen)

5.  **`feedback`**
    * **`id`**: `BIGSERIAL` (PK)
    * `session_id`: `UUID` (Nullable, FK zu `sessions.id` ON DELETE SET NULL)
    * `created_at`: `TIMESTAMPZ` (Standard: `now()`)
    * `context_url`: `TEXT` (Die URL/Seite, auf der das Feedback gegeben wurde)
    * `feedback_text`: `TEXT` (Der eigentliche Feedback-Text)
    * `rating`: `INTEGER` (Optional, z.B. 1-5 Sterne)
    * `user_id`: `UUID` (Nullable, FK zu `auth.users` - falls Feedback von eingeloggtem Nutzer kommt)
    * `type`: `TEXT` (Optional, z.B. 'widget', 'post_questionnaire')
    * **Indizes:** `created_at`, `type`.

6.  **`interest_submissions`** (Für CTA-Klicks und Interesse an Premium)
    * **`id`**: `BIGSERIAL` (PK)
    * `session_id`: `UUID` (Nullable, FK zu `sessions.id` ON DELETE SET NULL)
    * `created_at`: `TIMESTAMPZ` (Standard: `now()`)
    * `interest_type`: `TEXT` ('premium\_model\_notification', 'expert\_talk\_request', etc., Nicht Null)
    * `source_page`: `TEXT` (Die Seite, von der die Interessensbekundung kam, z.B. '/report', '/premium-info')
    * `user_id`: `UUID` (Nullable, FK zu `auth.users`)
    * **Indizes:** `interest_type`, `created_at`.

7.  **`knowledge_nuggets`**
    * Diese Tabelle dient als **Fallback oder alternative Datenquelle**, falls die primäre Markdown/Git-basierte Verwaltung der Wissens-Nuggets über Lovable.dev für bestimmte Anwendungsfälle nicht ausreicht oder dynamischere Aspekte benötigt werden. Die Hauptquelle für die Wissensdatenbank sind Markdown-Dateien.
    * **`id`**: `SERIAL` (PK)
    * `slug`: `TEXT` (Unique, Nicht Null, Indiziert)
    * `title_de`: `TEXT` (Nicht Null)
    * `title_en`: `TEXT` (Nicht Null)
    * `content_markdown_de`: `TEXT`
    * `content_markdown_en`: `TEXT`
    * `category_de`: `TEXT`, `category_en`: `TEXT`
    * `tags_de`: `TEXT[]`, `tags_en`: `TEXT[]`
    * `publish_date`: `DATE`
    * `created_at`: `TIMESTAMPZ` (Standard: `now()`)
    * `updated_at`: `TIMESTAMPZ` (Standard: `now()`)
    * `is_published`: `BOOLEAN` (Standard: `false`)
    * **Indizes:** `slug`, `category_de`, `category_en`, `publish_date`, `is_published`.

8.  **`admin_prompts_config`** (Zur Verwaltung des System-Prompts für Agent 1)
    * **`id`**: `SERIAL` (PK)
    * `agent_identifier`: `TEXT` (Unique, Nicht Null, z.B. 'agent_1_questionnaire_de', 'agent_1_questionnaire_en')
    * `prompt_text`: `TEXT` (Nicht Null)
    * `version`: `INTEGER` (Standard: 1)
    * `is_active`: `BOOLEAN` (Standard: `true`, es sollte nur ein aktiver Prompt pro `agent_identifier` existieren)
    * `description`: `TEXT` (Optional, zur Beschreibung des Prompts)
    * `updated_at`: `TIMESTAMPZ` (Standard: `now()`)
    * `updated_by`: `TEXT` (Optional, E-Mail oder ID des Admins)
    * **Indizes:** `agent_identifier`, `is_active`.

**Wichtige Überlegungen für alle Tabellen:**

* **Row Level Security (RLS):** Für alle Tabellen, die sensible Daten enthalten oder auf die direkt vom Frontend zugegriffen wird (`feedback`, `interest_submissions`, `generated_reports` etc.), müssen strikte RLS-Policies implementiert werden. Generell gilt: `anon` Rolle sollte nur minimal notwendige Rechte haben (z.B. `INSERT` auf `feedback`). Authentifizierte Nutzer (`authenticated` Rolle) dürfen nur auf ihre eigenen Daten zugreifen, es sei denn, es handelt sich um öffentliche Daten. Admins (spezielle Rolle oder über `user_metadata` in `auth.users`) haben erweiterte Rechte.
* **Indizes:** Sorgfältig gewählte Indizes sind entscheidend für die Performance von Leseoperationen.
* **Foreign Keys und Kaskadierung:** `ON DELETE CASCADE` oder `ON DELETE SET NULL` sollte je nach Anforderung bei Fremdschlüsseln verwendet werden, um Datenintegrität zu wahren.
* **Timestamps:** `created_at` und `updated_at` Felder sind für die Nachverfolgung von Änderungen wichtig. Trigger können verwendet werden, um `updated_at` automatisch zu aktualisieren.
* **Validierungen:** Constraints (z.B. `NOT NULL`, `UNIQUE`, `CHECK`) sollten genutzt werden, um die Datenqualität auf Datenbankebene sicherzustellen.