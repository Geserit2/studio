import IconCard from '@/components/icon-card';
import { ClipboardList, HelpCircle, BarChart3, Lightbulb } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    title: '1. Fragebogen starten',
    description: 'Beginnen Sie mit unserem intuitiven Fragebogen, um Ihr Unternehmensprofil und Ihre Ziele zu erfassen.',
  },
  {
    icon: HelpCircle,
    title: '2. Fragen beantworten',
    description: 'Beantworten Sie gezielte Fragen zu Ihrem Geschäft, Ihren Herausforderungen und Wünschen bezüglich KI.',
  },
  {
    icon: BarChart3,
    title: '3. Report erhalten',
    description: 'Unser System analysiert Ihre Antworten und generiert einen detaillierten, personalisierten KI-Strategie-Report.',
  },
  {
    icon: Lightbulb,
    title: '4. Strategieansätze entdecken',
    description: 'Erhalten Sie konkrete, umsetzbare Strategieansätze und Empfehlungen für den KI-Einsatz in Ihrem KMU.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            So einfach funktioniert's
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            In wenigen Schritten zu Ihrer individuellen KI-Strategie.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <IconCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
