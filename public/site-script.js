/* ===================== Custom cursor + trail ===================== */
(function(){
  const dot = document.getElementById('cursor-dot');
  const trailCanvas = document.getElementById('cursor-trail');
  const ctx = trailCanvas.getContext('2d');
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  function resizeTrail(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    trailCanvas.width = window.innerWidth * dpr;
    trailCanvas.height = window.innerHeight * dpr;
    trailCanvas.style.width = window.innerWidth + 'px';
    trailCanvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  resizeTrail();
  window.addEventListener('resize', resizeTrail);

  let mx = window.innerWidth/2, my = window.innerHeight/2;
  let dx = mx, dy = my;
  const points = [];
  const MAX_POINTS = 22;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
  });
  window.addEventListener('mousedown', () => dot.classList.add('pressed'));
  window.addEventListener('mouseup', () => dot.classList.remove('pressed'));

  function loop(){
    dx += (mx - dx) * 0.32;
    dy += (my - dy) * 0.32;
    dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%,-50%)`;

    points.unshift({x: dx, y: dy});
    if (points.length > MAX_POINTS) points.pop();

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < points.length - 1; i++){
      const p = points[i];
      const alpha = (1 - i / MAX_POINTS) * 0.45;
      const r = 10 * (1 - i / MAX_POINTS);
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(r, 0.5), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(126,200,255,${alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ===================== Nav dropdowns — every item, on hover ===================== */
(function(){
  const navItems = document.querySelectorAll('.nav-item[data-nav]');
  const panel = document.getElementById('nav-dropdown');
  const card = document.getElementById('nav-dropdown-card');

  function ddIcon(pathD){
    return `<div class="dd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${pathD}</svg></div>`;
  }
  const icons = {
    layers: '<path d="M4 7l8-4 8 4-8 4-8-4zM4 12l8 4 8-4M4 17l8 4 8-4"/>',
    workflow: '<circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M8.1 7.3L11 16M15.9 7.3L13 16M8.4 6h7.2"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    code: '<path d="M8 6L2 12l6 6M16 6l6 6-6 6"/>',
    pen: '<path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>',
    link: '<circle cx="8" cy="8" r="3"/><circle cx="16" cy="16" r="3"/><path d="M10 10l4 4"/>',
    flow: '<path d="M4 6h10a4 4 0 010 8H6M4 6l4-4M4 6l4 4"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
    predict: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    shield: '<path d="M12 3l7 3v6c0 4.5-3 7-7 9-4-2-7-4.5-7-9V6z"/>',
    cloud: '<path d="M7 18a4 4 0 010-8 5 5 0 019.6-1.5A4.5 4.5 0 0117.5 18z"/>',
    diamond: '<path d="M12 3l9 6-9 12-9-12z"/>',
    book: '<path d="M4 4h12a4 4 0 014 4v12H8a4 4 0 01-4-4z"/><path d="M4 4v12"/>',
    doc: '<path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5"/>',
    graduate: '<path d="M2 8l10-5 10 5-10 5z"/><path d="M6 10v6c0 1.7 2.7 3 6 3s6-1.3 6-3v-6"/>',
    building: '<path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/>',
    briefcase: '<path d="M3 7h18v13H3zM8 7V4h8v3"/>',
    mail: '<path d="M4 4h16v16H4zM4 6l8 7 8-7"/>',
    handshake: '<circle cx="8" cy="8" r="3"/><circle cx="16" cy="16" r="3"/><path d="M10 10l4 4"/>'
  };

  const content = {
    platform: {
      links: [
        { icon: icons.diamond, title: 'AI Systems', sub: 'Custom models &amp; agents' },
        { icon: icons.flow, title: 'Automation', sub: 'Self-running workflows' },
        { icon: icons.chart, title: 'Data Analysis', sub: 'Decisions from data' },
        { icon: icons.code, title: 'Software Engineering', sub: 'Architecture to interface' },
        { icon: icons.pen, title: 'Design &amp; Creative', sub: 'Interfaces that convert' },
        { icon: icons.workflow, title: 'Interactive AI Core', sub: 'Connected, real-time' },
      ],
      title: 'The NEXORA platform', desc: 'AI, automation &amp; data — from model to interface.', cta: 'Explore platform'
    },
    solutions: {
      links: [
        { icon: icons.link, title: 'NEXORA Connect', sub: 'IoT &amp; API integrations' },
        { icon: icons.flow, title: 'NEXORA Flow', sub: 'Automation orchestration' },
        { icon: icons.eye, title: 'NEXORA Vision', sub: 'Computer vision' },
        { icon: icons.predict, title: 'NEXORA Predict', sub: 'Predictive analytics' },
        { icon: icons.shield, title: 'NEXORA Secure', sub: 'Zero-trust security' },
        { icon: icons.cloud, title: 'NEXORA Cloud', sub: 'Elastic infra &amp; MLOps' },
      ],
      title: 'The NEXORA platform', desc: 'AI, automation &amp; data — from model to interface.', cta: 'Explore platform'
    },
    products: {
      links: [
        { icon: icons.diamond, title: 'Studio', sub: 'Connected products' },
        { icon: icons.chart, title: 'Analytics', sub: 'Live dashboards' },
        { icon: icons.cloud, title: 'Retail', sub: 'Demand forecasting' },
        { icon: icons.link, title: 'Atlas', sub: 'Logistics network' },
      ],
      title: 'The NEXORA platform', desc: 'AI, automation &amp; data — from model to interface.', cta: 'Explore platform'
    },
    resources: {
      links: [
        { icon: icons.doc, title: 'Documentation', sub: 'Guides & API docs' },
        { icon: icons.book, title: 'Blog', sub: 'News & insights' },
        { icon: icons.graduate, title: 'Learn', sub: 'Tutorials & courses' },
        { icon: icons.layers, title: 'Changelog', sub: 'What shipped recently' },
      ],
      title: 'The NEXORA platform', desc: 'AI, automation &amp; data — from model to interface.', cta: 'Explore platform'
    },
    company: {
      links: [
        { icon: icons.building, title: 'About', sub: 'Our mission' },
        { icon: icons.briefcase, title: 'Careers', sub: 'Join the team' },
        { icon: icons.mail, title: 'Contact', sub: 'Talk to us' },
        { icon: icons.handshake, title: 'Partners', sub: 'Build with NEXORA' },
      ],
      title: 'The NEXORA platform', desc: 'AI, automation &amp; data — from model to interface.', cta: 'Explore platform'
    }
  };

  function render(key){
    const c = content[key];
    if (!c) return;
    card.innerHTML = c.links.map(l => `
      <a href="#" class="dd-link">
        ${ddIcon(l.icon)}
        <div><strong>${l.title}</strong><span>${l.sub}</span></div>
      </a>
    `).join('') + `
      <div class="dd-highlight">
        <span class="logo-mark">N</span>
        <h4>${c.title}</h4>
        <p>${c.desc}</p>
        <a href="#">${c.cta}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
    `;
  }

  let hideTimer = null;
  let activeItem = null;

  function show(item){
    clearTimeout(hideTimer);
    if (activeItem) activeItem.classList.remove('open');
    activeItem = item;
    item.classList.add('open');
    render(item.getAttribute('data-nav'));
    panel.classList.add('show');
  }
  function scheduleHide(){
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      panel.classList.remove('show');
      if (activeItem) activeItem.classList.remove('open');
      activeItem = null;
    }, 150);
  }

  navItems.forEach((item) => {
    item.addEventListener('mouseenter', () => show(item));
    item.addEventListener('mouseleave', scheduleHide);
  });
  panel.addEventListener('mouseenter', () => clearTimeout(hideTimer));
  panel.addEventListener('mouseleave', scheduleHide);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') scheduleHide(); });
})();

/* ===================== Language button — real translation toggle ===================== */
(function(){
  const btn = document.getElementById('lang-btn');
  const label = document.getElementById('lang-label');
  let arabic = false; // page starts in English; button shows the language you can SWITCH TO

  function applyLang(){
    const targetLang = arabic ? 'ar' : 'en';
    document.querySelectorAll('[data-en]').forEach((el) => {
      const val = el.getAttribute(targetLang === 'ar' ? 'data-ar' : 'data-en');
      if (val == null) return;
      if (el.hasAttribute('data-html')) el.innerHTML = val;
      else el.textContent = val;
    });
    document.documentElement.setAttribute('lang', targetLang);
    document.documentElement.setAttribute('dir', targetLang === 'ar' ? 'rtl' : 'ltr');
    // the button itself always offers the OTHER language
    label.textContent = arabic ? 'English' : 'العربية';
  }

  btn.addEventListener('click', () => {
    arabic = !arabic;
    applyLang();
  });

  applyLang();
})();

/* ===================== Hero animated flow lines ===================== */
(function(){
  const svg = document.getElementById('hero-lines');
  const NS = 'http://www.w3.org/2000/svg';
  svg.setAttribute('viewBox', '0 0 1440 900');

  const defs = document.createElementNS(NS, 'defs');
  svg.appendChild(defs);

  // Long, fully continuous diagonals sweeping top-left -> bottom-right, all bowing the
  // SAME single gentle direction (like a fan of arcs), clustered from the far left edge
  // to the middle of the page. Two colors for variety, but the curve direction is shared.
  const lines = [];
  const COUNT = 22;
  for (let i = 0; i < COUNT; i++){
    const t = i / (COUNT - 1);
    const x1 = -320 + t * 160;                // always starts past the left edge, for every line
    const y1 = -60 + t * 520;                 // starts high, fans down along the left edge
    const x2 = x1 + 1500 + t * 260;           // sweeps far to the right
    const y2 = y1 + 520 + t * 220;            // ends lower-right

    const isBlue = i % 3 !== 0;               // mostly blue, some thin light lines — matches reference mix
    const color = isBlue ? '#5B6EF5' : '#C7CBFF';
    const amp = 130 + (i % 4) * 30;           // strongly pronounced S-bend amplitude

    // true S-curve: cubic bezier with two control points offset in OPPOSITE
    // perpendicular directions, so the line bends one way then the other — like the letter S
    const dx = x2 - x1, dy = y2 - y1;
    const segLen = Math.hypot(dx, dy) || 1;
    const px = -dy / segLen, py = dx / segLen;
    const q1x = x1 + dx * 0.3, q1y = y1 + dy * 0.3;
    const q2x = x1 + dx * 0.7, q2y = y1 + dy * 0.7;
    const c1x = q1x + px * amp, c1y = q1y + py * amp;
    const c2x = q2x - px * amp, c2y = q2y - py * amp;
    const d = `M${x1},${y1} C${c1x},${c1y} ${c2x},${c2y} ${x2},${y2}`;

    lines.push({
      d,
      color,
      baseOpacity: isBlue ? (0.16 + (i % 4) * 0.045) : (0.1 + (i % 3) * 0.04),
      width: isBlue ? (1.2 + (i % 3) * 0.4) * (1 - t * 0.55) : 1 * (1 - t * 0.4),
      dur: 12 + (i % 7) * 2.8,
      delay: -(i * 0.7)
    });
  }

  lines.forEach((p) => {
    // solid, fully continuous base line — always fully visible, never dashed
    const base = document.createElementNS(NS, 'path');
    base.setAttribute('d', p.d);
    base.setAttribute('stroke', p.color);
    base.setAttribute('stroke-width', p.width);
    base.setAttribute('fill', 'none');
    base.setAttribute('opacity', p.baseOpacity);
    svg.appendChild(base);

    // bright traveling pulse riding along the same continuous path — the "movement"
    const glow = document.createElementNS(NS, 'path');
    glow.setAttribute('d', p.d);
    glow.setAttribute('stroke', p.color);
    glow.setAttribute('stroke-width', p.width + 1.1);
    glow.setAttribute('fill', 'none');
    glow.setAttribute('stroke-linecap', 'round');
    glow.setAttribute('opacity', '0.95');
    svg.appendChild(glow);

    const len = glow.getTotalLength();
    const pulseLen = len * 0.5;
    glow.style.strokeDasharray = `${pulseLen} ${len - pulseLen}`;
    glow.animate(
      [{ strokeDashoffset: 0 }, { strokeDashoffset: -len }],
      { duration: p.dur * 1000, delay: p.delay * 1000, iterations: Infinity, easing: 'linear' }
    );
  });
})();

/* ===================== Marquee content ===================== */
(function(){
  const items = [
    { name: 'Halcyon', icon: '<circle cx="7" cy="12" r="5"/><circle cx="15" cy="12" r="5"/>' },
    { name: 'vireo', icon: '<path d="M12 3l9 17H3z"/>' },
    { name: 'Quanta', icon: '<circle cx="6" cy="6" r="1.6"/><circle cx="12" cy="6" r="1.6"/><circle cx="18" cy="6" r="1.6"/><circle cx="6" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="18" cy="12" r="1.6"/>' },
    { name: 'LUMEN', icon: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/>' },
    { name: 'Orbital', icon: '<ellipse cx="12" cy="12" rx="9" ry="4"/><circle cx="12" cy="12" r="2.4"/>' },
    { name: 'Aster', icon: '<path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19"/>' },
    { name: 'Cobalt', icon: '<path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/>' },
    { name: 'MERIDIAN', icon: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>' },
  ];
  function itemHTML(it){
    return `<div class="marquee-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">${it.icon}</svg>${it.name}</div>`;
  }
  const track = document.getElementById('marquee-track');
  const repeated = itemHTML && (items.map(itemHTML).join('') + items.map(itemHTML).join('') + items.map(itemHTML).join('') + items.map(itemHTML).join(''));
  track.innerHTML = repeated;
})();

/* ===================== Capabilities cards ===================== */
(function(){
  const caps = [
    { title: 'AI Systems', icon: '<path d="M9 3a3 3 0 013 3v0a3 3 0 013-3 3 3 0 013 3v1a3 3 0 01-1.2 2.4A3 3 0 0118 12v0a3 3 0 01-1.2 2.4A3 3 0 0118 17v1a3 3 0 01-3 3 3 3 0 01-3-3v0a3 3 0 01-3 3 3 3 0 01-3-3v-1a3 3 0 011.2-2.4A3 3 0 016 12v0a3 3 0 011.2-2.4A3 3 0 016 7V6a3 3 0 013-3z"/><circle cx="12" cy="12" r="1.6"/>' },
    { title: 'Automation', icon: '<circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M8.1 7.3L11 16M15.9 7.3L13 16M8.4 6h7.2"/>' },
    { title: 'Data Analysis', icon: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>' },
    { title: 'Software Engineering', icon: '<path d="M8 6L2 12l6 6M16 6l6 6-6 6M13 4l-2 16"/>' },
    { title: 'Design & Creative', icon: '<path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.5 7.5"/><circle cx="11" cy="11" r="2"/>' },
  ];
  const grid = document.getElementById('cap-grid');
  grid.innerHTML = caps.map(c => `
    <div class="cap-card">
      <svg class="cap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">${c.icon}</svg>
      <h3>${c.title}</h3>
    </div>
  `).join('');
})();

/* ===================== Enterprise Solutions carousel ===================== */
(function(){
  const sols = [
    { n: '01', cat: 'INTEGRATION', color: '#5B9CFF', title: 'NEXORA Connect' },
    { n: '02', cat: 'AUTOMATION', color: '#4DD9E8', title: 'NEXORA Flow' },
    { n: '03', cat: 'COMPUTER VISION', color: '#E066C9', title: 'NEXORA Vision' },
    { n: '04', cat: 'ANALYTICS', color: '#4ADE80', title: 'NEXORA Predict' },
    { n: '05', cat: 'SECURITY', color: '#FF9F5B', title: 'NEXORA Secure' },
    { n: '06', cat: 'INFRASTRUCTURE', color: '#A78BFA', title: 'NEXORA Cloud' },
  ];
  const track = document.getElementById('solutions-track');
  track.innerHTML = sols.map(s => `
    <div class="sol-card">
      <div class="sol-top"><div class="sol-num">${s.n}</div><div class="sol-menu">⋯</div></div>
      <div class="sol-body">
        <div class="sol-cat" style="color:${s.color}">${s.cat}</div>
        <h3>${s.title}</h3>
      </div>
      <a href="#" class="sol-explore">Explore
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </div>
  `).join('');

  const viewport = document.querySelector('.solutions-viewport');
  const prevBtn = document.getElementById('sol-prev');
  const nextBtn = document.getElementById('sol-next');
  let index = 0;
  function cardStep(){
    const card = track.querySelector('.sol-card');
    if (!card) return 320;
    const style = getComputedStyle(track);
    const gap = parseFloat(style.gap || 22);
    return card.getBoundingClientRect().width + gap;
  }
  function maxIndex(){
    const visible = Math.max(1, Math.floor(viewport.clientWidth / cardStep()));
    return Math.max(0, sols.length - visible);
  }
  function update(){
    index = Math.max(0, Math.min(index, maxIndex()));
    track.style.transform = `translateX(-${index * cardStep()}px)`;
  }
  prevBtn.addEventListener('click', () => { index--; update(); });
  nextBtn.addEventListener('click', () => { index++; update(); });
  window.addEventListener('resize', update);
  update();
})();

/* ===================== Featured AI Products ===================== */
(function(){
  const products = [
    {
      title: 'NEXORA Studio',
      desc: 'Connected products and core integrations, engineered end to end.',
      preview: `<div class="dots-top"><span></span><span></span><span></span></div>
        <div style="display:flex;align-items:center;justify-content:center;height:78px;">
          <div style="width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#6C5CE7,#8B7CFF);transform:rotate(45deg);display:flex;align-items:center;justify-content:center;">
            <span style="transform:rotate(-45deg);font-weight:800;font-size:13px;color:#fff;">AI</span>
          </div>
        </div>`
    },
    {
      title: 'NEXORA Analytics',
      desc: 'Real-time dashboards and metrics across your whole stack.',
      preview: `<div class="dots-top"><span></span><span></span><span></span></div>
        <div style="display:flex;gap:8px;align-items:flex-end;height:60px;">
          <svg width="60%" height="100%" viewBox="0 0 100 60" preserveAspectRatio="none"><polyline points="0,50 20,38 40,44 60,20 80,28 100,10" fill="none" stroke="#8B7CFF" stroke-width="3"/></svg>
          <svg width="34" height="34" viewBox="0 0 34 34"><circle cx="17" cy="17" r="14" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="5"/><circle cx="17" cy="17" r="14" fill="none" stroke="#4DD9E8" stroke-width="5" stroke-dasharray="88" stroke-dashoffset="26" stroke-linecap="round" transform="rotate(-90 17 17)"/></svg>
        </div>`
    },
    {
      title: 'NEXORA Retail',
      desc: 'Demand forecasting and supply-chain intelligence for retail.',
      preview: `<div class="dots-top"><span></span><span></span><span></span></div>
        <div style="display:flex;gap:5px;align-items:flex-end;height:66px;">
          <div style="width:12%;height:55%;background:#5B6EF5;border-radius:3px;"></div>
          <div style="width:12%;height:72%;background:#5B6EF5;border-radius:3px;"></div>
          <div style="width:12%;height:40%;background:#5B6EF5;border-radius:3px;"></div>
          <div style="width:12%;height:88%;background:#8B7CFF;border-radius:3px;"></div>
          <div style="width:12%;height:60%;background:#5B6EF5;border-radius:3px;"></div>
          <div style="width:12%;height:78%;background:#8B7CFF;border-radius:3px;"></div>
        </div>`
    },
    {
      title: 'NEXORA Atlas',
      desc: 'Route optimization and logistics network analytics at scale.',
      preview: `<div class="dots-top"><span></span><span></span><span></span></div>
        <svg width="100%" height="70" viewBox="0 0 200 70">
          <path d="M10,50 Q60,10 100,35 T190,20" fill="none" stroke="#4ADE80" stroke-width="2" stroke-dasharray="4 5"/>
          <circle cx="10" cy="50" r="3.5" fill="#8B7CFF"/><circle cx="100" cy="35" r="3.5" fill="#8B7CFF"/><circle cx="190" cy="20" r="3.5" fill="#8B7CFF"/>
        </svg>`
    },
  ];
  const grid = document.getElementById('products-grid');
  grid.innerHTML = products.map(p => `
    <div class="prod-card">
      <div class="prod-preview">${p.preview}</div>
      <div class="prod-body"><h3>${p.title}</h3><p>${p.desc}</p></div>
    </div>
  `).join('');
})();

/* ===================== Generic scroll reveal ===================== */
(function(){
  const els = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();

/* ===================== Dashboard card — reveals both ways ===================== */
(function(){
  const card = document.getElementById('dash-card');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      card.classList.toggle('revealed', e.isIntersecting);
    });
  }, { threshold: 0.3 });
  io.observe(card);
})();


/* ===================== Interactive AI Core — hub visual ===================== */
(function(){
  const wrap = document.getElementById('ai-hub');
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 700 700');
  wrap.appendChild(svg);

  const defs = document.createElementNS(NS, 'defs');
  const glowGrad = document.createElementNS(NS, 'radialGradient');
  glowGrad.setAttribute('id', 'aiCoreGlow');
  glowGrad.innerHTML = '<stop offset="0" stop-color="#6C5CE7" stop-opacity=".6"/><stop offset="1" stop-color="#6C5CE7" stop-opacity="0"/>';
  const coreGrad = document.createElementNS(NS, 'radialGradient');
  coreGrad.setAttribute('id', 'aiCoreSolid');
  coreGrad.setAttribute('cx', '35%'); coreGrad.setAttribute('cy', '32%');
  coreGrad.innerHTML = '<stop offset="0" stop-color="#8B7CFF"/><stop offset="1" stop-color="#4a3ee0"/>';
  const dimGrad = document.createElementNS(NS, 'radialGradient');
  dimGrad.setAttribute('id', 'aiTopDimGlow');
  dimGrad.innerHTML = '<stop offset="0" stop-color="#6C5CE7" stop-opacity=".5"/><stop offset="1" stop-color="#6C5CE7" stop-opacity="0"/>';
  defs.appendChild(glowGrad); defs.appendChild(coreGrad); defs.appendChild(dimGrad);
  svg.appendChild(defs);

  const cx = 350, cy = 350, R = 232, coreR = 92;

  // dim ambient glow ABOVE the hub — same size as the core, much fainter, with a soft shimmer
  const topGlow = document.createElementNS(NS, 'circle');
  topGlow.setAttribute('cx', cx - 175); topGlow.setAttribute('cy', 140); topGlow.setAttribute('r', coreR * 1.15);
  topGlow.setAttribute('fill', 'url(#aiTopDimGlow)');
  const topGlowPulse = document.createElementNS(NS, 'animate');
  topGlowPulse.setAttribute('attributeName', 'opacity');
  topGlowPulse.setAttribute('values', '0.35;0.85;0.35');
  topGlowPulse.setAttribute('dur', '3.2s');
  topGlowPulse.setAttribute('repeatCount', 'indefinite');
  topGlow.appendChild(topGlowPulse);
  svg.appendChild(topGlow);

  // ambient glow behind everything
  const glow = document.createElementNS(NS, 'circle');
  glow.setAttribute('cx', cx); glow.setAttribute('cy', cy); glow.setAttribute('r', coreR * 2.3);
  glow.setAttribute('fill', 'url(#aiCoreGlow)');
  svg.appendChild(glow);

  // faint orbit ring
  const ring = document.createElementNS(NS, 'circle');
  ring.setAttribute('cx', cx); ring.setAttribute('cy', cy); ring.setAttribute('r', R);
  ring.setAttribute('fill', 'none'); ring.setAttribute('stroke', 'rgba(255,255,255,.07)'); ring.setAttribute('stroke-width', '1');
  svg.appendChild(ring);

  const icons = [
    '<path d="M4 7l8-4 8 4-8 4-8-4zM4 12l8 4 8-4M4 17l8 4 8-4"/>',                                   // layers
    '<path d="M12 3l7 3v6c0 4.5-3 7-7 9-4-2-7-4.5-7-9V6z"/>',                                        // shield
    '<circle cx="8" cy="8" r="3"/><circle cx="16" cy="16" r="3"/><path d="M10 10l4 4"/>',            // link
    '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/>', // gear
    '<path d="M7 18a4 4 0 010-8 5 5 0 019.6-1.5A4.5 4.5 0 0117.5 18z"/>',                             // cloud
    '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>', // database
    '<circle cx="6" cy="6" r="2.2"/><circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="12" r="2.2"/><path d="M6 8.2V15.8M8 6.6l8 4.2M8 17.4l8-4.2"/>', // git-branch
    '<path d="M4 14a8 8 0 0116 0M7 17a4 4 0 0110 0M12 20v.01"/>'                                     // signal
  ];
  const angles = [-157.5, -112.5, -67.5, -22.5, 22.5, 67.5, 112.5, 157.5];
  const nodes = angles.map((deg, i) => {
    const rad = deg * Math.PI / 180;
    return {
      x: cx + R * Math.cos(rad),
      y: cy + R * Math.sin(rad),
      ex: cx + coreR * 1.06 * Math.cos(rad),
      ey: cy + coreR * 1.06 * Math.sin(rad),
      icon: icons[i],
      // alternate curve direction: half the connectors bow one way, half bow the other
      bend: (i % 2 === 0 ? 1 : -1) * 58
    };
  });

  // solid, continuous curved connectors (NOT dashed) — direction alternates per line
  nodes.forEach((n, i) => {
    const midX = (n.x + n.ex) / 2 + n.bend;
    const midY = (n.y + n.ey) / 2;
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('id', 'aiPath' + i);
    path.setAttribute('d', `M${n.x},${n.y} Q${midX},${midY} ${n.ex},${n.ey}`);
    path.setAttribute('stroke', 'rgba(139,124,255,.45)');
    path.setAttribute('stroke-width', '1.6');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    svg.appendChild(path);
    n.pathId = 'aiPath' + i;
  });

  // central AI core
  const core = document.createElementNS(NS, 'circle');
  core.setAttribute('cx', cx); core.setAttribute('cy', cy); core.setAttribute('r', coreR);
  core.setAttribute('fill', 'url(#aiCoreSolid)');
  svg.appendChild(core);

  // ring 1 — sits right at the edge of the glowing core
  const ring1 = document.createElementNS(NS, 'circle');
  ring1.setAttribute('cx', cx); ring1.setAttribute('cy', cy); ring1.setAttribute('r', coreR + 3);
  ring1.setAttribute('fill', 'none'); ring1.setAttribute('stroke', '#7EC8FF'); ring1.setAttribute('stroke-width', '1.5'); ring1.setAttribute('stroke-opacity', '0.75');
  svg.appendChild(ring1);

  // ring 2 — a bit bigger, with a small gap after ring 1
  const ring2R = coreR + 22;
  const ring2 = document.createElementNS(NS, 'circle');
  ring2.setAttribute('cx', cx); ring2.setAttribute('cy', cy); ring2.setAttribute('r', ring2R);
  ring2.setAttribute('fill', 'none'); ring2.setAttribute('stroke', '#7EC8FF'); ring2.setAttribute('stroke-width', '1.3'); ring2.setAttribute('stroke-opacity', '0.45');
  svg.appendChild(ring2);

  // small dot that continuously orbits the core (reversed direction, slower), sitting just outside ring 2
  const orbitG = document.createElementNS(NS, 'g');
  const orbitDot = document.createElementNS(NS, 'circle');
  orbitDot.setAttribute('cx', cx + ring2R + 9); orbitDot.setAttribute('cy', cy); orbitDot.setAttribute('r', '5');
  orbitDot.setAttribute('fill', '#c7d6ff');
  orbitG.appendChild(orbitDot);
  const orbitAnim = document.createElementNS(NS, 'animateTransform');
  orbitAnim.setAttribute('attributeName', 'transform');
  orbitAnim.setAttribute('type', 'rotate');
  orbitAnim.setAttribute('from', `360 ${cx} ${cy}`);
  orbitAnim.setAttribute('to', `0 ${cx} ${cy}`);
  orbitAnim.setAttribute('dur', '9s');
  orbitAnim.setAttribute('repeatCount', 'indefinite');
  orbitG.appendChild(orbitAnim);
  svg.appendChild(orbitG);

  const label = document.createElementNS(NS, 'text');
  label.setAttribute('x', cx); label.setAttribute('y', cy + 13);
  label.setAttribute('text-anchor', 'middle');
  label.setAttribute('font-size', '36'); label.setAttribute('font-weight', '800'); label.setAttribute('fill', '#fff');
  label.setAttribute('font-family', '-apple-system, Segoe UI, sans-serif');
  label.textContent = 'AI';
  svg.appendChild(label);

  // node circles + icons (on top of the connecting lines)
  nodes.forEach((n) => {
    const node = document.createElementNS(NS, 'circle');
    node.setAttribute('cx', n.x); node.setAttribute('cy', n.y); node.setAttribute('r', 34);
    node.setAttribute('fill', '#0d0d14'); node.setAttribute('stroke', 'rgba(139,124,255,.4)'); node.setAttribute('stroke-width', '1.5');
    svg.appendChild(node);

    const iconG = document.createElementNS(NS, 'g');
    iconG.setAttribute('transform', `translate(${n.x - 11},${n.y - 11})`);
    iconG.setAttribute('stroke', '#9fb4ff'); iconG.setAttribute('fill', 'none'); iconG.setAttribute('stroke-width', '1.7');
    iconG.setAttribute('stroke-linecap', 'round'); iconG.setAttribute('stroke-linejoin', 'round');
    iconG.innerHTML = n.icon;
    svg.appendChild(iconG);
  });

  // traveling shapes — small rounded BARS (not dots), each riding its connector line.
  // Left-side nodes: bars flow INTO the core. Right-side nodes: bars flow OUT of the core.
  nodes.forEach((n, i) => {
    const bar = document.createElementNS(NS, 'rect');
    bar.setAttribute('x', '-6'); bar.setAttribute('y', '-2.3');
    bar.setAttribute('width', '12'); bar.setAttribute('height', '4.6');
    bar.setAttribute('rx', '2.3');
    bar.setAttribute('fill', '#c7d6ff');
    svg.appendChild(bar);

    const isLeftSide = n.x < cx;
    const anim = document.createElementNS(NS, 'animateMotion');
    anim.setAttribute('dur', (2.4 + (i % 4) * 0.45) + 's');
    anim.setAttribute('begin', (i * 0.3) + 's');
    anim.setAttribute('repeatCount', 'indefinite');
    anim.setAttribute('rotate', 'auto');
    if (!isLeftSide){
      // reverse traversal: from the core outward to the node
      anim.setAttribute('keyPoints', '1;0');
      anim.setAttribute('keyTimes', '0;1');
      anim.setAttribute('calcMode', 'linear');
    }
    const mpath = document.createElementNS(NS, 'mpath');
    mpath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#' + n.pathId);
    anim.appendChild(mpath);
    bar.appendChild(anim);
  });
})();


/* ===================== Tech stack — rotating 3D logo globe ===================== */
(function(){
  const scene = document.getElementById('stack-globe-scene');
  const globe = document.getElementById('stack-globe');

  // "box: true" = the real logo IS a colored square (only true brand-square logos: JS, TS).
  // Everything else in the real world has NO background box — just the mark itself.
  const techs = [
    { name: 'JavaScript', box: true,  bg: '#F7DF1E', shape: 'text', text: 'JS', color: '#1a1a1a', weight: 800 },
    { name: 'TypeScript', box: true,  bg: '#3178C6', shape: 'text', text: 'TS', color: '#fff', weight: 800 },
    { name: 'Python',     box: false, shape: 'python' },
    { name: 'Go',         box: false, shape: 'text', text: 'Go', color: '#00ADD8', weight: 800, big: true },
    { name: 'React',      box: false, shape: 'react' },
    { name: 'Node.js',    box: false, shape: 'nodejs' },
    { name: 'Docker',     box: false, shape: 'docker' },
    { name: 'Redis',      box: false, shape: 'redis' },
    { name: 'GitLab',     box: false, shape: 'gitlab' },
    { name: 'Git',        box: false, shape: 'git' },
    { name: 'AWS',        box: false, shape: 'text', text: 'aws', color: '#FF9900', weight: 800 },
    { name: 'MongoDB',    box: false, shape: 'mongo' },
    { name: 'Firebase',   box: false, shape: 'firebase' },
    { name: 'Figma',      box: false, shape: 'figma' },
    { name: 'Svelte',     box: false, shape: 'svelte' },
    { name: 'Vue',        box: false, shape: 'vue' },
    { name: 'Terraform',  box: false, shape: 'terraform' },
    { name: 'Astro',      box: false, shape: 'astro' },
    { name: 'Vercel',     box: false, shape: 'vercel' },
    { name: 'ESLint',     box: false, shape: 'eslint' },
    { name: 'Kubernetes', box: false, shape: 'kubernetes' },
    { name: 'GraphQL',    box: false, shape: 'graphql' },
    { name: 'Rust',       box: false, shape: 'text', text: 'RS', color: '#DEA584', weight: 800 },
    { name: 'PHP',        box: false, shape: 'php' },
    { name: 'CSS3',       box: false, shape: 'css3' },
    { name: 'Tailwind CSS', box: false, shape: 'tailwind' },
    { name: 'HTML5',      box: false, shape: 'html5' },
    { name: 'SQL',        box: false, shape: 'database' },
  ];

  const shapes = {
    python: '<path d="M11.5 2c-3 0-2.8 1.3-2.8 1.3v1.9h2.9v.5H7.6S5 5.4 5 8.5s2.3 3 2.3 3h1.4V9.9s-.1-2.3 2.2-2.3h3.1s2.1 0 2.1-2V4.1S16.4 2 11.5 2z" fill="#3776AB"/><path d="M12.5 22c3 0 2.8-1.3 2.8-1.3v-1.9h-2.9v-.5h4V16.5s2.6-.3 2.6-3.5-2.3-3-2.3-3h-1.4v1.6s.1 2.3-2.2 2.3H10s-2.1 0-2.1 2v3.5S7.6 22 12.5 22z" fill="#FFD43B"/>',
    react: '<g fill="none" stroke="#61DAFB" stroke-width="1"><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/></g><circle cx="12" cy="12" r="1.9" fill="#61DAFB"/>',
    nodejs: '<path fill="#3C873A" d="M12 2 3 6.5v11L12 22l9-4.5v-11z"/><text x="12" y="15.5" text-anchor="middle" font-size="7" font-weight="800" fill="#fff" font-family="Arial">JS</text>',
    docker: '<path fill="#0DB7ED" d="M22 9.6s-.9-.8-2.8-.6c-.2-1.5-1.4-2.3-1.4-2.3l-.5-.3-.3.5s-.5 1-.4 2c0 .3.1.6.2.9-.4.2-1 .4-2 .4H2.4l-.1.6c-.1 1.2.1 2.6 1 3.7 1 1.2 2.4 1.8 4.3 1.8 4.1 0 7.1-1.9 8.5-5.3 1 0 2.4-.4 3.1-1.5l.3-.5-.5-.4zM4.4 10h1.7v1.7H4.4V10zm2.3 0h1.7v1.7H6.7V10zm2.3 0H10.7v1.7H9V10zm2.3 0h1.7v1.7h-1.7V10zM6.7 7.7h1.7v1.7H6.7V7.7zm2.3 0H10.7v1.7H9V7.7zm2.3 0h1.7v1.7h-1.7V7.7zm0-2.3h1.7v1.7h-1.7V5.4z"/>',
    redis: '<g fill="#DC382D"><ellipse cx="12" cy="6.2" rx="9" ry="2.6"/><path d="M3 9.3v3.3c0 1.4 4 2.6 9 2.6s9-1.2 9-2.6V9.3c0 1.4-4 2.6-9 2.6S3 10.7 3 9.3z"/><path d="M3 14v3.2c0 1.5 4 2.6 9 2.6s9-1.1 9-2.6V14c0 1.4-4 2.6-9 2.6S3 15.4 3 14z"/></g>',
    gitlab: '<path fill="#FC6D26" d="M12 21.4 15.9 9.6H8.1L12 21.4z"/><path fill="#E24329" d="M12 21.4 8.1 9.6H3.6L12 21.4z"/><path fill="#FC6D26" d="M3.6 9.6 2.4 13.3c-.1.3 0 .7.3.9L12 21.4 3.6 9.6z"/><path fill="#FCA326" d="M3.6 9.6H8.1L6.2 3.7c-.1-.3-.5-.3-.6 0L3.6 9.6z"/><path fill="#FC6D26" d="M12 21.4 15.9 9.6h4.5L12 21.4z"/><path fill="#FCA326" d="M20.4 9.6 18.4 3.7c-.1-.3-.5-.3-.6 0L15.9 9.6h4.5z"/><path fill="#FC6D26" d="M20.4 9.6 21.6 13.3c.1.3 0 .7-.3.9L12 21.4l8.4-11.8z"/>',
    git: '<g fill="none" stroke="#F05033" stroke-width="1.6"><circle cx="7" cy="17" r="2.1"/><circle cx="7" cy="7" r="2.1"/><circle cx="17" cy="12" r="2.1"/><path d="M7 9.1V14.9M9 7.5c3 .3 5.5 2 6 4.5"/></g>',
    mongo: '<path fill="#47A248" d="M12 2c-.3 1.8-.9 3-1.9 4.2C7.6 9.3 6 12.4 6.6 16c.5 3 2.5 4.9 4.5 5.6.3.1.6-.1.5-.4-.3-1.5-.4-3-.2-4.4.4-3.4 2.3-5.8 3.4-8.3.9-2 1-4-.8-6.5-.4-.5-.9-1-2-1z"/><path stroke="#fff" stroke-width=".6" fill="none" d="M12 8.3v13.4"/>',
    firebase: '<path fill="#FFA000" d="M4.8 18.5 7 2.8c.1-.6.9-.7 1.2-.1l2.4 4.5-5.8 11.3z"/><path fill="#F57C00" d="M4.8 18.5 7 15.1l3.4 3.4-.9.6c-.4.3-1 .3-1.4 0l-3.3-.6z"/><path fill="#FFCA28" d="M4.8 18.5 15 8.3l2.8 5.3c.2.3.2.6 0 .9l-4.6 8.1c-.4.7-1.4.7-1.8 0l-6.6-3.9c0-.1 0-.1 0-.2z"/>',
    figma: '<circle cx="9" cy="17.5" r="3" fill="#0ACF83"/><path fill="#A259FF" d="M6 12a3 3 0 013-3h3v6H9a3 3 0 01-3-3z"/><path fill="#F24E1E" d="M6 6a3 3 0 013-3h3v6H9a3 3 0 01-3-3z"/><path fill="#FF7262" d="M12 3h3a3 3 0 010 6h-3z"/><path fill="#1ABCFE" d="M12 9a3 3 0 116 0 3 3 0 01-6 0z"/>',
    svelte: '<path fill="#FF3E00" d="M18.6 4.3c-2-1.4-4.9-1-6.6.9L8.3 9c-1.2 1.3-1.4 3.3-.5 4.8-.6.9-.7 2.1-.2 3.1-.9 1.4-.7 3.3.6 4.4 2 1.4 4.9 1 6.6-.9l3.7-3.8c1.2-1.3 1.4-3.3.5-4.8.6-.9.7-2.1.2-3.1.9-1.4.7-3.3-.6-4.4z"/>',
    vue: '<path fill="#41B883" d="M2 3h3.7L12 14.5 18.3 3H22L12 21z"/><path fill="#35495E" d="M6 3h3.5L12 7.3 14.5 3H18l-6 10.6z"/>',
    terraform: '<g fill="#7B42BC"><path d="M8.5 3.2 13 5.8v5.2l-4.5-2.6z"/><path d="M13.5 6 18 8.6v5.2l-4.5-2.6z"/><path d="M8.5 9.5 13 12v5.2l-4.5-2.5z"/></g>',
    astro: '<path fill="#FF5D01" d="M12 2 6 20l6-3.5 6 3.5z"/><path fill="#FF5D01" opacity=".65" d="M9.3 6.5 7.7 15h2.6l.5-2.4h2.4l.5 2.4h2.6L14.7 6.5z"/>',
    vercel: '<path fill="#fff" d="M12 3 22 21H2z"/>',
    eslint: '<path fill="#4B32C3" d="M9 2 3 5.7v8.6L9 18l6-3.7V5.7z"/><path fill="#8080F2" d="M15 5.7 21 9.3v8.6L15 22l-6-3.7v-4l6 3.7 3-1.9V9.3z"/>',
    kubernetes: '<path fill="#326CE5" d="M12 2 3 6v10l9 6 9-6V6z"/><circle cx="12" cy="12" r="4.2" fill="#fff"/><path fill="#326CE5" d="M12 8.6l1.1 3.5-2.9 2.1-2.9-2.1L8.4 8.6l1.9 2.7h3.4z"/>',
    graphql: '<g fill="none" stroke="#E10098" stroke-width="1.4"><path d="M12 2 21 7.5v9L12 22 3 16.5v-9z"/></g><g fill="#E10098"><circle cx="12" cy="2.6" r="1.6"/><circle cx="20.6" cy="7.3" r="1.6"/><circle cx="20.6" cy="16.7" r="1.6"/><circle cx="12" cy="21.4" r="1.6"/><circle cx="3.4" cy="16.7" r="1.6"/><circle cx="3.4" cy="7.3" r="1.6"/></g>',
    php: '<ellipse cx="12" cy="12" rx="10.5" ry="6.2" fill="none" stroke="#8993BE" stroke-width="1.4"/><text x="12" y="15" text-anchor="middle" font-size="7.5" font-weight="800" fill="#8993BE" font-family="Arial">php</text>',
    css3: '<path fill="#1572B6" d="M4 2 5.7 21 12 22.8l6.3-1.8L20 2z"/><path fill="#33A9DC" d="M12 4v17.1l5.1-1.4L18.5 4z"/><path fill="#fff" d="M12 8.7H8.4l.2 2.3H12v2.3H6.4l.5 5 5.1 1.4v-2.4l-2.8-.8-.2-2h3v-2.3z"/>',
    tailwind: '<path fill="#38BDF8" d="M6 12c.6-2.4 2.1-3.6 4.5-3.6 3.6 0 4 2.7 5.8 3.1.6.1 1.5-.1 2.2-1.1-.6 2.4-2.1 3.6-4.5 3.6-3.6 0-4-2.7-5.8-3.1-.6-.1-1.5.1-2.2 1.1z"/><path fill="#38BDF8" d="M1 17.4c.6-2.4 2.1-3.6 4.5-3.6 3.6 0 4 2.7 5.8 3.1.6.1 1.5-.1 2.2-1.1-.6 2.4-2.1 3.6-4.5 3.6-3.6 0-4-2.7-5.8-3.1-.6-.1-1.5.1-2.2 1.1z"/>',
    html5: '<path fill="#E34F26" d="M4 2 5.7 21 12 22.8l6.3-1.8L20 2z"/><path fill="#F16529" d="M12 4v17.1l5.1-1.4L18.5 4z"/><path fill="#fff" d="M12 8.5H6.9l.2 2.3H12v2.3H7.3l.4 4.6L12 18.9v-2.5l-2-.6-.1-1.5H12z"/>',
    database: '<g fill="none" stroke="#4479A1" stroke-width="1.4"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></g>'
  };

  function buildBadgeInner(t){
    if (t.shape === 'text'){
      const fs = t.big ? 22 : (t.text.length > 3 ? 13 : 20);
      const style = `font-weight:${t.weight || 700}; font-size:${fs}px; color:${t.color}; font-family:-apple-system,Segoe UI,sans-serif; letter-spacing:.2px; white-space:nowrap;`;
      return `<span style="${style}">${t.text}</span>`;
    }
    const inner = shapes[t.shape] || '';
    return `<svg viewBox="0 0 24 24" width="100%" height="100%">${inner}</svg>`;
  }

  const N = techs.length;
  const R = 260;

  // Fibonacci-sphere base positions, then nudge each with a little organic jitter
  // so the cloud reads as scattered (like the reference) rather than a rigid lattice.
  const golden = Math.PI * (3 - Math.sqrt(5));
  let seed = 42;
  function rnd(){ seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }

  techs.forEach((t, i) => {
    const yv = 1 - (i / (N - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - yv * yv));
    const theta = golden * i;
    const xv = Math.cos(theta) * radiusAtY;
    const zv = Math.sin(theta) * radiusAtY;
    let rx = -Math.asin(yv) * 180 / Math.PI;
    let ry = Math.atan2(xv, zv) * 180 / Math.PI;

    // organic jitter — different every item, still deterministic
    rx += (rnd() - 0.5) * 26;
    ry += (rnd() - 0.5) * 26;
    const rZ = R * (0.82 + rnd() * 0.3);
    const size = t.box ? (50 + Math.round(rnd() * 16)) : (40 + Math.round(rnd() * 22));

    const el = document.createElement('div');
    el.className = 'stack-logo' + (t.box ? ' boxed' : '');
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.marginLeft = (-size / 2) + 'px';
    el.style.marginTop = (-size / 2) + 'px';
    if (t.box) el.style.background = t.bg;
    el.style.transform = `rotateY(${ry}deg) rotateX(${rx}deg) translateZ(${rZ}px)`;
    el.title = t.name;
    el.innerHTML = buildBadgeInner(t);
    globe.appendChild(el);
  });

  // continuous, regular auto-rotation (reversed direction) — spins on its own —
  // plus optional drag-to-spin for direct control
  let angle = 0;
  let dragging = false;
  let lastX = 0;
  let velocity = 0;

  function frame(){
    if (!dragging){
      angle -= 0.045 + velocity;
      velocity *= 0.94;
    }
    globe.style.transform = `rotateY(${angle}deg)`;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  scene.addEventListener('pointerdown', (e) => {
    dragging = true;
    lastX = e.clientX;
    scene.setPointerCapture(e.pointerId);
  });
  scene.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    angle += dx * 0.35;
    velocity = -dx * 0.06;
  });
  scene.addEventListener('pointerup', () => { dragging = false; });
  scene.addEventListener('pointercancel', () => { dragging = false; });
})();

/* ===================== Technology Ecosystem — PCB-style hub ===================== */
(function(){
  const wrap = document.getElementById('eco-hub');
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 900 700');
  wrap.appendChild(svg);

  const defs = document.createElementNS(NS, 'defs');
  const softGlow = document.createElementNS(NS, 'filter');
  softGlow.setAttribute('id', 'ecoSoftGlow');
  softGlow.setAttribute('x', '-80%'); softGlow.setAttribute('y', '-80%');
  softGlow.setAttribute('width', '260%'); softGlow.setAttribute('height', '260%');
  const blur = document.createElementNS(NS, 'feGaussianBlur');
  blur.setAttribute('stdDeviation', '10');
  softGlow.appendChild(blur); defs.appendChild(softGlow);
  const glowGrad = document.createElementNS(NS, 'radialGradient');
  glowGrad.setAttribute('id', 'ecoGlow');
  glowGrad.innerHTML = '<stop offset="0" stop-color="#6C5CE7" stop-opacity=".55"/><stop offset="1" stop-color="#6C5CE7" stop-opacity="0"/>';
  defs.appendChild(glowGrad);
  svg.appendChild(defs);

  const cx = 450, cy = 350;

  const glow = document.createElementNS(NS, 'circle');
  glow.setAttribute('cx', cx); glow.setAttribute('cy', cy); glow.setAttribute('r', 174);
  glow.setAttribute('fill', 'url(#ecoGlow)'); glow.setAttribute('opacity', '.72');
  svg.appendChild(glow);
  const coreHalo = document.createElementNS(NS, 'circle');
  coreHalo.setAttribute('cx', cx); coreHalo.setAttribute('cy', cy); coreHalo.setAttribute('r', 112);
  coreHalo.setAttribute('fill', 'none'); coreHalo.setAttribute('stroke', 'rgba(139,124,255,.16)');
  coreHalo.setAttribute('stroke-width', '18'); coreHalo.setAttribute('filter', 'url(#ecoSoftGlow)');
  svg.appendChild(coreHalo);

  const icons = {
    chip:     '<path d="M9 3a3 3 0 013 3v0a3 3 0 013-3 3 3 0 013 3v1a3 3 0 01-1.2 2.4A3 3 0 0118 12v0a3 3 0 01-1.2 2.4A3 3 0 0118 17v1a3 3 0 01-3 3 3 3 0 01-3-3v0a3 3 0 01-3 3 3 3 0 01-3-3v-1a3 3 0 011.2-2.4A3 3 0 016 12v0a3 3 0 011.2-2.4A3 3 0 016 7V6a3 3 0 013-3z"/>',
    link:     '<circle cx="8" cy="8" r="3"/><circle cx="16" cy="16" r="3"/><path d="M10 10l4 4"/>',
    database: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',
    cloud:    '<path d="M7 18a4 4 0 010-8 5 5 0 019.6-1.5A4.5 4.5 0 0117.5 18z"/>',
    shield:   '<path d="M12 3l7 3v6c0 4.5-3 7-7 9-4-2-7-4.5-7-9V6z"/>',
    chart:    '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    mobile:   '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 19h2"/>',
    code:     '<path d="M8 6L2 12l6 6M16 6l6 6-6 6"/>',
    branch:   '<circle cx="6" cy="6" r="2.2"/><circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="12" r="2.2"/><path d="M6 8.2V15.8M8 6.6l8 4.2M8 17.4l8-4.2"/>',
    layers:   '<path d="M4 7l8-4 8 4-8 4-8-4zM4 12l8 4 8-4M4 17l8 4 8-4"/>'
  };

  // 11 nodes total (10 outer + center) — accurate to the reference:
  // top row of 4, bottom row of 4, 2 mid-side nodes, plus the center hub.
  const TL = 90, TC = 320, TR = 580, TF = 810;   // 4 x-positions, top & bottom rows share them
  const topY = 90, botY = 610, midY = 350;
  const topBusY = 190, botBusY = 510;

  const nodes = [
    { key: 'chip',     x: TL, y: topY },
    { key: 'link',     x: TC, y: topY },
    { key: 'database', x: TR, y: topY },
    { key: 'cloud',    x: TF, y: topY },
    { key: 'shield',   x: 90, y: midY },
    { key: 'chart',    x: 810, y: midY },
    { key: 'mobile',   x: TL, y: botY },
    { key: 'code',     x: TC, y: botY },
    { key: 'branch',   x: TR, y: botY },
    { key: 'layers',   x: TF, y: botY },
  ];

  // every visible connector in the reference, each independently drawn and
  // independently able to carry its own traveling bar
  const connectors = [
    { id: 'ecoTLTC',  d: `M${TL},${topY} L${TC},${topY}` },                                    // TL -> TC direct
    { id: 'ecoTCbus', d: `M${TC},${topY} L${TC},${topBusY} L${TR},${topBusY} L${TR},${topY}` }, // TC/TR shared bus
    { id: 'ecoTCtrunk', d: `M${(TC+TR)/2},${topBusY} L${(TC+TR)/2},${cy-62} L${cx},${cy-62}` }, // bus -> center trunk
    { id: 'ecoTRTF',  d: `M${TR},${topY} L${TF},${topY}` },                                     // TR -> TF direct
    { id: 'ecoLSpine', d: `M${TL},${topY} L${TL},${botY}` },                                    // TL <-> mobile full spine
    { id: 'ecoRSpine', d: `M${TF},${topY} L${TF},${botY}` },                                    // cloud <-> layers full spine
    { id: 'ecoML',    d: `M90,${midY} L${cx-62},${midY}` },                                     // shield -> center
    { id: 'ecoMR',    d: `M810,${midY} L${cx+62},${midY}` },                                    // chart -> center
    { id: 'ecoBLBC',  d: `M${TL},${botY} L${TC},${botY}` },                                     // mobile -> code direct
    { id: 'ecoBCbus', d: `M${TC},${botY} L${TC},${botBusY} L${TR},${botBusY} L${TR},${botY}` },  // code/branch shared bus
    { id: 'ecoBCtrunk', d: `M${(TC+TR)/2},${botBusY} L${(TC+TR)/2},${cy+62} L${cx},${cy+62}` },  // bus -> center trunk
    { id: 'ecoBRBF',  d: `M${TR},${botY} L${TF},${botY}` },                                      // branch -> layers direct
  ];

  connectors.forEach((c) => {
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('id', c.id);
    path.setAttribute('d', c.d);
    path.setAttribute('stroke', 'rgba(139,124,255,.4)');
    path.setAttribute('stroke-width', '1.6');
    path.setAttribute('fill', 'none');
    svg.appendChild(path);
  });

  // small static junction dots at every bend/crossing point — matches the dense,
  // many-dash look of the reference network
  const junctions = [
    [TC, topBusY], [TR, topBusY], [(TC+TR)/2, topBusY], [(TC+TR)/2, cy-62],
    [TC, botBusY], [TR, botBusY], [(TC+TR)/2, botBusY], [(TC+TR)/2, cy+62],
    [cx-62, midY], [cx+62, midY],
    [TL + 30, topY], [TF - 30, topY], [TL + 30, botY], [TF - 30, botY]
  ];
  junctions.forEach(([jx, jy]) => {
    const dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('cx', jx); dot.setAttribute('cy', jy); dot.setAttribute('r', '3');
    dot.setAttribute('fill', '#6fa8ff');
    svg.appendChild(dot);
  });

  // two tiny separator ticks per side spine — bracketing the ML/MR crossing
  // point from above and below, not sitting exactly on it
  [TL, TF].forEach((sx) => {
    [midY - 60, midY + 60].forEach((ty) => {
      const tick = document.createElementNS(NS, 'line');
      tick.setAttribute('x1', sx); tick.setAttribute('y1', ty - 9);
      tick.setAttribute('x2', sx); tick.setAttribute('y2', ty + 9);
      tick.setAttribute('stroke', '#6fa8ff');
      tick.setAttribute('stroke-width', '2.4');
      tick.setAttribute('stroke-linecap', 'round');
      svg.appendChild(tick);
    });
  });

  // Labels sit inside compact translucent capsules, matching the reference diagram.
  function addEcoLabel(label, x, y, width){
    const group = document.createElementNS(NS, 'g');
    const bg = document.createElementNS(NS, 'rect');
    bg.setAttribute('x', x - width / 2); bg.setAttribute('y', y - 16);
    bg.setAttribute('width', width); bg.setAttribute('height', 32); bg.setAttribute('rx', 16);
    bg.setAttribute('fill', 'rgba(16,18,38,.92)'); bg.setAttribute('stroke', 'rgba(139,124,255,.24)');
    bg.setAttribute('stroke-width', '1'); group.appendChild(bg);
    const text = document.createElementNS(NS, 'text');
    text.setAttribute('x', x); text.setAttribute('y', y + 4); text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '12'); text.setAttribute('font-weight', '600'); text.setAttribute('letter-spacing', '.3');
    text.setAttribute('fill', 'rgba(220,224,255,.72)'); text.setAttribute('font-family', 'ui-monospace, SFMono-Regular, Menlo, monospace');
    text.textContent = label; group.appendChild(text); svg.appendChild(group);
  }
  addEcoLabel('Data mesh', (TC+TR)/2, topY - 8, 92);
  addEcoLabel('Edge network', (TC+TR)/2, botY + 22, 116);

  // central N node
  const centerRect = document.createElementNS(NS, 'rect');
  centerRect.setAttribute('x', cx - 62); centerRect.setAttribute('y', cy - 62);
  centerRect.setAttribute('width', 124); centerRect.setAttribute('height', 124); centerRect.setAttribute('rx', 26);
  centerRect.setAttribute('fill', 'rgba(13,13,20,.96)'); centerRect.setAttribute('stroke', 'rgba(139,124,255,.68)'); centerRect.setAttribute('stroke-width', '1.6');
  centerRect.setAttribute('filter', 'url(#ecoSoftGlow)');
  svg.appendChild(centerRect);

  const centerLabel = document.createElementNS(NS, 'text');
  centerLabel.setAttribute('x', cx); centerLabel.setAttribute('y', cy + 15);
  centerLabel.setAttribute('text-anchor', 'middle');
  centerLabel.setAttribute('font-size', '34'); centerLabel.setAttribute('font-weight', '800'); centerLabel.setAttribute('fill', '#a99bff');
  centerLabel.setAttribute('font-family', '-apple-system,Segoe UI,sans-serif');
  centerLabel.textContent = 'N';
  svg.appendChild(centerLabel);

  // 10 outer square nodes with icons
  nodes.forEach((n) => {
    const rect = document.createElementNS(NS, 'rect');
    rect.setAttribute('x', n.x - 40); rect.setAttribute('y', n.y - 40);
    rect.setAttribute('width', 80); rect.setAttribute('height', 80); rect.setAttribute('rx', 18);
    rect.setAttribute('fill', 'rgba(13,13,20,.86)'); rect.setAttribute('stroke', 'rgba(139,124,255,.42)'); rect.setAttribute('stroke-width', '1.5');
    svg.appendChild(rect);

    const iconG = document.createElementNS(NS, 'g');
    iconG.setAttribute('transform', `translate(${n.x - 12},${n.y - 12})`);
    iconG.setAttribute('stroke', '#9fb4ff'); iconG.setAttribute('fill', 'none'); iconG.setAttribute('stroke-width', '1.7');
    iconG.setAttribute('stroke-linecap', 'round'); iconG.setAttribute('stroke-linejoin', 'round');
    iconG.innerHTML = icons[n.key];
    svg.appendChild(iconG);
  });

  // traveling bars — same looping principle as the AI Core hub, one per connector,
  // each riding its own line and looping continuously
  connectors.forEach((c, i) => {
    const bar = document.createElementNS(NS, 'rect');
    bar.setAttribute('x', '-6'); bar.setAttribute('y', '-2.3');
    bar.setAttribute('width', '12'); bar.setAttribute('height', '4.6');
    bar.setAttribute('rx', '2.3');
    bar.setAttribute('fill', '#c7d6ff');
    svg.appendChild(bar);

    const anim = document.createElementNS(NS, 'animateMotion');
    anim.setAttribute('dur', (2.6 + (i % 4) * 0.4) + 's');
    anim.setAttribute('begin', (i * 0.3) + 's');
    anim.setAttribute('repeatCount', 'indefinite');
    anim.setAttribute('rotate', 'auto');
    const mpath = document.createElementNS(NS, 'mpath');
    mpath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#' + c.id);
    anim.appendChild(mpath);
    bar.appendChild(anim);
  });
})();

/* ===================== Partner logos ===================== */
(function(){
  const grid = document.getElementById('partners-grid');
  const partners = [
    { name: 'Slack', svg: '<g><rect x="2" y="9" width="6" height="6" rx="3" fill="#36C5F0"/><rect x="9" y="2" width="6" height="6" rx="3" fill="#2EB67D"/><rect x="16" y="9" width="6" height="6" rx="3" fill="#ECB22E"/><rect x="9" y="16" width="6" height="6" rx="3" fill="#E01E5A"/></g>' },
    { name: 'Zapier', svg: '<g fill="#FF4A00"><circle cx="12" cy="12" r="2.6"/><rect x="10.7" y="2" width="2.6" height="7" rx="1.3"/><rect x="10.7" y="15" width="2.6" height="7" rx="1.3"/><rect x="2" y="10.7" width="7" height="2.6" rx="1.3"/><rect x="15" y="10.7" width="7" height="2.6" rx="1.3"/></g>' },
    { name: 'Figma', svg: '<circle cx="9" cy="17.5" r="3" fill="#0ACF83"/><path fill="#A259FF" d="M6 12a3 3 0 013-3h3v6H9a3 3 0 01-3-3z"/><path fill="#F24E1E" d="M6 6a3 3 0 013-3h3v6H9a3 3 0 01-3-3z"/><path fill="#FF7262" d="M12 3h3a3 3 0 010 6h-3z"/><path fill="#1ABCFE" d="M12 9a3 3 0 116 0 3 3 0 01-6 0z"/>' },
    { name: 'Stripe', text: 'stripe', color: '#635BFF' },
    { name: 'Google Cloud', svg: '<path fill="#4285F4" d="M15 8.5a5.5 5.5 0 00-5.3 4H9a4 4 0 000 8h6.5a4.5 4.5 0 001-8.9A5.5 5.5 0 0015 8.5z"/>' },
    { name: 'Salesforce', svg: '<path fill="#00A1E0" d="M9.5 8a3.6 3.6 0 013.3 2.1 2.8 2.8 0 011.2-.3 2.9 2.9 0 012.8 2.9c0 .2 0 .4-.1.6A2.6 2.6 0 0119 18H7a3 3 0 01-.4-6 3.5 3.5 0 012.9-4z"/>' },
  ];
  grid.innerHTML = partners.map(p => `
    <div class="partner-card">
      ${p.svg ? `<svg viewBox="0 0 24 24">${p.svg}</svg>` : `<span style="font-family:Georgia,serif;font-style:italic;font-weight:700;font-size:19px;color:${p.color};">${p.text}</span>`}
      <span>${p.name}</span>
    </div>
  `).join('');
})();

/* ===================== Comparison table ===================== */
(function(){
  const rows = [
    { label: 'Unified AI Core', trad: 'No' },
    { label: 'Real-time Orchestration', trad: 'Partial' },
    { label: 'Built-in Security', trad: 'Partial' },
    { label: 'Scalable by Design', trad: 'Limited' },
    { label: 'Lower TCO', trad: 'No' },
  ];
  const table = document.getElementById('compare-table');
  let html = `
    <div class="cmp-cell cmp-label cmp-head"></div>
    <div class="cmp-cell cmp-nexora cmp-nexora-head first">
      <span class="logo-mark">N</span><strong>NEXORA</strong>
    </div>
    <div class="cmp-cell cmp-trad cmp-head">Traditional Systems</div>
  `;
  rows.forEach((r, i) => {
    const isLast = i === rows.length - 1;
    html += `
      <div class="cmp-cell cmp-label">${r.label}</div>
      <div class="cmp-cell cmp-nexora${isLast ? ' last' : ''}">Yes</div>
      <div class="cmp-cell cmp-trad">${r.trad}</div>
    `;
  });
  table.innerHTML = html;
})();

/* ===================== Footer: social icons + link columns ===================== */
(function(){
  const social = document.getElementById('footer-social');
  const icons = [
    '<path d="M9 6a3 3 0 016 0v8a3 3 0 01-6 0zM3 12a9 9 0 0018 0"/>',
    '<path d="M22 5.9c-.7.3-1.5.6-2.3.7a4 4 0 001.7-2.2 8 8 0 01-2.5 1 4 4 0 00-6.9 3.6A11.4 11.4 0 013 4.9a4 4 0 001.2 5.3 4 4 0 01-1.8-.5v.1a4 4 0 003.2 3.9 4 4 0 01-1.8.1 4 4 0 003.7 2.8A8 8 0 012 18.4a11.3 11.3 0 006.1 1.8c7.3 0 11.3-6.1 11.3-11.3v-.5c.8-.6 1.4-1.3 1.9-2.1z"/>',
    '<path d="M4 4h4v16H4zM6 4a2 2 0 110 4 2 2 0 010-4zM11 10h3.8v1.7c.6-1 1.8-2 3.6-2 3.8 0 4.6 2.4 4.6 5.6V20h-4v-4.2c0-1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3V20H11z"/>',
    '<path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z"/>'
  ];
  social.innerHTML = icons.map(d => `<a href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${d}</svg></a>`).join('');

  const cols = [
    { title: 'Platform', links: ['AI Systems', 'Automation', 'Data Analysis', 'Software', 'Design'] },
    { title: 'Solutions', links: ['Connect', 'Flow', 'Vision', 'Predict', 'Secure', 'Cloud'] },
    { title: 'Products', links: ['Studio', 'Analytics', 'Retail', 'Atlas'] },
    { title: 'Resources', links: ['Documentation', 'Blog', 'Learn', 'Changelog', 'Status'] },
    { title: 'Company', links: ['About', 'Careers', 'Contact', 'Partners'] },
  ];
  const colsEl = document.getElementById('footer-cols');
  colsEl.innerHTML = cols.map(c => `
    <div class="footer-col">
      <h5>${c.title}</h5>
      <ul>${c.links.map(l => `<li><a href="#">${l}</a></li>`).join('')}</ul>
    </div>
  `).join('');
})();

(function(){
  const holder = document.getElementById('robot-canvas-wrap');
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(38, holder.clientWidth/holder.clientHeight, 0.1, 100);
  camera.position.set(0, 0.5, 5.2);
  camera.lookAt(0, 0.25, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(holder.clientWidth, holder.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  holder.appendChild(renderer.domElement);

  // ---------- Lighting ----------
  const ambient = new THREE.AmbientLight(0x30343d, 1.1);
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0xffffff, 1.15);
  key.position.set(2.2, 4, 3.5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0x6fe3ff, 1.4);
  rim.position.set(-3, 2.5, -3.5);
  scene.add(rim);

  const fill = new THREE.PointLight(0x8fa5ff, 0.5, 12);
  fill.position.set(-1.5, -1, 2.5);
  scene.add(fill);

  const eyeGlow = new THREE.PointLight(0xbdf1ff, 1.1, 4);
  eyeGlow.position.set(0, 1.55, 0.9);
  scene.add(eyeGlow);

  // ---------- Materials ----------
  const matDark = new THREE.MeshStandardMaterial({ color: 0x0d0e12, metalness: 0.75, roughness: 0.32 });
  const matGray = new THREE.MeshStandardMaterial({ color: 0x3d4149, metalness: 0.6, roughness: 0.38 });
  const matGrayLight = new THREE.MeshStandardMaterial({ color: 0x585d66, metalness: 0.5, roughness: 0.3 });
  const matJoint = new THREE.MeshStandardMaterial({ color: 0x1a1c21, metalness: 0.8, roughness: 0.25 });
  const matAccent = new THREE.MeshStandardMaterial({ color: 0x14161b, metalness: 0.85, roughness: 0.2, emissive: 0x1c3540, emissiveIntensity: 0.25 });
  const matEye = new THREE.MeshStandardMaterial({
    color: 0xeaf7ff, transparent: true, opacity: 0.88,
    emissive: 0x9fe8ff, emissiveIntensity: 1.5, roughness: 0.15, metalness: 0.0
  });
  const matChrome = new THREE.MeshStandardMaterial({ color: 0xdde2e8, metalness: 0.95, roughness: 0.16 });

  function makeWeaveTexture(){
    const size = 128;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#141519';
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= size; i += 7){
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, size); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(size, i); ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(5, 5);
    return tex;
  }
  const weaveTex = makeWeaveTexture();
  const matShoulderPad = new THREE.MeshStandardMaterial({ color: 0x1c1e23, map: weaveTex, metalness: 0.4, roughness: 0.55 });
  const matLimb = new THREE.MeshStandardMaterial({ color: 0x111318, map: weaveTex, metalness: 0.55, roughness: 0.4 });
  const matElbow = new THREE.MeshStandardMaterial({ color: 0x4b4f57, metalness: 0.75, roughness: 0.28 });

  function smooth(mesh){ mesh.castShadow = true; mesh.receiveShadow = true; return mesh; }

  // ---------- Rounded-box helper (soft, streamlined "square-ish" shapes) ----------
  function roundedRectShape(w, h, r){
    const shape = new THREE.Shape();
    const x = -w/2, y = -h/2;
    shape.moveTo(x, y + r);
    shape.lineTo(x, y + h - r);
    shape.quadraticCurveTo(x, y + h, x + r, y + h);
    shape.lineTo(x + w - r, y + h);
    shape.quadraticCurveTo(x + w, y + h, x + w, y + h - r);
    shape.lineTo(x + w, y + r);
    shape.quadraticCurveTo(x + w, y, x + w - r, y);
    shape.lineTo(x + r, y);
    shape.quadraticCurveTo(x, y, x, y + r);
    return shape;
  }
  function makeRoundedBox(w, h, depth, radius, bevel){
    const shape = roundedRectShape(w, h, radius);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: Math.max(depth - bevel*2, 0.01),
      bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel,
      bevelSegments: 6, curveSegments: 10
    });
    geo.center();
    return geo;
  }

  // ---------- Root ----------
  const robot = new THREE.Group();
  scene.add(robot);
  const baseY = 0.05;
  robot.position.y = baseY;
  robot.visible = false;
  robot.scale.set(3.0, 3.0, 3.0);

  // entrance state must exist BEFORE animate() runs (its first call executes synchronously)
  const entranceClock = { started: false, t0: 0 };

  // ---------- Torso: smooth tapered silhouette — not boxy, not round ----------
  const torsoProfile = [
    new THREE.Vector2(0.22, -0.62),
    new THREE.Vector2(0.235, -0.48),
    new THREE.Vector2(0.27, -0.3),
    new THREE.Vector2(0.335, -0.1),
    new THREE.Vector2(0.39, 0.1),
    new THREE.Vector2(0.415, 0.27),
    new THREE.Vector2(0.39, 0.37),
    new THREE.Vector2(0.31, 0.44),
    new THREE.Vector2(0.24, 0.47)
  ];
  const torsoGeo = new THREE.LatheGeometry(torsoProfile, 40);
  torsoGeo.computeVertexNormals();
  const torso = new THREE.Mesh(torsoGeo, matDark);
  smooth(torso);
  robot.add(torso);

  // thin textured collar strip at the very top of the torso (only textured area on the chest)
  const collarStrip = new THREE.Mesh(new THREE.CylinderGeometry(0.245, 0.235, 0.05, 32, 1, true), matShoulderPad);
  collarStrip.position.set(0, 0.44, 0);
  robot.add(collarStrip);

  // shoulder pauldrons — big, elongated, textured pads like the reference
  const shoulderCapL = new THREE.Mesh(new THREE.SphereGeometry(0.19, 22, 18), matShoulderPad);
  shoulderCapL.scale.set(1.5, 1.05, 1.15);
  shoulderCapL.rotation.z = 0.25;
  shoulderCapL.position.set(-0.56, 0.28, 0.02);
  smooth(shoulderCapL);
  robot.add(shoulderCapL);
  const shoulderCapR = shoulderCapL.clone();
  shoulderCapR.rotation.z = -0.25;
  shoulderCapR.position.x = 0.56;
  robot.add(shoulderCapR);

  // ---------- Hip: small core + two curved exposed pipes with a bellows joint, like the reference ----------
  const hipCore = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.1, 20), matDark);
  hipCore.position.set(0, -0.65, 0);
  smooth(hipCore);
  robot.add(hipCore);

  function buildHipLeg(sign){
    // first pipe segment — curves outward from the hip core
    const pivot1 = new THREE.Group();
    pivot1.position.set(sign * 0.1, -0.66, 0);
    pivot1.rotation.z = sign * 0.95;
    robot.add(pivot1);

    const pipe1 = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.052, 0.17, 16), matDark);
    pipe1.position.set(0, -0.085, 0);
    smooth(pipe1);
    pivot1.add(pipe1);

    const bendJoint = new THREE.Mesh(new THREE.SphereGeometry(0.052, 14, 12), matDark);
    bendJoint.position.set(0, -0.17, 0);
    pivot1.add(bendJoint);

    // second pipe segment — curves back down toward vertical
    const pivot2 = new THREE.Group();
    pivot2.position.set(0, -0.17, 0);
    pivot2.rotation.z = sign * -0.55;
    pivot1.add(pivot2);

    const pipe2 = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.046, 0.15, 16), matDark);
    pipe2.position.set(0, -0.075, 0);
    smooth(pipe2);
    pivot2.add(pipe2);

    // bellows / accordion joint — stacked rings, like the reference
    const bellows = new THREE.Group();
    bellows.position.set(0, -0.15, 0);
    pivot2.add(bellows);
    const ringCount = 5;
    for (let i = 0; i < ringCount; i++){
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.013, 10, 20), matElbow);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(0, -0.017 * i, 0);
      bellows.add(ring);
    }
    const bellowsBottom = -0.017 * (ringCount - 1) - 0.02;

    // thigh / lower leg, continuing straight down from the bellows joint
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.06, 0.42, 16), matDark);
    leg.position.set(0, bellowsBottom - 0.21, 0);
    smooth(leg);
    bellows.add(leg);

    const ankle = new THREE.Mesh(new THREE.SphereGeometry(0.068, 14, 12), matJoint);
    ankle.position.set(0, bellowsBottom - 0.43, 0);
    bellows.add(ankle);

    const foot = new THREE.Mesh(makeRoundedBox(0.2, 0.09, 0.32, 0.05, 0.02), matGray);
    foot.position.set(0, bellowsBottom - 0.48, 0.06);
    smooth(foot);
    bellows.add(foot);
  }
  buildHipLeg(-1);
  buildHipLeg(1);

  // thin glow pad beneath the feet — light sci-fi hover touch, no bulky base
  const padGlowMat = new THREE.MeshBasicMaterial({ color: 0x9fe8ff, transparent: true, opacity: 0.18 });
  const feetPad = new THREE.Mesh(new THREE.CircleGeometry(0.4, 32), padGlowMat);
  feetPad.rotation.x = -Math.PI/2;
  feetPad.position.set(0, -1.55, 0);
  robot.add(feetPad);

  // ---------- Neck (STATIC — does not rotate) — short, mostly hidden behind the shoulders ----------
  const neckPost = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.14, 20), matJoint);
  neckPost.position.set(0, 0.48, 0);
  smooth(neckPost);
  robot.add(neckPost);

  const neckCollar = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.03, 14, 28), matChrome);
  neckCollar.rotation.x = Math.PI / 2;
  neckCollar.position.set(0, 0.4, 0);
  robot.add(neckCollar);

  // ---------- Head (rotating group — the head itself turns, not the neck) ----------
  const headPivot = new THREE.Group();
  headPivot.position.set(0, 0.92, 0);
  robot.add(headPivot);

  // smooth chrome egg-shaped head, rounded crown tapering to a ROUNDED chin (not pointed)
  const headProfile = [
    new THREE.Vector2(0.045, -0.38),
    new THREE.Vector2(0.1, -0.34),
    new THREE.Vector2(0.16, -0.26),
    new THREE.Vector2(0.205, -0.14),
    new THREE.Vector2(0.235, 0.0),
    new THREE.Vector2(0.235, 0.14),
    new THREE.Vector2(0.205, 0.27),
    new THREE.Vector2(0.14, 0.37),
    new THREE.Vector2(0.06, 0.43),
    new THREE.Vector2(0.0, 0.46)
  ];
  const headGeo = new THREE.LatheGeometry(headProfile, 40);
  headGeo.computeVertexNormals();
  const head = new THREE.Mesh(headGeo, matChrome);
  smooth(head);
  headPivot.add(head);

  // large dark reflective face panel covering the upper-to-mid face, like the reference
  const face = new THREE.Mesh(new THREE.SphereGeometry(0.238, 28, 22, -Math.PI * 0.34, Math.PI * 0.68, Math.PI * 0.16, Math.PI * 0.44), matJoint);
  face.position.set(0, 0.05, 0.005);
  headPivot.add(face);

  // dot-matrix eyes — small glowing grid, close together near the centerline, below the dark panel
  function buildEye(sign){
    const grp = new THREE.Group();
    grp.position.set(sign * 0.062, -0.05, 0.228);
    grp.rotation.y = sign * 0.35;
    const cols = 5, rows = 4, spacing = 0.015;
    for (let r = 0; r < rows; r++){
      for (let cIdx = 0; cIdx < cols; cIdx++){
        const dot = new THREE.Mesh(new THREE.SphereGeometry(0.0055, 6, 6), matEye);
        dot.position.set((cIdx - (cols - 1) / 2) * spacing, (r - (rows - 1) / 2) * spacing, 0);
        grp.add(dot);
      }
    }
    return grp;
  }
  const eyeL = buildEye(-1);
  headPivot.add(eyeL);
  const eyeR = buildEye(1);
  headPivot.add(eyeR);

  // inner glow layer behind the eyes for extra depth
  const glowGeo = new THREE.PlaneGeometry(0.085, 0.08);
  const glowMat = new THREE.MeshBasicMaterial({ color: 0x9fe8ff, transparent: true, opacity: 0.22 });
  const glowL = new THREE.Mesh(glowGeo, glowMat);
  glowL.position.set(-0.062, -0.05, 0.2);
  glowL.rotation.y = -0.35;
  headPivot.add(glowL);
  const glowR = glowL.clone();
  glowR.position.x = 0.062;
  glowR.rotation.y = 0.35;
  headPivot.add(glowR);


  // ---------- Hand: closed fist with clearly defined, curled fingers ----------
  function buildFinger(length, radius, curl){
    const grp = new THREE.Group();
    const base = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * 0.85, length * 0.55, 8), matDark);
    base.position.y = -length * 0.275;
    smooth(base);
    grp.add(base);

    const knuckle = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.88, 8, 8), matJoint);
    knuckle.position.y = -length * 0.55;
    grp.add(knuckle);

    const tipGrp = new THREE.Group();
    tipGrp.position.y = -length * 0.55;
    tipGrp.rotation.x = curl;
    const tip = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.8, radius * 0.55, length * 0.45, 8), matDark);
    tip.position.y = -length * 0.225;
    smooth(tip);
    tipGrp.add(tip);
    const tipEnd = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.55, 8, 8), matDark);
    tipEnd.position.y = -length * 0.45;
    tipGrp.add(tipEnd);
    grp.add(tipGrp);

    return grp;
  }

  function buildHand(sign){
    const handGroup = new THREE.Group();

    const palm = new THREE.Mesh(makeRoundedBox(0.155, 0.135, 0.1, 0.045, 0.015), matDark);
    smooth(palm);
    handGroup.add(palm);

    // silver-grey panel on the back of the hand, distinct from the dark palm
    const backPanel = new THREE.Mesh(makeRoundedBox(0.1, 0.1, 0.02, 0.03, 0.008), matElbow);
    backPanel.position.set(0, 0.0, -0.045);
    handGroup.add(backPanel);

    const wristCap = new THREE.Mesh(new THREE.SphereGeometry(0.078, 12, 10), matDark);
    wristCap.position.y = 0.065;
    handGroup.add(wristCap);
    const cuff1 = new THREE.Mesh(new THREE.TorusGeometry(0.078, 0.012, 8, 18), matElbow);
    cuff1.rotation.x = Math.PI / 2;
    cuff1.position.y = 0.09;
    handGroup.add(cuff1);

    // four fingers, relaxed natural half-curl (not a tight fist)
    const fingerXs = [-0.05, -0.017, 0.017, 0.05];
    const fingerLens = [0.135, 0.15, 0.145, 0.115];
    for (let i = 0; i < 4; i++){
      const finger = buildFinger(fingerLens[i], 0.02, 0.85);
      finger.position.set(fingerXs[i], -0.05, 0.025);
      finger.rotation.x = 0.32;
      finger.rotation.z = (i - 1.5) * 0.04;
      handGroup.add(finger);
    }

    // thumb, relaxed and slightly curled to the side
    const thumb = buildFinger(0.1, 0.022, 0.7);
    thumb.position.set(-sign * 0.07, -0.015, 0.05);
    thumb.rotation.z = sign * 0.75;
    thumb.rotation.x = 0.3;
    thumb.rotation.y = -sign * 0.35;
    handGroup.add(thumb);

    return handGroup;
  }

  // ---------- Rib rings helper — repeated horizontal ridges along a limb, like the reference ----------
  function addRibs(parent, radius, yTop, length, count, material){
    for (let i = 0; i < count; i++){
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, radius * 0.16, 8, 18), material);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = yTop - (length / count) * (i + 0.5);
      parent.add(ring);
    }
  }

  // ---------- Arms ----------
  function buildArm(sign){
    const shoulder = new THREE.Group();
    shoulder.position.set(sign * 0.56, 0.3, 0);
    robot.add(shoulder);

    // small connector joint linking the shoulder pad to the arm
    const joint = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.09, 14), matElbow);
    joint.rotation.z = Math.PI / 2;
    smooth(joint);
    shoulder.add(joint);

    const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.08, 0.5, 18), matLimb);
    upperArm.position.set(0, -0.28, 0);
    smooth(upperArm);
    shoulder.add(upperArm);
    addRibs(shoulder, 0.093, -0.05, 0.46, 5, matLimb);

    const elbowJoint = new THREE.Mesh(new THREE.SphereGeometry(0.105, 16, 14), matElbow);
    elbowJoint.position.set(0, -0.52, 0);
    shoulder.add(elbowJoint);

    const forearmPivot = new THREE.Group();
    forearmPivot.position.set(0, -0.52, 0);
    shoulder.add(forearmPivot);

    const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.07, 0.48, 18), matLimb);
    forearm.position.set(0, -0.25, 0);
    smooth(forearm);
    forearmPivot.add(forearm);
    addRibs(forearmPivot, 0.083, -0.03, 0.42, 5, matLimb);

    const wristBand = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.017, 10, 20), matAccent);
    wristBand.rotation.x = Math.PI/2;
    wristBand.position.set(0, -0.46, 0);
    forearmPivot.add(wristBand);

    const hand = buildHand(sign);
    hand.position.set(0, -0.5, 0);
    forearmPivot.add(hand);

    // rest pose
    shoulder.rotation.z = sign * -0.22;
    shoulder.rotation.x = -0.12;
    forearmPivot.rotation.x = -0.28;

    return { shoulder, forearmPivot };
  }

  const armL = buildArm(-1);
  const armR = buildArm(1);

  // ---------- Ground glow (soft, no hard shadow needed) ----------
  function makeGlowTexture(){
    const size = 256;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    g.addColorStop(0, 'rgba(120,200,255,0.35)');
    g.addColorStop(0.5, 'rgba(80,140,200,0.12)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }
  const glowFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(4.2, 4.2),
    new THREE.MeshBasicMaterial({ map: makeGlowTexture(), transparent: true, depthWrite: false })
  );
  glowFloor.rotation.x = -Math.PI/2;
  glowFloor.position.y = -2.15;
  scene.add(glowFloor);

  const shadowCatcher = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.ShadowMaterial({ opacity: 0.25 })
  );
  shadowCatcher.rotation.x = -Math.PI/2;
  shadowCatcher.position.y = -2.14;
  shadowCatcher.receiveShadow = true;
  scene.add(shadowCatcher);

  // ---------- Mouse tracking (only while the cursor is over the robot's own box) ----------
  let mouseX = 0, mouseY = 0;       // raw normalized target
  let curMX = 0, curMY = 0;         // smoothed values used every frame

  function isInsideHolder(clientX, clientY){
    const r = holder.getBoundingClientRect();
    return clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom;
  }

  window.addEventListener('mousemove', (e) => {
    if (!isInsideHolder(e.clientX, e.clientY)){
      mouseX = 0; mouseY = 0; // outside the box: ease back to a neutral resting look
      return;
    }
    const r = holder.getBoundingClientRect();
    mouseX = (((e.clientX - r.left) / r.width) * 2 - 1);
    mouseY = -(((e.clientY - r.top) / r.height) * 2 - 1); // up = positive
  });
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const t = e.touches[0];
      if (!isInsideHolder(t.clientX, t.clientY)){
        mouseX = 0; mouseY = 0;
        return;
      }
      const r = holder.getBoundingClientRect();
      mouseX = (((t.clientX - r.left) / r.width) * 2 - 1);
      mouseY = -(((t.clientY - r.top) / r.height) * 2 - 1);
    }
  }, { passive: true });

  // ---------- Animation constants ----------
  const HEAD_MAX_YAW = THREE.MathUtils.degToRad(90);   // total swing = 180°
  const HEAD_MAX_PITCH = THREE.MathUtils.degToRad(28);
  const HEAD_MAX_ROLL = THREE.MathUtils.degToRad(10);

  const ARM_MAX_LIFT = THREE.MathUtils.degToRad(120);  // forward+up raise on mouse-up
  const ARM_MAX_SWAY = THREE.MathUtils.degToRad(28);
  const ARM_REST_X = -0.12;
  const ARM_REST_Z = 0.22;

  const clock = new THREE.Clock();
  const smoothFactor = 0.09;

  function animate(){
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (entranceClock.started){
      const et = Math.min((t - entranceClock.t0) / 1.35, 1);
      const eased = 1 - Math.pow(1 - et, 4); // easeOutQuart — quick pop, gentle settle
      const s = 3.0 + (1.35 - 3.0) * eased;
      robot.scale.set(s, s, s);
    }

    // smooth the raw mouse input
    curMX = THREE.MathUtils.lerp(curMX, mouseX, 0.08);
    curMY = THREE.MathUtils.lerp(curMY, mouseY, 0.08);

    // idle floating body motion (continuous, always alive)
    robot.position.y = baseY + Math.sin(t * 1.1) * 0.05;
    robot.rotation.y = Math.sin(t * 0.35) * 0.045;
    feetPad.material.opacity = 0.12 + Math.abs(Math.sin(t * 1.1)) * 0.1;

    // ---- Head: rotates up to 180° total (±90°) following the mouse, neck stays fixed ----
    const targetYaw = curMX * HEAD_MAX_YAW;
    const targetPitch = curMY * HEAD_MAX_PITCH;
    const targetRoll = -curMX * HEAD_MAX_ROLL;

    headPivot.rotation.y = THREE.MathUtils.lerp(headPivot.rotation.y, targetYaw, smoothFactor + 0.05);
    headPivot.rotation.x = THREE.MathUtils.lerp(headPivot.rotation.x, -targetPitch, smoothFactor + 0.05);
    headPivot.rotation.z = THREE.MathUtils.lerp(headPivot.rotation.z, targetRoll, smoothFactor + 0.05);

    // eyes / antenna gentle pulse — always-on life signal
    const pulse = 1.2 + Math.sin(t * 2.2) * 0.35;
    matEye.emissiveIntensity = pulse;

    // ---- Arms: continuous idle swing + follow mouse (up = raise forward) ----
    const liftAmount = Math.max(0, curMY);          // only lifts on upward mouse movement
    const dropAmount = Math.max(0, -curMY) * 0.3;    // slight extra drop when mouse goes down

    [ {arm: armL, sign: -1, phase: 0}, {arm: armR, sign: 1, phase: Math.PI} ].forEach(({arm, sign, phase}) => {
      const idleSwing = Math.sin(t * 1.1 + phase) * 0.34;      // steady, clearly-visible up/down motion
      const idleElbow = Math.sin(t * 1.1 + phase) * 0.22 + 0.14;

      const targetShoulderX = ARM_REST_X - liftAmount * ARM_MAX_LIFT + dropAmount * 0.5 + idleSwing;
      const targetShoulderZ = sign * (ARM_REST_Z - Math.abs(curMX) * 0.05) + curMX * ARM_MAX_SWAY * 0.5;
      const targetElbow = -0.28 - liftAmount * 0.6 - idleElbow;

      arm.shoulder.rotation.x = THREE.MathUtils.lerp(arm.shoulder.rotation.x, targetShoulderX, smoothFactor + 0.06);
      arm.shoulder.rotation.z = THREE.MathUtils.lerp(arm.shoulder.rotation.z, targetShoulderZ, smoothFactor + 0.06);
      arm.forearmPivot.rotation.x = THREE.MathUtils.lerp(arm.forearmPivot.rotation.x, targetElbow, smoothFactor + 0.06);
    });

    renderer.render(scene, camera);
  }
  animate();

  // ---------- Resize (track the container, not the window) ----------
  function handleResize(){
    const w = holder.clientWidth || 1, h = holder.clientHeight || 1;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', handleResize);
  if (window.ResizeObserver){
    new ResizeObserver(handleResize).observe(holder);
  }

  // ---------- Entrance: hidden at first, then pops in close & settles back to center ----------
  function startEntrance(){
    if (entranceClock.started) return;
    entranceClock.started = true;
    entranceClock.t0 = clock.getElapsedTime();
    robot.visible = true;
    handleResize();
  }
  // fire shortly after load so it's guaranteed to play even if the section
  // is already in view when the page finishes loading
  setTimeout(startEntrance, 350);
  // also arm it the moment the section is scrolled into view, in case it starts off-screen
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) startEntrance(); });
  }, { threshold: 0.15 });
  io.observe(holder);
})();
