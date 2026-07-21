/**
 * EQX CRM Controller & Visual Administration Suite
 * Coordinates CRM dataflows, multi-room calendars, project timelines, and audio reviews.
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

const mockTasks = [
  { id: "task_01", title: "Call Eva Robinson regarding logistics beta", dueDate: "June 15", assignedTo: "CPz", status: "pending", leadId: "lead_01" },
  { id: "task_02", title: "Review Nordic Ops dashboard architecture", dueDate: "June 16", assignedTo: "Mali Boy", status: "pending", leadId: "lead_02" },
  { id: "task_03", title: "Finalize contracts for Skania Platform overhaul", dueDate: "June 18", assignedTo: "Rz", status: "completed", leadId: "lead_03" }
];

const projectCategories = {
  "web-app": {
    label: "Web & App Platform",
    stages: ["discovery", "design", "development", "launch"],
    stageLabels: ["Discovery", "Design", "Development", "Launch"],
    checklistTemplate: [
      "Define database schema & architecture",
      "Figma interactive prototype review",
      "Develop frontend views & components",
      "Integrate backend APIs & routing",
      "Perform QA testing & verification",
      "Production deployment & SSL setup"
    ]
  },
  "audio-media": {
    label: "Audio & Podcast Production",
    stages: ["preprod", "recording", "mixing", "mastering"],
    stageLabels: ["Pre-Prod", "Recording", "Mixing", "Mastering"],
    checklistTemplate: [
      "Script & storyboard approval",
      "Capture voiceover & audio recordings",
      "Clean audio stems & edit dialogue",
      "Apply compression & noise gates",
      "Stereo/Dolby surround mix review",
      "Deliver lossless master audio files"
    ]
  },
  "digital-design": {
    label: "Creative Brand & Design",
    stages: ["conception", "moodboard", "refinement", "assets"],
    stageLabels: ["Conception", "Moodboard", "Refinement", "Assets Delivery"],
    checklistTemplate: [
      "Moodboard & style concept alignment",
      "Draft layouts & wireframes",
      "Refine color palette & typography",
      "Design final graphic assets & SVG",
      "Compile brand design guidelines booklet",
      "Export assets packaging for development"
    ]
  },
  "general-ops": {
    label: "General Project Operations",
    stages: ["kickoff", "planning", "execution", "handover"],
    stageLabels: ["Kickoff", "Planning", "Execution", "Handover"],
    checklistTemplate: [
      "Project scope & timeline signoff",
      "Resource allocation & scheduling",
      "Milestone reviews & standups",
      "Execution of core deliverables",
      "Quality assurance review check",
      "Final handover to client team"
    ]
  }
};

const defaultContacts = [
  { id: "contact_01", name: "Eva Robinson", email: "eva.robinson@alabamamachinery.com", phone: "+191120222313", address: "123 Industrial Rd, Huntsville, AL", preferences: "Prefers Next.js/React framework, Figma design specs, and Slack communications.", interest: "Logistics Platform Overhaul" },
  { id: "contact_02", name: "Christian Bass", email: "c.bass@nordicops.se", phone: "+46418209322", address: "Storgatan 45, Landskrona, SE", preferences: "Prefers serverless databases, clean REST APIs, and lossless audio distribution.", interest: "Broadcast & Podcast Sandbox" },
  { id: "contact_03", name: "Helna Julie", email: "helna@skaniacreative.dk", phone: "+4589201928", address: "Ostergade 12, Copenhagen, DK", preferences: "Prefers Figma layouts, requires weekly agile standups, and uses Slack sync.", interest: "Full LP Audio Mix & Media Overhaul" }
];

const defaultProjects = [
  { 
    id: "proj_01", 
    title: "Web Logistics Dashboard Integration", 
    clientName: "Eva Robinson", 
    contactId: "contact_01", 
    category: "web-app",
    stage: "development", 
    notes: "Developing responsive logistics dashboard portal. Tech stack: React & Node.js. Setup responsive layout tables.", 
    checklist: [
      { text: "Define database schema & architecture", done: true },
      { text: "Figma interactive prototype review", done: true },
      { text: "Develop frontend views & components", done: false },
      { text: "Integrate backend APIs & routing", done: false }
    ] 
  },
  { 
    id: "proj_02", 
    title: "Nordic Ops Podcast Launch", 
    clientName: "Christian Bass", 
    contactId: "contact_02", 
    category: "audio-media",
    stage: "mixing", 
    notes: "Cleaning dialog stems and tuning audio dynamics. Configured noise gates.", 
    checklist: [
      { text: "Capture voiceover & audio recordings", done: true },
      { text: "Clean audio stems & edit dialogue", done: true },
      { text: "Apply compression & noise gates", done: false }
    ] 
  }
];

const defaultFinancials = [];
const defaultAlerts = [];

const defaultFileReviews = [
  { 
    id: "rev_01", 
    projectId: "proj_01", 
    projectTitle: "Web Logistics Dashboard Integration", 
    activeVersion: "Version 2 (Beta)", 
    fileName: "logistics_dashboard_v1_beta.png",
    comments: [
      { x: 35, y: 18, text: "Layout spacing needs 16px padding on dashboard cards.", author: "Eva Robinson" }, 
      { x: 72, y: 45, text: "Ensure database synchronization indicator is green.", author: "CPz" }
    ] 
  },
  { 
    id: "rev_02", 
    projectId: "proj_02", 
    projectTitle: "Nordic Ops Podcast Launch", 
    activeVersion: "Version 2 (Beta)", 
    fileName: "Nordic_Ops_Episode_1_v1.mp3",
    comments: [
      { time: 42, text: "Background static noise needs attenuation.", author: "Christian Bass" }, 
      { time: 94, text: "Increase compression threshold slightly.", author: "CPz" }
    ] 
  }
];

// ── One-time purge of mock financial/alert/booking data ──────────────────────
// Bumping this version string forces a clean wipe on next browser load.
const DATA_RESET_VERSION = "v2-real-data-only";
if (localStorage.getItem("eqx_data_reset") !== DATA_RESET_VERSION) {
  localStorage.removeItem("eqx_crm_financials");
  localStorage.removeItem("eqx_crm_alerts");
  localStorage.removeItem("eqx_crm_bookings");
  localStorage.setItem("eqx_data_reset", DATA_RESET_VERSION);
}

// Active State Loading
let leads = JSON.parse(localStorage.getItem("eqx_crm_leads")) || [...mockLeads];
let tasks = JSON.parse(localStorage.getItem("eqx_crm_tasks")) || [...mockTasks];
let bookings = JSON.parse(localStorage.getItem("eqx_crm_bookings")) || []; // Real bookings only
let contacts = JSON.parse(localStorage.getItem("eqx_crm_contacts")) || [...defaultContacts];
let projects = JSON.parse(localStorage.getItem("eqx_crm_projects")) || [...defaultProjects];
let financials = JSON.parse(localStorage.getItem("eqx_crm_financials")) || []; // Real financials only
let alerts = JSON.parse(localStorage.getItem("eqx_crm_alerts")) || []; // Real alerts only
let fileReviews = JSON.parse(localStorage.getItem("eqx_crm_file_reviews")) || [...defaultFileReviews];

let selectedLeadId = "lead_01";
let selectedContactId = "contact_01";
let selectedProjectId = "proj_01";
let activeReviewTrack = "rev_01";

let filterLocation = "all";
let filterSource = "all";
let filterStatus = "all";
let isFirebaseConnected = localStorage.getItem("eqx_firebase_connected") !== "false";
let currentAlertTab = "All";

// Audio Review Waveform Simulator Properties
let isAudioPlaying = false;
let playbackTime = 0;
let playbackDuration = 180; // seconds
let audioTimerInterval = null;

import { db, saveToFirestore, deleteFromFirestore } from './firebase-db.js';
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// State Persistence Utilities

let unsubscribes = [];

function setupFirebaseListeners() {
  if (!isFirebaseConnected) return;

  // Clear existing listeners
  unsubscribes.forEach(u => u());
  unsubscribes = [];

  unsubscribes.push(onSnapshot(collection(db, "leads"), (snapshot) => {
    if(!snapshot.empty) {
      leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      saveLocalState();
      renderPipelineTab();
    }
  }));

  unsubscribes.push(onSnapshot(collection(db, "contacts"), (snapshot) => {
    if(!snapshot.empty) {
      contacts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      saveLocalState();
      renderContactsList();
    }
  }));

  unsubscribes.push(onSnapshot(collection(db, "projects"), (snapshot) => {
    if(!snapshot.empty) {
      projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      saveLocalState();
      renderProjectsTab();
    }
  }));

  unsubscribes.push(onSnapshot(collection(db, "bookings"), (snapshot) => {
    if(!snapshot.empty) {
      bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      saveLocalState();
      renderCalendarTab();
    }
  }));

  unsubscribes.push(onSnapshot(collection(db, "financials"), (snapshot) => {
    if(!snapshot.empty) {
      financials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      saveLocalState();
      renderFinancialsTab();
    }
  }));

  unsubscribes.push(onSnapshot(collection(db, "tasks"), (snapshot) => {
    if(!snapshot.empty) {
      tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      saveLocalState();
      renderTodosTab();
    }
  }));
}

function saveLocalState() {
  localStorage.setItem("eqx_crm_leads", JSON.stringify(leads));
  localStorage.setItem("eqx_crm_tasks", JSON.stringify(tasks));
  localStorage.setItem("eqx_crm_bookings", JSON.stringify(bookings));
  localStorage.setItem("eqx_crm_contacts", JSON.stringify(contacts));
  localStorage.setItem("eqx_crm_projects", JSON.stringify(projects));
  localStorage.setItem("eqx_crm_financials", JSON.stringify(financials));
  localStorage.setItem("eqx_crm_alerts", JSON.stringify(alerts));
  localStorage.setItem("eqx_crm_file_reviews", JSON.stringify(fileReviews));
}

// Validation helpers
export function validateLeadData(data) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.firstName || !data.lastName) return "First and last name are required.";
  if (!emailRegex.test(data.email)) return "Please enter a valid email address.";
  if (!data.phone) return "Phone number is required.";
  return null;
}

// Reusable helper to create a booking record and link tasks/alerts
function createBookingRecord(leadId, leadName, room, type, date, duration, notes) {
  const newBooking = {
    id: `booking_${Date.now()}`,
    leadId,
    leadName,
    type,
    room,
    date,
    duration,
    notes
  };

  const bookingTask = {
    id: `task_booking_${newBooking.id}`,
    title: `[Booking: ${type} in ${room}] ${notes || 'No notes'}`,
    dueDate: `June ${date}`,
    assignedTo: "CPz",
    status: "pending",
    leadId: leadId
  };

  // Trigger an alert
  const newAlert = {
    id: `alt_${Date.now()}`,
    type: "All",
    title: "New Booking Created",
    desc: `${leadName} scheduled ${type} in ${room} for June ${date}.`,
    time: "Just now",
    indicator: "indicator-blue",
    iconClass: "blue"
  };
  alerts.unshift(newAlert);

  if (isFirebaseConnected) {
    saveToFirestore('bookings', newBooking.id, newBooking);
    saveToFirestore('tasks', bookingTask.id, bookingTask);
    saveToFirestore('alerts', newAlert.id, newAlert);
    showNotification(`Booked ${type} on June ${date} to Cloud`);
  } else {
    bookings.push(newBooking);
    tasks.push(bookingTask);
    saveLocalState();
    showNotification(`Booked ${type} on June ${date} Locally`);
    refreshData();
  }
  
  // Prompt the user with the email notification preview
  setTimeout(() => {
    if (typeof window.triggerEmailPreview === "function") {
      window.triggerEmailPreview(newBooking.id);
    }
  }, 1000);
}

// Global actions exposed to Window scope
window.submitBookingForm = () => {
  const leadId = document.getElementById("booking-lead-id").value;
  
  // Extract checked rooms
  const checkedBoxes = document.querySelectorAll("input[name='booking-room-checkbox']:checked");
  const selectedRooms = Array.from(checkedBoxes).map(cb => cb.value);
  if (selectedRooms.length === 0) {
    showNotification("Error: Please select at least one room.", "error");
    return;
  }
  const room = selectedRooms.join(", ");

  const type = document.getElementById("booking-type").value;
  const date = parseInt(document.getElementById("booking-date").value) || 15;
  const duration = parseInt(document.getElementById("booking-duration").value) || 2;
  const notes = document.getElementById("booking-notes").value || "";

  const lead = leads.find(l => l.id === leadId);
  const leadName = lead ? `${lead.firstName} ${lead.lastName}` : "Walk-in Client";

  createBookingRecord(leadId, leadName, room, type, date, duration, notes);

  // Clear notes field
  document.getElementById("booking-notes").value = "";
};

window.deleteBooking = (id) => {
  if (confirm("Are you sure you want to cancel this scheduled booking?")) {
    if (isFirebaseConnected) {
      deleteFromFirestore('bookings', id);
      deleteFromFirestore('tasks', `task_booking_${id}`);
      showNotification("Booking cancelled on Cloud");
    } else {
      bookings = bookings.filter(b => b.id !== id);
      tasks = tasks.filter(t => t.id !== `task_booking_${id}`);
      saveLocalState();
      showNotification("Booking cancelled successfully");
      refreshData();
    }
  }
};

window.createNewLead = function(firstName, lastName, email, phone, company, dealValue, location, source) {
  if (!firstName || !lastName || !email) {
    showNotification("Error: Name and Email are required.", "error");
    return false;
  }

  const newLead = {
    id: "lead_" + Date.now(),
    firstName,
    lastName,
    email,
    phone,
    company,
    dealValue: parseFloat(dealValue) || 0,
    status: "new",
    location: location || "Unknown",
    source: source || "manual",
    interactionHistory: [
      { timestamp: new Date().toISOString(), type: "system", notes: "Lead manually added into the system." }
    ]
  };

  if (isFirebaseConnected) {
    saveToFirestore('leads', newLead.id, newLead);
    showNotification("Lead dispatched to cloud database successfully.");
  } else {
    leads.push(newLead);
    saveLocalState();
    renderPipelineTab();
    showNotification("Lead added locally.");
  }
  return true;
};

window.createNewProject = function(title, client, category, notes) {
  if (!title || !client) {
    showNotification("Error: Title and Client are required.", "error");
    return false;
  }

  const catData = projectCategories[category] || projectCategories["general-ops"];
  const newProj = {
    id: "proj_" + Date.now(),
    title,
    clientName: client,
    category,
    stage: catData.stages[0],
    notes,
    checklist: catData.checklistTemplate.map(text => ({ text, done: false }))
  };

  if (isFirebaseConnected) {
    saveToFirestore('projects', newProj.id, newProj);
    showNotification("Project launched in cloud workspace.");
  } else {
    projects.push(newProj);
    saveLocalState();
    renderProjectsTab();
    showNotification("Project launched locally.");
  }
  return true;
};

// Function to update client dropdown options dynamically from leads and contacts
function populateClientDropdown() {
  const clientSelect = document.getElementById("project-form-client");
  if (!clientSelect) return;

  const currentSelection = clientSelect.value;

  // Clear existing options except the first disabled one
  clientSelect.innerHTML = '<option value="" disabled selected>Select a client...</option>';

  const clientMap = new Map(); // Use Map to keep unique entries

  // 1. Gather from leads
  leads.forEach(lead => {
    // If company exists, we add it
    if (lead.company && lead.company.trim()) {
      const key = lead.company.trim();
      if (!clientMap.has(key)) {
        clientMap.set(key, {
          value: key,
          label: `${key} (Lead - Company)`
        });
      }
    }
    // Also add contact name of lead
    if (lead.firstName && lead.lastName) {
      const key = `${lead.firstName.trim()} ${lead.lastName.trim()}`;
      if (!clientMap.has(key)) {
        clientMap.set(key, {
          value: key,
          label: `${key} (Lead - Contact)`
        });
      }
    }
  });

  // 2. Gather from contacts
  contacts.forEach(contact => {
    if (contact.name && contact.name.trim()) {
      const key = contact.name.trim();
      if (!clientMap.has(key)) {
        clientMap.set(key, {
          value: key,
          label: `${key} (Contact)`
        });
      }
    }
  });

  // Populate options
  clientMap.forEach(clientInfo => {
    const opt = document.createElement("option");
    opt.value = clientInfo.value;
    opt.textContent = clientInfo.label;
    clientSelect.appendChild(opt);
  });

  // Restore selection if it still exists
  if (currentSelection && clientMap.has(currentSelection)) {
    clientSelect.value = currentSelection;
  }
}

// Function to auto-select client based on category keyword matching
function autoSelectClientByCategory() {
  const categorySelect = document.getElementById("project-form-category");
  const clientSelect = document.getElementById("project-form-client");
  if (!categorySelect || !clientSelect) return;

  const category = categorySelect.value;
  
  // Get all options in the client dropdown
  const options = Array.from(clientSelect.options);
  if (options.length <= 1) return; // Only placeholder

  // Heuristic mapping:
  let bestValue = "";
  let bestScore = -1;

  options.forEach(opt => {
    if (!opt.value) return; // Skip placeholder

    let score = 0;
    const valLower = opt.value.toLowerCase();
    
    // Find matching lead or contact details
    let detailsText = "";
    const matchedLead = leads.find(l => 
      (l.company && l.company.trim() === opt.value) || 
      (`${l.firstName} ${l.lastName}`.trim() === opt.value)
    );
    const matchedContact = contacts.find(c => c.name && c.name.trim() === opt.value);

    if (matchedLead) {
      detailsText += ` ${matchedLead.company} ${matchedLead.interest || ""} ${matchedLead.notes || ""} ${matchedLead.firstName} ${matchedLead.lastName}`;
      if (matchedLead.interactionHistory) {
        matchedLead.interactionHistory.forEach(h => {
          detailsText += ` ${h.notes || ""}`;
        });
      }
    }
    if (matchedContact) {
      detailsText += ` ${matchedContact.name} ${matchedContact.preferences || ""} ${matchedContact.interest || ""}`;
    }
    detailsText = detailsText.toLowerCase();

    // Scoring based on category keywords
    if (category === "audio-media") {
      const keywords = ["audio", "podcast", "mixing", "mastering", "music", "sound", "creative", "skania", "media", "stem", "voiceover", "broadcast"];
      keywords.forEach(kw => {
        if (detailsText.includes(kw)) score += 1;
        if (valLower.includes(kw)) score += 2;
      });
      // Specific boost for Christian Bass and Skania
      if (valLower.includes("christian") || valLower.includes("skania")) {
        score += 5;
      }
    } else if (category === "web-app") {
      const keywords = ["web", "app", "platform", "dashboard", "logistics", "database", "api", "serverless", "react", "next.js", "figma", "machinery", "supply", "alabama"];
      keywords.forEach(kw => {
        if (detailsText.includes(kw)) score += 1;
        if (valLower.includes(kw)) score += 2;
      });
      // Specific boost for Eva Robinson and Alabama Machinery
      if (valLower.includes("eva") || valLower.includes("alabama")) {
        score += 5;
      }
    } else if (category === "digital-design") {
      const keywords = ["design", "brand", "concept", "figma", "graphic", "logo", "layout", "creative", "skania", "style", "color", "typography"];
      keywords.forEach(kw => {
        if (detailsText.includes(kw)) score += 1;
        if (valLower.includes(kw)) score += 2;
      });
      // Specific boost for Helna Julie / Skania
      if (valLower.includes("helna") || valLower.includes("skania")) {
        score += 5;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestValue = opt.value;
    }
  });

  if (bestScore > 0 && bestValue) {
    clientSelect.value = bestValue;
  } else {
    // If no strong match, just select the first real client option
    if (options[1]) {
      clientSelect.value = options[1].value;
    }
  }
}

// Initialize Main CRM Suite
export function initCRM(elements, dbHelpers = {}) {
  // Toggle Database integration mode
  if (isFirebaseConnected) {
    setupFirebaseListeners();
  }

  // Expose global database toggle action for Settings
  window.toggleFirebaseIngest = async (checked) => {
    isFirebaseConnected = checked;
    localStorage.setItem("eqx_firebase_connected", isFirebaseConnected);
    if (isFirebaseConnected) {
      setupFirebaseListeners();
    } else {
      unsubscribes.forEach(u => u());
      unsubscribes = [];
    }
    showNotification(isFirebaseConnected ? "Switched to Live Firebase Integration" : "Switched to Local Sandbox Simulation");
    await refreshData();
  };

  // Set up event listeners for dynamic project client dropdown
  const categorySelect = document.getElementById("project-form-category");
  if (categorySelect) {
    categorySelect.addEventListener("change", autoSelectClientByCategory);
  }

  // Intercept window.openProjectModal to populate client select options dynamically
  const originalOpenProjectModal = window.openProjectModal;
  window.openProjectModal = () => {
    populateClientDropdown();
    autoSelectClientByCategory();
    if (typeof originalOpenProjectModal === "function") {
      originalOpenProjectModal();
    }
  };

  // Helper function to handle programmatic and manual tab switches
  function navigateToTab(id, statusFilter = 'all') {
    filterStatus = statusFilter;
    const tabIds = ["dashboard", "contacts", "pipeline", "calendar", "projects", "todos", "review", "financials", "settings"];
    tabIds.forEach(t => {
      document.getElementById(`sidebar-tab-${t}`)?.classList.remove("active");
      document.getElementById(`crm-tab-${t}`)?.classList.remove("active");
    });
    
    document.getElementById(`sidebar-tab-${id}`)?.classList.add("active");
    document.getElementById(`crm-tab-${id}`)?.classList.add("active");

    if (id === "review") {
      setTimeout(initWaveformSimulator, 100);
    }
    if (id === "settings") {
      renderSettingsTab();
    }

    refreshData();
  }

  // 1. Sidebar Tab Switching Setup
  const tabIds = ["dashboard", "contacts", "pipeline", "calendar", "projects", "todos", "review", "financials", "settings"];
  tabIds.forEach(id => {
    const btn = document.getElementById(`sidebar-tab-${id}`);
    if (btn) {
      btn.addEventListener("click", () => {
        navigateToTab(id, 'all');
      });
    }
  });

  // 1b. KPI Metric Cards Click Navigation & Filtering Setup
  const kpiPipelineCard = document.getElementById("kpi-card-pipeline");
  const kpiUncontactedCard = document.getElementById("kpi-card-uncontacted");
  const kpiPendingCard = document.getElementById("kpi-card-pending");

  if (kpiPipelineCard) {
    kpiPipelineCard.addEventListener("click", () => {
      navigateToTab("pipeline", "all");
    });
  }

  if (kpiUncontactedCard) {
    kpiUncontactedCard.addEventListener("click", () => {
      navigateToTab("pipeline", "new");
    });
  }

  if (kpiPendingCard) {
    kpiPendingCard.addEventListener("click", () => {
      navigateToTab("todos");
    });
  }

  // Load state and render all initially
  refreshData();

  // ===== THEME TOGGLE (Dark/Light Mode) =====
  const themeBtn = document.getElementById('theme-toggle');
  const sunIcon  = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');

  function applyTheme(theme) {
    document.body.dataset.theme = theme;
    localStorage.setItem('eqx-theme', theme);
    if (theme === 'light') {
      if (sunIcon)  sunIcon.style.display  = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
    } else {
      if (sunIcon)  sunIcon.style.display  = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
    }
  }

  // Apply saved preference on load
  const savedTheme = localStorage.getItem('eqx-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.body.dataset.theme === 'light' ? 'dark' : 'light';
      applyTheme(current);
      showNotification(current === 'light' ? '☀️  Switched to Light Mode' : '🌙  Switched to Dark Mode');
    });
  }

  // ===== SIDEBAR COLLAPSE TOGGLE =====
  const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
  const crmLayout = document.querySelector('.crm-layout');

  function applySidebarState(collapsed) {
    if (!crmLayout) return;
    if (collapsed === 'true') {
      crmLayout.classList.add('sidebar-collapsed');
      if (sidebarToggleBtn) {
        sidebarToggleBtn.setAttribute('aria-label', 'Expand Sidebar');
        sidebarToggleBtn.setAttribute('title', 'Expand Sidebar');
      }
    } else {
      crmLayout.classList.remove('sidebar-collapsed');
      if (sidebarToggleBtn) {
        sidebarToggleBtn.setAttribute('aria-label', 'Collapse Sidebar');
        sidebarToggleBtn.setAttribute('title', 'Collapse Sidebar');
      }
    }
  }

  const savedSidebarState = localStorage.getItem('eqx-sidebar-collapsed') || 'false';
  applySidebarState(savedSidebarState);

  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener('click', () => {
      if (!crmLayout) return;
      const isCurrentlyCollapsed = crmLayout.classList.contains('sidebar-collapsed');
      const newState = !isCurrentlyCollapsed;
      localStorage.setItem('eqx-sidebar-collapsed', newState ? 'true' : 'false');
      applySidebarState(newState ? 'true' : 'false');
    });
  }
}

// Global visual notice banner helper
function showNotification(msg) {
  let notifyEl = document.getElementById("crm-toast-banner");
  if (!notifyEl) {
    notifyEl = document.createElement("div");
    notifyEl.id = "crm-toast-banner";
    notifyEl.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: var(--eqx-dark-panel, #242826);
      color: var(--eqx-text-light, #F5F5F5);
      padding: 12px 24px;
      border-radius: 100px;
      border: 1px solid rgba(255, 87, 51, 0.35);
      box-shadow: 0 10px 28px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,87,51,0.15);
      z-index: 1200;
      font-size: 0.84rem;
      font-weight: 500;
      transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
      opacity: 0;
      transform: translateY(10px);
      display: flex;
      align-items: center;
      gap: 8px;
    `;
    document.body.appendChild(notifyEl);
  }
  notifyEl.textContent = msg;
  notifyEl.style.opacity = "1";
  notifyEl.style.transform = "translateY(0)";
  setTimeout(() => {
    notifyEl.style.opacity = "0";
    notifyEl.style.transform = "translateY(10px)";
  }, 3200);
}

// Controller refresh function
async function refreshData() {
  if (!isFirebaseConnected) {
    leads = JSON.parse(localStorage.getItem("eqx_crm_leads")) || [...mockLeads];
    tasks = JSON.parse(localStorage.getItem("eqx_crm_tasks")) || [...mockTasks];
    bookings = JSON.parse(localStorage.getItem("eqx_crm_bookings")) || bookings;
    contacts = JSON.parse(localStorage.getItem("eqx_crm_contacts")) || [...defaultContacts];
    projects = JSON.parse(localStorage.getItem("eqx_crm_projects")) || [...defaultProjects];
    financials = JSON.parse(localStorage.getItem("eqx_crm_financials")) || [...defaultFinancials];
    alerts = JSON.parse(localStorage.getItem("eqx_crm_alerts")) || [...defaultAlerts];
    fileReviews = JSON.parse(localStorage.getItem("eqx_crm_file_reviews")) || [...defaultFileReviews];
  }

  // Update dynamic client dropdown
  populateClientDropdown();

  // Render active tab views
  renderMetricsHeader();
  renderDashboardTab();
  renderPipelineTab();
  renderContactsTab();
  renderCalendarTab();
  renderProjectsTab();
  renderFileReviewTab();
  renderFinancialsTab();
  renderTodosTab();
  renderSettingsTab();
}

// Renders total numbers at the top metrics bar
function renderMetricsHeader() {
  const pipelineVal = leads
    .filter(l => l.status === "qualified" || l.status === "contacted")
    .reduce((sum, l) => sum + (l.dealValue || 0), 0);
  const uncontactedCount = leads.filter(l => l.status === "new").length;
  const pendingTasks = tasks.filter(t => t.status === "pending").length;

  const totalRevEl = document.getElementById("kpi-total-revenue");
  const newLeadsEl = document.getElementById("kpi-new-leads");
  const pendingTasksEl = document.getElementById("kpi-pending-tasks");

  if (totalRevEl) totalRevEl.textContent = `${pipelineVal.toLocaleString()} SEK`;
  if (newLeadsEl) newLeadsEl.textContent = uncontactedCount.toString();
  if (pendingTasksEl) pendingTasksEl.textContent = pendingTasks.toString();
}

// -------------------------------------------------------------
// TAB 1: DASHBOARD OVERVIEW & REPORTING (MOCKUP ACCENT STYLES)
// -------------------------------------------------------------
function renderDashboardTab() {
  const container = document.getElementById("crm-tab-dashboard");
  if (!container) return;

  // Build metrics for gauges
  const pipelineVal = leads.reduce((sum, l) => sum + (l.dealValue || 0), 0);
  const targetVal = 100000;
  const pipelinePct = Math.min(Math.round((pipelineVal / targetVal) * 100), 100);

  const qualifiedLeads = leads.filter(l => l.status === "qualified").length;
  const totalLeads = leads.length || 1;
  const conversionPct = Math.min(Math.round((qualifiedLeads / totalLeads) * 100), 100);

  const bookedCount = bookings.length;
  const roomSlots = 30; // Max 30 slots available
  const roomOccupancyPct = Math.min(Math.round((bookedCount / roomSlots) * 100), 100);

  // Dynamic layout rendering
  const hasAlerts = alerts.length > 0;
  if (hasAlerts) {
    container.innerHTML = `
      <div style="display: grid; grid-template-columns: 1.1fr 1.9fr; gap: 32px;">
        
        <!-- Left Alerts panel matching mockup -->
        <div class="glass-panel alerts-panel">
          <div class="alerts-header">
            <h3>Alerts</h3>
            <button class="btn-primary sm" id="alerts-clear-btn">Clear All</button>
          </div>
          
          <div class="alerts-tabs">
            <button class="alerts-tab ${currentAlertTab === 'All' ? 'active' : ''}" data-cat="All">All</button>
            <button class="alerts-tab ${currentAlertTab === 'Important' ? 'active' : ''}" data-cat="Important">Important</button>
            <button class="alerts-tab ${currentAlertTab === 'Comments' ? 'active' : ''}" data-cat="Comments">Comments</button>
          </div>

          <div class="alerts-list">
            ${renderAlertItems()}
          </div>
          
          <div style="display:flex; justify-content:space-between; margin-top:auto;">
            <button class="alerts-tab" style="border:none;" id="alert-exit-link">Exit</button>
            <button class="btn-primary sm" id="alert-exit-btn">Done</button>
          </div>
        </div>

        <!-- Right column metrics dashboard -->
        <div style="display:flex; flex-direction:column; gap:32px;">
          
          <!-- Circular Progress Gauges row -->
          <div class="gauges-row">
            ${renderCircularGauge("Pipeline Target", `${pipelineVal.toLocaleString()} SEK`, pipelinePct, "#DF6044", "rgba(223,96,68,0.4)")}
            ${renderCircularGauge("Conversion Rate", `${conversionPct}%`, conversionPct, "#00F5D4", "rgba(0,245,212,0.4)")}
            ${renderCircularGauge("Room Occupancy", `${roomOccupancyPct}%`, roomOccupancyPct, "#00B4D8", "rgba(0,180,216,0.4)")}
          </div>

          <!-- Dynamic reports & Referral charts -->
          <div class="glass-panel" style="padding:24px; display:flex; flex-direction:column; gap:20px;">
            <h3 style="font-family:var(--font-head); font-weight:300; font-size:1.3rem; margin:0; color:var(--eqx-text-light);">Acquisition & Referral Sources (Past 21 Months)</h3>
            
            <div style="display:flex; flex-direction:column; gap:14px;">
              ${renderBarReport("Website Form Inquiries", 48, "#00F5D4")}
              ${renderBarReport("Industry Referrals", 32, "#DF6044")}
              ${renderBarReport("Manual Admin Ingestion", 20, "#9D4EDD")}
            </div>

            <div style="border-top:1px solid rgba(255,255,255,0.05); padding-top:16px; display:flex; justify-content:space-between; align-items:center;">
              <div style="font-size:0.8rem; color:var(--eqx-text-muted);">
                Most prominent source: <span style="color:#00F5D4; font-weight:600;">Website Forms</span>
              </div>
              <div style="font-size:0.8rem; color:var(--eqx-text-muted);">
                Month-over-Month growth: <span style="color:var(--eqx-accent); font-weight:600;">+14.2%</span>
              </div>
            </div>
          </div>

          <!-- Overdue Invoices Quick widget -->
          <div class="glass-panel" style="padding:24px;">
            <h3 style="font-family:var(--font-head); font-weight:300; font-size:1.3rem; margin:0 0 16px 0; color:var(--eqx-text-light);">Past Due Invoices</h3>
            <div style="display:flex; flex-direction:column; gap:10px;">
              ${renderPastDueInvoices()}
            </div>
          </div>

        </div>

      </div>
    `;
  } else {
    container.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr; gap: 32px;">

        <!-- Full-width metrics dashboard -->
        <div style="display:flex; flex-direction:column; gap:32px;">
          
          <!-- Circular Progress Gauges row -->
          <div class="gauges-row">
            ${renderCircularGauge("Pipeline Target", `${pipelineVal.toLocaleString()} SEK`, pipelinePct, "#DF6044", "rgba(223,96,68,0.4)")}
            ${renderCircularGauge("Conversion Rate", `${conversionPct}%`, conversionPct, "#00F5D4", "rgba(0,245,212,0.4)")}
            ${renderCircularGauge("Room Occupancy", `${roomOccupancyPct}%`, roomOccupancyPct, "#00B4D8", "rgba(0,180,216,0.4)")}
          </div>

          <!-- Dynamic reports & Referral charts -->
          <div class="glass-panel" style="padding:24px; display:flex; flex-direction:column; gap:20px;">
            <h3 style="font-family:var(--font-head); font-weight:300; font-size:1.3rem; margin:0; color:var(--eqx-text-light);">Acquisition & Referral Sources (Past 21 Months)</h3>
            
            <div style="display:flex; flex-direction:column; gap:14px;">
              ${renderBarReport("Website Form Inquiries", 48, "#00F5D4")}
              ${renderBarReport("Industry Referrals", 32, "#DF6044")}
              ${renderBarReport("Manual Admin Ingestion", 20, "#9D4EDD")}
            </div>

            <div style="border-top:1px solid rgba(255,255,255,0.05); padding-top:16px; display:flex; justify-content:space-between; align-items:center;">
              <div style="font-size:0.8rem; color:var(--eqx-text-muted);">
                Most prominent source: <span style="color:#00F5D4; font-weight:600;">Website Forms</span>
              </div>
              <div style="font-size:0.8rem; color:var(--eqx-text-muted);">
                Month-over-Month growth: <span style="color:var(--eqx-accent); font-weight:600;">+14.2%</span>
              </div>
            </div>
          </div>

          <!-- Overdue Invoices Quick widget -->
          <div class="glass-panel" style="padding:24px;">
            <h3 style="font-family:var(--font-head); font-weight:300; font-size:1.3rem; margin:0 0 16px 0; color:var(--eqx-text-light);">Past Due Invoices</h3>
            <div style="display:flex; flex-direction:column; gap:10px;">
              ${renderPastDueInvoices()}
            </div>
          </div>

        </div>

      </div>
    `;
  }

  // Bind Alerts Action Listeners
  container.querySelectorAll(".alerts-tab").forEach(tab => {
    tab.addEventListener("click", (e) => {
      const cat = tab.getAttribute("data-cat");
      if (cat) {
        currentAlertTab = cat;
        renderDashboardTab();
      }
    });
  });

  const clearBtn = container.querySelector("#alerts-clear-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      alerts = [];
      saveLocalState();
      showNotification("All alerts cleared");
      renderDashboardTab();
    });
  }

  const exitBtn = container.querySelector("#alert-exit-btn");
  const exitLink = container.querySelector("#alert-exit-link");
}

function renderAlertItems() {
  const filtered = alerts.filter(a => {
    if (currentAlertTab === "All") return true;
    if (currentAlertTab === "Important") return a.type === "Important";
    if (currentAlertTab === "Comments") return a.type === "Comments" || a.type === "All";
    return true;
  });

  if (filtered.length === 0) {
    return `<div style="text-align:center; padding:30px; font-size:0.8rem; color:var(--eqx-text-muted);">No notifications to display.</div>`;
  }

  return filtered.map(a => `
    <div class="alert-item ${a.indicator || 'indicator-blue'}">
      <div class="alert-icon-wrapper ${a.iconClass || 'blue'}">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </div>
      <div class="alert-info">
        <span class="alert-title">${a.title}</span>
        <span class="alert-desc">${a.desc}</span>
      </div>
      <span style="font-size:0.65rem; color:var(--eqx-text-muted); flex-shrink:0;">${a.time}</span>
    </div>
  `).join("");
}

function renderCircularGauge(label, value, percentage, color, glowColor) {
  // calculate circumference = 2 * PI * r (r=58) = ~364.4
  const offset = 364.4 - (364.4 * percentage) / 100;
  return `
    <div class="gauge-widget">
      <div class="gauge-container">
        <svg class="gauge-svg">
          <circle class="gauge-bg-circle" cx="70" cy="70" r="58" />
          <circle class="gauge-progress-circle" cx="70" cy="70" r="58" 
                  style="stroke: ${color}; stroke-dashoffset: ${offset}; --gauge-glow: ${glowColor};" />
        </svg>
        <div class="gauge-center-text">
          <span class="gauge-value">${value}</span>
          <span class="gauge-label">${percentage}%</span>
        </div>
      </div>
      <div style="font-size: 0.8rem; font-weight:500; color:var(--eqx-text-light); text-transform:uppercase;">${label}</div>
    </div>
  `;
}

function renderBarReport(title, pct, color) {
  return `
    <div style="display:flex; flex-direction:column; gap:6px;">
      <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
        <span style="color:var(--eqx-text-light);">${title}</span>
        <span style="color:var(--eqx-text-muted); font-weight:600;">${pct}%</span>
      </div>
      <div style="height:6px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:3px; overflow:hidden;">
        <div style="width:${pct}%; height:100%; background:${color}; border-radius:3px; box-shadow: 0 0 8px ${color}80;"></div>
      </div>
    </div>
  `;
}

function renderPastDueInvoices() {
  const overdues = financials.filter(f => f.status === "pastdue");
  if (overdues.length === 0) {
    return `<span style="font-size:0.8rem; color:var(--eqx-text-muted);">No invoices past due.</span>`;
  }
  return overdues.map(f => `
    <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(223,96,68,0.03); border:1px solid rgba(223,96,68,0.1); border-radius:8px; padding:10px 16px; font-size:0.8rem;">
      <span style="color:var(--eqx-text-light); font-weight:500;">${f.projectTitle}</span>
      <div style="display:flex; gap:16px; align-items:center;">
        <span style="color:#DF6044; font-weight:600;">${f.amount.toLocaleString()} SEK</span>
        <span class="badge-fin-status pastdue">Due ${f.dueDate}</span>
      </div>
    </div>
  `).join("");
}

// -------------------------------------------------------------
// TAB 2: PIPELINE KANBAN & LEAD STAGE
// -------------------------------------------------------------
function renderPipelineTab() {
  const container = document.getElementById("crm-tab-pipeline");
  if (!container) return;

  const statusFilterPill = filterStatus !== 'all' ? `
    <div style="display:flex; gap:8px;" id="filter-status-group">
      <button class="pipeline-filter-btn active" id="clear-status-filter-btn" style="border-color: var(--eqx-accent); color: var(--eqx-accent);">
        Status: Uncontacted &times;
      </button>
    </div>
  ` : '';

  container.innerHTML = `
    <section class="crm-workspace-grid">
      
      <!-- Left Side Kanban View -->
      <div class="pipeline-view">
        
        <!-- Filter Controls -->
        <div class="pipeline-filter-bar">
          <div style="display:flex; gap:8px;" id="filter-location-group">
            <button class="pipeline-filter-btn ${filterLocation === 'all' ? 'active' : ''}" data-loc="all">All Locations</button>
            <button class="pipeline-filter-btn ${filterLocation === 'Landskrona, SE' ? 'active' : ''}" data-loc="Landskrona, SE">Landskrona</button>
            <button class="pipeline-filter-btn ${filterLocation === 'Huntsville, AL' ? 'active' : ''}" data-loc="Huntsville, AL">Huntsville</button>
            <button class="pipeline-filter-btn ${filterLocation === 'Europe Hub' ? 'active' : ''}" data-loc="Europe Hub">Europe Hub</button>
          </div>
          
          <div style="display:flex; gap:8px;" id="filter-source-group">
            <button class="pipeline-filter-btn ${filterSource === 'all' ? 'active' : ''}" data-source="all">All Sources</button>
            <button class="pipeline-filter-btn ${filterSource === 'website' ? 'active' : ''}" data-source="website">Website</button>
            <button class="pipeline-filter-btn ${filterSource === 'referral' ? 'active' : ''}" data-source="referral">Referrals</button>
            <button class="pipeline-filter-btn ${filterSource === 'manual' ? 'active' : ''}" data-source="manual">Manual</button>
          </div>
          ${statusFilterPill}
        </div>

        <!-- Kanban Board columns -->
        <div class="pipeline-grid">
          
          <div class="pipeline-column" data-status="new" ${filterStatus !== 'all' && filterStatus !== 'new' ? 'style="display:none;"' : ''}>
            <div class="pipeline-column-header">
              <span class="pipeline-column-title">New Lead</span>
              <span class="pipeline-column-count" id="count-new">0</span>
            </div>
            <div class="leads-list" id="pipeline-new-list"></div>
          </div>

          <div class="pipeline-column" data-status="contacted" ${filterStatus !== 'all' && filterStatus !== 'contacted' ? 'style="display:none;"' : ''}>
            <div class="pipeline-column-header">
              <span class="pipeline-column-title">Contacted</span>
              <span class="pipeline-column-count" id="count-contacted">0</span>
            </div>
            <div class="leads-list" id="pipeline-contacted-list"></div>
          </div>

          <div class="pipeline-column" data-status="qualified" ${filterStatus !== 'all' && filterStatus !== 'qualified' ? 'style="display:none;"' : ''}>
            <div class="pipeline-column-header">
              <span class="pipeline-column-title">Qualified</span>
              <span class="pipeline-column-count" id="count-qualified">0</span>
            </div>
            <div class="leads-list" id="pipeline-qualified-list"></div>
          </div>

          <div class="pipeline-column" data-status="disqualified" ${filterStatus !== 'all' && filterStatus !== 'disqualified' ? 'style="display:none;"' : ''}>
            <div class="pipeline-column-header">
              <span class="pipeline-column-title">Archived</span>
              <span class="pipeline-column-count" id="count-disqualified">0</span>
            </div>
            <div class="leads-list" id="pipeline-disqualified-list"></div>
          </div>

        </div>
      </div>

      <!-- Right Side details Drawer -->
      <aside class="crm-details-panel" id="pipeline-details-container"></aside>

    </section>
  `;

  // Bind filter buttons
  container.querySelectorAll("#filter-location-group button").forEach(btn => {
    btn.addEventListener("click", () => {
      filterLocation = btn.getAttribute("data-loc");
      renderPipelineTab();
    });
  });

  container.querySelectorAll("#filter-source-group button").forEach(btn => {
    btn.addEventListener("click", () => {
      filterSource = btn.getAttribute("data-source");
      renderPipelineTab();
    });
  });

  const clearStatusBtn = container.querySelector("#clear-status-filter-btn");
  if (clearStatusBtn) {
    clearStatusBtn.addEventListener("click", () => {
      filterStatus = 'all';
      renderPipelineTab();
    });
  }

  // Populate Kanban Lists
  const newCol = container.querySelector("#pipeline-new-list");
  const contactedCol = container.querySelector("#pipeline-contacted-list");
  const qualifiedCol = container.querySelector("#pipeline-qualified-list");
  const disqualifiedCol = container.querySelector("#pipeline-disqualified-list");

  const filtered = leads.filter(l => {
    const matchLoc = filterLocation === "all" || l.location === filterLocation;
    const matchSrc = filterSource === "all" || l.source === filterSource;
    return matchLoc && matchSrc;
  });

  filtered.forEach(lead => {
    const card = document.createElement("div");
    let borderClass = 'border-left-yellow';
    if (lead.source === 'website') borderClass = 'border-left-cyan';
    else if (lead.source === 'referral') borderClass = 'border-left-orange';
    else if (lead.source === 'manual') borderClass = 'border-left-purple';
    
    card.className = `lead-card status-${lead.status} ${borderClass} ${lead.id === selectedLeadId ? 'active' : ''}`;
    card.setAttribute("draggable", "true");
    card.innerHTML = `
      <div class="lead-card-header">
        <span class="lead-name">${lead.firstName} ${lead.lastName}</span>
        <span class="lead-value">${(lead.dealValue || 0).toLocaleString()} SEK</span>
      </div>
      <div class="lead-company">${lead.company || "Individual Creative"}</div>
      <div class="lead-meta">
        <span class="lead-source">${lead.source === 'manual' ? 'Manual Entry' : lead.source}</span>
        <span class="lead-location">${lead.location}</span>
      </div>
    `;

    card.addEventListener("dragstart", (e) => {
      card.classList.add("dragging");
      e.dataTransfer.setData("text/plain", lead.id);
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    });

    card.addEventListener("click", () => {
      selectedLeadId = lead.id;
      renderPipelineTab();
    });

    if (lead.status === "new" && newCol) newCol.appendChild(card);
    if (lead.status === "contacted" && contactedCol) contactedCol.appendChild(card);
    if (lead.status === "qualified" && qualifiedCol) qualifiedCol.appendChild(card);
    if (lead.status === "disqualified" && disqualifiedCol) disqualifiedCol.appendChild(card);
  });

  // Update counts
  if (newCol) container.querySelector("#count-new").textContent = newCol.children.length;
  if (contactedCol) container.querySelector("#count-contacted").textContent = contactedCol.children.length;
  if (qualifiedCol) container.querySelector("#count-qualified").textContent = qualifiedCol.children.length;
  if (disqualifiedCol) container.querySelector("#count-disqualified").textContent = disqualifiedCol.children.length;

  // Re-bind Drag & Drop Pipeline Column Listeners
  container.querySelectorAll(".pipeline-column").forEach(column => {
    column.addEventListener("dragover", (e) => {
      e.preventDefault();
      column.classList.add("drag-over");
    });
    column.addEventListener("dragleave", () => {
      column.classList.remove("drag-over");
    });
    column.addEventListener("dragenter", (e) => {
      e.preventDefault();
    });
    column.addEventListener("drop", (e) => {
      e.preventDefault();
      column.classList.remove("drag-over");
      const leadId = e.dataTransfer.getData("text/plain");
      const lead = leads.find(l => l.id === leadId);
      if (lead) {
        const newStatus = column.getAttribute("data-status");
        if (lead.status !== newStatus) {
          lead.status = newStatus;
          saveLocalState();
          showNotification(`Lead ${lead.firstName} ${lead.lastName} moved to ${newStatus.toUpperCase()}`);
          refreshData();
        }
      }
    });
  });

  renderLeadDetailsDrawer();
}

function renderLeadDetailsDrawer() {
  const drawer = document.getElementById("pipeline-details-container");
  if (!drawer) return;

  const lead = leads.find(l => l.id === selectedLeadId);
  if (!lead) {
    drawer.innerHTML = `<div style="text-align:center; padding:40px; color:var(--eqx-text-muted);">Select a lead to explore interactions.</div>`;
    return;
  }

  const initials = `${lead.firstName.charAt(0)}${lead.lastName.charAt(0)}`;
  const leadTasks = tasks.filter(t => t.leadId === lead.id);
  const defaultProjTitle = lead.company ? `${lead.company} Project` : `${lead.firstName} ${lead.lastName} Project`;

  drawer.innerHTML = `
    <div class="details-header">
      <div class="details-avatar">${initials}</div>
      <div class="details-title">
        <h3>${lead.firstName} ${lead.lastName}</h3>
        <p>${lead.company}</p>
      </div>
    </div>

    <div>
      <h4 class="details-section-title">Lead Information</h4>
      <div class="info-item"><span class="info-label">Email</span><span class="info-value">${lead.email}</span></div>
      <div class="info-item"><span class="info-label">Phone</span><span class="info-value">${lead.phone}</span></div>
      <div class="info-item"><span class="info-label">Location</span><span class="info-value">${lead.location}</span></div>
      <div class="info-item"><span class="info-label">Deal Value</span><span class="info-value" style="color:var(--eqx-accent); font-weight:600;">${(lead.dealValue || 0).toLocaleString()} SEK</span></div>
      
      <div class="info-item" style="flex-direction:column; align-items:stretch; gap:6px; border:none; margin-top:10px;">
        <span class="info-label">Lead Stage</span>
        <select class="status-select" id="lead-status-selector" style="background:var(--eqx-dark-card);">
          <option value="new" ${lead.status === "new" ? "selected" : ""}>New Lead</option>
          <option value="contacted" ${lead.status === "contacted" ? "selected" : ""}>Contacted</option>
          <option value="qualified" ${lead.status === "qualified" ? "selected" : ""}>Qualified</option>
          <option value="disqualified" ${lead.status === "disqualified" ? "selected" : ""}>Archived</option>
        </select>
      </div>

      <div class="info-item" style="flex-direction:column; align-items:stretch; gap:6px; border:none; margin-top:10px; padding-top:10px; border-top:1px dashed rgba(255,255,255,0.05);">
        <span class="info-label" style="font-family:var(--font-head); text-transform:uppercase; font-size:0.85rem; letter-spacing:0.04em; color:var(--eqx-accent);">Project Activation</span>
        
        <div style="display:flex; flex-direction:column; gap:10px; background:rgba(0,0,0,0.15); padding:12px; border-radius:8px;">
          <div class="form-group" style="margin:0;">
            <label style="font-size:0.75rem; color:var(--eqx-text-muted); margin-bottom:4px; display:block;">Project Name</label>
            <input type="text" id="lead-project-title" class="form-input" value="${defaultProjTitle}" placeholder="e.g. Langaz - New Song" style="padding:4px 8px; font-size:0.75rem; height:28px; background:var(--eqx-dark-card); margin-bottom:8px;" required />
          </div>

          <div class="form-group" style="margin:0;">
            <label style="font-size:0.75rem; color:var(--eqx-text-muted); margin-bottom:4px; display:block;">Project Focus</label>
            <select class="status-select" id="lead-project-category" style="background:var(--eqx-dark-card); width:100%; margin-bottom:8px;">
              <option value="web-app">Web & App Platform</option>
              <option value="audio-media">Audio & Podcast Production</option>
              <option value="digital-design">Creative Brand & Design</option>
              <option value="general-ops">General Project Operations</option>
            </select>
          </div>

          <label style="display:flex; align-items:center; gap:8px; font-size:0.8rem; color:var(--eqx-text-light); cursor:pointer; font-weight:normal; margin: 4px 0;">
            <input type="checkbox" id="lead-booking-toggle" style="width:16px; height:16px;"> Schedule initial kickoff session in the studio
          </label>

          <!-- Progressive Reveal Booking Details -->
          <div id="lead-booking-details-container" style="display:none; flex-direction:column; gap:8px; border-top:1px dashed rgba(255,255,255,0.05); padding-top:8px; margin-top:4px;">
            <div class="form-group" style="margin:0;">
              <label style="font-size:0.75rem;">Workspace Rooms</label>
              <div style="display:flex; flex-direction:column; gap:6px; margin-top:4px;" id="lead-booking-rooms">
                <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:normal; color:var(--eqx-text-light);"><input type="checkbox" name="lead-booking-room" value="Control Room"> Control Room</label>
                <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:normal; color:var(--eqx-text-light);"><input type="checkbox" name="lead-booking-room" value="Recording Stage"> Recording Stage</label>
                <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:normal; color:var(--eqx-text-light);"><input type="checkbox" name="lead-booking-room" value="Creative Lounge"> Creative Lounge</label>
                <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:normal; color:var(--eqx-text-light);"><input type="checkbox" name="lead-booking-room" value="Studio B & VIP Lounge"> Studio B & VIP Lounge</label>
                <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:normal; color:var(--eqx-text-light);"><input type="checkbox" name="lead-booking-room" value="Field Operations"> Field Operations</label>
              </div>
            </div>
            <div style="display:flex; gap:8px;">
              <div style="flex:1;">
                <label style="font-size:0.75rem; display:block; margin-bottom:2px;">Date (June)</label>
                <input type="number" id="lead-booking-date" class="form-input" min="1" max="30" value="15" style="padding:4px 8px; font-size:0.75rem; height:28px; background:var(--eqx-dark-card);">
              </div>
              <div style="flex:1;">
                <label style="font-size:0.75rem; display:block; margin-bottom:2px;">Duration (Hrs)</label>
                <input type="number" id="lead-booking-duration" class="form-input" min="1" max="12" value="2" style="padding:4px 8px; font-size:0.75rem; height:28px; background:var(--eqx-dark-card);">
              </div>
            </div>
            <div class="form-group" style="margin:0;">
              <label style="font-size:0.75rem; display:block; margin-bottom:2px;">Session Type</label>
              <select class="status-select" id="lead-booking-type" style="background:var(--eqx-dark-card); font-size:0.75rem; width:100%; height:28px; padding:0 6px; margin:0;">
                <option value="Dev Sprint">Technology Dev Sprint</option>
                <option value="Creative Session">Creative / Sound Session</option>
                <option value="Meeting">Client Review / Meeting</option>
              </select>
            </div>
          </div>

          <button class="btn-primary" id="activate-project-btn" style="width:100%; margin-top:6px; height:34px; font-size:0.85rem; background:var(--eqx-accent); border-radius:8px; cursor:pointer;">Activate Project</button>
        </div>
      </div>
    </div>

    <div>
      <h4 class="details-section-title">Timeline Tasks</h4>
      <div class="history-timeline" style="margin-bottom:12px;">
        ${leadTasks.map(t => `
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; background:rgba(255,255,255,0.02); border:1px solid var(--eqx-border-dark); padding:8px; border-radius:8px; margin-bottom:6px;">
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

  // Bind events
  const statusSel = drawer.querySelector("#lead-status-selector");
  if (statusSel) {
    statusSel.addEventListener("change", (e) => {
      lead.status = e.target.value;
      saveLocalState();
      if (isFirebaseConnected) {
        saveToFirestore('leads', lead.id, lead);
      }
      showNotification(`Lead stage updated to ${e.target.value.toUpperCase()}`);
      refreshData();
    });
  }

  // Handle Progressive Reveal
  const bookingToggle = drawer.querySelector("#lead-booking-toggle");
  const bookingDetails = drawer.querySelector("#lead-booking-details-container");
  if (bookingToggle && bookingDetails) {
    bookingToggle.addEventListener("change", (e) => {
      bookingDetails.style.display = e.target.checked ? "flex" : "none";
    });
  }

  // Handle Project Activation
  const activateBtn = drawer.querySelector("#activate-project-btn");
  if (activateBtn) {
    activateBtn.addEventListener("click", () => {
      const category = drawer.querySelector("#lead-project-category").value;
      const titleInput = drawer.querySelector("#lead-project-title");
      const title = titleInput ? titleInput.value.trim() : (lead.company ? `${lead.company} Project` : `${lead.firstName} ${lead.lastName} Project`);
      if (!title) {
        showNotification("Error: Project Name is required.", "error");
        return;
      }
      const client = lead.company || `${lead.firstName} ${lead.lastName}`;
      const notes = `Project activated directly from Lead details. Original Lead Value: ${(lead.dealValue || 0).toLocaleString()} SEK.`;

      // 1. Create Project
      const success = window.createNewProject(title, client, category, notes);
      if (success) {
        // 2. Schedule Kickoff if checked
        if (bookingToggle && bookingToggle.checked) {
          const checkedBoxes = drawer.querySelectorAll("input[name='lead-booking-room']:checked");
          const selectedRooms = Array.from(checkedBoxes).map(cb => cb.value);
          if (selectedRooms.length === 0) {
            showNotification("Error: Please select at least one room for the kickoff session.", "error");
            return;
          }
          const room = selectedRooms.join(", ");
          const date = parseInt(drawer.querySelector("#lead-booking-date").value) || 15;
          const duration = parseInt(drawer.querySelector("#lead-booking-duration").value) || 2;
          const type = drawer.querySelector("#lead-booking-type").value;
          const leadName = `${lead.firstName} ${lead.lastName}`;
          const kickoffNotes = `Kickoff session booked automatically upon project activation.`;

          createBookingRecord(lead.id, leadName, room, type, date, duration, kickoffNotes);
        }

        // 3. Mark Lead Qualified
        lead.status = "qualified";
        if (statusSel) statusSel.value = "qualified";

        saveLocalState();
        if (isFirebaseConnected) {
          saveToFirestore('leads', lead.id, lead);
        }
        
        showNotification(`Project '${title}' activated! Switching to Projects tab...`);

        // Auto navigate to projects tab
        setTimeout(() => {
          const projTabBtn = document.getElementById("sidebar-tab-projects");
          if (projTabBtn) {
            projTabBtn.click();
          }
        }, 1200);
      }
    });
  }

  drawer.querySelectorAll(".task-checkbox").forEach(box => {
    box.addEventListener("change", (e) => {
      const tid = box.getAttribute("data-task-id");
      const task = tasks.find(t => t.id === tid);
      if (task) {
        task.status = e.target.checked ? "completed" : "pending";
        saveLocalState();
        if (isFirebaseConnected) {
          saveToFirestore('tasks', task.id, task);
        }
        showNotification(e.target.checked ? "Task completed" : "Task marked pending");
        refreshData();
      }
    });
  });

  drawer.querySelector("#add-log-btn")?.addEventListener("click", () => {
    const text = prompt("Enter interaction log note:");
    if (text) {
      lead.interactionHistory.push({
        timestamp: new Date().toISOString(),
        type: "note",
        notes: text
      });
      saveLocalState();
      if (isFirebaseConnected) {
        saveToFirestore('leads', lead.id, lead);
      }
      showNotification("Conversation note logged successfully");
      refreshData();
    }
  });

  drawer.querySelector("#add-task-btn")?.addEventListener("click", () => {
    const title = prompt("Enter To-Do summary:");
    const due = prompt("Enter due date (e.g. June 22):", "June 22");
    if (title) {
      const newTask = {
        id: `task_${Date.now()}`,
        title,
        dueDate: due || "Today",
        assignedTo: "CPz",
        status: "pending",
        leadId: lead.id
      };
      if (isFirebaseConnected) {
        saveToFirestore('tasks', newTask.id, newTask);
        showNotification("To-Do scheduled to Cloud");
      } else {
        tasks.push(newTask);
        saveLocalState();
        showNotification("To-Do scheduled");
        refreshData();
      }
    }
  });
}

// -------------------------------------------------------------
// TAB 3: CONTACTS DIRECTORY
// -------------------------------------------------------------
function renderContactsTab() {
  const container = document.getElementById("crm-tab-contacts");
  if (!container) return;

  container.innerHTML = `
    <div class="contacts-layout">
      
      <!-- Left side directory directory list -->
      <div>
        <div class="bookings-panel-header" style="margin-bottom:16px;">
          <h2 class="grid-title" style="margin:0; font-family:var(--font-head); font-weight:300; text-transform:uppercase; font-size:1.5rem; letter-spacing:0.05em; color:var(--eqx-accent);">Leads Registry</h2>
        </div>
        <div class="contacts-header-actions">
          <div class="search-input-wrapper">
            <svg class="search-icon" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" id="contact-search-box" class="form-input contacts-search" placeholder="Search leads by name..." />
          </div>
          <button class="btn-primary sm" id="add-contact-btn">+ Add Lead</button>
        </div>

        <div class="contacts-grid" id="contacts-list-container">
          <!-- Live contact cards render here -->
        </div>
      </div>

      <!-- Right side detailed contact file -->
      <aside class="crm-details-panel" id="contact-details-container"></aside>

    </div>
  `;

  // Bind Search input
  const searchBox = container.querySelector("#contact-search-box");
  searchBox.addEventListener("input", (e) => {
    renderContactsList(e.target.value);
  });

  // Bind Add Contact Action
  container.querySelector("#add-contact-btn").addEventListener("click", () => {
    const name = prompt("Enter Lead Name:");
    const email = prompt("Enter Email Address:");
    const phone = prompt("Enter Phone Number:");
    const address = prompt("Enter Address:");
    const preferences = prompt("Enter client preferences (analog/digital setups):");

    if (name && email) {
      const newContact = {
        id: `contact_${Date.now()}`,
        name,
        email,
        phone: phone || "No phone",
        address: address || "No address",
        preferences: preferences || "None provided",
        interest: "Studio client"
      };
      contacts.push(newContact);
      saveLocalState();
      showNotification("New contact profile created successfully");
      renderContactsTab();
    }
  });

  renderContactsList();
}

function renderContactsList(query = "") {
  const listContainer = document.getElementById("contacts-list-container");
  if (!listContainer) return;

  const filtered = contacts.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
  
  if (filtered.length === 0) {
    listContainer.innerHTML = `<div style="text-align:center; padding:40px; color:var(--eqx-text-muted);">No contacts found matching search criteria.</div>`;
    return;
  }

  listContainer.innerHTML = filtered.map(c => {
    const borderColors = ['border-left-cyan', 'border-left-orange', 'border-left-purple', 'border-left-yellow', 'border-left-teal'];
    const hash = c.name.charCodeAt(0) % borderColors.length;
    const borderClass = borderColors[hash];
    
    const avatarGradients = [
      'linear-gradient(135deg, #E57962 0%, #DF6044 100%)',
      'linear-gradient(135deg, #00F5D4 0%, #00B4D8 100%)',
      'linear-gradient(135deg, #9D4EDD 0%, #7B2CBF 100%)',
      'linear-gradient(135deg, #FFB703 0%, #FB8500 100%)',
      'linear-gradient(135deg, #E20072 0%, #DF6044 100%)'
    ];
    const gradient = avatarGradients[hash];
    
    return `
      <div class="contact-card ${borderClass} ${c.id === selectedContactId ? 'active' : ''}" data-id="${c.id}">
        <div class="contact-card-top">
          <div style="display:flex; gap:16px; align-items:center;">
            <div class="contact-avatar" style="background:${gradient}; color:var(--eqx-text-light); font-weight:700;">${c.name.charAt(0)}</div>
          <div class="contact-basic-info">
            <h4>${c.name}</h4>
            <p>${c.email}</p>
          </div>
        </div>
        <span style="font-size:0.7rem; color:var(--eqx-accent); text-transform:uppercase; font-weight:600;">${c.interest}</span>
      </div>
      
      <div class="contact-details-grid">
        <div class="contact-detail-item"><span class="contact-detail-label">Phone</span><span class="contact-detail-val">${c.phone}</span></div>
        <div class="contact-detail-item"><span class="contact-detail-label">Location</span><span class="contact-detail-val">${c.address}</span></div>
      </div>
    </div>
    `;
  }).join("");

  listContainer.querySelectorAll(".contact-card").forEach(card => {
    card.addEventListener("click", () => {
      selectedContactId = card.getAttribute("data-id");
      document.querySelectorAll(".contact-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      renderContactDetailsPane();
    });
  });

  renderContactDetailsPane();
}

function renderContactDetailsPane() {
  const pane = document.getElementById("contact-details-container");
  if (!pane) return;

  const contact = contacts.find(c => c.id === selectedContactId);
  if (!contact) {
    pane.innerHTML = `<div style="text-align:center; padding:40px; color:var(--eqx-text-muted);">Select a contact profile to explore details.</div>`;
    return;
  }

  const linkedProjects = projects.filter(p => p.contactId === contact.id);
  const linkedBookings = bookings.filter(b => b.leadName === contact.name);

  pane.innerHTML = `
    <div class="details-header">
      <div class="details-avatar">${contact.name.charAt(0)}</div>
      <div class="details-title">
        <h3>${contact.name}</h3>
        <p>${contact.email}</p>
      </div>
    </div>

    <div>
      <h4 class="details-section-title">Contact Preferences</h4>
      <p style="font-size:0.8rem; line-height:1.5; color:var(--eqx-text-light); background:rgba(255,255,255,0.01); border:1px solid var(--eqx-border-dark); padding:12px; border-radius:8px; margin:0;">
        ${contact.preferences}
      </p>
    </div>

    <div>
      <h4 class="details-section-title">Linked Active Projects</h4>
      ${linkedProjects.map(p => `
        <div style="font-size:0.8rem; background:rgba(255,255,255,0.01); border:1px solid var(--eqx-border-dark); padding:10px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="color:var(--eqx-text-light); font-weight:500;">${p.title}</span>
          <span style="font-size:0.7rem; color:var(--eqx-accent); text-transform:uppercase;">${p.stage}</span>
        </div>
      `).join('') || `<p style="font-size:0.75rem; color:var(--eqx-text-muted);">No linked projects tracked.</p>`}
    </div>

    <div>
      <h4 class="details-section-title">Upcoming Scheduled Sessions</h4>
      ${linkedBookings.map(b => `
        <div style="font-size:0.8rem; background:rgba(255,255,255,0.01); border:1px solid var(--eqx-border-dark); padding:10px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <div>
            <span style="color:var(--eqx-text-light); display:block; font-weight:500;">${b.type} (${b.room})</span>
            <span style="font-size:0.7rem; color:var(--eqx-text-muted);">${b.notes || 'No description'}</span>
          </div>
          <span style="font-size:0.75rem; color:var(--eqx-accent); font-weight:600; text-align:right;">June ${b.date}</span>
        </div>
      `).join('') || `<p style="font-size:0.75rem; color:var(--eqx-text-muted);">No upcoming bookings scheduled.</p>`}
    </div>
  `;
}

// -------------------------------------------------------------
// TAB 4: CALENDAR SCHEDULER & MULTI-ROOM
// -------------------------------------------------------------
function renderCalendarTab() {
  const container = document.getElementById("crm-tab-calendar");
  if (!container) return;

  container.innerHTML = `
    <div class="bookings-layout">
      
      <!-- Left side Room scheduling visual columns -->
      <div>
        <div class="bookings-panel-header">
          <h2 class="grid-title" style="margin:0; font-family:var(--font-head); font-weight:300; text-transform:uppercase; font-size:1.5rem; letter-spacing:0.05em; color:var(--eqx-accent);">Workspaces & Sprints</h2>
        </div>
        
        <div class="room-columns-layout">
          <!-- Room Studio A -->
          <div class="room-col">
            <div class="room-col-header">
              <span class="room-badge studio-a">Control Room (Sound & Coding)</span>
            </div>
            <div class="room-bookings-list" id="room-bookings-studio-a"></div>
          </div>

          <!-- Room Studio C -->
          <div class="room-col">
            <div class="room-col-header">
              <span class="room-badge studio-c">Creative Lounge (Co-Working)</span>
            </div>
            <div class="room-bookings-list" id="room-bookings-studio-c"></div>
          </div>

          <!-- Room Studio B -->
          <div class="room-col">
            <div class="room-col-header">
              <span class="room-badge studio-b">Recording Stage (Audio & Vocals)</span>
            </div>
            <div class="room-bookings-list" id="room-bookings-studio-b"></div>
          </div>

          <!-- Room Studio E -->
          <div class="room-col">
            <div class="room-col-header">
              <span class="room-badge studio-e">Studio B & VIP Lounge</span>
            </div>
            <div class="room-bookings-list" id="room-bookings-studio-e"></div>
          </div>

          <!-- Room Studio D -->
          <div class="room-col">
            <div class="room-col-header">
              <span class="room-badge studio-d">Field Operations (Outdoor)</span>
            </div>
            <div class="room-bookings-list" id="room-bookings-studio-d"></div>
          </div>
        </div>
      </div>

      <!-- Right side scheduling form -->
      <div style="display:flex; flex-direction:column; gap:24px;">
        
        <div class="calendar-widget">
          <div class="calendar-header">
            <span class="calendar-month-title">June 2026</span>
          </div>
          <div class="calendar-grid" id="calendar-widget-grid-suite">
            <!-- Render calendar calendar cells -->
          </div>
        </div>

        <div class="calendar-widget">
          <h3 style="font-family:var(--font-head); font-size:1.15rem; font-weight:400; color:var(--eqx-text-light); margin:0 0 10px 0;">Schedule Workspace Block</h3>
          
          <form id="create-booking-form" onsubmit="event.preventDefault(); window.submitBookingForm();" style="display:flex; flex-direction:column; gap:16px;">
            <div class="form-group">
              <label for="booking-lead-id">Select Client</label>
              <select id="booking-lead-id" class="form-input" style="background:var(--eqx-dark-card);" required></select>
            </div>
            <div class="form-group">
              <label style="margin-bottom:8px; display:block;">Select Workspace Rooms</label>
              <div id="booking-rooms-container" style="display:flex; flex-direction:column; gap:10px; padding:10px; background:rgba(0,0,0,0.2); border-radius:8px;">
                <label style="display:flex; align-items:center; gap:8px; font-size:0.8rem; color:var(--eqx-text-light); cursor:pointer; font-weight:normal;">
                  <input type="checkbox" name="booking-room-checkbox" value="Control Room" class="room-checkbox-input"> Control Room (Sound & Coding)
                </label>
                <label style="display:flex; align-items:center; gap:8px; font-size:0.8rem; color:var(--eqx-text-light); cursor:pointer; font-weight:normal;">
                  <input type="checkbox" name="booking-room-checkbox" value="Recording Stage" class="room-checkbox-input"> Recording Stage (Audio & Vocals)
                </label>
                <label style="display:flex; align-items:center; gap:8px; font-size:0.8rem; color:var(--eqx-text-light); cursor:pointer; font-weight:normal;">
                  <input type="checkbox" name="booking-room-checkbox" value="Creative Lounge" class="room-checkbox-input"> Creative Lounge (Co-Working)
                </label>
                <label style="display:flex; align-items:center; gap:8px; font-size:0.8rem; color:var(--eqx-text-light); cursor:pointer; font-weight:normal;">
                  <input type="checkbox" name="booking-room-checkbox" value="Studio B & VIP Lounge" class="room-checkbox-input"> Studio B & VIP Lounge (Office / Extra)
                </label>
                <label style="display:flex; align-items:center; gap:8px; font-size:0.8rem; color:var(--eqx-text-light); cursor:pointer; font-weight:normal;">
                  <input type="checkbox" name="booking-room-checkbox" value="Field Operations" class="room-checkbox-input"> Field Operations (Outdoor)
                </label>
              </div>
              <div id="booking-conflict-warning" style="color:#ff5733; font-size:0.75rem; font-weight:500; display:none; margin-top:8px; padding:8px; border: 1px solid rgba(255, 87, 51, 0.2); background: rgba(255, 87, 51, 0.05); border-radius: 6px; line-height:1.3;"></div>
            </div>
            <div class="form-group">
              <label for="booking-type">Booking Block Type</label>
              <select id="booking-type" class="form-input" style="background:var(--eqx-dark-card);" required>
                <option value="Dev Sprint">Technology Dev Sprint</option>
                <option value="Creative Session">Creative / Sound Session</option>
                <option value="Meeting">Client Review / Meeting</option>
                <option value="Work Block">General Operations Block</option>
              </select>
            </div>
            <div style="display:flex; gap:16px;">
              <div class="form-group" style="flex:1;">
                <label for="booking-date">Date (June)</label>
                <input type="number" id="booking-date" class="form-input" min="1" max="30" value="15" required />
              </div>
              <div class="form-group" style="flex:1;">
                <label for="booking-duration">Duration (Hours)</label>
                <input type="number" id="booking-duration" class="form-input" min="1" max="12" value="2" required />
              </div>
            </div>
            <div class="form-group">
              <label for="booking-notes">Notes / Tech & Setup Specs</label>
              <input type="text" id="booking-notes" class="form-input" placeholder="e.g. Next.js integration, live room mics, etc." />
            </div>
            <button type="submit" class="btn-primary" style="width:100%;">Schedule Block</button>
          </form>
        </div>

      </div>

    </div>
  `;

  // Render Calendar Grid Picker
  renderSchedulerGridWidget();

  // Populate Select client dropdown
  const leadSelect = container.querySelector("#booking-lead-id");
  if (leadSelect) {
    leadSelect.innerHTML = leads.map(l => `
      <option value="${l.id}">${l.firstName} ${l.lastName} (${l.company})</option>
    `).join("");
  }

  // Populate Room Columns
  const listA = container.querySelector("#room-bookings-studio-a");
  const listB = container.querySelector("#room-bookings-studio-b");
  const listC = container.querySelector("#room-bookings-studio-c");
  const listD = container.querySelector("#room-bookings-studio-d");
  const listE = container.querySelector("#room-bookings-studio-e");

  // Clear previous column contents before appending
  if (listA) listA.innerHTML = "";
  if (listB) listB.innerHTML = "";
  if (listC) listC.innerHTML = "";
  if (listD) listD.innerHTML = "";
  if (listE) listE.innerHTML = "";

  bookings.forEach(b => {
    let borderClass = 'border-left-purple';
    if (b.type === 'Dev Sprint' || b.type.includes('Dev')) borderClass = 'border-left-cyan';
    else if (b.type === 'Creative Session' || b.type.includes('Creative')) borderClass = 'border-left-orange';
    else if (b.type === 'Meeting') borderClass = 'border-left-yellow';

    const card = `
      <div class="room-booking-card ${borderClass}">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <span style="font-weight:600; color:var(--eqx-text-light); font-size:0.9rem;">${b.leadName}</span>
            <span style="display:block; font-size:0.75rem; color:var(--eqx-text-muted); margin-top:2px;">${b.notes || 'No notes logged'}</span>
          </div>
          <div style="display:flex; gap:6px;">
            <button class="action-delete-btn" onclick="window.triggerEmailPreview('${b.id}')" aria-label="Email Preview" style="color:var(--eqx-primary); border-color:rgba(255,87,51,0.2);">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
            <button class="action-delete-btn" onclick="window.deleteBooking('${b.id}')" aria-label="Cancel Booking">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <div style="border-top: 1px solid rgba(255,255,255,0.03); padding-top:10px; display:flex; justify-content:space-between; align-items:center; font-size:0.75rem;">
          <span style="color:var(--eqx-accent); font-weight:500;">June ${b.date}</span>
          <span style="color:var(--eqx-text-muted);">${b.duration} hours</span>
        </div>
      </div>
    `;

    if ((b.room === "Control Room" || b.room === "Workspace Alpha" || b.room === "Studio A") && listA) listA.innerHTML += card;
    if ((b.room === "Recording Stage" || b.room === "Workspace Beta" || b.room === "Studio B") && listB) listB.innerHTML += card;
    if ((b.room === "Creative Lounge" || b.room === "Workspace Gamma" || b.room === "Studio C") && listC) listC.innerHTML += card;
    if ((b.room === "Field Operations" || b.room === "Studio D") && listD) listD.innerHTML += card;
    if ((b.room === "Studio B & VIP Lounge" || b.room.includes("VIP Lounge") || b.room === "Studio E") && listE) listE.innerHTML += card;
  });

  // Empty columns fallbacks
  if (listA && listA.children.length === 0) listA.innerHTML = `<span style="font-size:0.75rem; color:var(--eqx-text-muted); text-align:center; padding:20px;">No blocks scheduled today.</span>`;
  if (listB && listB.children.length === 0) listB.innerHTML = `<span style="font-size:0.75rem; color:var(--eqx-text-muted); text-align:center; padding:20px;">No blocks scheduled today.</span>`;
  if (listC && listC.children.length === 0) listC.innerHTML = `<span style="font-size:0.75rem; color:var(--eqx-text-muted); text-align:center; padding:20px;">No blocks scheduled today.</span>`;
  if (listD && listD.children.length === 0) listD.innerHTML = `<span style="font-size:0.75rem; color:var(--eqx-text-muted); text-align:center; padding:20px;">No blocks scheduled today.</span>`;
  if (listE && listE.children.length === 0) listE.innerHTML = `<span style="font-size:0.75rem; color:var(--eqx-text-muted); text-align:center; padding:20px;">No blocks scheduled today.</span>`;

  // Set up event listeners for smart dependency rules and conflict check
  const roomsContainer = container.querySelector("#booking-rooms-container");
  const dateInput = container.querySelector("#booking-date");
  const conflictWarning = container.querySelector("#booking-conflict-warning");

  const checkConflictsAndDependencies = (e) => {
    // 1. Smart Dependency: Recording Stage requires Control Room
    if (e && e.target && e.target.value === "Recording Stage" && e.target.checked) {
      const controlRoomCheckbox = roomsContainer.querySelector('input[value="Control Room"]');
      if (controlRoomCheckbox && !controlRoomCheckbox.checked) {
        controlRoomCheckbox.checked = true;
        showNotification("Control Room auto-selected for Recording Stage session");
      }
    }

    // 2. Conflict Warning Check
    const checkedBoxes = Array.from(roomsContainer.querySelectorAll("input[name='booking-room-checkbox']:checked"));
    const selectedRooms = checkedBoxes.map(cb => cb.value);
    const enteredDate = parseInt(dateInput.value);

    if (selectedRooms.length > 0 && enteredDate) {
      const conflictingBookings = bookings.filter(b => {
        if (Number(b.date) !== enteredDate) return false;
        // Check if there is any overlap in rooms
        return selectedRooms.some(r => b.room && b.room.includes(r));
      });

      if (conflictingBookings.length > 0) {
        const conflictDetails = conflictingBookings.map(b => `${b.leadName} in ${b.room}`).join(", ");
        conflictWarning.style.display = "block";
        conflictWarning.innerHTML = `⚠️ Conflict: Another booking is scheduled on June ${enteredDate} (${conflictDetails})`;
      } else {
        conflictWarning.style.display = "none";
      }
    } else {
      conflictWarning.style.display = "none";
    }
  };

  if (roomsContainer && dateInput) {
    roomsContainer.addEventListener("change", checkConflictsAndDependencies);
    dateInput.addEventListener("input", checkConflictsAndDependencies);
  }
}

function renderSchedulerGridWidget() {
  const grid = document.getElementById("calendar-widget-grid-suite");
  if (!grid) return;

  grid.innerHTML = `
    <div class="calendar-day-header">Mo</div><div class="calendar-day-header">Tu</div><div class="calendar-day-header">We</div>
    <div class="calendar-day-header">Th</div><div class="calendar-day-header">Fr</div><div class="calendar-day-header">Sa</div>
    <div class="calendar-day-header">Su</div>
  `;

  for (let day = 1; day <= 30; day++) {
    const cell = document.createElement("div");
    const hasBooking = bookings.some(b => Number(b.date) === day);
    
    cell.className = `calendar-cell active-month ${hasBooking ? 'has-booking' : ''}`;
    cell.textContent = day;
    
    cell.addEventListener("click", () => {
      document.querySelectorAll(".calendar-cell").forEach(c => c.classList.remove("selected"));
      cell.classList.add("selected");
      const dateInput = document.getElementById("booking-date");
      if (dateInput) dateInput.value = day;
    });
    
    grid.appendChild(cell);
  }
}

// -------------------------------------------------------------
// TAB 5: PROJECTS MANAGEMENT
// -------------------------------------------------------------
function renderProjectsTab() {
  const container = document.getElementById("crm-tab-projects");
  if (!container) return;

  container.innerHTML = `
    <div class="projects-layout">
      
      <!-- Left projects list columns -->
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div class="bookings-panel-header">
          <h2 class="grid-title" style="margin:0; font-family:var(--font-head); font-weight:300; text-transform:uppercase; font-size:1.5rem; letter-spacing:0.05em; color:var(--eqx-accent);">Open Projects</h2>
          <button class="btn-primary sm" id="create-project-btn">+ New Project</button>
        </div>

        <div style="display:flex; flex-direction:column; gap:16px;" id="projects-list-container">
          <!-- Render project cards -->
        </div>
      </div>

      <!-- Right Project details & checklists -->
      <aside class="crm-details-panel" id="project-details-container"></aside>

    </div>
  `;

  // Bind create project
  container.querySelector("#create-project-btn").addEventListener("click", () => {
    if (typeof window.openProjectModal === "function") {
      window.openProjectModal();
    }
  });

  renderProjectsList();
}

function renderProjectsList() {
  const container = document.getElementById("projects-list-container");
  if (!container) return;

  if (projects.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:var(--eqx-text-muted); padding:40px;">No open projects at the moment.</p>`;
    return;
  }

  container.innerHTML = projects.map(p => {
    // Stage logic mappings
    const cat = p.category || "web-app";
    const catData = projectCategories[cat] || projectCategories["general-ops"];
    const stages = catData.stages;
    const activeIndex = stages.includes(p.stage) ? stages.indexOf(p.stage) : 0;
    const divisor = stages.length > 1 ? stages.length - 1 : 1;
    const activeLineStyle = `width: calc((100% - 32px) * ${activeIndex / divisor});`;

    let prjBorder = 'border-left-yellow';
    if (cat === 'web-app') prjBorder = 'border-left-cyan';
    else if (cat === 'audio-media') prjBorder = 'border-left-orange';
    else if (cat === 'digital-design') prjBorder = 'border-left-purple';

    return `
      <div class="project-card ${prjBorder} ${p.id === selectedProjectId ? 'active' : ''}" data-id="${p.id}">
        <div class="project-card-header">
          <div>
            <h4 class="project-title">${p.title}</h4>
            <span class="project-client-name">Client: <strong style="color:var(--eqx-text-light);">${p.clientName || p.client || 'Unknown Client'}</strong></span>
          </div>
          <span style="font-size:0.7rem; color:var(--eqx-accent); text-transform:uppercase; font-weight:600; letter-spacing:0.04em;">${catData.label}</span>
        </div>

        <!-- Stage progression tracker bar -->
        <div class="project-stage-track">
          <div class="project-stage-line"></div>
          <div class="project-stage-line-active" style="${activeLineStyle}"></div>
          
          ${stages.map((stg, i) => `
            <div class="project-stage-dot ${activeIndex >= i ? 'completed' : ''} ${activeIndex === i ? 'active' : ''}"></div>
          `).join("")}
        </div>

        <div style="display:flex; justify-content:space-between; font-size:0.55rem; color:var(--eqx-text-muted); text-transform:uppercase; padding: 0 4px; margin-top:-6px; gap: 4px;">
          ${catData.stageLabels.map(lbl => `<span>${lbl}</span>`).join("")}
        </div>
      </div>
    `;
  }).join("");

  container.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      selectedProjectId = card.getAttribute("data-id");
      document.querySelectorAll(".project-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      renderProjectDetailsPane();
    });
  });

  renderProjectDetailsPane();
}

function renderProjectDetailsPane() {
  const pane = document.getElementById("project-details-container");
  if (!pane) return;

  const proj = projects.find(p => p.id === selectedProjectId);
  if (!proj) {
    pane.innerHTML = `<div style="text-align:center; padding:40px; color:var(--eqx-text-muted);">Select a project file.</div>`;
    return;
  }

  const cat = proj.category || "web-app";
  const catData = projectCategories[cat] || projectCategories["general-ops"];

  pane.innerHTML = `
    <div class="details-header">
      <div class="details-avatar">📂</div>
      <div class="details-title">
        <h3>${proj.title}</h3>
        <p>Client / Organization: ${proj.clientName || proj.client || 'Unknown Client'}</p>
      </div>
    </div>

    <div>
      <h4 class="details-section-title">Workflow Stage Control</h4>
      <select class="status-select" id="project-stage-selector" style="background:var(--eqx-dark-card); width:100%;">
        ${catData.stages.map((stg, i) => `
          <option value="${stg}" ${proj.stage === stg ? "selected" : ""}>${catData.stageLabels[i]}</option>
        `).join("")}
      </select>
    </div>

    <div>
      <h4 class="details-section-title">Workspace Setup & Project Log</h4>
      <textarea id="project-session-notes" style="width:100%; height:90px; background:var(--eqx-dark-card); border:1px solid var(--eqx-border-light); color:var(--eqx-text-light); border-radius:8px; padding:10px; font-size:0.8rem; resize:none; font-family:var(--font-body);">${proj.notes}</textarea>
      <button class="action-btn" id="save-project-notes" style="width:100%; margin-top:8px;">Save Logs</button>
    </div>

    <div>
      <h4 class="details-section-title">Milestones Completion Checklist</h4>
      <div class="history-timeline">
        ${proj.checklist.map((item, idx) => `
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; background:rgba(255,255,255,0.01); border:1px solid var(--eqx-border-dark); padding:8px 12px; border-radius:8px; margin-bottom:6px;">
            <div style="display:flex; gap:8px; align-items:center;">
              <input type="checkbox" class="proj-check-box" data-idx="${idx}" ${item.done ? "checked" : ""}>
              <span style="${item.done ? 'text-decoration:line-through; color:var(--eqx-text-muted);' : 'color:var(--eqx-text-light);'}">${item.text}</span>
            </div>
          </div>
        `).join("")}
      </div>
      <button class="action-btn" id="add-proj-todo-btn" style="width:100%; margin-top:10px;">+ Add Checklist Task</button>
    </div>

    <div style="margin-top: 16px; padding-top: 16px; border-top: 1px dashed rgba(255,255,255,0.05);">
      <h4 class="details-section-title">Book Project Session</h4>
      <div style="display:flex; flex-direction:column; gap:8px; background:rgba(0,0,0,0.2); padding:10px; border-radius:8px;">
        <div class="form-group" style="margin:0;">
          <label style="font-size:0.75rem;">Workspace Rooms</label>
          <div style="display:flex; flex-direction:column; gap:6px; margin-top:4px;" id="project-booking-rooms">
            <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:normal; color:var(--eqx-text-light);"><input type="checkbox" name="project-booking-room" value="Control Room"> Control Room (Sound & Coding)</label>
            <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:normal; color:var(--eqx-text-light);"><input type="checkbox" name="project-booking-room" value="Recording Stage"> Recording Stage (Audio & Vocals)</label>
            <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:normal; color:var(--eqx-text-light);"><input type="checkbox" name="project-booking-room" value="Creative Lounge"> Creative Lounge (Co-Working)</label>
            <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:normal; color:var(--eqx-text-light);"><input type="checkbox" name="project-booking-room" value="Studio B & VIP Lounge"> Studio B & VIP Lounge</label>
            <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:normal; color:var(--eqx-text-light);"><input type="checkbox" name="project-booking-room" value="Field Operations"> Field Operations (Outdoor)</label>
          </div>
        </div>
        <div style="display:flex; gap:8px;">
          <div style="flex:1;">
            <label style="font-size:0.75rem; display:block; margin-bottom:2px;">Date (June)</label>
            <input type="number" id="project-booking-date" class="form-input" min="1" max="30" value="15" style="padding:4px 8px; font-size:0.75rem; height:28px; background:var(--eqx-dark-card);">
          </div>
          <div style="flex:1;">
            <label style="font-size:0.75rem; display:block; margin-bottom:2px;">Duration (Hrs)</label>
            <input type="number" id="project-booking-duration" class="form-input" min="1" max="12" value="2" style="padding:4px 8px; font-size:0.75rem; height:28px; background:var(--eqx-dark-card);">
          </div>
        </div>
        <div style="display:flex; gap:8px;">
          <select class="status-select" id="project-booking-type" style="background:var(--eqx-dark-card); font-size:0.75rem; flex:1; height:28px; padding:0 6px; margin:0;">
            <option value="Dev Sprint">Technology Dev Sprint</option>
            <option value="Creative Session">Creative / Sound Session</option>
            <option value="Meeting">Client Review / Meeting</option>
          </select>
          <button class="btn-primary sm" id="project-book-session-btn" style="padding:0 12px; font-size:0.75rem; background:var(--eqx-accent); border-radius:8px; cursor:pointer;">Book Session</button>
        </div>
      </div>
    </div>

    <div style="margin-top: 16px; padding-top: 16px; border-top: 1px dashed rgba(255,255,255,0.05); display: flex; justify-content: flex-end;">
      <button class="action-btn" id="delete-project-btn" style="background: rgba(223, 96, 68, 0.1); border: 1px solid rgba(223, 96, 68, 0.3); color: #DF6044; width: 100%; font-size: 0.8rem; cursor: pointer; transition: all 0.2s;">Delete Project</button>
    </div>
  `;

  // Bind actions
  const stageSel = pane.querySelector("#project-stage-selector");
  if (stageSel) {
    stageSel.addEventListener("change", (e) => {
      proj.stage = e.target.value;
      
      const finalStage = catData.stages[catData.stages.length - 1];
      if (proj.stage === finalStage) {
        const newAlert = {
          id: `alt_${Date.now()}`,
          type: "Important",
          title: "Project ready for review",
          desc: `Final deliverables of ${proj.title} are uploaded for client approval.`,
          time: "Just now",
          indicator: "indicator-pink",
          iconClass: "pink"
        };
        alerts.unshift(newAlert);
        if (isFirebaseConnected) {
          saveToFirestore('alerts', newAlert.id, newAlert);
        }
      }

      saveLocalState();
      if (isFirebaseConnected) {
        saveToFirestore('projects', proj.id, proj);
      }
      showNotification(`Project stage updated to ${e.target.value.toUpperCase()}`);
      renderProjectsTab();
    });
  }

  pane.querySelector("#save-project-notes").addEventListener("click", () => {
    const val = pane.querySelector("#project-session-notes").value;
    proj.notes = val;
    saveLocalState();
    if (isFirebaseConnected) {
      saveToFirestore('projects', proj.id, proj);
    }
    showNotification("Session log updated successfully");
    refreshData();
  });

  const updateProjectStageFromChecklist = () => {
    const total = proj.checklist.length;
    const checked = proj.checklist.filter(item => item.done).length;
    if (total > 0) {
      const stageIndex = Math.min(Math.floor((checked / total) * catData.stages.length), catData.stages.length - 1);
      const newStage = catData.stages[stageIndex];
      if (proj.stage !== newStage) {
        proj.stage = newStage;
        
        // Trigger ready for review alert if final stage is reached
        const finalStage = catData.stages[catData.stages.length - 1];
        if (newStage === finalStage) {
          const newAlert = {
            id: `alt_${Date.now()}`,
            type: "Important",
            title: "Project ready for review",
            desc: `Final deliverables of ${proj.title} are uploaded for client approval.`,
            time: "Just now",
            indicator: "indicator-pink",
            iconClass: "pink"
          };
          alerts.unshift(newAlert);
          if (isFirebaseConnected) {
            saveToFirestore('alerts', newAlert.id, newAlert);
          }
        }
      }
    }
  };

  pane.querySelectorAll(".proj-check-box").forEach(box => {
    box.addEventListener("change", (e) => {
      const idx = parseInt(box.getAttribute("data-idx"));
      proj.checklist[idx].done = e.target.checked;
      updateProjectStageFromChecklist();
      saveLocalState();
      if (isFirebaseConnected) {
        saveToFirestore('projects', proj.id, proj);
      }
      showNotification("Project checklist updated");
      renderProjectsTab();
    });
  });

  pane.querySelector("#add-proj-todo-btn").addEventListener("click", () => {
    const val = prompt("Enter new checklist item:");
    if (val) {
      proj.checklist.push({ text: val, done: false });
      updateProjectStageFromChecklist();
      saveLocalState();
      if (isFirebaseConnected) {
        saveToFirestore('projects', proj.id, proj);
      }
      showNotification("Checklist item appended");
      renderProjectsTab();
    }
  });

  pane.querySelector("#project-book-session-btn")?.addEventListener("click", () => {
    const checkedBoxes = pane.querySelectorAll("input[name='project-booking-room']:checked");
    const selectedRooms = Array.from(checkedBoxes).map(cb => cb.value);
    if (selectedRooms.length === 0) {
      showNotification("Error: Please select at least one room.", "error");
      return;
    }
    const room = selectedRooms.join(", ");
    const date = parseInt(pane.querySelector("#project-booking-date").value) || 15;
    const duration = parseInt(pane.querySelector("#project-booking-duration").value) || 2;
    const type = pane.querySelector("#project-booking-type").value;
    const leadName = proj.clientName || proj.client || "Valued Client";
    const notes = `Project session booked from Project Profile: ${proj.title}`;

    // Try to find matching lead ID
    const projClient = proj.clientName || proj.client || "";
    const matchingLead = leads.find(l => `${l.firstName} ${l.lastName}`.toLowerCase().includes(projClient.toLowerCase()) || l.company.toLowerCase().includes(projClient.toLowerCase()));
    const leadId = matchingLead ? matchingLead.id : "walk-in";

    createBookingRecord(leadId, leadName, room, type, date, duration, notes);

    // Uncheck boxes
    checkedBoxes.forEach(cb => cb.checked = false);
    refreshData();
  });

  pane.querySelector("#delete-project-btn")?.addEventListener("click", () => {
    if (confirm(`Are you sure you want to permanently delete project "${proj.title}"?`)) {
      if (isFirebaseConnected) {
        deleteFromFirestore('projects', proj.id);
        showNotification(`Project "${proj.title}" deleted from Cloud`);
      } else {
        projects = projects.filter(p => p.id !== proj.id);
        saveLocalState();
        showNotification(`Project "${proj.title}" deleted locally`);
        refreshData();
      }
    }
  });
}

// -------------------------------------------------------------
// TAB 6: COLLABORATIVE FILE REVIEW PORTAL (WAVEFORM PLAYBACK)
// -------------------------------------------------------------
function renderFileReviewTab() {
  const container = document.getElementById("crm-tab-review");
  if (!container) return;

  const activeReview = fileReviews.find(r => r.id === activeReviewTrack) || fileReviews[0];
  if (!activeReview) return;

  const linkedProj = projects.find(p => p.id === activeReview.projectId) || projects.find(p => p.title === activeReview.projectTitle);
  const isPrototype = linkedProj ? (linkedProj.category === "web-app" || linkedProj.category === "digital-design" || linkedProj.category === "general-ops") : false;

  container.innerHTML = `
    <div class="review-layout">
      
      <!-- Top Project Review Selector Dropdown -->
      <div class="glass-panel" style="padding:16px 24px; grid-column:span 2; display:flex; justify-content:space-between; align-items:center; gap:20px; margin-bottom:-12px;">
        <div style="display:flex; gap:12px; align-items:center;">
          <span style="font-size:0.85rem; color:var(--eqx-text-muted);">Active Review File:</span>
          <select id="review-project-select" class="form-input" style="background:var(--eqx-dark-card); width:280px;">
            ${fileReviews.map(r => `<option value="${r.id}" ${r.id === activeReview.id ? 'selected' : ''}>${r.projectTitle} (${r.activeVersion})</option>`).join("")}
          </select>
        </div>
        <span style="font-size:0.8rem; color:var(--eqx-accent); text-transform:uppercase; font-weight:600; letter-spacing:0.05em;">
          Format: ${isPrototype ? 'Interactive Wireframe' : 'Lossless Audio Stream'}
        </span>
      </div>

      <!-- Main Waveform / Asset playback module -->
      <div class="glass-panel review-player-card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <h3 style="font-family:var(--font-head); font-weight:300; font-size:1.5rem; margin:0; color:var(--eqx-accent);">${activeReview.projectTitle}</h3>
            <span style="font-size:0.8rem; color:var(--eqx-text-muted);">Asset File: <strong style="color:var(--eqx-text-light);">${activeReview.fileName}</strong></span>
          </div>

          <div style="display:flex; gap:12px; align-items:center;">
            <select id="review-version-select" class="form-input" style="background:var(--eqx-dark-card); width:130px;">
              <option value="Version 1" ${activeReview.activeVersion === 'Version 1' ? 'selected' : ''}>Version 1</option>
              <option value="Version 2 (Beta)" ${activeReview.activeVersion === 'Version 2 (Beta)' ? 'selected' : ''}>Version 2 (Beta)</option>
              <option value="Final Release" ${activeReview.activeVersion === 'Final Release' ? 'selected' : ''}>Final Release</option>
            </select>
            <button class="btn-primary" id="approve-review-btn">✔ Approve Deliverables</button>
          </div>
        </div>

        <!-- Waveform / Asset timeline container -->
        <div class="waveform-canvas-container" id="waveform-click-area" style="position:relative; height:${isPrototype ? '320px' : '120px'}; overflow:hidden; background:rgba(0,0,0,0.15);">
          <canvas class="waveform-canvas" id="waveform-sim-canvas" style="display:block; width:100%; height:100%;"></canvas>
          ${!isPrototype ? `<div class="waveform-progress-bar" id="waveform-playback-bar"></div>` : ''}
          <div id="comments-timeline-markers" style="position:absolute; inset:0; pointer-events:none;">
            ${isPrototype ? renderPrototypeMarkers(activeReview) : renderTimelineMarkerFlags(activeReview)}
          </div>
        </div>

        <!-- Playback & delivery controls bar -->
        ${isPrototype ? `
          <div class="audio-controls-row">
            <div style="display:flex; gap:16px; align-items:center;">
              <span style="font-size:0.75rem; color:#00F5D4; font-weight:600; text-transform:uppercase; letter-spacing:0.04em;">⚡ Live Design Wireframe Review Mode</span>
            </div>
            <div style="font-size:0.75rem; color:#00F5D4; font-weight:600; display:none;" id="delivery-download-link">
              🎉 REVIEW APPROVED! <a href="#" onclick="alert('Downloading compiled design resources and specs package...'); return false;" style="color:#00F5D4; text-decoration:underline; margin-left:8px;">Download Assets Package</a>
            </div>
            <span style="font-size:0.75rem; color:var(--eqx-text-muted);">Click anywhere inside layout canvas above to drop feedback pin</span>
          </div>
        ` : `
          <div class="audio-controls-row">
            <div style="display:flex; gap:16px; align-items:center;">
              <button class="play-pause-btn" id="audio-play-pause">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" id="play-pause-icon">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
              <span class="timeline-playback-timer" id="playback-time-label">00:00 / 03:00</span>
            </div>
            <div style="font-size:0.75rem; color:#00F5D4; font-weight:600; display:none;" id="delivery-download-link">
              🎉 APPROVED! <a href="#" onclick="alert('Downloading compiled audio files and final masters package...'); return false;" style="color:#00F5D4; text-decoration:underline; margin-left:8px;">Download Lossless Masters</a>
            </div>
            <span style="font-size:0.75rem; color:var(--eqx-text-muted);">Interactive waveform timeline / Lossless Media stream</span>
          </div>
        `}
      </div>

      <!-- Revision comments checklist panel -->
      <div class="glass-panel" style="padding:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <h3 style="font-family:var(--font-head); font-weight:300; font-size:1.3rem; margin:0; color:var(--eqx-text-light);">
            ${isPrototype ? 'Layout Feedback Pins' : 'Timeline Review Comments'}
          </h3>
          <span style="font-size:0.7rem; color:var(--eqx-text-muted);">
            ${isPrototype ? 'Click layout coordinates to place pins' : 'Click soundwave to add timestamps'}
          </span>
        </div>

        <div style="display:flex; flex-direction:column; gap:12px; max-height:260px; overflow-y:auto;" id="waveform-comments-list">
          ${renderCommentsTimeline(activeReview, isPrototype)}
        </div>
      </div>

    </div>
  `;

  // Bind project dropdown selector
  const projectSel = container.querySelector("#review-project-select");
  if (projectSel) {
    projectSel.addEventListener("change", (e) => {
      activeReviewTrack = e.target.value;
      saveLocalState();
      renderFileReviewTab();
      setTimeout(initWaveformSimulator, 100);
    });
  }

  // Bind interactive play icon
  const playBtn = container.querySelector("#audio-play-pause");
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      isAudioPlaying = !isAudioPlaying;
      updatePlaybackState();
    });
  }

  // Bind click area for comment logging
  const waveformArea = container.querySelector("#waveform-click-area");
  if (waveformArea) {
    waveformArea.addEventListener("click", (e) => {
      // Don't log if they click on the marker dots directly
      if (e.target.classList.contains("comment-marker-dot") || e.target.closest(".comment-marker-dot")) return;

      const rect = waveformArea.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      const xPct = Math.round((clickX / rect.width) * 100);
      const yPct = Math.round((clickY / rect.height) * 100);

      if (isPrototype) {
        const text = prompt(`Log coordinate comment pin at [X: ${xPct}%, Y: ${yPct}%]:`);
        if (text) {
          activeReview.comments.push({
            x: xPct,
            y: yPct,
            text,
            author: "Client Reviewer"
          });

          // Trigger alert notify
          alerts.unshift({
            id: `alt_${Date.now()}`,
            type: "Comments",
            title: "New Review Pin Placed",
            desc: `Placed feedback pin at [${xPct}%, ${yPct}%] on ${activeReview.projectTitle}.`,
            time: "Just now",
            indicator: "indicator-violet",
            iconClass: "violet"
          });

          saveLocalState();
          showNotification(`Placed layout feedback pin at ${xPct}%, ${yPct}%`);
          renderFileReviewTab();
          setTimeout(initWaveformSimulator, 100);
        }
      } else {
        const percent = clickX / rect.width;
        const timeSecs = Math.round(percent * playbackDuration);

        const mins = Math.floor(timeSecs / 60);
        const secs = timeSecs % 60;
        const timeStampStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

        const text = prompt(`Log comment on audio mix timeline at [${timeStampStr}]:`);
        if (text) {
          activeReview.comments.push({
            time: timeSecs,
            text,
            author: "Client Reviewer"
          });

          // Trigger alert notify
          alerts.unshift({
            id: `alt_${Date.now()}`,
            type: "Comments",
            title: "New Audio Comment Logged",
            desc: `Reviewer added feedback at timeline ${timeStampStr} on ${activeReview.projectTitle}.`,
            time: "Just now",
            indicator: "indicator-violet",
            iconClass: "violet"
          });

          saveLocalState();
          showNotification(`Logged review feedback at ${timeStampStr}`);
          renderFileReviewTab();
          setTimeout(initWaveformSimulator, 100);
        }
      }
    });
  }

  // Bind version selection
  const verSel = container.querySelector("#review-version-select");
  if (verSel) {
    verSel.addEventListener("change", (e) => {
      activeReview.activeVersion = e.target.value;
      showNotification(`Loading deliverables version ${e.target.value}`);
      saveLocalState();
    });
  }

  // Bind approve mix
  const approveBtn = container.querySelector("#approve-review-btn");
  if (approveBtn) {
    approveBtn.addEventListener("click", () => {
      const link = container.querySelector("#delivery-download-link");
      if (link) link.style.display = "block";
      showNotification("Review approved. Secure deliver link enabled.");
      
      // Update alerts
      alerts.unshift({
        id: `alt_${Date.now()}`,
        type: "Important",
        title: "Deliverables Approved",
        desc: `Client team approved layout and deliverables for ${activeReview.projectTitle}.`,
        time: "Just now",
        indicator: "indicator-green",
        iconClass: "green"
      });
      saveLocalState();
    });
  }
}

function renderTimelineMarkerFlags(review) {
  return review.comments.map(c => {
    const percent = (c.time / playbackDuration) * 100;
    return `
      <div class="comment-marker-flag" style="left:${percent}%;"></div>
      <div class="comment-marker-dot" style="left:${percent}%;" title="${c.author}: ${c.text}" onclick="alert('[Timeline ${formatTimeLabel(c.time)}]\\n${c.author}: ${c.text}')"></div>
    `;
  }).join("");
}

function renderPrototypeMarkers(review) {
  return review.comments.map((c, idx) => {
    const x = c.x || 50;
    const y = c.y || 50;
    return `
      <div class="comment-marker-dot prototype-dot" style="left:${x}%; top:${y}%; position:absolute; pointer-events:auto;" title="${c.author}: ${c.text}" onclick="alert('[Pin #${idx+1} at ${x}%, ${y}%]\\n${c.author}: ${c.text}')">
        <span class="marker-number">${idx+1}</span>
      </div>
    `;
  }).join("");
}

function renderCommentsTimeline(review, isPrototype) {
  if (review.comments.length === 0) {
    return `<span style="font-size:0.8rem; color:var(--eqx-text-muted); text-align:center;">No feedback pins logged. Click layout canvas above to add.</span>`;
  }

  if (isPrototype) {
    return review.comments.map((c, idx) => `
      <div style="font-size:0.8rem; background:rgba(255,255,255,0.01); border:1px solid var(--eqx-border-dark); padding:10px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="display:inline-block; width:18px; height:18px; line-height:18px; text-align:center; background:#DF6044; color:#0D1318; border-radius:50%; font-size:0.7rem; font-weight:600; flex-shrink:0;">${idx+1}</span>
          <span style="color:var(--eqx-text-light);"><strong style="color:var(--eqx-text-light);">${c.author}</strong>: ${c.text}</span>
        </div>
        <span style="font-size:0.7rem; color:#DF6044; font-weight:600; font-family:var(--font-head); flex-shrink:0; margin-left:8px;">[X:${c.x}%, Y:${c.y}%]</span>
      </div>
    `).join("");
  } else {
    const sorted = [...review.comments].sort((a,b) => a.time - b.time);
    return sorted.map(c => `
      <div style="font-size:0.8rem; background:rgba(255,255,255,0.01); border:1px solid var(--eqx-border-dark); padding:10px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <strong style="color:var(--eqx-text-light);">${c.author}</strong>: 
          <span style="color:var(--eqx-text-muted);">${c.text}</span>
        </div>
        <span style="font-size:0.75rem; color:#9D4EDD; font-weight:600; font-family:var(--font-head); flex-shrink:0;">${formatTimeLabel(c.time)}</span>
      </div>
    `).join("");
  }
}

function formatTimeLabel(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function updatePlaybackState() {
  const icon = document.getElementById("play-pause-icon");
  if (!icon) return;

  if (isAudioPlaying) {
    icon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`;
    
    // Start interval timer
    audioTimerInterval = setInterval(() => {
      playbackTime++;
      if (playbackTime >= playbackDuration) {
        playbackTime = 0;
        isAudioPlaying = false;
        clearInterval(audioTimerInterval);
        updatePlaybackState();
      }
      
      const widthPct = (playbackTime / playbackDuration) * 100;
      const bar = document.getElementById("waveform-playback-bar");
      if (bar) bar.style.width = `${widthPct}%`;

      const lbl = document.getElementById("playback-time-label");
      if (lbl) lbl.textContent = `${formatTimeLabel(playbackTime)} / 03:00`;
    }, 1000);
  } else {
    icon.innerHTML = `<path d="M8 5v14l11-7z"/>`;
    clearInterval(audioTimerInterval);
  }
}

// Draws simulated sound waves peaks or high fidelity wireframes on the canvas element
function initWaveformSimulator() {
  const canvas = document.getElementById("waveform-sim-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Clear and resize canvas
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;

  ctx.clearRect(0,0,canvas.width,canvas.height);

  const activeReview = fileReviews.find(r => r.id === activeReviewTrack) || fileReviews[0];
  const linkedProj = activeReview ? (projects.find(p => p.id === activeReview.projectId) || projects.find(p => p.title === activeReview.projectTitle)) : null;
  const isPrototype = linkedProj ? (linkedProj.category === "web-app" || linkedProj.category === "digital-design" || linkedProj.category === "general-ops") : false;

  if (isPrototype) {
    // Draw Abstract Website mockup UI
    ctx.fillStyle = "rgba(13, 19, 24, 0.95)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid details
    // 1. Sidebar (deep card backdrop)
    ctx.fillStyle = "rgba(22, 31, 38, 0.95)";
    ctx.fillRect(0, 0, 48, canvas.height);
    
    // Draw sidebar circles representing icons
    ctx.fillStyle = "rgba(255, 92, 62, 0.4)";
    ctx.beginPath(); ctx.arc(24, 25, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    for (let i = 1; i < 6; i++) {
      ctx.beginPath();
      ctx.arc(24, 25 + (i * 28), 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Header
    ctx.fillStyle = "rgba(30, 38, 44, 0.9)";
    ctx.fillRect(48, 0, canvas.width - 48, 38);
    // Header title block placeholder
    ctx.fillStyle = "rgba(195, 181, 159, 0.25)";
    ctx.fillRect(64, 13, 140, 12);
    // Profile circle placeholder
    ctx.beginPath(); ctx.arc(canvas.width - 24, 19, 9, 0, Math.PI * 2); ctx.fill();

    // 3. Grid elements representing dashboard widgets
    const innerWidth = canvas.width - 48 - 32;
    const itemWidth = (innerWidth - 24) / 3;
    
    ctx.fillStyle = "rgba(22, 31, 38, 0.65)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 3; i++) {
      const x = 48 + 16 + (i * (itemWidth + 12));
      ctx.fillRect(x, 54, itemWidth, 64);
      ctx.strokeRect(x, 54, itemWidth, 64);
      
      // Draw indicator bars inside cards
      ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
      ctx.fillRect(x + 12, 68, itemWidth * 0.75, 8);
      ctx.fillRect(x + 12, 82, itemWidth * 0.45, 6);
      ctx.fillStyle = "rgba(22, 31, 38, 0.65)";
    }

    // 4. Large center panel mockup representing UI lists/graphs
    ctx.fillRect(48 + 16, 134, innerWidth, 160);
    ctx.strokeRect(48 + 16, 134, innerWidth, 160);
    
    // Abstract details inside panel
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    ctx.fillRect(48 + 32, 154, innerWidth * 0.5, 12);
    ctx.fillRect(48 + 32, 178, innerWidth * 0.85, 6);
    ctx.fillRect(48 + 32, 192, innerWidth * 0.7, 6);
    
    // Draw abstract analytics graph line
    ctx.strokeStyle = "rgba(255, 92, 62, 0.75)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(48 + 32, 260);
    ctx.lineTo(48 + 32 + (innerWidth * 0.18), 242);
    ctx.lineTo(48 + 32 + (innerWidth * 0.36), 254);
    ctx.lineTo(48 + 32 + (innerWidth * 0.54), 218);
    ctx.lineTo(48 + 32 + (innerWidth * 0.72), 232);
    ctx.lineTo(48 + 32 + (innerWidth * 0.88), 198);
    ctx.stroke();

    // Draw graph vertex circles
    ctx.fillStyle = "#DF6044";
    const graphPts = [
      [48 + 32, 260],
      [48 + 32 + (innerWidth * 0.18), 242],
      [48 + 32 + (innerWidth * 0.36), 254],
      [48 + 32 + (innerWidth * 0.54), 218],
      [48 + 32 + (innerWidth * 0.72), 232],
      [48 + 32 + (innerWidth * 0.88), 198]
    ];
    graphPts.forEach(pt => {
      ctx.beginPath();
      ctx.arc(pt[0], pt[1], 4, 0, Math.PI * 2);
      ctx.fill();
    });

  } else {
    // Draw simulated audio sound peaks
    ctx.strokeStyle = "rgba(195, 181, 159, 0.45)";
    ctx.lineWidth = 2;
    const count = 120;
    const spacing = canvas.width / count;

    for (let i = 0; i < count; i++) {
      const x = i * spacing;
      // Generate organic peak wave heights
      const peakHeight = (Math.sin(i * 0.15) * 20) + (Math.cos(i * 0.4) * 15) + 40;
      const yTop = (canvas.height - peakHeight) / 2;
      const yBottom = yTop + peakHeight;

      ctx.beginPath();
      ctx.moveTo(x, yTop);
      ctx.lineTo(x, yBottom);
      ctx.stroke();
    }
  }
}

// -------------------------------------------------------------
// TAB 7: FINANCIALS & INVOICING (STRIPE GATEWAY FLOW)
// -------------------------------------------------------------
function renderFinancialsTab() {
  const container = document.getElementById("crm-tab-financials");
  if (!container) return;

  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:32px;">
      
      <!-- Top total KPI stats row -->
      <div class="financials-summary-grid">
        <div class="metric-card">
          <div><div class="metric-label">Quotes Drafted</div><div class="metric-value" style="color:#9CA3AF;">8 500 SEK</div></div>
        </div>
        <div class="metric-card">
          <div><div class="metric-label">Invoiced Pending</div><div class="metric-value" style="color:#FFB703;">12 500 SEK</div></div>
        </div>
        <div class="metric-card">
          <div><div class="metric-label">Payments Received</div><div class="metric-value" style="color:#10B981;">5 400 SEK</div></div>
        </div>
      </div>

      <div class="bookings-panel-header" style="margin-bottom:-16px;">
        <h2 class="grid-title" style="margin:0; font-family:var(--font-head); font-weight:300; text-transform:uppercase; font-size:1.5rem; letter-spacing:0.05em; color:var(--eqx-accent);">Quotes & Financials Suite</h2>
      </div>

      <!-- Double split layout: List of quotes/invoices vs creation -->
      <div class="bookings-layout">
        
        <!-- List Panel -->
        <div class="financial-table-wrapper">
          <table class="financial-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Project Folder</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${renderFinancialListItems()}
            </tbody>
          </table>
        </div>

        <!-- Creation Card Form -->
        <div class="calendar-widget">
          <h3 style="font-family:var(--font-head); font-size:1.15rem; font-weight:400; color:var(--eqx-text-light); margin:0 0 10px 0;">Initialize Financial Entry</h3>
          
          <form id="create-quote-form" style="display:flex; flex-direction:column; gap:16px;">
            <div class="form-group">
              <label for="fin-project">Select Project</label>
              <select id="fin-project" class="form-input" style="background:var(--eqx-dark-card);" required>
                ${projects.map(p => `<option value="${p.title}">${p.title}</option>`).join("")}
              </select>
            </div>
            <div class="form-group">
              <label for="fin-type">Document Stage Type</label>
              <select id="fin-type" class="form-input" style="background:var(--eqx-dark-card);" required>
                <option value="Quote">Project Quote Estimate</option>
                <option value="Invoice">Detailed Invoice</option>
              </select>
            </div>
            <div class="form-group">
              <label for="fin-amount">Deal Amount (SEK)</label>
              <input type="number" id="fin-amount" class="form-input" value="3500" required />
            </div>
            <div class="form-group">
              <label for="fin-due">Due Date</label>
              <input type="text" id="fin-due" class="form-input" value="June 28" required />
            </div>
            <button type="submit" class="btn-primary" style="width:100%;">Create Document</button>
          </form>
        </div>

      </div>

    </div>
  `;

  // Bind creation document
  const finForm = container.querySelector("#create-quote-form");
  if (finForm) {
    finForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const projTitle = document.getElementById("fin-project").value;
      const type = document.getElementById("fin-type").value;
      const amount = parseInt(document.getElementById("fin-amount").value) || 1000;
      const dueDate = document.getElementById("fin-due").value;

      const newEntry = {
        id: `fin_${Date.now()}`,
        type,
        projectTitle,
        amount,
        status: type === "Quote" ? "quote" : "pending",
        dueDate
      };

      financials.push(newEntry);
      
      // Trigger alerts notification
      alerts.unshift({
        id: `alt_${Date.now()}`,
        type: "Important",
        title: `${type} Created`,
        desc: `${type} for ${projTitle} is ready for client review.`,
        time: "Just now",
        indicator: type === "Quote" ? "indicator-violet" : "indicator-amber",
        iconClass: type === "Quote" ? "violet" : "amber"
      });

      saveLocalState();
      showNotification(`${type} created successfully`);
      renderFinancialsTab();
    });
  }
}

function renderFinancialListItems() {
  if (financials.length === 0) {
    return `<tr><td colspan="6" style="text-align:center; color:var(--eqx-text-muted);">No billing entries cataloged.</td></tr>`;
  }

  return financials.map(f => {
    let actionBtn = "";
    if (f.status === "quote") {
      actionBtn = `<button class="action-btn" style="padding: 4px 10px; font-size:0.7rem;" onclick="window.convertQuoteToInvoice('${f.id}')">Invoice</button>`;
    } else if (f.status === "pending" || f.status === "pastdue") {
      actionBtn = `<button class="btn-primary sm" onclick="window.payInvoiceViaStripe('${f.id}')">Pay Now</button>`;
    } else {
      actionBtn = `<span style="color:#10B981; font-size:0.75rem; font-weight:600;">Complete</span>`;
    }

    let color = '#10B981';
    if (f.status === 'pending') color = '#FFB703';
    else if (f.status === 'pastdue') color = '#DF6044';
    else if (f.status === 'quote') color = '#9CA3AF';

    return `
      <tr>
        <td>
          <span style="display:inline-block; width:6px; height:18px; background:${color}; border-radius:3px; margin-right:8px; vertical-align:middle;"></span>
          <strong style="color:${f.type === 'Quote' ? '#9CA3AF' : '#00B4D8'};">${f.type}</strong>
        </td>
        <td>${f.projectTitle}</td>
        <td><strong>${f.amount.toLocaleString()} SEK</strong></td>
        <td>${f.dueDate}</td>
        <td><span class="badge-fin-status ${f.status}">${f.status}</span></td>
        <td>${actionBtn}</td>
      </tr>
    `;
  }).join("");
}

// Global actions exposed for financial conversions
window.convertQuoteToInvoice = (id) => {
  const index = financials.findIndex(f => f.id === id);
  if (index !== -1) {
    financials[index].type = "Invoice";
    financials[index].status = "pending";
    saveLocalState();
    showNotification("Converted Quote to Invoice estimate");
    refreshData();
  }
};

window.payInvoiceViaStripe = (id) => {
  const index = financials.findIndex(f => f.id === id);
  if (index !== -1) {
    if (confirm(`Simulating secure card checkout for ${financials[index].amount.toLocaleString()} SEK?`)) {
      financials[index].status = "paid";
      
      // Trigger alerts completed
      alerts.unshift({
        id: `alt_${Date.now()}`,
        type: "Important",
        title: "Payment Received",
        desc: `Stripe webhook confirmed payment for ${financials[index].projectTitle}.`,
        time: "Just now",
        indicator: "indicator-green",
        iconClass: "green"
      });

      saveLocalState();
      showNotification("Payment checkout successful!");
      refreshData();
    }
  }
};

// -------------------------------------------------------------
// TAB 8: TO DOS & REMINDERS MANAGER
// -------------------------------------------------------------
function renderTodosTab() {
  const container = document.getElementById("crm-tab-todos");
  if (!container) return;

  container.innerHTML = `
    <div class="contacts-layout">
      
      <!-- Left side tasks checklists -->
      <div>
        <div class="contacts-header-actions">
          <h2 class="grid-title" style="margin:0; font-family:var(--font-head); font-weight:300; text-transform:uppercase; font-size:1.5rem; letter-spacing:0.05em; color:var(--eqx-accent);">To-Do Checklist</h2>
        </div>

        <div class="todos-container" id="todos-list-suite">
          <!-- Live list rows render here -->
        </div>
      </div>

      <!-- Right side task creation form -->
      <div class="calendar-widget">
        <h3 style="font-family:var(--font-head); font-size:1.15rem; font-weight:400; color:var(--eqx-text-light); margin:0 0 10px 0;">Schedule Studio To-Do</h3>
        
        <form id="create-todo-form" style="display:flex; flex-direction:column; gap:16px;">
          <div class="form-group">
            <label for="todo-title">Task Summary</label>
            <input type="text" id="todo-title" class="form-input" placeholder="e.g. Wrap mic cables in Booth" required />
          </div>
          <div class="form-group">
            <label for="todo-assign">Assign Project Manager / Engineer</label>
            <select id="todo-assign" class="form-input" style="background:var(--eqx-dark-card);" required>
              <option value="CPz">CPz</option>
              <option value="Rz">Rz</option>
              <option value="Mali Boy">Mali Boy</option>
            </select>
          </div>
          <div class="form-group">
            <label for="todo-due">Due Date / Timeline</label>
            <input type="text" id="todo-due" class="form-input" value="June 16" required />
          </div>
          <div class="form-group">
            <label for="todo-reminder">Reminder Custom Alert</label>
            <select id="todo-reminder" class="form-input" style="background:var(--eqx-dark-card);" required>
              <option value="9am Day of Task">9am Day of Task</option>
              <option value="2 Hours Before">2 Hours Before</option>
              <option value="1 Day Prior">1 Day Prior</option>
            </select>
          </div>
          <button type="submit" class="btn-primary" style="width:100%;">Create Task</button>
        </form>
      </div>

    </div>
  `;

  // Bind creation todo
  const todoForm = container.querySelector("#create-todo-form");
  if (todoForm) {
    todoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("todo-title").value;
      const assignedTo = document.getElementById("todo-assign").value;
      const dueDate = document.getElementById("todo-due").value;
      const reminder = document.getElementById("todo-reminder").value;

      const newTodo = {
        id: `task_${Date.now()}`,
        title: `${title} (${reminder} Alert)`,
        dueDate,
        assignedTo,
        status: "pending",
        leadId: "lead_01"
      };

      if (isFirebaseConnected) {
        saveToFirestore('tasks', newTodo.id, newTodo);
        showNotification("Studio To-Do synced to Cloud");
      } else {
        tasks.push(newTodo);
        saveLocalState();
        showNotification("Studio To-Do scheduled locally");
        renderTodosTab();
      }
    });
  }

  renderTodosListItems();
}

function renderTodosListItems() {
  const container = document.getElementById("todos-list-suite");
  if (!container) return;

  if (tasks.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:var(--eqx-text-muted); padding:40px;">No pending studio To-Dos scheduled.</p>`;
    return;
  }

  container.innerHTML = tasks.map(t => {
    let borderClass = 'border-left-yellow';
    if (t.assignedTo === 'CPz') borderClass = 'border-left-orange';
    else if (t.assignedTo === 'Rz') borderClass = 'border-left-purple';
    else if (t.assignedTo === 'Mali Boy') borderClass = 'border-left-cyan';

    return `
      <div class="todo-row-card ${borderClass}">
      <div class="todo-row-left">
        <input type="checkbox" class="task-checklist-box" data-id="${t.id}" ${t.status === 'completed' ? 'checked' : ''} style="width: 18px; height: 18px; cursor:pointer;" />
        <div class="todo-text-content">
          <span class="todo-item-title" style="${t.status === 'completed' ? 'text-decoration:line-through; color:var(--eqx-text-muted);' : 'color:var(--eqx-text-light);'}">${t.title}</span>
          <span class="todo-item-meta">Assigned to: <strong style="color:var(--eqx-accent);">${t.assignedTo}</strong> | Due: ${t.dueDate}</span>
        </div>
      </div>
      <button class="action-delete-btn" onclick="window.deleteTaskItem('${t.id}')" aria-label="Delete Task">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
      </div>
    `;
  }).join("");

  // Bind checkbox checked
  container.querySelectorAll(".task-checklist-box").forEach(box => {
    box.addEventListener("change", (e) => {
      const tid = box.getAttribute("data-id");
      const task = tasks.find(t => t.id === tid);
      if (task) {
        task.status = e.target.checked ? "completed" : "pending";
        saveLocalState();
        if (isFirebaseConnected) {
          saveToFirestore('tasks', task.id, task);
        }
        showNotification(e.target.checked ? "Task marked completed!" : "Task marked pending");
        renderTodosTab();
      }
    });
  });
}

window.deleteTaskItem = (id) => {
  if (confirm("Are you sure you want to delete this To-Do?")) {
    if (isFirebaseConnected) {
      deleteFromFirestore('tasks', id);
      showNotification("Task deleted from Cloud");
    } else {
      tasks = tasks.filter(t => t.id !== id);
      saveLocalState();
      showNotification("Task deleted successfully");
      renderTodosTab();
    }
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// TAB 9: SETTINGS — Admin User Management
// ─────────────────────────────────────────────────────────────────────────────
import {
  subscribeToAdmins,
  addAdminUser,
  removeAdminUser,
  SUPER_ADMIN_EMAIL
} from './auth.js';

let _adminListUnsub = null;

function renderSettingsTab() {
  const container = document.getElementById("crm-tab-settings");
  if (!container) return;

  const currentUser = window.eqxCurrentUser || {};
  const isSuperAdmin = currentUser.email === SUPER_ADMIN_EMAIL;

  const roleLabel = (role) => {
    if (role === 'super_admin') {
      return `<span style="font-size:0.72rem;background:linear-gradient(135deg,#FF6B4A,#E84820);color:#fff;padding:2px 10px;border-radius:100px;">Super Admin</span>`;
    }
    return `<span style="font-size:0.72rem;background:rgba(0,200,160,0.15);color:#00C8A0;border:1px solid rgba(0,200,160,0.3);padding:2px 10px;border-radius:100px;">Admin</span>`;
  };

  container.innerHTML = `
    <div style="max-width:780px;">

      <!-- Current Session Card -->
      <div class="glass-panel" style="padding:28px 32px;margin-bottom:28px;">
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:6px;">
          ${
            currentUser.photoURL
              ? `<img src="${currentUser.photoURL}" style="width:44px;height:44px;border-radius:50%;border:2px solid var(--eqx-primary);" />`
              : `<div style="width:44px;height:44px;border-radius:50%;background:var(--eqx-primary);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.2rem;color:#fff;">${(currentUser.displayName || currentUser.email || '?')[0].toUpperCase()}</div>`
          }
          <div>
            <div style="font-size:1rem;font-weight:600;color:var(--eqx-text-light);">${currentUser.displayName || 'Unknown'}</div>
            <div style="font-size:0.8rem;color:var(--eqx-text-muted);">${currentUser.email || ''} &nbsp; ${roleLabel(currentUser.role)}</div>
          </div>
        </div>
      </div>

      <!-- Database Integration Settings Card -->
      <div class="glass-panel" style="padding:28px 32px;margin-bottom:28px;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;">
          <div>
            <h3 style="margin:0 0 4px;font-size:1rem;color:var(--eqx-text-light);">Database Integration</h3>
            <p style="margin:0;font-size:0.8rem;color:var(--eqx-text-muted);">Configure direct ingestion and syncing with Live Firebase database.</p>
          </div>
          <div class="crm-toggle-container" style="display:flex;align-items:center;gap:8px;">
            <span class="crm-toggle-label" style="font-size:0.85rem;color:var(--eqx-text-muted);">Firebase Ingest</span>
            <label class="crm-switch">
              <input type="checkbox" id="crm-db-toggle" ${isFirebaseConnected ? 'checked' : ''}>
              <span class="crm-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- Admin User Roster -->
      <div class="glass-panel" style="padding:28px 32px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;">
          <div>
            <h3 style="margin:0 0 4px;font-size:1rem;color:var(--eqx-text-light);">Admin Users</h3>
            <p style="margin:0;font-size:0.8rem;color:var(--eqx-text-muted);">Accounts authorised to access this portal.</p>
          </div>
          ${
            isSuperAdmin
              ? `<button id="settings-add-admin-btn" class="crm-add-lead-btn" style="font-size:0.8rem;padding:8px 18px;">+ Add Admin</button>`
              : ''
          }
        </div>

        <!-- Add admin form (hidden by default, super-admin only) -->
        ${
          isSuperAdmin
            ? `<div id="settings-add-admin-form" style="display:none;background:rgba(255,255,255,0.03);border:1px solid var(--eqx-glass-border);border-radius:14px;padding:20px;margin-bottom:22px;">
                <div style="display:flex;gap:12px;flex-wrap:wrap;">
                  <input id="settings-new-email" type="email" placeholder="user@gmail.com" class="form-input" style="flex:1;min-width:220px;" />
                  <input id="settings-new-name" type="text" placeholder="Display name" class="form-input" style="flex:1;min-width:160px;" />
                  <select id="settings-new-role" class="form-input" style="min-width:130px;">
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                  <button class="crm-add-lead-btn" style="font-size:0.8rem;padding:8px 18px;" onclick="window.settingsSubmitAddAdmin()">Add</button>
                </div>
                <div id="settings-add-error" style="font-size:0.78rem;color:#FF6B6B;margin-top:8px;"></div>
              </div>`
            : ''
        }

        <!-- Live admin roster -->
        <div id="settings-admin-list">
          <div style="text-align:center;padding:24px;color:var(--eqx-text-muted);font-size:0.85rem;">Loading team roster…</div>
        </div>
      </div>
    </div>
  `;

  // Wire up database mode toggle
  const dbToggle = container.querySelector("#crm-db-toggle");
  if (dbToggle) {
    dbToggle.addEventListener("change", (e) => {
      if (typeof window.toggleFirebaseIngest === "function") {
        window.toggleFirebaseIngest(e.target.checked);
      }
    });
  }

  // Wire up add-form toggle
  const addBtn = container.querySelector("#settings-add-admin-btn");
  const addForm = container.querySelector("#settings-add-admin-form");
  if (addBtn && addForm) {
    addBtn.addEventListener("click", () => {
      const isOpen = addForm.style.display !== "none";
      addForm.style.display = isOpen ? "none" : "block";
      addBtn.textContent = isOpen ? "+ Add Admin" : "✕ Cancel";
    });
  }

  // Expose submit handler
  window.settingsSubmitAddAdmin = async () => {
    const email = document.getElementById("settings-new-email")?.value?.trim();
    const name  = document.getElementById("settings-new-name")?.value?.trim();
    const role  = document.getElementById("settings-new-role")?.value || "admin";
    const errEl = document.getElementById("settings-add-error");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (errEl) errEl.textContent = "Please enter a valid email address.";
      return;
    }
    try {
      await addAdminUser(email, name, role);
      showNotification(`${email} added as ${role === 'super_admin' ? 'Super Admin' : 'Admin'}`);
      // Reset form
      document.getElementById("settings-new-email").value = "";
      document.getElementById("settings-new-name").value = "";
      if (addForm) addForm.style.display = "none";
      if (addBtn)  addBtn.textContent = "+ Add Admin";
    } catch (e) {
      if (errEl) errEl.textContent = "Failed to add user. Check Firestore permissions.";
    }
  };

  // Expose delete handler (super-admin only)
  window.settingsDeleteAdmin = async (email) => {
    if (email === SUPER_ADMIN_EMAIL) {
      showNotification("Cannot remove the primary Super Admin account.");
      return;
    }
    if (!confirm(`Remove ${email} from the admin roster?`)) return;
    try {
      await removeAdminUser(email);
      showNotification(`${email} removed.`);
    } catch (e) {
      showNotification("Failed to remove user. Check Firestore permissions.");
    }
  };

  // Subscribe to live admin list updates
  if (_adminListUnsub) _adminListUnsub();
  _adminListUnsub = subscribeToAdmins((admins) => {
    const listEl = document.getElementById("settings-admin-list");
    if (!listEl) return;

    if (!admins.length) {
      listEl.innerHTML = `<p style="color:var(--eqx-text-muted);font-size:0.85rem;">No admins found in Firestore.</p>`;
      return;
    }

    // Sort: super_admin first, then alphabetical
    const sorted = [...admins].sort((a, b) => {
      if (a.role === 'super_admin' && b.role !== 'super_admin') return -1;
      if (b.role === 'super_admin' && a.role !== 'super_admin') return  1;
      return (a.email || '').localeCompare(b.email || '');
    });

    listEl.innerHTML = sorted.map(admin => {
      const initials = (admin.displayName || admin.email || '?')[0].toUpperCase();
      const isProtected = admin.email === SUPER_ADMIN_EMAIL;
      const canDelete = isSuperAdmin && !isProtected;

      return `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
          <div style="display:flex;align-items:center;gap:14px;">
            <div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,rgba(223,96,68,0.25),rgba(223,96,68,0.05));border:1px solid rgba(223,96,68,0.25);display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--eqx-primary);font-size:0.95rem;">${initials}</div>
            <div>
              <div style="font-size:0.88rem;font-weight:600;color:var(--eqx-text-light);">${admin.displayName || '—'}</div>
              <div style="font-size:0.78rem;color:var(--eqx-text-muted);">${admin.email}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            ${roleLabel(admin.role)}
            ${
              canDelete
                ? `<button onclick="window.settingsDeleteAdmin('${admin.email}')" style="background:rgba(223,96,68,0.1);border:1px solid rgba(223,96,68,0.25);color:#DF6044;padding:5px 12px;border-radius:100px;font-size:0.75rem;cursor:pointer;transition:all 0.15s;" onmouseover="this.style.background='rgba(223,96,68,0.25)'" onmouseout="this.style.background='rgba(223,96,68,0.1)'">Remove</button>`
                : (isProtected ? `<span style="font-size:0.72rem;color:var(--eqx-text-muted);opacity:0.5;">🔒 Protected</span>` : '')
            }
          </div>
        </div>
      `;
    }).join('');
  });
}

// Client Booking Notification & Email Preview system
window.triggerEmailPreview = function(bookingId) {
  // Find booking
  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) {
    showNotification("Error: Booking not found.", "error");
    return;
  }

  // Find related lead or contact to get email
  const lead = leads.find(l => l.id === booking.leadId || (l.firstName + " " + l.lastName) === booking.leadName);
  const contact = contacts.find(c => c.id === booking.leadId || c.name === booking.leadName);
  const clientEmail = (lead && lead.email) || (contact && contact.email) || "client@eqx.audio";
  const clientName = booking.leadName || "Valued Client";

  // Fill in details in the preview modal
  const modal = document.getElementById("email-preview-modal");
  const toEl = document.getElementById("email-preview-to");
  const clientNameEl = document.getElementById("email-client-name");
  const dateEl = document.getElementById("email-session-date");
  const durationEl = document.getElementById("email-session-duration");
  const roomEl = document.getElementById("email-session-room");
  const directionsEl = document.getElementById("email-session-directions");
  const customNotesEl = document.getElementById("email-custom-notes");

  const cleanRoomName = (r) => {
    if (!r) return "";
    return r
      .replace(/Workspace Alpha/g, "Control Room")
      .replace(/Studio A/g, "Control Room")
      .replace(/Workspace Beta/g, "Recording Stage")
      .replace(/Studio B & VIP Lounge/g, "Recording Stage & VIP Lounge")
      .replace(/Studio B/g, "Recording Stage")
      .replace(/Workspace Gamma/g, "Creative Lounge")
      .replace(/Studio C/g, "Creative Lounge")
      .replace(/Studio D/g, "Field Operations")
      .replace(/Studio E/g, "Recording Stage & VIP Lounge");
  };

  const cleanedRoom = cleanRoomName(booking.room);

  if (toEl) toEl.textContent = clientEmail;
  if (clientNameEl) clientNameEl.textContent = clientName;
  if (dateEl) dateEl.textContent = `June ${booking.date}, 2026`;
  if (durationEl) durationEl.textContent = `${booking.duration} Hours`;
  if (roomEl) roomEl.textContent = cleanedRoom;

  // Resolve directions based on room name or lead data
  const isSweden = cleanedRoom.includes("VIP Lounge") || cleanedRoom.includes("Studio B") || (lead && lead.location && (lead.location.includes("SE") || lead.location.includes("Landskrona")));
  if (isSweden) {
    directionsEl.innerHTML = `📍 <strong>Studio Address:</strong> Gamla Kyrkogatan 21, Landskrona, Sweden, 26131.<br/>🚙 <strong>Directions:</strong> Located in the historic town center. Please use the street parking on Gamla Kyrkogatan or the nearby public lot. At the entrance, use the intercom to call the engineering desk.`;
  } else {
    directionsEl.innerHTML = `📍 <strong>Studio Address:</strong> 123 Industrial Rd, Huntsville, AL 35801.<br/>🚙 <strong>Directions:</strong> Located in the main industrial tech hub. Free customer parking is available directly in front of the building in spots marked EQX. Access the lobby via the front double glass doors.`;
  }

  // Clear custom notes
  if (customNotesEl) customNotesEl.value = "";

  // Activate Modal
  if (modal) modal.classList.add("active");

  // Wire buttons inside the modal
  const closeBtn = document.getElementById("close-email-modal-btn");
  const cancelBtn = document.getElementById("cancel-email-btn");
  const sendBtn = document.getElementById("send-simulated-email-btn");

  const closeModal = () => {
    modal.classList.remove("active");
  };

  if (closeBtn) closeBtn.onclick = closeModal;
  if (cancelBtn) cancelBtn.onclick = closeModal;
  
  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };
  }

  if (sendBtn) {
    sendBtn.onclick = async () => {
      const overlay = document.getElementById("email-send-status-overlay");
      const progress = document.getElementById("email-status-progress");
      const title = document.getElementById("email-status-title");
      const desc = document.getElementById("email-status-desc");
      const icon = document.getElementById("email-status-icon");

      // Show overlay and start animation
      if (overlay) overlay.style.display = "flex";
      if (progress) progress.style.width = "0%";
      if (title) title.textContent = "Connecting to Mail Service...";
      if (desc) desc.textContent = "Opening SMTP handshake tunnel...";
      if (icon) icon.textContent = "✉️";

      // Stage 1 — connecting
      await new Promise(r => setTimeout(r, 500));
      if (progress) progress.style.width = "25%";
      if (desc) desc.textContent = "Resolving secure SMTP tunnel...";

      // Gather data
      const customNotes = customNotesEl ? customNotesEl.value.trim() : "";
      const payload = {
        to: clientEmail,
        clientName: `${lead.firstName || "Valued"} ${lead.lastName || "Client"}`,
        date: `June ${booking.date}, 2026`,
        duration: `${booking.duration || 2} Hour${(booking.duration || 2) !== 1 ? "s" : ""}`,
        room: cleanedRoom || booking.type || "Studio",
        isSweden: isSweden,
        customNotes: customNotes
      };

      // Stage 2 — sending
      if (progress) progress.style.width = "60%";
      if (desc) desc.textContent = "Sending encrypted confirmation payload...";

      let success = false;
      let errorMsg = "";
      try {
        const FUNCTION_URL = "https://sendbookingemail-ykjhatmata-uc.a.run.app";
        const response = await fetch(FUNCTION_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const result = await response.json();
        success = result.success === true;
        if (!success) errorMsg = result.error || "Unknown error";
      } catch (err) {
        errorMsg = err.message;
      }

      // Stage 3 — result
      if (progress) progress.style.width = "100%";
      if (success) {
        if (title) title.textContent = "Notification Sent!";
        if (desc) desc.textContent = `Email delivered to ${clientEmail}`;
        if (icon) icon.textContent = "✅";
      } else {
        if (title) title.textContent = "Delivery Failed";
        if (desc) desc.textContent = `Error: ${errorMsg}`;
        if (icon) icon.textContent = "❌";
      }

      await new Promise(r => setTimeout(r, 2000));
      if (overlay) overlay.style.display = "none";
      closeModal();

      if (success) {
        // Record activity log on Lead record
        if (lead) {
          const notesStr = `Sent booking confirmation email to ${clientEmail} for ${booking.type} session in ${booking.room} on June ${booking.date}. ${customNotes ? 'Custom arrival notes: "' + customNotes + '"' : ''}`;
          if (!lead.activity) lead.activity = [];
          lead.activity.unshift({
            timestamp: new Date().toISOString(),
            type: "email",
            notes: notesStr
          });
          saveLocalState();
          if (isFirebaseConnected) {
            saveToFirestore('leads', lead.id, lead);
          }
        }
        showNotification(`Booking confirmation email sent to ${clientEmail}!`);
        refreshData();
      } else {
        showNotification(`Failed to send email: ${errorMsg}`, "error");
      }
    };
  }
};
