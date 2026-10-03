/* ==========================================================================
   VERA — Reports Generator & Document Preview
   ========================================================================== */

(function () {
  'use strict';

  function initReportGenerator() {
    const form = document.getElementById('reportConfigForm');
    const previewContainer = document.getElementById('reportPreviewContainer');
    if (!form || !previewContainer) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const reportType = document.getElementById('reportTypeSelect').value;
      const dateRange = document.getElementById('reportDateRangeSelect').value;
      const includeCheckins = document.getElementById('incCheckins').checked;
      const includeSleep = document.getElementById('incSleep').checked;
      const includeActivities = document.getElementById('incActivities').checked;
      const includeGoals = document.getElementById('incGoals').checked;
      const includeNotes = document.getElementById('incNotes').checked;

      let dateRangeLabel = 'Last 7 Days (Sep 27 – Oct 03, 2026)';
      if (dateRange === '30d') dateRangeLabel = 'Last 30 Days (Sep 03 – Oct 03, 2026)';
      if (dateRange === '90d') dateRangeLabel = 'Last 90 Days (Jul 05 – Oct 03, 2026)';

      previewContainer.innerHTML = `
        <div class="report-document" id="printableReportDoc">
          <div class="report-doc-header">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <span class="brand-icon" style="width: 24px; height: 24px; font-size: 0.75rem;">V</span>
                <span style="font-family: var(--font-heading); font-weight: 800; font-size: 1.1rem; letter-spacing: 0.05em;">VERA</span>
              </div>
              <h2 style="font-size: 1.5rem; margin-bottom: 0.2rem;">${reportType}</h2>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">Personal Recovery & Wellness Summary</p>
            </div>
            <div style="text-align: right;">
              <span class="badge badge-sage">Verified Report</span>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.4rem;">Generated on ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            </div>
          </div>

          <div class="report-meta-grid">
            <div class="report-meta-item">
              <div class="report-meta-label">Member / Client</div>
              <div style="font-weight: 700; color: var(--text-primary);">Elena Rostova</div>
            </div>
            <div class="report-meta-item">
              <div class="report-meta-label">Selected Timeframe</div>
              <div style="font-weight: 600; color: var(--text-primary);">${dateRangeLabel}</div>
            </div>
            <div class="report-meta-item">
              <div class="report-meta-label">Overall Routine Adherence</div>
              <div style="font-weight: 700; color: var(--accent-sage);">88% Consistent</div>
            </div>
          </div>

          <!-- Executive Summary Section -->
          <div class="report-doc-section">
            <h4 style="font-size: 1.1rem; font-weight: 700;">Executive Summary</h4>
            <p style="font-size: 0.92rem; line-height: 1.6; color: var(--text-secondary);">
              Over the selected observation period, daily self-reported energy maintained a steady upward trajectory, averaging 7.4/10. Evening recovery routine completion reached 88%, coinciding with higher reported rest satisfaction. No significant disruptions to mobility schedules were recorded.
            </p>
          </div>

          ${includeCheckins ? `
            <div class="report-doc-section">
              <h4 style="font-size: 1.1rem; font-weight: 700;">Self-Reported Daily Check-Ins</h4>
              <div class="table-responsive">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Energy</th>
                      <th>Rest Perception</th>
                      <th>Recovery State</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Oct 03, 2026</td><td><span class="badge badge-sage">8 / 10</span></td><td>Well Rested</td><td>Strong & Focused</td></tr>
                    <tr><td>Oct 02, 2026</td><td><span class="badge badge-sage">8 / 10</span></td><td>Well Rested</td><td>Steady</td></tr>
                    <tr><td>Oct 01, 2026</td><td><span class="badge badge-teal">6 / 10</span></td><td>Moderate Rest</td><td>Calm</td></tr>
                    <tr><td>Sep 30, 2026</td><td><span class="badge badge-sage">7 / 10</span></td><td>Well Rested</td><td>Refreshed</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          ` : ''}

          ${includeActivities ? `
            <div class="report-doc-section">
              <h4 style="font-size: 1.1rem; font-weight: 700;">Completed Wellness & Recovery Activities</h4>
              <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem;">
                <span class="badge badge-sage" style="padding: 0.45rem 0.8rem;">Daily Mobility Routine (7 sessions)</span>
                <span class="badge badge-sage" style="padding: 0.45rem 0.8rem;">Mindful Hydration Target (7/7 days)</span>
                <span class="badge badge-teal" style="padding: 0.45rem 0.8rem;">Evening Breathwork (5 sessions)</span>
                <span class="badge badge-warm" style="padding: 0.45rem 0.8rem;">Restorative Walk (4 sessions)</span>
              </div>
            </div>
          ` : ''}

          ${includeGoals ? `
            <div class="report-doc-section">
              <h4 style="font-size: 1.1rem; font-weight: 700;">Active Goals Status</h4>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; padding: 0;">
                <li style="display: flex; justify-content: space-between; font-size: 0.9rem; border-bottom: 1px dashed var(--border-subtle); padding-bottom: 0.4rem;">
                  <span>Nervous System Rest & 8h Sleep Consistency</span>
                  <strong style="color: var(--accent-sage);">72% Completed</strong>
                </li>
                <li style="display: flex; justify-content: space-between; font-size: 0.9rem; border-bottom: 1px dashed var(--border-subtle); padding-bottom: 0.4rem;">
                  <span>Post-Movement Joint Mobility Routine</span>
                  <strong style="color: var(--accent-sage);">85% Completed</strong>
                </li>
              </ul>
            </div>
          ` : ''}

          ${includeNotes ? `
            <div class="report-doc-section">
              <h4 style="font-size: 1.1rem; font-weight: 700;">Selected Journal Notes</h4>
              <blockquote style="border-left: 3px solid var(--accent-sage); padding-left: 1rem; margin: 0; font-size: 0.9rem; color: var(--text-secondary); font-style: italic;">
                "Sticking with the 10:00 PM digital winding down routine noticeably reduced morning grogginess. Mobility work before bed helped hip tightness from sitting."
              </blockquote>
            </div>
          ` : ''}

          <div class="disclaimer-box" style="margin-top: 2rem;">
            <svg class="disclaimer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            <div>
              <strong>Confidential Wellness Record:</strong> This report reflects self-reported routine tracking and personal wellness observations. It does not constitute a clinical diagnosis or medical treatment plan.
            </div>
          </div>
        </div>
      `;

      if (window.showToast) {
        window.showToast('Report Generated', 'Preview updated with selected metrics.');
      }

      previewContainer.scrollIntoView({ behavior: 'smooth' });
    });
  }

  document.addEventListener('DOMContentLoaded', initReportGenerator);
})();
