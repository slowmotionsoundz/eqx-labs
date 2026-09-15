/**
 * EQX StudioTour Component
 * Renders centered isometric 3D architectural renders and unified, fixed-alignment info panel.
 */
export function initStudioTour(canvasContainer, tourContainer) {
  if (tourContainer) {
    const tourData = [
      {
        id: 'control-room',
        icon: '🎛️',
        badge: 'Studio A • Control Desk',
        title: 'EQ Control Room',
        desc: 'Our primary sound engineering, mixing, and mastering workstation in Landskrona. Equipped with analog consoles, acoustic diffusors, and precision monitors for pristine audio production.',
        bullets: [
          'Analog & digital multi-channel mixing console',
          'Floating acoustic isolation & diffusor walls',
          'Stereo mastering & vocal tracking desk'
        ],
        photo: 'assets/EQX%20Website%20Photos/eqcontrol.jpeg'
      },
      {
        id: 'live-stage',
        icon: '🎙️',
        badge: 'Studio B • Live Room',
        title: 'EQ Live Stage',
        desc: 'Dedicated live performance and acoustic tracking stage built with custom acoustic staging, studio microphones, and dynamic lighting to capture live sessions and band rehearsals.',
        bullets: [
          'Live acoustic stage & instrument tracking',
          'Acoustically tuned rehearsal environment',
          'Multi-channel low-latency headphone mixes'
        ],
        photo: 'assets/EQX%20Website%20Photos/eqliveroom.jpeg'
      },
      {
        id: 'artist-lounge',
        icon: '🛋️',
        badge: 'Artist Breakout & Listening',
        title: 'EQ Lounge Suite',
        desc: 'Comfortable central artist lounge designed for writing sessions, listening parties, client playback, and relaxed creative collaboration between recording takes.',
        bullets: [
          'Comfortable seating & playback listening lounge',
          'Direct access to live & control rooms',
          'Client & artist breakout hospitality'
        ],
        photo: 'assets/EQX%20Website%20Photos/eqlounge.jpeg'
      },
      {
        id: 'facility-hub',
        icon: '🏢',
        badge: 'Building Overview',
        title: 'Full Facility Architecture',
        desc: 'Our modern Scandinavian sound & engineering hub on Gamla Kyrkogatan in Landskrona. Combining acoustic control rooms, live tracking stages, and upper-floor digital engineering offices.',
        bullets: [
          'Unified multi-disciplinary creative facility',
          'Acoustically isolated control rooms & stage areas',
          'Full-service music, video, and software operations'
        ],
        photo: 'assets/EQX%20Website%20Photos/eqx.jpeg'
      }
    ];

    let currentRoomIndex = 0;

    tourContainer.innerHTML = `
      <section class="tour-section" id="virtual-tour">
        <div class="showcase-container">
          <div class="tour-header text-center" style="text-align: center; margin-bottom: 28px;">
            <div class="studio-badge" style="display: inline-block; margin-bottom: 12px;">Studio Facilities</div>
            <h2 class="grid-title">Explore <span>Our Space</span></h2>
            <p class="tour-intro" style="color: var(--eqx-text-muted); max-width: 620px; margin: 10px auto 0; font-size: 0.95rem;">
              Step inside our Landskrona studio rooms designed for pristine acoustics, live session tracking, and creative comfort.
            </p>
          </div>

          <!-- Room Tabs Navigation -->
          <div class="stage-tabs">
            ${tourData.map((item, index) => `
              <button class="stage-tab-btn ${index === 0 ? 'active' : ''}" data-target="${item.id}" data-index="${index}">
                <span class="tab-icon">${item.icon}</span> ${item.title}
              </button>
            `).join('')}
          </div>

          <!-- Interactive Facility Viewer Container -->
          <div class="stage-viewer-container">
            
            <!-- 3D Isometric Viewport (Centered & Razor-Sharp) -->
            <div class="stage-render-stack" id="stage-swipe-area">
              ${tourData.map((item, index) => `
                <div class="stage-layer ${index === 0 ? 'active' : ''}" id="layer-${item.id}" style="background-image: url('${item.photo}');"></div>
              `).join('')}

              <!-- Mobile Carousel Controls -->
              <div class="stage-mobile-controls">
                <button class="stage-arrow-btn prev-room-btn" aria-label="Previous room">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div class="stage-mobile-dots">
                  ${tourData.map((_, i) => `<span class="stage-dot ${i === 0 ? 'active' : ''}"></span>`).join('')}
                </div>
                <button class="stage-arrow-btn next-room-btn" aria-label="Next room">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Unified Fixed-Alignment Info Panel (Zero Shifting) -->
            <div class="stage-info-panel" id="stage-info-card">
              <div class="stage-badge" id="info-badge">${tourData[0].badge}</div>
              <h3 class="stage-title" id="info-title">${tourData[0].title}</h3>
              <p class="stage-desc" id="info-desc">${tourData[0].desc}</p>
              <ul class="stage-bullets" id="info-bullets">
                ${tourData[0].bullets.map(b => `<li><span class="bullet-dot"></span> ${b}</li>`).join('')}
              </ul>
            </div>

          </div>
        </div>
      </section>
    `;

    // Interaction bindings
    const tabBtns = tourContainer.querySelectorAll('.stage-tab-btn');
    const layers = tourContainer.querySelectorAll('.stage-layer');
    const infoBadge = tourContainer.querySelector('#info-badge');
    const infoTitle = tourContainer.querySelector('#info-title');
    const infoDesc = tourContainer.querySelector('#info-desc');
    const infoBullets = tourContainer.querySelector('#info-bullets');
    const dots = tourContainer.querySelectorAll('.stage-dot');
    const prevBtn = tourContainer.querySelector('.prev-room-btn');
    const nextBtn = tourContainer.querySelector('.next-room-btn');

    function activateRoomIndex(index) {
      if (index < 0) index = tourData.length - 1;
      if (index >= tourData.length) index = 0;
      currentRoomIndex = index;
      const data = tourData[index];
      if (!data) return;

      // Update tabs active state
      tabBtns.forEach((btn, i) => btn.classList.toggle('active', i === index));

      // Update dots
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));

      // Cross-fade stacked render layers
      layers.forEach((layer, i) => {
        layer.classList.toggle('active', i === index);
      });

      // Smoothly update info panel text without changing positions
      infoBadge.textContent = data.badge;
      infoTitle.textContent = data.title;
      infoDesc.textContent = data.desc;
      infoBullets.innerHTML = data.bullets.map(b => `<li><span class="bullet-dot"></span> ${b}</li>`).join('');
    }

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        activateRoomIndex(idx);
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => activateRoomIndex(currentRoomIndex - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => activateRoomIndex(currentRoomIndex + 1));
    }

    // Touch swipe gesture support for mobile
    const swipeArea = tourContainer.querySelector('#stage-swipe-area');
    if (swipeArea) {
      let touchStartX = 0;
      let touchEndX = 0;

      swipeArea.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      swipeArea.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 45) {
          if (diff > 0) {
            activateRoomIndex(currentRoomIndex + 1); // Swipe left -> next
          } else {
            activateRoomIndex(currentRoomIndex - 1); // Swipe right -> prev
          }
        }
      }, { passive: true });
    }
  }
}
