import IconCard from '@/components/icon-card';
import { Clock, Target, Users, Gift } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Zeitersparnis',
    description: 'Erhalten Sie schnell und effizient eine fundierte Grundlage für Ihre KI-Entscheidungen.',
  },
  {
    icon: Target,
    title: 'Klarheit & Fokus',
    description: 'Gewinnen Sie Klarheit über relevante KI-Anwendungsfälle und Potenziale für Ihr Unternehmen.',
  },
  {
    icon: Users,
    title: 'Individuelle Empfehlungen',
    description: 'Profitieren Sie von maßgeschneiderten Strategieansätzen statt generischer Ratschläge.',
  },
  {
    icon: Gift,
    title: 'Kostenfreier Start',
    description: 'Erkunden Sie die Möglichkeiten und erhalten Sie Ihren ersten Report kostenfrei.',
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ihre Vorteile auf einen Blick
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Warum sich der AI Strategy Navigator für Ihr KMU lohnt.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <IconCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              iconClassName="text-green-500"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
