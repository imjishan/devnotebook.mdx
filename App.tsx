import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout';
import { SimpleMarkdown } from './components/SimpleMarkdown';
import { BlogPost, ViewState, GithubConfig } from './types';
import { INITIAL_POSTS, ADMIN_PASSWORD } from './constants';
import { generateSeoDescription, improveGrammar } from './services/geminiService';
import { publishToGithub } from './services/githubService';

const App: React.FC = () => {
  // --- State ---
  const [viewState, setViewState] = useState<ViewState>(ViewState.HOME);
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  
  // Admin State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  
  // GitHub Config State
  const [githubConfig, setGithubConfig] = useState<GithubConfig>({
      owner: '',
      repo: '',
      path: 'posts', // Default folder
      token: '',
      branch: 'main'
  });
  const [showConfig, setShowConfig] = useState(false);

  const [editorPost, setEditorPost] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    category: 'Engineering',
    tags: [],
    content: '# New Post\n\nWrite something brilliant...',
    description: ''
  });
  
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // --- Effects ---
  useEffect(() => {
    // Load Admin Auth
    const savedAuth = localStorage.getItem('isAdmin');
    if (savedAuth === 'true') setIsAuthenticated(true);

    // Load GitHub Config
    const savedConfig = localStorage.getItem('githubConfig');
    if (savedConfig) {
        try {
            setGithubConfig(JSON.parse(savedConfig));
        } catch (e) { console.error("Failed to parse config"); }
    }
  }, []);

  // --- Handlers ---

  const handleNavigateHome = () => {
    setViewState(ViewState.HOME);
    setActivePost(null);
  };

  const handleNavigatePost = (slug: string) => {
    const post = posts.find(p => p.slug === slug);
    if (post) {
      setActivePost(post);
      setViewState(ViewState.POST);
      window.scrollTo(0,0);
    }
  };

  const handleNavigateAdmin = () => {
    if (isAuthenticated) {
      setViewState(ViewState.ADMIN_DASHBOARD);
    } else {
      setViewState(ViewState.ADMIN_LOGIN);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('isAdmin', 'true');
      setViewState(ViewState.ADMIN_DASHBOARD);
      setPasswordInput('');
    } else {
      alert('Access Denied');
    }
  };

  const handleSaveConfig = () => {
      localStorage.setItem('githubConfig', JSON.stringify(githubConfig));
      setShowConfig(false);
      alert("Configuration Saved");
  };

  const handleCreateNew = () => {
    setEditorPost({
        title: '',
        slug: '',
        category: 'Engineering',
        content: '# New Post\n\nStart writing...',
        tags: [],
        description: ''
    });
    setViewState(ViewState.ADMIN_EDITOR);
  };

  const handleEdit = (post: BlogPost) => {
      setEditorPost({ ...post });
      setViewState(ViewState.ADMIN_EDITOR);
  };

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
        alert("Title and Slug are required.");
        return;
    }
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
          alert("Please provide a Title and Slug.");
          return;
      }
      if (!githubConfig.token || !githubConfig.repo) {
          alert("Please configure GitHub settings in the Dashboard first.");
          return;
      }

      setIsPublishing(true);
      const content = generateFileContent();
      const filename = `${editorPost.slug}.mdx`;
      const message = `feat(blog): update ${editorPost.slug}`;

      const result = await publishToGithub(githubConfig, filename, content, message);
      
      setIsPublishing(false);
      if (result.success) {
          alert("Successfully published to GitHub! 🚀");
          // Update local state for immediate preview in app
          updateLocalPostList();
          setViewState(ViewState.ADMIN_DASHBOARD);
      } else {
          alert(`Error: ${result.error}`);
      }
  };

  const updateLocalPostList = () => {
    const newPostObj = {
        ...editorPost as BlogPost,
        date: editorPost.date || new Date().toISOString().split('T')[0],
        tags: editorPost.tags || [],
    };
    const existingIndex = posts.findIndex(p => p.slug === newPostObj.slug);
    if (existingIndex >= 0) {
        const updated = [...posts];
        updated[existingIndex] = newPostObj;
        setPosts(updated);
    } else {
        setPosts([newPostObj, ...posts]);
    }
  };

  // AI Helpers
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


  // --- Renderers ---

  const renderHome = () => (
    <div className="space-y-16">
      <div className="mb-12">
        <h2 className="text-lg font-mono text-gray-500 mb-2">/latest</h2>
      </div>
      {posts.map(post => (
        <article key={post.slug} className="group cursor-pointer" onClick={() => handleNavigatePost(post.slug)}>
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
            <h2 className="text-2xl font-bold group-hover:underline decoration-2 decoration-gray-300 underline-offset-4">
              {post.title}
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

  const renderPost = () => {
    if (!activePost) return null;
    return (
      <article>
        <header className="mb-10 text-center">
            <div className="flex justify-center gap-4 text-xs font-mono text-gray-400 mb-6 uppercase tracking-widest">
                <span>{activePost.date}</span>
                <span>/</span>
                <span>{activePost.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8 text-gray-900">
                {activePost.title}
            </h1>
            {activePost.coverImage && (
                <div className="aspect-video w-full overflow-hidden rounded-sm bg-gray-100 mb-10">
                    <img src={activePost.coverImage} alt={activePost.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
            )}
        </header>
        <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-black prose-a:underline prose-code:text-gray-800 font-serif">
            <SimpleMarkdown content={activePost.content} />
        </div>
      </article>
    );
  };

  const renderLogin = () => (
    <div className="max-w-sm mx-auto mt-20">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <label className="text-sm font-mono text-gray-500 uppercase tracking-widest">Enter Password</label>
        <input 
            type="password" 
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="border-b-2 border-gray-200 py-2 bg-transparent focus:outline-none focus:border-black font-mono text-xl"
            placeholder="••••••••"
        />
        <button type="submit" className="bg-black text-white font-mono py-3 mt-4 hover:bg-gray-800 transition-colors">
            ACCESS_TERMINAL
        </button>
      </form>
    </div>
  );

  const renderDashboard = () => (
    <div>
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
            <h2 className="font-mono text-xl">Admin Dashboard</h2>
            <div className="flex gap-4">
                 <button onClick={() => setShowConfig(!showConfig)} className="text-sm font-mono text-gray-500 hover:text-black underline">
                    {showConfig ? 'Hide Config' : 'Connect Repo'}
                </button>
                <button onClick={handleCreateNew} className="bg-black text-white px-4 py-2 font-mono text-sm hover:bg-gray-800">
                    + New Post
                </button>
            </div>
        </div>

        {showConfig && (
            <div className="bg-gray-50 p-6 border border-gray-200 mb-8 rounded-sm">
                <h3 className="font-bold mb-4 text-sm uppercase tracking-widest">GitHub Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-mono text-gray-500 mb-1">Repo Owner</label>
                        <input 
                            value={githubConfig.owner}
                            onChange={e => setGithubConfig({...githubConfig, owner: e.target.value})}
                            className="w-full border p-2 text-sm" placeholder="e.g. vercel" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-gray-500 mb-1">Repo Name</label>
                        <input 
                            value={githubConfig.repo}
                            onChange={e => setGithubConfig({...githubConfig, repo: e.target.value})}
                            className="w-full border p-2 text-sm" placeholder="e.g. next.js" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-gray-500 mb-1">Target Folder</label>
                        <input 
                            value={githubConfig.path}
                            onChange={e => setGithubConfig({...githubConfig, path: e.target.value})}
                            className="w-full border p-2 text-sm" placeholder="e.g. content/posts" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-gray-500 mb-1">Personal Access Token</label>
                        <input 
                            type="password"
                            value={githubConfig.token}
                            onChange={e => setGithubConfig({...githubConfig, token: e.target.value})}
                            className="w-full border p-2 text-sm" placeholder="ghp_..." 
                        />
                    </div>
                </div>
                <button onClick={handleSaveConfig} className="mt-4 bg-gray-900 text-white text-xs px-4 py-2 hover:bg-black">Save Configuration</button>
            </div>
        )}

        <div className="space-y-4">
            {posts.map(post => (
                <div key={post.slug} className="flex justify-between items-center p-4 border border-gray-100 hover:border-gray-300 transition-colors">
                    <div>
                        <h3 className="font-bold">{post.title}</h3>
                        <p className="text-xs text-gray-400 font-mono">{post.slug}</p>
                    </div>
                    <button onClick={() => handleEdit(post)} className="text-sm underline">
                        Edit
                    </button>
                </div>
            ))}
        </div>
    </div>
  );

  const renderEditor = () => (
    <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
            <button onClick={() => setViewState(ViewState.ADMIN_DASHBOARD)} className="text-sm text-gray-500 hover:text-black">← Back</button>
            <div className="flex gap-3">
                 <button 
                    onClick={handleDownloadFile}
                    className="text-gray-500 hover:text-black px-4 py-2 font-mono text-sm underline"
                >
                    Download .mdx
                </button>
                 <button 
                    onClick={handlePublishToGithub}
                    disabled={isPublishing}
                    className="bg-black text-white px-6 py-2 font-mono text-sm hover:bg-gray-800 flex items-center gap-2"
                >
                    {isPublishing ? (
                        <>
                            <span className="animate-spin">⟳</span> Publishing...
                        </>
                    ) : (
                        <>
                            <span>↑</span> Publish to GitHub
                        </>
                    )}
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
                <input 
                    type="text" 
                    placeholder="Post Title" 
                    className="w-full text-2xl font-bold border-b border-gray-200 py-2 focus:outline-none focus:border-black"
                    value={editorPost.title}
                    onChange={(e) => setEditorPost({...editorPost, title: e.target.value})}
                />
                 <div className="flex gap-4">
                    <input 
                        type="text" 
                        placeholder="slug-url" 
                        className="w-1/2 font-mono text-sm border-b border-gray-200 py-2 focus:outline-none focus:border-black text-gray-600"
                        value={editorPost.slug}
                        onChange={(e) => setEditorPost({...editorPost, slug: e.target.value})}
                    />
                     <input 
                        type="text" 
                        placeholder="Category" 
                        className="w-1/2 font-mono text-sm border-b border-gray-200 py-2 focus:outline-none focus:border-black text-gray-600"
                        value={editorPost.category}
                        onChange={(e) => setEditorPost({...editorPost, category: e.target.value})}
                    />
                 </div>
                 
                 <div className="relative">
                    <label className="block text-xs font-mono text-gray-400 mb-1">SEO Description</label>
                    <textarea 
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
                className="w-full h-full p-6 font-mono text-sm leading-relaxed border border-gray-200 focus:outline-none resize-none bg-gray-50 text-gray-800"
                value={editorPost.content}
                onChange={(e) => setEditorPost({...editorPost, content: e.target.value})}
                placeholder="# Write your masterpiece..."
            />
        </div>
    </div>
  );

  return (
    <Layout onNavigateHome={handleNavigateHome} onNavigateAdmin={handleNavigateAdmin}>
      {viewState === ViewState.HOME && renderHome()}
      {viewState === ViewState.POST && renderPost()}
      {viewState === ViewState.ADMIN_LOGIN && renderLogin()}
      {viewState === ViewState.ADMIN_DASHBOARD && renderDashboard()}
      {viewState === ViewState.ADMIN_EDITOR && renderEditor()}
    </Layout>
  );
};

export default App;
