
# Schritt-für-Schritt-Anleitung: Word-by-Word Chat mit Google Gemini API

Diese Anleitung führt Sie durch alle Schritte zur Reproduktion des Word-by-Word Chat-Projekts, basierend auf dem vorliegenden Quellcode. Sie werden sowohl das React-Frontend als auch das Node.js-Backend einrichten, konfigurieren und miteinander verbinden.

## Inhaltsverzeichnis

1. [Vorbereitung & Voraussetzungen](#1-vorbereitung--voraussetzungen)
2. [Frontend-Setup](#2-frontend-setup)
3. [Backend-Setup](#3-backend-setup)
4. [Google Gemini API Integration](#4-google-gemini-api-integration)
5. [Deployment auf Render.com](#5-deployment-auf-rendercom)
6. [Verbindung von Frontend und Backend](#6-verbindung-von-frontend-und-backend)
7. [Testen der Anwendung](#7-testen-der-anwendung)
8. [Fehlerbehandlung & Troubleshooting](#8-fehlerbehandlung--troubleshooting)
9. [Häufig gestellte Fragen](#9-häufig-gestellte-fragen)

## 1. Vorbereitung & Voraussetzungen

### Benötigte Tools

- [Node.js](https://nodejs.org/) (v16 oder neuer)
- [npm](https://www.npmjs.com/) oder [yarn](https://yarnpkg.com/)
- Code-Editor (z.B. [VS Code](https://code.visualstudio.com/))
- Git (optional, für Versionskontrolle)

### Benötigte Accounts & API-Schlüssel

1. **Google Cloud Platform Account**
   - Registrieren Sie sich unter [console.cloud.google.com](https://console.cloud.google.com/)
   - Erstellen Sie ein neues Projekt für die Gemini API
   - Aktivieren Sie die "Generative Language API" in der API-Bibliothek
   - Erstellen Sie einen API-Schlüssel unter "Credentials" (wird als `GEMINI_API_KEY` verwendet)

2. **Render.com Account**
   - Registrieren Sie sich unter [render.com](https://render.com/)
   - Dieser wird für das Hosting des Node.js-Backends benötigt
   - Optional: Richten Sie einen Deploy-Hook ein (wird als `RENDER_DEPLOY_HOOK` verwendet)

### Projektstruktur vorbereiten

Erstellen Sie eine Arbeitsverzeichnis für Ihr Projekt:

```bash
mkdir word-by-word-chat
cd word-by-word-chat
```

## 2. Frontend-Setup

### 2.1 Projekt initialisieren

Wir verwenden Vite zum Erstellen eines neuen React-Projekts mit TypeScript:

```bash
# Erstellen eines neuen React-Projekts mit TypeScript
npm create vite@latest . -- --template react-ts

# Abhängigkeiten installieren
npm install
```

### 2.2 Zusätzliche Abhängigkeiten installieren

Installieren Sie die benötigten Frontend-Abhängigkeiten:

```bash
# UI-Komponenten und Styling
npm install @radix-ui/react-toast @radix-ui/react-dialog @radix-ui/react-aspect-ratio
npm install tailwindcss-animate class-variance-authority clsx tailwind-merge
npm install lucide-react

# Routing und Daten-Management
npm install react-router-dom @tanstack/react-query
```

### 2.3 Tailwind CSS und shadcn/ui einrichten

Konfigurieren Sie Tailwind CSS:

```bash
npx tailwindcss init -p
```

Erstellen Sie die Tailwind-Konfigurationsdatei (`tailwind.config.ts`):

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  // ... Rest der Tailwind-Konfiguration wie im vorhandenen Code
} satisfies Config;
```

Aktualisieren Sie die `index.css` mit den Tailwind-Direktiven und globalen Stilen.

### 2.4 Projektstruktur und Komponenten implementieren

Erstellen Sie die folgenden Verzeichnisse und Dateien:

```
src/
├── components/        # UI-Komponenten
│   ├── ChatContainer.tsx
│   ├── ChatInput.tsx
│   ├── ChatMessage.tsx
│   ├── TypingIndicator.tsx
│   └── ui/            # shadcn/ui Komponenten
├── hooks/             # Custom React Hooks
│   ├── useChatStream.tsx
│   └── use-toast.ts
├── lib/              # Hilfsfunktionen
│   └── utils.ts
├── pages/            # Seitenkomponenten
│   ├── Index.tsx
│   └── NotFound.tsx
├── App.tsx           # Hauptanwendungskomponente
└── main.tsx          # Einstiegspunkt
```

Im Folgenden implementieren wir die wichtigsten Dateien:

#### 2.4.1 useChatStream.tsx - Das Herzstück der WebSocket-Kommunikation

Diese Hook-Datei ist das Herzstück der WebSocket-Kommunikation und des Streamings:

```typescript
// src/hooks/useChatStream.tsx
import { useState, useRef, useEffect } from "react";
import { Message } from "@/components/ChatContainer";
import { toast } from "@/hooks/use-toast";

// Define connection status types
export type ConnectionStatus = "idle" | "connecting" | "connected" | "error" | "closed";

export const useChatStream = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [failedConnectionAttempts, setFailedConnectionAttempts] = useState(0);
  const [apiErrorCount, setApiErrorCount] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("idle");
  
  // Default URL with fallback options
  const wsUrl = import.meta.env.VITE_WS_URL || "wss://word-by-word-chat.onrender.com";
  // Backup URLs to try if main URL fails
  const backupWsUrls = [
    "ws://word-by-word-chat.onrender.com", // Try without SSL
    "wss://word-by-word-chat.onrender.com:10000" // Try explicit port
  ];

  // ... weitere Hook-Implementierung wie im vorhandenen Code
  
  // Verbindungsaufbau-Logik
  const connectWebSocket = async (url: string): Promise<WebSocket> => {
    // ... Code wie im vorhandenen useChatStream.tsx
  };

  // Fallback-Logik für WebSocket-Verbindungen
  const tryConnectWithFallbacks = async (): Promise<WebSocket> => {
    // ... Code wie im vorhandenen useChatStream.tsx
  };

  // Hauptfunktion zum Senden von Benutzernachrichten
  const addUserMessage = async (content: string) => {
    // ... Code wie im vorhandenen useChatStream.tsx
  };

  return {
    messages,
    isTyping,
    addUserMessage,
    connectionAttempts,
    failedConnectionAttempts,
    connectionStatus,
    apiErrorCount,
  };
};
```

#### 2.4.2 ChatMessage.tsx - Komponente für die Wort-für-Wort Anzeige

Diese Komponente stellt sowohl Benutzer- als auch Bot-Nachrichten dar und implementiert den Wort-für-Wort-Effekt:

```typescript
// src/components/ChatMessage.tsx
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  isStreaming?: boolean;
}

const ChatMessage = ({ content, isUser, isStreaming = false }: ChatMessageProps) => {
  const [displayedContent, setDisplayedContent] = useState<string>(isStreaming ? "" : content);
  const [wordIndex, setWordIndex] = useState(0);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isStreaming) {
      setDisplayedContent(content);
      return;
    }

    const words = content.split(" ");
    
    if (wordIndex < words.length) {
      const timer = setTimeout(() => {
        setDisplayedContent(prev => 
          prev + (prev ? " " : "") + words[wordIndex]
        );
        setWordIndex(wordIndex + 1);
      }, 100); // Geschwindigkeit hier anpassen
      
      return () => clearTimeout(timer);
    }
  }, [content, wordIndex, isStreaming]);

  // ... Rest des Codes wie im vorhandenen ChatMessage.tsx

  return (
    <div
      ref={messageRef}
      className={cn(
        "px-4 py-2 rounded-lg max-w-[80%] mb-2",
        isUser
          ? "bg-primary text-primary-foreground self-end"
          : "bg-muted self-start"
      )}
    >
      <p className="whitespace-pre-wrap break-words">{displayedContent}</p>
      {isStreaming && wordIndex < content.split(" ").length && (
        <span className="inline-block w-1.5 h-4 bg-current ml-0.5 animate-pulse" />
      )}
    </div>
  );
};

export default ChatMessage;
```

#### 2.4.3 Index.tsx - Die Hauptseitenkomponente

Die Hauptseite der Anwendung stellt alle Komponenten zusammen und zeigt den Verbindungsstatus:

```typescript
// src/pages/Index.tsx
import { useState, useEffect } from "react";
import ChatContainer from "@/components/ChatContainer";
import ChatInput from "@/components/ChatInput";
import { useChatStream, ConnectionStatus } from "@/hooks/useChatStream";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, WifiOff, RefreshCcw, XCircle, SignalZero, Key } from "lucide-react";
// ... weitere Imports

// Funktion zur Anzeige des Verbindungsstatus-Indikators
const getStatusIndicator = (status: ConnectionStatus) => {
  // ... Code wie im vorhandenen Index.tsx
};

const Index = () => {
  const { 
    messages, 
    isTyping, 
    addUserMessage, 
    connectionAttempts, 
    failedConnectionAttempts, 
    connectionStatus, 
    apiErrorCount 
  } = useChatStream();
  const [isOnline, setIsOnline] = useState(true);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  // ... weitere States und Hooks

  // ... Online-Status-Überwachung und andere Funktionen wie im vorhandenen Code

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="p-4 border-b bg-background">
        <h1 className="text-xl font-bold text-center">Word-by-Word Chat (Gemini API)</h1>
        {/* Status-Anzeige und Verbindungstests */}
      </header>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Warn- und Fehlermeldungen */}
        
        <ChatContainer messages={messages} isTyping={isTyping} />
        <ChatInput 
          onSendMessage={handleSendMessage} 
          isDisabled={isTyping || !isOnline}
        />
      </div>

      {/* Diagnose-Dialog */}
      <Dialog open={showDiagnostics} onOpenChange={setShowDiagnostics}>
        {/* ... Diagnose-Dialog-Inhalt wie im vorhandenen Code */}
      </Dialog>
    </div>
  );
};

export default Index;
```

### 2.5 App.tsx und Routing konfigurieren

Konfigurieren Sie die App-Komponente mit den benötigten Providern und Routing:

```typescript
// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
```

## 3. Backend-Setup

### 3.1 Projektstruktur für das Backend erstellen

Erstellen Sie ein separates Backend-Verzeichnis:

```bash
mkdir -p backend
cd backend
```

### 3.2 Backend-Projekt initialisieren

Erstellen Sie eine `package.json` für das Backend:

```bash
npm init -y
```

Passen Sie die `package.json` wie folgt an:

```json
{
  "name": "chat-stream-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": { "start": "node server.js" },
  "dependencies": {
    "express":"^4.18.2",
    "ws":"^8.12.0",
    "cors":"^2.8.5",
    "node-fetch":"^3.3.1"
  }
}
```

Installieren Sie die Abhängigkeiten:

```bash
npm install
```

### 3.3 Server-Implementierung

Erstellen Sie die Datei `server.js` mit der Implementierung des Express-Servers und WebSocket-Server:

```javascript
// backend/server.js
import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import http from 'http';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

// Health-Check für Render
app.get('/health', (req, res) => res.send('OK'));

// Deploy Hook Endpoint
app.post('/deploy-trigger', async (req, res) => {
  try {
    const deployHookUrl = process.env.RENDER_DEPLOY_HOOK || 'https://api.render.com/deploy/srv-example?key=example';
    
    const response = await fetch(deployHookUrl, {
      method: 'POST',
    });
    
    // ... Response-Handling wie im vorhandenen Code
  } catch (error) {
    // ... Error-Handling wie im vorhandenen Code
  }
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', ws => {
  ws.on('message', async msg => {
    // Nachricht vom Frontend
    const userText = msg.toString();
    console.log('Received message from client:', userText.substring(0, 50) + '...');

    try {
      // Gemini API Anfrage (statt OpenAI)
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        console.error("GEMINI_API_KEY is not set in environment variables");
        ws.send(JSON.stringify({
          error: true,
          message: "GEMINI_API_KEY is not configured"
        }));
        ws.close();
        return;
      }

      // Gemini API Endpunkt und Request-Body wie im vorhandenen Code
      const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey;
      
      // Anfrage im Gemini-Format
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: userText
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        }
      };

      try {
        // Non-streaming request to Gemini API
        const apiRes = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });

        // ... Response-Verarbeitung und Fehlerbehandlung wie im vorhandenen Code

        // Extract the content from Gemini response
        const content = responseData.candidates?.[0]?.content?.parts?.[0]?.text || "";
        
        if (content) {
          // Simuliertes Streaming durch Zerlegung in Chunks
          const chunks = content.match(/.{1,20}/g) || [];
          
          for (const chunk of chunks) {
            // Format in OpenAI-compatible format for the frontend
            const openaiCompatibleFormat = JSON.stringify({
              choices: [
                {
                  delta: {
                    content: chunk
                  }
                }
              ]
            });
            
            ws.send(`data: ${openaiCompatibleFormat}\n\n`);
            
            // Add a small delay between chunks to simulate streaming
            await new Promise(resolve => setTimeout(resolve, 10));
          }
          
          // Send DONE signal
          ws.send('data: [DONE]\n\n');
        } else {
          // ... Fehlerbehandlung wie im vorhandenen Code
        }
      } catch (error) {
        // ... Fehlerbehandlung wie im vorhandenen Code
      }
    } catch (error) {
      // ... Fehlerbehandlung wie im vorhandenen Code
    } finally {
      // Schließe die WebSocket-Verbindung
      ws.close();
    }
  });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => console.log(`Listening on ${PORT}`));
```

### 3.4 .gitignore für das Backend erstellen

Erstellen Sie eine `.gitignore`-Datei im Backend-Verzeichnis:

```
# Logs
logs
*.log
npm-debug.log*

# Dependencies
node_modules/

# Environment variables
.env

# OS generated files
.DS_Store
```

### 3.5 README für das Backend erstellen

Erstellen Sie eine `README.md`-Datei mit Setup-Anweisungen:

```markdown
# Chat Stream Backend

This is a WebSocket server that connects to the Google Gemini API to stream chat responses.

## Setup

1. Install dependencies:
```
npm install
```

2. Set your Gemini API key as an environment variable:
```
export GEMINI_API_KEY=your_api_key_here
```

3. Start the server:
```
npm start
```

The server will run on port 10000 by default or use the PORT environment variable.

## Endpoints

- `/health`: Health check endpoint that returns "OK"
- `/deploy-trigger`: Endpoint to trigger a new deployment on Render
- WebSocket connection for streaming chat responses

## API Keys

To use the Gemini API, you need to set the `GEMINI_API_KEY` environment variable to your Gemini API key.
If you're using Render for hosting, add this as an environment variable in your service configuration.
```

## 4. Google Gemini API Integration

Die Google Gemini API-Integration erfolgt über das Backend. Hier ist detailliert beschrieben, wie die API genutzt wird:

### 4.1 API-Schlüssel besorgen

1. Gehen Sie zur [Google Cloud Console](https://console.cloud.google.com/)
2. Erstellen oder wählen Sie ein Projekt
3. Aktivieren Sie die "Generative Language API" (Gemini API) in der API-Bibliothek
4. Erstellen Sie einen API-Schlüssel unter "APIs & Services" > "Credentials"

### 4.2 API-Anfrage verstehen

Die Anfrage an die Gemini API ist wie folgt strukturiert:

```javascript
// URL für den API-Endpunkt
const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey;

// Request-Body im Gemini-Format
const requestBody = {
  contents: [
    {
      parts: [
        {
          text: userText // Der Benutzertext aus dem Frontend
        }
      ]
    }
  ],
  generationConfig: {
    temperature: 0.7,        // Kreativität der Antworten (0.0 bis 1.0)
    maxOutputTokens: 800,    // Maximale Antwortlänge
  }
};

// API-Anfrage senden
const apiRes = await fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(requestBody)
});
```

### 4.3 API-Antwort verarbeiten und simuliertes Streaming

Die Gemini API liefert eine vollständige Antwort zurück. Diese wird dann in kleinere Chunks zerlegt, um ein Streaming zu simulieren:

```javascript
// Antwortdaten auslesen
const responseData = await apiRes.json();
const content = responseData.candidates?.[0]?.content?.parts?.[0]?.text || "";

// Antwort in Chunks zerlegen (ca. 20 Zeichen pro Chunk)
const chunks = content.match(/.{1,20}/g) || [];

// Chunks sequentiell an das Frontend senden
for (const chunk of chunks) {
  // In OpenAI-kompatibles Format konvertieren
  const openaiCompatibleFormat = JSON.stringify({
    choices: [
      {
        delta: {
          content: chunk
        }
      }
    ]
  });
  
  // An WebSocket-Client senden
  ws.send(`data: ${openaiCompatibleFormat}\n\n`);
  
  // Kleine Verzögerung für natürlicheres Streaming
  await new Promise(resolve => setTimeout(resolve, 10));
}

// Abschluss-Signal senden
ws.send('data: [DONE]\n\n');
```

### 4.4 Fehlerbehandlung für API-Probleme

Der Code enthält umfangreiche Fehlerbehandlung für API-bezogene Probleme:

```javascript
// Prüfen, ob der API-Schlüssel gesetzt ist
if (!apiKey) {
  console.error("GEMINI_API_KEY is not set in environment variables");
  ws.send(JSON.stringify({
    error: true,
    message: "GEMINI_API_KEY is not configured"
  }));
  ws.close();
  return;
}

// Fehlerbehandlung für API-Anfragefehler
if (!apiRes.ok) {
  const errorText = await apiRes.text();
  console.error('Gemini API error:', apiRes.status, errorText);
  ws.send(JSON.stringify({
    error: true,
    message: `API Error: ${apiRes.status} - ${errorText}`
  }));
  ws.close();
  return;
}

// Fehlerbehandlung für leere Antworten
if (!content) {
  console.error('No content in Gemini response:', responseData);
  ws.send(JSON.stringify({
    error: true,
    message: 'No content in API response'
  }));
}
```

## 5. Deployment auf Render.com

### 5.1 Backend auf Render.com bereitstellen

1. Melden Sie sich bei [Render.com](https://render.com/) an
2. Klicken Sie auf "New" > "Web Service"
3. Verbinden Sie Ihr GitHub-Repository oder laden Sie den Code direkt hoch
4. Konfigurieren Sie den Web Service:
   - **Name**: `word-by-word-chat` (oder einen anderen Namen Ihrer Wahl)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `/backend` (wenn das Backend in einem Unterverzeichnis liegt)

### 5.2 Umgebungsvariablen konfigurieren

Unter "Environment" auf Render.com, fügen Sie die folgenden Umgebungsvariablen hinzu:

- `GEMINI_API_KEY`: Ihr Google Gemini API-Schlüssel
- `PORT`: `10000` (oder ein anderer Port Ihrer Wahl)
- `RENDER_DEPLOY_HOOK`: Ihr Render.com Deploy Hook URL (optional)

### 5.3 Deploy-Hook einrichten (optional)

Für automatisierte Deployments können Sie einen Deploy-Hook einrichten:

1. In Ihrem Render.com Dashboard, gehen Sie zu Ihrem Web Service
2. Wählen Sie "Settings" > "Deploy Hooks"
3. Erstellen Sie einen neuen Deploy Hook und kopieren Sie die URL
4. Fügen Sie diese URL als `RENDER_DEPLOY_HOOK` Umgebungsvariable hinzu

### 5.4 Verifizieren der Deployment-Einstellungen

Stellen Sie sicher, dass:
- Der Health-Check-Endpoint (`/health`) korrekt eingerichtet ist
- WebSockets in Ihrem Render.com-Dienst aktiviert sind (standardmäßig aktiv)
- Die Start-Kommandos im `package.json` korrekt definiert sind

## 6. Verbindung von Frontend und Backend

### 6.1 WebSocket-URL im Frontend konfigurieren

Erstellen Sie eine `.env`-Datei im Hauptverzeichnis des Frontend-Projekts:

```
VITE_WS_URL=wss://ihr-service-name.onrender.com
```

Ersetzen Sie `ihr-service-name` mit dem Namen Ihres Render.com-Dienstes.

### 6.2 Fallback-URLs verstehen

Der vorhandene Code enthält eine Reihe von Fallback-URLs für den Fall, dass die Hauptverbindung fehlschlägt:

```typescript
// Default URL with fallback options
const wsUrl = import.meta.env.VITE_WS_URL || "wss://word-by-word-chat.onrender.com";

// Backup URLs to try if main URL fails
const backupWsUrls = [
  "ws://word-by-word-chat.onrender.com", // Try without SSL
  "wss://word-by-word-chat.onrender.com:10000" // Try explicit port
];
```

Passen Sie diese URLs an Ihre spezifischen Deployment-Details an.

### 6.3 WebSocket-Verbindungslogik

Die WebSocket-Verbindung wird in der `useChatStream.tsx`-Hook hergestellt:

```typescript
const addUserMessage = async (content: string) => {
  // ... vorheriger Code
  
  try {
    // Create a new WebSocket connection for each message
    if (wsRef.current) {
      wsRef.current.close();
      setConnectionStatus("closed");
    }
    
    // Try to connect with fallbacks
    const ws = await tryConnectWithFallbacks();
    wsRef.current = ws;
    
    // ... weiterer Code zur Nachrichtenverarbeitung
    
    // Senden der Benutzernachricht
    ws.send(content);
  } catch (error) {
    // ... Fehlerbehandlung
  }
};
```

## 7. Testen der Anwendung

### 7.1 Lokales Testen

#### Backend lokal starten:

```bash
cd backend
export GEMINI_API_KEY=your-api-key-here
npm start
```

#### Frontend lokal starten:

Erstellen Sie eine `.env.local`-Datei mit der lokalen WebSocket-URL:

```
VITE_WS_URL=ws://localhost:10000
```

Starten Sie das Frontend:

```bash
npm run dev
```

### 7.2 Produktions-Build testen

Erstellen Sie einen Produktions-Build des Frontends:

```bash
npm run build
```

Testen Sie den Build mit einem lokalen Server:

```bash
npm run preview
```

### 7.3 Komponententests

#### Test der WebSocket-Verbindung

Nutzen Sie den eingebauten Verbindungstest in der UI:

1. Öffnen Sie die Anwendung im Browser
2. Klicken Sie auf "WebSocket-Verbindung testen"
3. Überprüfen Sie die Verbindungseigenschaften im Diagnose-Dialog

#### Test der Chat-Funktionalität

1. Geben Sie eine Nachricht ein und senden Sie sie
2. Überprüfen Sie, ob:
   - Die Nachricht im Chat erscheint
   - Der "Typing"-Indikator angezeigt wird
   - Eine Antwort vom Bot empfangen wird
   - Die Antwort Wort für Wort angezeigt wird

## 8. Fehlerbehandlung & Troubleshooting

### 8.1 WebSocket-Verbindungsfehler

**Problem**: Die WebSocket-Verbindung kann nicht hergestellt werden.

**Lösungen**:
- Überprüfen Sie, ob der Backend-Server läuft
- Stellen Sie sicher, dass die WebSocket-URL korrekt ist
- Versuchen Sie alternative URLs (HTTP statt HTTPS, expliziter Port)
- Überprüfen Sie, ob Firewalls oder Proxy-Server WebSocket-Verbindungen blockieren

### 8.2 API-Konfigurationsfehler

**Problem**: Die Gemini API gibt Fehler zurück oder ist nicht konfiguriert.

**Lösungen**:
- Stellen Sie sicher, dass `GEMINI_API_KEY` korrekt gesetzt ist
- Überprüfen Sie, ob die Generative Language API in Google Cloud aktiviert ist
- Prüfen Sie die Anfragelimits und Kontingente Ihres API-Keys

### 8.3 Streaming-Probleme

**Problem**: Die Antworten werden nicht Wort für Wort gestreamt oder erscheinen verzögert.

**Lösungen**:
- Überprüfen Sie die Verzögerungszeiten im Backend-Code für das Chunk-Senden
- Prüfen Sie die Wort-für-Wort-Animationslogik in `ChatMessage.tsx`
- Überwachen Sie die Netzwerklatenz zwischen Frontend, Backend und Gemini API

## 9. Häufig gestellte Fragen

### Warum werden WebSocket-Verbindungen für jede Nachricht neu aufgebaut?

Der aktuelle Code baut für jede Nachricht eine neue WebSocket-Verbindung auf. Dies ist ein bewusster Designentscheid, der mehrere Vorteile bietet:
- Einfachere Zustandsverwaltung (keine gleichzeitigen Nachrichten)
- Vermeidung von Zustellungsproblemen bei langen Verbindungen
- Klare Trennung zwischen verschiedenen Anfragen

Für höhere Effizienz könnte in einer Produktionsversion ein Verbindungspool implementiert werden.

### Kann ich echtes API-Streaming anstelle des simulierten Streamings verwenden?

Ja, sobald die Gemini API oder andere LLMs native Streaming-APIs anbieten, kann der Code angepasst werden, um echtes Streaming zu nutzen. Dies würde die Latenz reduzieren, da nicht mehr auf die vollständige Antwort gewartet werden muss.

### Wie kann ich die Antwortqualität der Gemini API verbessern?

Sie können verschiedene Parameter im `generationConfig`-Objekt der API-Anfrage anpassen:
- `temperature`: Steuert die Kreativität (niedrigere Werte für präzisere Antworten)
- `maxOutputTokens`: Steuert die maximale Antwortlänge
- Fügen Sie einen `systemPrompt` hinzu, um den Chatbot anzuweisen

### Kann ich die Anwendung für Produktionszwecke verwenden?

Dieses PoC bietet eine solide Grundlage, sollte jedoch für den Produktionseinsatz um folgende Features erweitert werden:
- Benutzerauthentifizierung
- Persistenz von Chat-Verläufen
- Robustere Fehlerbehandlung und Wiederholungsstrategien
- Load Balancing für den WebSocket-Server
- Rate Limiting und Missbrauchsschutz

### Wie kann ich die Anwendung um multimodale Funktionen erweitern?

Die Gemini API unterstützt multimodale Eingaben (Text und Bilder). Um diese zu integrieren:
1. Erweitern Sie die Frontend-UI um Bild-Upload-Funktionalität
2. Ändern Sie den Nachrichtenformat im Backend, um Bilder als Base64-kodierte Daten einzubinden
3. Passen Sie den API-Request-Body an, um `inlineData` im Gemini-Format zu inkludieren

### Warum verwendet die Anwendung das OpenAI-Streaming-Format?

Die Anwendung emuliert das OpenAI-Streaming-Format (`data: {...}\n\n`), was mehrere Vorteile bietet:
1. Konsistenz mit weit verbreiteten Standards
2. Einfachere Integration mit vorhandenen Tools und Bibliotheken
3. Zukunftssicherheit, falls später auf andere LLM-Provider gewechselt werden soll
