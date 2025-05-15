import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';

export default function DatenschutzPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-6">Datenschutzerklärung</h1>
        <div className="space-y-6 text-muted-foreground prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
          <p>Diese Datenschutzerklärung ist ein Platzhalter und dient nur zu Demonstrationszwecken. Bitte ersetzen Sie diesen Text durch eine rechtsgültige Datenschutzerklärung.</p>
          
          <h2 className="text-xl font-semibold text-foreground">1. Verantwortliche Stelle</h2>
          <p>Verantwortliche Stelle im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung (DSGVO), ist:</p>
          <p>AI Strategy Navigator GmbH (Platzhalter)<br/>Musterstraße 1<br/>12345 Musterstadt<br/>E-Mail: info@aistrategynavigator.dev (Platzhalter)</p>

          <h2 className="text-xl font-semibold text-foreground">2. Ihre Betroffenenrechte</h2>
          <p>Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten können Sie jederzeit folgende Rechte ausüben:</p>
          <ul>
            <li>Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung (Art. 15 DSGVO),</li>
            <li>Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO),</li>
            <li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO),</li>
            <li>Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher Pflichten noch nicht löschen dürfen (Art. 18 DSGVO),</li>
            <li>Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21 DSGVO) und</li>
            <li>Datenübertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt haben oder einen Vertrag mit uns abgeschlossen haben (Art. 20 DSGVO).</li>
          </ul>
          <p>Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen.</p>

          <h2 className="text-xl font-semibold text-foreground">3. Erfassung allgemeiner Informationen beim Besuch unserer Website</h2>
          <p>Art und Zweck der Verarbeitung: Wenn Sie auf unsere Website zugreifen, d.h., wenn Sie sich nicht registrieren oder anderweitig Informationen übermitteln, werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers, Ihre IP-Adresse und ähnliches.</p>
          
          <h2 className="text-xl font-semibold text-foreground">4. Cookies</h2>
          <p>Wie viele andere Webseiten verwenden wir auch so genannte „Cookies“. Cookies sind kleine Textdateien, die auf Ihrer Festplatte gespeichert werden. Hierdurch erhalten wir bestimmte Daten wie z. B. IP-Adresse, verwendeter Browser, Betriebssystem über Ihren Computer und Ihre Verbindung zum Internet.</p>
          
          <h2 className="text-xl font-semibold text-foreground">5. Änderungen unserer Datenschutzbestimmungen</h2>
          <p>Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.</p>
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
