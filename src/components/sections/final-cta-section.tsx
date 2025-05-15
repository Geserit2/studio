import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FinalCtaSection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Bereit, die KI-Zukunft Ihres Unternehmens zu gestalten?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
          Starten Sie jetzt mit dem AI Strategy Navigator und erhalten Sie Ihren individuellen Report – kostenfrei und unverbindlich.
        </p>
        <div className="mt-10">
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Link href="/navigator">Kostenlosen Report erhalten</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
