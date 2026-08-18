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
          <h3 class="card-title" id="room-title">Service</h3>
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

  // Capabilities Data (Plain English, Practical & Human-Friendly Copy)
  const roomsData = [
    {
      num: '01',
      title: 'Digital Engineering',
      desc: 'We build custom websites, mobile apps, and online tools that actually work for your business. Whether you need a simple booking system, an online store, or custom business software, we handle the tech from start to finish.',
      bullets: [
        'Custom websites & mobile apps built to last',
        'Fast, secure online stores & booking systems',
        'Automations that save you hours of manual work'
      ],
      photo: 'assets/EQX Website Photos/AlHolbrook-EqLabs-Landskrona-2025_021.jpg',
      ctaText: 'Start a Project',
      ctaLink: 'booking.html'
    },
    {
      num: '02',
      title: 'Music & Recording',
      desc: 'Produced by The Block Beattaz and Mali Boi. We offer full recording sessions, mixing, mastering, and custom production in our Landskrona studio. From raw vocals to radio-ready tracks, we help artists polish and release their sound.',
      bullets: [
        'Professional vocal recording & live room sessions',
        'Industry-standard mixing & analog mastering',
        'Custom beat production & sound design'
      ],
      photo: 'assets/EQX Website Photos/AlHolbrook-EqLabs-Landskrona-2025_030.jpg',
      ctaText: 'Explore Studio',
      ctaLink: 'studio.html'
    },
    {
      num: '03',
      title: 'Content Production',
      desc: 'Great ideas need great visuals. We shoot and edit promotional videos, artist interviews, studio sessions, and social media content right here in Sweden. We deliver clean, sharp visuals that make your brand or music stand out.',
      bullets: [
        'Promotional videos, music videos & live streaming',
        'Studio photography & product shoots',
        'Social media content & graphic design'
      ],
      photo: 'assets/EQX Website Photos/AlHolbrook-EqLabs-Landskrona-2025_049.jpg',
      ctaText: 'Book a Shoot',
      ctaLink: 'booking.html'
    },
    {
      num: '04',
      title: 'Project Logistics',
      desc: 'We help you get big projects across the finish line without the stress. We coordinate everything from software launches and sports marketing campaigns to Scandinavian travel arrangements for visiting artists, athletes, and teams.',
      bullets: [
        'Clear timelines and step-by-step project delivery',
        'Sports marketing & tournament management',
        'Travel planning for visiting creatives, teams & clients'
      ],
      photo: 'assets/EQX Website Photos/20220808_192335.jpg',
      ctaText: 'Get In Touch',
      ctaLink: '#mission'
    },
    {
      num: '05',
      title: 'About EQX',
      desc: 'EQX connects two creative hubs in Landskrona, Sweden and Huntsville, Alabama. We bring together veteran music producers, software developers, and media creators under one roof to build real things for real people.',
      bullets: [
        '25+ years in creative & entertainment industries',
        'Physical studios & recording facilities in Sweden',
        'Global reach connecting Scandinavia and North America'
      ],
      photo: 'assets/EQX Website Photos/AlHolbrook-EqLabs-Landskrona-2025_004.jpg',
      ctaText: 'Read Our Story',
      ctaLink: '#mission'
    },
    {
      num: '06',
      title: 'Work With Us',
      desc: 'Got a project in mind? Whether you want to book studio time in Landskrona, build a new website or app, or collaborate on creative content, we would love to talk through your ideas.',
      bullets: [
        'Direct contact with our production & engineering team',
        'Fast response for studio bookings & quotes',
        'Transparent pricing with no hidden jargon'
      ],
      photo: 'assets/EQX Website Photos/AlHolbrook-EqLabs-Landskrona-2025_020.jpg',
      ctaText: 'Book a Session',
      ctaLink: 'booking.html'
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
    if (data.ctaText && data.ctaLink) {
      ctaBtn.textContent = data.ctaText;
      ctaBtn.setAttribute('href', data.ctaLink);
    } else if (index === 1) { // Music
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
