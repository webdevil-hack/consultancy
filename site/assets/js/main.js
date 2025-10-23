// Core site interactions for M.S Enterprises
(function(){
  const navToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if(navToggle && navLinks){
    navToggle.addEventListener('click', ()=>{
      navLinks.classList.toggle('open');
    });
  }

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
