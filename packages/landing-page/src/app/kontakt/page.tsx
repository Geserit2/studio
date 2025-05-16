import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function KontaktPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto py-16 px-4">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Kontaktieren Sie uns</h1>
            <p className="text-lg text-muted-foreground">
            Wir freuen uns auf Ihre Nachricht oder Ihren Anruf. (Dieser Bereich ist ein Platzhalter)
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Kontaktinformationen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-3 text-primary" />
                        <span>info@aistrategynavigator.dev (Platzhalter)</span>
                    </div>
                    <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-3 text-primary" />
                        <span>+49 (0)123 456789 (Platzhalter)</span>
                    </div>
                    <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-3 text-primary" />
                        <span>Musterstraße 1, 12345 Musterstadt (Platzhalter)</span>
                    </div>
                </CardContent>
            </Card>
            <Card className="shadow-lg">
                 <CardHeader>
                    <CardTitle className="text-2xl">Nachricht senden</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-foreground">Name</label>
                            <input type="text" name="name" id="name" className="mt-1 block w-full rounded-md border-input shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 bg-background" placeholder="Ihr Name"/>
                        </div>
                         <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground">E-Mail</label>
                            <input type="email" name="email" id="email" className="mt-1 block w-full rounded-md border-input shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 bg-background" placeholder="Ihre E-Mail-Adresse"/>
                        </div>
                         <div>
                            <label htmlFor="message" className="block text-sm font-medium text-foreground">Nachricht</label>
                            <textarea name="message" id="message" rows={4} className="mt-1 block w-full rounded-md border-input shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 bg-background" placeholder="Ihre Nachricht"></textarea>
                        </div>
                        <Button type="submit" className="w-full">Nachricht senden</Button>
                    </form>
                </CardContent>
            </Card>
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
