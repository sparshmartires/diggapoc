// functions/src/triggers/onUserCreate.ts (V1 Fix)

// CHANGE: Explicitly import the V1 functions types
import * as functions from "firebase-functions/v1"; 
import * as admin from 'firebase-admin'; // Use Admin SDK

// Initialize Admin SDK once
if (!admin.apps.length) {
    admin.initializeApp();
}


// Triggered when a new document is created in the 'users' collection
// This V1 syntax now works: functions.firestore.document(...)
export const onUserCreate = functions.firestore
  .document('users/{userId}')
  .onCreate(async (snap, context) => {
    // ... (rest of the logic is unchanged)
    const userId = context.params.userId;

    console.log(`New user created: ${userId}`);
    
    // Using the V1 style of accessing admin.firestore
    await admin.firestore().collection('profiles').doc(userId).set({ 
      isSetupComplete: false,
      creationDate: new Date(),
    });
    
    return null;
  });