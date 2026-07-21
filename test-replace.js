const fs = require('fs');
let code = fs.readFileSync('js/crm.js', 'utf8');

code = code.replace(
  '// State Persistence Utilities',
  `import { db, saveToFirestore, deleteFromFirestore } from './firebase-db.js';
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// State Persistence Utilities`
);

fs.writeFileSync('js/crm.js', code);
