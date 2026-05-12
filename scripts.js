/**
 * Chris Walker Insurance Services - Core UI Scripts
 * Optimized for April 2026
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Reveal on Scroll (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('active'));
  } else {
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

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

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
      mobileToggle.setAttribute('aria-expanded', 'false');
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileToggle.classList.toggle('active');
      navLinks.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
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

  // 4. Email Copy Enhancement
  document.querySelectorAll('.contact-copy-email').forEach((button) => {
    const label = button.querySelector('span');
    const originalText = label ? label.textContent : '';
    const copyValue = button.dataset.copyValue || originalText;

    button.addEventListener('click', async () => {
      if (!navigator.clipboard || !copyValue) {
        window.location.href = `mailto:${copyValue}`;
        return;
      }

      try {
        await navigator.clipboard.writeText(copyValue);
        if (label) {
          label.textContent = 'Copied!';
          window.setTimeout(() => {
            label.textContent = originalText;
          }, 2000);
        }
      } catch (error) {
        window.location.href = `mailto:${copyValue}`;
      }
    });
  });

  // 5. Tally Form Initialization & Fallback
  const initTally = () => {
    if (typeof Tally !== 'undefined') {
      Tally.loadEmbeds();
    } else {
      // If Tally isn't loaded yet, try again in a bit
      // Don't set src manually immediately to avoid interfering with Tally script
      setTimeout(() => {
        if (typeof Tally !== 'undefined') {
          Tally.loadEmbeds();
        } else {
          // Final fallback: Set src if script is blocked
          document.querySelectorAll('iframe[data-tally-src]:not([src])').forEach(iframe => {
            iframe.src = iframe.dataset.tallySrc;
          });
        }
      }, 1000);
    }
  };
  
  // Try on load
  window.addEventListener('load', initTally);
  
  // Listen for height messages from Tally (extra insurance)
  window.addEventListener('message', (e) => {
    if (e.data && typeof e.data === 'string' && e.data.includes('tally-height')) {
      try {
        const data = JSON.parse(e.data);
        const iframe = document.querySelector(`iframe[src*="${data.formId}"], iframe[data-tally-src*="${data.formId}"]`);
        if (iframe && data.height) {
          iframe.style.height = data.height + 'px';
        }
      } catch (err) {
        // Silently fail if not a valid Tally height message
      }
    }
  });

});
