/**
 * PORTFOLITE® Luxury Minimalist Interactive Logic
 * Brand: integro.ua Маркетинг
 */

document.addEventListener('DOMContentLoaded', () => {
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

  // Total reading time calculation (approx)
  // Base delay (200) + all words stagger + hold time (1200)
  const totalDuration = 200 + wordDelay + 1400;

  // Transition out after reading time
  setTimeout(() => {
    intro.classList.add('animate-out');
    document.body.classList.remove('intro-active');
    
    // Clean up DOM after transition
    setTimeout(() => {
      document.body.classList.add('intro-finished');
      intro.remove(); 
    }, 1600); // Wait for CSS transition waves (max 1.5s)
  }, totalDuration);
}

