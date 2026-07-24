/**
 * @file To-Dos management module for EQX Admin CRM.
 * Handles task listing and toggling task completion status.
 */

import { tasks, save } from './data.js';

export function renderTodos() {
  document.getElementById('todos-list').innerHTML = tasks.map(t => `
    <div style="display:flex; align-items:center; gap:14px; padding:12px 0; border-bottom:1px solid var(--border);">
      <div onclick="toggleTask('${t.id}')" style="width:18px; height:18px; border-radius:4px; border:1.5px solid ${t.status==='completed' ? 'var(--accent)' : 'var(--muted)'}; background:${t.status==='completed' ? 'var(--accent)' : 'transparent'}; cursor:pointer; flex-shrink:0; display:flex; align-items:center; justify-content:center;">
        ${t.status==='completed' ? '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0A0B10" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
      </div>
      <div style="flex:1;">
        <div style="font-size:13px; color:${t.status==='completed' ? 'var(--muted)' : 'var(--text)'}; text-decoration:${t.status==='completed' ? 'line-through' : 'none'}">${t.title}</div>
        <div style="font-size:11px; color:var(--muted); margin-top:2px;">Due: ${t.dueDate} · ${t.assignedTo}</div>
      </div>
    </div>
  `).join('') || '<p style="color:var(--muted); padding:12px 0">No tasks.</p>';
}

export function toggleTask(id) {
  const t = tasks.find(t => t.id === id);
  if (t) t.status = t.status === 'completed' ? 'pending' : 'completed';
  save();
  renderTodos();
}
