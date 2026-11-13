'use strict';
/* ===== ตัวช่วยเลือก element ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = document.documentElement;
root.classList.add('js');

/* ===== ข้อมูลผลงาน (แก้ไข/เพิ่มได้ที่นี่) — path ภาพต้องตรงกับโฟลเดอร์ assets ===== */
const PROJECTS = [
  { id: 'wms-cold-storage', title: 'WMS Cold Storage', badge: 'ล่าสุด',
    tags: ['HTML', 'CSS', 'JavaScript', 'SheetJS', 'IndexedDB', 'Excel'],
    summary: 'ระบบจัดการสต็อกคลังสินค้าห้องเย็น สำหรับตัดยอด จัดชุดพาเลทให้พอดี Master Cap และรวมเลท',
    points: ['นำเข้าข้อมูลสต็อกจากไฟล์ Excel / CSV ของระบบ WMS (รองรับข้อมูลหลายหมื่นแถว)', 'ตารางสต็อกรวมยอดตาม LPN พร้อมตัวกรองคลัง Location และประเภท LPN', 'จัดชุดและรวมเลทให้ไม่เกิน Master Cap โดยไม่แยก LPN และไม่รวมข้ามคลัง', 'ตัดยอด บันทึกประวัติ และ Export ผลเป็นไฟล์ Excel', 'โหมดสว่าง/มืด และเก็บข้อมูลในเบราว์เซอร์ด้วย IndexedDB'],
    images: ['assets/wms-cold-storage.jpg'],
    link: { url: 'https://achita-yuki.github.io/wms-app-beta-test/', label: 'เปิดใช้งานเว็บ WMS' } },
  { id: 'catfish-care', title: 'Smart Catfish Care System',
    tags: ['ESP32', 'Arduino', 'DS18B20', 'Turbidity Sensor', 'IoT'],
    summary: 'ระบบตรวจสอบอุณหภูมิและความขุ่นของน้ำในการเลี้ยงปลาดุก',
    points: ['วัดอุณหภูมิน้ำด้วยเซนเซอร์ DS18B20', 'วัดความขุ่นของน้ำด้วย Turbidity Sensor', 'ประมวลผลและเชื่อมต่อระบบ IoT ด้วย ESP32 / Arduino', 'ช่วยให้ผู้เลี้ยงติดตามคุณภาพน้ำได้สะดวกขึ้น'],
    images: ['assets/catfish.jpg', 'assets/catfish-circuit.jpg', 'assets/catfish-work.jpg'] },
  { id: 'catfish-guide', title: 'Thai Catfish Guide',
    tags: ['HTML', 'CSS', 'JavaScript'],
    summary: 'เว็บไซต์รวบรวมข้อมูลเกี่ยวกับปลาดุกในประเทศไทย',
    points: ['พัฒนาด้วย HTML, CSS และ JavaScript', 'รวบรวมและนำเสนอข้อมูลปลาดุกในประเทศไทย', 'ออกแบบให้อ่านง่ายและใช้งานได้บนหลายอุปกรณ์'],
    images: ['assets/catfish-guide.jpg', 'assets/catfish-guide-page.jpg'],
    link: { url: 'https://www.figma.com/proto/udrFQarwqmFAtHCMkoSuUV/%E0%B9%84%E0%B8%81%E0%B8%84%E0%B9%8C%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B8%B8%E0%B9%8C%E0%B8%9B%E0%B8%A5%E0%B8%B2%E0%B8%94%E0%B8%B8%E0%B8%81%E0%B9%84%E0%B8%97%E0%B8%A2?t=b7dYptMBFuHbHaeN-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=80-202&starting-point-node-id=80%3A202&show-proto-sidebar=1', label: 'ดู Prototype บน Figma' } },
  { id: 'decision-tree', title: 'Decision Tree',
    tags: ['Python', 'Pandas', 'Matplotlib', 'Machine Learning'],
    summary: 'โปรเจกต์ศึกษาการทำงานของ Decision Tree',
    points: ['เตรียมและวิเคราะห์ข้อมูลด้วย Pandas', 'แสดงผลด้วยกราฟจาก Matplotlib', 'ศึกษาหลักการทำงานของ Decision Tree ใน Machine Learning'],
    images: ['assets/decision-tree.jpg'] }
];

/* ===== ภาพสำรอง: ถ้าไม่พบไฟล์ภาพ จะแสดงกรอบแทน (ไม่ให้รูปแตก) ===== */
function placeholder(src) {
  const name = (src || '').split('/').pop(), pf = name === 'profile.jpg';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b1a38"/><stop offset="1" stop-color="#0e7490"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><text x="400" y="${pf ? 350 : 310}" fill="#22d3ee" font-family="sans-serif" font-size="${pf ? 190 : 34}" text-anchor="middle">${pf ? 'AT' : name}</text></svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
document.addEventListener('error', e => {
  const t = e.target;
  if (t.tagName === 'IMG' && !t.dataset.fb) { t.dataset.fb = '1'; t.src = placeholder(t.getAttribute('src')); }
}, true);
/* รูปที่โหลดพลาดไปแล้วก่อนสคริปต์เริ่มทำงาน (เช่น รูปโปรไฟล์) ก็ใช้ภาพสำรองด้วย */
addEventListener('DOMContentLoaded', () => $$('img').forEach(i => {
  if (i.complete && !i.naturalWidth && !i.dataset.fb) { i.dataset.fb = '1'; i.src = placeholder(i.getAttribute('src')); }
}));

/* ===== โหมดสว่าง / มืด (จำค่าไว้ในเบราว์เซอร์) ===== */
function setTheme(t) {
  root.dataset.theme = t;
  try { localStorage.setItem('theme', t); } catch (e) {}
  const m = $('meta[name="theme-color"]'); if (m) m.content = t === 'light' ? '#f3f7fb' : '#050914';
}
let saved = 'dark'; try { saved = localStorage.getItem('theme') || 'dark'; } catch (e) {}
setTheme(saved);
$('#themeBtn').addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

/* ===== เมนูมือถือ ===== */
const menu = $('#menu'), burger = $('#burger');
burger.addEventListener('click', () => { const o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
menu.addEventListener('click', e => { if (e.target.closest('a')) { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); } });

/* ===== หมวดผลงาน (ใช้กับตัวกรอง) ===== */
const catOf = p => p.tags.some(t => /ESP32|Arduino|IoT/i.test(t)) ? 'iot' : p.tags.some(t => /Python|Machine/i.test(t)) ? 'ml' : 'web';

/* ===== สร้างการ์ดผลงาน ===== */
$('#projectGrid').innerHTML = PROJECTS.map(p => `
  <article class="card pcard reveal" data-cat="${catOf(p)}">
    <div class="pimg"><img src="${p.images[0]}" alt="${p.title}" loading="lazy">
      <button class="plink" data-project="${p.id}" aria-label="ดูรายละเอียด ${p.title}"><span class="btn primary">ดูรายละเอียด<svg class="i"><use href="#i-arrow"/></svg></span></button>
    </div>
    <div class="pbody">
      <h3>${p.title}${p.badge ? ` <span class="badge">${p.badge}</span>` : ''}</h3>
      <ul class="chips">${p.tags.map(t => `<li>${t}</li>`).join('')}</ul>
      <p>${p.summary}</p>
      <button class="btn ghost" data-project="${p.id}">View Details</button>
    </div>
  </article>`).join('');

/* ===== Modal รายละเอียดผลงาน + Gallery ===== */
const modal = $('#modal'), mMain = $('#mMain'), lightbox = $('#lightbox');
let current = null, lastFocus = null;

function setMain(i) {
  delete mMain.dataset.fb;                                   // ให้ภาพสำรองทำงานได้ทุกครั้งที่เปลี่ยนภาพ
  mMain.src = current.images[i];
  mMain.alt = `${current.title} ภาพที่ ${i + 1}`;
  $$('.thumb').forEach((b, k) => b.classList.toggle('on', k === i));
}
function openProject(id) {
  current = PROJECTS.find(p => p.id === id); if (!current) return;
  lastFocus = document.activeElement;
  $('#mTitle').textContent = current.title;
  $('#mSum').textContent = current.summary;
  $('#mTags').innerHTML = current.tags.map(t => `<li>${t}</li>`).join('');
  $('#mList').innerHTML = current.points.map(t => `<li>${t}</li>`).join('');
  $('#mThumbs').innerHTML = current.images.length > 1
    ? current.images.map((s, i) => `<button class="thumb" data-i="${i}" aria-label="ดูภาพที่ ${i + 1}"><img src="${s}" alt="${current.title} ภาพที่ ${i + 1}"></button>`).join('') : '';
  $('#mLink').innerHTML = current.link ? `<a class="btn ghost" href="${current.link.url}" target="_blank" rel="noopener noreferrer">${current.link.label}<svg class="i"><use href="#i-arrow"/></svg></a>` : '';
  setMain(0);
  modal.hidden = false; document.body.classList.add('lock');
  $('.m-close').focus();
}
function closeModal() {
  modal.hidden = true; document.body.classList.remove('lock');
  if (lastFocus) lastFocus.focus();
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-project]'); if (b) openProject(b.dataset.project);
  if (e.target.closest('[data-close]')) closeModal();
  const th = e.target.closest('.thumb'); if (th) setMain(+th.dataset.i);
});
$('#mainBtn').addEventListener('click', () => { $('#lbImg').src = mMain.src; $('#lbImg').alt = mMain.alt; lightbox.hidden = false; });
lightbox.addEventListener('click', () => { lightbox.hidden = true; });
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!lightbox.hidden) lightbox.hidden = true; else if (!modal.hidden) closeModal();
});

/* ===== Scroll Reveal ===== */
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .12 });
  $$('.reveal').forEach(el => io.observe(el));
} else { $$('.reveal').forEach(el => el.classList.add('in')); }

/* ===== ไฮไลต์เมนูตามส่วนที่กำลังดู ===== */
if ('IntersectionObserver' in window) {
  const links = $$('.menu a'), spy = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => spy.observe(s));
}

$('#year').textContent = new Date().getFullYear();

/* ===== ลูกเล่น: ตรวจว่าผู้ใช้ปิดแอนิเมชันหรือไม่ ===== */
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===== พื้นหลังเครือข่ายจุดเชื่อมเส้น (เคลื่อนไหว + ตอบสนองเมาส์) ===== */
(function network() {
  const cv = $('#bgCanvas'), cx = cv.getContext('2d'); if (!cx) return;
  const mouse = { x: -9999, y: -9999 };
  let W, H, pts = [];
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(90, Math.round(W * H / 16000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.4 + .8, red: Math.random() < .12
    }));
  }
  function frame() {
    const light = root.dataset.theme === 'light', c = light ? '14,116,144' : '34,211,238', k = light ? .22 : .35, D = 140;
    cx.clearRect(0, 0, W, H);
    for (const p of pts) {
      if (!reduceMotion) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
    }
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < D) { cx.strokeStyle = `rgba(${c},${(1 - d / D) * k})`; cx.lineWidth = 1; cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke(); }
      }
      const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (dm < 170) { cx.strokeStyle = `rgba(${c},${(1 - dm / 170) * .6})`; cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(mouse.x, mouse.y); cx.stroke(); }
      cx.fillStyle = a.red ? 'rgba(244,63,94,.85)' : `rgba(${c},.8)`;
      cx.beginPath(); cx.arc(a.x, a.y, a.r, 0, 6.2832); cx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(frame);
  }
  addEventListener('resize', () => { resize(); if (reduceMotion) frame(); });
  addEventListener('pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  document.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });
  resize(); frame();
})();

/* ===== แสงสปอตไลต์บนการ์ดตามตำแหน่งเมาส์ ===== */
document.addEventListener('pointermove', e => {
  const card = e.target.closest && e.target.closest('.card'); if (!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  card.style.setProperty('--my', (e.clientY - r.top) + 'px');
}, { passive: true });

/* ===== นาฬิกาสด + คำทักทายตามช่วงเวลา (พ.ศ.) ===== */
(function clock() {
  const t = $('#clockT'), d = $('#clockD'), g = $('#greet');
  function tick() {
    const n = new Date(), h = n.getHours();
    t.textContent = n.toLocaleTimeString('th-TH', { hourCycle: 'h23', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    d.textContent = n.toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    g.textContent = h < 12 ? 'สวัสดีตอนเช้า' : h < 17 ? 'สวัสดีตอนบ่าย' : h < 19 ? 'สวัสดีตอนเย็น' : 'สวัสดีตอนค่ำ';
  }
  tick(); setInterval(tick, 1000);
})();

/* ===== ข้อความพิมพ์ทีละตัวอักษรในหน้า Hero ===== */
(function typing() {
  const el = $('#typed'), words = ['Web Developer', 'IoT Builder', 'Python & Machine Learning'];
  if (reduceMotion) { el.textContent = words[0]; return; }
  let w = 0, i = 0, del = false;
  (function step() {
    const word = words[w];
    el.textContent = word.slice(0, i);
    if (!del && i === word.length) { del = true; return setTimeout(step, 1500); }
    if (del && i === 0) { del = false; w = (w + 1) % words.length; }
    i += del ? -1 : 1;
    setTimeout(step, del ? 45 : 90);
  })();
})();

/* ===== ✨ แสงตามเคอร์เซอร์ (ลื่นไหลแบบหน่วง) ===== */
(function cursorGlow() {
  const g = $('.cursor-glow'); if (!g || reduceMotion) return;
  let tx = innerWidth / 2, ty = innerHeight / 3, x = tx, y = ty;
  addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
  (function loop() { x += (tx - x) * .08; y += (ty - y) * .08; g.style.transform = `translate(${x}px,${y}px)`; requestAnimationFrame(loop); })();
})();

/* ===== ✨ การ์ดผลงานเอียง 3D ตามเมาส์ ===== */
(function tilt() {
  if (reduceMotion || matchMedia('(hover:none)').matches) return;
  const grid = $('#projectGrid');
  grid.addEventListener('pointermove', e => {
    const c = e.target.closest('.pcard'); if (!c) return;
    const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
    c.style.transition = 'transform .08s, border-color .3s, box-shadow .3s';
    c.style.transform = `perspective(900px) rotateX(${-py * 8}deg) rotateY(${px * 10}deg) translateY(-8px)`;
  });
  grid.addEventListener('pointerout', e => {
    const c = e.target.closest('.pcard'); if (!c || c.contains(e.relatedTarget)) return;
    c.style.transition = ''; c.style.transform = '';
  });
})();

/* ===== ✨ ปุ่มแม่เหล็ก + รูปโปรไฟล์ขยับตามเมาส์ ===== */
(function magnetic() {
  if (reduceMotion || matchMedia('(hover:none)').matches) return;
  $$('.actions .btn').forEach(b => {
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px,${(e.clientY - r.top - r.height / 2) * .3}px)`;
    });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
  const av = $('.avatar-wrap'), hero = $('#home');
  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
    av.style.transform = `translate(${px * 18}px,${py * 18}px)`;
  });
  hero.addEventListener('pointerleave', () => { av.style.transform = ''; });
})();

/* ===== ✨ เส้นใต้หัวข้อขยายเมื่อเลื่อนถึง ===== */
if ('IntersectionObserver' in window) {
  const hio = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); hio.unobserve(en.target); } }), { threshold: .5 });
  $$('.head').forEach(h => hio.observe(h));
} else { $$('.head').forEach(h => h.classList.add('in')); }

/* ===== ✨ ตัวกรองผลงานตามหมวด ===== */
(function filter() {
  const bar = $('#filters'); if (!bar) return;
  bar.addEventListener('click', e => {
    const b = e.target.closest('[data-f]'); if (!b) return;
    $$('[data-f]', bar).forEach(x => { const on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
    $$('#projectGrid .pcard').forEach(c => {
      c.hidden = b.dataset.f !== 'all' && c.dataset.cat !== b.dataset.f;
      if (!c.hidden && !reduceMotion) { c.classList.remove('pop-in'); void c.offsetWidth; c.classList.add('pop-in'); }
    });
  });
})();

/* ===== ✨ ตัวเลขสถิติวิ่งขึ้น (คำนวณจากข้อมูลจริงใน PROJECTS) ===== */
(function stats() {
  const vals = { projects: PROJECTS.length, tech: new Set(PROJECTS.flatMap(p => p.tags)).size, areas: 3 };
  const els = $$('[data-count]'); if (!els.length) return;
  const run = el => {
    const to = vals[el.dataset.count] ?? 0, t0 = performance.now(), dur = reduceMotion ? 0 : 1200;
    (function f(t) { const k = dur ? Math.min((t - t0) / dur, 1) : 1; el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); })(t0);
  };
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { run(en.target); so.unobserve(en.target); } }), { threshold: .6 });
    els.forEach(el => so.observe(el));
  } else els.forEach(run);
})();

/* ===== ✨ แถบทักษะ: นับจากจำนวนผลงานที่ใช้จริง ===== */
(function skillBars() {
  const box = $('#skillBars'); if (!box) return;
  const n = {}; PROJECTS.forEach(p => p.tags.forEach(t => n[t] = (n[t] || 0) + 1));
  const rows = Object.entries(n).sort((a, b) => b[1] - a[1]).slice(0, 8);
  box.innerHTML = rows.map(([t, c]) => `<li><div class="bl"><span>${t}</span><small>ใช้ใน ${c}/${PROJECTS.length} ผลงาน</small></div><div class="bar"><i style="--w:${c / PROJECTS.length * 100}%"></i></div></li>`).join('');
})();

/* ===== แถบความคืบหน้าการเลื่อน + ปุ่มกลับขึ้นบน ===== */
(function scrollFx() {
  const bar = $('#progress'), top = $('#toTop'), nav = $('.nav'); let tick = false;
  function update() {
    const max = document.documentElement.scrollHeight - innerHeight, y = scrollY;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    top.hidden = y < 500; tick = false;
    nav.classList.toggle('scrolled', y > 10);
  }
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
  top.addEventListener('click', () => scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
  update();
})();

/* ===== ✨ แอนิเมชันการ์ดตอนกรองจบแล้วถอดคลาสออก (ไม่ให้ทับเอฟเฟกต์เอียง 3D) ===== */
$('#projectGrid').addEventListener('animationend', e => {
  if (e.animationName === 'pop') e.target.classList.remove('pop-in');
});

/* ===== ✨ ฟอร์มติดต่อ: เปิดแอปอีเมลพร้อมข้อความ (ดึงอีเมลปลายทางจากลิงก์ mailto ในหน้า) ===== */
(function contactForm() {
  const form = $('#contactForm'), link = $('a[href^="mailto:"]'); if (!form || !link) return;
  const to = link.getAttribute('href').replace('mailto:', '');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#fName').value.trim(), mail = $('#fEmail').value.trim(), msg = $('#fMsg').value.trim();
    const subject = `ติดต่อจากเว็บ Portfolio – ${name}`, body = `${msg}\n\n— ${name} (${mail})`;
    location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
