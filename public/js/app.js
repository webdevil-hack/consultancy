(function(){
  // Theme toggle
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);

  const themeToggle = document.querySelector('[data-theme-toggle]');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // Mobile nav
  const burger = document.querySelector('[data-burger]');
  const links = document.querySelector('[data-nav-links]');
  if (burger && links) {
    burger.addEventListener('click', () => links.classList.toggle('open'));
  }

  // Active nav link by URL
  const currentPath = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.endsWith(currentPath)) {
      a.classList.add('active');
    }
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Simple tilt interaction
  const tilts = document.querySelectorAll('[data-tilt]');
  tilts.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) - 0.5;
      const y = ((e.clientY - rect.top) / rect.height) - 0.5;
      el.style.transform = `rotateX(${-(y*8)}deg) rotateY(${x*8}deg) translateZ(0)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'rotateX(0) rotateY(0)';
    });
  });

  // Smooth scroll for hash links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id && id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
})();
