/**
 * @file Main entrypoint for EQX Admin CRM module architecture.
 * Initializes event handlers, global window bindings, and initial view rendering.
 */

import { switchTab } from './tabs.js';
import { renderDashboard } from './dashboard.js';
import { addLead, deleteLead, renderLeads } from './leads.js';
import { addProject, deleteProject } from './projects.js';
import { toggleTask } from './todos.js';

export function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}

export function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

export function closeModalOnBg(e, id) {
  if (e.target === document.getElementById(id)) {
    closeModal(id);
  }
}

export function toast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2800);
}

export function handleSearch(val) {
  const activeTabEl = document.querySelector('.tab-view.active');
  if (!activeTabEl) return;
  const activeTab = activeTabEl.id.replace('tab-', '');
  if (activeTab === 'leads') {
    renderLeads(val);
  }
}

// Bind functions to window scope for HTML inline handlers (onclick, oninput, etc.)
window.switchTab = switchTab;
window.addLead = addLead;
window.addProject = addProject;
window.openModal = openModal;
window.closeModal = closeModal;
window.closeModalOnBg = closeModalOnBg;
window.handleSearch = handleSearch;
window.deleteLead = deleteLead;
window.deleteProject = deleteProject;
window.toggleTask = toggleTask;
window.toast = toast;

// Initialize initial dashboard render on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderDashboard);
} else {
  renderDashboard();
}
