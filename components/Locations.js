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
          <div class="locations-badge">Dual Core Hubs</div>
          <h2 class="locations-title">Consolidating <span>EQ Labs</span></h2>
          <p class="locations-desc">
            Bringing together the physical and digital hubs of EQ Labs Europe and eq.labs HSV under the unified banner of EQX Landskrona. Two hemispheres, one vision.
          </p>

          <div class="hubs-list">
            <!-- Europe / Sweden -->
            <div class="hub-item europe">
              <div class="hub-icon-dot"></div>
              <div>
                <h3 class="hub-name">EQ Europe — Sweden</h3>
                <p class="hub-desc">Based in Landskrona. Directing creative direction, digital content production, design, and local European properties.</p>
              </div>
            </div>

            <!-- Huntsville / AL -->
            <div class="hub-item hsv">
              <div class="hub-icon-dot"></div>
              <div>
                <h3 class="hub-name">EQ Labs HSV — USA</h3>
                <p class="hub-desc">Based in Huntsville, Alabama. Focusing on digital logistics infrastructure, automated platforms, and database engineering.</p>
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
