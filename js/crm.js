/**
 * EQX CRM Controller & Tutorial System
 * Coordinates customer dataflows, validation, segmentation filters, and user onboarding.
 */

// Mock Leads Data representing real-world customer acquisitions
const mockLeads = [
  {
    id: "lead_01",
    firstName: "Eva",
    lastName: "Robinson",
    email: "eva.robinson@alabamamachinery.com",
    phone: "+191120222313",
    company: "Alabama Machinery & Supply",
    dealValue: 21300,
    status: "contacted",
    location: "Huntsville, AL",
    source: "referral",
    interactionHistory: [
      { timestamp: "2026-06-08T10:12:00Z", type: "call", notes: "Initial intake call. Highly interested in digital platforms sync." },
      { timestamp: "2026-06-10T14:15:00Z", type: "email", notes: "Sent scope presentation for web logistics dashboard." }
    ]
  },
  {
    id: "lead_02",
    firstName: "Christian",
    lastName: "Bass",
    email: "c.bass@nordicops.se",
    phone: "+46418209322",
    company: "Nordic Operations Group",
    dealValue: 12350,
    status: "new",
    location: "Landskrona, SE",
    source: "website",
    interactionHistory: [
      { timestamp: "2026-06-11T07:12:00Z", type: "email", notes: "Inquiry received from website contact form." }
    ]
  },
  {
    id: "lead_03",
    firstName: "Helna",
    lastName: "Julie",
    email: "helna@skaniacreative.dk",
    phone: "+4589201928",
    company: "Skania Creative Hub",
    dealValue: 45000,
    status: "qualified",
    location: "Europe Hub",
    source: "website",
    interactionHistory: [
      { timestamp: "2026-06-05T09:00:00Z", type: "call", notes: "Intro session with CPz. Budget approved for full MusicTech installation." }
    ]
  },
  {
    id: "lead_04",
    firstName: "Brandon",
    lastName: "Crawford",
    email: "b.crawford@huntsvilleventures.com",
    phone: "+12563829102",
    company: "Huntsville Ventures",
    dealValue: 8500,
    status: "disqualified",
    location: "Huntsville, AL",
    source: "referral",
    interactionHistory: [
      { timestamp: "2026-06-03T11:30:00Z", type: "call", notes: "Lead unqualified due to budget constraints. Keep in loop for future phases." }
    ]
  }
];

// Tasks schedule corresponding to current leads
const mockTasks = [
  { id: "task_01", title: "Call Eva Robinson regarding proposal", dueDate: "June 15", assignedTo: "CPz", status: "pending", leadId: "lead_01" },
  { id: "task_02", title: "Review Nordic Ops architecture draft", dueDate: "June 16", assignedTo: "Mali Boy", status: "pending", leadId: "lead_02" },
  { id: "task_03", title: "Finalize contracts for Skania Creative", dueDate: "June 18", assignedTo: "Rz", status: "completed", leadId: "lead_03" }
];

// Active CRM State
let leads = [...mockLeads];
let tasks = [...mockTasks];
let selectedLeadId = "lead_01";
let filterLocation = "all";
let filterSource = "all";
let isFirebaseConnected = false;

// Validation helpers
export function validateLeadData(data) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.firstName || !data.lastName) return "First and last name are required.";
  if (!emailRegex.test(data.email)) return "Please enter a valid email address.";
  if (!data.phone) return "Phone number is required.";
  return null;
}

// Render Dashboard Data
export function initCRM(elements, dbHelpers = {}) {
  const {
    metricsTotalRev,
    metricsNewLeads,
    metricsTasks,
    pipelineNewList,
    pipelineContactedList,
    pipelineQualifiedList,
    pipelineDisqualifiedList,
    detailsPanel,
    filterLocationBtnGroup,
    filterSourceBtnGroup,
    toggleDbModeBtn
  } = elements;

  // Toggle Database integration mode
  if (toggleDbModeBtn) {
    toggleDbModeBtn.addEventListener("change", async (e) => {
      isFirebaseConnected = e.target.checked;
      showNotification(isFirebaseConnected ? "Switched to Live Firebase Integration" : "Switched to Local Sandbox Simulation");
      await refreshData();
    });
  }

  // Refresh pipeline and recalculate analytics metrics
  async function refreshData() {
    if (isFirebaseConnected && typeof dbHelpers.fetchLeads === "function") {
      try {
        leads = await dbHelpers.fetchLeads();
      } catch (err) {
        console.error("Firebase sync error, falling back to local.", err);
        leads = [...mockLeads];
        isFirebaseConnected = false;
        if (toggleDbModeBtn) toggleDbModeBtn.checked = false;
      }
    } else {
      leads = JSON.parse(localStorage.getItem("eqx_crm_leads")) || [...mockLeads];
    }
    
    saveLocalState();
    renderMetrics();
    renderPipeline();
    renderDetails(selectedLeadId);
  }

  function saveLocalState() {
    localStorage.setItem("eqx_crm_leads", JSON.stringify(leads));
  }

  // Calculate & Display KPI metrics
  function renderMetrics() {
    const totalRev = leads
      .filter(l => l.status === "qualified" || l.status === "contacted")
      .reduce((sum, l) => sum + (l.dealValue || 0), 0);
    
    const newCount = leads.filter(l => l.status === "new").length;
    const pendingTasks = tasks.filter(t => t.status === "pending").length;

    if (metricsTotalRev) metricsTotalRev.textContent = `$${totalRev.toLocaleString()}`;
    if (metricsNewLeads) metricsNewLeads.textContent = newCount.toString();
    if (metricsTasks) metricsTasks.textContent = pendingTasks.toString();
  }

  // Render Pipeline Kanban Grid
  function renderPipeline() {
    // Clear columns
    if (pipelineNewList) pipelineNewList.innerHTML = "";
    if (pipelineContactedList) pipelineContactedList.innerHTML = "";
    if (pipelineQualifiedList) pipelineQualifiedList.innerHTML = "";
    if (pipelineDisqualifiedList) pipelineDisqualifiedList.innerHTML = "";

    // Segment leads based on filters
    const filteredLeads = leads.filter(lead => {
      const matchLoc = filterLocation === "all" || lead.location === filterLocation;
      const matchSrc = filterSource === "all" || lead.source === filterSource;
      return matchLoc && matchSrc;
    });

    filteredLeads.forEach(lead => {
      const card = document.createElement("div");
      card.className = `lead-card status-${lead.status} ${lead.id === selectedLeadId ? 'active' : ''}`;
      card.setAttribute("data-id", lead.id);
      card.innerHTML = `
        <div class="lead-card-header">
          <span class="lead-name">${lead.firstName} ${lead.lastName}</span>
          <span class="lead-value">$${(lead.dealValue || 0).toLocaleString()}</span>
        </div>
        <div class="lead-company">${lead.company || "Individual Creative"}</div>
        <div class="lead-meta">
          <span class="lead-source">${lead.source}</span>
          <span class="lead-location">${lead.location}</span>
        </div>
      `;

      card.addEventListener("click", () => {
        selectedLeadId = lead.id;
        document.querySelectorAll(".lead-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        renderDetails(lead.id);
      });

      // Append to matching pipeline status container
      if (lead.status === "new" && pipelineNewList) pipelineNewList.appendChild(card);
      if (lead.status === "contacted" && pipelineContactedList) pipelineContactedList.appendChild(card);
      if (lead.status === "qualified" && pipelineQualifiedList) pipelineQualifiedList.appendChild(card);
      if (lead.status === "disqualified" && pipelineDisqualifiedList) pipelineDisqualifiedList.appendChild(card);
    });

    // Render column headers count
    updateColumnCount("new", pipelineNewList);
    updateColumnCount("contacted", pipelineContactedList);
    updateColumnCount("qualified", pipelineQualifiedList);
    updateColumnCount("disqualified", pipelineDisqualifiedList);
  }

  function updateColumnCount(status, element) {
    const header = document.querySelector(`.pipeline-column[data-status="${status}"] .pipeline-column-count`);
    if (header && element) {
      header.textContent = element.children.length.toString();
    }
  }

  // Render selected contact details pane
  function renderDetails(leadId) {
    if (!detailsPanel) return;
    const lead = leads.find(l => l.id === leadId);
    if (!lead) {
      detailsPanel.innerHTML = `<p style="color:var(--eqx-text-muted); text-align:center; padding:40px;">Select a lead to view interactions.</p>`;
      return;
    }

    const initials = `${lead.firstName.charAt(0)}${lead.lastName.charAt(0)}`;
    const leadTasks = tasks.filter(t => t.leadId === lead.id);

    detailsPanel.innerHTML = `
      <div class="details-header">
        <div class="details-avatar">${initials}</div>
        <div class="details-title">
          <h3>${lead.firstName} ${lead.lastName}</h3>
          <p>${lead.company}</p>
        </div>
      </div>

      <div class="details-quick-actions">
        <button class="action-btn" id="action-email-btn">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          Email
        </button>
        <button class="action-btn" id="action-call-btn">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          Call
        </button>
      </div>

      <div>
        <h4 class="details-section-title">Lead Information</h4>
        <div class="info-item"><span class="info-label">Email</span><span class="info-value">${lead.email}</span></div>
        <div class="info-item"><span class="info-label">Phone</span><span class="info-value">${lead.phone}</span></div>
        <div class="info-item"><span class="info-label">Location</span><span class="info-value">${lead.location}</span></div>
        <div class="info-item"><span class="info-label">Value</span><span class="info-value" style="color:var(--eqx-accent); font-weight:600;">$${(lead.dealValue || 0).toLocaleString()}</span></div>
        <div class="info-item" style="border:none; margin-top:10px; flex-direction:column; align-items:stretch; gap:6px;">
          <span class="info-label">Lead Status</span>
          <select class="status-select" id="lead-status-selector">
            <option value="new" ${lead.status === "new" ? "selected" : ""}>New</option>
            <option value="contacted" ${lead.status === "contacted" ? "selected" : ""}>Contacted</option>
            <option value="qualified" ${lead.status === "qualified" ? "selected" : ""}>Qualified</option>
            <option value="disqualified" ${lead.status === "disqualified" ? "selected" : ""}>Disqualified</option>
          </select>
        </div>
      </div>

      <div>
        <h4 class="details-section-title">Tasks & Actions</h4>
        <div class="history-timeline" style="margin-bottom:12px;">
          ${leadTasks.map(t => `
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; background:rgba(255,255,255,0.02); border:1px solid var(--eqx-border-dark); padding:8px 12px; border-radius:8px;">
              <div style="display:flex; gap:8px; align-items:center;">
                <input type="checkbox" class="task-checkbox" data-task-id="${t.id}" ${t.status === "completed" ? "checked" : ""}>
                <span style="${t.status === "completed" ? "text-decoration:line-through; color:var(--eqx-text-muted);" : "color:var(--eqx-text-light);"}">${t.title}</span>
              </div>
              <span style="font-size:0.7rem; color:var(--eqx-accent);">${t.dueDate}</span>
            </div>
          `).join('') || `<p style="font-size:0.75rem; color:var(--eqx-text-muted);">No tasks scheduled.</p>`}
        </div>
        <button class="action-btn" id="add-task-btn" style="width:100%;">+ Schedule Task</button>
      </div>

      <div>
        <h4 class="details-section-title">Interaction Logs</h4>
        <div class="history-timeline">
          ${lead.interactionHistory.map(log => `
            <div class="history-item">
              <div class="history-marker"></div>
              <div class="history-content">
                <span class="history-date">${new Date(log.timestamp).toLocaleDateString()}</span>
                <span class="history-note">${log.notes}</span>
              </div>
            </div>
          `).join('')}
        </div>
        <button class="action-btn" id="add-log-btn" style="width:100%; margin-top:16px;">+ Log Interaction</button>
      </div>
    `;

    // Bind Details Event Handlers
    const statusSelect = detailsPanel.querySelector("#lead-status-selector");
    if (statusSelect) {
      statusSelect.addEventListener("change", (e) => {
        lead.status = e.target.value;
        showNotification(`Lead status changed to ${e.target.value.toUpperCase()}`);
        refreshData();
      });
    }

    const taskCheckboxes = detailsPanel.querySelectorAll(".task-checkbox");
    taskCheckboxes.forEach(box => {
      box.addEventListener("change", (e) => {
        const tId = e.target.getAttribute("data-task-id");
        const task = tasks.find(t => t.id === tId);
        if (task) {
          task.status = e.target.checked ? "completed" : "pending";
          showNotification(e.target.checked ? "Task completed" : "Task marked pending");
          refreshData();
        }
      });
    });

    // Log Interaction Actions
    detailsPanel.querySelector("#add-log-btn")?.addEventListener("click", () => {
      const logText = prompt("Enter interaction details:");
      if (logText) {
        lead.interactionHistory.push({
          timestamp: new Date().toISOString(),
          type: "note",
          notes: logText
        });
        showNotification("Interaction note logged successfully");
        refreshData();
      }
    });

    // Add Task Actions
    detailsPanel.querySelector("#add-task-btn")?.addEventListener("click", () => {
      const taskTitle = prompt("Enter task summary:");
      const taskDue = prompt("Enter due date (e.g. June 20):", "June 20");
      if (taskTitle) {
        const newTask = {
          id: `task_${Date.now()}`,
          title: taskTitle,
          dueDate: taskDue || "Today",
          assignedTo: "CPz",
          status: "pending",
          leadId: lead.id
        };
        tasks.push(newTask);
        showNotification("Task scheduled");
        refreshData();
      }
    });

    // Quick communication prompts
    detailsPanel.querySelector("#action-email-btn")?.addEventListener("click", () => {
      window.location.href = `mailto:${lead.email}?subject=EQX Europe Digital Services`;
    });

    detailsPanel.querySelector("#action-call-btn")?.addEventListener("click", () => {
      alert(`Dialing ${lead.phone} via system integration...`);
    });
  }

  // Location Filters
  if (filterLocationBtnGroup) {
    filterLocationBtnGroup.forEach(btn => {
      btn.addEventListener("click", () => {
        filterLocationBtnGroup.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        filterLocation = btn.getAttribute("data-loc");
        renderPipeline();
      });
    });
  }

  // Source Filters
  if (filterSourceBtnGroup) {
    filterSourceBtnGroup.forEach(btn => {
      btn.addEventListener("click", () => {
        filterSourceBtnGroup.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        filterSource = btn.getAttribute("data-source");
        renderPipeline();
      });
    });
  }

  // Setup Notification banner
  function showNotification(msg) {
    let notifyEl = document.getElementById("crm-toast-banner");
    if (!notifyEl) {
      notifyEl = document.createElement("div");
      notifyEl.id = "crm-toast-banner";
      notifyEl.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #2F3E3A;
        color: #FCFAF7;
        padding: 12px 24px;
        border-radius: 8px;
        border: 1px solid rgba(195,181,159,0.3);
        box-shadow: 0 10px 24px rgba(0,0,0,0.4);
        z-index: 1100;
        font-size: 0.85rem;
        transition: all 0.35s ease;
        opacity: 0;
        transform: translateY(10px);
      `;
      document.body.appendChild(notifyEl);
    }
    notifyEl.textContent = msg;
    notifyEl.style.opacity = "1";
    notifyEl.style.transform = "translateY(0)";
    setTimeout(() => {
      notifyEl.style.opacity = "0";
      notifyEl.style.transform = "translateY(10px)";
    }, 3000);
  }

  // Add Lead Logic (Prevent Duplicates)
  window.createNewLead = function(firstName, lastName, email, phone, company, dealValue, location, source) {
    const validationError = validateLeadData({ firstName, lastName, email, phone });
    if (validationError) {
      alert(`Validation error: ${validationError}`);
      return false;
    }

    // Check for duplicates
    const isDuplicate = leads.some(l => l.email.toLowerCase() === email.toLowerCase());
    if (isDuplicate) {
      alert("Error: A lead with this email address already exists. Preventing duplicate record ingestion.");
      return false;
    }

    const newLead = {
      id: `lead_${Date.now()}`,
      firstName,
      lastName,
      email,
      phone,
      company: company || "Individual Creative",
      dealValue: Number(dealValue) || 0,
      status: "new",
      location: location || "Europe Hub",
      source: source || "manual",
      interactionHistory: [
        { timestamp: new Date().toISOString(), type: "call", notes: "Lead ingested manually." }
      ]
    };

    leads.push(newLead);
    showNotification(`New Lead ${firstName} Ingested Successfully`);
    refreshData();
    return true;
  };

  // Initial load
  refreshData();
}

// Onboarding Walkthrough Tour System
export function initTutorialTour(onboardingRoot) {
  if (!onboardingRoot) return;

  const tourSteps = [
    {
      targetId: "tutorial-step-1",
      title: "Real-time Database Mode",
      desc: "Toggle between live Firebase Firestore updates and a Local Sandbox mock simulation for safe testing."
    },
    {
      targetId: "tutorial-step-2",
      title: "Active KPI Dials",
      desc: "Instantly view total pipeline values, fresh incoming leads, and critical pending actions."
    },
    {
      targetId: "tutorial-step-3",
      title: "Smart Segmentation Filters",
      desc: "Group and isolate your client leads by geographical hubs (Landskrona vs. Huntsville) and acquisition sources."
    },
    {
      targetId: "tutorial-step-4",
      title: "Lead pipeline kanban",
      desc: "Monitor your customer development pipeline stages. Select cards to explore detail actions."
    },
    {
      targetId: "tutorial-step-5",
      title: "Interactions History Panel",
      desc: "Schedule tasks, update status values, log calls, or trigger system actions for individual creatives."
    }
  ];

  let currentStepIdx = 0;

  // Create UI elements
  onboardingRoot.innerHTML = `
    <div class="tutorial-overlay" id="tour-overlay"></div>
    <div class="tutorial-box" id="tour-box">
      <div class="tutorial-box-header">
        <span class="tutorial-step" id="tour-step-label">Step 1 of 5</span>
        <button class="tutorial-close" id="tour-close-btn">&times;</button>
      </div>
      <h4 class="tutorial-title" id="tour-title">Tutorial Title</h4>
      <p class="tutorial-desc" id="tour-desc">Tutorial description goes here.</p>
      <div class="tutorial-footer">
        <button class="tutorial-skip" id="tour-skip-btn">Skip Tour</button>
        <button class="tutorial-next" id="tour-next-btn">Next Step</button>
      </div>
    </div>
  `;

  const overlay = onboardingRoot.querySelector("#tour-overlay");
  const box = onboardingRoot.querySelector("#tour-box");
  const stepLabel = onboardingRoot.querySelector("#tour-step-label");
  const title = onboardingRoot.querySelector("#tour-title");
  const desc = onboardingRoot.querySelector("#tour-desc");
  const closeBtn = onboardingRoot.querySelector("#tour-close-btn");
  const skipBtn = onboardingRoot.querySelector("#tour-skip-btn");
  const nextBtn = onboardingRoot.querySelector("#tour-next-btn");

  function startTour() {
    currentStepIdx = 0;
    overlay.classList.add("active");
    box.classList.add("active");
    showStep();
  }

  function showStep() {
    const step = tourSteps[currentStepIdx];
    if (!step) {
      endTour();
      return;
    }

    // Update Text Content
    stepLabel.textContent = `Step ${currentStepIdx + 1} of ${tourSteps.length}`;
    title.textContent = step.title;
    desc.textContent = step.desc;

    // Reset previous highlights
    document.querySelectorAll(".tutorial-highlighted").forEach(el => {
      el.classList.remove("tutorial-highlighted");
    });

    const targetEl = document.getElementById(step.targetId);
    if (targetEl) {
      targetEl.classList.add("tutorial-highlighted");
      
      // Position the floating tutorial box next to the target element
      const rect = targetEl.getBoundingClientRect();
      const scrollY = window.scrollY;

      let top = rect.bottom + scrollY + 16;
      let left = rect.left + (rect.width / 2) - 160; // Center box

      // Edge prevention bounds
      if (left < 20) left = 20;
      if (left + 320 > window.innerWidth) left = window.innerWidth - 340;
      if (top + 200 > window.innerHeight + scrollY) {
        top = rect.top + scrollY - 200; // Position above if no room below
      }

      box.style.top = `${top}px`;
      box.style.left = `${left}px`;
      box.style.position = "absolute";

      // Scroll target smoothly into view
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      // Center box if target doesn't exist
      box.style.position = "fixed";
      box.style.top = "50%";
      box.style.left = "50%";
      box.style.transform = "translate(-50%, -50%)";
    }

    // Button label
    nextBtn.textContent = currentStepIdx === tourSteps.length - 1 ? "Finish Tour" : "Next Step";
  }

  function endTour() {
    overlay.classList.remove("active");
    box.classList.remove("active");
    document.querySelectorAll(".tutorial-highlighted").forEach(el => {
      el.classList.remove("tutorial-highlighted");
    });
  }

  // Bind Tour Controls
  nextBtn.addEventListener("click", () => {
    currentStepIdx++;
    if (currentStepIdx < tourSteps.length) {
      showStep();
    } else {
      endTour();
    }
  });

  closeBtn.addEventListener("click", endTour);
  skipBtn.addEventListener("click", endTour);
  overlay.addEventListener("click", endTour);

  // Expose triggers
  window.startCrmTour = startTour;
}
