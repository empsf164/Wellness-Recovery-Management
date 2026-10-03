/* ==========================================================================
   VERA — Insights & Data Visualization (Chart.js Integration)
   Clean, Accessible, Non-Diagnostic Recovery Trends
   ========================================================================== */

(function () {
  'use strict';

  let energyChartInstance = null;
  let sleepChartInstance = null;
  let routineChartInstance = null;

  // Datasets for different timeframes
  const dataSets = {
    '7d': {
      labels: ['Mon (28)', 'Tue (29)', 'Wed (30)', 'Thu (01)', 'Fri (02)', 'Sat (03)', 'Sun (04)'],
      energy: [6, 7, 7, 6, 8, 8, 9],
      recoveryFeel: [5, 6, 7, 6, 8, 7, 9],
      sleepHours: [7.2, 6.8, 7.5, 7.0, 8.1, 8.4, 8.0],
      routineCompletion: [80, 60, 100, 75, 100, 100, 90]
    },
    '30d': {
      labels: ['W1 (Sep 07)', 'W2 (Sep 14)', 'W3 (Sep 21)', 'W4 (Sep 28)', 'Current W5'],
      energy: [6.2, 6.8, 7.1, 7.4, 7.9],
      recoveryFeel: [6.0, 6.5, 7.0, 7.2, 7.8],
      sleepHours: [6.9, 7.1, 7.4, 7.6, 7.8],
      routineCompletion: [68, 74, 82, 86, 91]
    },
    '90d': {
      labels: ['Aug M1', 'Aug M2', 'Sep M1', 'Sep M2', 'Oct Current'],
      energy: [5.8, 6.3, 6.9, 7.3, 7.9],
      recoveryFeel: [5.5, 6.1, 6.8, 7.1, 7.7],
      sleepHours: [6.6, 6.9, 7.2, 7.5, 7.9],
      routineCompletion: [62, 70, 79, 84, 91]
    }
  };

  let activePeriod = '7d';

  function getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      textColor: isDark ? '#A0AAB6' : '#565E69',
      gridColor: isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)',
      tooltipBg: isDark ? '#242B34' : '#1B1E22',
      tooltipText: '#FFFFFF',
      sage: isDark ? '#6E9B7A' : '#52795D',
      sageFill: isDark ? 'rgba(110, 155, 122, 0.18)' : 'rgba(82, 121, 93, 0.12)',
      teal: isDark ? '#4F8982' : '#3B6C68',
      tealFill: isDark ? 'rgba(79, 137, 130, 0.18)' : 'rgba(59, 108, 104, 0.12)',
      warm: isDark ? '#D48967' : '#B86B49'
    };
  }

  function initCharts() {
    if (typeof Chart === 'undefined') return;

    const colors = getThemeColors();

    // 1. Energy & Recovery Feeling Trend Chart
    const energyCanvas = document.getElementById('energyTrendChart');
    if (energyCanvas) {
      const ctx = energyCanvas.getContext('2d');
      if (energyChartInstance) energyChartInstance.destroy();

      energyChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dataSets[activePeriod].labels,
          datasets: [
            {
              label: 'Self-Reported Energy (1-10)',
              data: dataSets[activePeriod].energy,
              borderColor: colors.sage,
              backgroundColor: colors.sageFill,
              fill: true,
              tension: 0.35,
              borderWidth: 2.5,
              pointBackgroundColor: colors.sage,
              pointRadius: 4,
              pointHoverRadius: 6
            },
            {
              label: 'Recovery Feeling (1-10)',
              data: dataSets[activePeriod].recoveryFeel,
              borderColor: colors.teal,
              backgroundColor: 'transparent',
              borderDash: [5, 5],
              tension: 0.35,
              borderWidth: 2,
              pointBackgroundColor: colors.teal,
              pointRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: colors.textColor,
                font: { family: 'Manrope', size: 12, weight: '600' },
                boxWidth: 14,
                padding: 15
              }
            },
            tooltip: {
              backgroundColor: colors.tooltipBg,
              titleColor: colors.tooltipText,
              bodyColor: colors.tooltipText,
              titleFont: { family: 'Plus Jakarta Sans', weight: '700' },
              bodyFont: { family: 'Manrope' },
              padding: 10,
              cornerRadius: 8
            }
          },
          scales: {
            x: {
              grid: { color: colors.gridColor },
              ticks: { color: colors.textColor, font: { family: 'Manrope', size: 11 } }
            },
            y: {
              min: 0,
              max: 10,
              grid: { color: colors.gridColor },
              ticks: { color: colors.textColor, font: { family: 'Manrope', size: 11 }, stepSize: 2 }
            }
          }
        }
      });
    }

    // 2. Sleep Duration / Rest Chart
    const sleepCanvas = document.getElementById('sleepRestChart');
    if (sleepCanvas) {
      const ctx = sleepCanvas.getContext('2d');
      if (sleepChartInstance) sleepChartInstance.destroy();

      sleepChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dataSets[activePeriod].labels,
          datasets: [
            {
              label: 'Reported Rest Duration (Hours)',
              data: dataSets[activePeriod].sleepHours,
              backgroundColor: colors.teal,
              borderRadius: 6,
              borderSkipped: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: colors.textColor,
                font: { family: 'Manrope', size: 12, weight: '600' },
                boxWidth: 14
              }
            },
            tooltip: {
              backgroundColor: colors.tooltipBg,
              titleColor: colors.tooltipText,
              bodyColor: colors.tooltipText,
              padding: 10,
              cornerRadius: 8,
              callbacks: {
                label: (ctx) => ` ${ctx.parsed.y} hours of rest`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: colors.textColor, font: { family: 'Manrope', size: 11 } }
            },
            y: {
              min: 0,
              max: 10,
              grid: { color: colors.gridColor },
              ticks: { color: colors.textColor, font: { family: 'Manrope', size: 11 } }
            }
          }
        }
      });
    }

    // 3. Routine Consistency Chart (Home & Insights)
    const routineCanvas = document.getElementById('routineConsistencyChart');
    if (routineCanvas) {
      const ctx = routineCanvas.getContext('2d');
      if (routineChartInstance) routineChartInstance.destroy();

      routineChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dataSets[activePeriod].labels,
          datasets: [
            {
              label: 'Routine Completion (%)',
              data: dataSets[activePeriod].routineCompletion,
              borderColor: colors.sage,
              backgroundColor: colors.sageFill,
              fill: true,
              tension: 0.3,
              borderWidth: 2.5,
              pointBackgroundColor: colors.sage,
              pointRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: colors.tooltipBg,
              titleColor: colors.tooltipText,
              bodyColor: colors.tooltipText,
              padding: 10,
              cornerRadius: 8,
              callbacks: {
                label: (ctx) => ` ${ctx.parsed.y}% routine consistency`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: colors.textColor, font: { family: 'Manrope', size: 11 } }
            },
            y: {
              min: 0,
              max: 100,
              grid: { color: colors.gridColor },
              ticks: { color: colors.textColor, font: { family: 'Manrope', size: 11 }, callback: (v) => `${v}%` }
            }
          }
        }
      });
    }
  }

  function setupPeriodSwitchers() {
    const switchers = document.querySelectorAll('.period-switcher');
    switchers.forEach(group => {
      const btns = group.querySelectorAll('.period-btn');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          btns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          activePeriod = btn.getAttribute('data-period') || '7d';
          initCharts();
          if (window.showToast) {
            window.showToast('Timeframe Updated', `Displaying patterns for ${activePeriod.toUpperCase()}`);
          }
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    setupPeriodSwitchers();
  });

  // Re-draw with updated theme colors on dark/light mode toggle
  window.addEventListener('veraThemeChanged', () => {
    initCharts();
  });

  window.VeraInsights = {
    initCharts,
    dataSets
  };
})();
