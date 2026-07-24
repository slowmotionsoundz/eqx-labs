/**
 * @file Bookings module for EQX Admin CRM.
 * Renders studio session reservations and timeline rows.
 */

import { bookings } from './data.js';

export function renderBookings() {
  const el = document.getElementById('bookings-list');
  if (bookings.length === 0) {
    el.innerHTML = '<p style="color:var(--muted); font-size:13px;">No bookings yet. Reservations made via the booking portal will appear here.</p>';
  } else {
    el.innerHTML = bookings.map(b => `
      <div class="timeline-row" style="margin-bottom:8px;">
        <div class="timeline-time">${b.date || 'TBD'}</div>
        <div class="timeline-info">
          <h4>${b.type || 'Studio Session'} — ${b.clientName || b.leadName || 'Client'}</h4>
          <span>${b.room || 'Control Room'} · ${b.duration || 2} Hours</span>
        </div>
        <span class="badge badge-green">Confirmed</span>
      </div>
    `).join('');
  }
}
