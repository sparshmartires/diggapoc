// digga/app/(dynamic)/dashboard/page.tsx (Updated)
import { firestoreServer, getDummyUserId } from '../../../lib/firebase-server'; 

// Forces dynamic rendering (SSR)
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Use a dummy ID since we are skipping auth setup
  const userId = await getDummyUserId(); 
  
  // Fetch user-specific data using the Admin SDK on the server
  const userData = await firestoreServer.getUserData(userId); 
  
  return (
    <div>
      <h1>Welcome back, {userData.name}!</h1>
      <p>This page runs on the server (SSR) and uses the Firebase Admin SDK to fetch data securely based on a user ID ({userId}).</p>
     
    </div>
  );
}