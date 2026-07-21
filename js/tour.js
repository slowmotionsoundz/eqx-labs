export const tourSteps = [
  {
    targetSelector: ".pipeline-column[data-status='qualified']",
    title: "1. The Pipeline Trigger",
    content: "When you drag a Lead into the Qualified column, the system automatically creates a Contact profile and drafts a new Project for them in the cloud.",
    tabId: "sidebar-tab-pipeline",
    position: "right"
  },
  {
    targetSelector: "#crm-tab-projects",
    title: "2. Project Workspaces",
    content: "Here is where the auto-generated project lives. Once you define the scope and services required, the system will auto-calculate a quote.",
    tabId: "sidebar-tab-projects", 
    position: "bottom"
  },
  {
    targetSelector: "#projects-list-container",
    title: "Project Cards",
    content: "Click on a project card to add deliverables. The Cloud Function will detect the deliverables and generate a Quote.",
    tabId: "sidebar-tab-projects",
    position: "right"
  },
  {
    targetSelector: "#crm-tab-calendar",
    title: "3. Multi-Room Calendar",
    content: "Schedule the studio time needed for the project deliverables right here.",
    tabId: "sidebar-tab-calendar",
    position: "bottom"
  },
  {
    targetSelector: "#crm-tab-financials",
    title: "4. Financial Automation",
    content: "Based on your project scope and the pricing matrix, your Quote is automatically drafted here. Once the client approves the final files, this auto-converts to an Invoice.",
    tabId: "sidebar-tab-financials",
    position: "bottom"
  },
  {
    targetSelector: ".crm-toggle-container",
    title: "5. Cloud Database Sync",
    content: "Make sure this is toggled ON to save all actions to the live database!",
    tabId: "sidebar-tab-settings", // Switch to settings to end
    position: "bottom"
  }
];

let currentStep = 0;
let overlay, highlightBox, dialogBox;
let isTourActive = false;

export function initTour() {
  if (isTourActive) return;
  isTourActive = true;
  currentStep = 0;

  // Build UI
  const root = document.getElementById("tour-anchor-root");
  if (!root) {
    console.error("Tour root element not found.");
    return;
  }

  root.innerHTML = `
    <div class="tour-overlay" id="tour-overlay"></div>
    <div class="tour-highlight" id="tour-highlight"></div>
    <div class="tour-dialog" id="tour-dialog">
      <h3 id="tour-title"></h3>
      <p id="tour-content"></p>
      <div class="tour-controls">
        <span class="tour-step-indicator" id="tour-step-indicator"></span>
        <div>
          <button class="tour-btn tour-btn-skip" id="tour-btn-skip">Skip</button>
          <button class="tour-btn tour-btn-next" id="tour-btn-next">Next</button>
        </div>
      </div>
    </div>
  `;

  overlay = document.getElementById("tour-overlay");
  highlightBox = document.getElementById("tour-highlight");
  dialogBox = document.getElementById("tour-dialog");

  document.getElementById("tour-btn-skip").addEventListener("click", endTour);
  document.getElementById("tour-btn-next").addEventListener("click", nextStep);

  // Start
  setTimeout(() => {
    overlay.classList.add("active");
    renderStep();
  }, 100);
}

function endTour() {
  isTourActive = false;
  if(overlay) {
    overlay.classList.remove("active");
    overlay.style.clipPath = "none";
  }
  if(dialogBox) dialogBox.classList.remove("active");
  if(highlightBox) {
    highlightBox.style.boxShadow = "none";
    highlightBox.style.opacity = "0";
  }
  
  setTimeout(() => {
    const root = document.getElementById("tour-anchor-root");
    if(root) root.innerHTML = "";
  }, 400);
}

function nextStep() {
  currentStep++;
  if (currentStep >= tourSteps.length) {
    endTour();
  } else {
    renderStep();
  }
}

function renderStep() {
  const step = tourSteps[currentStep];
  
  // Switch tab if necessary
  if (step.tabId) {
    const tabLink = document.getElementById(step.tabId);
    if (tabLink) {
      tabLink.click();
    }
  }

  let retries = 0;
  const maxRetries = 20; // 20 * 50ms = 1000ms

  function attemptRender() {
    const targetEl = document.querySelector(step.targetSelector);
    
    if (!targetEl && retries < maxRetries) {
      retries++;
      setTimeout(attemptRender, 50);
      return;
    }

    // Update dialog content
    document.getElementById("tour-title").textContent = step.title;
    document.getElementById("tour-content").textContent = step.content;
    document.getElementById("tour-step-indicator").textContent = `${currentStep + 1} of ${tourSteps.length}`;
    
    if (currentStep === tourSteps.length - 1) {
      document.getElementById("tour-btn-next").textContent = "Finish";
    } else {
      document.getElementById("tour-btn-next").textContent = "Next";
    }

    // Position Dialog Box
    dialogBox.classList.add("active");
    const dialogRect = dialogBox.getBoundingClientRect();
    
    let dialogTop, dialogLeft;
    
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      const padding = 8;
      const L = rect.left - padding;
      const T = rect.top - padding;
      const R = rect.right + padding;
      const B = rect.bottom + padding;
      
      // Position highlight box
      highlightBox.style.top = `${T}px`;
      highlightBox.style.left = `${L}px`;
      highlightBox.style.width = `${R - L}px`;
      highlightBox.style.height = `${B - T}px`;
      highlightBox.style.boxShadow = "0 0 20px var(--neon-cyan)";
      highlightBox.style.border = "2px solid var(--neon-cyan)";
      highlightBox.style.opacity = "1";

      // Cut a transparent hole in the overlay!
      if (overlay) {
        overlay.style.clipPath = `polygon(
          0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 
          ${L}px ${T}px, 
          ${L}px ${B}px, 
          ${R}px ${B}px, 
          ${R}px ${T}px, 
          ${L}px ${T}px
        )`;
      }

      // Position Dialog Box based on target position
      if (step.position === "right") {
        dialogTop = rect.top;
        dialogLeft = rect.right + 24;
        if (dialogLeft + 320 > window.innerWidth) { // overflow fallback
          dialogLeft = rect.left;
          dialogTop = rect.bottom + 24;
        }
      } else if (step.position === "bottom") {
        dialogTop = rect.bottom + 24;
        dialogLeft = rect.left;
      } else if (step.position === "left") {
        dialogTop = rect.top;
        dialogLeft = rect.left - 320 - 24;
        if (dialogLeft < 0) { // overflow fallback
          dialogLeft = rect.right + 24;
        }
      } else {
        dialogTop = rect.bottom + 24;
        dialogLeft = rect.left;
      }
    } else {
      // Fallback positioning: center the dialog box if target is not found
      console.warn("Tour target not found after retries, fallback to centering:", step.targetSelector);
      
      // Hide highlight box and remove the cut path from overlay
      highlightBox.style.opacity = "0";
      highlightBox.style.boxShadow = "none";
      highlightBox.style.border = "none";
      if (overlay) {
        overlay.style.clipPath = "none";
      }

      // Default dimensions fallback if rect is 0 initially
      const w = dialogRect.width || 320;
      const h = dialogRect.height || 180;
      dialogTop = (window.innerHeight - h) / 2;
      dialogLeft = (window.innerWidth - w) / 2;
    }

    // Keep dialog inside screen
    if (dialogTop + dialogRect.height > window.innerHeight) {
      dialogTop = window.innerHeight - dialogRect.height - 20;
    }
    if (dialogTop < 20) {
      dialogTop = 20;
    }
    if (dialogLeft + dialogRect.width > window.innerWidth) {
      dialogLeft = window.innerWidth - dialogRect.width - 20;
    }
    if (dialogLeft < 20) {
      dialogLeft = 20;
    }

    dialogBox.style.top = `${dialogTop}px`;
    dialogBox.style.left = `${dialogLeft}px`;
  }

  // Run the render attempt
  attemptRender();
}

// Global exposure
window.startInteractiveTour = initTour;
