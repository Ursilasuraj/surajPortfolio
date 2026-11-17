/* =====================================================================
   main.js — renders content from content.js and handles theme + nav.
   You normally don't need to edit this file; edit content.js instead.
   ===================================================================== */

/* ---- Small helpers ---------------------------------------------------
   esc() keeps stray quotes/angle brackets in content.js from breaking
   the generated markup (e.g. a job title containing an apostrophe).   */
const esc = s => String(s ?? "").replace(/[&<>"']/g, c =>
  ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));

const prefersReducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

/* ---- Theme toggle (remembers choice) ----
   The initial theme is applied by a tiny inline script in each page's
   <head> so there is no flash of the wrong theme before this file loads. */
function toggleTheme(){
  const cur  = document.documentElement.getAttribute("data-theme");
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch(e) {}
  syncThemeBtn();
}
/* Line icons rather than emoji — emoji render differently on every platform
   and read as decoration next to the serif type. */
const ICON = {
  sun: `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor"
     stroke-width="1.5" stroke-linecap="round" aria-hidden="true" focusable="false">
     <circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.3M12 19.2v2.3M2.5 12h2.3M19.2 12h2.3
     M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7M18.8 5.2l-1.7 1.7M6.9 17.1l-1.7 1.7"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor"
     stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
     focusable="false"><path d="M20.6 14.7A8.7 8.7 0 0 1 9.3 3.4a8.7 8.7 0 1 0 11.3 11.3z"/></svg>`,
};

/* Hobby icons, drawn in the same line style as the theme toggle.
   Referenced from content.js by key: icon: "hiking". */
const HOBBY_ICON = {
  hiking: `<path d="M2.5 19.5h19M4.5 19.5 10 8.5l3.2 5.8 2.1-3.3 5.2 8.5"/><circle cx="17.5" cy="5" r="2.1"/>`,
  bouldering: `<path d="M3.5 19.5c0-7 4.3-11.5 8.5-11.5s8.5 4.5 8.5 11.5z"/><path d="M2 19.5h20"/>
    <circle cx="9.5" cy="14" r="1.05"/><circle cx="14.5" cy="12" r="1.05"/><circle cx="12" cy="17" r="1.05"/>`,
  cooking: `<path d="M3.5 10.5h17v2.9a6 6 0 0 1-6 6H9.5a6 6 0 0 1-6-6z"/>
    <path d="M3.5 12.6H1.9M20.5 12.6h1.6"/>
    <path d="M9.2 7.6c0-1.3 1.3-1.5 1.3-2.8M12.7 7.6c0-1.6 1.4-1.8 1.4-3.2"/>`,
  swimming: `<circle cx="16.5" cy="6.5" r="2"/><path d="M4 12.5l5-2.4 4.6 1.9"/>
    <path d="M2 16.6c2 0 2-1.3 4-1.3s2 1.3 4 1.3 2-1.3 4-1.3 2 1.3 4 1.3 2-1.3 4-1.3"/>
    <path d="M2 20.4c2 0 2-1.3 4-1.3s2 1.3 4 1.3 2-1.3 4-1.3 2 1.3 4 1.3 2-1.3 4-1.3"/>`,
  tv: `<rect x="2.6" y="6.2" width="18.8" height="12.2" rx="1.6"/>
    <path d="M8.4 21.6h7.2M12 18.4v3.2M8.2 2.6 12 6.2l3.8-3.6"/>`,
  book: `<path d="M12 5.4c-1.8-1.4-4.3-2-7.4-1.8v14.8c3.1-.2 5.6.4 7.4 1.8
    c1.8-1.4 4.3-2 7.4-1.8V3.6c-3.1-.2-5.6.4-7.4 1.8z"/><path d="M12 5.4v14.8"/>`,
};
const hobbyIcon = key => HOBBY_ICON[key]
  ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
       focusable="false">${HOBBY_ICON[key]}</svg>`
  : "";

/* Favourites icons.
   Deliberately evocative rather than reproductions: a generic bat, not the
   Batman mark; a heater shield, not Captain America's. Studio and franchise
   logos are copyrighted, and hosting them would also break the site's
   no-external-requests property. Same line style as the hobby icons. */
const FAV_ICON = {
  odyssey: `<path d="M3.5 17.5h17l-2.4 3.4H5.9z"/><path d="M12 3v14.5"/>
    <path d="M12 5.6c3.4 1 5.5 3.3 6.2 6.6H12z"/><path d="M12 6.4c-2.6.9-4.3 2.9-5 5.8h5"/>`,
  bat: `<path d="M2.4 9.6c2.2 0 3.3 1 4.2 2.3.9-1.7 2.4-2.7 3.6-2.7.7 0 1.3.2 1.8.6.5-.4 1.1-.6 1.8-.6
    1.2 0 2.7 1 3.6 2.7.9-1.3 2-2.3 4.2-2.3-1.3 1.7-1.5 3.4-1.1 5-1.9.2-3.3 1.2-4.1 2.6-1-1.4-2.5-2.2-4.4-2.2
    s-3.4.8-4.4 2.2c-.8-1.4-2.2-2.4-4.1-2.6.4-1.6.2-3.3-1.1-5z"/>`,
  hat: `<path d="M3 17.6h18"/><path d="M7 17.6V6.4A1.4 1.4 0 0 1 8.4 5h7.2A1.4 1.4 0 0 1 17 6.4v11.2"/>
    <path d="M7 13.6h10"/>`,
  top: `<path d="M6.8 6.4h10.4L12 18.6z"/><path d="M12 2.8v3.6"/>
    <path d="M4.4 9.4c-.7 1.1-1 2.2-1 3.3M19.6 9.4c.7 1.1 1 2.2 1 3.3"/>`,
  heart: `<path d="M12 20.6s-7.6-4.7-7.6-9.7A4.5 4.5 0 0 1 12 8.3a4.5 4.5 0 0 1 7.6 2.6c0 5-7.6 9.7-7.6 9.7z"/>`,
  /* Four forces converging — not a sunburst, which is the Alchemist's mark. */
  assemble: `<circle cx="12" cy="12" r="2.4"/>
    <path d="M8.4 4.6 12 8.2l3.6-3.6M8.4 19.4 12 15.8l3.6 3.6
             M4.6 8.4 8.2 12l-3.6 3.6M19.4 8.4 15.8 12l3.6 3.6"/>
    <path d="M12 2.2v2.4M12 19.4v2.4M2.2 12h2.4M19.4 12h2.4"/>`,
  reactor: `<circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="2"/>
    <path d="M12 3.4v3.6M12 17v3.6M3.4 12H7M17 12h3.6"/>`,
  web: `<path d="M12 12V2.6M12 12h9.4M12 12v9.4M12 12H2.6M12 12l6.6-6.6M12 12l6.6 6.6M12 12l-6.6 6.6M12 12 5.4 5.4"/>
    <path d="M12 5.4 16.7 7.3 18.6 12 16.7 16.7 12 18.6 7.3 16.7 5.4 12 7.3 7.3z"/>`,
  shield: `<path d="M12 2.8l7.4 2.6v6.2c0 5-3.1 8.6-7.4 9.6-4.3-1-7.4-4.6-7.4-9.6V5.4z"/>
    <path d="M5.2 12h13.6"/>`,
  flask: `<path d="M9 2.8v6.4L4.7 17.9A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.8-3.1L15 9.2V2.8"/>
    <path d="M8 2.8h8M7.2 15h9.6"/>`,
  crown: `<path d="M4 17.6h16"/><path d="M4.6 17.6 3 7.4l4.6 3.6L12 5l4.4 6 4.6-3.6-1.6 10.2"/>`,
  dragon: `<path d="M12 21.4c3.3 0 5.5-2.2 5.5-5.2 0-4.1-4-5.7-3.2-9.9-2.7 1-4.1 3.2-4.1 5.5 0 1.4.6 2.4.6 3
    -1 0-1.8-1-1.8-2.7-1.6 1.5-2.6 2.8-2.6 4.5 0 3 2.3 4.8 5.6 4.8z"/>`,
  meteor: `<circle cx="15.6" cy="8.4" r="3.6"/><path d="M9.4 14.6 2.6 21.4M13 16.8 8.6 21.4M6.6 11 2.6 15"/>`,
  atom: `<circle cx="12" cy="12" r="1.9"/><ellipse cx="12" cy="12" rx="9.4" ry="4"/>
    <ellipse cx="12" cy="12" rx="9.4" ry="4" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="9.4" ry="4" transform="rotate(120 12 12)"/>`,
  mug: `<path d="M4 8.6h12v6.8a4.2 4.2 0 0 1-4.2 4.2H8.2A4.2 4.2 0 0 1 4 15.4z"/>
    <path d="M16 10.6h1.8a2.7 2.7 0 0 1 0 5.4H16"/><path d="M7.4 5.6c0-1 1-1.3 1-2.3M11 5.6c0-1.2 1.2-1.5 1.2-2.7"/>`,
  droplet: `<path d="M12 3.2s6 6.7 6 10.7a6 6 0 0 1-12 0c0-4 6-10.7 6-10.7z"/>`,
  wand: `<path d="M3.4 20.6 14 10"/><path d="M12.7 8.6 15.4 11.3"/>
    <path d="M17.8 3.2v3.4M16.1 4.9h3.4M20.2 9.4v2.6M18.9 10.7h2.6"/>`,
  ring: `<circle cx="12" cy="12" r="7.6"/><circle cx="12" cy="12" r="5"/>`,
  sword: `<path d="M12 2.4 13.7 5v9.4h-3.4V5z"/><path d="M7.8 15h8.4"/><path d="M12 15v4"/>
    <circle cx="12" cy="20.4" r="1.4"/>`,
  compass: `<circle cx="12" cy="12" r="9"/><path d="M15.4 8.6 13 14.6 7 17l2.4-6z"/><circle cx="12" cy="12" r="1"/>`,
  torch: `<path d="M3.4 8.8h9.2v6.4H3.4z"/><path d="M12.6 6.9 17 9.1v5.8l-4.4 2.2z"/>
    <path d="M18.9 9.6h1.9M18.9 12h2.7M18.9 14.4h1.9"/>`,
  rocket: `<path d="M12 2.6c2.6 2.3 4 5.5 4 8.9v4.3H8v-4.3c0-3.4 1.4-6.6 4-8.9z"/>
    <circle cx="12" cy="9.6" r="1.8"/><path d="M8 12.6 5 15.6v3.2l3-2.1M16 12.6l3 3v3.2l-3-2.1"/>
    <path d="M10.4 19.4c0 1.1.7 2 1.6 2.6.9-.6 1.6-1.5 1.6-2.6"/>`,
  magnifier: `<circle cx="10.4" cy="10.4" r="6.6"/><path d="M15.2 15.2 21 21"/>`,
  /* Horizontal: bow, shaft, two teeth. A diagonal key reads as a magnifier. */
  key: `<circle cx="6.6" cy="12" r="4.1"/><circle cx="6.6" cy="12" r="1.3"/>
    <path d="M10.7 12H21"/><path d="M17 12v3.4M20.2 12v2.6"/>`,
  trident: `<path d="M12 21.6V9"/><path d="M6.8 2.8v4.4a3 3 0 0 0 3 3h4.4a3 3 0 0 0 3-3V2.8"/>
    <path d="M12 2v8.4"/><path d="M9.6 18.6h4.8"/>`,
  lamp: `<path d="M4.4 14.6h15.2c0 3-3.4 5.2-7.6 5.2s-7.6-2.2-7.6-5.2z"/>
    <path d="M12 13.4c1.7 0 2.7-1 2.7-2.4 0-2.1-2.7-3.4-2-5.7-1.7.8-2.5 2-2.5 3.4 0 .8.4 1.4.4 1.8
    -.6 0-1-.4-1-1.2-.9.8-1.3 1.5-1.3 2.2 0 1.4 1.1 1.9 3.7 1.9z"/>`,
  pen: `<path d="M3.4 20.6 4.5 16.4l11-11a2.1 2.1 0 0 1 3 3l-11 11z"/><path d="M13.9 6.5 17 9.6"/>`,
  sun: `<circle cx="12" cy="12" r="4.4"/><path d="M12 2.6v2.6M12 18.8v2.6M2.6 12h2.6M18.8 12h2.6
    M5.2 5.2 7 7M17 17l1.8 1.8M18.8 5.2 17 7M7 17l-1.8 1.8"/>`,
  enso: `<path d="M16.9 5.1A8.6 8.6 0 1 0 20.4 11.6"/>`,
  /* Bowl with a pestle resting in it, angled — a basket without the pestle. */
  mortar: `<path d="M4.4 12.6h15.2l-1.6 5.4a3 3 0 0 1-2.9 2.2h-6.2a3 3 0 0 1-2.9-2.2z"/>
    <path d="M8.4 12.6c-.4-3.4 1.4-5.6 4-6.6"/>
    <path d="M9.4 4.4 15 10" stroke-width="1.6"/><circle cx="15.7" cy="10.7" r="1.5"/>`,
  fish: `<path d="M3 12c3-3.6 6.6-5.4 10.4-5.4 3 0 5.6 1.6 7.6 5.4-2 3.8-4.6 5.4-7.6 5.4C9.6 17.4 6 15.6 3 12z"/>
    <path d="M20 12l2.6-2.6M20 12l2.6 2.6"/><circle cx="8.4" cy="10.6" r=".9"/>`,
  pan: `<circle cx="10.4" cy="12" r="6.4"/><path d="M16.4 9.4h5.2M16.8 7.6l4.4-1M16.8 11.6l4.6 1.4"/>`,
  hourglass: `<path d="M6 3.4h12M6 20.6h12"/>
    <path d="M7.4 3.4v3.4c0 2.4 1.6 3.8 4.6 5.2-3 1.4-4.6 2.8-4.6 5.2v3.4M16.6 3.4v3.4c0 2.4-1.6 3.8-4.6 5.2
    3 1.4 4.6 2.8 4.6 5.2v3.4"/>`,
  /* One bold dune ridge under a rising sun. Two thinner ridges (an earlier
     attempt) blurred into a single line at 38px once anti-aliasing took
     over — bold and simple survives the small size better than detail
     does, the same lesson `mortar` and `key` needed. Deliberately not the
     radial burst used by `sun`, so the two never read as the same mark. */
  dune: `<circle cx="17" cy="6" r="3"/>
    <path d="M1.4 20.6Q11.5 8.4 22.4 20.6"/>`,
  /* A throne: wide back frame, a seat line spanning it, short armrest
     nubs at the base — distinct from the jagged `crown` already used for
     Game of Thrones. A first attempt with narrower proportions lost the
     armrests against the back panel at 38px. */
  throne: `<path d="M6 21V6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v15"/>
    <path d="M6 13h12"/>
    <path d="M6 21H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2
             M18 21h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2"/>`,
};
const favIcon = key => FAV_ICON[key]
  ? `<span class="fav-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
       focusable="false">${FAV_ICON[key]}</svg></span>`
  : `<span class="fav-icon fav-icon-empty" aria-hidden="true"></span>`;

function syncThemeBtn(){
  const b = document.getElementById("themeBtn"); if (!b) return;
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  b.innerHTML = dark ? ICON.sun : ICON.moon;
  b.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
}
function toggleMenu(btn){
  const open = document.querySelector(".nav-links")?.classList.toggle("open");
  btn?.setAttribute("aria-expanded", String(!!open));
}

/* ---- Build header/footer + mark active link ---- */
function buildChrome(active){
  const page = (p, label) =>
    `<a href="${p}"${active===p ? ' class="active" aria-current="page"' : ""}>${label}</a>`;

  document.getElementById("header").innerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="wrap nav">
      <a class="brand" href="index.html">Suraj <span>Plachikaad</span></a>
      <button class="menu-btn" aria-label="Open menu" aria-expanded="false"
              aria-controls="navLinks" onclick="toggleMenu(this)">☰</button>
      <nav id="navLinks" class="nav-links" aria-label="Main">
        ${page("index.html","Home")} ${page("experience.html","Experience")}
        ${page("education.html","Education")} ${page("skills.html","Skills")}
        ${page("patents.html","Patents")} ${page("favourites.html","Favourites")}
        <button id="themeBtn" class="toggle" onclick="toggleTheme()"></button>
      </nav>
    </div>`;
  syncThemeBtn();

  const links = [
    SITE.email    ? `<a href="mailto:${esc(SITE.email)}">Email</a>` : "",
    SITE.linkedin ? `<a href="${esc(SITE.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>` : "",
    SITE.github   ? `<a href="${esc(SITE.github)}" target="_blank" rel="noopener">GitHub</a>` : "",
  ].filter(Boolean).join(" · ");

  document.getElementById("footer").innerHTML =
    `<div class="wrap">© ${new Date().getFullYear()} ${esc(SITE.name)} · ${links}</div>`;
}

/* ---- Images -----------------------------------------------------------
   Every generated <img> is lazy-loaded and decoded off the main thread.
   The rendered box size is fixed in CSS, so there is no layout shift.  */
const img = (src, alt, cls, ph, eager) => src
  ? `<img src="${esc(src)}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ""}
      ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`
  : `<div class="placeholder-photo">${esc(ph || "Add a photo in /images and set it in content.js")}</div>`;

/* Company / school monogram. Rendered locally — no external service. */
const monogram = label => String(label || "•").replace(/_/g, "-");

function logoThumb(label){
  const text = monogram(label);
  const cls  = text.length > 2 ? "thumb tile sm" : "thumb tile";
  return `<span class="${cls}" aria-hidden="true">${esc(text)}</span>`;
}

/* ---- Home ---- */
function renderHome(){
  const h = SITE.home;

  document.getElementById("hero").innerHTML = `
    <div class="hero-text reveal">
      <h1>${esc(h.heading)}</h1>
      <p class="tagline">${esc(SITE.tagline)}</p>
      <p>${esc(h.intro)}</p>
      <p class="hero-cta">
        <a class="btn" href="experience.html">See my work →</a>
        ${SITE.cvUrl ? `<a class="btn btn-ghost" href="${esc(SITE.cvUrl)}" download>Download CV</a>` : ""}
      </p>
    </div>
    <div class="hero-photo reveal">${img(h.photo, `Portrait of ${SITE.name}`, "", "Add profile.jpg", true)}</div>`;

  // "What I'm working on now" — keeps the site from looking abandoned.
  const now = document.getElementById("now");
  if (now && h.now?.text){
    now.innerHTML = `<div class="now-card reveal">
        <span class="now-tag">Now · ${esc(h.now.updated)}</span>
        <p>${esc(h.now.text)}</p></div>`;
  } else if (now) { now.closest("section")?.remove(); }

  if (h.stats?.length) document.getElementById("stats").innerHTML = h.stats.map(s =>
    `<div class="stat"><span class="num" data-to="${s.value}" data-suf="${esc(s.suffix||"")}">0</span>
      <span class="lbl">${esc(s.label)}</span></div>`).join("");

  document.getElementById("hobbies").innerHTML = h.hobbies.map(o =>
    `<div class="card hobby reveal">
      ${o.img ? img(o.img, o.title, "hobby-img") : `<div class="icon">${hobbyIcon(o.icon)}</div>`}
      <h3>${esc(o.title)}</h3>
      <p class="muted">${esc(o.text)}</p></div>`).join("");

  const g = document.getElementById("gallery");
  if (h.gallery?.length){
    g.innerHTML = h.gallery.map((item, i) => {
      const o = typeof item === "string" ? { src:item, alt:"" } : item;
      return `<button class="gallery-item reveal" data-i="${i}" aria-label="Enlarge photo: ${esc(o.alt)}">
        ${img(o.src, o.alt)}</button>`;
    }).join("");
    g.addEventListener("click", e => {
      const b = e.target.closest(".gallery-item"); if (!b) return;
      const o = h.gallery[+b.dataset.i];
      lightbox(typeof o === "string" ? o : o.src, typeof o === "string" ? "" : o.alt, b);
    });
  } else { g.closest("section").style.display = "none"; }

  // Contact CTA
  const c = document.getElementById("contact");
  if (c) c.innerHTML = `<div class="contact-card reveal">
      <h2>Let's talk</h2>
      <p class="muted">Always happy to talk product, autonomous driving, or where to eat in Stuttgart.</p>
      <p class="hero-cta">
        ${SITE.email ? `<a class="btn" href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>` : ""}
        ${SITE.linkedin ? `<a class="btn btn-ghost" href="${esc(SITE.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>` : ""}
      </p></div>`;

  observeReveal();
  observeStats();
}

/* ---- Animated counters (start when scrolled into view) ---- */
function observeStats(){
  const nums = document.querySelectorAll(".num");
  if (!nums.length) return;

  if (prefersReducedMotion()){                       // no animation: show final value
    nums.forEach(el => el.textContent = el.dataset.to + el.dataset.suf);
    return;
  }
  const run = el => {
    const to = +el.dataset.to, suf = el.dataset.suf, dur = 900, t0 = performance.now();
    const tick = now => {
      const p = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf;   // ease-out
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting){ run(e.target); obs.unobserve(e.target); } });
  }, { threshold: .4 });
  nums.forEach(el => io.observe(el));
}

/* ---- Click image to enlarge (Escape closes, focus is restored) ---- */
function lightbox(src, alt, opener){
  const prev = opener || document.activeElement;
  const o = document.createElement("div");
  o.className = "lb";
  o.setAttribute("role", "dialog");
  o.setAttribute("aria-modal", "true");
  o.setAttribute("aria-label", alt || "Enlarged photo");
  o.innerHTML = `<button class="lb-close" aria-label="Close">✕</button>
                 <img src="${esc(src)}" alt="${esc(alt || "")}">`;

  const close = () => {
    o.remove();
    document.removeEventListener("keydown", onKey);
    prev?.focus?.();
  };
  const onKey = e => {
    if (e.key === "Escape") close();
    if (e.key === "Tab") { e.preventDefault(); btn.focus(); }  // only one control: trap here
  };

  o.addEventListener("click", e => { if (e.target === o || e.target.closest(".lb-close")) close(); });
  document.addEventListener("keydown", onKey);
  document.body.appendChild(o);
  const btn = o.querySelector(".lb-close");
  btn.focus();
}

/* ---- Reveal on scroll ---- */
function observeReveal(){
  const els = document.querySelectorAll(".reveal:not(.in)");
  if (prefersReducedMotion() || !("IntersectionObserver" in window)){
    els.forEach(el => el.classList.add("in"));       // show everything immediately
    return;
  }
  const io = new IntersectionObserver(es => es.forEach(e =>
    e.isIntersecting && e.target.classList.add("in")), { threshold: .12 });

  els.forEach(el => {
    // Anything already scrolled past (e.g. the browser restored the scroll
    // position on reload) will never intersect again — show it straight away
    // instead of leaving it stranded at opacity:0.
    if (el.getBoundingClientRect().bottom < 0) el.classList.add("in");
    else io.observe(el);
  });
}

/* ---- Experience: interactive zig-zag timeline ---- */
const startYear = p => (String(p).match(/\d{4}/) || ["•"])[0];

function renderExperience(){
  document.getElementById("list").innerHTML = SITE.experience.map((e, i) => {
    const id = `xpb-${i}`;
    const open = i < 2;                              // first two roles start expanded
    const hasBody = e.bullets.length > 0;
    return `<div class="xp ${i % 2 ? "right" : "left"} reveal">
      <div class="xp-node${/present/i.test(e.period) ? " now" : ""}${monogram(e.logo).length > 2 ? " sm" : ""}" aria-hidden="true"><span>${esc(monogram(e.logo))}</span></div>
      <div class="xp-year" aria-hidden="true">${startYear(e.period)}</div>
      <div class="xp-card${open ? " open" : ""}">
        <div class="xp-head">
          ${logoThumb(e.logo)}
          <h3 class="xp-title">${hasBody
            ? `<button class="xp-trigger" aria-expanded="${open}" aria-controls="${id}">
                 <span>${esc(e.role)}</span>
                 <span class="xp-toggle" aria-hidden="true">${open ? "−" : "+"}</span>
               </button>`
            : esc(e.role)}</h3>
        </div>
        <div class="meta">${esc(e.company)} · ${esc(e.period)} · ${esc(e.location)}</div>
        ${e.headline ? `<p class="xp-headline">${esc(e.headline)}</p>` : ""}
        ${e.scene && typeof scene === "function" ? scene(e.scene) : ""}
        ${hasBody ? `<div class="xp-body" id="${id}"><ul>${
          e.bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul></div>` : ""}
      </div></div>`;
  }).join("");

  document.getElementById("list").addEventListener("click", ev => {
    const t = ev.target.closest(".xp-trigger"); if (!t) return;
    const card = t.closest(".xp-card");
    const open = card.classList.toggle("open");
    t.setAttribute("aria-expanded", String(open));
    t.querySelector(".xp-toggle").textContent = open ? "−" : "+";
  });

  observeReveal();
  if (typeof observeScenes === "function"){
    observeScenes();
    trackTimeline(document.getElementById("list"));
  }
}

/* ---- Education ----
   Each degree is a card: animated scene + key facts on one side, the
   story (focus tags, stand-out project, thesis, extras) on the other.
   Older entries that only have `details` still render as a paragraph. */
function renderEducation(){
  document.getElementById("list").innerHTML = SITE.education.map(e => {
    const facts = [e.period, e.grade].filter(Boolean).map(f => `<li>${esc(f)}</li>`).join("");
    return `<article class="card edu reveal">
      <div class="edu-side">
        ${e.scene && typeof scene === "function" ? scene(e.scene) : ""}
        ${facts ? `<ul class="edu-facts">${facts}</ul>` : ""}
      </div>
      <div class="edu-main">
        <div class="edu-head">${logoThumb(e.logo)}
          <div><h3>${esc(e.degree)}</h3>
          <div class="meta muted">${esc(e.school)}</div></div></div>
        ${e.summary ? `<p class="edu-summary">${esc(e.summary)}</p>` : ""}
        ${e.details ? `<p>${esc(e.details)}</p>` : ""}
        ${e.focus?.length ? `<h4 class="edu-label">Focus</h4>
          <ul class="tags">${e.focus.map(f => `<li class="tag">${esc(f)}</li>`).join("")}</ul>` : ""}
        ${e.project ? `<div class="edu-project"><h4 class="edu-label">Stand-out project</h4>
          <strong>${esc(e.project.title)}</strong><p>${esc(e.project.text)}</p></div>` : ""}
        ${e.thesis ? `<p class="edu-thesis">${esc(e.thesis.text)}${e.thesis.href
          ? ` <a href="${esc(e.thesis.href)}">See it in Experience →</a>` : ""}</p>` : ""}
        ${e.extras?.length ? `<h4 class="edu-label">Beyond the syllabus</h4>
          <ul class="edu-extras">${e.extras.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
      </div></article>`;
  }).join("");
  observeReveal();
  if (typeof observeScenes === "function") observeScenes();
}

/* ---- Skills (proficiency tiers, not percentages) ---- */
const TIER_STEPS = { Expert: 3, Advanced: 2, Working: 1 };

function renderSkills(){
  document.getElementById("list").innerHTML = SITE.skills.map(s => {
    const steps = TIER_STEPS[s.tier] || 1;
    const meter = [1,2,3].map(n =>
      `<span class="step${n <= steps ? " on" : ""}"></span>`).join("");
    return `<div class="skill reveal">
      <div class="row">
        <span class="skill-name">${esc(s.name)}</span>
        <span class="tier tier-${esc(String(s.tier).toLowerCase())}">${esc(s.tier)}</span>
      </div>
      <div class="meter" role="img" aria-label="${esc(s.tier)} proficiency">${meter}</div>
      ${s.note ? `<p class="skill-note muted">${esc(s.note)}</p>` : ""}
    </div>`;
  }).join("");

  const t = document.getElementById("tech");
  if (t && SITE.techSkills) t.innerHTML = SITE.techSkills.map(g =>
    `<div class="card reveal"><h3>${esc(g.group)}</h3>
      <ul class="tags">${g.items.map(i => `<li class="tag">${esc(i)}</li>`).join("")}</ul></div>`).join("");

  observeReveal();
}

/* ---- Favourites: what I watch and what I read ---- */
function favItem(o, withAuthor){
  return `<li class="fav-item">
    ${favIcon(o.icon)}
    <div class="fav-body">
      <h4 class="fav-title">${esc(o.title)}</h4>
      ${withAuthor && o.author ? `<div class="fav-author muted">${esc(o.author)}</div>` : ""}
      ${o.works ? `<div class="fav-works muted">${esc(o.works)}</div>` : ""}
      ${o.note ? `<p class="fav-note muted">${esc(o.note)}</p>` : ""}
    </div></li>`;
}

function renderFavourites(){
  const f = SITE.favourites;
  if (!f) return;

  const intro = document.getElementById("favIntro");
  if (intro && f.intro) intro.innerHTML = `<p class="lede reveal">${esc(f.intro)}</p>`;

  // Each half restates the page's thesis in its own words.
  const halfBlurb = text => text
    ? `<p class="section-blurb reveal">${esc(text)}</p>` : "";

  const screen = document.getElementById("screen");
  if (screen && f.screen){
    const block = (heading, items) => items?.length
      ? `<h3 class="fav-sub">${esc(heading)}</h3>
         <ul class="fav-grid reveal">${items.map(o => favItem(o, false)).join("")}</ul>`
      : "";
    screen.innerHTML = halfBlurb(f.screen.blurb)
      + block("Films", f.screen.films) + block("Series", f.screen.series);
  }

  const shelf = document.getElementById("shelf");
  if (shelf && f.shelf?.groups?.length){
    shelf.innerHTML = halfBlurb(f.shelf.blurb) + f.shelf.groups.map(g => `
      <div class="shelf-group reveal">
        <div class="eyebrow">${esc(g.era)}</div>
        ${g.blurb ? `<p class="shelf-blurb muted">${esc(g.blurb)}</p>` : ""}
        <ul class="fav-grid">${g.books.map(b => favItem(b, true)).join("")}</ul>
      </div>`).join("");
  }

  const kitchen = document.getElementById("kitchen");
  if (kitchen && f.kitchen?.items?.length){
    const eating = f.kitchen.eating;
    kitchen.innerHTML = halfBlurb(f.kitchen.blurb)
      + `<ul class="fav-grid reveal">${f.kitchen.items.map(o => favItem(o, false)).join("")}</ul>`
      + (eating?.photos?.length ? `
        ${eating.blurb ? `<p class="shelf-blurb muted" style="margin-top:34px">${esc(eating.blurb)}</p>` : ""}
        <div class="gallery eat-gallery reveal">${eating.photos.map((p, i) =>
          `<button class="gallery-item" data-i="${i}" aria-label="Enlarge photo: ${esc(p.alt)}">
            ${img(p.src, p.alt)}
            ${p.caption ? `<span class="eat-caption">${esc(p.caption)}</span>` : ""}
          </button>`).join("")}</div>` : "");

    if (eating?.photos?.length){
      kitchen.querySelector(".eat-gallery").addEventListener("click", e => {
        const b = e.target.closest(".gallery-item"); if (!b) return;
        const p = eating.photos[+b.dataset.i];
        lightbox(p.src, p.alt, b);
      });
    }
  }

  observeReveal();
}

/* ---- Patent artwork -------------------------------------------------
   Hand-drawn SVG rather than photos: patent figures aren't ours to host,
   and stock imagery would say nothing. Everything is stroked/filled with
   currentColor, so the accent colour follows the light/dark theme.
   Pick one per patent with `art: "lidar" | "map" | "cloud"`.        */
const PATENT_ART = {
  // A vehicle scanning its surroundings while receiving data from a server.
  lidar: `
    <g fill="none" stroke="currentColor" stroke-linecap="round" opacity=".38">
      <path d="M116 122 A 90 90 0 0 1 296 122" stroke-width="2"/>
      <path d="M142 122 A 64 64 0 0 1 270 122" stroke-width="2"/>
      <path d="M168 122 A 38 38 0 0 1 244 122" stroke-width="2"/>
    </g>
    <g fill="currentColor" opacity=".5">
      <circle cx="116" cy="122" r="2.6"/><circle cx="132" cy="82" r="2.6"/>
      <circle cx="168" cy="52" r="2.6"/><circle cx="206" cy="32" r="2.6"/>
      <circle cx="252" cy="48" r="2.6"/><circle cx="286" cy="86" r="2.6"/>
      <circle cx="296" cy="122" r="2.6"/><circle cx="244" cy="84" r="2.2"/>
      <circle cx="170" cy="88" r="2.2"/>
    </g>
    <g fill="currentColor" opacity=".9">
      <circle cx="52" cy="44" r="11"/><circle cx="68" cy="36" r="15"/>
      <circle cx="86" cy="44" r="10"/><rect x="48" y="45" width="44" height="11" rx="5.5"/>
    </g>
    <g fill="none" stroke="currentColor" stroke-dasharray="4 6" opacity=".55">
      <path d="M92 60 C 124 82, 146 96, 172 108"/>
      <path d="M84 62 C 112 88, 132 102, 158 114"/>
    </g>
    <g fill="currentColor">
      <rect x="176" y="108" width="62" height="15" rx="6"/>
      <path d="M189 108 l8 -11 h20 l10 11 z"/>
      <circle cx="191" cy="125" r="5.5"/><circle cx="224" cy="125" r="5.5"/>
    </g>
    <path d="M40 134 H 360" stroke="currentColor" stroke-width="2" opacity=".25" stroke-linecap="round"/>`,

  // A route traced across a map grid.
  map: `
    <g stroke="currentColor" opacity=".22" stroke-width="1.5">
      <path d="M40 30 H360 M40 65 H360 M40 100 H360 M40 135 H360"/>
      <path d="M80 20 V145 M140 20 V145 M200 20 V145 M260 20 V145 M320 20 V145"/>
    </g>
    <path d="M70 130 C 130 130, 120 70, 180 68 C 240 66, 236 34, 320 40"
          fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" opacity=".85"/>
    <g fill="currentColor">
      <circle cx="70" cy="130" r="7"/>
      <path d="M320 26 a13 13 0 0 1 13 13 c0 10 -13 22 -13 22 s-13 -12 -13 -22 a13 13 0 0 1 13 -13z"/>
      <circle cx="320" cy="39" r="4.5" fill="#fff" opacity=".9"/>
    </g>`,

  // Map data and live sensor readings merging, judged against a safety rating.
  fusion: `
    <g opacity=".55">
      <rect x="26" y="44" width="88" height="64" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>
    </g>
    <g stroke="currentColor" opacity=".3" stroke-width="1.4">
      <path d="M26 66 H114 M26 87 H114 M55 44 V108 M85 44 V108"/>
    </g>
    <path d="M38 100 C 62 100, 58 64, 102 56" fill="none" stroke="currentColor"
          stroke-width="2.5" stroke-linecap="round" opacity=".85"/>
    <g fill="none" stroke="currentColor" opacity=".45" stroke-width="2" stroke-linecap="round">
      <path d="M290 106 A 44 44 0 0 1 378 106"/>
      <path d="M304 106 A 30 30 0 0 1 364 106"/>
      <path d="M318 106 A 16 16 0 0 1 350 106"/>
    </g>
    <circle cx="334" cy="106" r="4" fill="currentColor"/>
    <g stroke="currentColor" stroke-width="2" fill="none" opacity=".5" stroke-dasharray="4 5">
      <path d="M120 76 H 166"/><path d="M288 92 H 238"/>
    </g>
    <path d="M202 40 l26 9 v20 c0 17 -11 29 -26 36 c-15 -7 -26 -19 -26 -36 v-20 z"
          fill="currentColor" opacity=".92"/>
    <path d="M190 76 l8 8 l16 -17" fill="none" stroke="var(--bg,#fff)"
          stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`,

  // Map data streaming from the cloud down to a vehicle.
  cloud: `
    <g fill="currentColor" opacity=".9">
      <circle cx="170" cy="46" r="16"/><circle cx="196" cy="34" r="22"/>
      <circle cx="224" cy="46" r="15"/><rect x="164" y="46" width="66" height="16" rx="8"/>
    </g>
    <g fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity=".55">
      <path d="M180 74 V 96" stroke-dasharray="5 6"/>
      <path d="M200 74 V 104" stroke-dasharray="5 6"/>
      <path d="M220 74 V 96" stroke-dasharray="5 6"/>
    </g>
    <g fill="currentColor">
      <rect x="166" y="112" width="70" height="16" rx="6"/>
      <path d="M180 112 l9 -12 h22 l11 12 z"/>
      <circle cx="182" cy="130" r="6"/><circle cx="219" cy="130" r="6"/>
    </g>
    <path d="M60 140 H 340" stroke="currentColor" stroke-width="2" opacity=".25" stroke-linecap="round"/>`,
};

const patentArt = key => PATENT_ART[key]
  ? `<div class="patent-art"><svg viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg"
       role="img" aria-hidden="true" focusable="false">${PATENT_ART[key]}</svg></div>`
  : "";

/* ---- Patents ---- */
function renderPatents(){
  const el = SITE.patents || [];
  const list = document.getElementById("list");

  if (!el.length){
    list.classList.remove("cols-2");
    list.innerHTML = `<div class="card empty-state">
      <div class="icon" aria-hidden="true">📄</div>
      <h3>Patent details coming soon</h3>
      <p class="muted">This page is built and ready — the patent records just need to be
        added to <code>patents</code> in <code>assets/js/content.js</code>.
        A commented example sits right above it showing the fields.</p></div>`;
    return;
  }

  list.innerHTML = el.map(p => {
    const bits = [p.number, p.office, p.year, p.filed].filter(Boolean).map(esc).join(" · ");
    const credit = [p.assignee, p.coInventors].filter(Boolean).map(esc).join(" · ");
    const title = p.link
      ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">${esc(p.title)}</a>`
      : esc(p.title);
    return `<div class="card patent reveal">
      ${patentArt(p.art)}
      ${p.status ? `<span class="tag status">${esc(p.status)}</span>` : ""}
      <h3>${title}</h3>
      ${p.titleOrig ? `<div class="patent-orig muted" lang="de">${esc(p.titleOrig)}</div>` : ""}
      ${bits ? `<div class="meta muted">${bits}</div>` : ""}
      ${p.plain ? `<p class="patent-plain">${esc(p.plain)}</p>` : ""}
      ${credit ? `<div class="patent-credit muted">${credit}</div>` : ""}
    </div>`;
  }).join("");

  observeReveal();
}
