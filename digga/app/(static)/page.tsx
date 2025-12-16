// Force static generation - Next.js default but explicit is good.
export const dynamic = "force-static";

export default function LandingPage() {
  return (
    <main>
      <h1>Welcome to Digga - The Best App Ever</h1>
      <p>This page is globally CDN cached and extremely fast.</p>
      <a href="/dashboard">Go to Dashboard</a>
    </main>
  );
}