// Core site interactions for M.S Enterprises
(function(){
  const navToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if(navToggle && navLinks){
    navToggle.addEventListener('click', ()=>{
      navLinks.classList.toggle('open');
    });
  }

  // Theme toggle with localStorage persistence
  const root = document.documentElement;
  const saved = localStorage.getItem('ms-theme');
  if(saved){ root.setAttribute('data-theme', saved); }
  document.querySelectorAll('[data-action="toggle-theme"]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const current = root.getAttribute('data-theme');
      const next = current === 'black' ? '' : 'black';
      if(next){ root.setAttribute('data-theme', next); } else { root.removeAttribute('data-theme'); }
      localStorage.setItem('ms-theme', next);
    });
  });

  // Sticky active link highlight
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(a=>a.addEventListener('click', (e)=>{
    const targetId = a.getAttribute('href').slice(1);
    const el = document.getElementById(targetId);
    if(el){
      e.preventDefault();
      window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth'});
    }
  }));

  // Reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    for(const entry of entries){
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    }
  }, {rootMargin:'-10% 0px -10% 0px', threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Simple form validation
  document.querySelectorAll('form[data-validate]')?.forEach((form)=>{
    form.addEventListener('submit',(e)=>{
      const required = form.querySelectorAll('[required]');
      let ok = true;
      required.forEach((input)=>{
        if(!input.value?.trim()){
          ok = false;
          input.setAttribute('aria-invalid','true');
          input.style.outline = '2px solid #ef4444';
        } else {
          input.removeAttribute('aria-invalid');
          input.style.outline = '';
        }
      });
      if(!ok){
        e.preventDefault();
      }
    });
  });
})();
