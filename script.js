/* ============================================================
   Praatishthaa Goyal — portfolio
   Vanilla JS, no build step. Edit CONFIG + DATA to update content.
   ============================================================ */
(() => {
'use strict';

/* ---------- CONFIG / DATA ---------- */
const CONFIG = {
  email: 'praatishthaagoyal126@gmail.com',
  github: 'https://github.com/praatishthaa',
  resume: 'Praatishthaa_Goyal_Resume.pdf',
};

const SKILLS = [
  ['Python','lang'],['C++','lang'],['Java','lang'],['C','lang'],['JavaScript','lang'],['SQL','lang'],
  ['React.js','web'],['Node.js','web'],['Express.js','web'],['Tailwind CSS','web'],['HTML','web'],['CSS','web'],['Bootstrap','web'],['REST APIs','web'],
  ['Pandas','ml'],['NumPy','ml'],['Scikit-learn','ml'],['K-Means','ml'],['Data Analysis','ml'],
  ['Data Structures & Algorithms','core'],['OOP','core'],['DBMS','core'],['Computer Networks','core'],
  ['Git & GitHub','tools'],['VS Code','tools'],['Postman','tools'],['Firebase','tools'],['Vercel','tools'],['Figma','tools'],['Canva','tools'],['Google Fit API','tools'],
];
const CAT = {lang:'language',web:'web',ml:'data & ml',core:'core cs',tools:'tools'};

const ACCENTS = [
  {n:'aqua',  a:'#5eead4', rgb:'94,234,212',  la:'#0d9488', lrgb:'13,148,136'},
  {n:'coral', a:'#ff7a90', rgb:'255,122,144', la:'#e11d48', lrgb:'225,29,72'},
  {n:'violet',a:'#a78bfa', rgb:'167,139,250', la:'#7c3aed', lrgb:'124,58,237'},
  {n:'lime',  a:'#bef264', rgb:'190,242,100', la:'#4d7c0f', lrgb:'77,124,15'},
  {n:'amber', a:'#fbbf24', rgb:'251,191,36',  la:'#b45309', lrgb:'180,83,9'},
];

/* ---------- helpers ---------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;
const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
const store = {
  get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } },
  set(k,v){ try{ localStorage.setItem(k,v); }catch(e){} },
};
const inView = new Map(); // element -> visible bool
const visObs = new IntersectionObserver(es => es.forEach(e => inView.set(e.target, e.isIntersecting)), {threshold: 0.05});
const watchVisible = el => { inView.set(el, false); visObs.observe(el); };
const isVisible = el => inView.get(el);

let toastT;
function toast(msg){
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ---------- theme & accent ---------- */
let colors = {a:'94,234,212', b:'255,122,144', c:'167,139,250', tx:'232,238,247'};
function readColors(){
  const cs = getComputedStyle(document.documentElement);
  colors = {
    a: cs.getPropertyValue('--a-rgb').trim(), b: cs.getPropertyValue('--b-rgb').trim(),
    c: cs.getPropertyValue('--c-rgb').trim(), tx: cs.getPropertyValue('--tx-rgb').trim(),
  };
}
let accentIdx = 0;
function applyAccent(i){
  accentIdx = (i + ACCENTS.length) % ACCENTS.length;
  const ac = ACCENTS[accentIdx], light = document.documentElement.dataset.theme === 'light';
  const r = document.documentElement.style;
  r.setProperty('--a', light ? ac.la : ac.a);
  r.setProperty('--a-rgb', light ? ac.lrgb : ac.rgb);
  store.set('pg-accent', String(accentIdx));
  readColors();
  return ac.n;
}
function setTheme(t){
  document.documentElement.dataset.theme = t;
  $('#themeBtn').textContent = t === 'light' ? '☀' : '☾';
  $('meta[name=theme-color]').content = t === 'light' ? '#f4f7fb' : '#060a12';
  store.set('pg-theme', t);
  applyAccent(accentIdx);
}
function toggleTheme(){ setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'); }
{
  const st = store.get('pg-theme');
  const pref = st || 'dark'; // dark-first design; visitors can toggle and it is remembered
  accentIdx = parseInt(store.get('pg-accent') || '0', 10) || 0;
  setTheme(pref);
}
$('#themeBtn').addEventListener('click', toggleTheme);
$('#accentBtn').addEventListener('click', () => toast('accent: ' + applyAccent(accentIdx + 1)));

/* keyboard hint text */
$('#kbdKey').textContent = isMac ? '⌘' : 'Ctrl';
$('#kbdKey2').textContent = isMac ? '⌘' : 'Ctrl';
$('#yr').textContent = new Date().getFullYear();

/* ---------- boot loader ---------- */
const BOOT = [
  ['> initialising portfolio.exe', 0],
  ['> loading modules ............ [ok]', 1],
  ['> k-means centroids ......... [ok]', 1],
  ['> sentinel shields .......... [armed]', 1],
  ['> coral reef sensors ........ [ok]', 1],
  ['> welcome, human.', 2],
];
let loaderDone = false;
function runLoader(){
  const el = $('#boot'), loader = $('#loader');
  const finish = () => {
    if (loaderDone) return; loaderDone = true;
    loader.classList.add('done'); document.body.classList.add('ready');
    revealHero();
  };
  loader.addEventListener('click', finish);
  if (reduceMotion || /[?&]skipboot/.test(location.search)) { finish(); return; }
  let i = 0, out = '';
  const next = () => {
    if (loaderDone) return;
    if (i >= BOOT.length) { setTimeout(finish, 350); return; }
    out += BOOT[i][0] + '\n'; el.textContent = out; i++;
    setTimeout(next, 170);
  };
  next();
  setTimeout(finish, 3200); // safety net
}

/* ---------- text scramble ---------- */
const GLYPHS = '!<>-_\\/[]{}—=+*^?#01';
function scramble(el, text, dur = 900){
  if (reduceMotion) { el.textContent = text; return; }
  const start = performance.now(), n = text.length;
  const step = now => {
    const p = clamp((now - start) / dur, 0, 1);
    let s = '';
    for (let i = 0; i < n; i++){
      const lock = i / n < p;
      s += text[i] === ' ' ? ' ' : (lock ? text[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0]);
    }
    el.textContent = s;
    if (p < 1) requestAnimationFrame(step); else el.textContent = text;
  };
  requestAnimationFrame(step);
}

/* ---------- typewriter ---------- */
const ROLES = ['Machine learning builder', 'Full-stack (MERN) developer', 'Designer who ships', 'Network-security tinkerer'];
function typewriter(){
  const el = $('#typed');
  if (reduceMotion) { el.textContent = ROLES[0]; return; }
  let r = 0, c = 0, del = false;
  const tick = () => {
    const word = ROLES[r];
    el.textContent = word.slice(0, c);
    if (!del && c < word.length) { c++; setTimeout(tick, 70); }
    else if (!del) { del = true; setTimeout(tick, 1500); }
    else if (c > 0) { c--; setTimeout(tick, 32); }
    else { del = false; r = (r + 1) % ROLES.length; setTimeout(tick, 300); }
  };
  tick();
}

/* ---------- reveal on scroll ---------- */
let heroRevealed = false;
function revealHero(){
  if (heroRevealed) return; heroRevealed = true;
  $$('#hero .rv').forEach((el, i) => setTimeout(() => el.classList.add('in'), 120 * i));
  scramble($('#nameA'), 'Praatishthaa', 1100);
  scramble($('#nameB'), 'Goyal', 1300);
  typewriter();
}
const rvObs = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target;
  if (el.closest('#hero')) return;
  el.classList.add('in'); rvObs.unobserve(el);
  const h = $('[data-scramble]', el); if (h && !h.dataset.done){ h.dataset.done = 1; scramble(h, h.textContent, 700); }
  $$('[data-count]', el).forEach(countUp);
}), {threshold: 0.15, rootMargin: '0px 0px -40px 0px'});
$$('.rv').forEach(el => rvObs.observe(el));

function countUp(el){
  if (el.dataset.ran) return; el.dataset.ran = 1;
  const to = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec || '0', 10), t0 = performance.now(), dur = 1400;
  const f = now => {
    const p = clamp((now - t0) / dur, 0, 1), e = 1 - Math.pow(1 - p, 3);
    el.textContent = (to * e).toFixed(dec);
    if (p < 1) requestAnimationFrame(f);
  };
  requestAnimationFrame(f);
}

/* ---------- scroll: progress, nav spy, timeline ---------- */
const progress = $('#progress'), tlFill = $('#tlFill'), tlWrap = $('.timeline');
function onScroll(){
  const h = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
  const r = tlWrap.getBoundingClientRect();
  const p = clamp((innerHeight * 0.6 - r.top) / r.height, 0, 1);
  tlFill.style.height = (p * 100) + '%';
}
addEventListener('scroll', onScroll, {passive:true}); onScroll();
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) $$('.links a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
}), {rootMargin:'-45% 0px -50% 0px'});
$$('main section[id]').forEach(s => spy.observe(s));

/* ---------- clock ---------- */
function tickClock(){
  try {
    $('#clock').textContent = new Date().toLocaleTimeString('en-GB', {timeZone:'Asia/Kolkata', hour12:false}) + ' IST';
  } catch(e){ $('#clock').textContent = new Date().toLocaleTimeString(); }
}
tickClock(); setInterval(tickClock, 1000);

/* ---------- custom cursor, tilt, magnetic ---------- */
const cur = $('#cur'), ring = $('#ring');
const m = {x: innerWidth / 2, y: innerHeight / 2, rx: innerWidth / 2, ry: innerHeight / 2};
if (finePointer){
  addEventListener('mousemove', e => {
    m.x = e.clientX; m.y = e.clientY;
    document.body.classList.add('has-cursor');
    cur.style.transform = `translate(${m.x}px,${m.y}px)`;
  }, {passive:true});
  document.addEventListener('mouseleave', () => document.body.classList.remove('has-cursor'));
  document.addEventListener('mouseover', e => document.body.classList.toggle('cur-hover', !!e.target.closest('a,button,.hov,.sk,input[type=range],.iso-handle,#palList li')));
  (function loop(){
    m.rx = lerp(m.rx, m.x, .16); m.ry = lerp(m.ry, m.y, .16);
    ring.style.transform = `translate(${m.rx}px,${m.ry}px)`;
    requestAnimationFrame(loop);
  })();
}
if (finePointer && !reduceMotion){
  $$('.tilt').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', (x * 100) + '%'); el.style.setProperty('--my', (y * 100) + '%');
      if (el.classList.contains('in')) el.style.transform = `perspective(900px) rotateX(${(.5 - y) * 7}deg) rotateY(${(x - .5) * 9}deg) translateZ(0)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
  $$('.mag').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .28}px,${(e.clientY - r.top - r.height / 2) * .35}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

/* ============================================================
   BACKGROUND: living network with packets + ripples
   ============================================================ */
const bg = $('#bg'), bctx = bg.getContext('2d');
let W = 0, H = 0, nodes = [], packets = [], ripples = [], bgTick = 0;
function resizeBG(){
  const dpr = Math.min(devicePixelRatio || 1, 2);
  W = innerWidth; H = innerHeight;
  bg.width = W * dpr; bg.height = H * dpr; bg.style.width = W + 'px'; bg.style.height = H + 'px';
  bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const n = clamp(Math.floor(W * H / 17000), 28, 95);
  nodes = Array.from({length:n}, () => ({x:rand(0,W), y:rand(0,H), vx:rand(-.22,.22), vy:rand(-.22,.22), r:rand(1,2.3)}));
}
addEventListener('resize', resizeBG); resizeBG();
bg.addEventListener('click', e => spawnBurst(e.clientX, e.clientY));
// clicks on page content shouldn't block; canvas is behind, so also listen on body for empty-space clicks
document.addEventListener('click', e => {
  if (e.target.closest('a,button,input,textarea,select,canvas,.tilt,.tile,.tl-card,.project,.pal,.term,.form,.edu-card,.sk,.filters,.demo-wrap,.idcard,.nav')) return;
  spawnBurst(e.clientX, e.clientY);
});
function spawnBurst(x, y){
  ripples.push({x, y, r:0, a:1, col:'a'});
  const near = nodes.map(n => ({n, d:Math.hypot(n.x - x, n.y - y)})).sort((p, q) => p.d - q.d).slice(0, 5);
  near.forEach(({n}) => {
    const to = nodes[(Math.random() * nodes.length) | 0];
    packets.push({from:n, to, t:0, sp:rand(.008,.016), threat:false});
  });
}
function spawnPacket(){
  const a = nodes[(Math.random() * nodes.length) | 0];
  let best = null, bd = 1e9;
  for (const b of nodes){ if (b === a) continue; const d = Math.hypot(a.x - b.x, a.y - b.y); if (d < bd && d > 20 && Math.random() < .5){ bd = d; best = b; } }
  if (!best) return;
  packets.push({from:a, to:best, t:0, sp:rand(.006,.014), threat:Math.random() < .16});
}
function drawBG(){
  requestAnimationFrame(drawBG);
  if (document.hidden) return;
  bgTick++;
  bctx.clearRect(0, 0, W, H);
  const LINK = W < 700 ? 100 : 135, MOUSE = 170;
  for (const n of nodes){
    n.x += n.vx; n.y += n.vy;
    if (n.x < -10) n.x = W + 10; if (n.x > W + 10) n.x = -10;
    if (n.y < -10) n.y = H + 10; if (n.y > H + 10) n.y = -10;
    const dx = m.x - n.x, dy = m.y - n.y, d = Math.hypot(dx, dy);
    if (d < MOUSE && d > 1){ n.x += dx / d * .35; n.y += dy / d * .35; }
  }
  bctx.lineWidth = 1;
  for (let i = 0; i < nodes.length; i++){
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j++){
      const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < LINK){ bctx.strokeStyle = `rgba(${colors.tx},${(1 - d / LINK) * .1})`; bctx.beginPath(); bctx.moveTo(a.x, a.y); bctx.lineTo(b.x, b.y); bctx.stroke(); }
    }
    const dm = Math.hypot(a.x - m.x, a.y - m.y);
    if (dm < MOUSE){ bctx.strokeStyle = `rgba(${colors.a},${(1 - dm / MOUSE) * .55})`; bctx.beginPath(); bctx.moveTo(a.x, a.y); bctx.lineTo(m.x, m.y); bctx.stroke(); }
  }
  for (const n of nodes){ bctx.fillStyle = `rgba(${colors.tx},.45)`; bctx.beginPath(); bctx.arc(n.x, n.y, n.r, 0, 6.283); bctx.fill(); }
  if (bgTick % 100 === 0 && packets.length < 14) spawnPacket();
  packets = packets.filter(p => {
    p.t += p.sp;
    const x = lerp(p.from.x, p.to.x, p.t), y = lerp(p.from.y, p.to.y, p.t);
    const col = p.threat ? colors.b : colors.a;
    bctx.fillStyle = `rgba(${col},.95)`; bctx.shadowColor = `rgba(${col},1)`; bctx.shadowBlur = 12;
    bctx.beginPath(); bctx.arc(x, y, p.threat ? 3.2 : 2.4, 0, 6.283); bctx.fill(); bctx.shadowBlur = 0;
    if (p.t >= 1){ ripples.push({x:p.to.x, y:p.to.y, r:0, a:.8, col:p.threat ? 'b' : 'a', small:true}); return false; }
    return true;
  });
  ripples = ripples.filter(r => {
    r.r += r.small ? .9 : 2.6; r.a -= r.small ? .025 : .014;
    if (r.a <= 0) return false;
    bctx.strokeStyle = `rgba(${colors[r.col]},${r.a * .7})`; bctx.lineWidth = 1.5;
    bctx.beginPath(); bctx.arc(r.x, r.y, r.r, 0, 6.283); bctx.stroke();
    return true;
  });
}
drawBG();
if (reduceMotion) { nodes.forEach(n => { n.vx = n.vy = 0; }); }

/* ============================================================
   FX: bubble / confetti burst (Konami, surprise)
   ============================================================ */
const fx = $('#fx'), fctx = fx.getContext('2d');
let fxParts = [], fxRunning = false;
function sizeFX(){ const d = Math.min(devicePixelRatio || 1, 2); fx.width = innerWidth * d; fx.height = innerHeight * d; fctx.setTransform(d, 0, 0, d, 0, 0); }
addEventListener('resize', sizeFX); sizeFX();
function celebrate(n = 140){
  const cols = [colors.a, colors.b, colors.c, '255,255,255'];
  for (let i = 0; i < n; i++){
    const rise = Math.random() < .5;
    fxParts.push({
      x: rise ? rand(0, innerWidth) : innerWidth / 2, y: rise ? innerHeight + 20 : innerHeight * .55,
      vx: rise ? rand(-.6,.6) : rand(-9,9), vy: rise ? rand(-5,-2) : rand(-14,-3),
      r: rand(3, 11), life: 1, col: cols[(Math.random() * cols.length) | 0], bubble: rise, g: rise ? -.01 : .22, wob: rand(0, 6.28),
    });
  }
  if (!fxRunning){ fxRunning = true; requestAnimationFrame(fxLoop); }
}
function fxLoop(){
  fctx.clearRect(0, 0, innerWidth, innerHeight);
  fxParts = fxParts.filter(p => {
    p.vy += p.g; p.x += p.vx + (p.bubble ? Math.sin(p.wob += .06) * .8 : 0); p.y += p.vy; p.life -= .006;
    if (p.life <= 0 || p.y > innerHeight + 40) return false;
    fctx.globalAlpha = clamp(p.life * 1.5, 0, 1);
    if (p.bubble){
      fctx.strokeStyle = `rgba(${p.col},.9)`; fctx.fillStyle = `rgba(${p.col},.12)`; fctx.lineWidth = 1.5;
      fctx.beginPath(); fctx.arc(p.x, p.y, p.r * 1.6, 0, 6.283); fctx.fill(); fctx.stroke();
    } else { fctx.fillStyle = `rgb(${p.col})`; fctx.fillRect(p.x, p.y, p.r, p.r * .6); }
    return true;
  });
  fctx.globalAlpha = 1;
  if (fxParts.length) requestAnimationFrame(fxLoop); else { fxRunning = false; fctx.clearRect(0, 0, innerWidth, innerHeight); }
}

/* ============================================================
   SKILLS
   ============================================================ */
(function skills(){
  const cloud = $('#skillCloud');
  cloud.innerHTML = SKILLS.map(([n, c]) => `<div class="sk hov" data-c="${c}">${n.replace(/&/g,'&amp;')}<small>${CAT[c]}</small></div>`).join('');
  const names = SKILLS.map(s => s[0]).filter(n => n.length < 16);
  const row = names.map(n => `<span>${n}</span>`).join('');
  $('#marq').innerHTML = row + row;
  $('#filters').addEventListener('click', e => {
    const b = e.target.closest('.f'); if (!b) return;
    $$('.f').forEach(x => x.classList.toggle('on', x === b));
    const f = b.dataset.f;
    $$('.sk').forEach(s => s.classList.toggle('dim', f !== 'all' && s.dataset.c !== f));
  });
})();

/* ============================================================
   K-MEANS PLAYGROUND
   ============================================================ */
(function kmeans(){
  const cv = $('#kCanvas'), ctx = cv.getContext('2d'), hud = $('#kHud');
  const PAL = () => [colors.a, colors.b, colors.c, '251,191,36', '74,222,128', '96,165,250'];
  let w = 0, h = 0, pts = [], cents = [], iter = 0, running = false, timer = null, converged = false;
  watchVisible(cv);
  function size(){
    const d = Math.min(devicePixelRatio || 1, 2), r = cv.getBoundingClientRect();
    w = r.width; h = r.height; cv.width = w * d; cv.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0); draw();
  }
  addEventListener('resize', size);
  const K = () => parseInt($('#kSel').value, 10);
  function seedData(){
    stop(); pts = []; cents = []; iter = 0; converged = false;
    const k = 3 + ((Math.random() * 2) | 0);
    for (let c = 0; c < k; c++){
      const cx = rand(.15, .85) * w, cy = rand(.2, .8) * h, s = rand(28, 55);
      for (let i = 0; i < 38; i++) pts.push({x:clamp(cx + gauss() * s, 8, w - 8), y:clamp(cy + gauss() * s, 8, h - 8), c:-1});
    }
    draw();
  }
  function gauss(){ return (Math.random() + Math.random() + Math.random() + Math.random() - 2) * 1.2; }
  function initCents(){
    // k-means++ style seeding
    const k = Math.min(K(), pts.length); cents = [];
    const first = pts[(Math.random() * pts.length) | 0]; cents.push({x:first.x, y:first.y});
    while (cents.length < k){
      const d2 = pts.map(p => Math.min(...cents.map(c => (p.x - c.x) ** 2 + (p.y - c.y) ** 2)));
      const sum = d2.reduce((a, b) => a + b, 0); let r = Math.random() * sum, idx = 0;
      for (; idx < d2.length - 1; idx++){ r -= d2[idx]; if (r <= 0) break; }
      cents.push({x:pts[idx].x, y:pts[idx].y});
    }
    iter = 0; converged = false; pts.forEach(p => p.c = -1);
  }
  function step(){
    if (pts.length < K()){ toast('add at least ' + K() + ' points first'); stop(); return; }
    if (!cents.length || cents.length !== K()) initCents();
    let changed = false;
    pts.forEach(p => {
      let best = 0, bd = 1e12;
      cents.forEach((c, i) => { const d = (p.x - c.x) ** 2 + (p.y - c.y) ** 2; if (d < bd){ bd = d; best = i; } });
      if (p.c !== best){ p.c = best; changed = true; }
    });
    cents.forEach((c, i) => {
      const mem = pts.filter(p => p.c === i);
      if (mem.length){ c.x = mem.reduce((s, p) => s + p.x, 0) / mem.length; c.y = mem.reduce((s, p) => s + p.y, 0) / mem.length; }
    });
    iter++; converged = !changed; if (converged) stop();
    draw();
  }
  function stop(){ running = false; clearInterval(timer); $('#kRun').textContent = 'Run'; }
  function run(){
    if (running){ stop(); return; }
    if (converged || !cents.length) initCents();
    running = true; $('#kRun').textContent = 'Pause';
    timer = setInterval(() => { if (isVisible(cv) === false) return; step(); }, 520);
  }
  function inertia(){ return pts.reduce((s, p) => s + (p.c >= 0 ? (p.x - cents[p.c].x) ** 2 + (p.y - cents[p.c].y) ** 2 : 0), 0); }
  function draw(){
    ctx.clearRect(0, 0, w, h);
    const pal = PAL();
    // subtle grid
    ctx.strokeStyle = `rgba(${colors.tx},.05)`; ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40){ ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 40){ ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    // links to centroid
    pts.forEach(p => { if (p.c >= 0 && cents[p.c]){ ctx.strokeStyle = `rgba(${pal[p.c % 6]},.16)`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(cents[p.c].x, cents[p.c].y); ctx.stroke(); } });
    pts.forEach(p => {
      ctx.fillStyle = p.c >= 0 ? `rgb(${pal[p.c % 6]})` : `rgba(${colors.tx},.6)`;
      ctx.beginPath(); ctx.arc(p.x, p.y, 4.2, 0, 6.283); ctx.fill();
    });
    cents.forEach((c, i) => {
      const col = pal[i % 6];
      ctx.shadowColor = `rgb(${col})`; ctx.shadowBlur = 18;
      ctx.fillStyle = `rgb(${col})`; ctx.beginPath(); ctx.arc(c.x, c.y, 10, 0, 6.283); ctx.fill(); ctx.shadowBlur = 0;
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(c.x, c.y, 10, 0, 6.283); ctx.stroke();
      ctx.strokeStyle = `rgba(${col},.5)`; ctx.beginPath(); ctx.arc(c.x, c.y, 18, 0, 6.283); ctx.stroke();
    });
    if (!pts.length){
      ctx.fillStyle = `rgba(${colors.tx},.45)`; ctx.font = '500 15px ' + getComputedStyle(document.body).fontFamily; ctx.textAlign = 'center';
      ctx.fillText('click anywhere to add points', w / 2, h / 2);
    }
    hud.textContent = `points: ${pts.length} · k: ${K()} · iteration: ${iter}` + (cents.length && pts.some(p => p.c >= 0) ? ` · inertia: ${Math.round(inertia())}` : '') + (converged ? ' · converged ✓' : '');
  }
  cv.addEventListener('pointerdown', e => {
    const r = cv.getBoundingClientRect();
    pts.push({x:e.clientX - r.left, y:e.clientY - r.top, c:-1});
    if (cents.length){ converged = false; }
    draw();
  });
  $('#kStep').addEventListener('click', () => { stop(); if (converged) initCents(); step(); });
  $('#kRun').addEventListener('click', run);
  $('#kRand').addEventListener('click', seedData);
  $('#kClear').addEventListener('click', () => { stop(); pts = []; cents = []; iter = 0; converged = false; draw(); });
  $('#kSel').addEventListener('change', () => { stop(); cents = []; iter = 0; converged = false; pts.forEach(p => p.c = -1); draw(); });
  size(); seedData();
  new ResizeObserver(size).observe(cv);
})();

/* ============================================================
   SENTINEL IPS SIMULATION
   ============================================================ */
(function sentinel(){
  const log = $('#sLog'), box = $('#p-sentinel');
  watchVisible(box);
  let on = true, total = 0, blocked = 0, breach = 0;
  const ATT = [['SYN flood',80],['Port scan',22],['SQL injection',443],['UDP flood',53],['Brute force',22],['DDoS burst',80]];
  const OK = [['HTTPS',443],['DNS',53],['HTTP',80],['SSH',22],['NTP',123]];
  const ip = () => `${(rand(11,220)|0)}.${(rand(0,255)|0)}.${(rand(0,255)|0)}.${(rand(1,254)|0)}`;
  function packet(forceBad){
    const bad = forceBad || Math.random() < .2;
    const [name, port] = (bad ? ATT : OK)[(Math.random() * (bad ? ATT : OK).length) | 0];
    total++;
    let cls, verdict;
    const conf = bad ? (88 + Math.random() * 11).toFixed(0) : (93 + Math.random() * 6).toFixed(0);
    if (!bad){ cls = 'ok'; verdict = `✓ benign ${conf}%`; }
    else if (on){ cls = 'blocked'; blocked++; verdict = `⛔ BLOCKED ${conf}%`; }
    else { cls = 'breach'; breach++; verdict = '⚠ BREACH'; box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake'); }
    const d = new Date(), ts = d.toTimeString().slice(0, 8);
    const ln = document.createElement('div'); ln.className = 'ln ' + cls;
    ln.innerHTML = `<span class="d">${ts}</span><span>${ip()} → :${port} ${bad ? '· ' + name : '· ' + name}</span><span class="v">${verdict}</span>`;
    log.appendChild(ln);
    while (log.children.length > 9) log.removeChild(log.firstChild);
    $('#sTotal').textContent = total; $('#sBlocked').textContent = blocked; $('#sBreach').textContent = breach;
  }
  setInterval(() => { if (isVisible(box)) packet(false); }, 950);
  $('#sAttack').addEventListener('click', () => {
    for (let i = 0; i < 6; i++) setTimeout(() => packet(true), i * 130);
    if (!on) toast('Sentinel is OFF. Brace for impact.');
  });
  $('#sToggle').addEventListener('click', e => {
    on = !on; const b = e.currentTarget;
    b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); $('b', b).textContent = on ? 'Sentinel ON' : 'Sentinel OFF';
    toast(on ? 'Sentinel armed: attacks get blocked' : 'Sentinel disabled: attacks get through');
  });
  for (let i = 0; i < 5; i++) packet(false);
})();

/* ============================================================
   ISO — procedurally drawn coral, healthy vs bleached
   ============================================================ */
(function iso(){
  const box = $('#isoBox'), cv = $('#isoCanvas'), ctx = cv.getContext('2d'), handle = $('#isoHandle'), pct = $('#isoPct');
  let w = 0, h = 0, split = .5, healthy, bleached;
  function mulberry(a){ return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function scene(bleach){
    const c = document.createElement('canvas'), d = Math.min(devicePixelRatio || 1, 2);
    c.width = w * d; c.height = h * d; const g = c.getContext('2d'); g.scale(d, d);
    const R = mulberry(7);
    // water
    const wg = g.createLinearGradient(0, 0, 0, h);
    if (bleach){ wg.addColorStop(0, '#5aa7b8'); wg.addColorStop(1, '#2f6f86'); } else { wg.addColorStop(0, '#0f6f91'); wg.addColorStop(1, '#06304a'); }
    g.fillStyle = wg; g.fillRect(0, 0, w, h);
    // light rays
    for (let i = 0; i < 6; i++){
      const x = R() * w, rw = 20 + R() * 50; g.fillStyle = `rgba(255,255,255,${bleach ? .09 : .06})`;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x + rw, 0); g.lineTo(x + rw * 2.4 - 40, h); g.lineTo(x - 30, h); g.fill();
    }
    // sand
    g.fillStyle = bleach ? '#cdbf9c' : '#a89468';
    g.beginPath(); g.moveTo(0, h);
    for (let x = 0; x <= w; x += 16) g.lineTo(x, h - 34 - Math.sin(x * .02) * 9 - R() * 4);
    g.lineTo(w, h); g.fill();
    // corals
    const hues = bleach ? [['#f3ece0','#e6ddcf'],['#efe6d6','#fff'],['#e9dfd0','#f8f2e8']] : [['#ff6b81','#ff9a8b'],['#ffa63d','#ffd166'],['#b084f5','#e0aaff'],['#2ec4b6','#8ff0d8']];
    function branch(x, y, ang, len, depth, col, lw){
      if (depth <= 0 || len < 4) { g.fillStyle = col[1]; g.beginPath(); g.arc(x, y, lw * .8 + 1, 0, 6.283); g.fill(); return; }
      const x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len;
      g.strokeStyle = depth > 1 ? col[0] : col[1]; g.lineWidth = lw; g.lineCap = 'round';
      g.beginPath(); g.moveTo(x, y); g.lineTo(x2, y2); g.stroke();
      const sp = .35 + R() * .45;
      branch(x2, y2, ang - sp, len * (.7 + R() * .1), depth - 1, col, lw * .75);
      branch(x2, y2, ang + sp, len * (.7 + R() * .1), depth - 1, col, lw * .75);
      if (R() < .35) branch(x2, y2, ang + (R() - .5) * .3, len * .62, depth - 1, col, lw * .7);
    }
    const base = h - 34;
    for (let i = 0; i < 9; i++){
      const x = 24 + (i / 8) * (w - 48) + (R() - .5) * 20, col = hues[(R() * hues.length) | 0];
      branch(x, base - R() * 14, -Math.PI / 2 + (R() - .5) * .4, 34 + R() * 34, 5, col, 7 + R() * 3);
    }
    // brain/dome corals
    for (let i = 0; i < 5; i++){
      const x = 40 + R() * (w - 80), r = 18 + R() * 20, col = hues[(R() * hues.length) | 0];
      g.fillStyle = col[0]; g.beginPath(); g.ellipse(x, base + 6, r * 1.3, r, 0, Math.PI, 0); g.fill();
      g.strokeStyle = col[1]; g.lineWidth = 1.6;
      for (let k = 0; k < 4; k++){ g.beginPath(); g.arc(x, base + 6, r * (.3 + k * .24), Math.PI * 1.05, Math.PI * 1.95); g.stroke(); }
    }
    // fish
    for (let i = 0; i < 5; i++){
      const x = R() * w, y = 40 + R() * (h * .45), s = 6 + R() * 5;
      g.fillStyle = bleach ? 'rgba(255,255,255,.7)' : ['#ffd23f','#ff7b00','#fff'][i % 3];
      g.beginPath(); g.ellipse(x, y, s * 1.6, s, 0, 0, 6.283); g.fill();
      g.beginPath(); g.moveTo(x - s * 1.4, y); g.lineTo(x - s * 2.6, y - s * .8); g.lineTo(x - s * 2.6, y + s * .8); g.fill();
    }
    return c;
  }
  function size(){
    const r = box.getBoundingClientRect(); w = r.width; h = r.height;
    const d = Math.min(devicePixelRatio || 1, 2); cv.width = w * d; cv.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    healthy = scene(false); bleached = scene(true); render();
  }
  function render(){
    if (!healthy) return;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(healthy, 0, 0, w, h);
    const sx = split * w;
    ctx.save(); ctx.beginPath(); ctx.rect(sx, 0, w - sx, h); ctx.clip(); ctx.drawImage(bleached, 0, 0, w, h); ctx.restore();
    handle.style.left = (split * 100) + '%';
    pct.textContent = 'bleached: ' + Math.round((1 - split) * 100) + '%';
  }
  function move(e){ const r = box.getBoundingClientRect(); split = clamp((e.clientX - r.left) / r.width, .02, .98); render(); }
  let drag = false;
  box.addEventListener('pointerdown', e => { drag = true; box.setPointerCapture(e.pointerId); move(e); });
  box.addEventListener('pointermove', e => { if (drag) move(e); });
  box.addEventListener('pointerup', () => drag = false);
  box.addEventListener('pointercancel', () => drag = false);
  handle.tabIndex = 0; handle.setAttribute('role', 'slider'); handle.setAttribute('aria-label', 'Compare healthy and bleached coral');
  handle.addEventListener('keydown', e => { if (e.key === 'ArrowLeft'){ split = clamp(split - .04, .02, .98); render(); } if (e.key === 'ArrowRight'){ split = clamp(split + .04, .02, .98); render(); } });
  size(); new ResizeObserver(() => size()).observe(box);
})();

/* ============================================================
   NOURIVO — steps -> meals
   ============================================================ */
(function nourivo(){
  const rng = $('#nRange'), fg = $('#nRing'), meals = $('#nMeals'), steps = $('#nSteps'), plates = $('#nPlates');
  const C = 2 * Math.PI * 52, MAX = 12000, MS = [3000, 6000, 10000];
  let last = 0;
  function update(){
    const v = parseInt(rng.value, 10), n = MS.filter(m => v >= m).length;
    fg.style.strokeDasharray = C; fg.style.strokeDashoffset = C * (1 - v / MAX);
    rng.style.setProperty('--p', (v / MAX * 100) + '%');
    steps.textContent = v.toLocaleString('en-IN') + ' steps';
    meals.textContent = n;
    $$('.miles span').forEach(s => s.classList.toggle('hit', v >= parseInt(s.dataset.m, 10)));
    if (n !== last){
      plates.innerHTML = Array.from({length:n}, () => '<span>🍲</span>').join('');
      if (n > last) { toast(n === 1 ? 'Milestone! A meal is donated 🍲' : `Milestone ${n}! ${n} meals donated`); if (n === 3) celebrate(80); }
      last = n;
    }
  }
  rng.addEventListener('input', update); update();
})();

/* ============================================================
   TERMINAL
   ============================================================ */
(function terminal(){
  const out = $('#tOut'), inp = $('#tIn'), body = $('#tBody');
  const hist = []; let hi = 0;
  const esc = s => s.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
  const print = (html, cls = '') => { const d = document.createElement('div'); d.className = 'row ' + cls; d.innerHTML = html; out.appendChild(d); body.scrollTop = body.scrollHeight; };
  const kv = (k, v) => print(`<span class="k">${esc(k.padEnd(11))}</span>${v}`);
  const CMDS = {
    help(){
      print('<span class="y">available commands</span>');
      [['about','who is this person'],['experience','where I have worked'],['projects','things I have built'],['skills','tools of the trade'],['education','where I have studied'],
       ['contact','how to reach me'],['resume','download my CV'],['github','open my GitHub'],['accent','cycle accent colour'],['theme','toggle light/dark'],
       ['palette','open command palette'],['clear','clear the screen'],['whoami','a deep question']]
        .forEach(([c, d]) => print(`  <span class="k">${c.padEnd(12)}</span><span class="d">${d}</span>`));
      print('<span class="d">psst: there are a few hidden commands too.</span>');
    },
    about(){
      print('Praatishthaa Goyal, B.Tech CSE student (2023-27) at I. K. Gujral Punjab Technical University.');
      print('I build ML systems and full-stack apps, and I design the things I ship.');
    },
    whoami(){ print('a curious human who debugs with coffee, not hope.'); },
    experience(){
      kv('2025', 'ML Intern @ SkillCraft Technologies (K-Means customer segmentation)');
      kv('2025', 'Full Stack Trainee @ PG Tech Solutions (MERN)');
      kv('ongoing', 'Freelance graphic design & front-end');
    },
    projects(){
      kv('sentinel', 'Sentinel IPS: ML intrusion detection + AI-powered prevention (SDN/OpenFlow)');
      kv('iso', 'ISO: coral reef monitoring, healthy vs bleached classification');
      kv('nourivo', 'Nourivo: fitness platform that donates meals at step milestones');
    },
    skills(){
      Object.keys(CAT).forEach(c => kv(CAT[c], SKILLS.filter(s => s[1] === c).map(s => s[0]).join(', ')));
    },
    education(){
      kv('2023-27', 'B.Tech CSE, I. K. Gujral PTU · CGPA 9.24');
      kv('2022', 'Grade 12 ISC, City Montessori School · 96.5%');
      kv('2020', 'Grade 10 ICSE, City Montessori School · 97.4%');
    },
    contact(){
      kv('email', `<a href="mailto:${CONFIG.email}">${CONFIG.email}</a>`);
      kv('github', `<a href="${CONFIG.github}" target="_blank" rel="noopener">${CONFIG.github.replace('https://','')}</a>`);
    },
    resume(){ print('downloading resume…', 'd'); const a = document.createElement('a'); a.href = CONFIG.resume; a.download = ''; document.body.appendChild(a); a.click(); a.remove(); },
    github(){ print('opening GitHub…', 'd'); window.open(CONFIG.github, '_blank', 'noopener'); },
    accent(){ print('accent → ' + applyAccent(accentIdx + 1), 'k'); },
    theme(){ toggleTheme(); print('theme toggled', 'd'); },
    palette(){ openPalette(); },
    clear(){ out.innerHTML = ''; },
    ls(){ print('<span class="k">about/  experience/  projects/  skills/  education/</span>  resume.pdf  secrets.txt'); },
    cat(a){ if (/secrets/.test(a || '')) print('nice try. but try: <span class="k">sudo hire praatishthaa</span>'); else print('cat: ' + esc(a || '') + ': No such file', 'e'); },
    date(){ print(new Date().toString()); },
    echo(a){ print(esc(a || '')); },
    sudo(a){
      if (/hire/.test(a || '')){ print('[sudo] password for recruiter: ********', 'd'); setTimeout(() => { print('access granted. ✨ you have excellent taste.', 'k'); celebrate(160); }, 600); }
      else print('praatishthaa is not in the sudoers file. This incident will be reported.', 'e');
    },
    matrix(){ print('wake up…', 'k'); celebrate(220); },
    konami(){ print('↑ ↑ ↓ ↓ ← → ← → B A  (on your keyboard, anywhere on the page)', 'd'); },
    coffee(){ print('☕ brewing… ██████████ 100%  (running on caffeine.exe)'); },
    exit(){ print('there is no escape. try scrolling up instead.', 'd'); },
  };
  function run(line){
    const [c, ...rest] = line.trim().split(/\s+/), arg = rest.join(' ');
    print(`<span class="cmd"><b>❯</b> ${esc(line)}</span>`);
    if (!c) return;
    const f = CMDS[c.toLowerCase()];
    if (f) f(arg); else print(`command not found: ${esc(c)}. type <span class="k">help</span>`, 'e');
  }
  inp.addEventListener('keydown', e => {
    if (e.key === 'Enter'){ const v = inp.value; if (v.trim()){ hist.push(v); hi = hist.length; } run(v); inp.value = ''; }
    else if (e.key === 'ArrowUp'){ e.preventDefault(); if (hi > 0){ hi--; inp.value = hist[hi]; } }
    else if (e.key === 'ArrowDown'){ e.preventDefault(); if (hi < hist.length - 1){ hi++; inp.value = hist[hi]; } else { hi = hist.length; inp.value = ''; } }
    else if (e.key === 'Tab'){ e.preventDefault(); const v = inp.value.toLowerCase(); if (v){ const m = Object.keys(CMDS).filter(k => k.startsWith(v)); if (m.length === 1) inp.value = m[0]; else if (m.length) print(m.join('  '), 'd'); } }
    else if (e.key === 'l' && e.ctrlKey){ e.preventDefault(); CMDS.clear(); }
  });
  body.addEventListener('click', () => { if (!getSelection().toString()) inp.focus({preventScroll:true}); });
  print('<span class="k">Welcome to Praatishthaa\'s portfolio shell v1.0</span>');
  print('type <span class="k">help</span> to see what you can do. (try <span class="k">projects</span>)', 'd');
  window.__focusTerminal = () => { $('#terminal').scrollIntoView({behavior:'smooth', block:'center'}); setTimeout(() => inp.focus({preventScroll:true}), 600); };
})();

/* ============================================================
   COMMAND PALETTE
   ============================================================ */
const pal = $('#pal'), palIn = $('#palIn'), palList = $('#palList');
const go = id => () => { document.getElementById(id).scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth'}); };
const copyEmail = async () => {
  try { await navigator.clipboard.writeText(CONFIG.email); toast('email copied ✓'); }
  catch(e){ toast(CONFIG.email); }
};
const ACTIONS = [
  ['Go to About','section',go('about')], ['Go to Experience','section',go('experience')], ['Go to Projects','section',go('projects')],
  ['Go to Skills','section',go('skills')], ['Go to Education','section',go('education')], ['Go to Contact','section',go('contact')],
  ['Play with K-Means','demo',go('kmeansDemo')], ['Try the Sentinel simulator','demo',go('p-sentinel')], ['Compare coral health','demo',go('p-iso')],
  ['Open the terminal','tool',() => window.__focusTerminal()],
  ['Download resume','file',() => { const a = document.createElement('a'); a.href = CONFIG.resume; a.download = ''; document.body.appendChild(a); a.click(); a.remove(); toast('resume downloading…'); }],
  ['Copy email address','contact',copyEmail],
  ['Open GitHub','link',() => window.open(CONFIG.github, '_blank', 'noopener')],
  ['Toggle light / dark','theme',toggleTheme],
  ['Cycle accent colour','theme',() => toast('accent: ' + applyAccent(accentIdx + 1))],
  ['Surprise me','fun',() => { celebrate(180); toast('🫧'); }],
];
let palSel = 0, palItems = [];
function renderPal(){
  const q = palIn.value.trim().toLowerCase();
  palItems = ACTIONS.filter(a => !q || a[0].toLowerCase().includes(q) || a[1].includes(q));
  palSel = clamp(palSel, 0, Math.max(0, palItems.length - 1));
  palList.innerHTML = palItems.length ? palItems.map((a, i) => `<li role="option" class="${i === palSel ? 'sel' : ''}" data-i="${i}">${a[0]}<small>${a[1]}</small></li>`).join('') : '<li><small>no matches</small></li>';
  const s = $('.sel', palList); if (s) s.scrollIntoView({block:'nearest'});
}
function openPalette(){ pal.hidden = false; palIn.value = ''; palSel = 0; renderPal(); setTimeout(() => palIn.focus(), 10); }
function closePalette(){ pal.hidden = true; }
function runPal(i){ const a = palItems[i]; if (!a) return; closePalette(); setTimeout(a[2], 50); }
palIn.addEventListener('input', () => { palSel = 0; renderPal(); });
palList.addEventListener('click', e => { const li = e.target.closest('li[data-i]'); if (li) runPal(+li.dataset.i); });
palList.addEventListener('mousemove', e => { const li = e.target.closest('li[data-i]'); if (li && +li.dataset.i !== palSel){ palSel = +li.dataset.i; $$('li', palList).forEach((x, i) => x.classList.toggle('sel', i === palSel)); } });
pal.addEventListener('mousedown', e => { if (e.target === pal) closePalette(); });
palIn.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown'){ e.preventDefault(); palSel = (palSel + 1) % Math.max(1, palItems.length); renderPal(); }
  else if (e.key === 'ArrowUp'){ e.preventDefault(); palSel = (palSel - 1 + palItems.length) % Math.max(1, palItems.length); renderPal(); }
  else if (e.key === 'Enter'){ e.preventDefault(); runPal(palSel); }
});
$('#openPalette').addEventListener('click', openPalette);

/* global keys + konami */
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']; let kpos = 0;
addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'){ e.preventDefault(); pal.hidden ? openPalette() : closePalette(); return; }
  if (e.key === 'Escape' && !pal.hidden){ closePalette(); return; }
  if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  kpos = (k === KONAMI[kpos]) ? kpos + 1 : (k === KONAMI[0] ? 1 : 0);
  if (kpos === KONAMI.length){ kpos = 0; celebrate(240); toast('🎮 +30 lives. Konami code accepted.'); }
});

/* ---------- contact ---------- */
$('#copyMail').addEventListener('click', copyEmail);
$('#surprise').addEventListener('click', () => { celebrate(160); toast('🫧 bubbles!'); });
$('#heroTerm').addEventListener('click', () => window.__focusTerminal());
$('#mailForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target), n = f.get('n'), em = f.get('e'), msg = f.get('m');
  const subject = encodeURIComponent('Hello from ' + n + ' (via your portfolio)');
  const bodyTxt = encodeURIComponent(msg + '\n\n— ' + n + '\n' + em);
  location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${bodyTxt}`;
  toast('opening your mail app…');
});

/* ---------- go ---------- */
document.documentElement.classList.remove('nojs');
runLoader();
})();
