import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export default function WissenPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Wissensdatenbank</h1>
          <p className="text-lg text-muted-foreground">
            Entdecken Sie Artikel, Leitfäden und Einblicke rund um KI-Strategien für KMUs. (Dieser Bereich ist ein Platzhalter)
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-6 w-6 text-primary" />
                  Artikel-Platzhalter {index + 1}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Dies ist eine kurze Beschreibung für einen Beispielartikel in der Wissensdatenbank. 
                  Weitere Inhalte werden hier in Zukunft verfügbar sein.
                </p>
                <Button variant="link" asChild className="mt-4 p-0 text-primary">
                  <Link href={`/wissen/artikel-${index + 1}`}>Mehr lesen</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
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
