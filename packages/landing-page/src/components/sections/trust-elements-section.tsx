import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

export default function TrustElementsSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Vertrauen und Expertise
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Wir legen Wert auf Transparenz und Qualität. (Platzhalter für Testimonials & Logos)
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="italic text-muted-foreground mb-4">
                  "Der AI Strategy Navigator hat uns geholfen, einen klaren Fahrplan für unsere KI-Initiativen zu entwickeln. Sehr empfehlenswert!" (Beispiel-Testimonial)
                </p>
                <div className="flex items-center">
                  <Image
                    src={`https://placehold.co/40x40.png`}
                    alt="Placeholder Kunde"
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                    data-ai-hint="person avatar"
                  />
                  <div>
                    <p className="font-semibold text-foreground">Max Mustermann</p>
                    <p className="text-sm text-muted-foreground">CEO, Beispiel GmbH</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">Logos bekannter Partner (Platzhalter):</p>
          <div className="mt-6 flex flex-wrap justify-center items-center gap-8">
            {[1, 2, 3, 4].map(idx => (
                 <Image key={idx} src={`https://placehold.co/120x60.png?text=Partner+${idx}`} alt={`Partner Logo ${idx}`} width={120} height={60} data-ai-hint="company logo" className="opacity-60 hover:opacity-100 transition-opacity" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
