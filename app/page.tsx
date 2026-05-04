import { HeroBanner } from '@/src/components/public/sections/HeroBanner';
import { SalaryStats } from '@/src/components/public/sections/SalaryStats';
import { TracksFees } from '@/src/components/public/sections/TracksFees';
import { CurriculumTimeline } from '@/src/components/public/sections/CurriculumTimeline';
import { JobRoles } from '@/src/components/public/sections/JobRoles';
import { LearningModes } from '@/src/components/public/sections/LearningModes';
import { FAQAccordion } from '@/src/components/public/sections/FAQAccordion';
import { CTABanner } from '@/src/components/public/sections/CTABanner';
import { Footer } from '@/src/components/public/sections/Footer';
import { TrustStrip } from '@/src/components/public/sections/TrustStrip';

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <TrustStrip />
      <SalaryStats />
      <TracksFees />
      <CurriculumTimeline />
      <JobRoles />
      <LearningModes />
      <FAQAccordion />
      <CTABanner />
      <Footer />
    </main>
  );
}
