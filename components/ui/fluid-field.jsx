"use client";

import { useMemo } from "react";

/*
 * FluidFieldBackground — a WebGL (three.js) simplex-noise fluid shader rendered
 * full-bleed inside a sandboxed iframe.
 *
 * Ported from the supplied fluid-field.tsx to JavaScript. Changes from the original:
 * - Shader colours are props (`baseColor`, `glowColor`, `glowColorAlt`) instead of
 *   being hard-coded, so the effect can follow the brand palette.
 * - `speed` and `glowStrength` props.
 * - Only three.js is loaded in the iframe; the unused Tailwind CDN, Iconify, GSAP and
 *   font requests were dropped (everything except the canvas was hidden anyway).
 * - Honours prefers-reduced-motion by rendering a single still frame.
 * - Inner template-literal backticks are escaped (the original nested them unescaped,
 *   which does not parse).
 */

const DEFAULTS = {
  hue: 0,
  saturation: 1,
  brightness: 1,
  baseColor: "#030306",
  glowColor: "#2640D9",
  glowColorAlt: "#6633E6",
  glowStrength: 0.7,
  speed: 1,
};

const TARGET_SELECTOR = "#bg-canvas";

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

// "#2256F2" -> "vec3(0.1333, 0.3373, 0.9490)"
function toVec3(hex) {
  const clean = String(hex).replace("#", "");
  const full = clean.length === 3 ? clean.replace(/./g, "$&$&") : clean.padEnd(6, "0");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  return `vec3(${r.toFixed(4)}, ${g.toFixed(4)}, ${b.toFixed(4)})`;
}

function buildFluidSource({ background, baseColor, glowColor, glowColorAlt, glowStrength, speed }) {
  return `<!doctype html>
<html lang="en"><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fluid background</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body style="margin:0;background:${background};">

    <canvas id="bg-canvas" style="position:fixed;inset:0;z-index:0;pointer-events:none;width:100%;height:100%;"></canvas>

    <script>
        const canvas = document.querySelector('#bg-canvas');
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const scene = new THREE.Scene();

        const geometry = new THREE.PlaneGeometry(2, 2);

        const vertexShader = \`
            void main() {
                gl_Position = vec4(position, 1.0);
            }
        \`;

        const fragmentShader = \`
            uniform float u_time;
            uniform vec2 u_resolution;

            // Compact 2D Simplex Noise
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

            float snoise(vec2 v) {
                const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                vec2 i  = floor(v + dot(v, C.yy));
                vec2 x0 = v -   i + dot(i, C.xx);
                vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod289(i);
                vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                m = m*m;
                m = m*m;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
                vec3 g;
                g.x  = a0.x  * x0.x  + h.x  * x0.y;
                g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }

            void main() {
                vec2 uv = gl_FragCoord.xy / u_resolution.xy;
                uv.x *= u_resolution.x / u_resolution.y;

                vec3 baseColor = ${toVec3(baseColor)};
                vec2 st = uv * 0.7;
                st += vec2(snoise(st + u_time * 0.05), snoise(st - u_time * 0.05)) * 0.3;

                float beam = smoothstep(0.1, 0.8, snoise(vec2(st.x + st.y * 1.5 - u_time * 0.15, u_time * 0.02)));
                vec3 glow = mix(${toVec3(glowColor)}, ${toVec3(glowColorAlt)}, snoise(uv * 1.5 + u_time * 0.1) * 0.5 + 0.5);

                gl_FragColor = vec4(baseColor + (glow * beam * ${Number(glowStrength).toFixed(4)}), 1.0);
            }
        \`;

        const uniforms = {
            u_time: { value: 0.0 },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        };

        const material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: uniforms
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const SPEED = ${Number(speed).toFixed(4)};
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const clock = new THREE.Clock();
        function animate() {
            uniforms.u_time.value = reduceMotion.matches ? 12.0 : clock.getElapsedTime() * SPEED;
            renderer.render(scene, camera);
            if (!reduceMotion.matches) requestAnimationFrame(animate);
        }
        animate();

        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
            if (reduceMotion.matches) animate();
        });
    </script>

</body></html>`;
}

function buildFocusedDocument(options) {
  const targetJson = JSON.stringify([{ selector: TARGET_SELECTOR, role: "background" }]).replace(
    /</g,
    "\\u003c"
  );
  const focusStyle = `<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: ${options.background} !important; }
body { position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-role="background"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; z-index: 0 !important; opacity: 1 !important; pointer-events: none !important; }
</style>`;
  const focusScript = `<script data-threeui-focus>
(function () {
  var isolated = false;
  function isolate() {
    if (isolated) return;
    var specs = ${targetJson};
    var roots = [];
    specs.forEach(function (spec) {
      var element = document.querySelector(spec.selector);
      if (!element) return;
      element.setAttribute('data-threeui-role', spec.role);
      if (!roots.some(function (root) { return root.contains(element); })) roots.push(element);
    });
    if (!roots.length) return;
    isolated = true;
    roots.forEach(function (root) { document.body.appendChild(root); });
    Array.from(document.body.children).forEach(function (element) {
      if (roots.indexOf(element) !== -1) return;
      element.setAttribute('data-threeui-residual', '');
      element.setAttribute('aria-hidden', 'true');
      if ('inert' in element) element.inert = true;
    });
    document.body.setAttribute('data-threeui-ready', '');
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 100); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener('load', isolate, { once: true });
})();
</script>`;
  return buildFluidSource(options)
    .replace(/<\/head>/i, `${focusStyle}</head>`)
    .replace(/<\/body>/i, `${focusScript}</body>`);
}

/**
 * @param {object} props
 * @param {"dark"|"light"} [props.mode]
 * @param {number} [props.hue]          CSS hue-rotate in degrees (-180..180)
 * @param {number} [props.saturation]   CSS saturate (0..2)
 * @param {number} [props.brightness]   CSS brightness (0.35..1.65)
 * @param {string} [props.baseColor]    Hex colour of the field where there is no glow
 * @param {string} [props.glowColor]    First hex colour of the moving glow
 * @param {string} [props.glowColorAlt] Second hex colour the glow blends towards
 * @param {number} [props.glowStrength] Glow intensity (original: 0.7)
 * @param {number} [props.speed]        Animation speed multiplier
 * @param {string} [props.className]
 * @param {import("react").CSSProperties} [props.style]
 */
function FluidFieldBackground({
  mode = "dark",
  hue = DEFAULTS.hue,
  saturation = DEFAULTS.saturation,
  brightness = DEFAULTS.brightness,
  baseColor = DEFAULTS.baseColor,
  glowColor = DEFAULTS.glowColor,
  glowColorAlt = DEFAULTS.glowColorAlt,
  glowStrength = DEFAULTS.glowStrength,
  speed = DEFAULTS.speed,
  className,
  style,
}) {
  const source = useMemo(
    () =>
      buildFocusedDocument({
        background: baseColor,
        baseColor,
        glowColor,
        glowColorAlt,
        glowStrength,
        speed,
      }),
    [baseColor, glowColor, glowColorAlt, glowStrength, speed]
  );
  const safeHue = clamp(hue, -180, 180);
  const safeSaturation = clamp(saturation, 0, 2);
  const safeBrightness = clamp(brightness, 0.35, 1.65);
  const filter =
    safeHue === 0 && safeSaturation === 1 && safeBrightness === 1
      ? undefined
      : `hue-rotate(${safeHue}deg) saturate(${safeSaturation}) brightness(${safeBrightness})`;

  return (
    <iframe
      className={className}
      data-mode={mode}
      title="Animated fluid background"
      aria-hidden="true"
      tabIndex={-1}
      srcDoc={source}
      sandbox="allow-scripts"
      loading="eager"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        border: 0,
        background: baseColor,
        pointerEvents: "none",
        filter,
        ...style,
      }}
    />
  );
}

export default FluidFieldBackground;
