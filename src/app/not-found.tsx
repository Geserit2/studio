import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto flex flex-col items-center justify-center py-16 px-4 text-center">
        <AlertTriangle className="h-24 w-24 text-destructive mb-8" />
        <h1 className="text-5xl font-bold text-foreground mb-4">404 - Seite nicht gefunden</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md">
          Entschuldigung, die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben.
        </p>
        <Button asChild size="lg">
          <Link href="/">Zurück zur Startseite</Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
}
