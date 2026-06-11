/**
 * EQX HexGrid Component (Apidura interlocking layout)
 * Renders the photo-based interlocking honeycomb layout.
 */
export function initHexGrid(container, onLearnMore) {
  if (!container) return;

  container.innerHTML = `
    <section class="hex-section" id="hex-services">
      <div class="hex-container">
        
        <!-- ROW 1 (3 Hexagons) -->
        <div class="hex-row reveal">
          
          <!-- Hex 1: Digital Engineering -->
          <div class="hex-card" data-index="0">
            <div class="hex-card-bg" style="background-image: url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600');"></div>
            <div class="hex-card-overlay"></div>
            <div class="hex-card-content">
              <h3 class="hex-title">Digital Engineering</h3>
              <button class="hex-cta-btn">Learn More</button>
            </div>
          </div>

          <!-- Hex 2: Music -->
          <div class="hex-card" data-index="1">
            <div class="hex-card-bg" style="background-image: url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=600');"></div>
            <div class="hex-card-overlay"></div>
            <div class="hex-card-content">
              <h3 class="hex-title">Music</h3>
              <button class="hex-cta-btn">Learn More</button>
            </div>
          </div>

          <!-- Hex 3: Content -->
          <div class="hex-card" data-index="2">
            <div class="hex-card-bg" style="background-image: url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600');"></div>
            <div class="hex-card-overlay"></div>
            <div class="hex-card-content">
              <h3 class="hex-title">Content</h3>
              <button class="hex-cta-btn">Learn More</button>
            </div>
          </div>

        </div>

        <!-- ROW 2 (2 Hexagons - offset to overlap) -->
        <div class="hex-row offset-row reveal reveal-delay-1">
          
          <!-- Hex 4: Project Logistics -->
          <div class="hex-card" data-index="3">
            <div class="hex-card-bg" style="background-image: url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600');"></div>
            <div class="hex-card-overlay"></div>
            <div class="hex-card-content">
              <h3 class="hex-title">Project Logistics</h3>
              <button class="hex-cta-btn">Learn More</button>
            </div>
          </div>

          <!-- Hex 5: Team -->
          <div class="hex-card" id="trigger-mission">
            <div class="hex-card-bg" style="background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600');"></div>
            <div class="hex-card-overlay"></div>
            <div class="hex-card-content">
              <h3 class="hex-title">Company</h3>
              <button class="hex-cta-btn">About Us</button>
            </div>
          </div>

        </div>

        <!-- ROW 3 (1 Hexagon centered) -->
        <div class="hex-row offset-row reveal reveal-delay-2">
          
          <!-- Hex 6: Contact -->
          <div class="hex-card" id="trigger-contact">
            <div class="hex-card-bg" style="background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600');"></div>
            <div class="hex-card-overlay"></div>
            <div class="hex-card-content">
              <h3 class="hex-title">Contact</h3>
              <button class="hex-cta-btn">Get In Touch</button>
            </div>
          </div>

        </div>

      </div>
    </section>
  `;

  // Bind clicks for capabilities popover
  container.querySelectorAll('.hex-card[data-index]').forEach(card => {
    card.addEventListener('click', () => {
      const index = parseInt(card.getAttribute('data-index'), 10);
      if (typeof onLearnMore === 'function') {
        onLearnMore(index);
      }
    });
  });

  // Scroll triggers for Company & Contact
  const missionTrigger = container.querySelector('#trigger-mission');
  if (missionTrigger) {
    missionTrigger.addEventListener('click', () => {
      document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const contactTrigger = container.querySelector('#trigger-contact');
  if (contactTrigger) {
    contactTrigger.addEventListener('click', () => {
      // Smooth scroll to footer contact links
      document.querySelector('.eqx-footer')?.scrollIntoView({ behavior: 'smooth' });
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
