/**
 * EQX BookingPortal Component
 * 3-Step wizard: Goal selection → Package cards → Booking modal
 */
export function initBookingPortal() {
  const services = [
    // [ 01 ] Studio Access (Self-Run)
    {
      id: 'byo-3h',
      category: 'studio-rental',
      categoryLabel: '[ 01 ] Studio Access (Self-Run)',
      title: 'Studio Access — Bring Your Own Engineer',
      duration: '3 Hours',
      price: 'SEK 1,050.00',
      priceRaw: 1050,
      acuityLink: 'https://app.acuityscheduling.com/schedule.php?owner=14192678&appointmentType=95791173',
      desc: 'The room, gear, and setup are yours to run. Full access to the live room, vocal booth, and control room. Bring your own engineer or handle it yourself.',
      photo: 'assets/EQX%20Website%20Photos/eqcontrol.jpeg'
    },
    {
      id: 'byo-half',
      category: 'studio-rental',
      categoryLabel: '[ 01 ] Studio Access (Self-Run)',
      title: 'Studio Access — Half Day (BYO Engineer)',
      duration: '5 Hours',
      price: 'SEK 1,500.00',
      priceRaw: 1500,
      acuityLink: 'https://app.acuityscheduling.com/schedule.php?owner=14192678&appointmentType=95791247',
      desc: 'A full afternoon or evening in the room, self-run. Same access as our hourly self-serve booking, priced for a longer block.',
      photo: 'assets/EQX%20Website%20Photos/eqcontrol.jpeg'
    },
    {
      id: 'byo-full',
      category: 'studio-rental',
      categoryLabel: '[ 01 ] Studio Access (Self-Run)',
      title: 'Studio Access — Full Day (BYO Engineer)',
      duration: '10 Hours',
      price: 'SEK 2,800.00',
      priceRaw: 2800,
      acuityLink: 'https://app.acuityscheduling.com/schedule.php?owner=14192678&appointmentType=95791300',
      desc: 'The room for a full day! Enough time for a real session from setup to wrap, without the clock pressure of hourly billing.',
      photo: 'assets/EQX%20Website%20Photos/eqcontrol.jpeg'
    },
    // [ 02 ] Studio + Engineer
    {
      id: 'eng-3h',
      category: 'engineer-sessions',
      categoryLabel: '[ 02 ] Studio + Engineer',
      title: 'Studio Session — With EQX Engineer',
      duration: '3 Hours',
      price: 'SEK 1,950.00',
      priceRaw: 1950,
      acuityLink: 'https://app.acuityscheduling.com/schedule.php?owner=14192678&appointmentType=95791356',
      desc: 'Recording, tracking, and live production with an engineer behind the desk — nearly 30 years in music tech, Billboard-recognized. Best for artists who want to focus on performance.',
      photo: 'assets/EQX%20Website%20Photos/eqcontrol.jpeg'
    },
    {
      id: 'eng-half',
      category: 'engineer-sessions',
      categoryLabel: '[ 02 ] Studio + Engineer',
      title: 'Studio Session — Half Day (With Engineer)',
      duration: '5 Hours',
      price: 'SEK 2,900.00',
      priceRaw: 2900,
      acuityLink: 'https://app.acuityscheduling.com/schedule.php?owner=14192678&appointmentType=95791384',
      desc: 'A full session with an engineer — enough time to track a handful of songs or work through a real production day.',
      photo: 'assets/EQX%20Website%20Photos/eqcontrol.jpeg'
    },
    // [ 03 ] Post-Production
    {
      id: 'mix-track',
      category: 'post-production',
      categoryLabel: '[ 03 ] Post-Production',
      title: 'Mixing (per track)',
      duration: '3-5 Days Turnaround',
      price: 'SEK 900.00',
      priceRaw: 900,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: "Your track, mixed and polished. A flat-rate service bringing out balance, depth, and clarity so it's fully ready for release. Includes 2 revisions.",
      photo: 'assets/EQX%20Website%20Photos/eqcontrol.jpeg'
    },
    {
      id: 'master-track',
      category: 'post-production',
      categoryLabel: '[ 03 ] Post-Production',
      title: 'Mastering (per track)',
      duration: '48-72 Hr Turnaround',
      price: 'SEK 450.00',
      priceRaw: 450,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: 'Final polish and loudness for release-ready sound across streaming and club systems. Flat rate per track.',
      photo: 'assets/EQX%20Website%20Photos/eqcontrol.jpeg'
    },
    {
      id: 'mix-master-bundle',
      category: 'post-production',
      categoryLabel: '[ 03 ] Post-Production',
      title: 'Mix + Master Bundle (per track)',
      duration: '5-7 Days Turnaround',
      price: 'SEK 1,200.00',
      priceRaw: 1200,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: 'A complete sonic overhaul for your track. Mixing and mastering together at a better rate, delivered fully finished and streaming-optimized. Includes 2 mix revisions.',
      photo: 'assets/EQX%20Website%20Photos/eqcontrol.jpeg'
    },
    {
      id: 'beat-lease',
      category: 'post-production',
      categoryLabel: '[ 03 ] Post-Production',
      title: 'Beat Lease / Production Session',
      duration: 'Per Session / Beat',
      price: 'SEK 650.00',
      priceRaw: 650,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: 'Dedicated production time — building a beat, developing an idea, or working a track from scratch for a flat rate.',
      photo: 'assets/EQX%20Website%20Photos/eqcontrol.jpeg'
    },
    // [ 04 ] Studio & Stay — single inquiry entry (powers the modal)
    {
      id: 'studio-inquiry',
      category: 'studio-plus',
      categoryLabel: '[ 04 ] Studio & Stay',
      title: 'Studio & Stay — Package Inquiry',
      duration: 'Custom · Based on Your Dates',
      price: 'Pricing via Airbnb',
      priceRaw: 0,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: 'Tell us your preferred dates, group size, and what you need from the studio. We will coordinate your Airbnb stay and studio sessions and send you a tailored plan.',
      photo: 'assets/EQX%20Website%20Photos/eqlounge.jpeg'
    },
    // [ 05 ] Project Inquiries
    {
      id: 'inquiry-web',
      category: 'project-inquiries',
      categoryLabel: '[ 05 ] Project Inquiries',
      title: 'Web & App Development — Discovery Call',
      duration: '20 Minutes',
      price: 'FREE',
      priceRaw: 0,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: "A short call to talk through what you're building — scope, timeline, and whether it's a fit. No commitment.",
      photo: 'assets/EQX%20Website%20Photos/eqoffice.jpeg'
    },
    {
      id: 'inquiry-sports',
      category: 'project-inquiries',
      categoryLabel: '[ 05 ] Project Inquiries',
      title: 'Sports Marketing & Brand Strategy — Discovery Call',
      duration: '20 Minutes',
      price: 'FREE',
      priceRaw: 0,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: 'Talk through your team, club, or athlete brand and where marketing support could help.',
      photo: 'assets/EQX%20Website%20Photos/eqlounge.jpeg'
    },
    {
      id: 'inquiry-pm',
      category: 'project-inquiries',
      categoryLabel: '[ 05 ] Project Inquiries',
      title: 'Project Management — Discovery Call',
      duration: '20 Minutes',
      price: 'FREE',
      priceRaw: 0,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: 'A quick call to understand the project that needs managing and whether an ongoing engagement makes sense.',
      photo: 'assets/EQX%20Website%20Photos/eqlounge.jpeg'
    },
    // [ 06 ] Consultations & Strategy
    {
      id: 'consult-artist',
      category: 'consultations',
      categoryLabel: '[ 06 ] Consultations & Strategy',
      title: 'Artist & Career Development Consult',
      duration: '30 Minutes',
      price: 'SEK 500.00',
      priceRaw: 500,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: "A focused half-hour on where your project stands and what's next — release strategy, positioning, or an honest read on your material.",
      photo: 'assets/EQX%20Website%20Photos/eqlounge.jpeg'
    },
    {
      id: 'consult-tech',
      category: 'consultations',
      categoryLabel: '[ 06 ] Consultations & Strategy',
      title: 'Music Tech / Studio Setup Consult',
      duration: '1 Hour',
      price: 'SEK 1,100.00',
      priceRaw: 1100,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: 'Building or upgrading your own setup? An hour working through gear, room treatment, and workflow.',
      photo: 'assets/EQX%20Website%20Photos/eqoffice.jpeg'
    },
    {
      id: 'consult-biz',
      category: 'consultations',
      categoryLabel: '[ 06 ] Consultations & Strategy',
      title: 'Business & Startup Strategy Consult',
      duration: '1 Hour',
      price: 'SEK 1,200.00',
      priceRaw: 1200,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: "For founders and early-stage projects — an hour of direct strategy input from someone who's built creative and tech ventures across the U.S. and Europe.",
      photo: 'assets/EQX%20Website%20Photos/eqlounge.jpeg'
    },
    // Discount Packages
    {
      id: 'pkg-8h',
      category: 'packages',
      categoryLabel: 'Discount Packages',
      title: '8-Hour Studio Package — BYO Engineer',
      duration: '8 Hours · Valid 60 Days',
      price: 'SEK 2,800.00',
      priceRaw: 2800,
      acuityLink: 'https://app.acuityscheduling.com/catalog.php?owner=14192678&action=add&service:id=2247353',
      desc: "Eight hours of self-serve studio time, split however you need it — book in 2, 3, or 4-hour blocks as your schedule allows.",
      photo: 'assets/EQX%20Website%20Photos/eqcontrol.jpeg'
    }
  ];

  const goalMeta = {
    'studio-rental':     { icon: '🔑', label: 'Studio Access (Self-Run)' },
    'engineer-sessions': { icon: '🎙️', label: 'Studio + Engineer' },
    'post-production':   { icon: '🎚️', label: 'Mixing, Mastering & Beats' },
    'studio-plus':       { icon: '🏡', label: 'Studio & Stay' },
    'consultations':     { icon: '💡', label: 'Consultations & Strategy' },
    'project-inquiries': { icon: '📞', label: 'Free Discovery Calls' },
    'packages':          { icon: '🎟️', label: 'Discount Studio Packages' },
  };

  // DOM refs
  const step1 = document.getElementById('wizard-step-1');
  const step2 = document.getElementById('wizard-step-2');
  const backBtn = document.getElementById('backToGoalsBtn');
  const servicesList = document.getElementById('wizardServicesList');
  const step2Title = document.getElementById('step2Title');
  const step2GoalIcon = document.getElementById('step2GoalIcon');
  const step2GoalLabel = document.getElementById('step2GoalLabel');

  const progStep1 = document.getElementById('prog-step-1');
  const progStep2 = document.getElementById('prog-step-2');
  const progStep3 = document.getElementById('prog-step-3');
  const progConn1 = document.getElementById('prog-conn-1');
  const progConn2 = document.getElementById('prog-conn-2');

  const modal = document.getElementById('bookingModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDuration = document.getElementById('modalDuration');
  const modalPrice = document.getElementById('modalPrice');
  const modalDesc = document.getElementById('modalDesc');
  const summarySubtotal = document.getElementById('summarySubtotal');
  const summaryDeposit = document.getElementById('summaryDeposit');
  const acuityDirectBtn = document.getElementById('acuityDirectBtn');
  const form = document.getElementById('bookingCheckoutForm');

  // Update progress bar state
  function setProgress(activeStep) {
    [progStep1, progStep2, progStep3].forEach((el, i) => {
      if (!el) return;
      el.classList.remove('active', 'done');
      if (i + 1 < activeStep) el.classList.add('done');
      else if (i + 1 === activeStep) el.classList.add('active');
    });
    if (progConn1) progConn1.classList.toggle('done', activeStep > 1);
    if (progConn2) progConn2.classList.toggle('done', activeStep > 2);
  }

  // Show Step 2 with service cards for selected category
  function showGoalServices(category) {
    if (!servicesList) return;

    const meta = goalMeta[category] || { icon: '📋', label: category };
    const filtered = services.filter(s => s.category === category);

    // Update pill + title
    if (step2GoalIcon) step2GoalIcon.textContent = meta.icon;
    if (step2GoalLabel) step2GoalLabel.textContent = meta.label;
    if (step2Title) step2Title.innerHTML = `Select Your <span>Package</span>`;

    // Studio & Stay: show Airbnb listing card + single inquiry CTA (no package cards)
    if (category === 'studio-plus') {
      servicesList.innerHTML = `
        <div class="airbnb-preview-block">
          <div class="airbnb-listing-card">
            <div class="airbnb-listing-photo" style="background-image: url('assets/EQX%20Website%20Photos/eqlounge.jpeg');">
              <div class="airbnb-listing-photo-overlay"></div>
              <div class="airbnb-listing-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#FF5A5F"><path d="M22.1 13.5C21 16.4 16.8 21 12 21s-9-4.6-10.1-7.5C.8 11 1.5 9 3 7.7c1.5-1.2 3.5-1.2 4.8 0L9 8.9V4c0-1.1.9-2 2-2s2 .9 2 2v4.9l1.2-1.2c1.3-1.2 3.3-1.2 4.8 0 1.5 1.3 2.2 3.3 1.1 5.8z"/></svg>
                Live on Airbnb
              </div>
            </div>
            <div class="airbnb-listing-info">
              <div class="airbnb-listing-location">📍 Dammhagen, Landskrona, Sweden</div>
              <div class="airbnb-listing-name">EQ Living Room — Artist Residency</div>
              <div class="airbnb-listing-meta">
                <span class="airbnb-meta-item">🛏 3 Bedrooms</span>
                <span class="airbnb-meta-dot">·</span>
                <span class="airbnb-meta-item">🚿 1 Bath</span>
                <span class="airbnb-meta-dot">·</span>
                <span class="airbnb-meta-item">⭐ 4.67</span>
              </div>
              <p class="airbnb-listing-desc">A private creative retreat steps from EQX. Book the Airbnb directly, then send us an inquiry to coordinate your studio sessions around your stay.</p>
              <a href="https://www.airbnb.com/rooms/804940205785136199?guests=1&adults=1&s=66&source=embed_widget"
                 target="_blank" rel="noopener" class="airbnb-view-btn">
                View Full Listing on Airbnb ↗
              </a>
            </div>
          </div>

          <div class="studio-inquiry-cta">
            <div class="studio-inquiry-cta-text">
              <div class="studio-inquiry-cta-title">Ready to combine a stay with studio time?</div>
              <p class="studio-inquiry-cta-desc">Book the Airbnb directly for your preferred dates, then send us a quick note below — we'll coordinate your studio sessions around your stay and confirm everything in one plan.</p>
            </div>
            <button class="clay-button studio-inquiry-btn" id="studioInquiryBtn">
              Request a Studio &amp; Stay Package &#8594;
            </button>
          </div>
        </div>
      `;

      // Transition
      step1.classList.add('hidden');
      step2.classList.remove('hidden');
      setProgress(2);
      step2.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Bind the single inquiry button
      const inquiryBtn = document.getElementById('studioInquiryBtn');
      if (inquiryBtn) inquiryBtn.addEventListener('click', () => openModal('studio-inquiry'));
      return;
    }

    // All other categories: render service cards grid
    servicesList.innerHTML = filtered.map(item => `
      <div class="service-card" data-id="${item.id}">
        <div class="service-card-photo" style="background-image: url('${item.photo}');">
          <div class="service-card-photo-overlay"></div>
        </div>
        <div class="service-card-body">
          <span class="service-card-duration">${item.duration}</span>
          <div class="service-card-title">${item.title}</div>
          <p class="service-card-desc">${item.desc}</p>
        </div>
        <div class="service-card-footer">
          <div class="service-card-price">${item.price}</div>
          <button class="clay-button select-service-btn" data-id="${item.id}">Book Now</button>
        </div>
      </div>
    `).join('');

    // Transition
    step1.classList.add('hidden');
    step2.classList.remove('hidden');
    setProgress(2);
    step2.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Bind book buttons
    servicesList.querySelectorAll('.select-service-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(btn.getAttribute('data-id'));
      });
    });

    // Clicking the card itself also opens modal
    servicesList.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('click', () => openModal(card.getAttribute('data-id')));
    });
  }

  function openModal(id) {
    const item = services.find(s => s.id === id);
    if (!item || !modal) return;

    if (modalCategory) modalCategory.textContent = item.categoryLabel;
    if (modalTitle) modalTitle.textContent = item.title;
    if (modalDuration) modalDuration.textContent = item.duration;
    if (modalPrice) modalPrice.textContent = item.price;
    if (modalDesc) modalDesc.textContent = item.desc;
    if (summarySubtotal) summarySubtotal.textContent = item.price;
    if (summaryDeposit) summaryDeposit.textContent = item.price;
    if (acuityDirectBtn) acuityDirectBtn.href = item.acuityLink;

    setProgress(3);
    modal.classList.add('active');
  }

  function closeModal() {
    if (modal) modal.classList.remove('active');
    setProgress(2);
  }

  // Bind goal cards (Step 1)
  document.querySelectorAll('.goal-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.goal-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const goal = card.getAttribute('data-goal');
      setTimeout(() => showGoalServices(goal), 180);
    });
  });

  // Back button
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      step2.classList.add('hidden');
      step1.classList.remove('hidden');
      setProgress(1);
      document.querySelectorAll('.goal-card').forEach(c => c.classList.remove('selected'));
      step1.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName').value;
      alert(`Thank you, ${name}! Your session request has been submitted.`);
      closeModal();
    });
  }

  // Init progress on load
  setProgress(1);
}
