/**
 * @file Dashboard module for EQX Admin CRM.
 * Handles rendering of the main operations dashboard grid and roadmap timeline.
 */

import { leads, projects, bookings, tasks } from './data.js';

export function renderDashboard() {
  document.getElementById('project-count').textContent = projects.length + ' Projects';
  document.getElementById('stat-projects').textContent = projects.length;
  document.getElementById('stat-leads').textContent    = leads.length;
  document.getElementById('stat-tasks').textContent    = tasks.length;

  const grid = document.getElementById('projects-grid');
  grid.innerHTML = projects.slice(0, 4).map(p => `
    <div class="card">
      <span class="card-tag">${categoryLabel(p.category)}</span>
      <div class="card-title">${p.title}</div>
      <div class="card-sub">${p.clientName}</div>
      <div class="progress-wrap">
        <div class="progress-bar-row">
          <span>Progress</span><strong style="color:var(--text)">${p.progress || 0}%</strong>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${p.progress || 0}%"></div></div>
      </div>
    </div>
  `).join('');

  // Roadmap from bookings
  if (bookings.length > 0) {
    document.getElementById('roadmap-list').innerHTML = bookings.map(b => `
      <div class="timeline-row">
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

export function categoryLabel(cat) {
  const map = { 'web-app': 'Web & App', 'audio-media': 'Audio & Podcast', 'digital-design': 'Brand & Design', 'general-ops': 'General Ops' };
  return map[cat] || cat || 'Studio Tech';
}
