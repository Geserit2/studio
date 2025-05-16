import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';

export default function ImpressumPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-6">Impressum</h1>
        <div className="space-y-4 text-muted-foreground">
          <p>Angaben gemäß § 5 TMG:</p>
          <p>
            AI Strategy Navigator GmbH (Platzhalter)<br />
            Musterstraße 1<br />
            12345 Musterstadt
          </p>
          <p>
            Vertreten durch:<br />
            Max Mustermann (Geschäftsführer, Platzhalter)
          </p>
          <p>
            Kontakt:<br />
            Telefon: +49 (0)123 456789 (Platzhalter)<br />
            E-Mail: info@aistrategynavigator.dev (Platzhalter)
          </p>
          <p>
            Registereintrag:<br />
            Eintragung im Handelsregister (Platzhalter).<br />
            Registergericht: Amtsgericht Musterstadt (Platzhalter)<br />
            Registernummer: HRB 12345 (Platzhalter)
          </p>
          <p>
            Umsatzsteuer-ID:<br />
            Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:<br />
            DE123456789 (Platzhalter)
          </p>
          <p>
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:<br />
            Max Mustermann (Platzhalter)<br />
            Anschrift wie oben
          </p>
        </div>
        <div className="mt-12">
            <Button asChild>
              <Link href="/">Zurück zur Startseite</Link>
            </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
