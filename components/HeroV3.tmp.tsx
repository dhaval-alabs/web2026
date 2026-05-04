'use client';

import React, { useState } from 'react';

const HEADLINE_OPTIONS = [
  { id: "default",  primary: "INDIA'S TOP RANKED",   highlight: "DATA SCIENCE",     trail: "INSTITUTE", sub: "Industry-Relevant Job Oriented AI & Data Analytics Courses to Get You Hired!" },
  { id: "ai",       primary: "INDIA'S #1 INSTITUTE FOR",  highlight: "AI & DATA SCIENCE",  trail: "CAREERS", sub: "Where 20,000+ professionals built future-proof careers in AI, Data Science & Analytics." },
  { id: "outcome",  primary: "BUILD A CAREER IN",  highlight: "AI THAT LASTS",  trail: "DECADES", sub: "Live cohorts, hiring partners, and Nasscom-certified curriculum — designed for India's job market." },
  { id: "trust",    primary: "TRUSTED BY 20,000+ LEARNERS,",   highlight: "BACKED BY IIT",  trail: "PARTNERSHIPS", sub: "Industry-vetted programs in AI, Data Science & Analytics — from foundations to specialization." }
];

const TRUST_PARTNERS = [
  { name: "TIH at IIT Bombay",  logo: "iitb",     color: "#1A4A8F" },
  { name: "TIH at IIT Patna",   logo: "iitp",     color: "#7B2D8E" },
  { name: "FutureSkills · NASSCOM", logo: "nasscom", color: "#D62828" }
];

const STAT_BADGES = [
  { value: "20,000+", label: "Careers transformed" },
  { value: "9.6/10",  label: "Learner rating" },
  { value: "12+ yrs", label: "Industry trust" }
];

function PartnerLogo({ kind }: { kind: string }) {
  if (kind === "iitb") return (
    <span className="hr-partner-mark" style={{background:"linear-gradient(135deg,#1A4A8F,#3EC8F0)"}}>
      <span style={{fontWeight:800,fontFamily:"var(--font-manrope)",fontSize:"0.62rem",color:"#fff",letterSpacing:"0.08em"}}>IITB</span>
    </span>
  );
  if (kind === "iitp") return (
    <span className="hr-partner-mark" style={{background:"linear-gradient(135deg,#7B2D8E,#D9A6E0)"}}>
      <span style={{fontWeight:800,fontFamily:"var(--font-manrope)",fontSize:"0.62rem",color:"#fff",letterSpacing:"0.08em"}}>IITP</span>
    </span>
  );
  return (
    <span className="hr-partner-mark" style={{background:"linear-gradient(135deg,#D62828,#FF6B35)"}}>
      <span style={{fontWeight:800,fontFamily:"var(--font-manrope)",fontSize:"0.55rem",color:"#fff",letterSpacing:"0.04em"}}>NSCM</span>
    </span>
  );
}

function TrackCard({ kind, onOpen }: { kind: 'fresher' | 'professional', onOpen?: () => void }) {
  const isFresh = kind === "fresher";
  return (
    <button className={`hr-track-card hr-track-${kind}`} onClick={onOpen}>
      <div className="hr-track-strip" />
      <div className="hr-track-head">
        <span className="hr-track-tag">{isFresh ? "0–2 yrs experience" : "3+ yrs experience"}</span>
        <span className="hr-track-icon">
          {isFresh ? (
            <svg viewBox="0 0 48 48" width="44" height="44" fill="none">
              <circle cx="24" cy="24" r="22" fill="rgba(110,218,253,0.18)" />
              <path d="M14 30 L24 18 L34 30" stroke="#1A4A8F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="24" cy="14" r="3" fill="#00D97E"/>
              <circle cx="14" cy="32" r="2" fill="#1DE5B5"/>
              <circle cx="34" cy="32" r="2" fill="#6EDAFD"/>
            </svg>
          ) : (
            <svg viewBox="0 0 48 48" width="44" height="44" fill="none">
              <rect x="4" y="14" width="40" height="28" rx="4" fill="rgba(0,217,126,0.18)"/>
              <rect x="18" y="8" width="12" height="8" rx="2" stroke="#0B1A3D" strokeWidth="2"/>
              <path d="M8 24 L40 24" stroke="#0B1A3D" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="24" cy="30" r="4" fill="#00D97E"/>
              <path d="M24 26 L24 22" stroke="#0B1A3D" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </span>
      </div>
      <h3 className="hr-track-title">
        {isFresh ? "Land your first data job" : "Level up your career"}
      </h3>
      <p className="hr-track-desc">
        {isFresh
          ? "Job-oriented bootcamps with placement support, designed for graduates."
          : "Specialization tracks for working professionals — career switch & promotion."}
      </p>
      <ul className="hr-track-bullets">
        {(isFresh 
          ? ["Industry-vetted curriculum", "Live mentorship & peer cohort", "100% placement support"]
          : ["Senior peer cohort", "Career switch path", "Capstone projects"]
        ).map((b,i)=>(
          <li key={i}><span className="hr-bullet-dot"/>{b}</li>
        ))}
      </ul>
      <div className="hr-track-foot">
        <span className="hr-track-outcome">
          {isFresh ? "Job-ready in 6m" : "Promotion-ready in 4m"}
        </span>
        <span className="hr-track-cta">
          Build my track
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </div>
    </button>
  );
}

export default function HeroV3({ variant = "diagonal" }: { variant?: 'diagonal' | 'platter' }) {
  const headlineOpt = HEADLINE_OPTIONS[0];

  return (
    <>
        .hero { position: relative; padding: 60px 40px 80px; overflow: hidden; }
        .hr-bg { position: absolute; inset: 0; pointer-events: none; }
        .hr-bg-blob { position: absolute; border-radius: 50%; filter: blur(80px); }
        .hr-bg-blob-1 { top: -120px; right: -60px; width: 540px; height: 540px; background: radial-gradient(circle, rgba(110,218,253,0.32), transparent 70%); }
        .hr-bg-blob-2 { bottom: -160px; left: 10%; width: 600px; height: 480px; background: radial-gradient(circle, rgba(0,217,126,0.18), transparent 70%); }
        
        .hr-grid {
          position: relative; z-index: 2;
          display: grid; grid-template-columns: minmax(0,1.05fr) minmax(0,1fr);
          gap: 56px; align-items: center;
          max-width: 1280px; margin: 0 auto;
        }

        .hr-since {
          display: inline-block; padding: 4px 10px; margin-bottom: 18px;
          background: rgba(0,217,126,0.16); color: #0B6B3F;
          border: 1px solid rgba(0,217,126,0.32);
          border-radius: 6px; font-size: 0.78rem; font-weight: 700;
          font-family: var(--font-manrope); letter-spacing: 0.06em;
        }

        .hr-h1 {
          font-family: var(--font-manrope);
          font-size: clamp(2.2rem, 4vw, 3.4rem); font-weight: 800;
          line-height: 1.08; letter-spacing: -0.025em;
          color: var(--navy); margin: 0 0 18px;
        }

        .hr-grad { background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }

        .hr-sub { font-size: 1rem; color: var(--muted); margin: 0 0 26px; max-width: 520px; line-height: 1.65; }

        .hr-stats { display: flex; gap: 28px; margin-bottom: 28px; flex-wrap: wrap; }
        .hr-stat { position: relative; padding-left: 14px; }
        .hr-stat::before { content: ""; position: absolute; left: 0; top: 4px; bottom: 4px; width: 3px; background: var(--grad); border-radius: 100px; }
        .hr-stat-num { font-family: var(--font-manrope); font-size: 1.4rem; font-weight: 800; color: var(--navy); line-height: 1; }
        .hr-stat-lbl { font-size: 0.74rem; color: var(--muted); margin-top: 4px; }

        .hr-cta-row { display: flex; gap: 14px; margin-bottom: 32px; }
        .hr-btn-primary {
          background: var(--navy); color: white; border: none;
          padding: 14px 24px; border-radius: 100px; font-weight: 700; font-size: 0.92rem;
          display: inline-flex; align-items: center; gap: 8px; cursor: pointer;
          transition: transform .15s, box-shadow .2s, background .2s;
        }
        .hr-btn-primary:hover { background: #1A3060; transform: translateY(-2px); box-shadow: 0 10px 24px rgba(11,26,61,0.2); }
        .hr-btn-secondary {
          background: white; color: var(--navy); border: 1.5px solid var(--border);
          padding: 14px 24px; border-radius: 100px; font-weight: 700; font-size: 0.92rem;
          display: inline-flex; align-items: center; gap: 8px; cursor: pointer;
          transition: border-color .2s, transform .15s;
        }
        .hr-btn-secondary:hover { border-color: var(--teal); transform: translateY(-2px); }

        .hr-trust { background: white; border: 1px solid var(--border); border-radius: 14px; padding: 14px 18px; box-shadow: 0 4px 18px rgba(11,26,61,0.04); }
        .hr-trust-label { display: inline-block; font-family: var(--font-manrope); font-weight: 700; font-size: 0.74rem; color: var(--navy-link); letter-spacing: 0.10em; text-transform: uppercase; margin-bottom: 10px; }
        .hr-trust-list { display: flex; gap: 18px; flex-wrap: wrap; align-items: center; }
        .hr-trust-item { display: flex; align-items: center; gap: 8px; }
        .hr-partner-mark { width: 38px; height: 38px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .hr-trust-name { font-size: 0.82rem; font-weight: 600; color: var(--navy); }

        .hr-right-eyebrow {
          display: inline-block; font-family: var(--font-manrope); font-weight: 800;
          font-size: 0.78rem; color: var(--navy-link); letter-spacing: 0.12em; text-transform: uppercase;
          margin-bottom: 18px; padding: 6px 12px; background: rgba(110,218,253,0.16); border-radius: 100px;
          border: 1px solid rgba(110,218,253,0.32);
        }

        .hr-track-card {
          position: relative; text-align: left; background: white; border: 1px solid var(--border);
          border-radius: 20px; padding: 22px; box-shadow: 0 8px 28px rgba(11,26,61,0.08);
          transition: transform .2s, box-shadow .25s, border-color .2s; display: flex; flex-direction: column; gap: 12px; width: 100%;
        }
        .hr-track-card:hover { transform: translateY(-4px); box-shadow: 0 18px 44px rgba(11,26,61,0.14); border-color: rgba(0,217,126,0.4); }
        .hr-track-strip { position: absolute; top: 0; left: 0; right: 0; height: 4px; border-radius: 20px 20px 0 0; }
        .hr-track-fresher .hr-track-strip { background: linear-gradient(90deg, #6EDAFD, #1DE5B5); }
        .hr-track-professional .hr-track-strip { background: linear-gradient(90deg, #00D97E, #1A4A8F); }
        .hr-track-fresher { background: linear-gradient(180deg, #F4FBFF 0%, #FFFFFF 50%); }
        .hr-track-professional { background: linear-gradient(180deg, #F0FDF7 0%, #FFFFFF 50%); }

        .hr-track-tag { font-family: var(--font-manrope); font-weight: 700; font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 10px; border-radius: 100px; }
        .hr-track-fresher .hr-track-tag { background: rgba(110,218,253,0.20); color: #0B3A66; }
        .hr-track-professional .hr-track-tag { background: rgba(0,217,126,0.20); color: #0B6B3F; }
        .hr-track-title { font-family: var(--font-manrope); font-size: 1.18rem; font-weight: 800; color: var(--navy); margin: 0; line-height: 1.25; }
        .hr-track-desc { font-size: 0.85rem; color: var(--muted); margin: 0; line-height: 1.55; }
        .hr-track-bullets { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 7px; }
        .hr-track-bullets li { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--navy); font-weight: 500; }
        .hr-bullet-dot { width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0; background: rgba(0,217,126,0.20); position: relative; }
        .hr-bullet-dot::after { content: ""; position: absolute; inset: 4px; background: var(--teal); border-radius: 50%; }
        .hr-track-foot { margin-top: 4px; padding-top: 14px; border-top: 1px dashed rgba(11,26,61,0.10); display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .hr-track-outcome { font-family: var(--font-manrope); font-weight: 700; font-size: 0.82rem; color: var(--navy); }
        .hr-track-cta { display: inline-flex; align-items: center; gap: 6px; font-weight: 700; font-size: 0.84rem; color: var(--teal-dark); }

        .hr-diagonal-stack { position: relative; min-height: 720px; padding-top: 20px; }
        .hr-diag-slot { position: absolute; width: 92%; max-width: 440px; }
        .hr-diag-slot-a { top: 0; left: 0; transform: rotate(-3deg); z-index: 1; }
        .hr-diag-slot-b { top: 280px; right: 0; transform: rotate(2deg); z-index: 2; }
        .hr-diag-slot:hover { z-index: 3; }
        
        .hr-diag-floater {
          position: absolute; top: 38%; right: -10px; z-index: 4;
          background: var(--navy); color: white;
          border-radius: 14px; padding: 10px 14px;
          display: flex; flex-direction: column; align-items: flex-start; gap: 2px;
          box-shadow: 0 12px 30px rgba(11,26,61,0.30);
        }
        .hr-floater-pulse {
          position: absolute; top: 10px; right: 10px;
          width: 8px; height: 8px; border-radius: 50%; background: var(--teal);
          box-shadow: 0 0 0 4px rgba(0,217,126,0.3);
          animation: pulse 1.6s infinite;
        }
        @keyframes pulse { 50% { box-shadow: 0 0 0 8px rgba(0,217,126,0.05); } }
        .hr-floater-num { font-family: var(--font-manrope); font-size: 1.2rem; font-weight: 800; }
        .hr-floater-lbl { font-size: 0.7rem; opacity: 0.7; }

        @media (max-width: 1023px) {
          .hr-grid { grid-template-columns: 1fr; gap: 48px; }
          .hero { padding: 40px 20px 60px; }
          .hr-diagonal-stack { min-height: auto; display: flex; flex-direction: column; gap: 24px; padding: 0; }
          .hr-diag-slot { position: relative; width: 100%; max-width: none; transform: none; top: auto; left: auto; right: auto; }
          .hr-diag-floater { position: absolute; right: 20px; top: -20px; z-index: 10; }
        }

        .hr-platter {
          position: relative; background: linear-gradient(135deg, rgba(110,218,253,0.16), rgba(0,217,126,0.12));
          border: 1px solid rgba(110,218,253,0.32); border-radius: 28px; padding: 28px;
        }
        .hr-platter-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 720px) { .hr-platter-grid { grid-template-columns: 1fr; } }
        .hr-platter-foot { margin-top: 18px; padding-top: 16px; border-top: 1px dashed rgba(11,26,61,0.15); display: flex; align-items: center; gap: 12px; justify-content: center; }
        .hr-platter-foot-num { font-family: var(--font-manrope); font-weight: 800; font-size: 1.6rem; color: var(--navy); }
        .hr-platter-foot-sep { width: 4px; height: 4px; border-radius: 50%; background: var(--navy); opacity: 0.3; }
        .hr-platter-foot-lbl { font-size: 0.85rem; color: var(--muted); font-weight: 500; }
      `}</style>

      <section className={`hero hero-${variant}`}>
        <div className="hr-bg" aria-hidden="true">
          <div className="hr-bg-blob hr-bg-blob-1" />
          <div className="hr-bg-blob hr-bg-blob-2" />
        </div>
        <div className="hr-grid">
          <div className="hr-left">
            <span className="hr-since">Since 2011</span>
            <h1 className="hr-h1">
              {headlineOpt.primary}<br/>
              <span className="hr-grad">{headlineOpt.highlight}</span>{" "}
              {headlineOpt.trail}
            </h1>
            <p className="hr-sub">{headlineOpt.sub}</p>
            <div className="hr-cta-row">
              <button className="hr-btn-secondary">Learn More</button>
              <button className="hr-btn-primary">
                Find My Track
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </button>
            </div>

            <div className="hr-stats">
              {STAT_BADGES.map((s, i) => (
                <div className="hr-stat" key={i}>
                  <div className="hr-stat-num">{s.value}</div>
                  <div className="hr-stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="hr-trust">
              <span className="hr-trust-label">In Partnership with</span>
              <div className="hr-trust-list">
                {TRUST_PARTNERS.map((p, i) => (
                  <div className="hr-trust-item" key={i}>
                    <PartnerLogo kind={p.logo} />
                    <span className="hr-trust-name">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hr-right">
            <span className="hr-right-eyebrow">Find your track in 60 seconds</span>
            {variant === "diagonal" ? (
              <div className="hr-diagonal-stack">
                <div className="hr-diag-slot hr-diag-slot-a"><TrackCard kind="fresher" /></div>
                <div className="hr-diag-slot hr-diag-slot-b"><TrackCard kind="professional" /></div>
                <div className="hr-diag-floater" aria-hidden="true">
                  <div className="hr-floater-pulse" />
                  <span className="hr-floater-num">9.6/10</span>
                  <span className="hr-floater-lbl">Learner rating</span>
                </div>
              </div>
            ) : (
              <div className="hr-platter">
                <div className="hr-platter-grid">
                  <TrackCard kind="fresher" />
                  <TrackCard kind="professional" />
                </div>
                <div className="hr-platter-foot">
                  <span className="hr-platter-foot-num">20,000+</span>
                  <span className="hr-platter-foot-sep" />
                  <span className="hr-platter-foot-lbl">careers transformed across India</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
