const fs = require('fs');
let code = fs.readFileSync('js/crm.js', 'utf8');

// Replace createNewLead
const newCreateNewLead = `window.createNewLead = function(firstName, lastName, email, phone, company, dealValue, location, source) {
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
};`;

code = code.replace(/window\.createNewLead = function\([\s\S]*?return true;\s*};/, newCreateNewLead);

// Replace createNewProject
const newCreateNewProject = `window.createNewProject = function(title, client, category, notes) {
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
};`;

code = code.replace(/window\.createNewProject = function\([\s\S]*?return true;\s*};/, newCreateNewProject);

fs.writeFileSync('js/crm.js', code);
