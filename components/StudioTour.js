/**
 * EQX StudioTour Component
 * Renders scroll frame sequence and interactive virtual studio tour with spotlight highlights.
 */
export function initStudioTour(canvasContainer, tourContainer) {
  // 1. Canvas Scroll Sequence Player
  if (canvasContainer) {
    canvasContainer.innerHTML = `
      <section class="hero-track" id="studioTrack">
        <div class="hero-sticky">
          <canvas id="studioCanvas"></canvas>

          <div class="hero-copy-overlay">
            <div class="hero-phase" data-from="0.00" data-to="0.30">
              <span class="phase-kicker">EQX Studio</span>
              <h1>Every space starts as an idea.</h1>
            </div>
            <div class="hero-phase dark-text" data-from="0.30" data-to="0.68">
              <span class="phase-kicker">Acoustics & Architecture</span>
              <h2>Designed for sound, down to the last wall.</h2>
            </div>
            <div class="hero-phase dark-text" data-from="0.68" data-to="1.01">
              <span class="phase-kicker">The Landskrona Hub</span>
              <h2>Welcome to the Studio.</h2>
            </div>
          </div>

          <div class="hero-scroll-hint" id="studioScrollHint">
            <span>Scroll Tour</span>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 13l-7 7-7-7m14-6l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>
    `;

    const FRAME_COUNT = 96;
    const FRAME_PATH = (i) => `assets/hero-sequence-hq/frames/f${String(i + 1).padStart(3, '0')}.webp`;

    const canvas = canvasContainer.querySelector('#studioCanvas');
    if (canvas) {
      const ctx = canvas.getContext('2d', { alpha: false });
      const track = canvasContainer.querySelector('#studioTrack');
      const hint = canvasContainer.querySelector('#studioScrollHint');
      const phases = Array.from(canvasContainer.querySelectorAll('.hero-phase'));

      const images = new Array(FRAME_COUNT);
      const loaded = new Array(FRAME_COUNT).fill(false);
      let currentFrame = 0;

      function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        draw(currentFrame);
      }

      function draw(i) {
        let img = images[i];
        if (!img || !loaded[i]) {
          for (let d = 1; d < FRAME_COUNT; d++) {
            if (loaded[i - d]) { img = images[i - d]; break; }
            if (loaded[i + d]) { img = images[i + d]; break; }
          }
          if (!img) return;
        }
        const cw = canvas.width, ch = canvas.height;
        const iw = img.naturalWidth, ih = img.naturalHeight;
        const scale = Math.max(cw / iw, ch / ih);
        const w = iw * scale, h = ih * scale;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      }

      function loadFrame(i, cb) {
        if (images[i]) return;
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => { loaded[i] = true; if (cb) cb(i); };
        img.src = FRAME_PATH(i);
        images[i] = img;
      }

      loadFrame(0, () => resize());
      [24, 48, 72, 95].forEach((i) => loadFrame(i));
      const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 120));
      idle(() => {
        for (let i = 0; i < FRAME_COUNT; i++) {
          loadFrame(i, (j) => {
            if (j === currentFrame) draw(j);
          });
        }
      });

      function progress() {
        const rect = track.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        if (total <= 0) return 1;
        return Math.min(1, Math.max(0, -rect.top / total));
      }

      let ticking = false;
      function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          const p = progress();
          const frame = Math.min(FRAME_COUNT - 1, Math.round(p * (FRAME_COUNT - 1)));
          if (frame !== currentFrame) {
            currentFrame = frame;
            draw(frame);
          }
          phases.forEach((el) => {
            const from = parseFloat(el.dataset.from);
            const to = parseFloat(el.dataset.to);
            el.classList.toggle('on', p >= from && p < to);
          });
          if (hint) hint.classList.toggle('off', p > 0.04);
        });
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', resize);
      onScroll();
      resize();
    }
  }

  // 2. Option 1: Interactive "Lighting Rig" 3D Stage Viewer
  if (tourContainer) {
    const tourData = [
      {
        id: 'overview',
        badge: 'Building Overview',
        title: 'Full Facility Architecture',
        desc: 'Our modern Scandinavian sound & engineering hub in Landskrona. Combining acoustic control rooms, live tracking stages, artist lounge suites, and upper-floor digital engineering offices.',
        bullets: [
          'Unified multi-disciplinary creative facility',
          'Acoustically isolated control rooms & stage areas',
          'Full-service music, video, and software operations'
        ],
        photo: 'assets/EQX%20Website%20Photos/eqx.jpeg',
        hotspot: { top: '50%', left: '50%', label: 'Facility Entrance' },
        panelPosition: 'pos-bottom-left'
      },
      {
        id: 'control-room',
        badge: 'Studio A / Control Desk',
        title: 'EQ Control Room',
        desc: 'Our primary sound engineering, mixing, and mastering workstation. Equipped with full-scale audio consoles, custom acoustic diffusors, and precision monitors for pristine audio production.',
        bullets: [
          'Analog & digital multi-channel audio console',
          'Sound-isolated acoustic control room',
          'Stereo mastering & vocal tracking desk'
        ],
        photo: 'assets/EQX%20Website%20Photos/eqcontrol.jpeg',
        hotspot: { top: '42%', left: '22%', label: 'Audio Console & Monitors' },
        panelPosition: 'pos-bottom-right'
      },
      {
        id: 'live-stage',
        badge: 'Studio B / Live Stage',
        title: 'EQ Live Stage',
        desc: 'Dedicated live performance and rehearsal stage built with custom acoustic staging, microphone setups, and dynamic lighting to capture live sessions and band rehearsals.',
        bullets: [
          'Custom drum stage & live performance tracking',
          'Acoustically tuned rehearsal environment',
          'Multi-channel stage headphone mixes'
        ],
        photo: 'assets/EQX%20Website%20Photos/eqliveroom.jpeg',
        hotspot: { top: '48%', left: '72%', label: 'Acoustic Stage & Microphones' },
        panelPosition: 'pos-bottom-left'
      },
      {
        id: 'artist-lounge',
        badge: 'Creative Lounge',
        title: 'EQ Lounge Suite',
        desc: 'Comfortable central artist lounge designed for writing sessions, listening parties, client meetings, and relaxed creative collaboration between recording takes.',
        bullets: [
          'Spacious seating & listening room atmosphere',
          'Direct access to live tracking & control suites',
          'Client & artist breakout space'
        ],
        photo: 'assets/EQX%20Website%20Photos/eqlounge.jpeg',
        hotspot: { top: '68%', left: '46%', label: 'Central Artist Lounge' },
        panelPosition: 'pos-top-right'
      },
      {
        id: 'engineering-office',
        badge: 'Digital Engineering',
        title: 'Software & Ops Office',
        desc: 'Upper floor workstation for software engineering, app development, database architecture, and project management operations.',
        bullets: [
          'Dual-monitor software developer desks',
          'Backend system architecture & cloud deployment hub',
          'Project logistics & team coordination workspace'
        ],
        photo: 'assets/EQX%20Website%20Photos/eqoffice.jpeg',
        hotspot: { top: '28%', left: '68%', label: 'Developer Workstations' },
        panelPosition: 'pos-bottom-left'
      }
    ];

    tourContainer.innerHTML = `
      <section class="tour-section" id="virtual-tour">
        <div class="showcase-container">
          <div class="tour-header text-center" style="text-align: center; margin-bottom: 30px;">
            <div class="studio-badge" style="display: inline-block; margin-bottom: 12px;">3D Interactive Stage</div>
            <h2 class="grid-title">Virtual <span>Studio Tour</span></h2>
            <p class="tour-intro" style="color: var(--eqx-text-muted); max-width: 600px; margin: 12px auto 0;">Select or hover over a facility below to light up that room in 3D space.</p>
          </div>

          <!-- Tabs Navigation -->
          <div class="stage-tabs">
            ${tourData.map((item, index) => `
              <button class="stage-tab-btn ${index === 0 ? 'active' : ''}" data-target="${item.id}">
                ${item.title}
              </button>
            `).join('')}
          </div>

          <!-- 3D Interactive Stage Showcase Container -->
          <div class="stage-viewer-container">
            <!-- Stacked Render Layers -->
            <div class="stage-render-stack">
              ${tourData.map((item, index) => `
                <div class="stage-layer ${index === 0 ? 'active' : ''}" id="layer-${item.id}" style="background-image: url('${item.photo}');">
                  <div class="stage-hotspot" style="top: ${item.hotspot.top}; left: ${item.hotspot.left};">
                    <div class="hotspot-pulse"></div>
                    <div class="hotspot-tooltip">${item.hotspot.label}</div>
                  </div>
                </div>
              `).join('')}
              <div class="stage-frame-overlay"></div>
            </div>

            <!-- Dynamic Floating Glassmorphism Info Panel -->
            <div class="stage-info-panel pos-bottom-left" id="stage-info-card">
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
    const infoPanel = tourContainer.querySelector('#stage-info-card');
    const infoBadge = tourContainer.querySelector('#info-badge');
    const infoTitle = tourContainer.querySelector('#info-title');
    const infoDesc = tourContainer.querySelector('#info-desc');
    const infoBullets = tourContainer.querySelector('#info-bullets');

    function activateRoom(targetId) {
      const data = tourData.find(item => item.id === targetId);
      if (!data) return;

      // Update tabs active state
      tabBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-target') === targetId));

      // Cross-fade stacked render layers
      layers.forEach(layer => {
        layer.classList.toggle('active', layer.id === `layer-${targetId}`);
      });

      // Update floating position to unblock active room spotlight
      infoPanel.className = `stage-info-panel ${data.panelPosition}`;

      // Smoothly update info panel text
      infoBadge.textContent = data.badge;
      infoTitle.textContent = data.title;
      infoDesc.textContent = data.desc;
      infoBullets.innerHTML = data.bullets.map(b => `<li><span class="bullet-dot"></span> ${b}</li>`).join('');
    }

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => activateRoom(btn.getAttribute('data-target')));
      btn.addEventListener('mouseenter', () => activateRoom(btn.getAttribute('data-target')));
    });
  }
}
