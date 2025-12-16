// digga/app/(dynamic)/profile/page.tsx (Updated)
"use client";

import { useState, useEffect } from 'react';
import { createTestUser, db } from '../../../lib/firebase-client'; // Client-side Firebase SDK
import { onSnapshot, doc } from "firebase/firestore";

export default function UserProfile() {
  const [profile, setProfile] = useState<any>(null);
  // Using a static ID for the POC
  const userId = 'user_456_static'; 
const handleTrigger = async () => {
      await createTestUser("TestUser");
      alert("User document created! Check your terminal for function logs.");
  };
  useEffect(() => {
    // Real-time listener using the Client SDK
    const unsubscribe = onSnapshot(doc(db, "users", userId), (docSnap) => {
      if (docSnap.exists()) {
        setProfile(docSnap.data());
        console.log("Client: Real-time update received.");
      } else {
        setProfile({ email: `user-${userId}@default.com`, bio: "Default client profile. Create doc in Firestore!" });
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  if (!profile) return <div>Loading real-time profile...</div>;

  return (
    <div>
    
      <p>This page uses  the Firebase Client SDK's `onSnapshot` to get live data.</p>
      <p>Email: **{profile.email}**</p>
      <p>Bio: **{profile.bio}**</p>
      <small>Watching Firestore document: `users/{userId}`</small>
      <button onClick={handleTrigger} style={{ padding: '10px', marginTop: '20px' }}>
          CLICK TO FIRE onUserCreate FUNCTION
      </button>
    </div>
  );
}