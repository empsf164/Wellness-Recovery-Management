/* ==========================================================================
   VERA — Client Access & Secure Sharing Management
   Granular Permission Matrix & Access Expiry Engine
   ========================================================================== */

(function () {
  'use strict';

  const SHARES_KEY = 'vera_shared_access_list';

  function getShares() {
    const raw = localStorage.getItem(SHARES_KEY);
    if (!raw) {
      const seedShares = [
        {
          id: 'share-1',
          recipientName: 'Dr. Marcus Vance',
          recipientEmail: 'm.vance@physicalwellness.org',
          role: 'Wellness Practitioner',
          accessLevel: 'View Reports & Trends',
          duration: '30 Days',
          createdDate: '2026-09-20',
          expiryDate: '2026-10-20',
          status: 'Active',
          sharedSections: ['Recovery Trends', 'Mobility Logs', 'Weekly Reports']
        },
        {
          id: 'share-2',
          recipientName: 'Sarah Lin, CPT',
          recipientEmail: 'sarah.lin@movementcoach.com',
          role: 'Movement Coach',
          accessLevel: 'View Selected Metrics',
          duration: '7 Days',
          createdDate: '2026-09-28',
          expiryDate: '2026-10-05',
          status: 'Active',
          sharedSections: ['Mobility Logs', 'Routine Consistency']
        },
        {
          id: 'share-3',
          recipientName: 'Julian Thorne',
          recipientEmail: 'julian.t@lifestyletherapies.io',
          role: 'Lifestyle Coach',
          accessLevel: 'View Summary Only',
          duration: '24 Hours',
          createdDate: '2026-09-15',
          expiryDate: '2026-09-16',
          status: 'Revoked',
          sharedSections: ['Weekly Summary']
        }
      ];
      localStorage.setItem(SHARES_KEY, JSON.stringify(seedShares));
      return seedShares;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  function renderSharesTable() {
    const tbody = document.getElementById('sharedAccessTableBody');
    if (!tbody) return;

    const shares = getShares();
    if (shares.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2rem; color: var(--text-muted);">No active client or professional sharing links.</td></tr>`;
      return;
    }

    tbody.innerHTML = shares.map(item => {
      let badgeClass = 'badge-active';
      if (item.status === 'Pending') badgeClass = 'badge-pending';
      if (item.status === 'Revoked') badgeClass = 'badge-revoked';

      return `
        <tr>
          <td>
            <div style="font-weight: 700; color: var(--text-primary);">${item.recipientName}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">${item.recipientEmail} (${item.role})</div>
          </td>
          <td>
            <span class="badge badge-sage">${item.accessLevel}</span>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">${(item.sharedSections || []).join(', ')}</div>
          </td>
          <td>${item.createdDate}</td>
          <td>
            <div>${item.expiryDate}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${item.duration}</div>
          </td>
          <td>
            <span class="badge ${badgeClass}">${item.status}</span>
          </td>
          <td>
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              ${item.status === 'Active' ? `
                <button type="button" class="btn btn-secondary btn-sm btn-copy-link" data-id="${item.id}" title="Copy Secure Access URL">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                  Link
                </button>
                <button type="button" class="btn btn-danger-outline btn-sm btn-revoke-share" data-id="${item.id}">
                  Revoke
                </button>
              ` : `
                <button type="button" class="btn btn-secondary btn-sm btn-reactivate-share" data-id="${item.id}">
                  Re-enable
                </button>
              `}
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach actions
    tbody.querySelectorAll('.btn-revoke-share').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const list = getShares();
        const found = list.find(x => x.id === id);
        if (found) {
          found.status = 'Revoked';
          localStorage.setItem(SHARES_KEY, JSON.stringify(list));
          renderSharesTable();
          if (window.showToast) window.showToast('Access Revoked', `Sharing permissions for ${found.recipientName} were permanently terminated.`, 'warning');
        }
      });
    });

    tbody.querySelectorAll('.btn-reactivate-share').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const list = getShares();
        const found = list.find(x => x.id === id);
        if (found) {
          found.status = 'Active';
          found.expiryDate = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];
          localStorage.setItem(SHARES_KEY, JSON.stringify(list));
          renderSharesTable();
          if (window.showToast) window.showToast('Access Restored', `Access reactivated for ${found.recipientName} for 7 days.`);
        }
      });
    });

    tbody.querySelectorAll('.btn-copy-link').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const shareUrl = `${window.location.origin}/reports.html?token=vera_sec_${id}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
          if (window.showToast) window.showToast('Link Copied', 'Encrypted sharing link copied to clipboard.');
        }).catch(() => {
          if (window.showToast) window.showToast('Share Link', shareUrl);
        });
      });
    });
  }

  function initCreateShareModal() {
    const openBtn = document.getElementById('btnOpenShareModal');
    const modal = document.getElementById('createShareModal');
    const closeBtn = document.getElementById('btnCloseShareModal');
    const form = document.getElementById('createShareForm');

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => modal.classList.add('open'));
    }
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('shareRecipientName').value.trim();
        const email = document.getElementById('shareRecipientEmail').value.trim();
        const role = document.getElementById('shareRecipientRole').value;
        const level = document.getElementById('shareAccessLevel').value;
        const duration = document.getElementById('shareDuration').value;

        const sections = [];
        if (document.getElementById('permCheckins').checked) sections.push('Check-Ins');
        if (document.getElementById('permSleep').checked) sections.push('Sleep Metrics');
        if (document.getElementById('permMobility').checked) sections.push('Mobility');
        if (document.getElementById('permReports').checked) sections.push('Reports');
        if (document.getElementById('permNotes').checked) sections.push('Shared Notes');

        let daysToAdd = 7;
        if (duration === '24 Hours') daysToAdd = 1;
        if (duration === '30 Days') daysToAdd = 30;
        if (duration === '90 Days') daysToAdd = 90;

        const expiryDate = new Date(Date.now() + daysToAdd * 86400000).toISOString().split('T')[0];

        const newShare = {
          id: 'share-' + Date.now(),
          recipientName: name,
          recipientEmail: email,
          role: role,
          accessLevel: level,
          duration: duration,
          createdDate: new Date().toISOString().split('T')[0],
          expiryDate: expiryDate,
          status: 'Active',
          sharedSections: sections.length > 0 ? sections : ['Summary']
        };

        const list = getShares();
        list.unshift(newShare);
        localStorage.setItem(SHARES_KEY, JSON.stringify(list));

        renderSharesTable();
        form.reset();
        modal.classList.remove('open');
        if (window.showToast) window.showToast('Access Granted', `Secure invitation created for ${name}.`);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderSharesTable();
    initCreateShareModal();
  });

  window.VeraSharing = {
    getShares,
    renderSharesTable
  };
})();
