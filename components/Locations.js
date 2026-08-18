/**
 * EQX Locations Component
 * Renders the Split Dome locations showcase section.
 */
export function initLocations(container) {
  if (!container) return;

  container.innerHTML = `
    <section class="locations-section" id="hubs">
      <div class="locations-grid">
        
        <div class="locations-visual-wrapper reveal">
          <img src="assets/eq_labs_split.png" alt="EQ Labs Locations Split Globe" class="locations-globe">
        </div>

        <div class="locations-content reveal reveal-delay-1">
          <div class="locations-badge">Multinational Hubs</div>
          <h2 class="locations-title"><span>EQX</span></h2>
          <p class="locations-desc">
            Bringing together our creative and digital hubs in Sweden and the United States under one unified banner. Two locations, one team.
          </p>

          <div class="hubs-list">
            <!-- Europe / Sweden -->
            <div class="hub-item europe">
              <div class="hub-icon-dot"></div>
              <div>
                <h3 class="hub-name">EQX Europe, Sweden</h3>
                <p class="hub-desc">Based in Landskrona. Leading music recording, video content, design, and local European operations.</p>
              </div>
            </div>

            <!-- Huntsville / AL -->
            <div class="hub-item hsv">
              <div class="hub-icon-dot"></div>
              <div>
                <h3 class="hub-name">EQX Labs, USA</h3>
                <p class="hub-desc">Based in Huntsville, Alabama. Directing web development, app engineering, and digital systems.</p>
              </div>
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
