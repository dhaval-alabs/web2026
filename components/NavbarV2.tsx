'use client';
// Refined Navbar with mega menu and mobile drawer

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X, Rocket, GraduationCap, Briefcase, BarChart3, Binary, BrainCircuit, Search } from 'lucide-react';

export default function NavbarV2() {
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isExploreAccordionOpen, setIsExploreAccordionOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  const openMega = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setIsMegaOpen(true);
  };

  const closeMega = () => {
    hoverTimer.current = setTimeout(() => {
      setIsMegaOpen(false);
    }, 220);
  };

  const toggleMega = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMegaOpen(!isMegaOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setIsMegaOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMegaOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-brand">
            <Image 
              src="/AnalytixLabs Logo 2024.png" 
              alt="AnalytixLabs" 
              width={180} 
              height={36} 
              priority 
              className="object-contain"
            />
          </Link>

          <nav className="nav-links" aria-label="Primary">
            <Link className="nav-link" href="#">Upcoming Batches</Link>
            <div className="mega-wrap" ref={megaRef} onMouseEnter={openMega} onMouseLeave={closeMega}>
              <button 
                className={`nav-link ${isMegaOpen ? 'is-open' : ''}`} 
                onClick={toggleMega}
                aria-haspopup="true" 
                aria-expanded={isMegaOpen}
              >
                Explore Courses
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div className={`mega ${isMegaOpen ? 'is-open' : ''}`} role="menu">
                <div className="mega-grid">
                  <div className="mega-col">
                    <div className="mega-cat">Artificial Intelligence</div>
                    <ul className="mega-list">
                      <li><Link className="mega-link" href="#">Full Stack AI Course <span className="badge">New</span></Link></li>
                      <li><Link className="mega-link" href="#">Agentic AI Course <span className="badge">Beta</span></Link></li>
                      <li><Link className="mega-link" href="#">Generative AI Course</Link></li>
                      <li><Link className="mega-link" href="#">AI for Managers &amp; Leaders</Link></li>
                    </ul>
                    <div className="mega-cat" style={{ marginTop: '18px' }}>Data Science</div>
                    <ul className="mega-list">
                      <li><Link className="mega-link" href="#">Data Science Course</Link></li>
                      <li><Link className="mega-link" href="#">Data Science using Python</Link></li>
                    </ul>
                  </div>
                  <div className="mega-col">
                    <div className="mega-cat">Business &amp; Data Analytics</div>
                    <ul className="mega-list">
                      <li><Link className="mega-link" href="#">Data Visualization &amp; Analytics</Link></li>
                      <li><Link className="mega-link" href="#">Data Analytics Course</Link></li>
                      <li><Link className="mega-link" href="#">Business Analytics Course</Link></li>
                    </ul>
                    <div className="mega-cat" style={{ marginTop: '18px' }}>Specialization Modules</div>
                    <ul className="mega-list">
                      <li><Link className="mega-link" href="#">Certified Big Data Engineer</Link></li>
                      <li><Link className="mega-link" href="#">Machine Learning using Python</Link></li>
                      <li><Link className="mega-link" href="#">Deep Learning with Python <span className="badge">Advanced</span></Link></li>
                    </ul>
                  </div>
                </div>
                <div className="mega-foot">
                  <div className="micro"><strong>13 programs</strong> · cohorts every month · Nasscom certified</div>
                  <Link href="#" className="mega-cta">Explore All Courses
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </Link>
                </div>
              </div>
            </div>
            <Link className="nav-link" href="#">Why Us</Link>
            <Link className="nav-link" href="#">For Corporates</Link>
            <Link className="nav-link" href="#">Blog</Link>
            <Link className="nav-link" href="#">Contact Us</Link>
          </nav>

          <Link href="#" className="nav-cta">Create Free Account</Link>

          <button className="nav-burger" onClick={() => setIsDrawerOpen(true)} aria-label="Open menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`drawer-overlay ${isDrawerOpen ? 'is-open' : ''}`} onClick={() => setIsDrawerOpen(false)}></div>
      <aside className={`drawer ${isDrawerOpen ? 'is-open' : ''}`} aria-label="Mobile navigation">
        <div className="p-4 flex justify-between items-center border-b border-[var(--border-faint)]">
          <Link href="/" className="nav-brand">
            <Image 
              src="/AnalytixLabs Logo 2024.png" 
              alt="AnalytixLabs" 
              width={160} 
              height={32} 
              priority 
              className="object-contain"
            />
          </Link>
          <button className="w-10 h-10 flex items-center justify-center border border-[var(--border)] rounded-xl" onClick={() => setIsDrawerOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6 L18 18 M18 6 L6 18"/></svg>
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-4">
          <div className="border-b border-dashed border-[rgba(11,26,61,0.08)] py-1">
            <Link className="drawer-row" href="#">Upcoming Batches</Link>
          </div>
          <div className="border-b border-dashed border-[rgba(11,26,61,0.08)] py-1">
            <button className={`drawer-row ${isExploreAccordionOpen ? 'is-open' : ''}`} onClick={() => setIsExploreAccordionOpen(!isExploreAccordionOpen)}>
              Explore Courses
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div className={`drawer-sub ${isExploreAccordionOpen ? 'is-open' : ''}`}>
              <div className="drawer-cat">Artificial Intelligence</div>
              <Link className="drawer-link" href="#">Full Stack AI Course</Link>
              <Link className="drawer-link" href="#">Agentic AI Course</Link>
              <Link className="drawer-link" href="#">Generative AI Course</Link>
              
              <div className="drawer-cat">Business & Analytics</div>
              <Link className="drawer-link" href="#">Data Analytics Course</Link>
              <Link className="drawer-link" href="#">Business Analytics Course</Link>
              
              <div className="drawer-cat">Data Science</div>
              <Link className="drawer-link" href="#">Data Science Course</Link>
              <Link className="drawer-link" href="#">Data Science with Python</Link>
            </div>
          </div>
          <div className="py-1"><Link className="drawer-row" href="#">Why Us</Link></div>
          <div className="py-1"><Link className="drawer-row" href="#">For Corporates</Link></div>
        </div>
        <div className="p-4 border-t border-[var(--border-faint)] flex flex-col gap-3">
          <Link href="#" className="nav-cta text-center !flex">Create Free Account</Link>
          <Link href="#" className="text-center py-2 font-semibold">Sign In</Link>
        </div>
      </aside>
    </>
  );
}
