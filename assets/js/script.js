/* ===================================================================
   7BURGERS — SITE SCRIPT
   Sticky nav, mobile menu, scroll-reveal animations, gallery lightbox,
   active link highlighting, back-to-top.
=================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setFooterYear();
    initStickyHeader();
    initMobileNav();
    initRevealAnimations();
    initActiveNavLink();
    initGallery();
    initBackToTop();
  }

  /* -----------------------------------------------------------------
     Footer year
  ----------------------------------------------------------------- */
  function setFooterYear() {
    var yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  /* -----------------------------------------------------------------
     Sticky header: add background once user scrolls past hero
  ----------------------------------------------------------------- */
  function initStickyHeader() {
    var header = document.getElementById('site-header');
    if (!header) return;

    var onScroll = function () {
      if (window.scrollY > 40) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* -----------------------------------------------------------------
     Mobile navigation toggle
  ----------------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    var closeMenu = function () {
      toggle.classList.remove('is-active');
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    var openMenu = function () {
      toggle.classList.add('is-active');
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when a link is tapped
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    // Close when resizing to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) closeMenu();
    });
  }

  /* -----------------------------------------------------------------
     Scroll-reveal animations via IntersectionObserver
  ----------------------------------------------------------------- */
  function initRevealAnimations() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    // Apply stagger delay from data-reveal-delay
    items.forEach(function (el) {
      var delay = el.getAttribute('data-reveal-delay');
      if (delay) {
        el.style.setProperty('--reveal-delay', delay);
      }
    });

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* -----------------------------------------------------------------
     Active nav link highlighting based on scroll position
  ----------------------------------------------------------------- */
  function initActiveNavLink() {
    var sections = document.querySelectorAll('main section[id]');
    var links = document.querySelectorAll('.navbar__link');
    if (!sections.length || !links.length) return;

    var linkMap = {};
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        linkMap[href.slice(1)] = link;
      }
    });

    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkMap[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('is-active'); });
          link.classList.add('is-active');
        }
      });
    }, {
      threshold: 0,
      rootMargin: '-45% 0px -50% 0px'
    });

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* -----------------------------------------------------------------
     Gallery: build hover overlay + lightbox
  ----------------------------------------------------------------- */
  function initGallery() {
    var items = document.querySelectorAll('.gallery__item');
    if (!items.length) return;

    var lightbox = document.getElementById('lightbox');
    var lightboxImage = document.getElementById('lightboxImage');
    var lightboxCaption = document.getElementById('lightboxCaption');
    var lightboxClose = document.getElementById('lightboxClose');

    items.forEach(function (item) {
      var caption = item.getAttribute('data-caption') || item.getAttribute('data-label') || '';

      // Build hover overlay with caption + zoom icon
      var overlay = document.createElement('div');
      overlay.className = 'gallery__item-overlay';
      overlay.innerHTML = '<span class="gallery__item-caption"></span>';
      overlay.querySelector('.gallery__item-caption').textContent = caption;
      item.appendChild(overlay);

      var zoomIcon = document.createElement('span');
      zoomIcon.className = 'gallery__zoom-icon';
      zoomIcon.setAttribute('aria-hidden', 'true');
      zoomIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>';
      item.appendChild(zoomIcon);

      item.setAttribute('aria-label', 'View ' + caption);

      item.addEventListener('click', function () {
        var img = item.querySelector('img');
        // Only open lightbox if a real image has loaded successfully
        if (!img || item.classList.contains('img-missing')) return;

        lightboxImage.src = img.currentSrc || img.src;
        lightboxImage.alt = img.alt || caption;
        lightboxCaption.textContent = caption;
        openLightbox();
      });
    });

    function openLightbox() {
      lightbox.hidden = false;
      requestAnimationFrame(function () {
        lightbox.classList.add('is-open');
      });
      document.body.style.overflow = 'hidden';
      lightboxClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(function () {
        lightbox.hidden = true;
        lightboxImage.src = '';
      }, 250);
    }

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
    });
  }

  /* -----------------------------------------------------------------
     Back to top button
  ----------------------------------------------------------------- */
  function initBackToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;

    var onScroll = function () {
      if (window.scrollY > 600) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

})();
