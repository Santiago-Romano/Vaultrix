// ── Vaultrix · main.js ────────────────────────────────────────────────────

// Navbar: cambiar opacidad al hacer scroll
function initNavScroll() {
  const navbar = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
}

// Smooth scroll para links del nav
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// Animación de entrada con IntersectionObserver
function initScrollAnimations() {
  const els = document.querySelectorAll(
    '.feature-card, .testimonial-card, .pricing-card, .stat-item'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// Animación de conteo para stats
function animateCount(el, target, suffix = '') {
  const duration = 1400;
  const start = performance.now();
  const isFloat = target % 1 !== 0;

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = eased * target;
    el.textContent = (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initStatCounters() {
  const stats = [
    { el: document.querySelector('.stats-grid .stat-item:nth-child(1) .stat-num'), target: 68, suffix: '%' },
    { el: document.querySelector('.stats-grid .stat-item:nth-child(2) .stat-num'), target: 2.1, suffix: 'M' },
    { el: document.querySelector('.stats-grid .stat-item:nth-child(3) .stat-num'), target: 99.9, suffix: '%' },
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cfg = stats.find(s => s.el === entry.target);
        if (cfg) animateCount(cfg.el, cfg.target, cfg.suffix);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(cfg => { if (cfg.el) observer.observe(cfg.el); });
}

// Botones CTA — feedback visual
function initButtons() {
  document.querySelectorAll('.btn-plan, .btn-accent-lg, .btn-primary-lg').forEach(btn => {
    btn.addEventListener('click', function () {
      const original = this.innerHTML;
      this.innerHTML = '<span>Redirigiendo...</span>';
      this.style.opacity = '0.7';
      setTimeout(() => {
        this.innerHTML = original;
        this.style.opacity = '';
      }, 1800);
    });
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initSmoothScroll();
  initScrollAnimations();
  initStatCounters();
  initButtons();
});