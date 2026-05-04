/* Track Modal — conversational 4-step wizard with conditional branches.
   Steps:
   1. Background (which describes you?)
   2. Goal (what do you want to achieve?) — conditional follow-up:
        - "Career switch"  → ask current domain
        - "Promotion"      → ask current role level
        - "First job"      → ask graduation status
        - "Specialization" → ask current expertise
   3. Time commitment
   4. Domain interest
   5. Recommendation reveal
*/

const { useState, useEffect, useMemo } = React;

const STEPS = [
  { id: "background", title: "First — who are you?",        subtitle: "We'll tailor every recommendation around this." },
  { id: "goal",       title: "What do you want next?",       subtitle: "Be honest. We won't judge a career pivot." },
  { id: "context",    title: "Tell us a little more",         subtitle: "Helps us match the right cohort and pace." },
  { id: "time",       title: "How much time can you give?",   subtitle: "Cohorts run weekends, evenings, or full-time." },
  { id: "domain",     title: "Pick your battlefield",         subtitle: "What you build matters more than what you study." }
];

const BACKGROUNDS = [
  { id: "fresher",      label: "Student / Fresher",           sub: "Studying, or graduated within last 2 years",  emoji: "🎓" },
  { id: "early",        label: "Early-career professional",   sub: "1–4 years of work experience",                emoji: "🚀" },
  { id: "experienced",  label: "Experienced professional",    sub: "5+ years across roles or domains",            emoji: "💼" },
  { id: "leader",       label: "Manager / Leader",            sub: "I lead teams or own a P&L",                   emoji: "🧭" }
];

const GOALS = [
  { id: "first-job",      label: "Land my first data job",       sub: "I need a structured path to my first role" },
  { id: "career-switch",  label: "Switch into AI / Data",        sub: "I want to pivot from my current domain" },
  { id: "promotion",      label: "Get promoted in my role",      sub: "I want senior-level skills and projects" },
  { id: "specialization", label: "Specialize deeper",            sub: "I want to master one area (e.g. GenAI, ML)" }
];

const CONTEXT_BY_GOAL = {
  "first-job": {
    question: "Where are you in your studies?",
    options: [
      { id: "studying",   label: "Still studying",          sub: "Final year or earlier" },
      { id: "graduated",  label: "Recently graduated",      sub: "Within last 12 months" },
      { id: "looking",    label: "Actively job hunting",    sub: "Open to start any cohort" }
    ]
  },
  "career-switch": {
    question: "What's your current domain?",
    options: [
      { id: "engineering",  label: "Software / IT" },
      { id: "non-tech",     label: "Non-tech (Sales, Ops, HR, Finance)" },
      { id: "academia",     label: "Academia / Research" },
      { id: "other-tech",   label: "Other technical role" }
    ]
  },
  "promotion": {
    question: "Which level are you currently at?",
    options: [
      { id: "ic",          label: "Individual contributor" },
      { id: "lead",        label: "Tech lead / Senior IC" },
      { id: "manager",     label: "Manager" }
    ]
  },
  "specialization": {
    question: "How would you describe your data fluency today?",
    options: [
      { id: "begin",   label: "Comfortable with basics",   sub: "Excel, SQL, light Python" },
      { id: "inter",   label: "Intermediate",              sub: "Built ML models, used cloud tools" },
      { id: "adv",     label: "Advanced",                  sub: "Production systems, deep specialization" }
    ]
  }
};

const TIMES = [
  { id: "evenings",    label: "Evenings, after work",       sub: "8–10 hrs / week",  emoji: "🌙" },
  { id: "weekends",    label: "Weekends only",              sub: "12–15 hrs / week", emoji: "📅" },
  { id: "fulltime",    label: "Full-time bootcamp",         sub: "40+ hrs / week",   emoji: "🔥" },
  { id: "flexible",    label: "I'll figure it out",         sub: "Recommend the best",emoji: "💭" }
];

const DOMAINS = [
  { id: "ai",        label: "Artificial Intelligence",     sub: "Full-stack AI, agents, GenAI" },
  { id: "ds",        label: "Data Science",                sub: "ML, statistics, Python end-to-end" },
  { id: "analytics", label: "Business Analytics",          sub: "SQL, Power BI, dashboards" },
  { id: "spec",      label: "Specialization",              sub: "Big Data, MLOps, Deep Learning" },
  { id: "unsure",    label: "I'm not sure yet",            sub: "Recommend based on my profile" }
];

/* Recommendation engine — deterministic mapping based on answers */
function recommend(answers) {
  const { background, goal, time, domain } = answers;

  // Domain → primary course mapping
  const courseMap = {
    "ai": { title: "Full Stack AI Course",           duration: "10 mo", track: "AI Specialization", price: "₹1,49,000" },
    "ds": { title: "Data Science Specialization with AI", duration: "10.5 mo", track: "Data Science", price: "₹1,29,000" },
    "analytics": { title: "Data Analytics with AI",   duration: "6 mo",  track: "Bootcamp",          price: "₹89,000" },
    "spec": { title: "Certified Big Data Engineer",   duration: "8 mo",  track: "Specialization",    price: "₹1,19,000" },
    "unsure": null
  };

  // If domain is "unsure", pick from background+goal
  let primary;
  if (domain === "unsure") {
    if (background === "fresher" || goal === "first-job") primary = courseMap.analytics;
    else if (background === "leader" || goal === "promotion") primary = courseMap.ai;
    else primary = courseMap.ds;
  } else {
    primary = courseMap[domain];
  }

  // Alt course is always Data Analytics for fresher, Specialization for experienced
  const alt = (background === "fresher" || background === "early")
    ? (primary.title === courseMap.analytics.title ? courseMap.ds : courseMap.analytics)
    : (primary.title === courseMap.ai.title ? courseMap.spec : courseMap.ai);

  // Cohort schedule based on time
  const cohort = {
    "evenings": "Weekday evenings · Live online",
    "weekends": "Weekends · Hybrid (Online + Bangalore/Gurgaon)",
    "fulltime": "Bootcamp · In-person (Gurgaon)",
    "flexible": "Multiple options · we'll match"
  }[time] || "Multiple cohorts available";

  return { primary, alt, cohort };
}

function StepBackground({ value, onChange, onNext }) {
  return (
    <div className="tm-step">
      {BACKGROUNDS.map(b => (
        <button key={b.id} className={`tm-option ${value === b.id ? "is-selected" : ""}`} onClick={() => { onChange(b.id); setTimeout(onNext, 220); }}>
          <span className="tm-option-emoji">{b.emoji}</span>
          <span className="tm-option-body">
            <span className="tm-option-label">{b.label}</span>
            <span className="tm-option-sub">{b.sub}</span>
          </span>
          <span className="tm-option-check">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
          </span>
        </button>
      ))}
    </div>
  );
}

function StepGoal({ value, onChange, onNext }) {
  return (
    <div className="tm-step">
      {GOALS.map(g => (
        <button key={g.id} className={`tm-option ${value === g.id ? "is-selected" : ""}`} onClick={() => { onChange(g.id); setTimeout(onNext, 220); }}>
          <span className="tm-option-body">
            <span className="tm-option-label">{g.label}</span>
            <span className="tm-option-sub">{g.sub}</span>
          </span>
          <span className="tm-option-check">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
          </span>
        </button>
      ))}
    </div>
  );
}

function StepContext({ goal, value, onChange, onNext }) {
  const cfg = CONTEXT_BY_GOAL[goal];
  if (!cfg) return null;
  return (
    <div className="tm-step">
      <p className="tm-step-q">{cfg.question}</p>
      {cfg.options.map(o => (
        <button key={o.id} className={`tm-option ${value === o.id ? "is-selected" : ""}`} onClick={() => { onChange(o.id); setTimeout(onNext, 220); }}>
          <span className="tm-option-body">
            <span className="tm-option-label">{o.label}</span>
            {o.sub && <span className="tm-option-sub">{o.sub}</span>}
          </span>
          <span className="tm-option-check">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
          </span>
        </button>
      ))}
    </div>
  );
}

function StepTime({ value, onChange, onNext }) {
  return (
    <div className="tm-step">
      {TIMES.map(t => (
        <button key={t.id} className={`tm-option ${value === t.id ? "is-selected" : ""}`} onClick={() => { onChange(t.id); setTimeout(onNext, 220); }}>
          <span className="tm-option-emoji">{t.emoji}</span>
          <span className="tm-option-body">
            <span className="tm-option-label">{t.label}</span>
            <span className="tm-option-sub">{t.sub}</span>
          </span>
          <span className="tm-option-check">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
          </span>
        </button>
      ))}
    </div>
  );
}

function StepDomain({ value, onChange, onNext }) {
  return (
    <div className="tm-step">
      {DOMAINS.map(d => (
        <button key={d.id} className={`tm-option ${value === d.id ? "is-selected" : ""}`} onClick={() => { onChange(d.id); setTimeout(onNext, 220); }}>
          <span className="tm-option-body">
            <span className="tm-option-label">{d.label}</span>
            <span className="tm-option-sub">{d.sub}</span>
          </span>
          <span className="tm-option-check">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
          </span>
        </button>
      ))}
    </div>
  );
}

function Recommendation({ answers, onClose, onRestart }) {
  const rec = useMemo(() => recommend(answers), [answers]);
  const bgLabel = BACKGROUNDS.find(b => b.id === answers.background)?.label;
  return (
    <div className="tm-rec">
      <div className="tm-rec-celebrate">
        <span className="tm-rec-spark">✨</span>
        <span className="tm-rec-greeting">Got it — here's your custom track</span>
      </div>

      <div className="tm-rec-card">
        <div className="tm-rec-strip" />
        <div className="tm-rec-head">
          <span className="tm-rec-eyebrow">Recommended primary track</span>
          <span className="tm-rec-track-pill">{rec.primary.track}</span>
        </div>
        <h3 className="tm-rec-title">{rec.primary.title}</h3>
        <div className="tm-rec-meta">
          <span className="tm-rec-meta-item"><strong>{rec.primary.duration}</strong> duration</span>
          <span className="tm-rec-meta-dot" />
          <span className="tm-rec-meta-item">{rec.cohort}</span>
          <span className="tm-rec-meta-dot" />
          <span className="tm-rec-meta-item"><strong>{rec.primary.price}</strong></span>
        </div>
        <div className="tm-rec-cta-row">
          <button className="tm-rec-cta-primary">Book a free counselling call →</button>
          <button className="tm-rec-cta-secondary">View course details</button>
        </div>
      </div>

      <div className="tm-rec-alt">
        <span className="tm-rec-alt-label">Also a great fit</span>
        <span className="tm-rec-alt-title">{rec.alt.title}</span>
        <span className="tm-rec-alt-meta">{rec.alt.duration} · {rec.alt.price}</span>
        <span className="tm-rec-alt-link">Compare →</span>
      </div>

      <div className="tm-rec-foot">
        <button className="tm-restart" onClick={onRestart}>← Adjust answers</button>
        <button className="tm-close-rec" onClick={onClose}>Close for now</button>
      </div>
    </div>
  );
}

function TrackModal({ open, onClose, initialTrack = "fresher" }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState({});

  // Reset on open + seed background from track
  useEffect(() => {
    if (open) {
      setStepIdx(0);
      setAnswers({ background: initialTrack === "fresher" ? "fresher" : "experienced" });
    }
  }, [open, initialTrack]);

  // Lock body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const setAnswer = (key, val) => setAnswers(a => ({ ...a, [key]: val }));
  const totalSteps = STEPS.length;
  const onNext = () => setStepIdx(i => Math.min(i + 1, totalSteps));
  const onBack = () => setStepIdx(i => Math.max(i - 1, 0));
  const onRestart = () => { setStepIdx(0); setAnswers({}); };

  const showRec = stepIdx >= totalSteps;
  const currentStep = STEPS[stepIdx];

  return (
    <div className="tm-overlay" onClick={onClose}>
      <div className="tm-modal" onClick={e => e.stopPropagation()}>
        <button className="tm-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6 L18 18 M18 6 L6 18"/></svg>
        </button>

        {!showRec && (
          <>
            <div className="tm-progress">
              {STEPS.map((s, i) => (
                <span key={s.id} className={`tm-progress-dot ${i === stepIdx ? "is-active" : ""} ${i < stepIdx ? "is-done" : ""}`} />
              ))}
            </div>

            <div className="tm-head">
              <span className="tm-step-counter">Step {stepIdx + 1} of {totalSteps}</span>
              <h2 className="tm-title">{currentStep.title}</h2>
              <p className="tm-subtitle">{currentStep.subtitle}</p>
            </div>

            <div className="tm-body">
              {currentStep.id === "background" && <StepBackground value={answers.background} onChange={v => setAnswer("background", v)} onNext={onNext} />}
              {currentStep.id === "goal"       && <StepGoal       value={answers.goal}       onChange={v => setAnswer("goal", v)}       onNext={onNext} />}
              {currentStep.id === "context"    && <StepContext goal={answers.goal} value={answers.context} onChange={v => setAnswer("context", v)} onNext={onNext} />}
              {currentStep.id === "time"       && <StepTime       value={answers.time}       onChange={v => setAnswer("time", v)}       onNext={onNext} />}
              {currentStep.id === "domain"     && <StepDomain     value={answers.domain}     onChange={v => setAnswer("domain", v)}     onNext={onNext} />}
            </div>

            <div className="tm-foot">
              {stepIdx > 0 && <button className="tm-back" onClick={onBack}>← Back</button>}
              <span className="tm-foot-spacer" />
              <span className="tm-foot-hint">Pick to continue · or skip with Enter</span>
            </div>
          </>
        )}

        {showRec && <Recommendation answers={answers} onClose={onClose} onRestart={onRestart} />}
      </div>
    </div>
  );
}

Object.assign(window, { TrackModal });
