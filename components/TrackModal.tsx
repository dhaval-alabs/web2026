'use client';

import React, { useState, useEffect, useMemo } from 'react';

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

const CONTEXT_BY_GOAL: Record<string, { question: string, options: any[] }> = {
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

function recommend(answers: any) {
  const { background, domain, time, goal } = answers;

  const courseMap: Record<string, any> = {
    "ai": { title: "Full Stack AI Course",           duration: "10 mo", track: "AI Specialization", price: "₹1,49,000" },
    "ds": { title: "Data Science Specialization with AI", duration: "10.5 mo", track: "Data Science", price: "₹1,29,000" },
    "analytics": { title: "Data Analytics with AI",   duration: "6 mo",  track: "Bootcamp",          price: "₹89,000" },
    "spec": { title: "Certified Big Data Engineer",   duration: "8 mo",  track: "Specialization",    price: "₹1,19,000" },
  };

  let primary;
  if (!domain || domain === "unsure") {
    if (background === "fresher" || goal === "first-job") primary = courseMap.analytics;
    else if (background === "leader" || goal === "promotion") primary = courseMap.ai;
    else primary = courseMap.ds;
  } else {
    primary = courseMap[domain];
  }

  const alt = (background === "fresher" || background === "early")
    ? (primary.title === courseMap.analytics.title ? courseMap.ds : courseMap.analytics)
    : (primary.title === courseMap.ai.title ? courseMap.spec : courseMap.ai);

  const cohort = {
    "evenings": "Weekday evenings · Live online",
    "weekends": "Weekends · Hybrid (Online + Cities)",
    "fulltime": "Bootcamp · In-person (Gurgaon)",
    "flexible": "Multiple options · we'll match"
  }[time as string] || "Multiple cohorts available";

  return { primary, alt, cohort };
}

interface TrackModalProps {
  open: boolean;
  onClose: () => void;
  initialTrack?: 'fresher' | 'experienced';
}

export default function TrackModal({ open, onClose, initialTrack = "fresher" }: TrackModalProps) {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<any>({});

  useEffect(() => {
    if (open) {
      setStepIdx(0);
      setAnswers({ background: initialTrack === "fresher" ? "fresher" : "experienced" });
    }
  }, [open, initialTrack]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const setAnswer = (key: string, val: any) => setAnswers((a: any) => ({ ...a, [key]: val }));
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
              {currentStep.id === "background" && (
                <div className="tm-step">
                  {BACKGROUNDS.map(b => (
                    <button key={b.id} className={`tm-option ${answers.background === b.id ? "is-selected" : ""}`} onClick={() => { setAnswer("background", b.id); setTimeout(onNext, 220); }}>
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
              )}
              {currentStep.id === "goal" && (
                <div className="tm-step">
                  {GOALS.map(g => (
                    <button key={g.id} className={`tm-option ${answers.goal === g.id ? "is-selected" : ""}`} onClick={() => { setAnswer("goal", g.id); setTimeout(onNext, 220); }}>
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
              )}
              {currentStep.id === "context" && (
                <div className="tm-step">
                  {CONTEXT_BY_GOAL[answers.goal]?.options.map(o => (
                    <button key={o.id} className={`tm-option ${answers.context === o.id ? "is-selected" : ""}`} onClick={() => { setAnswer("context", o.id); setTimeout(onNext, 220); }}>
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
              )}
              {currentStep.id === "time" && (
                <div className="tm-step">
                  {TIMES.map(t => (
                    <button key={t.id} className={`tm-option ${answers.time === t.id ? "is-selected" : ""}`} onClick={() => { setAnswer("time", t.id); setTimeout(onNext, 220); }}>
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
              )}
              {currentStep.id === "domain" && (
                <div className="tm-step">
                  {DOMAINS.map(d => (
                    <button key={d.id} className={`tm-option ${answers.domain === d.id ? "is-selected" : ""}`} onClick={() => { setAnswer("domain", d.id); setTimeout(onNext, 220); }}>
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
              )}
            </div>

            <div className="tm-foot">
              {stepIdx > 0 && <button className="tm-back" onClick={onBack}>← Back</button>}
              <span className="tm-foot-spacer" />
              <span className="tm-foot-hint">Pick to continue</span>
            </div>
          </>
        )}

        {showRec && <Recommendation answers={answers} onClose={onClose} onRestart={onRestart} />}
      </div>
    </div>
  );
}

function Recommendation({ answers, onClose, onRestart }: any) {
  const rec = useMemo(() => recommend(answers), [answers]);
  
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
          <span className="tm-rec-track-pill">{rec.primary?.track}</span>
        </div>
        <h3 className="tm-rec-title">{rec.primary?.title}</h3>
        <div className="tm-rec-meta">
          <span className="tm-rec-meta-item"><strong>{rec.primary?.duration}</strong> duration</span>
          <span className="tm-rec-meta-dot" />
          <span className="tm-rec-meta-item">{rec.cohort}</span>
          <span className="tm-rec-meta-dot" />
          <span className="tm-rec-meta-item"><strong>{rec.primary?.price}</strong></span>
        </div>
        <div className="tm-rec-cta-row">
          <button className="tm-rec-cta-primary">Book a free counselling call →</button>
          <button className="tm-rec-cta-secondary">View course details</button>
        </div>
      </div>

      {rec.alt && (
        <div className="tm-rec-alt">
          <span className="tm-rec-alt-label">Also a great fit</span>
          <span className="tm-rec-alt-title">{rec.alt.title}</span>
          <span className="tm-rec-alt-meta">{rec.alt.duration} · {rec.alt.price}</span>
          <span className="tm-rec-alt-link">Compare →</span>
        </div>
      )}

      <div className="tm-rec-foot">
        <button className="tm-restart" onClick={onRestart}>← Adjust answers</button>
        <button className="tm-close-rec" onClick={onClose}>Close for now</button>
      </div>
    </div>
  );
}
