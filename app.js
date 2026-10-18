/**
 * Ibnu Faizal — Senior Android Engineer
 * Precision Interactions & Ambient Canvas Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initExperienceCalculation();
  initTheme();
  initCodeTerminal();
  initAmbientCanvas();
  initMobileNav();
  initSmoothScrollTracking();
});

/* ==========================================================================
   DYNAMIC EXPERIENCE CALCULATION (Start Date: April 2019)
   ========================================================================== */
function initExperienceCalculation() {
  const startDate = new Date(2019, 3, 1); // April 2019 (Month 3 in 0-indexed JS Date)
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  const m = now.getMonth() - startDate.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < startDate.getDate())) {
    years--;
  }
  if (years < 1) years = 1;

  const expYearsText = `${years}+ years`;
  const expYearsBadge = `${years}+ Years`;

  // Update inline body occurrences
  document.querySelectorAll('.exp-years-text').forEach(el => {
    el.textContent = expYearsText;
  });

  // Update badge/meta card occurrences
  document.querySelectorAll('.exp-years-badge').forEach(el => {
    el.textContent = expYearsBadge;
  });

  // Update SEO meta descriptions if present
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', metaDesc.getAttribute('content').replace(/\d+\+\s*years/i, expYearsText));
  }
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', ogDesc.getAttribute('content').replace(/\d+\+\s*years/i, expYearsText));
  }
}

/* ==========================================================================
   THEME TOGGLE
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      showToast(`Theme: ${next.toUpperCase()}`);
    });
  }
}

/* ==========================================================================
   CODE TERMINAL TABS
   ========================================================================== */
function initCodeTerminal() {
  const tabs = document.querySelectorAll('.t-tab');
  const panes = document.querySelectorAll('.t-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   AMBIENT BACKGROUND CANVAS
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const nodes = [];
  const count = Math.min(30, Math.floor((w * h) / 35000));

  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.75
    });
  }

  function loop() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0) n.x = w;
      if (n.x > w) n.x = 0;
      if (n.y < 0) n.y = h;
      if (n.y > h) n.y = 0;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.35)';
      ctx.fill();

      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dx = n.x - n2.x;
        const dy = n.y - n2.y;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.08 * (1 - d / 120)})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(loop);
  }

  loop();
}

/* ==========================================================================
   APP DETAILS MODAL
   ========================================================================== */
const projectData = {
  pemrakarsa: {
    title: 'BRILian Sales Platform (Pemrakarsa)',
    org: 'PT Bank Rakyat Indonesia (Persero) Tbk',
    badge: '100,000+ Downloads on Google Play',
    role: 'Android Developer → Senior Android Developer',
    tech: 'Kotlin, Clean Architecture, Modularization, Jetpack, Coroutines, Room, SQLite, Hilt, RESTful API',
    playUrl: 'https://play.google.com/store/apps/details?id=id.co.bri.brispotnew',
    overview: 'Flagship enterprise loan origin and underwriting app used across all Bank BRI units in Indonesia. Enables loan officers to record applicant bio data, business surveys, financial metrics, and geolocations offline and online.',
    keyHighlights: [
      'Refactored legacy monolith into isolated feature modules (Clean Architecture), reducing compilation times by 35%.',
      'Implemented robust offline-first caching with Room and custom sync engines for officers in remote rural areas.',
      'Achieved up to 45% UI performance boost and significantly reduced memory usage across lower-end enterprise devices.'
    ]
  },
  pemutus: {
    title: 'BRILian Sales Platform (Pemutus)',
    org: 'PT Bank Rakyat Indonesia (Persero) Tbk',
    badge: '50,000+ Downloads on Google Play',
    role: 'Android Developer → Senior Android Developer',
    tech: 'Kotlin, Clean Architecture, Jetpack Component, Coroutines, SQLite, Dependency Injection (Hilt)',
    playUrl: 'https://play.google.com/store/apps/details?id=id.co.bri.brispot.pemutus',
    overview: 'High-security executive approval tool for Bank BRI branch managers and credit decision makers to analyze risk profiles, review collateral assessments, and execute digital loan approvals.',
    keyHighlights: [
      'Implemented biometric auth, digital cryptographic signature signing, and SSL certificate pinning.',
      'Integrated real-time push notifications for high-priority urgent loan approvals.',
      'Enforced zero-crash resilience across Android 8 through Android 14+ updates.'
    ]
  },
  konsumer: {
    title: 'BRISPOT Konsumer',
    org: 'PT Bank Rakyat Indonesia (Persero) Tbk',
    badge: '100,000+ Downloads on Google Play',
    role: 'Android Developer',
    tech: 'Kotlin, RESTful API, MVVM, Jetpack Component, ViewBinding',
    playUrl: 'https://play.google.com/store/apps/details?id=id.co.bri.******',
    overview: 'Retail and consumer credit solution catering to government and corporate salary-based personal loans (Briguna) and consumer asset financing.',
    keyHighlights: [
      'Streamlined salary deduction calculations and document scanning verification flows.',
      'Maintained consistent REST API syncing with enterprise core banking services.',
      'Conducted iterative UI/UX enhancements based on direct user telemetry and feedback.'
    ]
  },
  fifada: {
    title: 'FIFADA (FIFGROUP E-Commerce)',
    org: 'PT Jati Piranti Solusindo / Astra FIFGROUP',
    badge: '500,000+ Downloads on Google Play',
    role: 'Flutter Developer',
    tech: 'Flutter, Dart, Bloc State Management, RESTful API, Payment Gateway',
    playUrl: 'https://play.google.com/store/apps/details?id=com.fifada.customer',
    overview: 'Leading omnichannel e-commerce and digital installment application by Astra International FIFGROUP, empowering millions of Indonesian consumers to purchase electronics, appliances, and motorbikes with flexible credit terms.',
    keyHighlights: [
      'Developed core shopping cart, product recommendation feeds, and installment calculation engines.',
      'Leveraged Bloc pattern for deterministic reactive state management across 500,000+ users.',
      'Resolved critical production concurrency issues and sustained high uptime during festive flash sales.'
    ]
  }
};

function openAppModal(key) {
  const p = projectData[key];
  if (!p) return;

  const modal = document.getElementById('app-modal');
  const target = document.getElementById('modal-content-target');

  target.innerHTML = `
    <div style="margin-bottom: 1.25rem;">
      <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-emerald); background: var(--accent-emerald-subtle); border: 1px solid rgba(16,185,129,0.3); padding: 0.2rem 0.55rem; border-radius: var(--radius-sm); display: inline-block; margin-bottom: 0.5rem;">${p.badge}</span>
      <h2 style="font-size: 1.5rem; margin-bottom: 0.2rem;">${p.title}</h2>
      <p style="font-size: 0.85rem; color: var(--text-tertiary);">${p.org}</p>
    </div>

    <div style="background: var(--bg-surface-raised); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.85rem; margin-bottom: 1.25rem; font-size: 0.85rem;">
      <p style="margin-bottom: 0.35rem;"><strong style="color: var(--text-primary);">Role:</strong> ${p.role}</p>
      <p><strong style="color: var(--text-primary);">Tech Stack:</strong> <span style="font-family: var(--font-mono); color: var(--text-secondary);">${p.tech}</span></p>
    </div>

    <div style="margin-bottom: 1.25rem;">
      <h4 style="font-size: 0.95rem; margin-bottom: 0.4rem;">Overview</h4>
      <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary);">${p.overview}</p>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h4 style="font-size: 0.95rem; margin-bottom: 0.4rem;">Key Highlights</h4>
      <ul style="padding-left: 1.25rem; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55;">
        ${p.keyHighlights.map(h => `<li style="margin-bottom: 0.35rem;">${h}</li>`).join('')}
      </ul>
    </div>

    <div style="display: flex; gap: 0.65rem; justify-content: flex-end; flex-wrap: wrap; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
      <a href="${p.playUrl}" target="_blank" rel="noopener" class="btn btn-solid btn-sm">
        <span>Google Play Store</span>
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 8h10M9 4l4 4-4 4"></path></svg>
      </a>
      <button class="btn btn-ghost btn-sm" onclick="closeAppModalDirect()">Close</button>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAppModal(e) {
  if (e.target.id === 'app-modal') {
    closeAppModalDirect();
  }
}

function closeAppModalDirect() {
  const modal = document.getElementById('app-modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

/* ==========================================================================
   CLIPBOARD & TOAST
   ========================================================================== */
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function copyContactInfo() {
  const text = `Ibnu Faizal - Senior Android Developer\nEmail: ibnufaizal.mobdev@gmail.com\nLinkedIn: https://www.linkedin.com/in/ibnufaizal/`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('✓ Contact info copied');
    });
  } else {
    showToast('Email: ibnufaizal.mobdev@gmail.com');
  }
}

/* ==========================================================================
   FORM SUBMISSION
   ========================================================================== */
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const subject = document.getElementById('contact-subject').value;
  const msg = document.getElementById('contact-msg').value;

  const mailto = `mailto:ibnufaizal.mobdev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`)}`;
  window.location.href = mailto;
  showToast('Opening mail client...');
  e.target.reset();
}

/* ==========================================================================
   MOBILE NAV & SCROLL
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('nav-menu');
  const links = document.querySelectorAll('.nav-item');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('mobile-open');
  });

  links.forEach(l => {
    l.addEventListener('click', () => {
      menu.classList.remove('mobile-open');
    });
  });
}

function initSmoothScrollTracking() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      const top = s.offsetTop - 100;
      if (window.scrollY >= top) {
        current = s.getAttribute('id');
      }
    });

    navLinks.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === `#${current}`) {
        l.classList.add('active');
      }
    });
  });
}
