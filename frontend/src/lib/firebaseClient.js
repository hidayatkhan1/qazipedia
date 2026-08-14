import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// True only once .env is actually filled in with a real project's
// config. Everywhere else in the app should check this flag rather
// than assuming Firebase is available - see src/lib/adminStorage.js
// for the pattern.
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

let app, auth, db, storage;

if (isFirebaseConfigured) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} else {
  // Not configured yet - every export stays undefined. Code that
  // depends on these must check isFirebaseConfigured first (the
  // localStorage-backed placeholder in adminStorage.js already does).
  if (import.meta.env.DEV) {
    console.info(
      "[QaziPedia] Firebase env vars not set - running in local demo mode " +
        "(localStorage). Fill in .env to connect a real Firebase project. " +
        "See DEPLOYMENT.md."
    );
  }
}

export { app, auth, db, storage };
