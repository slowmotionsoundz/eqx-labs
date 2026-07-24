/**
 * @file Projects management module for EQX Admin CRM.
 * Provides functions to render, create, and remove projects.
 */

import { projects, save } from './data.js';
import { categoryLabel } from './dashboard.js';
import { switchTab } from './tabs.js';

export function renderAllProjects() {
  document.getElementById('all-projects-grid').innerHTML = projects.map(p => `
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
      <button class="btn btn-outline" style="font-size:10px; margin-top:8px;" onclick="deleteProject('${p.id}')">Remove</button>
    </div>
  `).join('') || '<p style="color:var(--muted)">No projects yet.</p>';
}

export function addProject() {
  const title    = document.getElementById('p-title').value.trim();
  const client   = document.getElementById('p-client').value.trim();
  const category = document.getElementById('p-category').value;
  const progress = parseInt(document.getElementById('p-progress').value) || 0;
  if (!title) {
    if (window.toast) window.toast('Please enter a project title');
    return;
  }
  const id = 'p' + Date.now();
  projects.unshift({ id, title, clientName: client, category, progress });
  save();
  if (window.closeModal) window.closeModal('modal-add-project');
  document.querySelectorAll('#modal-add-project .form-input').forEach(i => i.value = '');
  switchTab('projects', document.getElementById('btn-projects'));
  if (window.toast) window.toast('Project created ✓');
}

export function deleteProject(id) {
  const index = projects.findIndex(p => p.id === id);
  if (index !== -1) {
    projects.splice(index, 1);
  }
  save();
  renderAllProjects();
  if (window.toast) window.toast('Project removed');
}
