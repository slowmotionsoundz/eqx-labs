/**
 * EQX Universal Navigation & Mobile Slide-out Drawer
 * Automatically powers the responsive navigation and mobile menu across all pages.
 */
export function initNavigation() {
  const header = document.querySelector('.eqx-header');
  if (!header) return;

  // 1. Ensure mobile toggle button exists
  let toggleBtn = header.querySelector('.mobile-menu-toggle');
  if (!toggleBtn) {
    toggleBtn = document.createElement('button');
    toggleBtn.className = 'mobile-menu-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle navigation menu');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.innerHTML = `
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    `;
    header.appendChild(toggleBtn);
  }

  // 2. Ensure mobile drawer exists in DOM
  let drawer = document.getElementById('mobile-nav-drawer');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'mobile-nav-drawer';
    drawer.className = 'mobile-nav-drawer';
    drawer.setAttribute('aria-hidden', 'true');
    drawer.innerHTML = `
      <div class="mobile-nav-backdrop"></div>
      <div class="mobile-nav-panel">
        <div class="mobile-nav-header">
          <a href="index.html" class="logo-eqx">EQX</a>
          <button class="mobile-nav-close" aria-label="Close menu">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav class="mobile-nav-links">
          <a href="index.html" class="mobile-nav-link">
            <span class="mobile-nav-num">01</span>
            <span class="mobile-nav-text">Home</span>
          </a>
          <a href="index.html#hex-services" class="mobile-nav-link">
            <span class="mobile-nav-num">02</span>
            <span class="mobile-nav-text">Services</span>
          </a>
          <a href="studio.html" class="mobile-nav-link">
            <span class="mobile-nav-num">03</span>
            <span class="mobile-nav-text">Studio & Sound</span>
          </a>
          <a href="booking.html" class="mobile-nav-link">
            <span class="mobile-nav-num">04</span>
            <span class="mobile-nav-text">Book a Session</span>
          </a>
          <a href="index.html#mission" class="mobile-nav-link">
            <span class="mobile-nav-num">05</span>
            <span class="mobile-nav-text">The EQX Mission</span>
          </a>
        </nav>

        <div class="mobile-nav-footer">
          <a href="booking.html" class="clay-button mobile-nav-cta">Reserve Session</a>
          <div class="mobile-nav-meta">
            <span>Landskrona, Sweden</span>
            <span class="meta-dot">•</span>
            <span>Huntsville, USA</span>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(drawer);
  }

  const closeBtn = drawer.querySelector('.mobile-nav-close');
  const backdrop = drawer.querySelector('.mobile-nav-backdrop');
  const links = drawer.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');

  function openMenu() {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  links.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });

  // Highlight active link based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  drawer.querySelectorAll('.mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
