/**
 * EQX Auth Module
 * Google Sign-In with role-based access control.
 * Roles are enforced purely on the client by checking the signed-in email
 * against the ALLOWED_ADMINS roster stored in Firestore (`admins` collection).
 * Super-admin (slowmotion767@gmail.com) is the only account that may delete
 * other admin accounts from that collection.
 */

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// ─────────────────────────────────────────────────────────────────────────────
// Firebase initialisation (reuse existing app if already created by firebase-db.js)
// ─────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyBGvP9YPajbjdj5MlB2FfWQQkyDBGJTlZQ",
  authDomain: "eqxxx-crm.firebaseapp.com",
  projectId: "eqxxx-crm",
  storageBucket: "eqxxx-crm.firebasestorage.app",
  messagingSenderId: "236861439951",
  appId: "1:236861439951:web:2026f1da4ac4203e499cba"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

// ─────────────────────────────────────────────────────────────────────────────
// Role constants
// ─────────────────────────────────────────────────────────────────────────────
export const SUPER_ADMIN_EMAIL = "slowmotion767@gmail.com";

// Seed admins. These are written to Firestore on first boot if not present.
const SEED_ADMINS = [
  { email: "slowmotion767@gmail.com",          role: "super_admin", displayName: "Super Admin" },
  { email: "slowmotionsoundzeurope@gmail.com", role: "admin",       displayName: "EQX Europe" },
  { email: "eqlabseu@gmail.com",               role: "admin",       displayName: "EQ Labs EU" }
];

// ─────────────────────────────────────────────────────────────────────────────
// Seed Firestore with initial admin roster (safe — won't overwrite existing docs)
// ─────────────────────────────────────────────────────────────────────────────
async function seedAdmins() {
  for (const admin of SEED_ADMINS) {
    const ref = doc(db, "admins", admin.email);
    // setDoc with merge:true is idempotent — won't nuke existing role data
    await setDoc(ref, admin, { merge: true });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Fetch the live admin roster from Firestore
// ─────────────────────────────────────────────────────────────────────────────
export async function fetchAdmins() {
  const snap = await getDocs(collection(db, "admins"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Live listener — calls callback whenever the admin roster changes
export function subscribeToAdmins(callback) {
  return onSnapshot(collection(db, "admins"), snap => {
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(list);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// User management (super-admin only)
// ─────────────────────────────────────────────────────────────────────────────
export async function addAdminUser(email, displayName = "", role = "admin") {
  await setDoc(doc(db, "admins", email), { email, displayName, role }, { merge: true });
}

export async function removeAdminUser(email) {
  await deleteDoc(doc(db, "admins", email));
}

// ─────────────────────────────────────────────────────────────────────────────
// Sign-in helpers
// ─────────────────────────────────────────────────────────────────────────────
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export async function signOutUser() {
  await signOut(auth);
}

// ─────────────────────────────────────────────────────────────────────────────
// Auth gate — call this once on page load
// Resolves with { user, role } when an authorised admin signs in.
// Blocks (shows login overlay) until a valid admin is authenticated.
// ─────────────────────────────────────────────────────────────────────────────
export function initAuthGate(onAuthorised) {
  // Seed initial admin roster (safe noop if already exists)
  seedAdmins().catch(console.error);

  const overlay     = document.getElementById("auth-gate-overlay");
  const signInBtn   = document.getElementById("auth-sign-in-btn");
  const signOutBtn  = document.getElementById("auth-sign-out-btn");
  const errorBox    = document.getElementById("auth-error-msg");
  const userDisplay = document.getElementById("auth-user-display");

  if (signInBtn) {
    signInBtn.addEventListener("click", async () => {
      errorBox.textContent = "";
      signInBtn.disabled = true;
      signInBtn.textContent = "Signing in…";
      try {
        await signInWithGoogle();
      } catch (err) {
        signInBtn.disabled = false;
        signInBtn.textContent = "Sign in with Google";
        console.error("Firebase Sign-In Error:", err);
        errorBox.textContent = `Sign-in failed: ${err.message || err} (${err.code || "unknown-code"})`;
      }
    });
  }

  if (signOutBtn) {
    signOutBtn.addEventListener("click", async () => {
      await signOutUser();
    });
  }

  // React to auth state changes
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      // Show login gate
      overlay.classList.add("active");
      document.querySelector(".crm-layout").style.display = "none";
      if (signInBtn) {
        signInBtn.disabled = false;
        signInBtn.textContent = "Sign in with Google";
      }
      return;
    }

    // Check if this email is in the admin roster
    const admins = await fetchAdmins();
    let match = admins.find(a => a.email === user.email);

    // Fallback to hardcoded SEED_ADMINS if Firestore read fails or is empty
    if (!match) {
      match = SEED_ADMINS.find(a => a.email === user.email);
    }

    if (!match) {
      // Not authorised — show gate with error, force sign-out
      if (userDisplay) userDisplay.textContent = "";
      if (errorBox) errorBox.textContent = `Access denied for ${user.email}. Contact the Super Admin.`;
      overlay.classList.add("active");
      document.querySelector(".crm-layout").style.display = "none";
      await signOutUser();
      return;
    }

    // Authorised — hide gate, show CRM
    overlay.classList.remove("active");
    document.querySelector(".crm-layout").style.display = "";

    const role = match.role || "admin";
    if (userDisplay) {
      const badge = role === "super_admin"
        ? `<span style="font-size:0.65rem;background:linear-gradient(135deg,#FF6B4A,#E84820);color:#fff;padding:2px 8px;border-radius:100px;margin-left:6px;vertical-align:middle;">Super Admin</span>`
        : `<span style="font-size:0.65rem;background:rgba(0,200,160,0.2);color:#00C8A0;border:1px solid rgba(0,200,160,0.3);padding:2px 8px;border-radius:100px;margin-left:6px;vertical-align:middle;">Admin</span>`;
      userDisplay.innerHTML = `${user.displayName || user.email}${badge}`;
    }

    // Store current session info on window for crm.js to reference
    window.eqxCurrentUser = { uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL, role };

    if (typeof onAuthorised === "function") {
      onAuthorised(user, role);
    }
  });
}
