/**
 * @file Tab navigation module for EQX Admin CRM.
 * Controls view switching and dispatches view rendering functions.
 */

import { renderDashboard } from './dashboard.js';
import { renderLeads } from './leads.js';
import { renderAllProjects } from './projects.js';
import { renderContacts } from './contacts.js';
import { renderBookings } from './bookings.js';
import { renderTodos } from './todos.js';

export function switchTab(name, btn) {
  document.querySelectorAll('.tab-view').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  if (btn) btn.classList.add('active');
  renderTab(name);
}

export function renderTab(name) {
  if (name === 'dashboard') renderDashboard();
  if (name === 'leads')     renderLeads();
  if (name === 'projects')  renderAllProjects();
  if (name === 'contacts')  renderContacts();
  if (name === 'bookings')  renderBookings();
  if (name === 'todos')     renderTodos();
}
