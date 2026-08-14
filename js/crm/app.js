/**
 * @file Main UI Controller & Navigation Engine for EQX Project Management System.
 * Renders corresponding view pages for all sidebar menu items:
 * Dashboard, Calendar, My Tasks, Projects, Teams, Leads, Clients, Invoices, Documents, Settings, Support.
 */

import { INITIAL_PROJECTS, INITIAL_TASKS, INITIAL_CALENDAR_SESSIONS } from './data.js';
import {
  renderDashboardHTML,
  renderCalendarPageHTML,
  renderTasksPageHTML,
  renderProjectsPageHTML,
  renderTeamsPageHTML,
  renderLeadsPageHTML,
  renderClientsPageHTML,
  renderInvoicesPageHTML,
  renderDocumentsPageHTML,
  renderSettingsPageHTML,
  renderSupportPageHTML
} from './views.js';

let projects = [...INITIAL_PROJECTS];
let tasks = [...INITIAL_TASKS];
let calendarSessions = [...INITIAL_CALENDAR_SESSIONS];

let activeView = 'dashboard';
let activeCategory = 'all';
let selectedProjectId = null;
let searchQuery = '';

// Initialize App
export function initApp() {
  renderActiveView();
  bindGlobalEvents();
}

// Render current active view inside workspace
function renderActiveView() {
  const mainWorkspace = document.querySelector('.crm-workspace');
  if (!mainWorkspace) return;

  updateSidebarActiveNav();

  if (activeView === 'dashboard') {
    const projectsHTML = buildProjectCardsHTML();
    const tasksHTML = buildTaskChecklistHTML();
    const calendarHTML = buildCalendarWidgetHTML();
    const categoryFiltersHTML = buildCategoryFilterPillsHTML();

    mainWorkspace.innerHTML = renderDashboardHTML(projectsHTML, tasksHTML, calendarHTML, categoryFiltersHTML);
  } else if (activeView === 'calendar') {
    mainWorkspace.innerHTML = renderCalendarPageHTML();
  } else if (activeView === 'tasks') {
    mainWorkspace.innerHTML = renderTasksPageHTML();
  } else if (activeView === 'projects') {
    const projectsHTML = buildProjectCardsHTML();
    mainWorkspace.innerHTML = renderProjectsPageHTML(projectsHTML);
  } else if (activeView === 'teams') {
    mainWorkspace.innerHTML = renderTeamsPageHTML();
  } else if (activeView === 'leads') {
    mainWorkspace.innerHTML = renderLeadsPageHTML();
  } else if (activeView === 'clients') {
    mainWorkspace.innerHTML = renderClientsPageHTML();
  } else if (activeView === 'invoices') {
    mainWorkspace.innerHTML = renderInvoicesPageHTML();
  } else if (activeView === 'documents') {
    mainWorkspace.innerHTML = renderDocumentsPageHTML();
  } else if (activeView === 'settings') {
    mainWorkspace.innerHTML = renderSettingsPageHTML();
  } else if (activeView === 'support') {
    mainWorkspace.innerHTML = renderSupportPageHTML();
  }
}

// Global View Switcher
window.navigateToView = function(viewName) {
  activeView = viewName;
  selectedProjectId = null;
  searchQuery = '';
  renderActiveView();
};

// Update active sidebar link styling
function updateSidebarActiveNav() {
  document.querySelectorAll('.crm-nav-link').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById('nav-link-' + activeView);
  if (activeBtn) activeBtn.classList.add('active');
}

// Category Filter Pills HTML Generator
function buildCategoryFilterPillsHTML() {
  const categories = [
    { id: 'all', label: 'All Services', icon: '✨' },
    { id: 'recording', label: 'Recording & Tracking', icon: '🎙️' },
    { id: 'production', label: 'Music Production', icon: '🎵' },
    { id: 'digital', label: 'Digital Engineering', icon: '💻' },
    { id: 'dj-gig', label: 'DJ Gigs & Performance', icon: '🎧' },
    { id: 'live-sound', label: 'Live Sound Eng.', icon: '🎛️' },
    { id: 'marketing', label: 'Marketing Campaigns', icon: '📢' }
  ];

  return categories.map(cat => `
    <button class="crm-filter-pill ${activeCategory === cat.id ? 'active' : ''}" onclick="window.filterByCategory('${cat.id}')">
      <span>${cat.icon}</span> ${cat.label}
    </button>
  `).join('');
}

// Filter projects & deliverables by service category
window.filterByCategory = function(catId) {
  activeCategory = catId;
  selectedProjectId = null;
  searchQuery = '';
  if (activeView !== 'dashboard') {
    activeView = 'dashboard';
  }
  renderActiveView();
};

// Real-Time Search Handler
window.handleSearchInput = function(query) {
  searchQuery = (query || '').toLowerCase().trim();
  if (activeView === 'dashboard' || activeView === 'projects') {
    renderActiveView();
  }
};

// Select / Focus specific Project Card
window.selectProjectFocus = function(projectId) {
  if (selectedProjectId === projectId) {
    selectedProjectId = null;
  } else {
    selectedProjectId = projectId;
  }
  if (activeView === 'dashboard') {
    renderActiveView();
  }
};

// Reset Project Focus
window.resetProjectFocus = function() {
  selectedProjectId = null;
  if (activeView === 'dashboard') {
    renderActiveView();
  }
};

// Build Project Cards Grid HTML
function buildProjectCardsHTML() {
  let filtered = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  if (searchQuery) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(searchQuery) ||
      p.client.toLowerCase().includes(searchQuery) ||
      p.categoryLabel.toLowerCase().includes(searchQuery)
    );
  }

  if (filtered.length === 0) {
    return `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--crm-text-muted); background: #111827; border-radius: 20px; border: 1px solid var(--crm-border);">
        No active projects match your selected filter or search term.
      </div>
    `;
  }

  return filtered.map(p => {
    const isSelected = (selectedProjectId === p.id);
    return `
      <div class="crm-project-card ${isSelected ? 'selected' : ''}" onclick="window.selectProjectFocus('${p.id}')" style="cursor: pointer;">
        <div class="crm-card-header">
          <div class="crm-service-icon-badge" style="background: ${p.iconBg}; color: ${p.iconColor};">
            ${p.icon}
          </div>
          <span class="crm-status-pill" style="background: ${p.statusBg}; color: ${p.statusColor};">
            ${p.status}
          </span>
        </div>

        <h4 class="crm-card-title">${p.title}</h4>
        <div class="crm-card-client">${p.client}</div>

        <div class="crm-progress-block">
          <div class="crm-progress-header">
            <span>Completion Progress</span>
            <strong style="color: var(--crm-cyan);">${p.progress}%</strong>
          </div>
          <div class="crm-progress-bar">
            <div class="crm-progress-fill" style="width: ${p.progress}%;"></div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; border-top: 1px solid var(--crm-border); padding-top: 12px;">
          <span style="font-size: 0.78rem; color: ${isSelected ? 'var(--crm-cyan)' : 'var(--crm-text-muted)'}; font-weight: 700;">
            ${isSelected ? '🎯 In Focus (Click to Deselect)' : p.categoryLabel}
          </span>
          <strong style="font-size: 0.88rem; color: #FFC107;">${p.dealValue}</strong>
        </div>
      </div>
    `;
  }).join('');
}

// Build Task Checklist Widget HTML
function buildTaskChecklistHTML() {
  let filteredTasks = [];

  if (selectedProjectId) {
    filteredTasks = tasks.filter(t => t.projectId === selectedProjectId);
  } else {
    const filteredProjects = activeCategory === 'all'
      ? projects
      : projects.filter(p => p.category === activeCategory);
    filteredTasks = tasks.filter(t => filteredProjects.some(p => p.id === t.projectId));
  }

  if (searchQuery) {
    filteredTasks = filteredTasks.filter(t => 
      t.title.toLowerCase().includes(searchQuery) || 
      t.category.toLowerCase().includes(searchQuery)
    );
  }

  if (filteredTasks.length === 0) {
    return `
      <div style="text-align: center; padding: 24px; color: var(--crm-text-muted); font-size: 0.85rem; background: #111827; border-radius: 16px; border: 1px solid var(--crm-border);">
        No deliverables linked to this selection.
      </div>
    `;
  }

  return filteredTasks.map(t => {
    const p = projects.find(item => item.id === t.projectId);
    return `
      <div class="crm-task-item" onclick="event.stopPropagation(); window.toggleTaskItem('${t.id}')">
        <div class="crm-task-left">
          <div class="crm-checkbox ${t.completed ? 'checked' : ''}">
            ${t.completed ? '<svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1.5" stroke="#000" stroke-width="2" stroke-linecap="round"/></svg>' : ''}
          </div>
          <div>
            <div class="crm-task-title" style="${t.completed ? 'text-decoration: line-through; opacity: 0.5;' : ''}">
              ${t.title}
            </div>
            <div class="crm-task-meta">
              ${p ? p.title : t.category}
            </div>
          </div>
        </div>
        <span style="font-size: 0.72rem; font-weight: 700; color: var(--crm-cyan); background: rgba(0, 210, 211, 0.1); padding: 4px 10px; border-radius: 100px;">
          ${t.category}
        </span>
      </div>
    `;
  }).join('');
}

// Toggle Task Completion & Recalculate Project Progress
window.toggleTaskItem = function(taskId) {
  const t = tasks.find(item => item.id === taskId);
  if (!t) return;

  t.completed = !t.completed;

  const p = projects.find(item => item.id === t.projectId);
  if (p) {
    const projectTasks = tasks.filter(item => item.projectId === p.id);
    if (projectTasks.length > 0) {
      const completedCount = projectTasks.filter(item => item.completed).length;
      p.progress = Math.round((completedCount / projectTasks.length) * 100);
    }
  }

  renderActiveView();
};

// Build Calendar Widget HTML
function buildCalendarWidgetHTML() {
  return calendarSessions.map(s => `
    <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--crm-border); border-radius: 14px; padding: 14px 16px; margin-bottom: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <strong style="font-size: 0.88rem; color: var(--crm-text-bright);">${s.title}</strong>
        <span style="font-size: 0.72rem; font-weight: 700; color: ${s.color}; background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px;">${s.day}</span>
      </div>
      <div style="font-size: 0.78rem; color: var(--crm-text-muted);">
        ${s.client} &bull; ${s.room} (${s.time})
      </div>
    </div>
  `).join('');
}

// Modal Handlers
function bindGlobalEvents() {
  window.openNewProjectModal = function() {
    const modal = document.getElementById('crm-new-project-modal');
    if (modal) modal.classList.add('active');
  };

  window.closeNewProjectModal = function() {
    const modal = document.getElementById('crm-new-project-modal');
    if (modal) modal.classList.remove('active');
  };

  window.saveNewProject = function() {
    const title = document.getElementById('new-proj-title').value;
    const client = document.getElementById('new-proj-client').value;
    const cat = document.getElementById('new-proj-cat').value;
    const val = document.getElementById('new-proj-val').value;

    if (!title || !client) {
      alert('Please fill out the Project Title and Client Name.');
      return;
    }

    const catMap = {
      recording: { label: 'Recording & Tracking', icon: '🎙️', color: '#3B82F6' },
      production: { label: 'Music Production', icon: '🎵', color: '#00D2D3' },
      digital: { label: 'Digital Engineering', icon: '💻', color: '#C084FC' },
      'dj-gig': { label: 'DJ Gig & Set', icon: '🎧', color: '#34D399' },
      'live-sound': { label: 'Live Sound Eng.', icon: '🎛️', color: '#FBBF24' },
      marketing: { label: 'Marketing Campaign', icon: '📢', color: '#FF7D5E' }
    };

    const cInfo = catMap[cat] || catMap.production;

    const newProject = {
      id: 'p' + (projects.length + 1),
      title,
      client,
      category: cat,
      categoryLabel: cInfo.label,
      icon: cInfo.icon,
      iconBg: `rgba(255,255,255,0.08)`,
      iconColor: cInfo.color,
      progress: 0,
      status: 'New Project',
      statusBg: 'rgba(255,255,255,0.1)',
      statusColor: '#FFF',
      dealValue: val ? `${parseInt(val).toLocaleString()} SEK` : '15,000 SEK',
      notes: 'New project initialized.'
    };

    projects.unshift(newProject);

    tasks.unshift(
      { id: 't' + (tasks.length + 1), projectId: newProject.id, title: `Initialize ${cInfo.label} setup`, category: cInfo.label, completed: false },
      { id: 't' + (tasks.length + 2), projectId: newProject.id, title: `Client kick-off & requirements review`, category: cInfo.label, completed: false }
    );

    window.closeNewProjectModal();
    renderActiveView();
  };
}

// Auto Boot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
