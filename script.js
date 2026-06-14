// ===== SCROLL REVEAL =====
function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}

// ===== MOBILE BURGER =====
const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');

function closeNav() {
  navMenu?.classList.remove('open');
  burger?.classList.remove('active');
  document.querySelectorAll('.has-dropdown').forEach(d => d.classList.remove('open'));
}

burger?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  burger.classList.toggle('active');
  if (!isOpen) {
    document.querySelectorAll('.has-dropdown').forEach(d => d.classList.remove('open'));
  }
});

document.querySelectorAll('.has-dropdown > a').forEach(link => {
  link.addEventListener('click', e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const parent = link.parentElement;
      const isOpen = parent.classList.contains('open');
      document.querySelectorAll('.has-dropdown').forEach(d => d.classList.remove('open'));
      if (!isOpen) parent.classList.add('open');
    }
  });
});

document.addEventListener('click', e => {
  if (!e.target.closest('#navMenu') && !e.target.closest('#burger')) {
    closeNav();
  }
});

// ===== TABS =====
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(tab)?.classList.add('active');
  });
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.count').forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current).toLocaleString('tr-TR');
    }, 16);
  });
}
const countersSection = document.querySelector('.counters');
if (countersSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCounters(); observer.disconnect(); }
    });
  }, { threshold: 0.3 });
  observer.observe(countersSection);
}

document.addEventListener('DOMContentLoaded', initReveal);
