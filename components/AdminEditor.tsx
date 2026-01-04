import React, { useState, useEffect, useCallback } from 'react';
import { BlogPost, GithubConfig } from '../types';
import { generateSeoDescription, improveGrammar } from '../services/geminiService';
import { publishToGithub } from '../services/githubService';

interface AdminEditorProps {
  initialPost: Partial<BlogPost>;
  githubConfig: GithubConfig;
  onClose: () => void;
  onUpdateLocal: (post: BlogPost) => void;
}

export const AdminEditor: React.FC<AdminEditorProps> = ({
  initialPost,
  githubConfig,
  onClose,
  onUpdateLocal
}) => {
  const [editorPost, setEditorPost] = useState<Partial<BlogPost>>(initialPost);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{type: 'error' | 'success', text: string} | null>(null);

  useEffect(() => {
      setEditorPost(initialPost);
  }, [initialPost]);

  useEffect(() => {
    if (statusMsg?.type === 'success') {
      const timer = setTimeout(() => setStatusMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMsg]);

  const generateFileContent = () => {
      return `---
title: "${editorPost.title}"
slug: "${editorPost.slug}"
description: "${editorPost.description}"
date: "${new Date().toISOString().split('T')[0]}"
category: "${editorPost.category}"
tags: [${editorPost.tags?.map(t => `"${t}"`).join(', ')}]
coverImage: "${editorPost.coverImage || ''}"
draft: false
---

${editorPost.content}
`;
  };

  const handleDownloadFile = () => {
    if (!editorPost.title || !editorPost.slug) {
        setStatusMsg({ type: 'error', text: "Title and Slug are required." });
        return;
    }
    setStatusMsg(null);
    const fileContent = generateFileContent();
    const blob = new Blob([fileContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${editorPost.slug}.mdx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePublishToGithub = async () => {
      if (!editorPost.slug || !editorPost.title) {
          setStatusMsg({ type: 'error', text: "Please provide a Title and Slug." });
          return;
      }
      if (!githubConfig.token || !githubConfig.repo) {
          setStatusMsg({ type: 'error', text: "Please configure GitHub settings in the Dashboard first." });
          return;
      }

      setStatusMsg(null);
      setIsPublishing(true);
      const content = generateFileContent();
      const filename = `${editorPost.slug}.mdx`;
      const message = `feat(blog): update ${editorPost.slug}`;

      const result = await publishToGithub(githubConfig, filename, content, message);

      setIsPublishing(false);
      if (result.success) {
          setStatusMsg({ type: 'success', text: "Successfully published to GitHub! 🚀" });

          // Delay closing to let user see success message
          setTimeout(() => {
            const newPostObj = {
                ...editorPost as BlogPost,
                date: editorPost.date || new Date().toISOString().split('T')[0],
                tags: editorPost.tags || [],
            };
            onUpdateLocal(newPostObj);
            onClose(); // Go back to dashboard
          }, 1500);
      } else {
          setStatusMsg({ type: 'error', text: `Error: ${result.error}` });
      }
  };

  const handleAiGenerateDescription = useCallback(async () => {
      if (!editorPost.content) return;
      setIsProcessingAI(true);
      const desc = await generateSeoDescription(editorPost.content);
      setEditorPost(prev => ({ ...prev, description: desc }));
      setIsProcessingAI(false);
  }, [editorPost.content]);

  const handleAiFixGrammar = useCallback(async () => {
      if (!editorPost.content) return;
      setIsProcessingAI(true);
      const fixed = await improveGrammar(editorPost.content);
      setEditorPost(prev => ({ ...prev, content: fixed }));
      setIsProcessingAI(false);
  }, [editorPost.content]);

  return (
    <div className="flex flex-col h-full relative">
        <div className="flex justify-between items-center mb-6">
            <button onClick={onClose} className="text-sm text-gray-500 hover:text-black">← Back</button>

            <div className="flex items-center gap-4">
                {statusMsg && (
                    <div
                        role="alert"
                        className={`text-sm font-mono px-3 py-1 rounded-sm ${
                            statusMsg.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                        }`}
                    >
                        {statusMsg.text}
                    </div>
                )}

                <div className="flex gap-3">
                     <button
                        onClick={handleDownloadFile}
                        className="text-gray-500 hover:text-black px-4 py-2 font-mono text-sm underline focus-visible:ring-2 focus-visible:ring-black rounded-sm"
                    >
                        Download .mdx
                    </button>
                     <button
                        onClick={handlePublishToGithub}
                        disabled={isPublishing}
                        className="bg-black text-white px-6 py-2 font-mono text-sm hover:bg-gray-800 flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black rounded-sm"
                    >
                        {isPublishing ? (
                            <>
                                <span className="animate-spin" aria-hidden="true">⟳</span>
                                <span role="status">Publishing...</span>
                            </>
                        ) : (
                            <>
                                <span aria-hidden="true">↑</span> Publish to GitHub
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
                <input
                    type="text"
                    aria-label="Post Title"
                    placeholder="Post Title"
                    className="w-full text-2xl font-bold border-b border-gray-200 py-2 focus:outline-none focus:border-black"
                    value={editorPost.title}
                    onChange={(e) => setEditorPost({...editorPost, title: e.target.value})}
                />
                 <div className="flex gap-4">
                    <input
                        type="text"
                        aria-label="URL Slug"
                        placeholder="slug-url"
                        className="w-1/2 font-mono text-sm border-b border-gray-200 py-2 focus:outline-none focus:border-black text-gray-600"
                        value={editorPost.slug}
                        onChange={(e) => setEditorPost({...editorPost, slug: e.target.value})}
                    />
                     <input
                        type="text"
                        aria-label="Category"
                        placeholder="Category"
                        className="w-1/2 font-mono text-sm border-b border-gray-200 py-2 focus:outline-none focus:border-black text-gray-600"
                        value={editorPost.category}
                        onChange={(e) => setEditorPost({...editorPost, category: e.target.value})}
                    />
                 </div>

                 <div className="relative">
                    <label htmlFor="seo-desc" className="block text-xs font-mono text-gray-400 mb-1">SEO Description</label>
                    <textarea
                        id="seo-desc"
                        className="w-full border border-gray-200 p-2 text-sm focus:outline-none focus:border-black min-h-[80px]"
                        value={editorPost.description}
                        onChange={(e) => setEditorPost({...editorPost, description: e.target.value})}
                    />
                    <button
                        onClick={handleAiGenerateDescription}
                        disabled={isProcessingAI}
                        className="absolute right-2 bottom-2 text-xs bg-gray-100 px-2 py-1 hover:bg-gray-200 flex items-center gap-1"
                    >
                        {isProcessingAI ? 'Thinking...' : '✨ Generate with Gemini'}
                    </button>
                 </div>
            </div>

            <div className="bg-gray-50 p-4 border border-gray-100 rounded-sm">
                <h3 className="font-mono text-xs uppercase text-gray-400 mb-2">Live Preview</h3>
                <h1 className="text-xl font-bold mb-2">{editorPost.title || 'Untitled'}</h1>
                <p className="text-gray-600 text-sm italic mb-4">{editorPost.description}</p>
            </div>
        </div>

        <div className="relative flex-grow min-h-[500px]">
             <div className="absolute top-0 right-0 z-10 p-2">
                 <button
                    onClick={handleAiFixGrammar}
                    disabled={isProcessingAI}
                    className="bg-white border border-gray-200 text-xs px-3 py-1 shadow-sm hover:bg-gray-50 flex items-center gap-2"
                 >
                    {isProcessingAI ? 'Processing...' : '✨ Improve Grammar'}
                 </button>
             </div>
            <textarea
                aria-label="Markdown Content"
                className="w-full h-full p-6 font-mono text-sm leading-relaxed border border-gray-200 focus:outline-none resize-none bg-gray-50 text-gray-800"
                value={editorPost.content}
                onChange={(e) => setEditorPost({...editorPost, content: e.target.value})}
                placeholder="# Write your masterpiece..."
            />
        </div>
    </div>
  );
};
