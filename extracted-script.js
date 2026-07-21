
    import { initCRM } from './js/crm.js?v=8';

    // Initialize Main CRM Modules
    initCRM({
      toggleDbModeBtn: document.getElementById("crm-db-toggle")
    });

    // Handle Manual Lead Submission Modals
    const leadModal = document.getElementById("add-lead-modal");
    const openLeadBtn = document.getElementById("open-lead-modal-btn");
    const closeLeadBtn = document.getElementById("close-lead-modal-btn");

    openLeadBtn.addEventListener("click", () => leadModal.classList.add("active"));
    closeLeadBtn.addEventListener("click", () => leadModal.classList.remove("active"));
    leadModal.addEventListener("click", (e) => {
      if (e.target === leadModal) leadModal.classList.remove("active");
    });

    // Handle Project Creation Modals
    window.openProjectModal = () => {
      const projModal = document.getElementById("add-project-modal");
      if (projModal) projModal.classList.add("active");
    };

    const projModal = document.getElementById("add-project-modal");
    const closeProjBtn = document.getElementById("close-project-modal-btn");
    if (closeProjBtn) closeProjBtn.addEventListener("click", () => projModal.classList.remove("active"));
    if (projModal) {
      projModal.addEventListener("click", (e) => {
        if (e.target === projModal) projModal.classList.remove("active");
      });
    }

    // Submit form mapping
    window.submitManualLead = () => {
      const firstName = document.getElementById("lead-first-name").value;
      const lastName = document.getElementById("lead-last-name").value;
      const email = document.getElementById("lead-email").value;
      const phone = document.getElementById("lead-phone").value;
      const company = document.getElementById("lead-company").value;
      const value = document.getElementById("lead-value").value;
      const loc = document.getElementById("lead-location").value;

      const success = window.createNewLead(firstName, lastName, email, phone, company, value, loc, "manual");
      if (success) {
        leadModal.classList.remove("active");
        document.getElementById("add-lead-form").reset();
      }
    };

    // Submit Project Form
    window.submitManualProject = () => {
      const title = document.getElementById("project-form-title").value;
      const client = document.getElementById("project-form-client").value;
      const category = document.getElementById("project-form-category").value;
      const notes = document.getElementById("project-form-notes").value;

      const success = window.createNewProject(title, client, category, notes);
      if (success) {
        projModal.classList.remove("active");
        document.getElementById("add-project-form").reset();
      }
    };
  