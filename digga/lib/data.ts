// digga/lib/data.ts

// This file simulates fetching data from a CMS or external API.
// In a real application, this is where you'd use a Firestore client, 
// a dedicated API client, or simply 'fetch()'.

interface BlogPost {
  title: string;
  content: string;
  id: string;
}

const MOCK_BLOG_DATA: Record<string, BlogPost> = {
  'first-post': {
    title: 'Hello Next.js & Firebase!',
    content: 'This is the content of the first post. It is built using ISR.',
    id: '1',
  },
  'new-feature': {
    title: 'New Feature Announcement',
    content: 'Check out the new feature that relies on dynamic SSR data.',
    id: '2',
  },
};

/**
 * Fetches a blog post by its slug. Used by app/(static)/blog/[slug]/page.tsx
 */
export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  // Simulate an API delay
  await new Promise(resolve => setTimeout(resolve, 50)); 
  return MOCK_BLOG_DATA[slug] || null;
}