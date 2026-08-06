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
};
const hobbyIcon = key => HOBBY_ICON[key]
  ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
       focusable="false">${HOBBY_ICON[key]}</svg>`
  : "";

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
        ${page("patents.html","Patents")}
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
      <div class="xp-node${monogram(e.logo).length > 2 ? " sm" : ""}" aria-hidden="true"><span>${esc(monogram(e.logo))}</span></div>
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
}

/* ---- Education ---- */
function renderEducation(){
  document.getElementById("list").innerHTML = SITE.education.map(e =>
    `<div class="card edu reveal">
      <div class="edu-head">${logoThumb(e.logo)}
        <div><h3>${esc(e.degree)}</h3>
        <div class="meta muted">${esc(e.school)} · ${esc(e.period)}</div></div></div>
      ${e.image ? img(e.image, "", "edu-img") : ""}
      <p>${esc(e.details)}</p></div>`).join("");
  observeReveal();
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
