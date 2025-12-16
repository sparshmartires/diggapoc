// digga/lib/firebase-client.ts
import { initializeApp, getApps } from 'firebase/app';

import { getFirestore, doc, setDoc } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Public key
  authDomain: "YOUR_DOMAIN.firebaseapp.com",
  projectId: "dataconnect-poc",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Get services
export const db = getFirestore(app);
// New function to write a document using a unique ID
export async function createTestUser(name: string) {
    const uniqueId = `web_trigger_${Date.now()}`;
    const userDocRef = doc(db, "users", uniqueId);
    
    // This action (setDoc) is what should fire your Cloud Function trigger!
    await setDoc(userDocRef, { 
        name: name,
        email: `${name.toLowerCase()}@app.com`,
        timestamp: new Date()
    });
    console.log(`Successfully wrote document users/${uniqueId}`);
    return uniqueId;
}
// export const auth = getAuth(app); 
// ... and other client services