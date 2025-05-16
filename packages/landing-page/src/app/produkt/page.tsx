import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Package, Lightbulb, BarChart } from 'lucide-react';

export default function ProduktPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto py-16 px-4">
        <div className="text-center mb-12">
            <Package className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold mb-4">Unser Produkt: AI Strategy Navigator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Erfahren Sie mehr darüber, wie der AI Strategy Navigator Ihr KMU transformieren kann. Detaillierte Informationen folgen in Kürze. (Dieser Bereich ist ein Platzhalter)
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-lg shadow-md bg-card">
                <Lightbulb className="mx-auto h-12 w-12 text-primary mb-3" />
                <h2 className="text-xl font-semibold mb-2">Individuelle Analyse</h2>
                <p className="text-muted-foreground">Basierend auf Ihren Eingaben erstellen wir eine maßgeschneiderte KI-Potenzialanalyse.</p>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-card">
                <BarChart className="mx-auto h-12 w-12 text-primary mb-3" />
                <h2 className="text-xl font-semibold mb-2">Konkrete Strategieansätze</h2>
                <p className="text-muted-foreground">Sie erhalten klare und umsetzbare Empfehlungen für Ihre KI-Strategie.</p>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto h-12 w-12 text-primary mb-3 lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
                <h2 className="text-xl font-semibold mb-2">Zukunftsfähig aufgestellt</h2>
                <p className="text-muted-foreground">Positionieren Sie Ihr KMU erfolgreich für die digitale Zukunft mit KI.</p>
            </div>
        </div>

        <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/">Zurück zur Startseite</Link>
            </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
