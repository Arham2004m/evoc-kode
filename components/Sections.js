import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, MessageCircle, Phone, Plus } from "lucide-react";
import Icon from "./Icon";
import ImageStreamHero from "@/components/ui/image-stream-hero";
import {
  crossPlatform,
  faq,
  features,
  finalCta,
  footer,
  howWeWork,
  site,
  solutions,
  techBand,
  testimonials,
  whyPick,
  whyUs,
} from "@/lib/site";

function Title({ title }) {
  return (
    <>
      {title.before}
      {title.em && <em>{title.em}</em>}
      {title.after}
    </>
  );
}

function SectionHead({ eyebrow, title, text, align = "center", id }) {
  return (
    <div className={`section-head section-head--${align} reveal`}>
      <span className="eyebrow">
        <span className="eyebrow-dot" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="section-title" id={id}>
        <Title title={title} />
      </h2>
      {text && <p className="section-text">{text}</p>}
    </div>
  );
}

function IconTile({ name, size = 20 }) {
  return (
    <span className="icon-tile" aria-hidden="true">
      <Icon name={name} size={size} />
    </span>
  );
}

export function WhyUs() {
  return (
    <section className="section section--stream" id="why-us" aria-labelledby="why-us-title">
      <ImageStreamHero
        className="why-stream"
        images={whyUs.stream.images}
        speed={whyUs.stream.speed}
        cards={whyUs.stream.cards}
        axis={whyUs.stream.axis}
      >
        <div className="container why-stream-head">
          <div className="why-stream-top reveal">
            <span className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              {whyUs.eyebrow}
            </span>
            <h2 className="section-title" id="why-us-title">
              <Title title={whyUs.title} />
            </h2>
          </div>
          <p className="section-text why-stream-text reveal">{whyUs.text}</p>
        </div>
      </ImageStreamHero>
      <div className="container">
        <ul className="card-grid card-grid--4">
          {whyUs.items.map((item) => (
            <li key={item.title} className="glass card reveal">
              <IconTile name={item.icon} />
              <h3 className="card-title">{item.title}</h3>
              <p className="card-text">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HowWeWork() {
  return (
    <section className="section" id="how-we-work" aria-labelledby="how-title">
      <div className="container">
        <SectionHead {...howWeWork} id="how-title" />
        <ol className="steps">
          {howWeWork.steps.map((step, i) => (
            <li key={step.title} className="glass step reveal">
              <div className="step-top">
                <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                <IconTile name={step.icon} />
              </div>
              <h3 className="card-title">{step.title}</h3>
              <p className="card-text">{step.text}</p>
              <ul className="tags" aria-label={`${step.title} deliverables`}>
                {step.tags.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function TechBand() {
  const row = techBand.tools;
  return (
    <section className="section section--tight" id="tech" aria-labelledby="tech-title">
      <div className="container">
        <SectionHead {...techBand} id="tech-title" />
      </div>
      <div className="marquee glass reveal">
        <ul className="marquee-track">
          {[...row, ...row].map((tool, i) => (
            <li key={i} className="marquee-item" aria-hidden={i >= row.length ? "true" : undefined}>
              <span className="marquee-dot" aria-hidden="true" />
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Solutions() {
  return (
    <section className="section" id="solutions" aria-labelledby="solutions-title">
      <div className="container">
        <SectionHead {...solutions} id="solutions-title" />
        <ul className="card-grid card-grid--4 solutions">
          {solutions.items.map((item) => (
            <li key={item.title} className={`glass card solution reveal${item.wide ? " solution--wide" : ""}`}>
              <IconTile name={item.icon} />
              <div className="solution-body">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-text">{item.text}</p>
              </div>
              {item.wide && (
                <a className="btn btn-solid solution-cta" href="#contact">
                  Talk to Us
                  <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Features() {
  return (
    <section className="section" id="features" aria-labelledby="features-title">
      <div className="container">
        <SectionHead {...features} id="features-title" />
        <div className="glass feature-panel reveal">
          <ul className="feature-list">
            {features.items.map((f) => (
              <li key={f.label} className="feature-chip">
                <span className="feature-icon" aria-hidden="true">
                  <Icon name={f.icon} size={16} strokeWidth={1.8} />
                </span>
                {f.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function CrossPlatform() {
  return (
    <section className="section" id="cross-platform" aria-labelledby="cross-title">
      <div className="container split">
        <div className="split-copy">
          <SectionHead eyebrow={crossPlatform.eyebrow} title={crossPlatform.title} align="left" id="cross-title" />
          <p className="section-text split-text reveal">{crossPlatform.text}</p>
          <ul className="points reveal">
            {crossPlatform.points.map((p) => (
              <li key={p} className="point">
                <span className="point-check" aria-hidden="true">
                  <Check size={14} strokeWidth={2.4} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="devices reveal" aria-hidden="true">
          <div className="device-glow" />
          <div className="device device--android">
            <div className="device-screen">
              <span className="device-cam" />
              <DeviceUi />
            </div>
            <span className="device-label">Android</span>
          </div>
          <div className="device-link glass">
            <span className="device-link-dot" />1 codebase
          </div>
          <div className="device device--ios">
            <div className="device-screen">
              <span className="device-notch" />
              <DeviceUi />
            </div>
            <span className="device-label">iPhone</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function DeviceUi() {
  return (
    <div className="device-ui">
      <Image className="device-logo" src="/logo-light.png" alt="" width={610} height={171} />
      <span className="ui-hero" />
      <span className="ui-row">
        <span className="ui-avatar" />
        <span className="ui-lines">
          <span className="ui-line" />
          <span className="ui-line ui-line--short" />
        </span>
      </span>
      <span className="ui-row">
        <span className="ui-avatar ui-avatar--alt" />
        <span className="ui-lines">
          <span className="ui-line" />
          <span className="ui-line ui-line--short" />
        </span>
      </span>
      <span className="ui-button" />
    </div>
  );
}

export function WhyPick() {
  return (
    <section className="section" id="why-pick-us" aria-labelledby="pick-title">
      <div className="container">
        <SectionHead {...whyPick} id="pick-title" />
        <ol className="pick-list">
          {whyPick.items.map((item, i) => (
            <li key={item.title} className="glass pick reveal">
              <span className="pick-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <IconTile name={item.icon} size={18} />
              <div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-text">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function initials(name) {
  const letters = name
    .replace(/[^A-Za-z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase());
  return (letters[0] || "C") + (letters[1] || "");
}

function QuoteMark() {
  return (
    <svg className="testimonial-mark" viewBox="0 0 56 44" aria-hidden="true">
      <path
        fill="#3071F2"
        d="M0 44V27.2C0 12.9 7.4 3.8 22 0l2.6 6.3C16.7 9 12.7 13.6 12.4 20.5H24V44H0Zm32 0V27.2C32 12.9 39.4 3.8 54 0l2 6.3C48.7 9 44.7 13.6 44.4 20.5H56V44H32Z"
      />
    </svg>
  );
}

function Testimonial({ item, featured }) {
  return (
    <figure className={`glass testimonial reveal${featured ? " testimonial--featured" : ""}`}>
      <QuoteMark />
      <blockquote className="testimonial-quote">
        {item.headline && <p className="testimonial-headline">{item.headline}</p>}
        <p className="testimonial-body">{item.quote}</p>
      </blockquote>
      {item.result && (
        <p className="testimonial-result">
          <span className="testimonial-result-icon" aria-hidden="true">
            <Check size={12} strokeWidth={2.6} />
          </span>
          {item.result}
        </p>
      )}
      <figcaption className="testimonial-by">
        <span className="testimonial-avatar" aria-hidden="true">
          {initials(item.name)}
        </span>
        <span className="testimonial-meta">
          <span className="testimonial-name">{item.name}</span>
          <span className="testimonial-role">
            {[item.role, item.business].filter(Boolean).join(", ")}
          </span>
        </span>
        {item.industry && <span className="tag testimonial-tag">{item.industry}</span>}
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const [featured, ...rest] = testimonials.items;
  return (
    <section className="section" id="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHead eyebrow={testimonials.eyebrow} title={testimonials.title} id="testimonials-title" />
        <div className={`testimonials${rest.length ? "" : " testimonials--single"}`}>
          {featured && <Testimonial item={featured} featured />}
          {rest.length > 0 && (
            <div className="testimonial-stack">
              {rest.map((item, i) => (
                <Testimonial key={i} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <SectionHead eyebrow={faq.eyebrow} title={faq.title} align="left" id="faq-title" />
        <div className="faq-list reveal">
          {faq.items.map((item, i) => (
            <details key={item.q} className="glass faq-item" open={i === 0}>
              <summary className="faq-q">
                <span>{item.q}</span>
                <span className="faq-icon" aria-hidden="true">
                  <Plus size={16} strokeWidth={2} />
                </span>
              </summary>
              <p className="faq-a">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="section section--cta" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="glass cta-panel reveal">
          <div className="cta-glow" aria-hidden="true" />
          <h2 className="section-title cta-title" id="contact-title">
            <Title title={finalCta.title} />
          </h2>
          <p className="section-text cta-text">{finalCta.text}</p>
          <div className="cta-actions">
            <a className="btn btn-solid btn-hero" href={finalCta.cta.href} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={17} strokeWidth={2} aria-hidden="true" />
              {finalCta.cta.label}
            </a>
            <a className="btn btn-ghost btn-hero-ghost" href={site.phoneHref}>
              <Phone size={16} strokeWidth={2} aria-hidden="true" />
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="footer-logo" aria-label={`${site.brand} — back to top`}>
              <Image src="/logo-light.png" alt="" width={610} height={171} />
            </a>
            <p className="footer-desc">{footer.description}</p>
          </div>
          {footer.columns.map((col) => (
            <nav key={col.title} className="footer-col" aria-label={col.title}>
              <h3 className="footer-title">{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {l.label}
                      {l.external && <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="footer-bottom">
          <p>
            © {site.year} {site.companyName}. {site.address}
          </p>
          <a href="#top" className="footer-top">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
