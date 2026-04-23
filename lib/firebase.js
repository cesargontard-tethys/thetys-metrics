import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDiVk7NqIgHqcXlLOE6vlPuwaChtW6IgQc",
  authDomain: "thetys-metrics.firebaseapp.com",
  projectId: "thetys-metrics",
  storageBucket: "thetys-metrics.firebasestorage.app",
  messagingSenderId: "951524888525",
  appId: "1:951524888525:web:5d30a9e53ad12ce34c3e84",
  measurementId: "G-SPRGQJ9EBH",
};

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const getFirebaseAnalytics = async () => {
  if (typeof window === "undefined") return null;
  const supported = await isSupported().catch(() => false);
  return supported ? getAnalytics(firebaseApp) : null;
};
