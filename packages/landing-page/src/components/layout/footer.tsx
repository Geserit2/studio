import Link from 'next/link';
import { Github, Linkedin, Twitter, BotMessageSquare } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background text-muted-foreground">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
                <BotMessageSquare className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">AI Strategy Navigator</span>
            </Link>
            <p className="text-sm">
              Entwickeln Sie Ihre maßgeschneiderte KI-Strategie.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/produkt" className="hover:text-primary">Produkt</Link></li>
              <li><Link href="/wissen" className="hover:text-primary">Wissens-Nuggets</Link></li>
              <li><Link href="/ueber-uns" className="hover:text-primary">Über uns</Link></li>
              <li><Link href="/kontakt" className="hover:text-primary">Kontakt</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Rechtliches</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/impressum" className="hover:text-primary">Impressum</Link></li>
              <li><Link href="/datenschutz" className="hover:text-primary">Datenschutz</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 flex flex-col items-center justify-between sm:flex-row">
          <p className="text-sm">
            &copy; {currentYear} AI Strategy Navigator. Alle Rechte vorbehalten.
          </p>
          <div className="mt-4 flex space-x-6 sm:mt-0">
            <Link href="#" className="hover:text-primary" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="hover:text-primary" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" className="hover:text-primary" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
