/**
 * EQX Mission Component (Apidura Style)
 * Renders the simple, non-corporate jargon mission statement and founders list in a dark aesthetic.
 */
export function initMission(container) {
  if (!container) return;

  container.innerHTML = `
    <section class="mission-section" id="mission">
      <div class="mission-container">
        
        <div class="mission-badge reveal">The EQX Mission</div>
        
        <p class="mission-text reveal reveal-delay-1">
          Connecting our operations in Huntsville, Alabama and Landskrona, Sweden, <span>EQX</span> builds custom digital products from the ground up. Whether it's backend infrastructure, clean UI, or elite sound design, we focus on the work. No jargon, just execution.
        </p>
      </div>
    </section>
  `;

  // Reveal observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  container.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
