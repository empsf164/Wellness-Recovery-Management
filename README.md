# VERA — Wellness & Recovery Management SaaS Web Application

> **Tagline:** *Understand Your Recovery. Build Better Days.*

**VERA** is a premium, professional wellness and recovery management platform designed for individuals, coaches, personal trainers, and wellness practitioners to organize routines, record self-reported wellness metrics, observe personal trends, generate reports, and securely share progress under granular client access controls.

---

## 🌿 Creative Direction & Design System

VERA delivers a calm, grounded, editorial SaaS aesthetic crafted specifically to reject clinical coldness and noisy fitness gamification.

- **Color Palette (Light Mode):**
  - Background: Warm Ivory (`#FAF8F5`) & Soft Sand (`#F3EDE7`)
  - Typography: Deep Charcoal (`#1B1E22`) & Refined Slate (`#565E69`)
  - Accent Tones: Calm Sage (`#52795D`), Muted Teal (`#3B6C68`), Soft Terracotta (`#B86B49`)
- **Color Palette (Dark Mode):**
  - Background: Deep Charcoal (`#121518`) & Warm Obsidian (`#181C21`)
  - Typography: Warm Off-White (`#F4F2EE`) & Subtle Gray (`#A0AAB6`)
  - Accent Tones: Soft Sage (`#6E9B7A`) & Muted Teal (`#4F8982`)
- **Typography:**
  - Headings & Display: `Plus Jakarta Sans`
  - Body & UI: `Manrope`

---

## 📂 File & Directory Structure

```text
Wellness-Recovery-Management/
│
├── index.html                # High-converting SaaS landing page with Hero composition & workflows
├── my-plan.html              # Personal recovery planning: Goals, Daily Routines, Schedule
├── track.html                # Multi-step Daily Check-In, Activity logger, Notes journal
├── insights.html             # Observational trend cards, Chart.js visualizations, pattern view
├── reports.html              # Document synthesis generator & PDF / CSV / JSON export engine
├── sharing.html              # Client access permissions matrix, time-limited token management
├── resources.html            # Educational wellness library with category filtering & search
├── resource-details.html     # Editorial article with interactive checklist & bookmarking
├── about.html                # Philosophy, five core pillars, and audience breakdown
├── contact.html              # Inquiries, support contact, and interactive FAQs accordion
│
├── login.html                # Member authentication & Google SSO simulation
├── signup.html               # Account creation with focus area onboarding
├── forgot-password.html      # Secure password reset simulation
│
├── 404.html                  # Missing route handler
├── coming-soon.html          # Wearable sync roadmap preview
│
├── assets/
│   ├── css/
│   │   ├── style.css         # Global design tokens, typography, navbar, toasts, footer
│   │   ├── components.css    # Sliders, step wizards, cards, charts, tables, modals
│   │   └── responsive.css    # Strict overflow controls & breakpoints (320px to 2560px)
│   │
│   ├── js/
│   │   ├── theme.js          # Dark/Light mode engine with localStorage persistence
│   │   ├── notifications.js  # Accessible toast notifications
│   │   ├── auth.js           # Client authentication simulation & session synchronization
│   │   ├── tracking.js       # Daily check-in wizard & activity logging
│   │   ├── goals.js          # Personal plan & goal milestones
│   │   ├── insights.js       # Chart.js trend rendering & period toggles (7D / 30D / 90D)
│   │   ├── reports.js        # Dynamic document preview generator
│   │   ├── exports.js        # Real CSV, JSON, and print-ready PDF export tools
│   │   ├── sharing.js        # Client access permissions & revocation logic
│   │   ├── resources.js      # Educational library filtering & global search modal (Ctrl+K)
│   │   └── main.js           # Navbar scroll, mobile drawer, accordions, active states
│   │
│   └── images/               # High-res generative editorial photography & assets
│
└── README.md
```

---

## ⚡ Core Features & Capabilities

1. **Daily Check-In Wizard:**
   - 5-step intuitive flow (Energy scale, Rest perception, Completed routines, Journal notes, Summary review).
   - LocalStorage persistence with seeded sample records.
2. **Personal Recovery Planning (`my-plan.html`):**
   - Active goal tracking with visual progress bars.
   - Interactive Morning, Daytime, and Evening routine completion.
   - Frequency targets for mobility and nervous system downregulation.
3. **Observational Insights (`insights.html`):**
   - Interactive Chart.js line, bar, and area charts.
   - 7 Days / 30 Days / 90 Days timeframe switching.
   - Neutral, non-diagnostic observational patterns.
4. **Reports & Open Export Engine (`reports.html`):**
   - Customizable document parameters (Weekly, Monthly, Custom).
   - Client-side export to tabular **CSV**, structured **JSON**, and print-ready **PDF**.
5. **Client Access & Privacy Control (`sharing.html`):**
   - Granular permission matrix (authorize trends while hiding private journal notes).
   - Time-scoped access duration (24h, 7d, 30d, 90d).
   - 1-click token revocation and reactivation.
6. **Universal Search Overlay:**
   - Instant search across routes, guides, and tools triggered via `Ctrl+K` or search button.
7. **Accessibility & Responsive Perfection:**
   - Zero horizontal overflow down to 320px screens.
   - Semantic HTML5, visible focus states, ARIA live regions for toasts.

---

## 🚀 Running Locally

You can serve the static files with any local HTTP server:

```powershell
# Python 3
python -m http.server 8000

# Node.js npx serve
npx -y serve .
```

Open `http://localhost:8000` in your web browser.
