import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import ChallengeSection from '@/components/sections/ChallengeSection';
import OfferSection from '@/components/sections/OfferSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ConditionsSection from '@/components/sections/ConditionsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import WhySection from '@/components/sections/WhySection';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <ChallengeSection />
      <OfferSection />
      <ProcessSection />
      <ConditionsSection />
      <ProjectsSection />
      <WhySection />
      <CTASection />
    </>
  );
}
