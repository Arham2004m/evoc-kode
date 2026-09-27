"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Phone, Play } from "lucide-react";
import {
  headerCta,
  heroBadge,
  heroSecondaryCta,
  heroSlides,
  heroFluid,
  nav,
  site,
  stats,
} from "@/lib/site";
import StatIcon from "./StatIcon";
import FluidFieldBackground from "@/components/ui/fluid-field";

const NAV_DELAYS = ["0.16s", "0.28s", "0.40s", "0.52s", "0.64s"];
const STAT_DELAYS = ["1.12s", "1.28s", "1.44s", "1.60s"];

export default function HeroFrame() {
  const frameRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [changed, setChanged] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const paused = userPaused || hoverPaused || menuOpen;

  // 1 + 2: entrance classes — each element settles on its own animationend,
  // and everything is forced visible if animations never start.
  useEffect(() => {
    const els = Array.from(frameRef.current.querySelectorAll(".appear, .hero-photo"));
    const cleanups = els.map((el) => {
      const onEnd = (e) => {
        if (e.target !== el) return;
        el.classList.add("is-in");
        el.removeEventListener("animationend", onEnd);
      };
      el.addEventListener("animationend", onEnd);
      return () => el.removeEventListener("animationend", onEnd);
    });

    let raf2;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const animating = els.some(
          (el) =>
            typeof el.getAnimations === "function" &&
            el.getAnimations().some((a) => a.playState === "running" || a.playState === "finished")
        );
        if (!animating) els.forEach((el) => el.classList.add("is-in"));
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  // 3–5: menu state, Escape, and closing when the viewport grows to desktop.
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const onChange = (e) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      document.body.classList.remove("menu-open");
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const goTo = useCallback((i) => {
    setActive((i + heroSlides.length) % heroSlides.length);
    setChanged(true);
    setCycle((c) => c + 1);
  }, []);

  const onProgressEnd = (e) => {
    if (e.target === e.currentTarget) goTo(active + 1);
  };

  return (
    <div className="hero-frame" ref={frameRef}>
      <div className="hero-photo" aria-hidden="true">
        <FluidFieldBackground className="hero-fluid" {...heroFluid} />
      </div>

      <div className="page">
        <div className="menu-backdrop" aria-hidden="true" onClick={closeMenu} />

        <header className="header">
          <a
            className="logo appear appear--scale"
            href="#top"
            aria-label={site.brand}
            style={{ "--d": "0.08s" }}
            onClick={closeMenu}
          >
            <Image className="logo-img" src="/logo-light.png" alt="" width={610} height={171} priority />
          </a>

          <nav id="site-nav" className="site-nav" aria-label="Primary">
            {nav.map((item, i) => (
              <a
                key={item.href}
                className={`nav-link appear ${i % 2 ? "appear--soft" : "appear--scale"}`}
                href={item.href}
                style={{ "--d": NAV_DELAYS[i] }}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <a className="nav-link nav-phone" href={site.phoneHref} onClick={closeMenu}>
              <Phone size={18} strokeWidth={1.8} aria-hidden="true" />
              {site.phone}
            </a>
          </nav>

          <div className="header-actions">
            <a
              className="btn btn-ghost header-phone appear appear--scale"
              href={site.phoneHref}
              aria-label={`Call us: ${site.phone}`}
              style={{ "--d": "0.34s" }}
            >
              <Phone className="header-phone-icon" size={15} strokeWidth={1.9} aria-hidden="true" />
              <span className="header-phone-label">{site.phone}</span>
            </a>
            <a
              className="btn btn-solid header-cta appear appear--scale"
              href={headerCta.href}
              style={{ "--d": "0.34s" }}
              onClick={closeMenu}
            >
              {headerCta.label}
            </a>
            <button
              type="button"
              className="burger appear appear--scale"
              style={{ "--d": "0.34s" }}
              aria-controls="site-nav"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </header>

        <section className="hero" id="top" aria-roledescription="carousel" aria-label="Highlights">
          <div className="hero-copy">
            <span className="badge appear appear--pop" style={{ "--d": "0.22s" }}>
              <svg className="badge-star" width="18" height="20" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true">
                <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
              </svg>
              {heroBadge}
            </span>

            <div
              className="slides"
              aria-live={paused ? "polite" : "off"}
              onMouseEnter={() => setHoverPaused(true)}
              onMouseLeave={() => setHoverPaused(false)}
              onFocus={() => setHoverPaused(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setHoverPaused(false);
              }}
            >
              {heroSlides.map((slide, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={slide.title}
                    className={`slide${isActive ? " is-active" : ""}`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${heroSlides.length}`}
                    aria-hidden={!isActive}
                    inert={!isActive}
                  >
                    <SlideContent
                      key={isActive ? `run-${cycle}` : "idle"}
                      slide={slide}
                      index={i}
                      mode={!changed && i === 0 ? "appear" : isActive ? "swap" : "idle"}
                    />
                  </div>
                );
              })}
            </div>

            <div className="slide-controls appear appear--soft" style={{ "--d": "1.18s" }}>
              {heroSlides.map((slide, i) => (
                <button
                  key={slide.title}
                  type="button"
                  className={`slide-dot${i === active ? " is-active" : ""}`}
                  aria-label={`Show slide ${i + 1}: ${slide.title}`}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => goTo(i)}
                >
                  <span className="slide-dot-track">
                    {i === active && (
                      <span
                        key={cycle}
                        className={`slide-dot-fill${paused ? " is-paused" : ""}${changed ? "" : " is-first"}`}
                        onAnimationEnd={onProgressEnd}
                      />
                    )}
                  </span>
                </button>
              ))}
              <button
                type="button"
                className="slide-toggle"
                aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
                onClick={() => setUserPaused((p) => !p)}
              >
                {userPaused ? (
                  <Play size={12} strokeWidth={2.2} aria-hidden="true" />
                ) : (
                  <Pause size={12} strokeWidth={2.2} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </section>

        <div className="stats" role="list" aria-label="At a glance">
          {stats.map((s, i) => (
            <div key={s.label} className="stat appear appear--stat" role="listitem" style={{ "--d": STAT_DELAYS[i] }}>
              <StatIcon name={s.icon} />
              <span>
                <strong>{s.value}</strong> {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideContent({ slide, index, mode }) {
  const Heading = index === 0 ? "h1" : "h2";
  // "appear" = first paint entrance, "swap" = slide change, "idle" = hidden slide.
  const cls = (appearMod, swapMod) =>
    mode === "appear" ? `appear ${appearMod}` : mode === "swap" ? `swap ${swapMod}` : "";
  const d = (appearDelay, swapDelay) => ({ "--d": mode === "swap" ? swapDelay : appearDelay });

  return (
    <>
      <Heading className={`hero-title${mode === "swap" ? " is-swap" : ""}`}>
        {slide.lines.map((line, li) => (
          <span className="headline-line" key={li}>
            <span
              className={`headline-text ${cls("appear--mask", "swap--mask")}`}
              style={d(li ? "0.62s" : "0.42s", li ? "0.14s" : "0s")}
            >
              {line.before}
              {line.em && <em>{line.em}</em>}
              {line.after}
            </span>
          </span>
        ))}
      </Heading>
      <p className={`lede ${cls("appear--soft", "swap--soft")}`} style={d("0.82s", "0.26s")}>
        {slide.tagline}
      </p>
      <div className="hero-actions">
        <a
          className={`btn btn-solid btn-hero ${cls("appear--btn", "swap--btn")}`}
          href={slide.cta.href}
          style={d("0.96s", "0.36s")}
        >
          {slide.cta.label}
        </a>
        <a
          className={`btn btn-ghost btn-hero-ghost ${cls("appear--side", "swap--side")}`}
          href={heroSecondaryCta.href}
          style={d("1.10s", "0.44s")}
        >
          {heroSecondaryCta.label}
        </a>
      </div>
    </>
  );
}
