/* ==========================================================================
   VERA — Main Application Controller & Global Interactions
   ========================================================================== */

(function () {
  'use strict';

  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar-vera');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  function initMobileDrawer() {
    const hamburgerBtn = document.getElementById('hamburgerToggleBtn');
    const overlay = document.getElementById('mobileNavOverlay');
    const closeBtn = document.getElementById('closeMobileNavBtn');

    if (!hamburgerBtn || !overlay) return;

    function openDrawer() {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeDrawer();
    });
  }

  function highlightActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Desktop & Mobile Nav Links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  function initBackToTop() {
    let btn = document.getElementById('backToTopBtn');
    if (!btn) {
      btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'backToTopBtn';
      btn.className = 'back-to-top-btn';
      btn.setAttribute('aria-label', 'Back to top');
      btn.title = 'Back to top';
      btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
      document.body.appendChild(btn);
    }

    const checkScroll = () => {
      if (window.scrollY > 280) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initMobileDrawer();
    highlightActiveNavLink();
    initBackToTop();
  });
})();
