import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';

export default function NavigatorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">AI Strategy Navigator</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Hier beginnt Ihre Reise zur maßgeschneiderten KI-Strategie. Dieser Bereich befindet sich noch in Entwicklung.
        </p>
        <img src="https://placehold.co/600x400.png?text=Navigator+Tool+UI" alt="Navigator Tool Placeholder" className="mx-auto mb-8 rounded-lg shadow-md" data-ai-hint="data analysis dashboard" />
        <Button asChild size="lg">
          <Link href="/">Zurück zur Startseite</Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
}
