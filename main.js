// ═══ Smith + Elliot — shared site JS ═══

// Scroll-triggered fade-up
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fadeObserver.unobserve(e.target); } });
}, { threshold: 0.12 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));
});

// Nav shrink / background on scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// Mobile nav
function toggleMenu() {
  const m = document.getElementById('mobile-menu');
  if (m) m.style.display = m.style.display === 'block' ? 'none' : 'block';
}
function closeMenu() {
  const m = document.getElementById('mobile-menu');
  if (m) m.style.display = 'none';
}
