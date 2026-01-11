import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { BlogPost, ViewState } from './types';
import { usePosts } from './hooks/usePosts';
import { useAuth } from './hooks/useAuth';
import { useGithubConfig } from './hooks/useGithubConfig';
import { Home } from './components/Home';
import { PostView } from './components/PostView';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminEditor } from './components/AdminEditor';
import { Toast } from './components/Toast';

const App: React.FC = () => {
  // --- State ---
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [viewState, setViewState] = useState<ViewState>(ViewState.HOME);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [editorPost, setEditorPost] = useState<Partial<BlogPost>>({
      title: '',
      slug: '',
      category: 'Engineering',
      tags: [],
      content: '# New Post\n\nWrite something brilliant...',
      description: ''
  });

  // --- Hooks ---
  const { posts, updateLocalPostList } = usePosts();
  const { isAuthenticated, login } = useAuth();
  const { githubConfig, saveConfig } = useGithubConfig();

  // --- Handlers ---

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

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

  const handleLogin = (password: string) => {
    if (login(password)) {
        setViewState(ViewState.ADMIN_DASHBOARD);
        return true;
    }
    return false;
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

  const handleCloseEditor = () => {
      setViewState(ViewState.ADMIN_DASHBOARD);
  };

  return (
    <Layout onNavigateHome={handleNavigateHome} onNavigateAdmin={handleNavigateAdmin}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {viewState === ViewState.HOME && (
          <Home posts={posts} onNavigatePost={handleNavigatePost} />
      )}
      {viewState === ViewState.POST && (
          <PostView post={activePost} />
      )}
      {viewState === ViewState.ADMIN_LOGIN && (
          <AdminLogin onLogin={handleLogin} />
      )}
      {viewState === ViewState.ADMIN_DASHBOARD && (
          <AdminDashboard
            posts={posts}
            githubConfig={githubConfig}
            onSaveConfig={saveConfig}
            onCreateNew={handleCreateNew}
            onEdit={handleEdit}
            showToast={showToast}
          />
      )}
      {viewState === ViewState.ADMIN_EDITOR && (
          <AdminEditor
            initialPost={editorPost}
            githubConfig={githubConfig}
            onClose={handleCloseEditor}
            onUpdateLocal={updateLocalPostList}
            showToast={showToast}
          />
      )}
    </Layout>
  );
};

export default App;
