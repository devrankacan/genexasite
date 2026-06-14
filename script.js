// Mobile burger menu
const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');

burger?.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Mobile dropdown toggle
document.querySelectorAll('.has-dropdown > a').forEach(link => {
  link.addEventListener('click', e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      link.parentElement.classList.toggle('open');
    }
  });
});

// Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(tab)?.classList.add('active');
  });
});

// Counter animation
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

// Trigger counters when section visible
const countersSection = document.querySelector('.counters');
if (countersSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(countersSection);
}

// Close mobile menu when clicking outside
document.addEventListener('click', e => {
  if (!e.target.closest('#navMenu') && !e.target.closest('#burger')) {
    navMenu?.classList.remove('open');
  }
});
