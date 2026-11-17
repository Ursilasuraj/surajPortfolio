/* =====================================================================
   scenes.js — small animated illustrations for Experience & Education.

   Loaded only by experience.html and education.html, so the home page
   doesn't pay for it. Everything is inline SVG animated by CSS keyframes
   (see "Animated scenes" in style.css):
   · no libraries, no images, no network requests;
   · only transform / opacity / stroke-dashoffset are animated, which the
     browser can hand to the compositor — cheap on phones;
   · a scene only animates while it is on screen (the .play class is
     added/removed by an IntersectionObserver), and never animates for
     visitors who ask for reduced motion — they see a still frame.

   To use one, set `scene: "<key>"` on an entry in content.js.
   Keys: calibration, cloud-map, v2x, lidar, robot-arm, gauge
   ===================================================================== */

/* Scattered LiDAR returns: lane edges, a centre line, and some clutter.
   [x, y] in the scene's viewBox. */
const LIDAR_PTS = [
  [41,22],[39,38],[42,52],[40,68],[38,84],[41,110],[39,124],
  [99,24],[101,40],[98,56],[102,72],[100,112],[98,126],
  [70,30],[70,52],[70,74],
  [18,30],[22,64],[16,104],[124,36],[128,80],[121,112],[56,40],[86,60],
];

const CAR = (y) => `
  <rect x="-11" y="${y - 5}" width="22" height="10" rx="3" fill="currentColor"/>
  <rect x="-3" y="${y - 3.5}" width="8" height="7" rx="1.5" style="fill:var(--surface,#fff)" opacity=".75"/>`;

const SCENES = {
  /* Vector — measure an ECU signal, move a calibration parameter, watch it change. */
  calibration: {
    vb: "0 0 320 150",
    cap: "Measure a live ECU signal, nudge a calibration parameter, see the behaviour change — the loop the solution exists for.",
    svg: `
    <defs><clipPath id="sc-cal-clip"><rect x="112" y="18" width="192" height="96" rx="4"/></clipPath></defs>
    <g fill="none" stroke="currentColor">
      <rect x="16" y="46" width="72" height="56" rx="5" stroke-width="2"/>
      <path d="M28 46v-8M40 46v-8M52 46v-8M64 46v-8M76 46v-8M28 102v8M40 102v8M52 102v8M64 102v8M76 102v8" opacity=".5"/>
      <path class="sc-flow" d="M88 74 H112" stroke-width="2" stroke-dasharray="3 4"/>
      <rect x="112" y="18" width="192" height="96" rx="4" stroke-width="1.5" opacity=".7"/>
      <path d="M112 42H304M112 66H304M112 90H304M160 18V114M208 18V114M256 18V114" opacity=".14"/>
      <path d="M112 44H304" stroke-dasharray="2 4" opacity=".45"/>
    </g>
    <text x="52" y="78" text-anchor="middle" class="sc-txt" font-weight="700">ECU</text>
    <circle class="sc-blink" cx="78" cy="56" r="3" fill="currentColor"/>
    <g clip-path="url(#sc-cal-clip)">
      <g class="sc-amp"><g class="sc-wave">
        <path d="M112 66 q10 -26 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0"
              fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      </g></g>
    </g>
    <text x="118" y="32" class="sc-txt sc-sm">measure</text>
    <text x="300" y="40" text-anchor="end" class="sc-txt sc-sm">limit</text>
    <path d="M130 134 H290" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".25"/>
    <circle class="sc-knob" cx="150" cy="134" r="7" fill="currentColor"/>
    <text x="122" y="138" text-anchor="end" class="sc-txt sc-sm">calibrate</text>`,
  },

  /* ZF architect — Map-over-the-Air: tiles inside the moving footprint stream down. */
  "cloud-map": {
    vb: "0 0 320 150",
    cap: "Map-over-the-Air: the cloud streams only the map tiles inside the car's moving footprint — anywhere from 500 m to 2 km around it.",
    svg: `
    <g fill="currentColor">
      <circle cx="146" cy="24" r="10"/><circle cx="162" cy="16" r="13"/><circle cx="178" cy="24" r="9"/>
      <rect x="140" y="24" width="44" height="10" rx="5"/>
    </g>
    <path class="sc-flow" d="M162 40 V62" stroke="currentColor" stroke-width="2" stroke-dasharray="3 4"/>
    <g>${Array.from({ length: 24 }, (_, i) => {
      const c = i % 8, r = Math.floor(i / 8);
      const lit = c >= 2 && c <= 4 ? " lit" : "";
      return `<rect class="sc-tile${lit}" style="animation-delay:${(0.75 * c - 0.6).toFixed(2)}s"
        x="${40 + 30 * c}" y="${66 + 22 * r}" width="28" height="20" rx="2" fill="currentColor"/>`;
    }).join("")}</g>
    <path d="M30 99 H290" style="stroke:var(--surface,#fff)" stroke-width="3" opacity=".9"/>
    <g class="sc-car">
      <g class="sc-ring"><circle cx="0" cy="99" r="36" fill="none" stroke="currentColor"
        stroke-width="1.5" stroke-dasharray="4 4"/></g>
      ${CAR(99)}
    </g>
    <text x="310" y="146" text-anchor="end" class="sc-txt sc-sm">footprint 500 m – 2 km</text>`,
  },

  /* ZF component owner — V2I: the light broadcasts its phase, the car waits, then goes. */
  v2x: {
    vb: "0 0 320 150",
    cap: "V2X: the traffic light tells the car its phase; the car, localised on the HD-map, knows exactly when to go.",
    svg: `
    <g fill="currentColor" opacity=".1">
      <rect x="0" y="78" width="320" height="40"/><rect x="200" y="0" width="40" height="150"/>
    </g>
    <g fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M0 78H200M240 78H320M0 118H200M240 118H320M200 0V78M240 0V78M200 118V150M240 118V150" opacity=".55"/>
      <path d="M0 98H192M248 98H320" stroke-dasharray="8 8" opacity=".45"/>
      <path d="M192 100V118" stroke-width="3" opacity=".7"/>
    </g>
    <path d="M252 72V48" stroke="currentColor" stroke-width="2.5"/>
    <rect x="244" y="20" width="16" height="30" rx="3" fill="currentColor"/>
    <circle class="sc-red" cx="252" cy="29" r="4.5" fill="#d0473a"/>
    <circle class="sc-green" cx="252" cy="41" r="4.5" fill="#35a862"/>
    <g fill="none" stroke="currentColor" stroke-width="1.5">
      <circle class="sc-wave1" cx="252" cy="20" r="16"/>
      <circle class="sc-wave1 d2" cx="252" cy="20" r="16"/>
    </g>
    <path class="sc-link" d="M178 100 L244 36" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4" fill="none"/>
    <text x="196" y="56" class="sc-txt sc-sm sc-link-lbl">V2I</text>
    <g class="sc-v2x-car">
      ${CAR(108)}
      <path d="M0 84 a6 6 0 0 1 6 6 c0 5 -6 10 -6 10 s-6 -5 -6 -10 a6 6 0 0 1 6 -6z" fill="currentColor"/>
      <circle cx="0" cy="90" r="2.2" style="fill:var(--surface,#fff)"/>
    </g>
    <text x="8" y="72" class="sc-txt sc-sm">HD-map lane model</text>`,
  },

  /* ZF developer — noisy LiDAR returns in, clean lane geometry out. */
  lidar: {
    vb: "0 0 320 150",
    cap: "Raw LiDAR point clouds in, clean HD-map lane geometry out — Python, C++, ROS and PCL in between.",
    svg: `
    <defs><clipPath id="sc-lid-clip"><rect x="6" y="10" width="130" height="120" rx="4"/></clipPath></defs>
    <rect x="6" y="10" width="130" height="120" rx="4" fill="none" stroke="currentColor" opacity=".3"/>
    <rect x="182" y="10" width="130" height="120" rx="4" fill="none" stroke="currentColor" opacity=".3"/>
    <g clip-path="url(#sc-lid-clip)">
      <path class="sc-sweep" d="M70 100 L70 16 A84 84 0 0 1 129.4 40.6 Z" fill="currentColor" opacity=".14"/>
    </g>
    <g fill="currentColor">${LIDAR_PTS.map(([x, y], i) =>
      `<circle class="sc-pt" style="animation-delay:${(i * 0.09).toFixed(2)}s" cx="${x}" cy="${y}" r="2.4"/>`).join("")}</g>
    <g transform="translate(70 0)">${CAR(100)}</g>
    <path d="M144 75 H172 M164 68 L172 75 L164 82" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
      <path class="sc-draw" pathLength="1" d="M216 126 C 214 96, 218 60, 216 16"/>
      <path class="sc-draw" pathLength="1" d="M276 126 C 274 96, 278 60, 276 16"/>
    </g>
    <path class="sc-mid" d="M246 126 V16" stroke="currentColor" stroke-width="2" stroke-dasharray="8 8" fill="none"/>
    <text x="71" y="145" text-anchor="middle" class="sc-txt sc-sm">raw LiDAR</text>
    <text x="247" y="145" text-anchor="middle" class="sc-txt sc-sm">HD-map</text>`,
  },

  /* MSc — robotics and the AR smart-glasses project. */
  "robot-arm": {
    vb: "0 0 320 130",
    cap: "Robotics meets AR: the smart glasses recognise the part, the arm picks it.",
    svg: `
    <path d="M10 122 H310" stroke="currentColor" stroke-width="2" opacity=".3"/>
    <rect x="40" y="110" width="50" height="12" rx="2" fill="currentColor"/>
    <g class="sc-upper">
      <path d="M65 106 V56" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>
      <g class="sc-fore">
        <path d="M65 56 H135" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
        <path d="M135 49 v14 M135 49 h7 M135 63 h7" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <circle cx="65" cy="56" r="5" style="fill:var(--surface,#fff)" stroke="currentColor" stroke-width="2"/>
      </g>
      <circle cx="65" cy="106" r="5" style="fill:var(--surface,#fff)" stroke="currentColor" stroke-width="2"/>
    </g>
    <rect x="148" y="98" width="20" height="16" rx="2" fill="currentColor" opacity=".55"/>
    <path class="sc-bracket" d="M140 96v-8h8 M168 88h8v8 M176 114v8h-8 M148 122h-8v-8" fill="none"
          stroke="currentColor" stroke-width="2"/>
    <path class="sc-sight" d="M244 42 L178 88" stroke="currentColor" stroke-dasharray="3 4" fill="none"/>
    <g fill="none" stroke="currentColor" stroke-width="2.4">
      <rect x="236" y="22" width="24" height="16" rx="6"/><rect x="268" y="22" width="24" height="16" rx="6"/>
      <path d="M260 28 h8 M236 28 h-12 M292 28 h12"/>
    </g>
    <text x="264" y="60" text-anchor="middle" class="sc-txt sc-sm sc-tag">part detected</text>`,
  },

  /* BE — instrumentation: a needle and a process value settling on a setpoint. */
  gauge: {
    vb: "0 0 320 130",
    cap: "Instrumentation and control: a measured value overshoots, then settles onto its setpoint.",
    svg: `
    <path d="M30 104 A60 60 0 0 1 150 104" fill="none" stroke="currentColor" stroke-width="3" opacity=".35"/>
    <path d="M118 52 A60 60 0 0 1 150 104" fill="none" stroke="currentColor" stroke-width="5" opacity=".75"/>
    <g stroke="currentColor" stroke-width="2" opacity=".5">${[-90,-60,-30,0,30,60,90].map(a =>
      `<path transform="rotate(${a} 90 104)" d="M90 48 V56"/>`).join("")}</g>
    <g class="sc-needle"><path d="M90 104 V54" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></g>
    <circle cx="90" cy="104" r="6" fill="currentColor"/>
    <g fill="none" stroke="currentColor">
      <path d="M180 20 V108 H310" opacity=".4"/>
      <path d="M180 52 H310" stroke-dasharray="4 4" opacity=".55"/>
      <path class="sc-draw" pathLength="1" stroke-width="2.4" stroke-linecap="round"
            d="M180 104 C 200 104, 205 30, 222 34 S 238 66, 250 58 S 266 48, 276 53 S 296 52, 310 52"/>
    </g>
    <text x="306" y="46" text-anchor="end" class="sc-txt sc-sm">setpoint</text>`,
  },
};

function scene(key){
  const s = SCENES[key];
  if (!s) return "";
  return `<figure class="scene sc-${esc(key)}">
    <svg viewBox="${s.vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${s.svg}</svg>
    <figcaption>${esc(s.cap)}</figcaption></figure>`;
}

/* Animate a scene only while it is on screen. Removing .play stops the
   animation entirely (no work at all off screen); it restarts from the
   top next time it scrolls into view. */
function observeScenes(){
  if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(es => es.forEach(e =>
    e.target.classList.toggle("play", e.isIntersecting)), { threshold: .2 });
  document.querySelectorAll(".scene").forEach(el => io.observe(el));
}

/* Experience timeline: the vertical line fills as you scroll, and each
   role's node lights up once the line reaches it. One passive scroll
   listener, batched to one update per frame. */
function trackTimeline(list){
  const nodes = [...list.querySelectorAll(".xp-node")];
  if (prefersReducedMotion()){
    list.style.setProperty("--p", 1);
    nodes.forEach(n => n.classList.add("reached"));
    return;
  }
  let queued = false;
  const update = () => {
    queued = false;
    const vh = window.innerHeight, mark = vh * 0.6;
    const r = list.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (mark - r.top) / r.height));
    list.style.setProperty("--p", p.toFixed(4));
    nodes.forEach(n => n.classList.toggle("reached", n.getBoundingClientRect().top < mark));
  };
  const onScroll = () => { if (!queued){ queued = true; requestAnimationFrame(update); } };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll, { passive: true });
  update();
}
