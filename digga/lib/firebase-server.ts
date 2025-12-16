// digga/lib/firebase-server.ts (Final Realistic Admin SDK)
import * as admin from 'firebase-admin';
import { NextRequest } from 'next/server';

// Initialize the Firebase Admin SDK only once
if (!admin.apps.length) {
  admin.initializeApp({
    // Assumes environment setup for credentials, e.g., using FIREBASE_CONFIG env var
    credential: admin.credential.applicationDefault(), 
  });
}

const db = admin.firestore();

// Define a basic structure for the User data we expect from Firestore
interface UserData { 
    name: string; 
    recent: { id: number, description: string }[]; 
}

// --- Firestore Utility Functions (used by Server Components & API routes) ---
export const firestoreServer = {
  /**
   * Fetches complex, user-specific data from the server.
   * Path: 'users/{uid}'
   * Used by app/(dynamic)/dashboard/page.tsx
   */
  async getUserData(uid: string): Promise<UserData> {
    const docRef = db.collection('users').doc(uid); 
    console.log(`[Admin SDK] Attempting read at: ${docRef.path}`);
    
    const docSnap = await docRef.get();
    
    if (docSnap.exists) {
        // Cast the data to our interface structure
        const data = docSnap.data() as UserData;
        console.log(`[Admin SDK] Successfully fetched user data.`);
        return data;
    }

    // Handle the case where the user document does not exist
    console.warn(`[Admin SDK] User document not found for: ${uid}. Returning default data.`);
    return { 
      name: 'Default New User', 
      recent: [{ id: 0, description: 'No activity found. Create a document in Firestore to see real data.' }]
    };
  },
  
  /**
   * Fetches profile data securely via a Next.js Route Handler.
   * Path: 'profiles/{uid}'
   * Used by app/api/user/profile/route.ts
   */
  async getUserProfile(uid: string): Promise<{ email: string, bio: string }> {
    const docRef = db.collection('profiles').doc(uid); 
    console.log(`[Admin SDK] Attempting read at: ${docRef.path}`);

    const docSnap = await docRef.get();

    if (docSnap.exists) {
        const data = docSnap.data() as { email: string, bio: string };
        return data;
    }

    // Handle not found
    console.warn(`[Admin SDK] Profile document not found for: ${uid}.`);
    return {
      email: `user-${uid}@default.com`,
      bio: 'Profile data unavailable.',
    };
  },
};

// --- Dummy function (since we can't truly verify auth without a setup) ---
export async function getDummyUserId(): Promise<string> {
  console.log("Warning: Skipping token verification. Using static ID.");
  return "user_456_static";
}