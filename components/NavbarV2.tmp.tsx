'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

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
        :root { --nav-h: 72px; }
        .nav {
          position: sticky; top: 0; z-index: 50;
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          background: rgba(255,255,255,0.86);
          border-bottom: 1px solid var(--border-faint);
        }
        .nav-inner {
          display: flex; align-items: center; gap: 18px;
          height: var(--nav-h);
          padding: 0 24px; max-width: 1280px; margin: 0 auto;
        }
        .nav-brand {
          display: flex; align-items: center; gap: 2px;
          font-family: var(--font-manrope); font-weight: 800; color: var(--navy);
          text-decoration: none; font-size: 1.18rem; letter-spacing: -0.025em;
          flex-shrink: 0;
        }
        .nav-brand .x-mark {
          position: relative; display: inline-flex; align-items: center; justify-content: center;
          width: 22px; height: 22px;
          color: var(--teal);
          font-weight: 800;
        }
        .nav-links {
          display: none; align-items: center; gap: 28px;
          margin-left: auto;
        }
        .nav-link {
          color: var(--navy); text-decoration: none;
          font-size: 0.92rem; font-weight: 500;
          padding: 8px 0; position: relative;
          cursor: pointer; background: transparent; border: none;
          font-family: var(--font-inter);
          display: inline-flex; align-items: center; gap: 4px;
        }
        .nav-link:hover { color: var(--navy-link); }
        .nav-link.is-open { color: var(--navy-link); }
        .nav-link svg { transition: transform .2s; opacity: 0.6; }
        .nav-link.is-open svg { transform: rotate(180deg); color: var(--teal); opacity: 1; }
        
        .nav-cta {
          display: none;
          background: var(--navy); color: white; text-decoration: none;
          font-family: var(--font-inter); font-size: 0.86rem; font-weight: 700;
          padding: 11px 18px; border-radius: 100px;
          transition: background .2s, transform .15s, box-shadow .2s;
          border: 1.5px solid var(--navy);
        }
        .nav-cta:hover { background: #1A3060; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(11,26,61,0.22); }

        .nav-burger {
          margin-left: auto;
          width: 42px; height: 42px; border-radius: 12px;
          background: white; border: 1.5px solid var(--border);
          display: inline-flex; align-items: center; justify-content: center;
          color: var(--navy); cursor: pointer;
        }

        @media (min-width: 1024px) {
          .nav-links { display: flex; }
          .nav-cta { display: inline-flex; }
          .nav-burger { display: none; }
        }

        .mega-wrap { position: relative; }
        .mega {
          position: absolute; top: calc(100% + 14px); left: 50%; transform: translateX(-50%) translateY(6px);
          background: white; border: 1px solid var(--border-faint);
          border-radius: 18px; box-shadow: 0 18px 60px rgba(11,26,61,0.16);
          width: min(820px, calc(100vw - 40px));
          padding: 26px 26px 18px;
          opacity: 0; pointer-events: none; transition: opacity .18s ease, transform .22s ease;
        }
        .mega.is-open { opacity: 1; pointer-events: auto; transform: translateX(-50%) translateY(0); }
        .mega::before {
          content: ""; position: absolute; top: -7px; left: 50%; margin-left: -8px;
          width: 14px; height: 14px; background: white;
          border-left: 1px solid var(--border-faint); border-top: 1px solid var(--border-faint);
          transform: rotate(45deg);
        }
        .mega-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 36px; }
        .mega-cat {
          font-family: var(--font-manrope); font-weight: 800; font-size: 0.92rem;
          color: var(--navy); margin: 6px 0 12px; letter-spacing: -0.005em;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .mega-cat::before {
          content: ""; width: 6px; height: 6px; border-radius: 50%;
          background: var(--teal); flex-shrink: 0;
        }
        .mega-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 2px; position: relative; }
        .mega-list::before {
          content: ""; position: absolute; left: -2px; top: 4px; bottom: 4px; width: 2px;
          background: linear-gradient(180deg, rgba(0,217,126,0.35), rgba(110,218,253,0.0)); border-radius: 100px;
        }
        .mega-link {
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
          padding: 8px 12px; padding-left: 14px;
          border-radius: 10px;
          color: var(--navy); text-decoration: none;
          font-size: 0.88rem; font-weight: 500;
          transition: background .15s, color .15s;
        }
        .mega-link:hover { background: rgba(110,218,253,0.10); color: var(--navy-link); }
        .mega-link .badge {
          font-family: var(--font-manrope); font-weight: 700; font-size: 0.6rem;
          padding: 2px 7px; border-radius: 100px;
          background: rgba(0,217,126,0.16); color: #0B6B3F;
          border: 1px solid rgba(0,217,126,0.32);
          letter-spacing: 0.06em; text-transform: uppercase;
        }
        .mega-foot {
          margin-top: 14px; padding-top: 14px; border-top: 1px dashed rgba(11,26,61,0.10);
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
        }
        .mega-foot .micro { font-size: 0.78rem; color: var(--muted); }
        .mega-cta {
          background: var(--navy); color: white; text-decoration: none;
          font-family: var(--font-inter); font-size: 0.86rem; font-weight: 700;
          padding: 11px 20px; border-radius: 100px;
          display: inline-flex; align-items: center; gap: 8px;
          transition: background .2s, transform .15s, box-shadow .2s;
        }

        .drawer-overlay {
          position: fixed; inset: 0; background: rgba(11,26,61,0.55);
          backdrop-filter: blur(4px);
          opacity: 0; pointer-events: none; transition: opacity .25s; z-index: 60;
        }
        .drawer-overlay.is-open { opacity: 1; pointer-events: auto; }
        .drawer {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: min(420px, 92vw); background: white;
          transform: translateX(100%); transition: transform .28s cubic-bezier(.2,.7,.2,1);
          z-index: 70; display: flex; flex-direction: column;
          box-shadow: -20px 0 60px rgba(11,26,61,0.20);
        }
        .drawer.is-open { transform: translateX(0); }
        .drawer-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 12px; border-radius: 12px;
          color: var(--navy); text-decoration: none;
          font-size: 1rem; font-weight: 600;
          cursor: pointer; background: transparent; border: none; width: 100%;
          font-family: var(--font-inter); text-align: left;
        }
        .drawer-sub {
          max-height: 0; overflow: hidden; transition: max-height .3s ease;
          padding: 0 12px;
        }
        .drawer-row.is-open + .drawer-sub { max-height: 600px; }
        
        .drawer-cat {
          font-family: var(--font-manrope); font-weight: 700; font-size: 0.74rem;
          color: var(--navy-link); letter-spacing: 0.10em; text-transform: uppercase;
          padding: 14px 12px 6px;
        }
        .drawer-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 12px; border-radius: 10px;
          color: var(--muted); text-decoration: none;
          font-size: 0.92rem; margin: 0 12px;
        }
        .drawer-link:hover { background: rgba(110,218,253,0.10); color: var(--navy); }
      `}</style>

      <header className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-brand">
            <span>Analyti</span>
            <span className="x-mark">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="xg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00D97E"/>
                    <stop offset="100%" stopColor="#1DE5B5"/>
                  </linearGradient>
                </defs>
                <path d="M4 4 L20 20 M20 4 L4 20" stroke="url(#xg)" strokeWidth="3.5" strokeLinecap="round"/>
              </svg>
            </span>
            <span>Labs</span>
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
            <span>Analyti</span>
            <span className="x-mark">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 4 L20 20 M20 4 L4 20" stroke="url(#xg)" strokeWidth="3.5" strokeLinecap="round"/>
              </svg>
            </span>
            <span>Labs</span>
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
