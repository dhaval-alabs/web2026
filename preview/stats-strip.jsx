/* Stats Strip — AnalytiX Labs
   Two layout variants:
   - "row":   4 equal pastel tiles in a row
   - "asym":  one hero stat + 3 smaller tiles
*/

const { useState, useEffect, useRef } = React;

const STATS = [
  {
    id: "careers",
    value: 20000, suffix: "+",
    label: "Careers transformed",
    sub: "Across India, US, Singapore",
    tone: "sky",
    icon: (
      <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
        <path d="M16 17 a4 4 0 1 0 0 -8 a4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M6 26c1.5-4 5-6 10-6s8.5 2 10 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="24" cy="9" r="2.4" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: "partners",
    value: 50, suffix: "+",
    label: "Hiring partners",
    sub: "Amazon · Walmart · Deloitte · Citi",
    tone: "mint",
    icon: (
      <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
        <path d="M16 4l11 5v9c0 6-5 10-11 10S5 24 5 18V9l11-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M11 16l4 4 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "rating",
    value: 9.6, decimals: 1, suffix: "/10",
    label: "Learner rating",
    sub: "From 4,800+ verified reviews",
    tone: "cream",
    icon: (
      <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
        <path d="M16 4l3.7 7.5 8.3 1.2-6 5.9 1.4 8.3L16 23l-7.4 3.9 1.4-8.3-6-5.9 8.3-1.2L16 4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "years",
    value: 12, suffix: "+ yrs",
    label: "Industry trust",
    sub: "Building careers since 2011",
    tone: "teal",
    icon: (
      <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
        <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M16 9v7l5 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
];

const HIRING_LOGOS = [
  "Amazon", "Microsoft", "Walmart", "Deloitte", "Citi", "Accenture",
  "EY", "Flipkart", "Tata Consultancy", "Wipro", "Infosys", "PwC"
];

/* Count-up on scroll using IntersectionObserver */
function useCountUp(target, decimals = 0, duration = 1400) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!ref.current || done) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const start = performance.now();
        const animate = (t) => {
          const elapsed = t - start;
          const p = Math.min(elapsed / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(target * eased);
          if (p < 1) requestAnimationFrame(animate);
          else setDone(true);
        };
        requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, done]);

  const display = decimals > 0
    ? val.toFixed(decimals)
    : Math.round(val).toLocaleString();
  return [ref, display];
}

function StatTile({ stat, large = false }) {
  const [ref, display] = useCountUp(stat.value, stat.decimals || 0);
  return (
    <div ref={ref} className={`ss-tile ss-tile-${stat.tone} ${large ? "is-large" : ""}`}>
      <div className="ss-tile-corner" aria-hidden>
        <span className="ss-corner-dot" />
        <span className="ss-corner-dot" />
        <span className="ss-corner-dot" />
      </div>
      <div className="ss-tile-icon">{stat.icon}</div>
      <div className="ss-tile-num">
        <span className="ss-num">{display}</span>
        {stat.suffix && <span className="ss-suffix">{stat.suffix}</span>}
      </div>
      <div className="ss-tile-label">{stat.label}</div>
      <div className="ss-tile-sub">{stat.sub}</div>
    </div>
  );
}

function StatsRow() {
  return (
    <section className="ss-section">
      <div className="ss-bg" aria-hidden>
        <div className="ss-bg-blob ss-bg-blob-1" />
        <div className="ss-bg-blob ss-bg-blob-2" />
      </div>
      <div className="ss-container">
        <div className="ss-eyebrow-wrap">
          <span className="ss-eyebrow-mark" />
          <span className="ss-eyebrow">Trusted since 2011</span>
        </div>
        <h2 className="ss-h2">Why <span className="ss-grad">20,000+ professionals</span> chose AnalytiX&nbsp;Labs</h2>
        <div className="ss-grid ss-grid-row">
          {STATS.map(s => <StatTile key={s.id} stat={s} />)}
        </div>
      </div>
    </section>
  );
}

function StatsAsym() {
  const [hero, ...rest] = STATS;
  return (
    <section className="ss-section">
      <div className="ss-bg" aria-hidden>
        <div className="ss-bg-blob ss-bg-blob-1" />
        <div className="ss-bg-blob ss-bg-blob-2" />
      </div>
      <div className="ss-container">
        <div className="ss-eyebrow-wrap">
          <span className="ss-eyebrow-mark" />
          <span className="ss-eyebrow">Trusted since 2011</span>
        </div>
        <h2 className="ss-h2">Built on <span className="ss-grad">real outcomes</span>, not promises</h2>
        <div className="ss-grid ss-grid-asym">
          <StatTile stat={hero} large />
          <div className="ss-asym-rest">
            {rest.map(s => <StatTile key={s.id} stat={s} />)}
          </div>
        </div>

        {/* Hiring logos marquee under both variants — provides texture */}
        <div className="ss-logos-strip">
          <span className="ss-logos-label">Hiring partners</span>
          <div className="ss-logos-track">
            {[...HIRING_LOGOS, ...HIRING_LOGOS].map((logo, i) => (
              <span key={i} className="ss-logo-chip">{logo}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { StatsRow, StatsAsym, STATS, HIRING_LOGOS });
