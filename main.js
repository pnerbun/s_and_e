// ═══ Smith + Elliot — shared site JS ═══
// No inline handlers: the site's CSP is `script-src 'self'`, which blocks
// onclick="" attributes. Everything is wired up with listeners here.

// ── Scroll-triggered fade-up ──
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); fadeObserver.unobserve(e.target); }
  });
}, { threshold: 0.12 });

// ── Nav background on scroll ──
function onScroll() {
  const nav = document.getElementById('site-nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
}

// ── Mobile menu ──
function setMenu(open) {
  const menu = document.getElementById('mobile-menu');
  const trigger = document.querySelector('[data-menu-toggle]');
  if (!menu) return;
  menu.classList.toggle('open', open);              // CSS owns the layout (display:flex)
  document.body.classList.toggle('menu-open', open); // lock background scroll
  if (trigger) trigger.setAttribute('aria-expanded', String(open));
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const menu = document.getElementById('mobile-menu');

  document.querySelector('[data-menu-toggle]')?.addEventListener('click', () => {
    setMenu(!menu?.classList.contains('open'));
  });
  document.querySelector('[data-menu-close]')?.addEventListener('click', () => setMenu(false));

  // Any link inside the menu closes it (covers same-page #anchors too)
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  // Esc closes; returning to desktop width resets state
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 860) setMenu(false); });
});
