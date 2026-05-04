'use client';

import NavbarV2 from '@/components/NavbarV2';
import HeroV3 from '@/components/HeroV3';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4FBFF]">
      <NavbarV2 />
      <HeroV3 variant="platter" />
      
      {/* Spacer for demo */}
      <div className="py-20 px-10 text-center">
        <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">AnalytixLabs Main Landing Page</h2>
        <p className="text-[var(--muted)]">India's Top Ranked Data Science Institute — Now with Holographic Design.</p>
      </div>
    </main>
  );
}
