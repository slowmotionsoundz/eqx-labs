# Firebase Integration Guidance

Use standard, secure modular patterns when interacting with Firebase Services:

## Configuration
- Maintain environment configurations in a central configuration module (`js/firebase-config.js`).
- Never expose sensitive private keys or database operations directly on clientside code without security rules.
- Ensure Firestore collection structures mirror the digital logistics models.

## Operations
- Use standard asynchronous imports for modular Firebase scripts.
- Use `firebase/firestore` queries with proper pagination or constraint mapping.
- Keep auth states handled reactively using standard listener patterns (`onAuthStateChanged`).
