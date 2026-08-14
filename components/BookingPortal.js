/**
 * EQX BookingPortal Component
 * Renders categorized service cards, filters, and checkout modal workflows.
 */
export function initBookingPortal() {
  const services = [
    // [ 01 ] Dry Hire / Studio Rental
    {
      id: 'byo-3h',
      category: 'studio-rental',
      categoryLabel: '[ 01 ] Studio Rental',
      title: 'Studio Access — Bring Your Own Engineer',
      duration: '3 Hours',
      price: 'SEK 1,050.00',
      priceRaw: 1050,
      acuityLink: 'https://app.acuityscheduling.com/schedule.php?owner=14192678&appointmentType=95791173',
      desc: 'The room, gear, and setup are yours to run. Full access to the live room, vocal booth, and control room. Bring your own engineer or handle it yourself. Ideal if you already know your workflow and just need the space.',
      photo: 'assets/EQX%20Website%20Photos/eqcontrol.jpeg'
    },
    {
      id: 'byo-half',
      category: 'studio-rental',
      categoryLabel: '[ 01 ] Studio Rental',
      title: 'Studio Access — Bring Your Own Engineer, Half Day',
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
      categoryLabel: '[ 01 ] Studio Rental',
      title: 'Studio Access — Bring Your Own Engineer, Full Day',
      duration: '10 Hours',
      price: 'SEK 2,800.00',
      priceRaw: 2800,
      acuityLink: 'https://app.acuityscheduling.com/schedule.php?owner=14192678&appointmentType=95791300',
      desc: 'The room for a full day! Enough time for a real session from setup to wrap, without the clock pressure of hourly billing.',
      photo: 'assets/EQX%20Website%20Photos/eqcontrol.jpeg'
    },
    // [ 02 ] Engineer-Led Sessions
    {
      id: 'eng-3h',
      category: 'engineer-sessions',
      categoryLabel: '[ 02 ] Engineer-Led Sessions',
      title: 'Studio Session — With EQX Engineer',
      duration: '3 Hours',
      price: 'SEK 1,950.00',
      priceRaw: 1950,
      acuityLink: 'https://app.acuityscheduling.com/schedule.php?owner=14192678&appointmentType=95791356',
      desc: 'Recording, tracking, and live production with an engineer behind the desk — nearly 30 years in music tech, Billboard-recognized. Best for artists who want to focus on performance and let someone else run the session.',
      photo: 'assets/EQX%20Website%20Photos/eqcontrol.jpeg'
    },
    {
      id: 'eng-half',
      category: 'engineer-sessions',
      categoryLabel: '[ 02 ] Engineer-Led Sessions',
      title: 'Studio Session — With Our Engineer, Half Day',
      duration: '5 Hours',
      price: 'SEK 2,900.00',
      priceRaw: 2900,
      acuityLink: 'https://app.acuityscheduling.com/schedule.php?owner=14192678&appointmentType=95791384',
      desc: 'A full engineer-led session — enough time to track a handful of songs or work through a real production day.',
      photo: 'assets/EQX%20Website%20Photos/eqcontrol.jpeg'
    },

    // [ 02 ] Post-Production (Music -> EQ Control Room)
    {
      id: 'mix-track',
      category: 'post-production',
      categoryLabel: '[ 02 ] Post-Production',
      title: 'Mixing (per track)',
      duration: '30 Minutes per track',
      price: 'SEK 900.00',
      priceRaw: 900,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: "Your track, mixed and polished — balance, depth, and clarity brought out so it's ready for release. Turnaround and revision rounds confirmed at booking.",
      photo: 'assets/EQX%20Website%20Photos/eqcontrol.jpeg'
    },
    {
      id: 'master-track',
      category: 'post-production',
      categoryLabel: '[ 02 ] Post-Production',
      title: 'Mastering (per track)',
      duration: '30 Minutes per track',
      price: 'SEK 450.00',
      priceRaw: 450,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: 'Final polish and loudness for release-ready sound across streaming, club systems, and everything in between.',
      photo: 'assets/EQX%20Website%20Photos/eqcontrol.jpeg'
    },
    {
      id: 'mix-master-bundle',
      category: 'post-production',
      categoryLabel: '[ 02 ] Post-Production',
      title: 'Mix + Master Bundle (per track)',
      duration: '30 Minutes per track',
      price: 'SEK 1,200.00',
      priceRaw: 1200,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: 'Mixing and mastering together, at a better rate than booking separately. One track, fully finished.',
      photo: 'assets/EQX%20Website%20Photos/eqcontrol.jpeg'
    },
    {
      id: 'beat-lease',
      category: 'post-production',
      categoryLabel: '[ 02 ] Post-Production',
      title: 'Beat Lease / Production Session',
      duration: '1 Hour',
      price: 'SEK 650.00',
      priceRaw: 650,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: 'Studio time dedicated to production — building a beat, developing an idea, or working a track from scratch with an engineer/producer in the room.',
      photo: 'assets/EQX%20Website%20Photos/eqcontrol.jpeg'
    },

    // [ 03 ] Studio Plus & Stay (Travel & Stay -> EQ Lounge / Living Room)
    {
      id: 'studio-stay',
      category: 'studio-plus',
      categoryLabel: '[ 03 ] Studio Plus & Stay',
      title: 'Studio + Stay Package Inquiry',
      duration: '30 Minutes Deposit',
      price: 'SEK 4,500.00',
      priceRaw: 4500,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: 'Studio time and a place to stay, bundled. Book the inquiry here to hold your dates — the stay itself is confirmed and paid through Airbnb once details are set.',
      photo: 'assets/EQX%20Website%20Photos/eqlounge.jpeg'
    },
    {
      id: 'recording-trip',
      category: 'studio-plus',
      categoryLabel: '[ 03 ] Studio Plus & Stay',
      title: 'Recording Trip Inquiry & Deposit',
      duration: '30 Minutes Deposit',
      price: 'SEK 2,000.00',
      priceRaw: 2000,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: 'Interested in bringing your group to Landskrona for a recording trip? Put down a deposit to hold interest and start planning — full itinerary and pricing built around your group size and dates.',
      photo: 'assets/EQX%20Website%20Photos/eqlounge.jpeg'
    },

    // [ 04 ] Project Inquiries (App Development -> EQ Office | PM & Brand -> EQ Lounge)
    {
      id: 'inquiry-web',
      category: 'project-inquiries',
      categoryLabel: '[ 04 ] Project Inquiries',
      title: 'Web & App Development — Discovery Call',
      duration: '20 Minutes',
      price: 'FREE / Included',
      priceRaw: 0,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: "A short call to talk through what you're building — scope, timeline, and whether it's a fit. No commitment; you'll get a proper quote after.",
      photo: 'assets/EQX%20Website%20Photos/eqoffice.jpeg'
    },
    {
      id: 'inquiry-sports',
      category: 'project-inquiries',
      categoryLabel: '[ 04 ] Project Inquiries',
      title: 'Sports Marketing & Brand Strategy — Discovery Call',
      duration: '20 Minutes',
      price: 'FREE / Included',
      priceRaw: 0,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: 'Talk through your team, club, or athlete brand and where marketing support could help. Quote follows based on what you need.',
      photo: 'assets/EQX%20Website%20Photos/eqlounge.jpeg'
    },
    {
      id: 'inquiry-pm',
      category: 'project-inquiries',
      categoryLabel: '[ 04 ] Project Inquiries',
      title: 'Project Management Engagement — Discovery Call',
      duration: '20 Minutes',
      price: 'FREE / Included',
      priceRaw: 0,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: 'A quick call to understand the project that needs managing and whether an ongoing engagement makes sense.',
      photo: 'assets/EQX%20Website%20Photos/eqlounge.jpeg'
    },

    // [ 05 ] Consultations & Strategy (Discussions -> EQ Lounge / Living Room | Music Tech -> EQ Office)
    {
      id: 'consult-artist',
      category: 'consultations',
      categoryLabel: '[ 05 ] Consultations & Strategy',
      title: 'Artist & Career Development Consult',
      duration: '30 Minutes',
      price: 'SEK 500.00',
      priceRaw: 500,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: "A focused half-hour on where your project stands and what's next — release strategy, positioning, or just an honest read on your material.",
      photo: 'assets/EQX%20Website%20Photos/eqlounge.jpeg'
    },
    {
      id: 'consult-tech',
      category: 'consultations',
      categoryLabel: '[ 05 ] Consultations & Strategy',
      title: 'Music Tech / Studio Setup Consult',
      duration: '1 Hour',
      price: 'SEK 1,100.00',
      priceRaw: 1100,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: 'Building or upgrading your own setup? An hour working through gear, room treatment, and workflow — practical advice, not a sales pitch.',
      photo: 'assets/EQX%20Website%20Photos/eqoffice.jpeg'
    },
    {
      id: 'consult-biz',
      category: 'consultations',
      categoryLabel: '[ 05 ] Consultations & Strategy',
      title: 'Business & Startup Strategy Consult',
      duration: '1 Hour',
      price: 'SEK 1,200.00',
      priceRaw: 1200,
      acuityLink: 'https://eqlandskrona.as.me',
      desc: "For founders and early-stage projects — an hour of direct strategy input from someone who's built and run creative and tech ventures across the U.S. and Europe.",
      photo: 'assets/EQX%20Website%20Photos/eqlounge.jpeg'
    },

    // Discount Packages (Music -> EQ Control Room)
    {
      id: 'pkg-8h',
      category: 'packages',
      categoryLabel: 'Discount Packages',
      title: '8-Hour Studio Package — Bring Your Own Engineer',
      duration: '8 Hours Total (Valid 60 Days)',
      price: 'SEK 2,800.00',
      priceRaw: 2800,
      acuityLink: 'https://app.acuityscheduling.com/catalog.php?owner=14192678&action=add&service:id=2247353',
      desc: "Eight hours of self-serve studio time, split however you need it — three visits, four, doesn't matter, book in 2, 3, or 4-hour blocks as your schedule allows.",
      photo: 'assets/EQX%20Website%20Photos/eqcontrol.jpeg'
    }
  ];

  const step1 = document.getElementById('wizard-step-1');
  const step2 = document.getElementById('wizard-step-2');
  const pillars = document.querySelectorAll('.vertical-pillar');
  const backBtn = document.getElementById('backToGoalsBtn');
  const servicesList = document.getElementById('wizardServicesList');
  const step2Title = document.getElementById('step2Title');

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

  const goalTitles = {
    'studio-rental': 'Dry Hire / Studio Rental',
    'engineer-sessions': 'Engineer-Led Recording Sessions',
    'post-production': 'Mixing, Mastering & Production',
    'studio-plus': 'Studio Plus, Residency & Stay',
    'consultations': 'Consultations & Strategy',
    'project-inquiries': 'Free Project Discovery Calls',
    'packages': 'Discounted Multi-Session Packages'
  };

  function showGoalServices(category) {
    if (!servicesList) return;

    const filtered = services.filter(s => s.category === category);
    if (step2Title) {
      step2Title.innerHTML = `Select Your <span>${goalTitles[category] || 'Option'}</span>`;
    }

    servicesList.innerHTML = filtered.map(item => `
      <div class="wizard-service-row">
        <div class="service-row-photo" style="background-image: url('${item.photo}');"></div>
        <div class="service-row-info">
          <span class="service-row-duration">${item.duration}</span>
          <h3 class="service-row-title">${item.title}</h3>
          <p class="service-row-desc">${item.desc}</p>
        </div>
        <div class="service-row-action">
          <div class="service-row-price">${item.price}</div>
          <button class="clay-button select-service-btn" data-id="${item.id}">Book Now</button>
        </div>
      </div>
    `).join('');

    // Transition steps
    step1.classList.add('hidden');
    step2.classList.remove('hidden');

    // Scroll smoothly to step 2 header
    step2.scrollIntoView({ behavior: 'smooth' });

    // Bind select buttons
    servicesList.querySelectorAll('.select-service-btn').forEach(btn => {
      btn.addEventListener('click', () => openModal(btn.getAttribute('data-id')));
    });
  }

  function openModal(id) {
    const item = services.find(s => s.id === id);
    if (!item || !modal) return;

    modalCategory.textContent = item.categoryLabel;
    modalTitle.textContent = item.title;
    modalDuration.textContent = item.duration;
    modalPrice.textContent = item.price;
    modalDesc.textContent = item.desc;
    summarySubtotal.textContent = item.price;
    summaryDeposit.textContent = item.price;
    if (acuityDirectBtn) acuityDirectBtn.href = item.acuityLink;

    modal.classList.add('active');
  }

  function closeModal() {
    if (modal) modal.classList.remove('active');
  }

  // Bind vertical accordion pillar clicks & hover expansions
  pillars.forEach(pillar => {
    pillar.addEventListener('mouseenter', () => {
      pillars.forEach(p => p.classList.remove('active'));
      pillar.classList.add('active');
    });

    // Action button inside pillar triggers step 2
    const actionBtn = pillar.querySelector('.pillar-action-btn');
    if (actionBtn) {
      actionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const goal = pillar.getAttribute('data-goal');
        showGoalServices(goal);
      });
    }

    pillar.addEventListener('click', () => {
      const goal = pillar.getAttribute('data-goal');
      showGoalServices(goal);
    });
  });

  // Back button
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      step2.classList.add('hidden');
      step1.classList.remove('hidden');
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
      alert(`Thank you, ${name}! Your session request has been submitted. A pending booking has been created in the CRM.`);
      // In a real app, this would write to Firebase/Firestore to create a pending booking.
      // We will just close the modal for now to simulate success.
      closeModal();
      document.getElementById('bookingForm').reset();
    });
  }
}
