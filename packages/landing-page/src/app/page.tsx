import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero-section';
import ProblemSolutionSection from '@/components/sections/problem-solution-section';
import HowItWorksSection from '@/components/sections/how-it-works-section';
import BenefitsSection from '@/components/sections/benefits-section';
import TrustElementsSection from '@/components/sections/trust-elements-section';
import KnowledgeNuggetsTeaser from '@/components/sections/knowledge-nuggets-teaser';
import FinalCtaSection from '@/components/sections/final-cta-section';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ProblemSolutionSection />
        <HowItWorksSection />
        <BenefitsSection />
        <TrustElementsSection />
        <KnowledgeNuggetsTeaser />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}
