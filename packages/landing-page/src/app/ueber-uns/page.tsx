import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Users, Target, Handshake } from 'lucide-react';

export default function UeberUnsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto py-16 px-4">
        <div className="text-center mb-12">
            <Users className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold mb-4">Über Uns</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lernen Sie das Team und die Vision hinter dem AI Strategy Navigator kennen. Wir helfen KMUs, das Potenzial von KI zu nutzen. (Dieser Bereich ist ein Platzhalter)
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
            <div>
                <h2 className="text-3xl font-semibold mb-4 text-foreground">Unsere Mission</h2>
                <p className="text-muted-foreground mb-3">
                    Wir glauben fest daran, dass Künstliche Intelligenz nicht nur Großkonzernen vorbehalten sein sollte. 
                    Unsere Mission ist es, kleinen und mittleren Unternehmen (KMUs) im deutschsprachigen Raum den Zugang zu KI-Technologien zu erleichtern und sie dabei zu unterstützen, maßgeschneiderte KI-Strategien zu entwickeln.
                </p>
                <p className="text-muted-foreground">
                    Mit dem AI Strategy Navigator bieten wir ein Werkzeug, das Komplexität reduziert und klare, handlungsorientierte Einblicke liefert, um die Zukunftsfähigkeit von KMUs zu sichern.
                </p>
            </div>
            <div>
                <Image 
                    src="https://placehold.co/600x400.png" 
                    alt="Team bei der Arbeit" 
                    width={600} 
                    height={400} 
                    className="rounded-lg shadow-xl"
                    data-ai-hint="team collaboration"
                />
            </div>
        </div>

        <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-foreground">Unsere Werte</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-lg shadow-md bg-card">
                <Target className="mx-auto h-12 w-12 text-primary mb-3" />
                <h3 className="text-xl font-semibold mb-2">Kundenorientierung</h3>
                <p className="text-muted-foreground">Die Bedürfnisse und Herausforderungen von KMUs stehen im Mittelpunkt unserer Entwicklung.</p>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-card">
                <Handshake className="mx-auto h-12 w-12 text-primary mb-3" />
                <h3 className="text-xl font-semibold mb-2">Partnerschaftlich</h3>
                <p className="text-muted-foreground">Wir sehen uns als Partner auf Augenhöhe, der KMUs auf ihrem Weg in die KI-Zukunft begleitet.</p>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-card">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto h-12 w-12 text-primary mb-3 lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                <h3 className="text-xl font-semibold mb-2">Innovativ & Pragmatisch</h3>
                <p className="text-muted-foreground">Wir verbinden innovative Ansätze mit pragmatischen Lösungen, die im KMU-Alltag funktionieren.</p>
            </div>
        </div>

        <div className="text-center mt-16">
            <Button asChild size="lg">
              <Link href="/">Zurück zur Startseite</Link>
            </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
