import { BlogPost } from './types';

// In a real app, this would be Environment Variables
export const ADMIN_PASSWORD = "password123"; 

export const INITIAL_POSTS: BlogPost[] = [
  {
    slug: "engineering-minimalism",
    title: "The Art of Engineering Minimalism",
    description: "Why less is more when building scalable software architectures.",
    date: "2024-03-10",
    category: "Philosophy",
    tags: ["architecture", "minimalism"],
    coverImage: "https://picsum.photos/800/400",
    content: `
# The Art of Engineering Minimalism

Complexity is the enemy of reliability. As software engineers, we often feel the pull to add *just one more feature* or use the latest, shiniest framework.

## The Cost of Complexity

Every line of code you write is a liability. It must be read, understood, tested, and maintained.

> "Simplicity is the ultimate sophistication." - Leonardo da Vinci

## Practical Steps

1. **Delete code.** If it's not being used, kill it.
2. **Choose boring technology.** Standard tools fail less often.
3. **Focus on the core.** What is the user actually trying to do?

This blog itself is an experiment in minimalism. No database, no CMS, just MDX and Git.
    `
  },
  {
    slug: "react-server-components",
    title: "Understanding React Server Components",
    description: "A deep dive into how RSCs change the data fetching paradigm.",
    date: "2024-02-28",
    category: "Engineering",
    tags: ["react", "nextjs", "performance"],
    coverImage: "https://picsum.photos/800/401",
    content: `
# React Server Components

Server Components allow us to keep large dependencies on the server, resulting in smaller bundles for the client.

## Why it matters

Traditionally, we fetched data inside \`useEffect\`. This led to waterfalls.

\`\`\`javascript
// Old way
useEffect(() => {
  fetch('/api/data').then(data => setData(data));
}, []);
\`\`\`

With RSC, we fetch directly in the component body (async).

## Conclusion

It's a shift, but a welcome one for performance-critical applications.
    `
  }
];
