/* jshint esversion: 6 */
'use strict';

// ─── Countdown ────────────────────────────────────────────────────────────────
(function initCountdown() {
  const weddingDate = new Date('2025-11-15T16:00:00');

  const pad = (n) => String(n).padStart(2, '0');

  const daysEl    = document.getElementById('cd-days');
  const hoursEl   = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  if (!daysEl) return;

  function tick() {
    const now  = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      daysEl.textContent    = '00';
      hoursEl.textContent   = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000)  / 60000);
    const seconds = Math.floor((diff % 60000)    / 1000);

    daysEl.textContent    = pad(days);
    hoursEl.textContent   = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  tick();
  setInterval(tick, 1000);
}());

// ─── Sticky Nav ───────────────────────────────────────────────────────────────
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  function onScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}());

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: just show all
    elements.forEach((el) => el.classList.add('visible'));
  }
}());

// ─── RSVP Form ────────────────────────────────────────────────────────────────
(function initRSVP() {
  const form    = document.getElementById('rsvp-form');
  const success = document.getElementById('rsvp-success');
  if (!form) return;

  function validateField(id, errorId, condition, message) {
    const field = document.getElementById(id);
    const err   = document.getElementById(errorId);
    if (!field || !err) return true;

    if (condition(field)) {
      field.classList.remove('error');
      err.textContent = '';
      return true;
    }
    field.classList.add('error');
    err.textContent = message;
    return false;
  }

  function isEmailValid(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombreField    = document.getElementById('nombre');
    const emailField     = document.getElementById('email');
    const asistenciaField = document.getElementById('asistencia');

    const valid = [
      validateField(
        'nombre', 'nombre-error',
        (f) => f.value.trim().length >= 2,
        'Por favor ingresa tu nombre completo.'
      ),
      validateField(
        'email', 'email-error',
        (f) => isEmailValid(f.value.trim()),
        'Por favor ingresa un correo electrónico válido.'
      ),
      validateField(
        'asistencia', 'asistencia-error',
        (f) => f.value !== '',
        'Por favor confirma si asistirás.'
      ),
    ].every(Boolean);

    if (!valid) return;

    // Simulate submission
    const btn = form.querySelector('.btn-primary');
    if (btn) {
      btn.textContent = 'Enviando…';
      btn.disabled    = true;
    }

    setTimeout(function () {
      form.classList.add('hidden');
      success.classList.remove('hidden');
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1200);
  });

  // Live validation feedback
  ['nombre', 'email', 'asistencia'].forEach(function (id) {
    const field = document.getElementById(id);
    if (!field) return;
    field.addEventListener('blur', function () {
      const errorId = id + '-error';
      if (id === 'nombre') {
        validateField(id, errorId, (f) => f.value.trim().length >= 2, 'Por favor ingresa tu nombre completo.');
      } else if (id === 'email') {
        validateField(id, errorId, (f) => isEmailValid(f.value.trim()), 'Por favor ingresa un correo electrónico válido.');
      } else if (id === 'asistencia') {
        validateField(id, errorId, (f) => f.value !== '', 'Por favor confirma si asistirás.');
      }
    });
  });
}());

// ─── Gallery Lightbox ─────────────────────────────────────────────────────────
(function initGallery() {
  const items     = document.querySelectorAll('.gallery-item');
  const lightbox  = document.getElementById('lightbox');
  const overlay   = document.getElementById('lightbox-overlay');
  const lbContent = document.getElementById('lb-content');
  const lbClose   = document.getElementById('lb-close');
  const lbPrev    = document.getElementById('lb-prev');
  const lbNext    = document.getElementById('lb-next');

  if (!items.length || !lightbox) return;

  let current = 0;

  const colors = [
    'linear-gradient(135deg, #8b6f47 0%, #c9a96e 100%)',
    'linear-gradient(135deg, #5a4535 0%, #8b6f47 100%)',
    'linear-gradient(135deg, #c9a96e 0%, #e8d5b0 100%)',
    'linear-gradient(135deg, #3d2f22 0%, #7a6555 100%)',
    'linear-gradient(135deg, #7a6555 0%, #c9a96e 100%)',
    'linear-gradient(135deg, #e8d5b0 0%, #c9a96e 100%)',
  ];

  function openLightbox(index) {
    current = index;
    updateContent();
    lightbox.classList.remove('hidden');
    overlay.classList.remove('hidden');
    requestAnimationFrame(() => overlay.classList.add('open'));
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('open');
    setTimeout(function () {
      lightbox.classList.add('hidden');
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  }

  function updateContent() {
    lbContent.style.background = colors[current] || colors[0];
    lbContent.innerHTML =
      '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;' +
      'font-family:\'Cormorant Garamond\',serif;font-size:2rem;color:rgba(255,255,255,0.7)">' +
      'Foto ' + (current + 1) + ' · I &amp; D</div>';
  }

  function navigate(dir) {
    current = (current + dir + items.length) % items.length;
    updateContent();
  }

  items.forEach(function (item) {
    item.addEventListener('click', function () {
      openLightbox(parseInt(item.dataset.index, 10) || 0);
    });
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(parseInt(item.dataset.index, 10) || 0);
      }
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', function (e) { e.stopPropagation(); navigate(-1); });
  lbNext.addEventListener('click', function (e) { e.stopPropagation(); navigate(1); });

  document.addEventListener('keydown', function (e) {
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   navigate(-1);
    if (e.key === 'ArrowRight')  navigate(1);
  });
}());

// ─── Smooth active nav highlight ──────────────────────────────────────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#nav ul a');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.style.color = 'var(--gold)';
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => observer.observe(section));
}());
