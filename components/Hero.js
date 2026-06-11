/**
 * EQX Hero Component (Apidura Style)
 * Renders the full-screen atmospheric hero with fine wide typography and parallax scroll offsets.
 */
export function initHero(container) {
  if (!container) return;

  container.innerHTML = `
    <section class="eqx-hero">
      <div class="hero-backdrop"></div>
      
      <div class="eqx-logo-3d reveal">EQX</div>
      
      <div class="hero-subtitle reveal reveal-delay-1">Leading the evolution in</div>
      
      <h1 class="hero-title reveal reveal-delay-2">
        Digital<br>Engineering
      </h1>
      
      <div class="hero-scroll-indicator reveal reveal-delay-2" id="scroll-to-capabilities">
        <span>Explore</span>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 13l-7 7-7-7m14-6l-7 7-7-7" />
        </svg>
      </div>
    </section>
  `;

  // Bind scroll navigation
  const scrollTrigger = container.querySelector('#scroll-to-capabilities');
  if (scrollTrigger) {
    scrollTrigger.addEventListener('click', () => {
      const target = document.getElementById('hex-services');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Interactive parallax background movement
  const heroSection = container.querySelector('.eqx-hero');
  const backdrop = container.querySelector('.hero-backdrop');

  if (heroSection && backdrop) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      backdrop.style.transform = `translateY(${scrolled * 0.25}px)`;
    });
  }

  // Reveal observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  container.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
