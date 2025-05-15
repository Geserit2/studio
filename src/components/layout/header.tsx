import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Languages, BotMessageSquare } from 'lucide-react';

const navItems = [
  { label: 'Produkt', href: '/produkt' },
  { label: 'Wissens-Nuggets', href: '/wissen' },
  { label: 'Über uns', href: '/ueber-uns' },
  { label: 'Kontakt', href: '/kontakt' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <BotMessageSquare className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">AI Strategy Navigator</span>
        </Link>

        <nav className="hidden items-center space-x-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Button variant="ghost" size="icon" aria-label="Sprache wechseln">
            <Languages className="h-5 w-5" />
          </Button>
          <Button asChild>
            <Link href="/navigator">Strategie-Report starten</Link>
          </Button>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Navigation öffnen</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 p-4">
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <BotMessageSquare className="h-7 w-7 text-primary" />
                  <span className="text-lg font-bold">AI Strategy Navigator</span>
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button variant="outline" className="w-full justify-start">
                  <Languages className="mr-2 h-5 w-5" /> Sprache wechseln
                </Button>
                <Button asChild className="w-full">
                  <Link href="/navigator">Strategie-Report starten</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
