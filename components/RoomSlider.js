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

        <!-- Dynamic Slide Targets -->
        <div class="clay-card-visual">
          <div class="isometric-box" id="isometric-box-el">
            <div class="box-face floor" id="room-floor"></div>
            <div class="box-face left-wall" id="room-left"></div>
            <div class="box-face right-wall" id="room-right"></div>
            
            <!-- Dynamic nodes will be injected here -->
            <div id="room-nodes-container"></div>
          </div>
          <div class="room-tooltip" id="room-tooltip-el">Interactive node info</div>

          <!-- Spotify Embed Container -->
          <div class="spotify-embed-wrapper" id="spotify-embed-el" style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; box-sizing: border-box;">
            <iframe style="border-radius:12px; background: transparent;" src="https://open.spotify.com/embed/album/708dfWUVcaIxyOS0rJMSdM?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
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

  // Capabilities Data
  const roomsData = [
    {
      num: '01',
      title: 'Digital Engineering',
      desc: 'We build custom software suites, apps, plug-ins, and the backend infrastructure they run on. Our platforms automate managerial office tasks and simplify complex operations, giving you your time back. We solve problems by building custom tools.',
      bullets: [
        'Custom software suites & app builds',
        'Backend infrastructure & cloud hosting',
        'Process automation & plugin development'
      ],
      floorBg: '#3B3F3D',
      leftWallBg: 'assets/EQX Website Photos/eqoffice.jpeg',
      rightWallBg: 'assets/EQX Website Photos/AlHolbrook-EqLabs-Landskrona-2025_020.jpg',
      nodes: [
        { bottom: '110px', right: '70px', tip: 'Custom App & Backend Architecture' },
        { bottom: '160px', left: '50px', tip: 'Workflow Automation & Managerial Tools' }
      ]
    },
    {
      num: '02',
      title: 'Music Engineering',
      desc: 'Produced by The Block Beattaz and headed by Leighton Hicks. We handle music production, mixing, and mastering, working directly with artists to get their sound exactly right. Check out our latest project on the player.',
      bullets: [
        'Our Latest Album Release (Out Now)',
        'Pro mixing, mastering & soundscapes',
        'Spatial audio system structures'
      ],
      floorBg: '#453C33',
      leftWallBg: 'assets/EQX Website Photos/eqcontrol.jpeg',
      rightWallBg: 'assets/EQX Website Photos/AlHolbrook-EqLabs-Landskrona-2025_001.jpg',
      nodes: [
        { bottom: '130px', right: '110px', tip: 'Advanced Audio Mixing Console' },
        { bottom: '100px', left: '70px', tip: 'Studio Acoustic Engineering' }
      ]
    },
    {
      num: '03',
      title: 'Content Production',
      desc: 'Creating custom digital assets, premium layouts, and video templates that reflect clean, high-end visual styles.',
      bullets: [
        'Custom vector art and icons',
        'Video editing and post-production assets',
        'Scandinavian design layouts'
      ],
      floorBg: '#3E4133',
      leftWallBg: 'assets/EQX Website Photos/AlHolbrook-EqLabs-Landskrona-2025_049.jpg',
      rightWallBg: 'assets/EQX Website Photos/AlHolbrook-EqLabs-Landskrona-2025_076.jpg',
      nodes: [
        { bottom: '140px', right: '80px', tip: 'Custom 3D Vector Designs' }
      ]
    },
    {
      num: '04',
      title: 'Project Logistics',
      desc: 'Providing database architecture, automated deployment pipelines, and server security combined with active project management. We align developmental roadmaps and team execution so your digital platforms run smoothly and launch on time.',
      bullets: [
        'Project management & roadmap alignment',
        'Server logistics, secure host & database sync',
        'Dockerized deployments & CI/CD pipelines'
      ],
      floorBg: '#3E3B45',
      leftWallBg: 'assets/EQX Website Photos/eqx.jpeg',
      rightWallBg: 'assets/EQX Website Photos/20220808_192335.jpg',
      nodes: [
        { bottom: '120px', right: '90px', tip: 'Firebase Infrastructure Setup' },
        { bottom: '160px', left: '60px', tip: 'Interactive Project Roadmaps' }
      ]
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
  const elFloor = container.querySelector('#room-floor');
  const elLeftWall = container.querySelector('#room-left');
  const elRightWall = container.querySelector('#room-right');
  const elNodes = container.querySelector('#room-nodes-container');
  const elTooltip = container.querySelector('#room-tooltip-el');

  function renderCard(index) {
    currentIndex = index;
    const data = roomsData[index];
    if (!data) return;

    elNum.textContent = data.num;
    elTitle.textContent = data.title;
    elDesc.textContent = data.desc;

    // Render bullets
    elBullets.innerHTML = data.bullets.map(b => `<li class="card-detail-item"><span></span> ${b}</li>`).join('');

    // Render floor color
    elFloor.style.background = data.floorBg;

    // Render wall custom backgrounds
    if (elLeftWall && data.leftWallBg) {
      elLeftWall.style.backgroundImage = `url('${data.leftWallBg}')`;
      elLeftWall.style.backgroundSize = 'cover';
      elLeftWall.style.backgroundPosition = 'center';
    }
    if (elRightWall && data.rightWallBg) {
      elRightWall.style.backgroundImage = `url('${data.rightWallBg}')`;
      elRightWall.style.backgroundSize = 'cover';
      elRightWall.style.backgroundPosition = 'center';
    }

    // Toggle between Spotify Embed and Isometric Room
    const isoBox = container.querySelector('#isometric-box-el');
    const spotifyEl = container.querySelector('#spotify-embed-el');
    const tooltipEl = container.querySelector('#room-tooltip-el');

    if (index === 1) { // Music
      if (isoBox) isoBox.style.display = 'none';
      if (tooltipEl) tooltipEl.style.display = 'none';
      if (spotifyEl) spotifyEl.style.display = 'flex';
    } else {
      if (isoBox) isoBox.style.display = 'block';
      if (tooltipEl) tooltipEl.style.display = 'block';
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

    // Render interactive nodes
    elNodes.innerHTML = data.nodes.map(node => `
      <div class="room-node" style="bottom: ${node.bottom}; ${node.left ? `left: ${node.left}` : `right: ${node.right}`};" data-tip="${node.tip}">
        <div class="room-node-pulse"></div>
      </div>
    `).join('');

    // Rebind node event handlers
    elNodes.querySelectorAll('.room-node').forEach(node => {
      node.addEventListener('mouseenter', () => {
        elTooltip.textContent = node.getAttribute('data-tip');
        elTooltip.classList.add('visible');
      });
      node.addEventListener('mouseleave', () => {
        elTooltip.classList.remove('visible');
      });
    });
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
