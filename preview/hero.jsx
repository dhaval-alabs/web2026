/* Hero Section — AnalytiX Labs
   Two layout variants for the right-side track-picker:
   - "diagonal"  → cards stacked diagonally with overlap
   - "platter"   → 2-up grid sitting on a soft pastel platter
*/

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

function PartnerLogo({ kind }) {
  // Tiny, branded placeholder marks — replaceable with real SVGs later
  if (kind === "iitb") return (
    <span className="hr-partner-mark" style={{background:"linear-gradient(135deg,#1A4A8F,#3EC8F0)"}}>
      <span style={{fontWeight:800,fontFamily:"var(--font-display)",fontSize:"0.62rem",color:"#fff",letterSpacing:"0.08em"}}>IITB</span>
    </span>
  );
  if (kind === "iitp") return (
    <span className="hr-partner-mark" style={{background:"linear-gradient(135deg,#7B2D8E,#D9A6E0)"}}>
      <span style={{fontWeight:800,fontFamily:"var(--font-display)",fontSize:"0.62rem",color:"#fff",letterSpacing:"0.08em"}}>IITP</span>
    </span>
  );
  return (
    <span className="hr-partner-mark" style={{background:"linear-gradient(135deg,#D62828,#FF6B35)"}}>
      <span style={{fontWeight:800,fontFamily:"var(--font-display)",fontSize:"0.55rem",color:"#fff",letterSpacing:"0.04em"}}>NSCM</span>
    </span>
  );
}

function HeroLeft({ headlineOpt, onOpenModal }) {
  return (
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
        <button className="hr-btn-primary" onClick={onOpenModal}>
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
        <div className="hr-trust-list" data-editable="trust-partners">
          {TRUST_PARTNERS.map((p, i) => (
            <div className="hr-trust-item" key={i}>
              <PartnerLogo kind={p.logo} />
              <span className="hr-trust-name">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrackCard({ kind, onOpen }) {
  const isFresh = kind === "fresher";
  return (
    <button className={`hr-track-card hr-track-${kind}`} onClick={onOpen} aria-label={`Build my ${isFresh ? "learner" : "career"} track`}>
      <div className="hr-track-strip" />
      <div className="hr-track-head">
        <span className="hr-track-tag">{isFresh ? "0–2 yrs experience" : "3+ yrs experience"}</span>
        <span className="hr-track-icon" aria-hidden>
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
          ? "Job-oriented bootcamps with placement support, designed for college graduates and early career."
          : "Specialization tracks for working professionals — career switch, promotions, and senior roles."}
      </p>
      <ul className="hr-track-bullets">
        {isFresh
          ? ["Industry-vetted curriculum", "Live mentorship & peer cohort", "100% placement support"].map((b,i)=>(
              <li key={i}><span className="hr-bullet-dot"/>{b}</li>
            ))
          : ["Senior peer cohort", "Career switch / promotion path", "Capstone with hiring partners"].map((b,i)=>(
              <li key={i}><span className="hr-bullet-dot"/>{b}</li>
            ))}
      </ul>
      <div className="hr-track-foot">
        <span className="hr-track-outcome">
          {isFresh ? "Job-ready in 6 months" : "Promotion-ready in 4 months"}
        </span>
        <span className="hr-track-cta">
          Build my track
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </div>
    </button>
  );
}

function HeroRightDiagonal({ onOpen }) {
  return (
    <div className="hr-right hr-right-diagonal">
      <span className="hr-right-eyebrow">Find your track in 60 seconds</span>
      <div className="hr-diagonal-stack">
        <div className="hr-diag-slot hr-diag-slot-a"><TrackCard kind="fresher" onOpen={onOpen} /></div>
        <div className="hr-diag-slot hr-diag-slot-b"><TrackCard kind="professional" onOpen={onOpen} /></div>
        <div className="hr-diag-floater" aria-hidden>
          <div className="hr-floater-pulse" />
          <span className="hr-floater-num">9.6/10</span>
          <span className="hr-floater-lbl">Learner rating</span>
        </div>
      </div>
    </div>
  );
}

function HeroRightPlatter({ onOpen }) {
  return (
    <div className="hr-right hr-right-platter">
      <span className="hr-right-eyebrow">Find your track in 60 seconds</span>
      <div className="hr-platter">
        <div className="hr-platter-glow" aria-hidden />
        <div className="hr-platter-grid">
          <TrackCard kind="fresher" onOpen={onOpen} />
          <TrackCard kind="professional" onOpen={onOpen} />
        </div>
        <div className="hr-platter-foot">
          <span className="hr-platter-foot-num">20,000+</span>
          <span className="hr-platter-foot-sep" />
          <span className="hr-platter-foot-lbl">careers transformed across India</span>
        </div>
      </div>
    </div>
  );
}

function Hero({ variant = "diagonal", headlineId = "default", onOpenModal }) {
  const headlineOpt = HEADLINE_OPTIONS.find(h => h.id === headlineId) || HEADLINE_OPTIONS[0];
  return (
    <section className={`hero hero-${variant}`}>
      <div className="hr-bg" aria-hidden>
        <div className="hr-bg-blob hr-bg-blob-1" />
        <div className="hr-bg-blob hr-bg-blob-2" />
      </div>
      <div className="hr-grid">
        <HeroLeft headlineOpt={headlineOpt} onOpenModal={onOpenModal} />
        {variant === "diagonal"
          ? <HeroRightDiagonal onOpen={onOpenModal} />
          : <HeroRightPlatter onOpen={onOpenModal} />}
      </div>
    </section>
  );
}

Object.assign(window, { Hero, HEADLINE_OPTIONS, TRUST_PARTNERS, STAT_BADGES });
