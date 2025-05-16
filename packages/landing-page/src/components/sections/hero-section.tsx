import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative bg-secondary py-20 md:py-32">
      <div className="absolute inset-0">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Moderne KI-bezogene Grafik"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
          data-ai-hint="abstract technology"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background"></div>
      </div>
      <div className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          <span className="block">Entwickeln Sie Ihre</span>
          <span className="block text-primary">maßgeschneiderte KI-Strategie</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-muted-foreground sm:text-xl md:mt-8 md:max-w-3xl">
          Mit dem AI Strategy Navigator in wenigen Schritten zur Zukunftsfähigkeit Ihres KMU. Einfach, schnell und effektiv.
        </p>
        <div className="mt-10 flex justify-center">
          <Button size="lg" asChild className="text-lg px-8 py-6 shadow-lg hover:shadow-primary/50 transition-shadow duration-300">
            <Link href="/navigator">Jetzt KI-Strategie starten</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
