// CourseCard.jsx — AnalytixLabs course card, mobile-first
// Two visual styles map to the live "TracksFees" component on careersuccess.analytixlabs.co.in:
//   variant="primary"   → dark navy gradient card (authoritative track)
//   variant="secondary" → light card with teal border (default / popular track)
// Plus a third "compact" variant for course catalogs.

const CourseCard = ({
  variant = "secondary",
  badge,            // e.g. "Track 1" or "Most Popular ✦"
  title,            // e.g. "Data Analytics + AI"
  description,
  price,            // e.g. "₹58,000"
  priceNote,        // e.g. "+ GST · 10.5 months · Full AI stack"
  duration,         // e.g. "10.5 mo"
  mode,             // e.g. "Live Online · Weekend"
  certified = true,
  ctaLabel = "Explore Course →",
  ctaHref = "#",
  highlights = [],  // [{label, isAi}]
}) => {
  const isPrimary = variant === "primary";
  return (
    <article
      className="course-card"
      data-variant={variant}
    >
      {/* Top hairline gradient strip */}
      <span className="cc-strip" />

      {/* Optional inner glow on primary */}
      {isPrimary && <span className="cc-glow" aria-hidden />}

      {/* Header row: badge + duration pill */}
      <header className="cc-head">
        {badge && <span className="cc-badge">{badge}</span>}
        {duration && <span className="cc-duration">{duration}</span>}
      </header>

      <h3 className="cc-title">{title}</h3>
      {description && <p className="cc-desc">{description}</p>}

      {/* Tool / topic chips */}
      {highlights.length > 0 && (
        <ul className="cc-chips">
          {highlights.map((h, i) => (
            <li key={i} className={h.isAi ? "tag-teal" : "tag-sky"}>{h.label}</li>
          ))}
        </ul>
      )}

      {/* Meta row */}
      <div className="cc-meta">
        {mode && (
          <span className="cc-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
            {mode}
          </span>
        )}
        {certified && (
          <span className="cc-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z"/><path d="m9 12 2 2 4-4"/></svg>
            Nasscom Certified
          </span>
        )}
      </div>

      {/* Price block */}
      {price && (
        <div className="cc-price-row">
          <div>
            <div className="cc-price">{price}</div>
            {priceNote && <div className="cc-price-note">{priceNote}</div>}
          </div>
        </div>
      )}

      <a href={ctaHref} className={isPrimary ? "cc-cta cc-cta-ghost" : "cc-cta cc-cta-primary"}>
        {ctaLabel}
      </a>
    </article>
  );
};

window.CourseCard = CourseCard;
