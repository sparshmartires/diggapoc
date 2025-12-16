// digga/app/api/user/profile/route.ts (Revised)

// 👇 CHANGE: Import the current placeholder function name
import { getDummyUserId, firestoreServer } from '../../../../lib/firebase-server'; 
import { NextRequest } from 'next/server';

// Server-side Route Handler
export async function GET(request: NextRequest) {
  try {
    // 1. Get a User ID (using the placeholder function)
    const uid = await getDummyUserId(); // Using the available function

    // 2. Use Firebase Admin SDK safely (Note: changed 'firestore' to 'firestoreServer')
    const profile = await firestoreServer.getUserProfile(uid); 

    return Response.json(profile);
  } catch (error) {
    console.error(error);
    return new Response('Unauthorized or Internal Error', { status: 401 });
  }
}