/* ==========================================================================
   VERA — Resources Library, Search Overlay & Bookmarking
   ========================================================================== */

(function () {
  'use strict';

  const sampleResources = [
    {
      id: 'res-1',
      title: 'Circadian Alignment: The Role of Morning Light in Rest Quality',
      category: 'Sleep',
      categorySlug: 'sleep',
      readTime: '6 min read',
      author: 'Dr. Alistair Finch',
      summary: 'How 10-15 minutes of early daylight exposure sets melatonin timing, supports recovery, and improves subjective energy.',
      image: 'assets/images/resource_sleep.jpg',
      url: 'resource-details.html'
    },
    {
      id: 'res-2',
      title: 'Active Recovery & Post-Session Joint Decompression',
      category: 'Movement',
      categorySlug: 'movement',
      readTime: '8 min read',
      author: 'Maya Lin, MPT',
      summary: 'Simple restorative mobility flows to encourage tissue hydration and alleviate nervous system tension after demanding days.',
      image: 'assets/images/resource_mobility.jpg',
      url: 'resource-details.html'
    },
    {
      id: 'res-3',
      title: 'The Digital Sunset: Building an Unwinding Evening Ritual',
      category: 'Routines',
      categorySlug: 'routines',
      readTime: '5 min read',
      author: 'Soren Ward',
      summary: 'Practical steps for phasing down high-stimulus screens, lowering ambient lighting, and preparing the body for deep rest.',
      image: 'assets/images/resource_routine.jpg',
      url: 'resource-details.html'
    },
    {
      id: 'res-4',
      title: 'Parasympathetic Nervous System Downregulation',
      category: 'Stress Management',
      categorySlug: 'stress-management',
      readTime: '7 min read',
      author: 'Elena Rostova',
      summary: 'Exploring resonance breathing and extended exhalations to facilitate recovery between high-focus work blocks.',
      image: 'assets/images/about_philosophy.jpg',
      url: 'resource-details.html'
    },
    {
      id: 'res-5',
      title: 'Recovery Basics: Distinguishing Rest from Passive Inaction',
      category: 'Recovery Basics',
      categorySlug: 'recovery-basics',
      readTime: '4 min read',
      author: 'Dr. Alistair Finch',
      summary: 'Why intentional recovery practices recharge mental and physical energy more effectively than passive screen time.',
      image: 'assets/images/hero_wellness.jpg',
      url: 'resource-details.html'
    },
    {
      id: 'res-6',
      title: 'Designing a Sustainable Weekly Wellness Cadence',
      category: 'Wellness Planning',
      categorySlug: 'wellness-planning',
      readTime: '9 min read',
      author: 'Soren Ward',
      summary: 'A framework for balancing active performance days with intentional restoration cycles without rigid burnout.',
      image: 'assets/images/resource_mobility.jpg',
      url: 'resource-details.html'
    }
  ];

  function renderResourceGrid(filterCategory = 'all') {
    const grid = document.getElementById('resourcesGrid');
    if (!grid) return;

    const filtered = filterCategory === 'all'
      ? sampleResources
      : sampleResources.filter(r => r.categorySlug === filterCategory);

    if (filtered.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">No resources found in this category.</div>`;
      return;
    }

    grid.innerHTML = filtered.map(r => `
      <article class="resource-card">
        <div class="resource-thumbnail">
          <img src="${r.image}" alt="${r.title}" loading="lazy">
        </div>
        <div class="resource-content">
          <div class="resource-category">
            <span class="badge badge-sage">${r.category}</span>
          </div>
          <h3 class="resource-title"><a href="${r.url}">${r.title}</a></h3>
          <p class="resource-summary">${r.summary}</p>
          <div class="resource-footer">
            <span>By ${r.author}</span>
            <span>${r.readTime}</span>
          </div>
        </div>
      </article>
    `).join('');
  }

  function initFilterPills() {
    const pills = document.querySelectorAll('.filter-pill[data-category]');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const cat = pill.getAttribute('data-category');
        renderResourceGrid(cat);
      });
    });
  }

  // --- Search Overlay Modal (Universal across all pages) ---
  function initSearchOverlay() {
    const openBtns = document.querySelectorAll('.search-open-btn');
    const overlay = document.getElementById('searchModalOverlay');
    const closeBtn = document.getElementById('closeSearchModalBtn');
    const input = document.getElementById('globalSearchInput');
    const resultsList = document.getElementById('globalSearchResultsList');

    if (!overlay) return;

    function openSearch() {
      overlay.classList.add('open');
      if (input) {
        input.value = '';
        input.focus();
      }
      renderSearchResults('');
    }

    function closeSearch() {
      overlay.classList.remove('open');
    }

    openBtns.forEach(btn => btn.addEventListener('click', openSearch));
    if (closeBtn) closeBtn.addEventListener('click', closeSearch);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeSearch();
    });

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        closeSearch();
      }
    });

    if (input) {
      input.addEventListener('input', () => {
        renderSearchResults(input.value.trim().toLowerCase());
      });
    }

    function renderSearchResults(query) {
      if (!resultsList) return;

      const searchableItems = [
        { title: 'Daily Check-In Tracker', category: 'Tracking', url: 'track.html' },
        { title: 'My Recovery Plan & Goals', category: 'Plan', url: 'my-plan.html' },
        { title: 'Recent Patterns & Trends', category: 'Insights', url: 'insights.html' },
        { title: 'Weekly Progress Report Generator', category: 'Reports', url: 'reports.html' },
        { title: 'Client & Professional Access Sharing', category: 'Privacy & Sharing', url: 'sharing.html' },
        ...sampleResources.map(r => ({ title: r.title, category: `Resource (${r.category})`, url: r.url }))
      ];

      const matches = query
        ? searchableItems.filter(i => i.title.toLowerCase().includes(query) || i.category.toLowerCase().includes(query))
        : searchableItems.slice(0, 6);

      if (matches.length === 0) {
        resultsList.innerHTML = `<li style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">No results found for "${query}"</li>`;
        return;
      }

      resultsList.innerHTML = matches.map(m => `
        <li class="search-result-item">
          <a href="${m.url}">
            <span>${m.title}</span>
            <span class="badge badge-sage">${m.category}</span>
          </a>
        </li>
      `).join('');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderResourceGrid('all');
    initFilterPills();
    initSearchOverlay();
  });

  window.VeraResources = {
    sampleResources,
    renderResourceGrid
  };
})();
