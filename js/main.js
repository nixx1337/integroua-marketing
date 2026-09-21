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

/* Continuous Dark Amorphous Silver Liquid & Smoke Background (Speed 0.4) */
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

  const speed = 0.4;
  let time = 0;

  // Amorphous liquid smoke & silver mercury layers
  const liquidLayers = [
    {
      baseYRatio: 0.32,
      amp: 110,
      f1: 0.0009,
      f2: 0.0021,
      f3: 0.0004,
      s1: 0.7,
      s2: -0.5,
      s3: 0.3,
      phase: 0.2,
      gradient: [
        { stop: 0, color: 'rgba(226, 232, 240, 0.09)' },
        { stop: 0.25, color: 'rgba(148, 163, 184, 0.05)' },
        { stop: 0.65, color: 'rgba(30, 41, 59, 0.04)' },
        { stop: 1, color: 'rgba(5, 7, 10, 0.00)' }
      ],
      stroke: 'rgba(241, 245, 249, 0.28)',
      glow: 'rgba(226, 232, 240, 0.22)',
      blur: 24,
      lineWidth: 1.6
    },
    {
      baseYRatio: 0.50,
      amp: 140,
      f1: 0.0012,
      f2: 0.0028,
      f3: 0.0006,
      s1: -0.6,
      s2: 0.8,
      s3: -0.4,
      phase: 1.9,
      gradient: [
        { stop: 0, color: 'rgba(203, 213, 225, 0.08)' },
        { stop: 0.3, color: 'rgba(100, 116, 139, 0.05)' },
        { stop: 0.7, color: 'rgba(15, 23, 42, 0.03)' },
        { stop: 1, color: 'rgba(5, 7, 10, 0.00)' }
      ],
      stroke: 'rgba(203, 213, 225, 0.22)',
      glow: 'rgba(148, 163, 184, 0.18)',
      blur: 20,
      lineWidth: 1.4
    },
    {
      baseYRatio: 0.68,
      amp: 125,
      f1: 0.0008,
      f2: 0.0019,
      f3: 0.0003,
      s1: 0.8,
      s2: -0.7,
      s3: 0.5,
      phase: 3.7,
      gradient: [
        { stop: 0, color: 'rgba(241, 245, 249, 0.07)' },
        { stop: 0.35, color: 'rgba(71, 85, 105, 0.04)' },
        { stop: 0.8, color: 'rgba(15, 23, 42, 0.02)' },
        { stop: 1, color: 'rgba(5, 7, 10, 0.00)' }
      ],
      stroke: 'rgba(226, 232, 240, 0.20)',
      glow: 'rgba(203, 213, 225, 0.15)',
      blur: 22,
      lineWidth: 1.2
    },
    {
      baseYRatio: 0.86,
      amp: 160,
      f1: 0.0010,
      f2: 0.0024,
      f3: 0.0005,
      s1: -0.5,
      s2: 0.6,
      s3: 0.9,
      phase: 5.1,
      gradient: [
        { stop: 0, color: 'rgba(148, 163, 184, 0.06)' },
        { stop: 0.4, color: 'rgba(51, 65, 85, 0.04)' },
        { stop: 0.9, color: 'rgba(15, 23, 42, 0.01)' },
        { stop: 1, color: 'rgba(5, 7, 10, 0.00)' }
      ],
      stroke: 'rgba(148, 163, 184, 0.18)',
      glow: 'rgba(100, 116, 139, 0.12)',
      blur: 26,
      lineWidth: 1.2
    }
  ];

  // Amorphous floating smoke puffs / liquid specular light pools
  const smokePuffs = [
    { xRatio: 0.25, yRatio: 0.35, radius: 420, sX: 0.3, sY: 0.4, alpha: 0.06 },
    { xRatio: 0.75, yRatio: 0.60, radius: 480, sX: -0.35, sY: 0.25, alpha: 0.05 },
    { xRatio: 0.50, yRatio: 0.80, radius: 520, sX: 0.2, sY: -0.3, alpha: 0.05 }
  ];

  function render() {
    ctx.clearRect(0, 0, width, height);
    time += speed * 0.012;

    // 1. Render amorphous drifting liquid smoke clouds (soft, unrecognizable volume)
    smokePuffs.forEach((puff, idx) => {
      const px = width * puff.xRatio + Math.sin(time * puff.sX + idx * 2) * 140;
      const py = height * puff.yRatio + Math.cos(time * puff.sY + idx) * 100;
      const rad = puff.radius + Math.sin(time * 0.5 + idx) * 60;

      const radialGrad = ctx.createRadialGradient(px, py, 0, px, py, rad);
      radialGrad.addColorStop(0, `rgba(203, 213, 225, ${puff.alpha})`);
      radialGrad.addColorStop(0.4, `rgba(71, 85, 105, ${puff.alpha * 0.5})`);
      radialGrad.addColorStop(0.8, 'rgba(15, 23, 42, 0.01)');
      radialGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = radialGrad;
      ctx.beginPath();
      ctx.arc(px, py, rad, 0, Math.PI * 2);
      ctx.fill();
    });

    // 2. Render amorphous silver liquid waves (dark, smoky, fluid morphing)
    liquidLayers.forEach((layer) => {
      const baseY = height * layer.baseYRatio;

      // Fill amorphous body
      ctx.beginPath();
      ctx.moveTo(-40, height + 40);
      ctx.lineTo(-40, baseY);

      for (let x = -40; x <= width + 40; x += 12) {
        // Multi-layered non-linear fluid harmonics (creates amorphous liquid mercury shapes)
        const a1 = Math.sin(x * layer.f1 + time * layer.s1 + layer.phase);
        const a2 = Math.cos(x * layer.f2 + time * layer.s2 + layer.phase * 1.4);
        const a3 = Math.sin(x * layer.f3 + time * layer.s3 + Math.cos(time * 0.3));
        const liquidOffset = (a1 * 0.55 + a2 * 0.35 + a3 * 0.25) * layer.amp;

        ctx.lineTo(x, baseY + liquidOffset);
      }

      ctx.lineTo(width + 40, height + 40);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, baseY - layer.amp, 0, height);
      layer.gradient.forEach(g => grad.addColorStop(g.stop, g.color));
      ctx.fillStyle = grad;
      ctx.shadowBlur = 0;
      ctx.fill();

      // Delicate silver liquid edge reflection (soft diffuse specular sheen, NO hard lines)
      if (layer.stroke) {
        ctx.beginPath();
        let isFirst = true;

        for (let x = -40; x <= width + 40; x += 12) {
          const a1 = Math.sin(x * layer.f1 + time * layer.s1 + layer.phase);
          const a2 = Math.cos(x * layer.f2 + time * layer.s2 + layer.phase * 1.4);
          const a3 = Math.sin(x * layer.f3 + time * layer.s3 + Math.cos(time * 0.3));
          const liquidOffset = (a1 * 0.55 + a2 * 0.35 + a3 * 0.25) * layer.amp;
          const y = baseY + liquidOffset;

          if (isFirst) {
            ctx.moveTo(x, y);
            isFirst = false;
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = layer.stroke;
        ctx.lineWidth = layer.lineWidth;
        ctx.shadowColor = layer.glow;
        ctx.shadowBlur = layer.blur;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    });

    requestAnimationFrame(render);
  }

  render();
}

