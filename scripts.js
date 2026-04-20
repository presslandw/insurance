/**
 * Chris Walker Insurance Services - Core UI Scripts
 * Optimized for April 2026
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Reveal on Scroll (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08 // Slightly increased for smoother triggering
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach((element) => {
    revealObserver.observe(element);
  });

  // 2. Header Scroll Effect
  const header = document.getElementById('main-header');
  if (header) {
    const updateHeader = () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader(); // Check initial state
  }

  // 3. Mobile Menu Logic
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    const closeMenu = () => {
      mobileToggle.classList.remove('active');
      navLinks.classList.remove('active');
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  // 5. Tally Form Initialization & Fallback
  const initTally = () => {
    if (typeof Tally !== 'undefined' && Tally.loadEmbeds) {
      Tally.loadEmbeds();
    } else {
      // Fallback: If Tally script hasn't loaded or failed, just set the src natively
      document.querySelectorAll('iframe[data-tally-src]:not([src])').forEach(iframe => {
        iframe.src = iframe.dataset.tallySrc;
      });
    }
  };
  
  // Attempt initialization on DOM ready, and again when all assets (including async tally.js) finish loading
  initTally();
  window.addEventListener('load', initTally);

});

