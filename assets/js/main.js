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

  document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initMobileDrawer();
    highlightActiveNavLink();
  });
})();
