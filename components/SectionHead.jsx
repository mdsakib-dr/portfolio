export default function SectionHead({ eyebrow, title, id, index, description }) {
  return (
    <div id={id} className="section-head scroll-mt-24" data-reveal>
      <div className="section-kicker">
        {index ? <span className="section-index">{index}</span> : null}
        <p className="eyebrow">{eyebrow}</p>
        <span className="section-rule" aria-hidden="true" />
      </div>
      <h2 className="h-section">{title}</h2>
      {description ? (
        <p className="body-copy measure mt-3 text-[0.9375rem]">{description}</p>
      ) : null}
    </div>
  );
}
