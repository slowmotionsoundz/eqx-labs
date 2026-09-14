/**
 * EQX Event Popup & Notification Component
 * Displays the EQ Live: Svavar Knútur announcement modal on first visit until Sept 22, 2026.
 */
export function initEventPopup() {
  // 1. Check cutoff expiration date (Sept 22, 2026 23:59:59 CEST)
  const cutoffDate = new Date('2026-09-22T23:59:59+02:00');
  const now = new Date();
  if (now > cutoffDate) {
    return; // Automatically disable after cutoff date
  }

  // 2. Ensure container elements exist
  let popupRoot = document.getElementById('eqx-event-popup-root');
  if (!popupRoot) {
    popupRoot = document.createElement('div');
    popupRoot.id = 'eqx-event-popup-root';
    document.body.appendChild(popupRoot);
  }

  popupRoot.innerHTML = `
    <!-- Event Floating Pill Trigger -->
    <div class="event-floating-pill" id="event-floating-pill" title="Upcoming Live Show">
      <span class="event-pill-pulse"></span>
      <span class="event-pill-label">🎟️ <strong>EQ Live:</strong> Svavar Knútur • Sept 21</span>
      <button class="event-pill-action" id="event-pill-btn">View Show</button>
    </div>

    <!-- Event Announcement Modal -->
    <div class="event-modal-overlay" id="event-modal-overlay" aria-hidden="true">
      <div class="event-modal-container">
        
        <button class="event-modal-close" id="event-modal-close-btn" aria-label="Close event announcement">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="event-modal-poster" style="background-image: url('assets/eq_live_svavar_knutur.jpg');">
          <div class="event-poster-badge">Upcoming Live Concert</div>
        </div>

        <div class="event-modal-content">
          <div class="event-badge-row">
            <span class="event-tag-live">EQ Live Sessions</span>
            <span class="event-tag-date">Monday, 21 September 2026</span>
          </div>

          <h2 class="event-modal-title">Svavar Knútur</h2>
          <div class="event-modal-subtitle">Live in Landskrona • EQ Labs Europe</div>

          <p class="event-modal-desc">
            Some shows you hear, some you feel. Icelandic singer-songwriter Svavar Knútur brings his intimate live tour to EQ Labs Europe for one special evening of music and storytelling.
          </p>

          <div class="event-modal-meta-grid">
            <div class="event-meta-box">
              <span class="event-meta-icon">📍</span>
              <div class="event-meta-info">
                <strong>EQ Labs Europe</strong>
                <span>Gamla Kyrkogatan, Landskrona</span>
              </div>
            </div>
            <div class="event-meta-box">
              <span class="event-meta-icon">⏰</span>
              <div class="event-meta-info">
                <strong>19:00 CEST</strong>
                <span>Doors Open 18:30</span>
              </div>
            </div>
            <div class="event-meta-box">
              <span class="event-meta-icon">🎟️</span>
              <div class="event-meta-info">
                <strong>199 SEK</strong>
                <span>Limited Intimate Capacity</span>
              </div>
            </div>
          </div>

          <div class="event-modal-actions">
            <a href="https://billetto.se/e/eq-live-svavar-knutur-biljetter-1996999" target="_blank" rel="noopener noreferrer" class="clay-button event-ticket-btn">
              Get Tickets on Billetto
            </a>
            <a href="events.html" class="event-secondary-link">
              Explore All Shows & Events &rarr;
            </a>
          </div>

        </div>
      </div>
    </div>
  `;

  const modalOverlay = popupRoot.querySelector('#event-modal-overlay');
  const closeBtn = popupRoot.querySelector('#event-modal-close-btn');
  const pillBtn = popupRoot.querySelector('#event-pill-btn');
  const pill = popupRoot.querySelector('#event-floating-pill');

  function openModal() {
    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Mark as dismissed for current browser session so it doesn't pop up again automatically on page refreshes
    sessionStorage.setItem('eqx_event_popup_dismissed_20260921', 'true');
  }

  closeBtn.addEventListener('click', closeModal);
  
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  pillBtn.addEventListener('click', openModal);
  pill.addEventListener('click', (e) => {
    if (e.target !== pillBtn) openModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  // 3. Auto-show on first visit if not dismissed yet
  const hasDismissed = sessionStorage.getItem('eqx_event_popup_dismissed_20260921');
  if (!hasDismissed) {
    // Reveal modal after 1.2s initial site animation
    setTimeout(() => {
      openModal();
    }, 1200);
  }
}
