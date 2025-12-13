import React from 'react';
import { BlogPost } from '../types';
import { SimpleMarkdown } from './SimpleMarkdown';

interface PostViewProps {
  post: BlogPost | null;
}

export const PostView: React.FC<PostViewProps> = ({ post }) => {
  if (!post) return null;
  return (
    <article>
      <header className="mb-10 text-center">
          <div className="flex justify-center gap-4 text-xs font-mono text-gray-400 mb-6 uppercase tracking-widest">
              <span>{post.date}</span>
              <span>/</span>
              <span>{post.category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8 text-gray-900">
              {post.title}
          </h1>
          {post.coverImage && (
              <div className="aspect-video w-full overflow-hidden rounded-sm bg-gray-100 mb-10">
                  <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
          )}
      </header>
      <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-black prose-a:underline prose-code:text-gray-800 font-serif">
          <SimpleMarkdown content={post.content} />
      </div>
    </article>
  );
};
