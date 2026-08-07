/* ============================================
   NEXOVION — script.js
   Mobile menu, scroll effects, animations,
   episode interactions, loading screen
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. LOADING SCREEN ---------- */
  const loader = document.createElement('div');
  loader.id = 'nx-loader';
  loader.innerHTML = `
    <div class="nx-loader-inner">
      <div class="nx-loader-logo">NEXOVION</div>
      <div class="nx-loader-bar"><span></span></div>
    </div>`;
  document.body.prepend(loader);

  const loaderStyle = document.createElement('style');
  loaderStyle.textContent = `
    #nx-loader{
      position:fixed; inset:0; z-index:9999;
      background:#04060a;
      display:flex; align-items:center; justify-content:center;
      transition:opacity .6s ease, visibility .6s ease;
    }
    #nx-loader.nx-hide{ opacity:0; visibility:hidden; }
    .nx-loader-inner{ text-align:center; }
    .nx-loader-logo{
      font-family:'Orbitron','Segoe UI',sans-serif;
      color:#4fc3f7; letter-spacing:4px; font-size:1.2rem; margin-bottom:18px;
    }
    .nx-loader-bar{ width:180px; height:2px; background:#1a2230; overflow:hidden; }
    .nx-loader-bar span{
      display:block; height:100%; width:0%;
      background:linear-gradient(90deg,#4fc3f7,#7cf5da);
      animation:nxLoad 1.1s ease forwards;
    }
    @keyframes nxLoad{ to{ width:100%; } }
    body.nx-loading{ overflow:hidden; }
  `;
  document.head.appendChild(loaderStyle);
  document.body.classList.add('nx-loading');

  window.addEventListener('load', function () {
    setTimeout(function () {
      loader.classList.add('nx-hide');
      document.body.classList.remove('nx-loading');
      setTimeout(() => loader.remove(), 700);
    }, 500);
  });

  /* ---------- 2. MOBILE MENU TOGGLE ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('nx-open');
      navToggle.classList.toggle('nx-active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('nx-open');
        navToggle.classList.remove('nx-active');
      });
    });

    // Inject mobile menu styles (works with existing .nav-links class)
    const navStyle = document.createElement('style');
    navStyle.textContent = `
      @media (max-width:860px){
        .nav-links.nx-open{
          display:flex !important;
          flex-direction:column;
          position:fixed;
          top:70px; left:0; right:0;
          background:rgba(4,6,10,0.97);
          backdrop-filter:blur(14px);
          padding:26px 6vw;
          gap:22px;
          border-bottom:1px solid rgba(79,195,247,0.15);
          z-index:99;
        }
        .nav-toggle.nx-active span:nth-child(1){ transform:translateY(7px) rotate(45deg); }
        .nav-toggle.nx-active span:nth-child(2){ opacity:0; }
        .nav-toggle.nx-active span:nth-child(3){ transform:translateY(-7px) rotate(-45deg); }
        .nav-toggle span{ transition:all .25s ease; }
      }
    `;
    document.head.appendChild(navStyle);
  }

  /* ---------- 3. NAVBAR BACKGROUND ON SCROLL ---------- */
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        nav.style.background = 'rgba(4,6,10,0.9)';
        nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.35)';
      } else {
        nav.style.background = 'rgba(4,6,10,0.55)';
        nav.style.boxShadow = 'none';
      }
    });
  }

  /* ---------- 4. SCROLL-REVEAL ANIMATIONS ---------- */
  const revealTargets = document.querySelectorAll(
    '.mv-card, .founder-card, .ep-card, .section-head, .cta-band h2, .cta-band p'
  );

  revealTargets.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .7s ease, transform .7s ease';
  });

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(function (el) { revealObserver.observe(el); });

  /* ---------- 5. EPISODE CARD CLICK ---------- */
  const episodeCards = document.querySelectorAll('.ep-card');

  episodeCards.forEach(function (card) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function () {
      const title = card.querySelector('.ep-title');
      const num = card.querySelector('.ep-num');
      const titleText = title ? title.textContent.trim() : 'Episode';
      const numText = num ? num.textContent.trim() : '';

      if (titleText.toLowerCase().includes('coming soon')) {
        showToast(numText + ' — Coming Soon. Stay tuned!');
      } else {
        showToast('Opening ' + numText + ': ' + titleText + ' …');
        // Hook your video/episode page redirect here, e.g.:
        // window.location.href = '/episodes/ep1.html';
      }
    });
  });

  /* ---------- 6. TOAST NOTIFICATION HELPER ---------- */
  function showToast(message) {
    let toast = document.getElementById('nx-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'nx-toast';
      document.body.appendChild(toast);

      const toastStyle = document.createElement('style');
      toastStyle.textContent = `
        #nx-toast{
          position:fixed; bottom:30px; left:50%;
          transform:translateX(-50%) translateY(20px);
          background:#0e131b; color:#eef2f6;
          border:1px solid rgba(79,195,247,0.4);
          padding:14px 26px; border-radius:4px;
          font-family:'Roboto Mono',monospace; font-size:0.82rem;
          opacity:0; visibility:hidden;
          transition:opacity .3s ease, transform .3s ease, visibility .3s ease;
          z-index:9998;
          box-shadow:0 8px 30px rgba(0,0,0,0.4);
        }
        #nx-toast.nx-show{
          opacity:1; visibility:visible;
          transform:translateX(-50%) translateY(0);
        }
      `;
      document.head.appendChild(toastStyle);
    }

    toast.textContent = message;
    toast.classList.add('nx-show');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(function () {
      toast.classList.remove('nx-show');
    }, 2800);
  }

  /* ---------- 7. CONTACT FORM VALIDATION ---------- */
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      const emailField = contactForm.querySelector('input[type="email"]');
      const nameField = contactForm.querySelector('input[name="name"]');
      let valid = true;

      if (nameField && nameField.value.trim().length < 2) {
        valid = false;
        nameField.style.borderColor = '#ff6b6b';
      }
      if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
        valid = false;
        emailField.style.borderColor = '#ff6b6b';
      }

      if (!valid) {
        e.preventDefault();
        showToast('Please check your details and try again.');
      }
    });
  }

  /* ---------- 8. SMOOTH ANCHOR SCROLL OFFSET (for fixed nav) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const navHeight = nav ? nav.offsetHeight : 0;
          const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- 9. HERO PARALLAX ON SCROLL ---------- */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = 'translateY(' + (scrollY * 0.3) + 'px)';
      }
    });
  }

});
