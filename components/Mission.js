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
          Based in Landskrona, Sweden, <span>EQX</span> is a consolidated rebranding of our Huntsville (HSV) and European branches. We manage and build <span>everything digital</span>—from robust backend engineering and database logistics to front-end platforms and professional sound engineering. No jargon, just direct execution.
        </p>

        <div class="founders-title reveal reveal-delay-2">Founding Directors</div>
        
        <div class="founders-row reveal reveal-delay-3">
          
          <!-- Founder 1 -->
          <div class="founder-card">
            <div class="founder-avatar">CPz</div>
            <div class="founder-info">
              <div class="founder-name">Cory Parham</div>
              <div class="founder-role">Digital Logistics & Infrastructure</div>
            </div>
          </div>

          <!-- Founder 2 -->
          <div class="founder-card">
            <div class="founder-avatar">Rz</div>
            <div class="founder-info">
              <div class="founder-name">Rosanna Parham</div>
              <div class="founder-role">Project Management & Creative Direction</div>
            </div>
          </div>

          <!-- Founder 3 -->
          <div class="founder-card">
            <div class="founder-avatar">MB</div>
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
