import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const nuggets = [
  {
    title: 'KI-Grundlagen für KMU',
    description: 'Verstehen Sie die Basics von Künstlicher Intelligenz und wie sie Ihr Geschäft verändern kann.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'technology education',
    href: '/wissen/ki-grundlagen',
  },
  {
    title: 'Erfolgsbeispiele: KI im Mittelstand',
    description: 'Lassen Sie sich von Unternehmen inspirieren, die KI bereits erfolgreich einsetzen.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'business success',
    href: '/wissen/erfolgsbeispiele',
  },
  {
    title: 'Checkliste: Ist Ihr KMU bereit für KI?',
    description: 'Finden Sie mit unserer praktischen Checkliste heraus, wie gut Sie auf KI vorbereitet sind.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'checklist planning',
    href: '/wissen/checkliste-ki-bereitschaft',
  },
];

export default function KnowledgeNuggetsTeaser() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Aktuelles aus unserer Wissensdatenbank
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Erweitern Sie Ihr KI-Wissen mit unseren praxisnahen Artikeln und Leitfäden.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {nuggets.map((nugget, index) => (
            <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <Image
                  src={nugget.imageUrl}
                  alt={nugget.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint={nugget.imageHint}
                />
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <CardTitle className="text-xl mb-2">{nugget.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{nugget.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button variant="link" asChild className="p-0 h-auto text-primary">
                  <Link href={nugget.href}>
                    Mehr erfahren <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/wissen">Alle Wissens-Nuggets anzeigen</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
