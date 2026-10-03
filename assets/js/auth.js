/* ==========================================================================
   VERA — Client Authentication Simulation & Session Management
   ========================================================================== */

(function () {
  'use strict';

  const AUTH_SESSION_KEY = 'vera_auth_session';

  function getSession() {
    const raw = localStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) {
      const defaultUser = {
        isLoggedIn: true,
        name: 'Elena Rostova',
        email: 'elena.rostova@example.com',
        avatarInitials: 'ER',
        role: 'Client / User',
        memberSince: 'Oct 2026',
        focus: ['Recovery routines', 'Sleep habits', 'Daily consistency']
      };
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(defaultUser));
      return defaultUser;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function setSession(userData) {
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(userData));
  }

  function clearSession() {
    localStorage.removeItem(AUTH_SESSION_KEY);
  }

  // Handle Login form submit
  function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('#email').value;
      const name = email.split('@')[0].replace('.', ' ') || 'Elena Rostova';
      const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2) || 'ER';

      const user = {
        isLoggedIn: true,
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email: email,
        avatarInitials: initials,
        role: 'Wellness Member',
        memberSince: 'Oct 2026'
      };

      setSession(user);
      if (window.showToast) window.showToast('Welcome back', `Signed in as ${user.name}`);
      setTimeout(() => {
        window.location.href = 'track.html';
      }, 800);
    });

    const googleBtn = document.getElementById('btnGoogleLogin');
    if (googleBtn) {
      googleBtn.addEventListener('click', () => {
        const user = {
          isLoggedIn: true,
          name: 'Elena Rostova',
          email: 'elena.rostova@gmail.com',
          avatarInitials: 'ER',
          role: 'Wellness Member',
          memberSince: 'Oct 2026'
        };
        setSession(user);
        if (window.showToast) window.showToast('Google Sign-In Successful', 'Welcome back, Elena!');
        setTimeout(() => {
          window.location.href = 'track.html';
        }, 800);
      });
    }

    const appleBtn = document.getElementById('btnAppleLogin');
    if (appleBtn) {
      appleBtn.addEventListener('click', () => {
        const user = {
          isLoggedIn: true,
          name: 'Elena Rostova',
          email: 'elena.rostova@icloud.com',
          avatarInitials: 'ER',
          role: 'Wellness Member',
          memberSince: 'Oct 2026'
        };
        setSession(user);
        if (window.showToast) window.showToast('Apple Sign-In Successful', 'Welcome back, Elena!');
        setTimeout(() => {
          window.location.href = 'track.html';
        }, 800);
      });
    }
  }

  // Handle Signup form submit
  function initSignupForm() {
    const form = document.getElementById('signupForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#fullName').value || 'New User';
      const email = form.querySelector('#email').value || 'user@example.com';
      const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2) || 'NU';

      const user = {
        isLoggedIn: true,
        name: name,
        email: email,
        avatarInitials: initials,
        role: 'Wellness Member',
        memberSince: 'Oct 2026'
      };

      setSession(user);
      if (window.showToast) window.showToast('Account Created', 'Welcome to VERA. Starting your personal plan.');
      setTimeout(() => {
        window.location.href = 'my-plan.html';
      }, 800);
    });

    const googleSignupBtn = document.getElementById('btnGoogleSignup');
    if (googleSignupBtn) {
      googleSignupBtn.addEventListener('click', () => {
        const user = {
          isLoggedIn: true,
          name: 'Elena Rostova',
          email: 'elena.rostova@gmail.com',
          avatarInitials: 'ER',
          role: 'Wellness Member',
          memberSince: 'Oct 2026'
        };
        setSession(user);
        if (window.showToast) window.showToast('Google Account Connected', 'Welcome to VERA!');
        setTimeout(() => {
          window.location.href = 'my-plan.html';
        }, 800);
      });
    }

    const appleSignupBtn = document.getElementById('btnAppleSignup');
    if (appleSignupBtn) {
      appleSignupBtn.addEventListener('click', () => {
        const user = {
          isLoggedIn: true,
          name: 'Elena Rostova',
          email: 'elena.rostova@icloud.com',
          avatarInitials: 'ER',
          role: 'Wellness Member',
          memberSince: 'Oct 2026'
        };
        setSession(user);
        if (window.showToast) window.showToast('Apple Account Connected', 'Welcome to VERA!');
        setTimeout(() => {
          window.location.href = 'my-plan.html';
        }, 800);
      });
    }
  }

  // Handle Forgot Password form
  function initForgotPasswordForm() {
    const form = document.getElementById('forgotPasswordForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const statusBox = document.getElementById('resetStatusMessage');
      if (statusBox) {
        statusBox.style.display = 'block';
        statusBox.innerHTML = `
          <div style="background-color: var(--accent-sage-subtle); border: 1px solid var(--accent-sage-border); padding: 1.25rem; border-radius: var(--radius-md); text-align: center;">
            <h4 style="color: var(--accent-sage); margin-bottom: 0.4rem;">Reset Link Sent</h4>
            <p style="font-size: 0.9rem; margin: 0; color: var(--text-primary);">If an account exists with that email address, password reset instructions have been dispatched.</p>
          </div>
        `;
        form.querySelector('button[type="submit"]').disabled = true;
      }
      if (window.showToast) window.showToast('Request Received', 'Check your inbox for the reset link.');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLoginForm();
    initSignupForm();
    initForgotPasswordForm();
  });

  window.VeraAuth = {
    getSession,
    setSession,
    clearSession
  };
})();
