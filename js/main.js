/**
 * PORTFOLITE® Luxury Minimalist Interactive Logic
 * Brand: integro.ua Маркетинг
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientBackgroundWaves();
  initPremiumIntro();
  initHeaderScroll();
  initRouteAnimation();
  initMobileMenu();
  initStagesChecklist();
  initBudgetSimulator();
  initPostApprovalDemo();
  initAudienceTabs();
  initFaqAccordions();
  initPackageSelection();
  initForms();
  initSimulatorCta();
  initUtmTracking();
});

/* Header Scroll Glass Effect */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* Route Visualizer Progressive Animation */
function initRouteAnimation() {
  const railProgress = document.querySelector('.route-rail-progress');
  if (railProgress) {
    setTimeout(() => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        railProgress.style.height = '100%';
      } else {
        railProgress.style.width = '100%';
      }
      
      const nodes = document.querySelectorAll('.route-node');
      nodes.forEach((node, idx) => {
        setTimeout(() => {
          node.classList.add('active');
        }, idx * 180);
      });
    }, 300);
  }
}

/* Mobile Menu */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  toggleBtn.addEventListener('click', () => toggleMenu());
  mobileLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      toggleMenu(false);
    }
  });
}

/* 14 Stages Auto-Checking on Scroll */
function initStagesChecklist() {
  const stageItems = document.querySelectorAll('.stage-item');
  if (!stageItems.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stageItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('checked');
          }, index * 80);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.15 });

  const box = document.querySelector('.stages-scroll-box');
  if (box) observer.observe(box);
}

/* Budget Simulator with Dynamic Recalculation */
function initBudgetSimulator() {
  const slider = document.getElementById('budget-slider');
  const amountDisplay = document.getElementById('budget-total-val');
  if (!slider || !amountDisplay) return;

  const metaVal = document.getElementById('val-meta');
  const googleVal = document.getElementById('val-google');
  const smmVal = document.getElementById('val-smm');
  const reserveVal = document.getElementById('val-reserve');

  function updateBudget(val) {
    const total = parseInt(val, 10);
    const min = parseInt(slider.min, 10) || 50000;
    const max = parseInt(slider.max, 10) || 500000;
    const percentage = ((total - min) / (max - min)) * 100;
    
    slider.style.background = `linear-gradient(to right, #FFFFFF 0%, #FFFFFF ${percentage}%, var(--border-subtle) ${percentage}%, var(--border-subtle) 100%)`;
    amountDisplay.textContent = total.toLocaleString('uk-UA') + ' ₴';

    const meta = Math.round(total * 0.40);
    const google = Math.round(total * 0.30);
    const smm = Math.round(total * 0.20);
    const reserve = total - (meta + google + smm);

    if (metaVal) metaVal.textContent = meta.toLocaleString('uk-UA') + ' ₴ (40%)';
    if (googleVal) googleVal.textContent = google.toLocaleString('uk-UA') + ' ₴ (30%)';
    if (smmVal) smmVal.textContent = smm.toLocaleString('uk-UA') + ' ₴ (20%)';
    if (reserveVal) reserveVal.textContent = reserve.toLocaleString('uk-UA') + ' ₴ (10%)';
  }

  slider.addEventListener('input', (e) => updateBudget(e.target.value));
  updateBudget(slider.value);
}

/* Post Approval Interactive Demo */
function initPostApprovalDemo() {
  const approveBtn = document.getElementById('demo-approve-btn');
  const stampContainer = document.getElementById('demo-stamp-wrap');
  if (!approveBtn) return;

  approveBtn.addEventListener('click', () => {
    approveBtn.classList.add('approved');
    approveBtn.textContent = '✓ Погоджено';
    if (stampContainer) {
      stampContainer.innerHTML = `
        <span class="stamp-approved">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          ПОГОДЖЕНО
        </span>
      `;
    }
  });
}

/* Audience Tabs */
function initAudienceTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-content-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = document.getElementById(`tab-${targetTab}`);
      if (panel) panel.classList.add('active');
    });
  });
}

/* FAQ Accordions */
function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(other => other.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* Pricing Package Selector */
function initPackageSelection() {
  const packageCards = document.querySelectorAll('.package-card');
  const packageSelect = document.getElementById('form-package');

  packageCards.forEach(card => {
    const selectBtn = card.querySelector('.btn-select-package');
    if (!selectBtn) return;

    selectBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const packageName = card.getAttribute('data-package');
      if (packageSelect) {
        packageSelect.value = packageName;
      }
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* Lead Forms Validation & Redirection */
function initForms() {
  const forms = document.querySelectorAll('form[data-validate]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Honeypot check
      const honeypot = form.querySelector('input[name="website"]');
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('Bot submission blocked');
        return;
      }

      // Basic field validation
      const nameInput = form.querySelector('input[name="name"]');
      const phoneInput = form.querySelector('input[name="phone"]');
      const emailInput = form.querySelector('input[name="email"]');
      const consent = form.querySelector('input[name="consent"]');

      if (!nameInput || !nameInput.value.trim()) {
        alert('Будь ласка, вкажіть ваше ім’я');
        if (nameInput) nameInput.focus();
        return;
      }

      if (!phoneInput || !phoneInput.value.trim()) {
        alert('Будь ласка, вкажіть ваш номер телефону або месенджер');
        if (phoneInput) phoneInput.focus();
        return;
      }

      if (consent && !consent.checked) {
        alert('Будь ласка, підтвердіть згоду на обробку персональних даних');
        return;
      }

      // Redirect to thanks page with appropriate context
      const formType = form.getAttribute('data-form-type') || 'business';
      window.location.href = `thanks.html?type=${encodeURIComponent(formType)}`;
    });
  });
}

/* Simulator micro-CTA: clicking it pre-selects the simulator context on the lead form */
function initSimulatorCta() {
  const cta = document.querySelector('[data-simulator-cta]');
  const form = document.querySelector('form[data-validate]');
  if (!cta || !form) return;
  cta.addEventListener('click', () => {
    form.setAttribute('data-form-type', 'simulator');
    const pkg = document.getElementById('form-package');
    if (pkg) pkg.value = 'simulator';
    // email is essential when the user asks to receive the calculation
    const email = form.querySelector('input[name="email"]');
    if (email) email.setAttribute('required', '');
  });
}

/* UTM Parameter Extraction */
function initUtmTracking() {
  const params = new URLSearchParams(window.location.search);
  const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  utmFields.forEach(field => {
    const val = params.get(field);
    if (val) {
      sessionStorage.setItem(field, val);
      document.querySelectorAll(`input[name="${field}"]`).forEach(input => {
        input.value = val;
      });
    }
  });
}

/* Premium Intro Animation */
function initPremiumIntro() {
  const intro = document.getElementById('premium-intro');
  if (!intro) return;

  // Add class to body to prevent scrolling during intro
  document.body.classList.add('intro-active');

  const lines = intro.querySelectorAll('.intro-text');
  let wordDelay = 0;
  
  lines.forEach((line) => {
    // Split text into words, wrap in spans
    const text = line.innerText;
    line.innerHTML = '';
    const words = text.split(' ').filter(w => w.trim() !== '');
    
    words.forEach((word) => {
      const span = document.createElement('span');
      span.className = 'intro-word';
      // Use innerHTML with non-breaking space if needed, or flex gap handles spacing
      span.innerText = word;
      line.appendChild(span);
      
      setTimeout(() => {
        span.classList.add('animate-in');
      }, 200 + wordDelay);
      
      wordDelay += 90; // 90ms stagger per word
    });
  });

  // Total reading time calculation (shortened by another 1 second)
  const totalDuration = 200 + wordDelay + 1400 + 1000;

  // Transition out: organic wave sweeps over text and unveils the site
  setTimeout(() => {
    intro.classList.add('animate-out');
    document.body.classList.remove('intro-active');
    
    // Clean up DOM after wave curtains complete sweep
    setTimeout(() => {
      document.body.classList.add('intro-finished');
      intro.remove(); 
    }, 1800); // 1.5s wave travel + 0.18s stagger delay
  }, totalDuration);
}

/* Continuous Abstract Chaotic Floating Waves on Background (Speed 0.4) */
function initAmbientBackgroundWaves() {
  const canvas = document.getElementById('bg-floating-waves');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Base speed requested by user: 0.4
  const speed = 0.4;
  let step = 0;

  // Chaotic, vibrant multi-harmonic wave layers
  const waveLayers = [
    {
      yRatio: 0.28,
      amplitude: 80,
      freq1: 0.0016,
      freq2: 0.0037,
      freq3: 0.0009,
      speed1: 1.1,
      speed2: -0.85,
      speed3: 0.6,
      phase: 0.4,
      gradient: ['rgba(251, 191, 36, 0.45)', 'rgba(217, 119, 6, 0.05)'],
      stroke: 'rgba(253, 224, 71, 0.95)',
      glow: '#F59E0B',
      lineWidth: 3.2
    },
    {
      yRatio: 0.46,
      amplitude: 105,
      freq1: 0.0022,
      freq2: 0.0049,
      freq3: 0.0012,
      speed1: -0.9,
      speed2: 1.3,
      speed3: -0.5,
      phase: 1.8,
      gradient: ['rgba(56, 189, 248, 0.42)', 'rgba(2, 132, 199, 0.04)'],
      stroke: 'rgba(125, 211, 252, 0.90)',
      glow: '#38BDF8',
      lineWidth: 3.0
    },
    {
      yRatio: 0.64,
      amplitude: 90,
      freq1: 0.0013,
      freq2: 0.0031,
      freq3: 0.0021,
      speed1: 1.3,
      speed2: -1.1,
      speed3: 0.8,
      phase: 3.2,
      gradient: ['rgba(16, 185, 129, 0.38)', 'rgba(5, 150, 105, 0.04)'],
      stroke: 'rgba(110, 231, 183, 0.85)',
      glow: '#10B981',
      lineWidth: 2.8
    },
    {
      yRatio: 0.82,
      amplitude: 115,
      freq1: 0.0019,
      freq2: 0.0041,
      freq3: 0.0008,
      speed1: -1.0,
      speed2: 0.7,
      speed3: 1.4,
      phase: 4.6,
      gradient: ['rgba(245, 158, 11, 0.40)', 'rgba(180, 83, 9, 0.04)'],
      stroke: 'rgba(251, 191, 36, 0.88)',
      glow: '#FBBF24',
      lineWidth: 3.0
    }
  ];

  function render() {
    ctx.clearRect(0, 0, width, height);
    step += speed * 0.022;

    waveLayers.forEach((wave) => {
      const baseY = height * wave.yRatio;
      
      // 1. Fill polygon for gradient (extends outside viewport to avoid borders)
      ctx.beginPath();
      ctx.moveTo(-30, height + 30);
      ctx.lineTo(-30, baseY);

      for (let x = -30; x <= width + 30; x += 8) {
        const h1 = Math.sin(x * wave.freq1 + step * wave.speed1 + wave.phase);
        const h2 = Math.cos(x * wave.freq2 + step * wave.speed2 + wave.phase * 1.5);
        const h3 = Math.sin(x * wave.freq3 + step * wave.speed3);
        const chaoticOffset = (h1 * 0.55 + h2 * 0.32 + h3 * 0.25) * wave.amplitude;
        ctx.lineTo(x, baseY + chaoticOffset);
      }

      ctx.lineTo(width + 30, height + 30);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, baseY - wave.amplitude, 0, height);
      grad.addColorStop(0, wave.gradient[0]);
      grad.addColorStop(1, wave.gradient[1]);
      ctx.fillStyle = grad;
      ctx.shadowBlur = 0;
      ctx.fill();

      // 2. Stroke ONLY the crest line (extends past edges, zero vertical/bottom edge lines)
      if (wave.stroke) {
        ctx.beginPath();
        let isFirst = true;

        for (let x = -30; x <= width + 30; x += 8) {
          const h1 = Math.sin(x * wave.freq1 + step * wave.speed1 + wave.phase);
          const h2 = Math.cos(x * wave.freq2 + step * wave.speed2 + wave.phase * 1.5);
          const h3 = Math.sin(x * wave.freq3 + step * wave.speed3);
          const chaoticOffset = (h1 * 0.55 + h2 * 0.32 + h3 * 0.25) * wave.amplitude;
          const y = baseY + chaoticOffset;

          if (isFirst) {
            ctx.moveTo(x, y);
            isFirst = false;
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = wave.stroke;
        ctx.lineWidth = wave.lineWidth;
        ctx.shadowColor = wave.glow;
        ctx.shadowBlur = 18;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    });

    requestAnimationFrame(render);
  }

  render();
}

