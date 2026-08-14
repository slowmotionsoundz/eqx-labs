/**
 * EQX RoomSlider Component (Popover Modal implementation)
 * Wraps the interactive 3D rooms inside a responsive overlay modal.
 */
export function initRoomSlider(container) {
  if (!container) return;

  container.innerHTML = `
    <div class="eqx-popover" id="eqx-popover-root">
      <div class="popover-container">
        
        <button class="popover-close" aria-label="Close details">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Dynamic Slide Targets (Full-Bleed Facility Backgrounds) -->
        <div class="clay-card-visual" id="room-visual-panel" style="position: relative; background-size: cover; background-position: center; overflow: hidden; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
          <div class="clay-card-image-overlay" style="position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,0.6)); z-index: 1;"></div>
          
          <!-- Spotify Embed Container (Music Engineering Only) -->
          <div class="spotify-embed-wrapper" id="spotify-embed-el" style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; box-sizing: border-box; z-index: 2;">
            <iframe style="border-radius:12px; background: transparent;" src="https://open.spotify.com/embed/album/708dfWUVcaIxyOS0rJMSdM?utm_source=generator&theme=0" width="90%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
          </div>
        </div>

        <div class="clay-card-info">
          <div class="card-num" id="room-num">01</div>
          <h3 class="card-title" id="room-title">Capability</h3>
          <p class="card-desc" id="room-desc">Details regarding the service capability.</p>
          
          <ul class="card-details-list" id="room-bullets">
            <!-- Bullet lists will be injected here -->
          </ul>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
            <a href="#mission" class="clay-button" id="popover-cta-btn">Connect With Us</a>
            
            <!-- Controls in modal footer -->
            <div class="slider-controls" style="margin-top: 0; gap: 12px;">
              <button class="slider-arrow prev-btn" aria-label="Previous">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button class="slider-arrow next-btn" aria-label="Next">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  // Capabilities Data (Refined Copy and High-Res Images)
  const roomsData = [
    {
      num: '01',
      title: 'Digital Engineering',
      desc: 'We design and build bespoke software systems, mobile apps, custom plugins, and the backend cloud infrastructure that powers them. Our automation workflows streamline operations and eliminate manual tasks, giving you and your team your time back.',
      bullets: [
        'Bespoke software systems & mobile app builds',
        'Secure cloud infrastructure & database engineering',
        'Process automation & customized plugin tools'
      ],
      photo: 'assets/EQX Website Photos/eqoffice.jpeg'
    },
    {
      num: '02',
      title: 'Music Engineering',
      desc: 'Produced by The Block Beattaz and headed by Leighton Hicks. We handle professional music production, mixing, and mastering, working directly with artists to calibrate their sound and achieve pristine quality.',
      bullets: [
        'Professional mixing & analog mastering console',
        'Multi-channel arrangements & spatial audio design',
        'Vocal tracking & acoustic room calibration'
      ],
      photo: 'assets/EQX Website Photos/eqcontrol.jpeg'
    },
    {
      num: '03',
      title: 'Content Production',
      desc: 'Creating high-end digital assets, custom design layouts, and cinematic post-production elements. We craft clean, premium visual identities that resonate with Scandinavian minimalism and modern aesthetics.',
      bullets: [
        'Custom visual design & brand asset layouts',
        'Cinematic video editing & post-production templates',
        'Minimalist Scandinavian-inspired UI/UX interfaces'
      ],
      photo: 'assets/EQX Website Photos/AlHolbrook-EqLabs-Landskrona-2025_049.jpg'
    },
    {
      num: '04',
      title: 'Project Logistics',
      desc: 'We keep your digital projects organized and on track. From setting up secure servers and databases to managing deadlines and team execution, we make sure your platforms run reliably and launch without headaches.',
      bullets: [
        'Organized project management & clear timelines',
        'Secure server setup & database management',
        'Automated system updates & reliable launches'
      ],
      photo: 'assets/EQX Website Photos/AlHolbrook-EqLabs-Landskrona-2025_004.jpg'
    }
  ];

  let currentIndex = 0;

  const popover = container.querySelector('#eqx-popover-root');
  const closeBtn = container.querySelector('.popover-close');
  const nextBtn = container.querySelector('.next-btn');
  const prevBtn = container.querySelector('.prev-btn');
  const ctaBtn = container.querySelector('#popover-cta-btn');

  // DOM targets
  const elNum = container.querySelector('#room-num');
  const elTitle = container.querySelector('#room-title');
  const elDesc = container.querySelector('#room-desc');
  const elBullets = container.querySelector('#room-bullets');
  const visualPanel = container.querySelector('#room-visual-panel');

  function renderCard(index) {
    currentIndex = index;
    const data = roomsData[index];
    if (!data) return;

    elNum.textContent = data.num;
    elTitle.textContent = data.title;
    elDesc.textContent = data.desc;

    // Render bullets
    elBullets.innerHTML = data.bullets.map(b => `<li class="card-detail-item"><span></span> ${b}</li>`).join('');

    // Set full-bleed background photo
    if (visualPanel && data.photo) {
      visualPanel.style.backgroundImage = `url('${data.photo}')`;
    }

    // Toggle between Spotify Embed and Room Image
    const spotifyEl = container.querySelector('#spotify-embed-el');

    if (index === 1) { // Music Engineering
      if (spotifyEl) spotifyEl.style.display = 'flex';
    } else {
      if (spotifyEl) spotifyEl.style.display = 'none';
    }

    // Update CTA button based on capability
    if (index === 1) { // Music
      ctaBtn.textContent = 'Explore Studio';
      ctaBtn.setAttribute('href', 'studio.html');
    } else {
      ctaBtn.textContent = 'Connect With Us';
      ctaBtn.setAttribute('href', '#mission');
    }
  }

  // Open popover
  function openPopover(index) {
    renderCard(index);
    popover.classList.add('open');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  }

  // Close popover
  function closePopover() {
    popover.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Bind close buttons
  closeBtn.addEventListener('click', closePopover);
  popover.addEventListener('click', (e) => {
    if (e.target === popover) {
      closePopover();
    }
  });

  // Next & Prev arrows within modal
  nextBtn.addEventListener('click', () => {
    const nextIdx = (currentIndex + 1) % roomsData.length;
    renderCard(nextIdx);
  });
  prevBtn.addEventListener('click', () => {
    const prevIdx = (currentIndex - 1 + roomsData.length) % roomsData.length;
    renderCard(prevIdx);
  });

  // CTA button close popover and scroll
  ctaBtn.addEventListener('click', () => {
    closePopover();
  });

  return {
    open: (index) => openPopover(index)
  };
}
