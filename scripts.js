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
      // Never hide the first screen or depend on JavaScript to expose content.
      if (element.getBoundingClientRect().top < window.innerHeight) {
        element.classList.add('active');
      } else {
        element.classList.add('reveal-pending');
        revealObserver.observe(element);
      }
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
    navLinks.id = navLinks.id || 'primary-navigation';
    mobileToggle.setAttribute('aria-controls', navLinks.id);
    mobileToggle.setAttribute('aria-expanded', 'false');
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

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
        mobileToggle.focus();
      }
    });

    window.matchMedia('(max-width: 1080px)').addEventListener('change', closeMenu);
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
    if (e.origin === 'https://tally.so' && typeof e.data === 'string' && e.data.includes('tally-height')) {
      try {
        const data = JSON.parse(e.data);
        if (!data || typeof data.formId !== 'string' || !/^[a-zA-Z0-9]+$/.test(data.formId)) return;
        const height = Number(data.height);
        if (!Number.isFinite(height) || height <= 0 || height > 100000) return;
        document.querySelectorAll('iframe[data-tally-src], iframe[src]').forEach((iframe) => {
          if (iframe.contentWindow !== e.source) return;
          const url = new URL(iframe.getAttribute('src') || iframe.dataset.tallySrc, window.location.href);
          if (url.origin === e.origin && url.pathname === `/embed/${data.formId}`) {
            iframe.style.height = `${height}px`;
          }
        });
      } catch (err) {
        // Silently fail if not a valid Tally height message
      }
    }
  });

  // 6. Mobile Footer Accordion Interactivity
  const footerMedia = window.matchMedia('(max-width: 768px)');
  document.querySelectorAll('.main-footer h4').forEach((heading, index) => {
    const list = heading.nextElementSibling;
    if (!list || list.tagName !== 'UL') return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'footer-accordion-toggle';
    button.textContent = heading.textContent;
    list.id = list.id || `footer-links-${index + 1}`;
    button.setAttribute('aria-controls', list.id);

    const sync = () => {
      const mobile = footerMedia.matches;
      const expanded = !mobile || heading.classList.contains('active');
      // Preserve heading semantics on desktop; use a native disclosure on mobile.
      if (mobile && !heading.contains(button)) heading.replaceChildren(button);
      if (!mobile && heading.contains(button)) heading.textContent = button.textContent;
      heading.classList.toggle('accordion-ready', mobile);
      button.setAttribute('aria-expanded', String(expanded));
      list.hidden = !expanded;
    };
    button.addEventListener('click', () => {
      heading.classList.toggle('active');
      sync();
    });
    footerMedia.addEventListener('change', sync);
    sync();
  });

});
