/**
 * @file Leads pipeline management module for EQX Admin CRM.
 * Provides functions to render, create, and remove sales leads.
 */

import { leads, save } from './data.js';
import { switchTab } from './tabs.js';

export function renderLeads(filter) {
  const list = filter ? leads.filter(l => `${l.firstName} ${l.lastName} ${l.company}`.toLowerCase().includes(filter.toLowerCase())) : leads;
  document.getElementById('leads-tbody').innerHTML = list.map(l => `
    <tr>
      <td><strong style="color:var(--text)">${l.firstName} ${l.lastName}</strong></td>
      <td style="color:var(--muted)">${l.company || '—'}</td>
      <td>${l.dealValue ? l.dealValue.toLocaleString() + ' SEK' : '—'}</td>
      <td><span class="status-pill pill-${l.status}">${l.status}</span></td>
      <td style="color:var(--muted)">${l.email || '—'}</td>
      <td>
        <button class="btn btn-outline" style="font-size:10px; padding:4px 12px;" onclick="deleteLead('${l.id}')">Remove</button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="6" style="text-align:center; color:var(--muted); padding:30px;">No leads yet.</td></tr>';
}

export function addLead() {
  const first   = document.getElementById('l-first').value.trim();
  const last    = document.getElementById('l-last').value.trim();
  const email   = document.getElementById('l-email').value.trim();
  const company = document.getElementById('l-company').value.trim();
  const val     = parseInt(document.getElementById('l-value').value) || 0;
  const status  = document.getElementById('l-status').value;
  if (!first) {
    if (window.toast) window.toast('Please enter a first name');
    return;
  }
  const id = 'l' + Date.now();
  leads.unshift({ id, firstName: first, lastName: last, email, company, dealValue: val, status });
  save();
  if (window.closeModal) window.closeModal('modal-add-lead');
  document.querySelectorAll('#modal-add-lead .form-input').forEach(i => i.value = '');
  switchTab('leads', document.getElementById('btn-leads'));
  if (window.toast) window.toast('Lead added ✓');
}

export function deleteLead(id) {
  const index = leads.findIndex(l => l.id === id);
  if (index !== -1) {
    leads.splice(index, 1);
  }
  save();
  renderLeads();
  if (window.toast) window.toast('Lead removed');
}
