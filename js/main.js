/* ============================================================
   EMPYREAN SERVICES — MAIN JAVASCRIPT
   ============================================================ */

// ============================================================
// NAVIGATION — STICKY ON SCROLL
// ============================================================

const navbar = document.getElementById('navbar');
const navHamburger = document.getElementById('navHamburger');
const navLinks = document.querySelector('.nav-links');

let lastScrollY = 0;
let ticking = false;

function updateNavbar() {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(updateNavbar);
    ticking = true;
  }

  setTimeout(() => {
    ticking = false;
  }, 16);
});

// Mobile menu toggle
if (navHamburger && navLinks) {
  navHamburger.addEventListener('click', (e) => {
    e.preventDefault();
    const isExpanded = navHamburger.getAttribute('aria-expanded') === 'true';
    navHamburger.setAttribute('aria-expanded', !isExpanded);

    if (!isExpanded) {
      navLinks.style.display = 'flex';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.flexDirection = 'column';
      navLinks.style.gap = '0';
      navLinks.style.background = 'rgba(15, 31, 61, 0.98)';
      navLinks.style.padding = '20px';
      navLinks.style.backdropFilter = 'blur(20px)';
      navLinks.style.justifyContent = 'flex-start';
    } else {
      navLinks.style.display = 'none';
    }
  });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navHamburger && navLinks) {
      navHamburger.setAttribute('aria-expanded', 'false');
      navLinks.style.display = 'none';
    }
  });
});

// ============================================================
// SMOOTH SCROLL ANCHORS
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================================
// SERVICE CARDS — STAGGERED ANIMATION
// ============================================================

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach((card, index) => {
  const delay = index * 80;
  card.style.setProperty('--delay', delay);
  card.setAttribute('data-delay', delay);
});

// ============================================================
// TESTIMONIALS — STAGGERED ANIMATION
// ============================================================

const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialCards.forEach((card, index) => {
  const delay = index * 80;
  card.style.setProperty('--delay', delay);
  card.setAttribute('data-delay', delay);
});

// ============================================================
// INTERSECTION OBSERVER — REVEAL ON SCROLL
// ============================================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe service cards, testimonials, and other reveal elements
document.querySelectorAll(
  '.service-card, .testimonial-card, .reveal-group, .reveal-item, .portfolio-item'
).forEach(el => {
  revealObserver.observe(el);
});

// ============================================================
// FADE-UP ANIMATION FOR ELEMENTS
// ============================================================

const elementsToAnimate = document.querySelectorAll(
  '.section-header, .why-copy, .designers-copy'
);

elementsToAnimate.forEach((element, index) => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(24px)';
  element.style.transition = `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`;

  setTimeout(() => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }, 100);
});

// ============================================================
// PORTFOLIO HOVER EFFECT
// ============================================================

const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.zIndex = '10';
  });

  item.addEventListener('mouseleave', function() {
    this.style.zIndex = 'auto';
  });
});

// ============================================================
// SCROLL INDICATOR IN HERO
// ============================================================

function updateScrollIndicator() {
  const scrollTrack = document.querySelector('.scroll-track');
  if (!scrollTrack) return;

  const windowHeight = window.innerHeight;
  const heroHeight = document.querySelector('.hero')?.offsetHeight || windowHeight;
  const progress = Math.min(window.scrollY / heroHeight, 1);

  const thumb = scrollTrack.querySelector('.scroll-thumb');
  if (thumb) {
    const trackHeight = scrollTrack.offsetHeight;
    const thumbHeight = thumb.offsetHeight;
    const moveDistance = (trackHeight - thumbHeight) * progress;
    thumb.style.transform = `translateY(${moveDistance}px)`;
  }
}

window.addEventListener('scroll', updateScrollIndicator, { passive: true });

// ============================================================
// PARALLAX EFFECT (SUBTLE)
// ============================================================

const parallaxElements = document.querySelectorAll('[data-parallax]');

function updateParallax() {
  parallaxElements.forEach(element => {
    const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
    const yOffset = window.scrollY * speed;
    element.style.transform = `translateY(${yOffset}px)`;
  });
}

if (parallaxElements.length > 0) {
  window.addEventListener('scroll', updateParallax, { passive: true });
}

// ============================================================
// FORM HANDLING (IF NEEDED)
// ============================================================

const forms = document.querySelectorAll('form');

forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted');
  });
});

// ============================================================
// ACCESSIBILITY — REDUCE MOTION
// ============================================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  document.documentElement.style.scrollBehavior = 'auto';
  document.querySelectorAll('[style*="transition"], [style*="animation"]').forEach(el => {
    el.style.transition = 'none';
    el.style.animation = 'none';
  });
}

// ============================================================
// LAZY LOADING — IMAGES (IF ANY)
// ============================================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================================
// UTILITY — DETECT TOUCH DEVICE
// ============================================================

const isTouchDevice = () => {
  return (
    (typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        (typeof document !== 'undefined' &&
          'ontouchstart' in document.documentElement))) ||
    (typeof navigator !== 'undefined' &&
      (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0))
  );
};

if (isTouchDevice()) {
  document.body.classList.add('touch-device');
}

// ============================================================
// ANALYTICS TRACKING (PLACEHOLDER)
// ============================================================

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const text = btn.textContent.trim();
    console.log(`Button clicked: ${text}`);
    // Send to analytics service here
  });
});

// ============================================================
// CUSTOM LOGGER
// ============================================================

const log = (message, type = 'info') => {
  if (typeof console !== 'undefined') {
    const styles = {
      info: 'color: #b8975a; font-weight: bold;',
      success: 'color: #4ade80; font-weight: bold;',
      warning: 'color: #facc15; font-weight: bold;',
      error: 'color: #ef4444; font-weight: bold;'
    };
    console.log(`%c[Empyrean] ${message}`, styles[type] || styles.info);
  }
};

log('Empyrean Services homepage initialized', 'success');

// ============================================================
// READY STATE
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  log('DOM fully loaded', 'success');
});

window.addEventListener('load', () => {
  log('Page fully loaded', 'success');
  // Remove any loading states here
});

// ============================================================
// PERFORMANCE MONITORING
// ============================================================

if ('PerformanceObserver' in window) {
  try {
    const perfObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 3000) {
          log(`Long task detected: ${entry.name} (${Math.round(entry.duration)}ms)`, 'warning');
        }
      }
    });

    perfObserver.observe({ entryTypes: ['longtask'] });
  } catch (e) {
    // LongTask API not supported
  }
}
