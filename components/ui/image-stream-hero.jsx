"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/*
 * ImageStreamHero — ported from the supplied image-stream-hero.tsx to JavaScript.
 * Geometry, keyframe maths and timing are unchanged. Because this project does not
 * use Tailwind, the utility classes ("relative overflow-hidden", "absolute inset-0",
 * "h-full w-full object-cover", …) are expressed as inline styles instead, and every
 * card also carries the stable class `ish-card` so global CSS can target it.
 * The reduced-motion pause rule gained `!important` (the original was overridden by
 * each card's inline animation shorthand, so it never actually paused).
 */

/* ── the corridor ────────────────────────────────────────────────
 * Two rails of cards ride from far behind the screen toward the
 * viewer. Perspective alone does the work that looks like two
 * animations: as a card's z grows it gets bigger *and* its screen x
 * sweeps outward from the vanishing point, because the projection
 * scales position and size by the same factor.
 *
 * 1. Depth is authored as *apparent size*, geometrically — each card
 *    is a constant ratio bigger than the one behind it, all the way out.
 * 2. The rails open hard in the first stretch and then hold (`fan` > 1),
 *    so the ribbon leaves the centre as a flat band, bends once, and
 *    only then runs out on the diagonal.
 * 3. Neither end of the loop is ever on screen: a card dies past the
 *    container's edge and is born *across* the axis (`railBirth` < 0),
 *    so the centre never opens up.
 *
 * Every length is in `cqw` — a percentage of the container's width —
 * so the whole corridor keeps its proportions at any size.
 * ─────────────────────────────────────────────────────────────── */

/**
 * @typedef {object} CorridorPath
 * @property {number} [perspective=30] Strength of the projection. Lower is a wider-angle rush.
 * @property {number} [cardWidth=18]   Card width in world units (cqw).
 * @property {number} [cardHeight=25]  Card height in world units (cqw).
 * @property {number} [cardRadius=0.4] Corner radius applied to each card (cqw).
 * @property {number} [birthHeight=2.6] On-screen card height where a card is born.
 * @property {number} [exitHeight=46]  On-screen card height as a card leaves the frame.
 * @property {number} [railBirth=-11]  Lateral offset at birth (negative = across the axis).
 * @property {number} [railExit=44]    Lateral offset once the rails have finished opening.
 * @property {number} [fan=3.3]        How front-loaded the opening is.
 * @property {number} [turnBirth=6]    Y-rotation at birth, degrees.
 * @property {number} [turnExit=28]    Y-rotation at exit, degrees.
 * @property {number} [stops=24]       Keyframe stops used to trace the curve.
 */

const PATH = {
  perspective: 30,
  cardWidth: 18,
  cardHeight: 25,
  cardRadius: 0.4,
  birthHeight: 2.6,
  exitHeight: 46,
  railBirth: -11,
  railExit: 44,
  fan: 3.3,
  turnBirth: 6,
  turnExit: 28,
  stops: 24,
};

/** Sample the path once so the CSS keyframes trace the real curve. */
function keyframes(dir, name, p) {
  const steps = [];
  for (let s = 0; s <= p.stops; s++) {
    const u = s / p.stops;
    // Geometric in apparent size, so consecutive cards keep a constant size
    // ratio and the ribbon stays solid at both ends.
    const scale = (p.birthHeight / p.cardHeight) * Math.pow(p.exitHeight / p.birthHeight, u);
    const z = p.perspective * (1 - 1 / scale);
    const rail = p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
    const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
    steps.push(
      `${(u * 100).toFixed(2)}%{transform:translate3d(${(dir * rail).toFixed(2)}cqw,0,${z.toFixed(
        2
      )}cqw) rotateY(${(-dir * turn).toFixed(2)}deg)}`
    );
  }
  return `@keyframes ${name}{${steps.join("")}}`;
}

/**
 * @param {object} props
 * @param {{src: string, alt?: string}[]} props.images Images cycled onto the rails.
 * @param {number} [props.cards=9]  Cards on each rail at once.
 * @param {number} [props.speed=18] Seconds for one card to travel the whole corridor.
 * @param {number} [props.axis=55]  Vertical placement of the corridor's axis (% of height).
 * @param {CorridorPath} [props.path] Override any part of the corridor geometry.
 * @param {import("react").ReactNode} [props.children] Content rendered above the corridor.
 * @param {string} [props.className]
 */
export function ImageStreamHero({
  images,
  cards = 9,
  speed = 18,
  axis = 55,
  path,
  children,
  className,
  ...props
}) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const right = `ish-r-${id}`;
  const left = `ish-l-${id}`;
  const card = `ish-c-${id}`;

  const p = React.useMemo(() => ({ ...PATH, ...path }), [path]);

  const css = React.useMemo(
    () =>
      `${keyframes(1, right, p)}${keyframes(-1, left, p)}` +
      // Pausing rather than disabling keeps the corridor whole: every card is
      // already dropped mid-flight by its negative delay, so it freezes as a
      // finished still instead of collapsing onto the axis. `!important` is needed
      // because each card's inline `animation` shorthand resets play-state to running.
      `@media(prefers-reduced-motion:reduce){.${card}{animation-play-state:paused!important}}`,
    [right, left, card, p]
  );

  return (
    <div
      className={cn("ish", className)}
      {...props}
      style={{ position: "relative", overflow: "hidden", containerType: "inline-size", ...props.style }}
    >
      <style>{css}</style>

      <div
        aria-hidden="true"
        className="ish-stage"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          perspective: `${p.perspective}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
        }}
      >
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          {[right, left].map((name) =>
            Array.from({ length: cards }, (_, i) => {
              // Both rails walk the same sequence, so the left side mirrors
              // the right at every depth.
              const img = images[i % Math.max(images.length, 1)];
              return (
                <div
                  key={`${name}-${i}`}
                  className={cn(card, "ish-card")}
                  style={{
                    position: "absolute",
                    overflow: "hidden",
                    left: "50%",
                    top: `${axis}%`,
                    width: `${p.cardWidth}cqw`,
                    height: `${p.cardHeight}cqw`,
                    marginLeft: `${-p.cardWidth / 2}cqw`,
                    marginTop: `${-p.cardHeight / 2}cqw`,
                    borderRadius: `${p.cardRadius}cqw`,
                    animation: `${name} ${speed}s linear infinite`,
                    // Negative delay drops each card mid-flight, so the
                    // corridor is already full on the first frame.
                    animationDelay: `${-(i * speed) / cards}s`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  {img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={img.src}
                      alt={img.alt ?? ""}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </div>

      {children}
    </div>
  );
}

export default ImageStreamHero;
