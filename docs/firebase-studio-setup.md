# Firebase Studio Setup & .idx/dev.nix Konfiguration für den AI Strategy Navigator (Überarbeitet)

Dieses Dokument beschreibt die empfohlene Konfiguration der Firebase Studio Entwicklungsumgebung und der `.idx/dev.nix`-Datei für das "AI Strategy Navigator" MVP-Projekt. Ziel ist es, eine konsistente, reproduzierbare und effiziente Entwicklungsumgebung für das `pnpm`-basierte Mono-Repo sicherzustellen, basierend auf aktuellen Validierungen und Best Practices (Mai 2025).

## 1. Voraussetzungen

* Firebase Studio Account
* GitHub Account (verbunden mit Firebase Studio)
* Klon des `ai-strategy-navigator` Mono-Repo auf der lokalen Maschine (oder direkt in Firebase Studio importiert)
* Verständnis der `pnpm` Workspaces und der Mono-Repo-Struktur des Projekts.

## 2. Grundlegende `.idx/dev.nix` Konfiguration

Die Datei `.idx/dev.nix` im Root-Verzeichnis des Projekts ist entscheidend für die Definition der Entwicklungsumgebung in Firebase Studio.

### 2.1. Beispiel einer `dev.nix` für Node.js und pnpm

```nix
# .idx/dev.nix
{ pkgs, ... }: {
  # Definiert die Nixpkgs-Revision für Reproduzierbarkeit.
  # "stable-24.11" wird für eine gute Balance aus Aktualität und Stabilität empfohlen (Stand Mai 2025).
  # Eine periodische Evaluierung (z.B. jährlich) für neuere stabile Channels ist ratsam.
  channel = "stable-24.11";

  # Liste der zu installierenden Systempakete
  packages = [
    pkgs.nodejs_20  # Spezifische Node.js Version (LTS, z.B. v20.x)
    pkgs.pnpm       # pnpm Paketmanager
    # firebase-tools wird über Nix für Konsistenz bereitgestellt.
    # Beachte: Updates sind an den Nixpkgs-Channel gebunden.
    # Seltene Build-Probleme im Nixpkgs-System sind möglich.
    # Die via Nix bereitgestellte Version sollte Priorität haben.
    pkgs.firebase-tools
  ];

  # Workspace Lifecycle Hooks
  idx.workspace = {
    # Wird ausgeführt, wenn der Workspace erstellt oder neu geladen wird
    onCreate = {
      # Stellt sicher, dass exakte Versionen gemäß pnpm-lock.yaml installiert werden.
      install-dependencies = "pnpm install --frozen-lockfile";
      # Weitere Setup-Befehle, falls nötig
    };

    # Definiert, welche Prozesse gestartet werden sollen, wenn der Workspace startet.
    # Oft werden Dev-Server und Emulatoren besser über idx.previews verwaltet.
    # onStart kann für andere Initialisierungsaufgaben genutzt werden.
    onStart = {
      # Beispiel (optional, falls nicht über idx.previews):
      # start-emulators = "firebase emulators:start --import=./firebase-data-emulator --export-on-exit";
    };
  };

  # Konfiguration für Web Previews in Firebase Studio
  idx.previews = [
    {
      name = "Landing Page";
      command = ["pnpm", "--filter", "landing-page", "run", "dev"];
      port = 3000; # Typischer Next.js Port
      # icon = "earth"; # Optional
    }
    {
      name = "Main App";
      command = ["pnpm", "--filter", "main-app", "run", "dev"];
      port = 3001; # Anderer Port für die zweite Next.js App
    }
    {
      name = "Firebase Emulators";
      command = ["firebase", "emulators:start", "--import=./firebase-data-emulator", "--export-on-exit"];
      port = 4000; # Standard Firebase Emulator UI Port
    }
    # Weitere Previews für z.B. Storybook etc.
  ];

  # Umgebungsvariablen für die Entwicklungsumgebung
  # Diese sind nur für die Firebase Studio Workspace-Umgebung,
  # nicht für die deployed Functions oder Frontend-Builds (diese nutzen .env oder Build-Variablen)
  env = {
    # Beispiel:
    # MY_DEV_VARIABLE = "some_value_for_studio_dev_only";
  };

  # VS Code Extensions, die im Firebase Studio Workspace empfohlen/aktiviert werden sollen.
  # IDs und Verfügbarkeit in der Open VSX Registry prüfen!
  # Siehe: [https://firebase.google.com/docs/studio/devnix-reference#idxextensions](https://firebase.google.com/docs/studio/devnix-reference#idxextensions)
  idx.extensions = [
    "dbaeumer.vscode-eslint"
    "esbenp.prettier-vscode"
    "VisualStudioExptTeam.vscodeintellicode"
    # Empfohlene Ergänzungen (Open VSX IDs prüfen!):
    # "Firebase.firebase" # Offizielle Firebase Extension
    # "bradlc.vscode-tailwindcss" # Falls Tailwind CSS genutzt wird
  ];
}

Wichtige Punkte zur dev.nix-Datei:

channel: Legt die Nixpkgs-Version fest. stable-24.11 (Stand Mai 2025) bietet eine gute Balance. Evaluieren Sie periodisch neuere stabile Channels.
packages: Definiert die Systemabhängigkeiten. Die korrekte Node.js-Version (LTS), pnpm und firebase-tools sind hier deklariert. Die Version von firebase-tools aus Nix sollte Priorität haben.
idx.workspace.onCreate: Automatisiert Setup-Schritte wie pnpm install --frozen-lockfile. Dies ist entscheidend für reproduzierbare Builds.
idx.workspace.onStart: Kann verwendet werden, um spezifische Prozesse beim Start des Workspaces auszuführen, aber Dev-Server und Emulatoren werden oft besser über idx.previews gehandhabt.
idx.previews: Konfiguriert die "Web Previews"-Tabs in Firebase Studio. Die command-Pfade und port-Angaben müssen mit den Skripten und Ports in den package.json-Dateien der jeweiligen Anwendungen übereinstimmen.
idx.extensions: Überprüfen Sie die Verfügbarkeit und korrekten IDs der Extensions in der Open VSX Registry.
Commit der .idx/dev.nix und pnpm-workspace.yaml: Diese Dateien müssen unbedingt nach jeder Änderung in das Git-Repository committet werden. Dies ist kritisch, um die Stabilität der Firebase Studio Umgebung, insbesondere bei pnpm-Hooks und Previews, sicherzustellen und unerwartetes Verhalten zu vermeiden.
2.2. Umgang mit pnpm in Firebase Studio
Stelle sicher, dass pkgs.pnpm in dev.nix enthalten ist.
Verwende pnpm install --frozen-lockfile im onCreate-Hook.
Definiere pnpm-basierte Skripte in den package.json-Dateien der einzelnen Workspace-Pakete.
Nutze pnpm --filter <package-name> <script> in den idx.previews und ggf. idx.workspace.onStart-Befehlen.
Wichtig: Committe pnpm-workspace.yaml und .idx/dev.nix nach jeder Änderung, um eine stabile Umgebung in Firebase Studio zu gewährleisten.
3. Firebase Projektkonfiguration (firebase.json) im Mono-Repo
Die firebase.json-Datei im Root-Verzeichnis muss korrekt konfiguriert werden, um die verschiedenen Teile des Mono-Repos (Next.js Frontends via Firebase App Hosting, Cloud Functions) richtig zu deployen.

3.1. Beispiel firebase.json für Firebase App Hosting und Functions

{
  "hosting": [
    {
      "target": "landing-page", // Deploy Target Name
      "source": "apps/landing-page", // Quelle für Firebase App Hosting im Monorepo
      "frameworksBackend": { // Konfiguration für den Cloud Run Dienst (SSR)
        "region": "us-central1" // Beispielregion
      }
      // "site": "<firebase-project-id>-lp" // Wird oft über CLI target:apply gesetzt
      // "public" und "rewrites" werden bei Firebase App Hosting für Next.js meist automatisch gehandhabt.
    },
    {
      "target": "main-app",
      "source": "apps/main-app",
      "frameworksBackend": {
        "region": "us-central1" // Beispielregion
      }
      // "site": "<firebase-project-id>-app"
    }
    // Hinweis: Firebase App Hosting wird für Next.js dringend empfohlen.
    // Es erkennt Next.js-Projekte und konfiguriert vieles automatisch.
    // Die "source"-Angabe ist für Mono-Repos entscheidend.
  ],
  "functions": [
    {
      "source": "packages/functions", // Quellverzeichnis der Cloud Functions
      "codebase": "default",
      "ignore": [
        "node_modules",
        ".git",
        "firebase-debug.log",
        "firebase-debug.*.log",
        "*.tsbuildinfo"
      ],
      "predeploy": [
        // Stellt sicher, dass TypeScript zu JavaScript kompiliert wird vor dem Deploy.
        "pnpm --filter functions run build"
      ]
      // Das "packages/functions"-Verzeichnis muss eine eigene package.json mit allen
      // Laufzeitabhängigkeiten enthalten. Bei Nutzung von lokalen Workspace-Paketen
      // (via "workspace:") muss deren Verfügbarkeit beim Deployment sichergestellt sein.
    }
  ],
  "emulators": {
    "auth": { "port": 9099 },
    "functions": { "port": 5001 },
    "firestore": { "port": 8080 },
    "hosting": { "port": 5000 }, // Port für traditionelles Hosting, App Hosting Emulation kann anders sein
    "ui": { "enabled": true, "port": 4000 },
    "singleProjectMode": true,
    "storage": { "port": 9199 }
    // "pubsub": { "port": 8085 } // Falls Pub/Sub Emulator genutzt wird
  }
}

Wichtige Punkte zur firebase.json:

hosting: Für jede Next.js-Anwendung sollte Firebase App Hosting verwendet werden.
Definiere separate Konfigurationen mit target und der entscheidenden source-Eigenschaft, die auf das jeweilige App-Verzeichnis im Mono-Repo zeigt.
frameworksBackend konfiguriert den zugehörigen Cloud Run Dienst (z.B. Region).
public und rewrites werden bei App Hosting für Next.js meist automatisch gehandhabt.
functions:
Die source-Eigenschaft muss auf das Verzeichnis packages/functions zeigen.
Der predeploy-Hook ist essentiell für den Build-Schritt (z.B. TypeScript-Kompilierung).
Das packages/functions-Verzeichnis muss eine eigene package.json mit allen Laufzeitabhängigkeiten haben. Wenn lokale Workspace-Pakete (z.B. shared-types) via workspace:-Protokoll eingebunden sind, muss sichergestellt werden, dass diese beim Deployment korrekt für die Functions-Umgebung aufgelöst oder gebündelt werden.
emulators: Konfiguration für die Firebase Emulator Suite, um lokale Tests zu ermöglichen.
4. Wichtige Befehle für pnpm Mono-Repo
Abhängigkeiten installieren (im Root): pnpm install (oder pnpm install --frozen-lockfile in CI/onCreate)
Abhängigkeit zu einem spezifischen Paket hinzufügen: pnpm --filter <package-name> add <dependency-name>
Dev-Server für eine App starten: pnpm --filter landing-page run dev (oder das Skript, das in package.json definiert ist)
Alle Pakete bauen: pnpm run build --recursive (wenn Skripte entsprechend definiert sind) oder spezifisch pnpm --filter <package-name> run build
Linting für alle Pakete: pnpm run lint --recursive (wenn Skripte entsprechend definiert sind)
5. Troubleshooting und Best Practices
Immer die .idx/dev.nix UND pnpm-workspace.yaml committen: Änderungen an diesen Dateien müssen versioniert werden, um die Stabilität der Firebase Studio Umgebung und insbesondere das korrekte Verhalten von pnpm-gesteuerten Prozessen in Hooks und Previews sicherzustellen.
Firebase Emulator Suite intensiv nutzen: Für schnelles lokales Testen.
Logs prüfen: Firebase Studio Logs, Firebase Emulator Logs und später Cloud Logging.
Firebase CLI Versionierung: Die über Nix (pkgs.firebase-tools) bereitgestellte Version sollte Priorität haben, um Konflikte mit eventuell lokal installierten Versionen zu vermeiden.
Start klein: Bei Problemen mit dem Mono-Repo-Setup oder pnpm in Firebase Studio, beginne mit einer minimalen Konfiguration.
Firebase App Hosting für Next.js: Dringend empfohlen für eine optimierte Deployment-Erfahrung.
Abhängigkeiten in packages/functions: Stelle sicher, dass die package.json im Functions-Ordner alle notwendigen Laufzeitabhängigkeiten enthält.

