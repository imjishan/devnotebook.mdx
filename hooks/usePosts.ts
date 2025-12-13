import { useState } from 'react';
import { BlogPost } from '../types';
import { INITIAL_POSTS } from '../constants';

export const usePosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);

  const updateLocalPostList = (newPost: BlogPost) => {
    const existingIndex = posts.findIndex(p => p.slug === newPost.slug);
    if (existingIndex >= 0) {
        const updated = [...posts];
        updated[existingIndex] = newPost;
        setPosts(updated);
    } else {
        setPosts([newPost, ...posts]);
    }
  };

  const getPost = (slug: string) => {
    return posts.find(p => p.slug === slug);
  }

  return { posts, updateLocalPostList, getPost };
};
