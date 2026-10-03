/* ==========================================================================
   VERA — Goals & Recovery Plan Management
   ========================================================================== */

(function () {
  'use strict';

  const GOALS_KEY = 'vera_active_goals';
  const ROUTINES_KEY = 'vera_routines_state';

  function getGoals() {
    const raw = localStorage.getItem(GOALS_KEY);
    if (!raw) {
      const defaultGoals = [
        {
          id: 'goal-1',
          name: 'Nervous System Rest & 8h Sleep Consistency',
          description: 'Establish a 10:00 PM digital sunset and 15-minute restorative breathwork routine.',
          targetDate: '2026-11-15',
          progress: 72,
          category: 'Sleep & Rest',
          frequency: 'Daily'
        },
        {
          id: 'goal-2',
          name: 'Post-Movement Joint Mobility Routine',
          description: 'Dedicate 15 minutes to hip & thoracic spine mobility following physical sessions.',
          targetDate: '2026-10-31',
          progress: 85,
          category: 'Mobility',
          frequency: '4x / week'
        },
        {
          id: 'goal-3',
          name: 'Mindful Midday Hydration & Reset',
          description: 'Pause for 5 deep breaths and 500ml water at 1:00 PM every weekday.',
          targetDate: '2026-10-25',
          progress: 60,
          category: 'Daily Routine',
          frequency: '5x / week'
        }
      ];
      localStorage.setItem(GOALS_KEY, JSON.stringify(defaultGoals));
      return defaultGoals;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  function renderGoalsList() {
    const container = document.getElementById('goalsListContainer');
    if (!container) return;

    const goals = getGoals();
    container.innerHTML = goals.map(g => `
      <div class="card" style="margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 0.75rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
              <span class="badge badge-sage">${g.category}</span>
              <span style="font-size: 0.8rem; color: var(--text-muted);">Target: ${g.targetDate}</span>
            </div>
            <h4 style="margin-bottom: 0.35rem;">${g.name}</h4>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0;">${g.description}</p>
          </div>
          <div style="text-align: right; min-width: 80px;">
            <div style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; color: var(--accent-sage);">${g.progress}%</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${g.frequency}</div>
          </div>
        </div>
        <div style="height: 6px; background-color: var(--border-subtle); border-radius: var(--radius-full); overflow: hidden; margin-top: 1rem;">
          <div style="width: ${g.progress}%; height: 100%; background: linear-gradient(90deg, var(--accent-sage), var(--accent-teal)); border-radius: var(--radius-full); transition: width 0.5s ease;"></div>
        </div>
      </div>
    `).join('');
  }

  function initRoutineToggles() {
    const routineItems = document.querySelectorAll('.routine-check-item');
    routineItems.forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('done');
        const isDone = item.classList.contains('done');
        const title = item.querySelector('.routine-title') ? item.querySelector('.routine-title').textContent : 'Routine';
        if (window.showToast) {
          window.showToast(isDone ? 'Routine Completed' : 'Routine Unchecked', `${title} updated for today.`);
        }
      });
    });
  }

  function initNewGoalModal() {
    const openBtn = document.getElementById('btnOpenNewGoalModal');
    const modal = document.getElementById('newGoalModal');
    const closeBtn = document.getElementById('btnCloseNewGoalModal');
    const form = document.getElementById('newGoalForm');

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => modal.classList.add('open'));
    }
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('goalNameInput').value.trim();
        const desc = document.getElementById('goalDescInput').value.trim();
        const category = document.getElementById('goalCategoryInput').value;
        const targetDate = document.getElementById('goalDateInput').value || '2026-11-30';
        const frequency = document.getElementById('goalFrequencyInput').value;

        if (!name) return;

        const goals = getGoals();
        goals.push({
          id: 'goal-' + Date.now(),
          name,
          description: desc,
          category,
          targetDate,
          progress: 10,
          frequency
        });

        localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
        renderGoalsList();
        form.reset();
        modal.classList.remove('open');
        if (window.showToast) window.showToast('Goal Created', `"${name}" added to your personal plan.`);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderGoalsList();
    initRoutineToggles();
    initNewGoalModal();
  });
})();
