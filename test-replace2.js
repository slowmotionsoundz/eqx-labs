const fs = require('fs');
let code = fs.readFileSync('js/crm.js', 'utf8');

const listeners = `
let unsubscribes = [];

function setupFirebaseListeners() {
  if (!isFirebaseConnected) return;

  // Clear existing listeners
  unsubscribes.forEach(u => u());
  unsubscribes = [];

  unsubscribes.push(onSnapshot(collection(db, "leads"), (snapshot) => {
    if(!snapshot.empty) {
      leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      renderPipelineTab();
    }
  }));

  unsubscribes.push(onSnapshot(collection(db, "contacts"), (snapshot) => {
    if(!snapshot.empty) {
      contacts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      renderContactsList();
    }
  }));

  unsubscribes.push(onSnapshot(collection(db, "projects"), (snapshot) => {
    if(!snapshot.empty) {
      projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      renderProjectsTab();
    }
  }));

  unsubscribes.push(onSnapshot(collection(db, "bookings"), (snapshot) => {
    if(!snapshot.empty) {
      bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      renderCalendarTab();
    }
  }));

  unsubscribes.push(onSnapshot(collection(db, "financials"), (snapshot) => {
    if(!snapshot.empty) {
      financials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      renderFinancialsTab();
    }
  }));

  unsubscribes.push(onSnapshot(collection(db, "tasks"), (snapshot) => {
    if(!snapshot.empty) {
      tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      renderTodosTab();
    }
  }));
}
`;

code = code.replace(
  'function saveLocalState() {',
  listeners + '\nfunction saveLocalState() {'
);

code = code.replace(
  'isFirebaseConnected = e.target.checked;',
  'isFirebaseConnected = e.target.checked;\n      if(isFirebaseConnected) setupFirebaseListeners();'
);

fs.writeFileSync('js/crm.js', code);
