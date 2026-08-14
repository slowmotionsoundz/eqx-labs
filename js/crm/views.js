/**
 * @file View Components for EQX Agency Project Management System.
 * Renders full-page views corresponding to all sidebar menu items:
 * Dashboard, Calendar, My Tasks, Projects, Teams, Leads, Clients, Invoices, Documents, Settings, Support.
 */

export function renderDashboardHTML(projectsHTML, tasksHTML, calendarHTML, categoryFiltersHTML) {
  return `
    <header class="crm-header">
      <div>
        <h1 style="font-family: var(--font-head); font-size: 1.9rem; font-weight: 700; color: var(--crm-text-bright);">
          Project Management & Operations
        </h1>
        <p style="font-size: 0.88rem; color: var(--crm-text-muted); margin-top: 4px;">
          Overview of live studio sessions, digital engineering, DJ performances, and release campaigns.
        </p>
      </div>

      <div class="crm-header-actions">
        <div class="crm-search-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="crm-search-input" placeholder="Search projects, clients, or tasks..." oninput="window.handleSearchInput(this.value)" />
        </div>

        <button class="crm-btn-primary" onclick="window.openNewProjectModal()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New Project
        </button>
      </div>
    </header>

    <div class="crm-filter-bar" id="crm-category-filters">
      ${categoryFiltersHTML}
    </div>

    <div class="crm-grid-dashboard">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
          <h3 style="font-family: var(--font-head); font-size: 1.25rem; font-weight: 700; color: var(--crm-text-bright);" id="crm-projects-heading">
            Active Projects
          </h3>
          <span style="font-size: 0.8rem; color: var(--crm-cyan); font-weight: 600;">Real-Time Tracking</span>
        </div>
        <div class="crm-project-grid" id="crm-projects-container">
          ${projectsHTML}
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 28px;">
        <div>
          <div id="crm-checklist-header-title" style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h3 style="font-family: var(--font-head); font-size: 1.1rem; font-weight: 700; color: var(--crm-text-bright);">
                Service Deliverable Checklist
              </h3>
              <span style="font-size: 0.75rem; color: var(--crm-text-muted);">Click Card to Focus Project</span>
            </div>
          </div>
          <div id="crm-tasks-container">
            ${tasksHTML}
          </div>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="font-family: var(--font-head); font-size: 1.1rem; font-weight: 700; color: var(--crm-text-bright);">
              Studio & Live Schedule
            </h3>
            <span style="font-size: 0.75rem; color: var(--crm-cyan);">This Week</span>
          </div>
          <div class="crm-calendar-widget" id="crm-calendar-container">
            ${calendarHTML}
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderCalendarPageHTML() {
  return `
    <header class="crm-header">
      <div>
        <h1 style="font-family: var(--font-head); font-size: 1.9rem; font-weight: 700; color: var(--crm-text-bright);">
          Studio & Event Booking Calendar
        </h1>
        <p style="font-size: 0.88rem; color: var(--crm-text-muted); margin-top: 4px;">
          Manage studio room reservations, DJ gig dates, live sound engineering slots, and client rehearsals.
        </p>
      </div>

      <div class="crm-header-actions">
        <button class="crm-btn-primary" onclick="alert('Opening Studio Reservation Booking Modal...')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Schedule Session / Gig
        </button>
      </div>
    </header>

    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 28px;">
      <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 18px; padding: 20px;">
        <div style="font-size: 0.78rem; color: var(--crm-text-muted); font-weight: 600;">Studio A Vocal Suite</div>
        <div style="font-size: 1.4rem; font-weight: 800; color: var(--crm-cyan); margin-top: 4px;">85% Booked</div>
        <div style="font-size: 0.75rem; color: #10B981; margin-top: 4px;">12 Sessions This Week</div>
      </div>
      <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 18px; padding: 20px;">
        <div style="font-size: 0.78rem; color: var(--crm-text-muted); font-weight: 600;">Console Suite (SSL)</div>
        <div style="font-size: 1.4rem; font-weight: 800; color: #9333EA; margin-top: 4px;">60% Booked</div>
        <div style="font-size: 0.75rem; color: var(--crm-text-muted); margin-top: 4px;">8 Stem Mix Reviews</div>
      </div>
      <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 18px; padding: 20px;">
        <div style="font-size: 0.78rem; color: var(--crm-text-muted); font-weight: 600;">DJ Gigs & Live Sets</div>
        <div style="font-size: 1.4rem; font-weight: 800; color: #10B981; margin-top: 4px;">3 Shows Booked</div>
        <div style="font-size: 0.75rem; color: #34D399; margin-top: 4px;">Skania Club & Fest</div>
      </div>
      <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 18px; padding: 20px;">
        <div style="font-size: 0.78rem; color: var(--crm-text-muted); font-weight: 600;">FOH Live Sound</div>
        <div style="font-size: 1.4rem; font-weight: 800; color: #F59E0B; margin-top: 4px;">2 Concerts</div>
        <div style="font-size: 0.75rem; color: #FBBF24; margin-top: 4px;">Huntsville Fest FOH</div>
      </div>
    </div>

    <!-- Calendar Schedule Grid -->
    <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 24px; padding: 28px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <h3 style="font-family: var(--font-head); font-size: 1.2rem; font-weight: 700; color: var(--crm-text-bright);">
          Weekly Studio & Event Schedule (July 2026)
        </h3>
        <div style="display: flex; gap: 8px;">
          <button style="background: rgba(255,255,255,0.06); border: 1px solid var(--crm-border); color: var(--crm-text-bright); padding: 8px 16px; border-radius: 10px; font-weight: 600; cursor: pointer;">This Week</button>
          <button style="background: rgba(255,255,255,0.03); border: 1px solid var(--crm-border); color: var(--crm-text-muted); padding: 8px 16px; border-radius: 10px; font-weight: 600; cursor: pointer;">Month View</button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 12px;">
        ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => `
          <div style="text-align: center; padding: 12px; background: rgba(255,255,255,0.02); border-radius: 12px; font-weight: 700; color: var(--crm-cyan); font-size: 0.9rem;">
            ${day}
          </div>
        `).join('')}

        <!-- Monday -->
        <div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 14px; padding: 12px;">
          <span style="font-size: 0.72rem; font-weight: 800; color: #60A5FA;">10:00 - 13:00</span>
          <h5 style="font-size: 0.85rem; color: #FFF; margin-top: 4px;">Neumann Vocal Session</h5>
          <div style="font-size: 0.75rem; color: var(--crm-text-muted); margin-top: 2px;">Studio A &bull; Eva R.</div>
        </div>

        <!-- Tuesday -->
        <div style="background: rgba(255,255,255,0.02); border: 1px dashed var(--crm-border); border-radius: 14px; padding: 12px; text-align: center; color: var(--crm-text-muted); font-size: 0.8rem;">
          Available
        </div>

        <!-- Wednesday -->
        <div style="background: rgba(0, 210, 211, 0.1); border: 1px solid rgba(0, 210, 211, 0.3); border-radius: 14px; padding: 12px;">
          <span style="font-size: 0.72rem; font-weight: 800; color: var(--crm-cyan);">14:00 - 16:30</span>
          <h5 style="font-size: 0.85rem; color: #FFF; margin-top: 4px;">SSL Stem Mix Review</h5>
          <div style="font-size: 0.75rem; color: var(--crm-text-muted); margin-top: 2px;">Console Suite &bull; Christian</div>
        </div>

        <!-- Thursday -->
        <div style="background: rgba(147, 51, 234, 0.1); border: 1px solid rgba(147, 51, 234, 0.3); border-radius: 14px; padding: 12px;">
          <span style="font-size: 0.72rem; font-weight: 800; color: #C084FC;">11:00 - 15:00</span>
          <h5 style="font-size: 0.85rem; color: #FFF; margin-top: 4px;">Portal API Deployment</h5>
          <div style="font-size: 0.75rem; color: var(--crm-text-muted); margin-top: 2px;">Digital Lab &bull; Helna</div>
        </div>

        <!-- Friday -->
        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 14px; padding: 12px;">
          <span style="font-size: 0.72rem; font-weight: 800; color: #34D399;">22:00 - 02:00</span>
          <h5 style="font-size: 0.85rem; color: #FFF; margin-top: 4px;">Skania Nightclub DJ Set</h5>
          <div style="font-size: 0.75rem; color: var(--crm-text-muted); margin-top: 2px;">Main Stage &bull; Copenhagen</div>
        </div>

        <!-- Saturday -->
        <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 14px; padding: 12px;">
          <span style="font-size: 0.72rem; font-weight: 800; color: #FBBF24;">15:00 - 19:00</span>
          <h5 style="font-size: 0.85rem; color: #FFF; margin-top: 4px;">FOH Concert Sound Check</h5>
          <div style="font-size: 0.75rem; color: var(--crm-text-muted); margin-top: 2px;">Concert Hall &bull; Festival</div>
        </div>

        <!-- Sunday -->
        <div style="background: rgba(255,255,255,0.02); border: 1px dashed var(--crm-border); border-radius: 14px; padding: 12px; text-align: center; color: var(--crm-text-muted); font-size: 0.8rem;">
          Studio Maintenance
        </div>
      </div>
    </div>
  `;
}

export function renderTasksPageHTML() {
  return `
    <header class="crm-header">
      <div>
        <h1 style="font-family: var(--font-head); font-size: 1.9rem; font-weight: 700; color: var(--crm-text-bright);">
          My Deliverable Tasks
        </h1>
        <p style="font-size: 0.88rem; color: var(--crm-text-muted); margin-top: 4px;">
          Kanban checklist board for tracking audio engineering, digital web builds, DJ prep, and marketing deliverables.
        </p>
      </div>
    </header>

    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;">
      <!-- To-Do Column -->
      <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 20px; padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 2px solid #3B82F6; padding-bottom: 10px;">
          <h4 style="font-family: var(--font-head); font-size: 1rem; color: #FFF; font-weight: 700;">To Do</h4>
          <span style="background: rgba(59, 130, 246, 0.15); color: #60A5FA; padding: 2px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700;">3 Tasks</span>
        </div>

        <div class="crm-task-item">
          <div>
            <div class="crm-task-title">Lead Vocal Comping & Tuning</div>
            <div class="crm-task-meta">Project: Neumann U87 Session</div>
          </div>
        </div>
        <div class="crm-task-item">
          <div>
            <div class="crm-task-title">Stripe Payment Integration Test</div>
            <div class="crm-task-meta">Project: Studio Portal</div>
          </div>
        </div>
      </div>

      <!-- In Progress Column -->
      <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 20px; padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 2px solid #F59E0B; padding-bottom: 10px;">
          <h4 style="font-family: var(--font-head); font-size: 1rem; color: #FFF; font-weight: 700;">In Progress</h4>
          <span style="background: rgba(245, 158, 11, 0.15); color: #FBBF24; padding: 2px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700;">2 Tasks</span>
        </div>

        <div class="crm-task-item">
          <div>
            <div class="crm-task-title">Stage Monitor Mix Alignment</div>
            <div class="crm-task-meta">Project: Concert FOH Sound</div>
          </div>
        </div>
      </div>

      <!-- Client Review Column -->
      <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 20px; padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 2px solid #00D2D3; padding-bottom: 10px;">
          <h4 style="font-family: var(--font-head); font-size: 1rem; color: #FFF; font-weight: 700;">Client Review</h4>
          <span style="background: rgba(0, 210, 211, 0.15); color: #00D2D3; padding: 2px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700;">2 Tasks</span>
        </div>

        <div class="crm-task-item">
          <div>
            <div class="crm-task-title">Analog SSL Bus Compression Export</div>
            <div class="crm-task-meta">Project: Analog Stem Mixing</div>
          </div>
        </div>
      </div>

      <!-- Completed Column -->
      <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 20px; padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 2px solid #10B981; padding-bottom: 10px;">
          <h4 style="font-family: var(--font-head); font-size: 1rem; color: #FFF; font-weight: 700;">Completed</h4>
          <span style="background: rgba(16, 185, 129, 0.15); color: #34D399; padding: 2px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700;">5 Tasks</span>
        </div>

        <div class="crm-task-item">
          <div>
            <div class="crm-task-title" style="text-decoration: line-through; opacity: 0.5;">Neumann Mic Positioning</div>
            <div class="crm-task-meta">Project: Neumann U87 Session</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderProjectsPageHTML(projectsHTML) {
  return `
    <header class="crm-header">
      <div>
        <h1 style="font-family: var(--font-head); font-size: 1.9rem; font-weight: 700; color: var(--crm-text-bright);">
          All Agency Projects
        </h1>
        <p style="font-size: 0.88rem; color: var(--crm-text-muted); margin-top: 4px;">
          Full project management directory across Recording, Music Production, Digital Builds, DJ Gigs, and Marketing.
        </p>
      </div>

      <div class="crm-header-actions">
        <button class="crm-btn-primary" onclick="window.openNewProjectModal()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New Project
        </button>
      </div>
    </header>

    <div class="crm-project-grid">
      ${projectsHTML}
    </div>
  `;
}

export function renderTeamsPageHTML() {
  return `
    <header class="crm-header">
      <div>
        <h1 style="font-family: var(--font-head); font-size: 1.9rem; font-weight: 700; color: var(--crm-text-bright);">
          EQX Agency Team Roster
        </h1>
        <p style="font-size: 0.88rem; color: var(--crm-text-muted); margin-top: 4px;">
          Collaborators, studio engineers, software developers, DJ performers, and marketing directors.
        </p>
      </div>
    </header>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
      <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 20px; padding: 24px; display: flex; align-items: center; gap: 16px;">
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" style="width: 56px; height: 56px; border-radius: 16px; object-fit: cover;" />
        <div>
          <h4 style="font-size: 1.05rem; color: #FFF; font-weight: 700;">Sophia Lee</h4>
          <p style="font-size: 0.8rem; color: var(--crm-cyan); font-weight: 600;">Senior Audio & SSL Engineer</p>
          <p style="font-size: 0.75rem; color: var(--crm-text-muted); margin-top: 2px;">Assigned: Neumann Vocal Session</p>
        </div>
      </div>

      <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 20px; padding: 24px; display: flex; align-items: center; gap: 16px;">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" style="width: 56px; height: 56px; border-radius: 16px; object-fit: cover;" />
        <div>
          <h4 style="font-size: 1.05rem; color: #FFF; font-weight: 700;">Ethan Roy</h4>
          <p style="font-size: 0.8rem; color: #C084FC; font-weight: 600;">Lead Web & Platform Architect</p>
          <p style="font-size: 0.75rem; color: var(--crm-text-muted); margin-top: 2px;">Assigned: Studio Reservation Portal</p>
        </div>
      </div>

      <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 20px; padding: 24px; display: flex; align-items: center; gap: 16px;">
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" style="width: 56px; height: 56px; border-radius: 16px; object-fit: cover;" />
        <div>
          <h4 style="font-size: 1.05rem; color: #FFF; font-weight: 700;">Alice Clark</h4>
          <p style="font-size: 0.8rem; color: #34D399; font-weight: 600;">Peak Time DJ & Live Performer</p>
          <p style="font-size: 0.75rem; color: var(--crm-text-muted); margin-top: 2px;">Assigned: Skania Nightclub DJ Set</p>
        </div>
      </div>
    </div>
  `;
}

export function renderLeadsPageHTML() {
  return `
    <header class="crm-header">
      <div>
        <h1 style="font-family: var(--font-head); font-size: 1.9rem; font-weight: 700; color: var(--crm-text-bright);">
          Agency Sales & Leads Pipeline
        </h1>
        <p style="font-size: 0.88rem; color: var(--crm-text-muted); margin-top: 4px;">
          Track incoming studio inquiries, mixing proposals, DJ booking requests, and software contracts.
        </p>
      </div>
    </header>

    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;">
      <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 20px; padding: 20px;">
        <div style="font-weight: 700; color: #60A5FA; margin-bottom: 12px;">📥 New Lead</div>
        <div style="background: rgba(255,255,255,0.03); padding: 14px; border-radius: 12px; border: 1px solid var(--crm-border);">
          <strong>Christian Bass</strong>
          <div style="font-size: 0.78rem; color: var(--crm-text-muted);">Stem Mixing Inquiry &bull; 14,500 SEK</div>
        </div>
      </div>

      <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 20px; padding: 20px;">
        <div style="font-weight: 700; color: #FBBF24; margin-bottom: 12px;">💬 In Contact</div>
        <div style="background: rgba(255,255,255,0.03); padding: 14px; border-radius: 12px; border: 1px solid var(--crm-border);">
          <strong>Eva Robinson</strong>
          <div style="font-size: 0.78rem; color: var(--crm-text-muted);">Vocal Session Booking &bull; 21,300 SEK</div>
        </div>
      </div>

      <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 20px; padding: 20px;">
        <div style="font-weight: 700; color: #00D2D3; margin-bottom: 12px;">📄 Proposal Sent</div>
        <div style="background: rgba(255,255,255,0.03); padding: 14px; border-radius: 12px; border: 1px solid var(--crm-border);">
          <strong>Helna Julie</strong>
          <div style="font-size: 0.78rem; color: var(--crm-text-muted);">Studio Portal Contract &bull; 45,000 SEK</div>
        </div>
      </div>

      <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 20px; padding: 20px;">
        <div style="font-weight: 700; color: #34D399; margin-bottom: 12px;">🎙️ Session Booked</div>
        <div style="background: rgba(255,255,255,0.03); padding: 14px; border-radius: 12px; border: 1px solid var(--crm-border);">
          <strong>Skania Nightclub</strong>
          <div style="font-size: 0.78rem; color: var(--crm-text-muted);">Friday DJ Performance &bull; 18,000 SEK</div>
        </div>
      </div>
    </div>
  `;
}

export function renderClientsPageHTML() {
  return `
    <header class="crm-header">
      <div>
        <h1 style="font-family: var(--font-head); font-size: 1.9rem; font-weight: 700; color: var(--crm-text-bright);">
          Client Directory & Unified Dossiers
        </h1>
        <p style="font-size: 0.88rem; color: var(--crm-text-muted); margin-top: 4px;">
          Unified records of lifetime invoiced values, active projects, and contact history.
        </p>
      </div>
    </header>

    <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 24px; padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
          <tr style="border-bottom: 1px solid var(--crm-border); color: var(--crm-text-muted); font-size: 0.82rem; text-transform: uppercase;">
            <th style="padding: 12px;">Client Name</th>
            <th style="padding: 12px;">Company / Label</th>
            <th style="padding: 12px;">Primary Interest</th>
            <th style="padding: 12px;">Total Lifetime Invoiced</th>
            <th style="padding: 12px; text-align: right;">Action</th>
          </tr>
        </thead>
        <tbody style="font-size: 0.9rem;">
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 16px; font-weight: 700; color: #FFF;">Eva Robinson</td>
            <td style="padding: 16px; color: var(--crm-text-muted);">Alabama Machinery</td>
            <td style="padding: 16px; color: var(--crm-cyan);">Neumann Vocal Tracking</td>
            <td style="padding: 16px; font-weight: 700; color: #FFC107;">21,300 SEK</td>
            <td style="padding: 16px; text-align: right;">
              <button style="background: var(--crm-cyan); color: #000; font-weight: 700; padding: 6px 14px; border-radius: 8px; border: none; cursor: pointer;">View Dossier</button>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 16px; font-weight: 700; color: #FFF;">Christian Bass</td>
            <td style="padding: 16px; color: var(--crm-text-muted);">Nordic Operations Group</td>
            <td style="padding: 16px; color: var(--crm-cyan);">Analog Stem Mixing</td>
            <td style="padding: 16px; font-weight: 700; color: #FFC107;">14,500 SEK</td>
            <td style="padding: 16px; text-align: right;">
              <button style="background: var(--crm-cyan); color: #000; font-weight: 700; padding: 6px 14px; border-radius: 8px; border: none; cursor: pointer;">View Dossier</button>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 16px; font-weight: 700; color: #FFF;">Helna Julie</td>
            <td style="padding: 16px; color: var(--crm-text-muted);">Skania Creative Hub</td>
            <td style="padding: 16px; color: var(--crm-cyan);">Studio Reservation Portal</td>
            <td style="padding: 16px; font-weight: 700; color: #FFC107;">45,000 SEK</td>
            <td style="padding: 16px; text-align: right;">
              <button style="background: var(--crm-cyan); color: #000; font-weight: 700; padding: 6px 14px; border-radius: 8px; border: none; cursor: pointer;">View Dossier</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

export function renderInvoicesPageHTML() {
  return `
    <header class="crm-header">
      <div>
        <h1 style="font-family: var(--font-head); font-size: 1.9rem; font-weight: 700; color: var(--crm-text-bright);">
          Invoices & Financial Balance
        </h1>
        <p style="font-size: 0.88rem; color: var(--crm-text-muted); margin-top: 4px;">
          Track total agency revenue, pending Stripe payouts, and generate instant client payment links.
        </p>
      </div>

      <div class="crm-header-actions">
        <button class="crm-btn-primary" onclick="alert('Stripe Payment Link Generated! Sent to client.')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Create Stripe Invoice Link
        </button>
      </div>
    </header>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 28px;">
      <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 20px; padding: 24px;">
        <div style="font-size: 0.82rem; color: var(--crm-text-muted); font-weight: 600;">Total Agency Revenue (YTD)</div>
        <div style="font-size: 2rem; font-weight: 800; color: #10B981; margin-top: 4px;">139,300 SEK</div>
      </div>

      <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 20px; padding: 24px;">
        <div style="font-size: 0.82rem; color: var(--crm-text-muted); font-weight: 600;">Pending Invoices</div>
        <div style="font-size: 2rem; font-weight: 800; color: #FFC107; margin-top: 4px;">45,000 SEK</div>
      </div>

      <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 20px; padding: 24px;">
        <div style="font-size: 0.82rem; color: var(--crm-text-muted); font-weight: 600;">Stripe Auto-Payout Balance</div>
        <div style="font-size: 2rem; font-weight: 800; color: var(--crm-cyan); margin-top: 4px;">28,500 SEK</div>
      </div>
    </div>
  `;
}

export function renderDocumentsPageHTML() {
  return `
    <header class="crm-header">
      <div>
        <h1 style="font-family: var(--font-head); font-size: 1.9rem; font-weight: 700; color: var(--crm-text-bright);">
          Documents & Audio File Review Portal
        </h1>
        <p style="font-size: 0.88rem; color: var(--crm-text-muted); margin-top: 4px;">
          Collaborative review space for audio masters, stem packages, web contracts, and release assets.
        </p>
      </div>
    </header>

    <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 24px; padding: 40px; text-align: center;">
      <div style="border: 2px dashed rgba(255,255,255,0.15); border-radius: 20px; padding: 60px; color: var(--crm-text-muted);">
        <div style="font-size: 40px; margin-bottom: 12px;">🎵</div>
        <h3 style="font-size: 1.1rem; color: #FFF; margin-bottom: 6px;">Drag and Drop Audio Masters, Stems, or Contracts Here</h3>
        <p style="font-size: 0.85rem;">Supports 24-bit WAV, MP3, DDP Images, and PDF Contracts up to 5GB</p>
      </div>
    </div>
  `;
}

export function renderSettingsPageHTML() {
  return `
    <header class="crm-header">
      <div>
        <h1 style="font-family: var(--font-head); font-size: 1.9rem; font-weight: 700; color: var(--crm-text-bright);">
          Agency Studio Settings
        </h1>
        <p style="font-size: 0.88rem; color: var(--crm-text-muted); margin-top: 4px;">
          Configure Google Calendar synchronization, Stripe Webhooks, and notification rules.
        </p>
      </div>
    </header>

    <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 24px; padding: 28px;">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <label style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: rgba(255,255,255,0.02); border-radius: 12px;">
          <span style="color: var(--crm-text-bright); font-weight: 600;">Auto-Sync Studio Reservations with Google Calendar</span>
          <input type="checkbox" checked style="accent-color: var(--crm-cyan); width: 20px; height: 20px;" />
        </label>
        <label style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: rgba(255,255,255,0.02); border-radius: 12px;">
          <span style="color: var(--crm-text-bright); font-weight: 600;">Enable Email Notifications for New Inquiries</span>
          <input type="checkbox" checked style="accent-color: var(--crm-cyan); width: 20px; height: 20px;" />
        </label>
      </div>
    </div>
  `;
}

export function renderSupportPageHTML() {
  return `
    <header class="crm-header">
      <div>
        <h1 style="font-family: var(--font-head); font-size: 1.9rem; font-weight: 700; color: var(--crm-text-bright);">
          EQX Support & Help Desk
        </h1>
        <p style="font-size: 0.88rem; color: var(--crm-text-muted); margin-top: 4px;">
          Need assistance with studio routing, live sound rigs, or digital engineering? We are here to help.
        </p>
      </div>
    </header>

    <div style="background: #111827; border: 1px solid var(--crm-border); border-radius: 24px; padding: 32px;">
      <h3 style="font-family: var(--font-head); font-size: 1.2rem; color: #FFF; margin-bottom: 12px;">Contact EQX Systems Support</h3>
      <p style="color: var(--crm-text-muted); font-size: 0.88rem; margin-bottom: 20px;">Direct support for studio engineers, DJ performers, and web portal administrators.</p>
      <button class="crm-btn-primary" onclick="alert('Support ticket created. An engineer will contact you shortly.')">Submit Priority Support Ticket</button>
    </div>
  `;
}
