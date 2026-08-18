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
          Based in Landskrona, Sweden and Huntsville, Alabama, <span>EQX</span> builds custom digital projects from the ground up. We deliver real results across music production, web development, and project management with zero fluff.
        </p>

        <div class="founders-title reveal reveal-delay-2">Founding Directors</div>
        
        <div class="founders-row reveal reveal-delay-3">
          
          <!-- Founder 1: Cory Parham -->
          <div class="founder-card">
            <div class="founder-avatar">CP</div>
            <div class="founder-info">
              <div class="founder-name">Cory Parham</div>
              <div class="founder-role">Digital Logistics & Infrastructure</div>
            </div>
          </div>

          <!-- Founder 2: Rosanna Parham -->
          <div class="founder-card">
            <div class="founder-avatar">RP</div>
            <div class="founder-info">
              <div class="founder-name">Rosanna Parham</div>
              <div class="founder-role">Project Management & Creative Direction</div>
            </div>
          </div>

          <!-- Founder 3: Leighton Hicks -->
          <div class="founder-card">
            <div class="founder-avatar">LH</div>
            <div class="founder-info">
              <div class="founder-name">Leighton Hicks</div>
              <div class="founder-role">Sound & Music Engineering</div>
            </div>
          </div>

        </div>

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
