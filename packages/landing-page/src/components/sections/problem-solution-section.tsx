import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap } from 'lucide-react';

export default function ProblemSolutionSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Die KI-Herausforderung für KMUs meistern
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Viele kleine und mittlere Unternehmen erkennen das Potenzial von KI, sind aber unsicher bei der Umsetzung.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Zap className="mr-3 h-8 w-8 text-destructive" />
                Das Problem: Komplexität & Unsicherheit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>Fehlendes technisches Know-how, unklare Anwendungsfälle und hohe Einstiegshürden blockieren oft den Weg zur KI-Integration.</p>
              <p>Ohne klare Strategie bleiben Potenziale ungenutzt und die Wettbewerbsfähigkeit gefährdet.</p>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <CheckCircle className="mr-3 h-8 w-8" />
                Die Lösung: AI Strategy Navigator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>Unser Navigator führt Sie verständlich und zielgerichtet zu Ihrer individuellen KI-Strategie.</p>
              <p>Erhalten Sie konkrete Handlungsempfehlungen, die auf Ihr Unternehmen zugeschnitten sind – ganz ohne tiefes Vorwissen.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
