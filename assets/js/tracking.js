/* ==========================================================================
   VERA — Daily Tracking & Activity Management
   ========================================================================== */

(function () {
  'use strict';

  const CHECKINS_KEY = 'vera_daily_checkins';
  const ACTIVITIES_KEY = 'vera_custom_activities';

  // Seed sample records for a realistic experience
  function getCheckins() {
    const raw = localStorage.getItem(CHECKINS_KEY);
    if (!raw) {
      const seedData = [
        { id: 'chk-1', date: '2026-10-02', energy: 8, rested: 'Well Rested', recoveryFeeling: 'Strong', activeScore: 4, activities: ['Mobility 20m', 'Hydration Goal', 'Evening Breathwork'], note: 'Slept deeply, gentle 30m nature walk during lunch.' },
        { id: 'chk-2', date: '2026-10-01', energy: 6, rested: 'Moderately Rested', recoveryFeeling: 'Steady', activeScore: 3, activities: ['Hydration Goal', 'Rest / Nap', 'Sleep Routine'], note: 'Busy workday, focused on early bedtime.' },
        { id: 'chk-3', date: '2026-09-30', energy: 7, rested: 'Well Rested', recoveryFeeling: 'Refreshed', activeScore: 4, activities: ['Mobility 20m', 'Hydration Goal', 'Movement Walk'], note: 'Lower back felt lighter after morning stretching.' }
      ];
      localStorage.setItem(CHECKINS_KEY, JSON.stringify(seedData));
      return seedData;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  function saveCheckin(entry) {
    const list = getCheckins();
    list.unshift(entry);
    localStorage.setItem(CHECKINS_KEY, JSON.stringify(list));
  }

  // --- Step Wizard State Machine ---
  let currentStep = 1;
  const totalSteps = 5;

  function initCheckinWizard() {
    const wizardForm = document.getElementById('checkinWizardForm');
    if (!wizardForm) return;

    const btnNext = document.getElementById('wizardNextBtn');
    const btnPrev = document.getElementById('wizardPrevBtn');
    const btnSave = document.getElementById('wizardSaveBtn');
    const progressBar = document.getElementById('wizardProgressBar');
    const stepNodes = document.querySelectorAll('.wizard-step-node');
    const panels = document.querySelectorAll('.wizard-step-panel');

    function updateWizardUI() {
      panels.forEach((p, idx) => {
        p.classList.toggle('active', idx + 1 === currentStep);
      });

      stepNodes.forEach((node, idx) => {
        const stepNum = idx + 1;
        node.classList.toggle('active', stepNum === currentStep);
        node.classList.toggle('completed', stepNum < currentStep);
      });

      if (progressBar) {
        progressBar.style.width = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;
      }

      if (btnPrev) btnPrev.style.display = currentStep === 1 ? 'none' : 'inline-flex';
      if (btnNext) btnNext.style.display = currentStep === totalSteps ? 'none' : 'inline-flex';
      if (btnSave) btnSave.style.display = currentStep === totalSteps ? 'inline-flex' : 'none';

      // If on review step, populate summary
      if (currentStep === 5) {
        populateReviewSummary();
      }
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (currentStep < totalSteps) {
          currentStep++;
          updateWizardUI();
        }
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (currentStep > 1) {
          currentStep--;
          updateWizardUI();
        }
      });
    }

    // Step node direct click
    stepNodes.forEach((node, idx) => {
      node.addEventListener('click', () => {
        currentStep = idx + 1;
        updateWizardUI();
      });
    });

    // Handle energy slider display
    const energySlider = document.getElementById('energySlider');
    const energyDisplay = document.getElementById('energyValDisplay');
    if (energySlider && energyDisplay) {
      energySlider.addEventListener('input', () => {
        energyDisplay.textContent = `${energySlider.value}/10`;
      });
    }

    // Handle segmented buttons
    document.querySelectorAll('.segmented-group').forEach(group => {
      const buttons = group.querySelectorAll('.segmented-btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
        });
      });
    });

    // Handle activity cards toggle
    document.querySelectorAll('.activity-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-action-remove')) return;
        card.classList.toggle('checked');
      });
    });

    // Wizard submit
    wizardForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const energy = energySlider ? parseInt(energySlider.value, 10) : 7;
      const restedBtn = document.querySelector('[data-type="rested"].selected');
      const rested = restedBtn ? restedBtn.textContent.trim() : 'Well Rested';
      
      const recoveryBtn = document.querySelector('[data-type="recovery"].selected');
      const recovery = recoveryBtn ? recoveryBtn.textContent.trim() : 'Steady & Restorative';

      const selectedActivities = [];
      document.querySelectorAll('.activity-card.checked').forEach(c => {
        const title = c.querySelector('.activity-name');
        if (title) selectedActivities.push(title.textContent.trim());
      });

      const noteText = document.getElementById('dailyJournalNote') ? document.getElementById('dailyJournalNote').value : '';

      const newEntry = {
        id: 'chk-' + Date.now(),
        date: new Date().toISOString().split('T')[0],
        energy: energy,
        rested: rested,
        recoveryFeeling: recovery,
        activeScore: selectedActivities.length,
        activities: selectedActivities,
        note: noteText
      };

      saveCheckin(newEntry);

      if (window.showToast) {
        window.showToast('Check-In Saved', 'Your wellness entry for today has been recorded.');
      }

      const saveConfirmBox = document.getElementById('saveConfirmation');
      if (saveConfirmBox) {
        saveConfirmBox.style.display = 'block';
        wizardForm.style.display = 'none';
      }

      renderRecentCheckinLogs();
    });

    updateWizardUI();
  }

  function populateReviewSummary() {
    const summaryContainer = document.getElementById('wizardReviewContainer');
    if (!summaryContainer) return;

    const energySlider = document.getElementById('energySlider');
    const energyVal = energySlider ? energySlider.value : '7';
    
    const restedBtn = document.querySelector('[data-type="rested"].selected');
    const restedVal = restedBtn ? restedBtn.textContent.trim() : 'Well Rested';

    const recoveryBtn = document.querySelector('[data-type="recovery"].selected');
    const recoveryVal = recoveryBtn ? recoveryBtn.textContent.trim() : 'Steady & Restorative';

    const selectedActivities = [];
    document.querySelectorAll('.activity-card.checked').forEach(c => {
      const title = c.querySelector('.activity-name');
      if (title) selectedActivities.push(title.textContent.trim());
    });

    const note = document.getElementById('dailyJournalNote') ? document.getElementById('dailyJournalNote').value : 'No notes entered.';

    summaryContainer.innerHTML = `
      <div style="background-color: var(--bg-secondary); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 1.5rem;">
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.25rem;">
          <div>
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Self-Reported Energy</div>
            <div style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: var(--accent-sage);">${energyVal} / 10</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Rest State</div>
            <div style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 600; color: var(--text-primary);">${restedVal}</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Recovery Feeling</div>
            <div style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 600; color: var(--text-primary);">${recoveryVal}</div>
          </div>
        </div>
        <div style="margin-bottom: 1rem;">
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; margin-bottom: 0.4rem;">Completed Routines & Activities (${selectedActivities.length})</div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${selectedActivities.length > 0 ? selectedActivities.map(a => `<span class="badge badge-sage">${a}</span>`).join('') : '<span style="font-size: 0.85rem; color: var(--text-muted);">None selected today</span>'}
          </div>
        </div>
        <div>
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; margin-bottom: 0.25rem;">Private Reflection</div>
          <p style="font-size: 0.9rem; color: var(--text-primary); font-style: italic; margin: 0;">"${note || 'No notes added.'}"</p>
        </div>
      </div>
    `;
  }

  function renderRecentCheckinLogs() {
    const listContainer = document.getElementById('recentCheckinLogsList');
    if (!listContainer) return;

    const entries = getCheckins();
    if (entries.length === 0) {
      listContainer.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No entries recorded yet.</p>`;
      return;
    }

    listContainer.innerHTML = entries.map(item => `
      <div class="card" style="padding: 1.25rem; margin-bottom: 1rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-family: var(--font-heading); font-weight: 700; font-size: 1rem;">${item.date}</span>
            <span class="badge badge-sage">Energy: ${item.energy}/10</span>
            <span class="badge badge-teal">${item.rested}</span>
          </div>
          <button type="button" class="btn btn-subtle btn-sm delete-log-btn" data-id="${item.id}" style="color: var(--status-revoked); padding: 0.25rem 0.5rem;">Remove</button>
        </div>
        ${item.note ? `<p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.75rem; font-style: italic;">"${item.note}"</p>` : ''}
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
          ${(item.activities || []).map(act => `<span class="badge badge-warm" style="font-size: 0.75rem;">${act}</span>`).join('')}
        </div>
      </div>
    `).join('');

    listContainer.querySelectorAll('.delete-log-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const remaining = getCheckins().filter(x => x.id !== id);
        localStorage.setItem(CHECKINS_KEY, JSON.stringify(remaining));
        renderRecentCheckinLogs();
        if (window.showToast) window.showToast('Record Removed', 'The selected check-in entry was removed.');
      });
    });
  }

  // --- Add Custom Activity Modal Handling ---
  function initAddActivityModal() {
    const openBtn = document.getElementById('openAddActivityModalBtn');
    const modal = document.getElementById('addActivityModal');
    const closeBtn = document.getElementById('closeAddActivityModalBtn');
    const form = document.getElementById('newActivityForm');

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => modal.classList.add('open'));
    }
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const actName = document.getElementById('newActivityName').value.trim();
        const actCategory = document.getElementById('newActivityCategory').value;

        if (!actName) return;

        const grid = document.getElementById('activitiesGrid');
        if (grid) {
          const card = document.createElement('div');
          card.className = 'activity-card checked';
          card.innerHTML = `
            <div class="activity-checkbox">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div style="flex: 1;">
              <div class="activity-name">${actName}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${actCategory}</div>
            </div>
          `;
          card.addEventListener('click', () => card.classList.toggle('checked'));
          grid.appendChild(card);
        }

        form.reset();
        modal.classList.remove('open');
        if (window.showToast) window.showToast('Activity Added', `"${actName}" is now available in your check-in.`);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCheckinWizard();
    renderRecentCheckinLogs();
    initAddActivityModal();
  });

  window.VeraTracking = {
    getCheckins,
    saveCheckin,
    renderRecentCheckinLogs
  };
})();
