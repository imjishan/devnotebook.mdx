import React from 'react';
import { BlogPost } from '../types';

interface HomeProps {
  posts: BlogPost[];
  onNavigatePost: (slug: string) => void;
}

export const Home: React.FC<HomeProps> = ({ posts, onNavigatePost }) => {
  return (
    <div className="space-y-16">
      <div className="mb-12">
        <h2 className="text-lg font-mono text-gray-500 mb-2">/latest</h2>
      </div>
      {posts.map(post => (
        <article key={post.slug} className="group relative">
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
            <h2 className="text-2xl font-bold">
              <button
                onClick={() => onNavigatePost(post.slug)}
                className="text-left before:absolute before:inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black rounded-sm group-hover:underline decoration-2 decoration-gray-300 underline-offset-4"
              >
                {post.title}
              </button>
            </h2>
            <span className="font-mono text-xs text-gray-400 shrink-0">{post.date}</span>
          </div>
          <p className="text-gray-600 leading-relaxed max-w-prose">
            {post.description}
          </p>
          <div className="mt-3 flex gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full">
                {post.category}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
};
