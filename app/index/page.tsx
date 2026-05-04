'use client';

import NavbarV2 from '@/components/NavbarV2';
import HeroV3 from '@/components/HeroV3';

export default function IndexPage() {
  return (
    <main className="min-h-screen bg-[#F4FBFF]">
      <NavbarV2 />
      <HeroV3 variant="platter" />
      
      {/* Spacer for demo */}
      <div className="py-20 px-10 text-center">
        <h2 className="text-2xl font-bold text-[var(--navy)] mb-4">AnalytixLabs Index Page</h2>
        <p className="text-[var(--muted)]">Featuring the updated Navigation and Holographic Hero sections.</p>
      </div>
    </main>
  );
}
